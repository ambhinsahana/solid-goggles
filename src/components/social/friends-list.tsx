'use client'

import React, { useState, useEffect } from 'react'
import { Friendship, PublicPlayerProfile } from '@/lib/types'
import {
  getFriendsList,
  getPendingRequests,
  acceptFriendRequest,
  declineFriendRequest,
  removeFriend,
} from '@/lib/social/friendships'
import { CharacterSprite } from '@/components/characters/character-sprite'
import { PublicProfileModal } from '@/components/social/public-profile-modal'
import { gameAudio } from '@/lib/audio/game-audio'
import { Users, Swords, Eye, UserMinus, Check, X, Shield, Sparkles } from 'lucide-react'

interface FriendsListProps {
  userId: string
  refreshTrigger?: number
  onFriendshipUpdated?: () => void
}

export function FriendsList({ userId, refreshTrigger = 0, onFriendshipUpdated }: FriendsListProps) {
  const [friends, setFriends] = useState<Friendship[]>([])
  const [pending, setPending] = useState<Friendship[]>([])
  const [activeSubTab, setActiveSubTab] = useState<'party' | 'requests'>('party')
  const [selectedPlayer, setSelectedPlayer] = useState<PublicPlayerProfile | null>(null)
  const [challengeToast, setChallengeToast] = useState<string | null>(null)

  const reloadData = async () => {
    const f = await getFriendsList(userId)
    const p = await getPendingRequests(userId)
    setFriends(f)
    setPending(p)
  }

  useEffect(() => {
    reloadData()
  }, [userId, refreshTrigger])

  const handleAccept = async (id: string, name?: string) => {
    gameAudio.playVictory()
    await acceptFriendRequest(id)
    await reloadData()
    if (onFriendshipUpdated) onFriendshipUpdated()
  }

  const handleDecline = async (id: string) => {
    gameAudio.playPop()
    await declineFriendRequest(id)
    await reloadData()
    if (onFriendshipUpdated) onFriendshipUpdated()
  }

  const handleRemove = async (id: string) => {
    gameAudio.playTap()
    if (confirm('Remove this adventurer from your party?')) {
      await removeFriend(id)
      await reloadData()
      if (onFriendshipUpdated) onFriendshipUpdated()
    }
  }

  const handleChallenge = (friendName: string) => {
    gameAudio.playStrike()
    setChallengeToast(`⚔️ Quest duel sent to ${friendName}! Most XP earned today wins!`)
    setTimeout(() => {
      setChallengeToast(null)
    }, 3500)
  }

  return (
    <div className="glass-frosted p-5 sm:p-6 rounded-3xl border-2 border-[#e6d5b8] shadow-lg flex flex-col gap-4">
      {/* Toast Notification */}
      {challengeToast && (
        <div className="p-3 rounded-2xl bg-amber-500 text-white font-display font-black text-xs sm:text-sm text-center shadow-lg border border-amber-300 animate-in slide-in-from-top duration-200">
          {challengeToast}
        </div>
      )}

      {/* Tabs Header */}
      <div className="flex items-center justify-between border-b border-black/10 pb-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              gameAudio.playTap()
              setActiveSubTab('party')
            }}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black transition-all touch-bounce ${
              activeSubTab === 'party'
                ? 'bg-amber-500 text-white shadow-sm scale-105 border border-amber-400'
                : 'glass-pill text-amber-950 hover:bg-white/90'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>My Party</span>
            <span className="px-1.5 py-0.2 text-[10px] rounded-full bg-black/15">
              {friends.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              gameAudio.playTap()
              setActiveSubTab('requests')
            }}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black transition-all touch-bounce ${
              activeSubTab === 'requests'
                ? 'bg-amber-500 text-white shadow-sm scale-105 border border-amber-400'
                : 'glass-pill text-amber-950 hover:bg-white/90'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Requests</span>
            {pending.length > 0 && (
              <span className="px-1.5 py-0.2 text-[10px] rounded-full bg-rose-500 text-white animate-pulse">
                {pending.length}
              </span>
            )}
          </button>
        </div>

        <span className="text-[11px] font-bold text-amber-900/50 hidden sm:inline">
          Life RPG Social Co-Op
        </span>
      </div>

      {/* Tab 1: My Party Friends */}
      {activeSubTab === 'party' && (
        <div className="space-y-3">
          {friends.length === 0 ? (
            <div className="py-10 text-center flex flex-col items-center justify-center text-amber-900/60 space-y-2">
              <Users className="w-10 h-10 mb-1 text-amber-600/40" />
              <p className="font-display font-black text-base text-world-text">
                YOUR PARTY IS EMPTY
              </p>
              <p className="text-xs max-w-xs text-amber-900/70 font-semibold">
                No friends have been added yet.
              </p>
            </div>
          ) : (
            friends.map((f) => {
              const p = f.friend_profile
              if (!p) return null

              return (
                <div
                  key={f.id}
                  className="p-3.5 sm:p-4 rounded-2xl bg-white/65 backdrop-blur-md border border-white/90 shadow-xs hover:border-amber-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    {/* Character Avatar with Online Dot */}
                    <div className="relative">
                      <div className="w-12 h-12 rounded-2xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-center shrink-0">
                        <CharacterSprite
                          characterIndex={p.active_character_index}
                          evolutionStage={p.character_evolution_stage}
                          size={46}
                        />
                      </div>
                      <span
                        className="w-3 h-3 rounded-full bg-emerald-500 border-2 border-white absolute -top-1 -right-1 shadow-xs"
                        title="Exploring the Realm"
                      />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-display font-black text-sm sm:text-base text-world-text">
                          {p.display_name}
                        </h4>
                        <span className="text-[10px] font-black px-1.5 py-0.5 rounded-md bg-amber-200 text-amber-950">
                          Lv. {p.nexus_level}
                        </span>
                      </div>
                      <p className="text-xs font-mono font-bold text-amber-900/70">
                        {p.public_uid} · {p.character_name}
                      </p>
                      <p className="text-[11px] font-bold text-amber-900/50 mt-0.5">
                        🔥 {p.current_streak}d streak · {p.lifetime_xp.toLocaleString()} XP
                      </p>
                    </div>
                  </div>

                  {/* Actions: View Profile, Challenge Duel, Remove */}
                  <div className="flex items-center gap-1.5 self-end sm:self-center">
                    <button
                      type="button"
                      onClick={() => {
                        gameAudio.playTap()
                        setSelectedPlayer(p)
                      }}
                      className="glass-pill px-2.5 py-1.5 rounded-xl text-xs font-black text-amber-950 hover:bg-white transition-all touch-bounce flex items-center gap-1 border border-white/90 shadow-xs"
                      title="View Gamer Card"
                    >
                      <Eye className="w-3.5 h-3.5 text-amber-700" />
                      <span>Card</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleChallenge(p.display_name)}
                      className="btn-clash-gold px-2.5 py-1.5 rounded-xl text-xs font-black text-white touch-bounce flex items-center gap-1 shadow-xs"
                      title="Send Daily XP Challenge"
                    >
                      <Swords className="w-3.5 h-3.5" />
                      <span>Duel</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleRemove(f.id)}
                      className="p-1.5 rounded-xl glass-pill text-amber-900/40 hover:text-rose-600 transition-all touch-bounce"
                      title="Remove Friend"
                    >
                      <UserMinus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )
            })
          )}
        </div>
      )}

      {/* Tab 2: Incoming Requests */}
      {activeSubTab === 'requests' && (
        <div className="space-y-3">
          {pending.length === 0 ? (
            <div className="py-8 text-center flex flex-col items-center justify-center text-amber-900/60 space-y-1">
              <Sparkles className="w-8 h-8 mb-1 text-amber-600/40" />
              <p className="font-display font-black text-sm text-world-text">
                NO PENDING INVITATIONS
              </p>
              <p className="text-xs text-amber-900/60 font-semibold">
                Your party inbox is clear. Incoming requests will appear here.
              </p>
            </div>
          ) : (
            pending.map((pReq) => {
              const p = pReq.friend_profile
              if (!p) return null

              return (
                <div
                  key={pReq.id}
                  className="p-3.5 rounded-2xl bg-white/70 border border-amber-300/60 shadow-xs flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-center shrink-0">
                      <CharacterSprite
                        characterIndex={p.active_character_index}
                        evolutionStage={p.character_evolution_stage}
                        size={38}
                      />
                    </div>
                    <div>
                      <h4 className="font-display font-black text-sm text-world-text">
                        {p.display_name}
                      </h4>
                      <p className="text-[11px] font-mono font-bold text-amber-900/60">
                        {p.public_uid} · Lv. {p.nexus_level}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleAccept(pReq.id, p.display_name)}
                      className="btn-clash-green px-3 py-1.5 rounded-xl text-white font-display font-black text-xs uppercase touch-bounce flex items-center gap-1"
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                      <span>Accept</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDecline(pReq.id)}
                      className="p-1.5 rounded-xl glass-pill text-amber-900/50 hover:text-rose-600 transition-all touch-bounce"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )
            })
          )}
        </div>
      )}

      {/* Public Gamer Card Modal */}
      <PublicProfileModal
        player={selectedPlayer}
        onClose={() => setSelectedPlayer(null)}
      />
    </div>
  )
}
