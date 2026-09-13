'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/utils/supabase/server'
import { formatPublicUid, isValidPublicUid, getStableFallbackUid } from '@/lib/uid/uid-generator'
import { getCharacterByIndex } from '@/lib/characters/character-registry'
import { PublicPlayerProfile, Friendship } from '@/lib/types'

function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  return Boolean(url && key && url !== 'your-supabase-url' && key.length > 15)
}

/**
 * Server-side public UID lookup against real Supabase database profiles.
 * Strictly returns real profiles only - zero mock data.
 */
export async function searchPlayerByUidAction(rawUid: string): Promise<PublicPlayerProfile | null> {
  const formatted = formatPublicUid(rawUid)
  if (!isValidPublicUid(formatted)) {
    return null
  }

  if (!isSupabaseConfigured()) {
    return null
  }

  try {
    const supabase = await createClient()

    // 1. Query by public_uid column
    const { data: byPublicUid, error: uidErr } = await supabase
      .from('profiles')
      .select('id, display_name, public_uid, nexus_level, lifetime_xp, consistency_tier, active_character_index, character_evolution_stage')
      .eq('public_uid', formatted)
      .maybeSingle()

    if (byPublicUid) {
      const charIndex = byPublicUid.active_character_index ?? 0
      const char = getCharacterByIndex(charIndex)
      return {
        id: byPublicUid.id,
        display_name: byPublicUid.display_name || 'Adventurer',
        public_uid: byPublicUid.public_uid || formatted,
        nexus_level: byPublicUid.nexus_level || 1,
        lifetime_xp: byPublicUid.lifetime_xp || 0,
        consistency_tier: byPublicUid.consistency_tier || 'Casual',
        current_streak: 0,
        active_character_index: charIndex,
        character_evolution_stage: byPublicUid.character_evolution_stage || 1,
        character_name: char.name,
      }
    }

    // 2. Fallback check: if public_uid was null on existing profiles, check deterministic fallback UID
    const { data: allProfiles } = await supabase
      .from('profiles')
      .select('id, display_name, public_uid, nexus_level, lifetime_xp, consistency_tier, active_character_index, character_evolution_stage')
      .limit(100)

    if (allProfiles) {
      const matched = allProfiles.find(
        (p) => (p.public_uid && p.public_uid.toUpperCase() === formatted.toUpperCase()) ||
               getStableFallbackUid(p.id).toUpperCase() === formatted.toUpperCase()
      )

      if (matched) {
        // Automatically persist public_uid if it wasn't saved yet
        if (!matched.public_uid) {
          try {
            await supabase
              .from('profiles')
              .update({ public_uid: formatted })
              .eq('id', matched.id)
          } catch {
            // Ignore if column doesn't exist yet
          }
        }

        const charIndex = matched.active_character_index ?? 0
        const char = getCharacterByIndex(charIndex)
        return {
          id: matched.id,
          display_name: matched.display_name || 'Adventurer',
          public_uid: matched.public_uid || formatted,
          nexus_level: matched.nexus_level || 1,
          lifetime_xp: matched.lifetime_xp || 0,
          consistency_tier: matched.consistency_tier || 'Casual',
          current_streak: 0,
          active_character_index: charIndex,
          character_evolution_stage: matched.character_evolution_stage || 1,
          character_name: char.name,
        }
      }
    }

    return null
  } catch (err) {
    console.error('Error searching player by UID:', err)
    return null
  }
}

/**
 * Server-side secure friend request creation
 */
export async function sendFriendRequestAction(
  targetUid: string
): Promise<{ success: boolean; message: string; friendship?: Friendship }> {
  const formatted = formatPublicUid(targetUid)
  if (!isValidPublicUid(formatted)) {
    return { success: false, message: 'Invalid UID format. Expected LIFE-XXXX-XX.' }
  }

  if (!isSupabaseConfigured()) {
    return { success: false, message: 'Online multiplayer requires database connection.' }
  }

  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return { success: false, message: 'You must be signed in to send friend requests.' }
    }

    // 1. Verify target player exists
    const targetPlayer = await searchPlayerByUidAction(formatted)
    if (!targetPlayer) {
      return { success: false, message: `No adventurer found with UID ${formatted}.` }
    }

    // 2. Validate sender != receiver
    if (targetPlayer.id === user.id) {
      return { success: false, message: 'You cannot send a friend request to yourself.' }
    }

    // 3. Ensure sender has a persistent public_uid
    const { data: senderProfile } = await supabase
      .from('profiles')
      .select('id, display_name, public_uid')
      .eq('id', user.id)
      .single()

    if (senderProfile && !senderProfile.public_uid) {
      const stableUid = getStableFallbackUid(user.id)
      try {
        await supabase
          .from('profiles')
          .update({ public_uid: stableUid })
          .eq('id', user.id)
      } catch {
        // Ignore column error
      }
    }

    // 4. Check existing friendship record
    const { data: existing } = await supabase
      .from('friendships')
      .select('*')
      .or(`and(sender_id.eq.${user.id},receiver_id.eq.${targetPlayer.id}),and(sender_id.eq.${targetPlayer.id},receiver_id.eq.${user.id})`)
      .maybeSingle()

    if (existing) {
      if (existing.status === 'accepted') {
        return { success: false, message: `${targetPlayer.display_name} is already in your party!` }
      }
      if (existing.status === 'pending') {
        if (existing.sender_id === user.id) {
          return { success: false, message: 'Friend request already sent and awaiting approval.' }
        } else {
          // If the other user already sent a request, auto-accept it!
          await supabase
            .from('friendships')
            .update({ status: 'accepted', updated_at: new Date().toISOString() })
            .eq('id', existing.id)

          revalidatePath('/leaderboard')
          revalidatePath('/dashboard')
          return { success: true, message: `Accepted incoming request from ${targetPlayer.display_name}!` }
        }
      }
      if (existing.status === 'declined') {
        // Re-open request
        await supabase
          .from('friendships')
          .update({ sender_id: user.id, receiver_id: targetPlayer.id, status: 'pending', updated_at: new Date().toISOString() })
          .eq('id', existing.id)

        return { success: true, message: `Friend request sent to ${targetPlayer.display_name}!` }
      }
    }

    // 5. Insert new friend request
    const { data: inserted, error: insertErr } = await supabase
      .from('friendships')
      .insert({
        sender_id: user.id,
        receiver_id: targetPlayer.id,
        status: 'pending',
      })
      .select()
      .single()

    if (insertErr) {
      // If friendships table is not yet migrated in Supabase, return informative message
      if (insertErr.code === '42P01' || insertErr.message?.includes('does not exist')) {
        return { 
          success: false, 
          message: 'Friendships database table not configured yet. Please run migration_social_and_uid.sql.' 
        }
      }
      return { success: false, message: insertErr.message || 'Failed to send friend request.' }
    }

    revalidatePath('/leaderboard')
    return {
      success: true,
      message: `Friend request sent to ${targetPlayer.display_name}!`,
      friendship: {
        id: inserted.id,
        sender_id: user.id,
        receiver_id: targetPlayer.id,
        status: 'pending',
        created_at: inserted.created_at,
        updated_at: inserted.updated_at,
        friend_profile: targetPlayer,
      },
    }
  } catch (err: any) {
    return { success: false, message: err?.message || 'Unexpected server error while sending request.' }
  }
}

/**
 * Accept incoming friend request
 */
export async function acceptFriendRequestAction(friendshipId: string): Promise<boolean> {
  if (!isSupabaseConfigured()) return false

  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return false

    const { error } = await supabase
      .from('friendships')
      .update({ status: 'accepted', updated_at: new Date().toISOString() })
      .eq('id', friendshipId)
      .eq('receiver_id', user.id)

    if (error) return false

    revalidatePath('/leaderboard')
    revalidatePath('/dashboard')
    return true
  } catch {
    return false
  }
}

/**
 * Decline incoming friend request
 */
export async function declineFriendRequestAction(friendshipId: string): Promise<boolean> {
  if (!isSupabaseConfigured()) return false

  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return false

    const { error } = await supabase
      .from('friendships')
      .update({ status: 'declined', updated_at: new Date().toISOString() })
      .eq('id', friendshipId)
      .eq('receiver_id', user.id)

    return !error
  } catch {
    return false
  }
}

/**
 * Remove friend from party
 */
export async function removeFriendAction(friendshipId: string): Promise<boolean> {
  if (!isSupabaseConfigured()) return false

  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return false

    const { error } = await supabase
      .from('friendships')
      .delete()
      .eq('id', friendshipId)
      .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)

    if (error) return false

    revalidatePath('/leaderboard')
    revalidatePath('/dashboard')
    return true
  } catch {
    return false
  }
}

/**
 * Fetch real accepted friends for a user from database
 */
export async function getFriendsListAction(userId: string): Promise<Friendship[]> {
  if (!isSupabaseConfigured()) return []

  try {
    const supabase = await createClient()

    // Fetch friendships where user is either sender or receiver and status is accepted
    const { data: records, error } = await supabase
      .from('friendships')
      .select('*')
      .eq('status', 'accepted')
      .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)

    if (error || !records || records.length === 0) {
      return []
    }

    // Determine other friend profile IDs
    const otherUserIds = records.map((r: any) => (r.sender_id === userId ? r.receiver_id : r.sender_id))

    const { data: profiles } = await supabase
      .from('profiles')
      .select('id, display_name, public_uid, nexus_level, lifetime_xp, consistency_tier, active_character_index, character_evolution_stage')
      .in('id', otherUserIds)

    const profileMap = new Map<string, PublicPlayerProfile>()
    if (profiles) {
      profiles.forEach((p: any) => {
        const char = getCharacterByIndex(p.active_character_index || 0)
        profileMap.set(p.id, {
          id: p.id,
          display_name: p.display_name || 'Adventurer',
          public_uid: p.public_uid || getStableFallbackUid(p.id),
          nexus_level: p.nexus_level || 1,
          lifetime_xp: p.lifetime_xp || 0,
          consistency_tier: p.consistency_tier || 'Casual',
          current_streak: 0,
          active_character_index: p.active_character_index || 0,
          character_evolution_stage: p.character_evolution_stage || 1,
          character_name: char.name,
        })
      })
    }

    return records.map((r: any) => {
      const friendId = r.sender_id === userId ? r.receiver_id : r.sender_id
      return {
        id: r.id,
        sender_id: r.sender_id,
        receiver_id: r.receiver_id,
        status: r.status,
        created_at: r.created_at,
        updated_at: r.updated_at,
        friend_profile: profileMap.get(friendId),
      }
    })
  } catch {
    return []
  }
}

/**
 * Fetch real pending incoming requests for a user from database
 */
export async function getPendingRequestsAction(userId: string): Promise<Friendship[]> {
  if (!isSupabaseConfigured()) return []

  try {
    const supabase = await createClient()

    const { data: records, error } = await supabase
      .from('friendships')
      .select('*')
      .eq('receiver_id', userId)
      .eq('status', 'pending')

    if (error || !records || records.length === 0) {
      return []
    }

    const senderIds = records.map((r: any) => r.sender_id)
    const { data: profiles } = await supabase
      .from('profiles')
      .select('id, display_name, public_uid, nexus_level, lifetime_xp, consistency_tier, active_character_index, character_evolution_stage')
      .in('id', senderIds)

    const profileMap = new Map<string, PublicPlayerProfile>()
    if (profiles) {
      profiles.forEach((p: any) => {
        const char = getCharacterByIndex(p.active_character_index || 0)
        profileMap.set(p.id, {
          id: p.id,
          display_name: p.display_name || 'Adventurer',
          public_uid: p.public_uid || getStableFallbackUid(p.id),
          nexus_level: p.nexus_level || 1,
          lifetime_xp: p.lifetime_xp || 0,
          consistency_tier: p.consistency_tier || 'Casual',
          current_streak: 0,
          active_character_index: p.active_character_index || 0,
          character_evolution_stage: p.character_evolution_stage || 1,
          character_name: char.name,
        })
      })
    }

    return records.map((r: any) => ({
      id: r.id,
      sender_id: r.sender_id,
      receiver_id: r.receiver_id,
      status: r.status,
      created_at: r.created_at,
      updated_at: r.updated_at,
      friend_profile: profileMap.get(r.sender_id),
    }))
  } catch {
    return []
  }
}
