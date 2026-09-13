'use client'

import React, { useState, useEffect, useMemo } from 'react'
import {
  Crown,
  Flame,
  Shield,
  Trophy,
  Medal,
  Search,
  Sparkles,
  User,
  Users,
  Globe,
  UserPlus,
  ArrowUpDown,
} from 'lucide-react'
import { gameAudio } from '@/lib/audio/game-audio'
import { FriendSearch } from '@/components/social/friend-search'
import { FriendsList } from '@/components/social/friends-list'
import { getFriendsList } from '@/lib/social/friendships'

export interface LeaderboardEntry {
  rank: number
  id: string
  display_name: string
  nexus_level: number
  lifetime_xp: number
  consistency_tier: string
  current_streak: number
  active_creature_name?: string
  public_uid?: string
}

interface LeaderboardViewProps {
  initialEntries: LeaderboardEntry[]
  currentUser?: {
    id: string
    display_name: string
    public_uid: string
    nexus_level?: number
    lifetime_xp?: number
    consistency_tier?: string
    current_streak?: number
    active_creature_name?: string
  }
}

export function LeaderboardView({
  initialEntries,
  currentUser = {
    id: 'local-hero',
    display_name: 'Adventurer',
    public_uid: 'LIFE-7429-KR',
    nexus_level: 1,
    lifetime_xp: 0,
    consistency_tier: 'Casual',
    current_streak: 0,
    active_creature_name: 'Emberfox',
  },
}: LeaderboardViewProps) {
  const [scope, setScope] = useState<'global' | 'friends'>('global')
  const [tab, setTab] = useState<'xp' | 'streak' | 'level'>('xp')
  const [searchQuery, setSearchQuery] = useState('')
  const [friendsEntries, setFriendsEntries] = useState<LeaderboardEntry[]>([])
  const [refreshTrigger, setRefreshTrigger] = useState(0)
  const [showSocialHub, setShowSocialHub] = useState(false)

  // Load and sync friends into leaderboard entry format
  const loadFriendsLeaderboard = async () => {
    const friends = await getFriendsList(currentUser.id)
    const list: LeaderboardEntry[] = []

    // Add current user entry with real stats
    list.push({
      rank: 1,
      id: currentUser.id,
      display_name: `${currentUser.display_name} (You)`,
      nexus_level: currentUser.nexus_level ?? 1,
      lifetime_xp: currentUser.lifetime_xp ?? 0,
      consistency_tier: currentUser.consistency_tier ?? 'Casual',
      current_streak: currentUser.current_streak ?? 0,
      active_creature_name: currentUser.active_creature_name ?? 'Emberfox',
      public_uid: currentUser.public_uid,
    })

    // Add friends from real database records only
    friends.forEach((f) => {
      const p = f.friend_profile
      if (p) {
        list.push({
          rank: 1,
          id: p.id,
          display_name: p.display_name,
          nexus_level: p.nexus_level,
          lifetime_xp: p.lifetime_xp,
          consistency_tier: p.consistency_tier,
          current_streak: p.current_streak,
          active_creature_name: p.character_name,
          public_uid: p.public_uid,
        })
      }
    })

    setFriendsEntries(list)
  }

  useEffect(() => {
    loadFriendsLeaderboard()
  }, [currentUser.id, refreshTrigger])

  // Select active data source based on scope (global vs friends)
  const sourceEntries = scope === 'global' ? initialEntries : friendsEntries

  // Sort entries according to selected tab
  const sortedEntries = useMemo(() => {
    const list = [...sourceEntries]
    if (tab === 'xp') {
      list.sort((a, b) => b.lifetime_xp - a.lifetime_xp)
    } else if (tab === 'streak') {
      list.sort((a, b) => b.current_streak - a.current_streak)
    } else if (tab === 'level') {
      list.sort((a, b) => b.nexus_level - a.nexus_level)
    }
    return list.map((e, idx) => ({ ...e, rank: idx + 1 }))
  }, [sourceEntries, tab])

  // Filter by search query
  const filteredEntries = sortedEntries.filter((e) =>
    e.display_name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const topThree = sortedEntries.slice(0, 3)

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Hero Header - Gamified Parchment Style */}
      <div className="relative overflow-hidden rounded-3xl bg-[#FDF9F1] border-4 border-[#E5D3B3] p-8 sm:p-10 shadow-lg text-center sm:text-left">
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply"
          style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/aged-paper.png")' }}
        />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-amber-100 border-2 border-amber-300 text-amber-800 text-xs font-black mb-3 tracking-wide uppercase shadow-[0_2px_0_rgba(252,211,77,1)]">
              <Trophy className="w-3.5 h-3.5 text-amber-600" />
              Hall of Legends & Fellowship
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-[#3D2C1E] tracking-tight drop-shadow-sm font-display">
              Nexus Leaderboard
            </h1>
            <p className="text-sm sm:text-base text-[#8A7A6A] mt-2 max-w-xl font-medium">
              Honor the most disciplined adventurers across the Nexus. Track verified XP, level advancements, and unbreakable streaks.
            </p>
          </div>

          {/* Action buttons & Privacy badge */}
          <div className="flex flex-col sm:items-end gap-3">
            <button
              type="button"
              onClick={() => {
                gameAudio.playTap()
                setShowSocialHub(!showSocialHub)
              }}
              className="btn-clash-gold px-5 py-2.5 rounded-2xl text-white font-display font-black text-xs uppercase tracking-wider touch-bounce flex items-center gap-2 shadow-md"
            >
              <UserPlus className="w-4 h-4" />
              <span>{showSocialHub ? 'Hide Party Fellowship' : '🤝 Party & Add Friends'}</span>
            </button>

            <div className="px-4 py-2 rounded-2xl bg-white border-2 border-[#E5D3B3] text-xs font-bold text-[#8A7A6A] flex items-center gap-2 shadow-xs">
              <Shield className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Zero-Leak Privacy: No emails exposed</span>
            </div>
          </div>
        </div>
      </div>

      {/* Expandable Social Fellowship Hub */}
      {showSocialHub && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in zoom-in-95 duration-200">
          <div className="lg:col-span-5">
            <FriendSearch
              currentUser={currentUser}
              onFriendAdded={() => {
                setRefreshTrigger((prev) => prev + 1)
              }}
            />
          </div>
          <div className="lg:col-span-7">
            <FriendsList
              userId={currentUser.id}
              refreshTrigger={refreshTrigger}
              onFriendshipUpdated={() => {
                setRefreshTrigger((prev) => prev + 1)
              }}
            />
          </div>
        </div>
      )}

      {/* Scope Selector: Global vs Friends */}
      <div className="flex items-center justify-center sm:justify-start gap-3 border-b-2 border-dashed border-[#E5D3B3] pb-4">
        <button
          type="button"
          onClick={() => {
            gameAudio.playTap()
            setScope('global')
          }}
          className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-display font-black text-sm uppercase tracking-wide transition-all touch-bounce ${
            scope === 'global'
              ? 'btn-clash-gold text-white shadow-md scale-105'
              : 'glass-pill text-[#8A7A6A] hover:bg-white hover:text-world-text'
          }`}
        >
          <Globe className="w-4 h-4" />
          <span>Global Leaderboard</span>
        </button>

        <button
          type="button"
          onClick={() => {
            gameAudio.playTap()
            setScope('friends')
          }}
          className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-display font-black text-sm uppercase tracking-wide transition-all touch-bounce ${
            scope === 'friends'
              ? 'btn-clash-gold text-white shadow-md scale-105'
              : 'glass-pill text-[#8A7A6A] hover:bg-white hover:text-world-text'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>My Friends / Party</span>
          <span className="px-2 py-0.5 text-xs rounded-full bg-black/20 text-white font-mono">
            {friendsEntries.length}
          </span>
        </button>
      </div>

      {/* Top 3 Podium */}
      {topThree.length >= 3 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end pt-2 pb-2">
          {/* Rank 2 - Silver */}
          <div className="order-2 md:order-1 p-6 rounded-3xl bg-white border-2 border-slate-300 shadow-[0_6px_0_#cbd5e1] flex flex-col items-center text-center relative hover:-translate-y-1 transition-transform select-none">
            <div className="relative mb-4 z-10">
              <div className="w-16 h-16 rounded-full bg-gradient-to-b from-slate-100 to-slate-200 border-4 border-slate-300 flex items-center justify-center text-slate-500 text-2xl font-black shadow-inner">
                2
              </div>
              <Medal className="w-6 h-6 text-slate-400 absolute -bottom-1 -right-1 drop-shadow-sm" />
            </div>
            <h3 className="text-lg font-black text-[#3D2C1E] tracking-tight z-10 font-display">
              {topThree[1].display_name}
            </h3>
            <span className="text-xs font-bold text-[#8A7A6A] mt-0.5 z-10">
              Level {topThree[1].nexus_level} Adventurer
            </span>
            <div className="mt-4 pt-4 border-t-2 border-dashed border-slate-200 w-full flex justify-around text-sm font-black z-10">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase tracking-wider">XP</span>
                <span className="text-[#3D2C1E]">{topThree[1].lifetime_xp.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase tracking-wider">Streak</span>
                <span className="text-amber-500 flex items-center gap-1 justify-center">
                  <Flame className="w-3.5 h-3.5" /> {topThree[1].current_streak}d
                </span>
              </div>
            </div>
          </div>

          {/* Rank 1 - Gold (Elevated) */}
          <div className="order-1 md:order-2 p-8 rounded-3xl bg-gradient-to-b from-amber-50 to-[#FDF9F1] border-4 border-amber-300 shadow-[0_8px_0_#fbbf24] flex flex-col items-center text-center md:-translate-y-6 relative hover:-translate-y-8 transition-transform z-20 select-none">
            <div className="relative mb-4 z-10">
              <div className="w-24 h-24 rounded-full bg-gradient-to-b from-amber-300 to-amber-500 border-4 border-amber-200 flex items-center justify-center text-white text-4xl font-black shadow-[inset_0_-4px_0_rgba(0,0,0,0.1),0_4px_10px_rgba(251,191,36,0.5)]">
                1
              </div>
              <Crown className="w-10 h-10 text-amber-500 absolute -top-6 left-1/2 -translate-x-1/2 drop-shadow-md" fill="currentColor" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg bg-amber-100 text-amber-700 border-2 border-amber-300 mb-2 z-10 shadow-sm">
              Grand Champion
            </span>
            <h3 className="text-2xl font-black text-[#3D2C1E] tracking-tight z-10 font-display">
              {topThree[0].display_name}
            </h3>
            <span className="text-sm font-bold text-[#8A7A6A] mt-0.5 z-10">
              Level {topThree[0].nexus_level} {topThree[0].consistency_tier}
            </span>
            <div className="mt-6 pt-4 border-t-2 border-dashed border-amber-200 w-full flex justify-around text-base font-black z-10">
              <div>
                <span className="text-amber-600 block text-[10px] uppercase tracking-wider font-bold">XP</span>
                <span className="text-[#3D2C1E]">{topThree[0].lifetime_xp.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-amber-600 block text-[10px] uppercase tracking-wider font-bold">Streak</span>
                <span className="text-amber-500 flex items-center gap-1 justify-center">
                  <Flame className="w-4 h-4" /> {topThree[0].current_streak}d
                </span>
              </div>
            </div>
          </div>

          {/* Rank 3 - Bronze */}
          <div className="order-3 p-6 rounded-3xl bg-white border-2 border-orange-200 shadow-[0_6px_0_#fed7aa] flex flex-col items-center text-center relative hover:-translate-y-1 transition-transform select-none">
            <div className="relative mb-4 z-10">
              <div className="w-16 h-16 rounded-full bg-gradient-to-b from-orange-100 to-orange-200 border-4 border-orange-300 flex items-center justify-center text-orange-600 text-2xl font-black shadow-inner">
                3
              </div>
              <Medal className="w-6 h-6 text-orange-400 absolute -bottom-1 -right-1 drop-shadow-sm" />
            </div>
            <h3 className="text-lg font-black text-[#3D2C1E] tracking-tight z-10 font-display">
              {topThree[2].display_name}
            </h3>
            <span className="text-xs font-bold text-[#8A7A6A] mt-0.5 z-10">
              Level {topThree[2].nexus_level} Adventurer
            </span>
            <div className="mt-4 pt-4 border-t-2 border-dashed border-orange-100 w-full flex justify-around text-sm font-black z-10">
              <div>
                <span className="text-orange-400 block text-[10px] uppercase tracking-wider">XP</span>
                <span className="text-[#3D2C1E]">{topThree[2].lifetime_xp.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-orange-400 block text-[10px] uppercase tracking-wider">Streak</span>
                <span className="text-amber-500 flex items-center gap-1 justify-center">
                  <Flame className="w-3.5 h-3.5" /> {topThree[2].current_streak}d
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b-2 border-dashed border-[#E5D3B3] pb-6">
        {/* Metric Tabs */}
        <div className="flex items-center gap-2 p-1.5 bg-[#FDF9F1] border-2 border-[#E5D3B3] rounded-2xl shadow-inner overflow-x-auto w-full sm:w-auto">
          {[
            { id: 'xp', label: 'Lifetime XP', icon: Sparkles },
            { id: 'streak', label: 'Iron Streaks', icon: Flame },
            { id: 'level', label: 'Highest Level', icon: Trophy },
          ].map((item) => {
            const IconComp = item.icon
            const isActive = tab === item.id
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  gameAudio.playTap()
                  setTab(item.id as any)
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all whitespace-nowrap touch-bounce ${
                  isActive
                    ? 'bg-white text-amber-700 shadow-sm border-2 border-[#E5D3B3]'
                    : 'bg-transparent text-[#8A7A6A] hover:text-[#3D2C1E] hover:bg-white/50 border-2 border-transparent'
                }`}
              >
                <IconComp className="w-4 h-4" />
                {item.label}
              </button>
            )
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-[#8A7A6A] absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search adventurer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border-2 border-[#E5D3B3] text-[#3D2C1E] placeholder-[#8A7A6A] text-sm font-bold shadow-inner focus:outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-400/20 transition-all"
          />
        </div>
      </div>

      {/* Ranks Table */}
      <div className="overflow-hidden rounded-3xl bg-white border-4 border-[#E5D3B3] shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-dashed border-[#E5D3B3] bg-[#FDF9F1] text-[11px] uppercase font-black text-[#8A7A6A] tracking-wider">
                <th className="py-4 px-6">Rank</th>
                <th className="py-4 px-6">Adventurer</th>
                <th className="py-4 px-6">Tier</th>
                <th className="py-4 px-6 text-center">Level</th>
                <th className="py-4 px-6 text-center">Streak</th>
                <th className="py-4 px-6 text-right">Lifetime XP</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-dashed divide-[#E5D3B3]/50 text-sm">
              {filteredEntries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-16 text-center">
                    <div className="max-w-md mx-auto space-y-3">
                      <Trophy className="w-12 h-12 text-amber-500/50 mx-auto" />
                      <h4 className="text-lg font-black text-[#3D2C1E] tracking-wide font-display">
                        {scope === 'global' ? 'HALL OF LEGENDS' : 'YOUR PARTY IS EMPTY'}
                      </h4>
                      <p className="text-xs font-bold text-[#8A7A6A] leading-relaxed">
                        {scope === 'global'
                          ? 'No legends have entered the leaderboard yet.'
                          : 'No friends have been added yet.'}
                      </p>
                      {scope === 'friends' && (
                        <button
                          type="button"
                          onClick={() => setShowSocialHub(true)}
                          className="btn-clash-gold text-xs px-4 py-2 rounded-xl text-white font-black uppercase tracking-wider touch-bounce shadow-sm inline-flex items-center gap-1.5 mt-2"
                        >
                          <UserPlus className="w-3.5 h-3.5" />
                          ADD FRIEND
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                filteredEntries.map((player) => {
                  const isTop1 = player.rank === 1
                  const isTop2 = player.rank === 2
                  const isTop3 = player.rank === 3
                  const isCurrent = player.id === currentUser.id

                  return (
                    <tr
                      key={player.id}
                      className={`hover:bg-[#FDF9F1] transition-colors ${
                        isCurrent
                          ? 'bg-amber-100/50 ring-2 ring-amber-400/50'
                          : isTop1
                          ? 'bg-amber-50/70'
                          : isTop2
                          ? 'bg-slate-50/70'
                          : isTop3
                          ? 'bg-orange-50/70'
                          : ''
                      }`}
                    >
                      {/* Rank */}
                      <td className="py-4 px-6 font-black">
                        {isTop1 ? (
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-b from-amber-300 to-amber-500 text-white font-black shadow-sm border-2 border-amber-200">
                            1
                          </span>
                        ) : isTop2 ? (
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-b from-slate-200 to-slate-300 text-slate-700 font-black shadow-sm border-2 border-slate-100">
                            2
                          </span>
                        ) : isTop3 ? (
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-b from-orange-200 to-orange-300 text-orange-800 font-black shadow-sm border-2 border-orange-100">
                            3
                          </span>
                        ) : (
                          <span className="text-[#8A7A6A] text-sm pl-2 font-mono">#{player.rank}</span>
                        )}
                      </td>

                      {/* Adventurer */}
                      <td className="py-4 px-6 font-black text-[#3D2C1E]">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-[#FDF9F1] border-2 border-[#E5D3B3] flex items-center justify-center text-[#8A7A6A] shadow-inner shrink-0">
                            <User className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="leading-tight flex items-center gap-1.5 font-display">
                              <span>{player.display_name}</span>
                              {isCurrent && (
                                <span className="text-[10px] font-black px-1.5 py-0.2 rounded bg-amber-400 text-white">
                                  YOU
                                </span>
                              )}
                            </div>
                            {player.public_uid && (
                              <div className="text-[11px] font-mono font-bold text-amber-800/70">
                                {player.public_uid}
                              </div>
                            )}
                            {player.active_creature_name && (
                              <div className="text-[11px] text-[#8A7A6A] font-bold mt-0.5 flex items-center gap-1">
                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                {player.active_creature_name}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Consistency Tier */}
                      <td className="py-4 px-6">
                        <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg bg-[#FDF9F1] border-2 border-[#E5D3B3] text-[#8A7A6A]">
                          {player.consistency_tier}
                        </span>
                      </td>

                      {/* Level */}
                      <td className="py-4 px-6 text-center font-black text-[#3D2C1E]">
                        Lvl <span className="text-indigo-600">{player.nexus_level}</span>
                      </td>

                      {/* Streak */}
                      <td className="py-4 px-6 text-center">
                        <span className="inline-flex items-center gap-1 text-amber-600 font-black">
                          <Flame className="w-4 h-4 text-orange-500" />
                          {player.current_streak}
                        </span>
                      </td>

                      {/* Total XP */}
                      <td className="py-4 px-6 text-right font-black text-[#3D2C1E]">
                        {player.lifetime_xp.toLocaleString()}{' '}
                        <span className="text-[10px] text-amber-500 ml-0.5">XP</span>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
