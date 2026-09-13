'use client'

import { PublicPlayerProfile, Friendship } from '@/lib/types'
import { formatPublicUid, isValidPublicUid } from '@/lib/uid/uid-generator'
import {
  searchPlayerByUidAction,
  sendFriendRequestAction,
  acceptFriendRequestAction,
  declineFriendRequestAction,
  removeFriendAction,
  getFriendsListAction,
  getPendingRequestsAction,
} from '@/app/dashboard/social-actions'

const STORAGE_LOCAL_PARTY_KEY = 'life_rpg_party_v2'
const STORAGE_LOCAL_REQUESTS_KEY = 'life_rpg_pending_v2'

// Pure client-side cache / local storage backup for offline usage
// Strictly initialized as EMPTY - ZERO mock/fabricated players
function getLocalFriends(): Friendship[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_LOCAL_PARTY_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveLocalFriends(friends: Friendship[]): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_LOCAL_PARTY_KEY, JSON.stringify(friends))
  } catch {
    // Ignore
  }
}

function getLocalPending(): Friendship[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_LOCAL_REQUESTS_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveLocalPending(pending: Friendship[]): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_LOCAL_REQUESTS_KEY, JSON.stringify(pending))
  } catch {
    // Ignore
  }
}

/**
 * Search player by public UID using real database records.
 * Returns null if not found. No fake users are ever returned.
 */
export async function searchPlayerByUid(rawUid: string): Promise<PublicPlayerProfile | null> {
  const formatted = formatPublicUid(rawUid)
  if (!isValidPublicUid(formatted)) {
    return null
  }

  try {
    // Call server action to query real Supabase profiles
    const serverResult = await searchPlayerByUidAction(formatted)
    if (serverResult) {
      return serverResult
    }
  } catch (err) {
    console.error('Failed to search player on server:', err)
  }

  return null
}

/**
 * Get all accepted party friends for a user from real database.
 * If user has no friends, returns empty array.
 */
export async function getFriendsList(userId: string): Promise<Friendship[]> {
  try {
    const serverList = await getFriendsListAction(userId)
    if (serverList && serverList.length > 0) {
      saveLocalFriends(serverList)
      return serverList
    }
  } catch (err) {
    console.error('Failed to fetch friends list from server:', err)
  }

  // Fallback to local cache (without any fake seeds)
  return getLocalFriends()
}

/**
 * Get pending incoming friend requests for a user from real database.
 */
export async function getPendingRequests(userId: string): Promise<Friendship[]> {
  try {
    const serverPending = await getPendingRequestsAction(userId)
    if (serverPending && serverPending.length > 0) {
      saveLocalPending(serverPending)
      return serverPending
    }
  } catch (err) {
    console.error('Failed to fetch pending requests from server:', err)
  }

  return getLocalPending()
}

/**
 * Send a friend request to a real player using their UID.
 */
export async function sendFriendRequest(
  senderProfile: { id: string; display_name: string; public_uid: string },
  targetUid: string
): Promise<{ success: boolean; message: string; friendship?: Friendship }> {
  const formatted = formatPublicUid(targetUid)
  if (!isValidPublicUid(formatted)) {
    return { success: false, message: 'Invalid UID format. Expected LIFE-XXXX-XX.' }
  }

  if (senderProfile.public_uid.toUpperCase() === formatted.toUpperCase()) {
    return { success: false, message: 'You cannot send a friend request to yourself.' }
  }

  try {
    // 1. First attempt authoritative database operation
    const serverRes = await sendFriendRequestAction(formatted)
    if (serverRes.success) {
      if (serverRes.friendship) {
        const local = getLocalFriends()
        local.push(serverRes.friendship)
        saveLocalFriends(local)
      }
      return serverRes
    }

    // If server returned specific message, propagate it
    if (serverRes.message && !serverRes.message.includes('not configured')) {
      return serverRes
    }
  } catch (err) {
    console.error('Server friend request error:', err)
  }

  // 2. Offline / local fallback: Only allow if real player profile was verified
  const realTarget = await searchPlayerByUid(formatted)
  if (!realTarget) {
    return { success: false, message: `No adventurer found with UID ${formatted}.` }
  }

  const localFriends = getLocalFriends()
  if (localFriends.some((f) => f.friend_profile?.public_uid.toUpperCase() === formatted.toUpperCase())) {
    return { success: false, message: `${realTarget.display_name} is already in your party!` }
  }

  const localFriendship: Friendship = {
    id: `local-f-${Date.now()}`,
    sender_id: senderProfile.id,
    receiver_id: realTarget.id,
    status: 'accepted',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    friend_profile: realTarget,
  }

  localFriends.push(localFriendship)
  saveLocalFriends(localFriends)

  return {
    success: true,
    message: `${realTarget.display_name} has joined your party!`,
    friendship: localFriendship,
  }
}

/**
 * Accept an incoming friend request.
 */
export async function acceptFriendRequest(friendshipId: string): Promise<boolean> {
  try {
    const success = await acceptFriendRequestAction(friendshipId)
    if (success) {
      const pending = getLocalPending()
      const idx = pending.findIndex((p) => p.id === friendshipId)
      if (idx !== -1) {
        const [accepted] = pending.splice(idx, 1)
        accepted.status = 'accepted'
        saveLocalPending(pending)
        const friends = getLocalFriends()
        friends.push(accepted)
        saveLocalFriends(friends)
      }
      return true
    }
  } catch (err) {
    console.error('Failed to accept request on server:', err)
  }

  // Local state update
  const pending = getLocalPending()
  const idx = pending.findIndex((p) => p.id === friendshipId)
  if (idx !== -1) {
    const [accepted] = pending.splice(idx, 1)
    accepted.status = 'accepted'
    saveLocalPending(pending)
    const friends = getLocalFriends()
    friends.push(accepted)
    saveLocalFriends(friends)
    return true
  }

  return false
}

/**
 * Decline an incoming friend request.
 */
export async function declineFriendRequest(friendshipId: string): Promise<boolean> {
  try {
    await declineFriendRequestAction(friendshipId)
  } catch (err) {
    console.error('Failed to decline request on server:', err)
  }

  const pending = getLocalPending()
  saveLocalPending(pending.filter((p) => p.id !== friendshipId))
  return true
}

/**
 * Remove a friend from party.
 */
export async function removeFriend(friendshipId: string): Promise<boolean> {
  try {
    await removeFriendAction(friendshipId)
  } catch (err) {
    console.error('Failed to remove friend on server:', err)
  }

  const friends = getLocalFriends()
  saveLocalFriends(friends.filter((f) => f.id !== friendshipId))
  return true
}
