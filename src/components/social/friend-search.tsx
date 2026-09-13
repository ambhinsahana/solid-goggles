'use client'

import React, { useState } from 'react'
import { Search, UserPlus, Sparkles, Check, AlertCircle, Shield } from 'lucide-react'
import { formatPublicUid, isValidPublicUid } from '@/lib/uid/uid-generator'
import { searchPlayerByUid, sendFriendRequest } from '@/lib/social/friendships'
import { PublicPlayerProfile } from '@/lib/types'
import { CharacterSprite } from '@/components/characters/character-sprite'
import { getCharacterByIndex } from '@/lib/characters/character-registry'
import { gameAudio } from '@/lib/audio/game-audio'

interface FriendSearchProps {
  currentUser: {
    id: string
    display_name: string
    public_uid: string
  }
  onFriendAdded?: () => void
}

export function FriendSearch({ currentUser, onFriendAdded }: FriendSearchProps) {
  const [inputVal, setInputVal] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [searchResult, setSearchResult] = useState<PublicPlayerProfile | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)
  const [isAdding, setIsAdding] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value
    // Auto format towards LIFE-XXXX-XX
    const formatted = formatPublicUid(raw)
    setInputVal(formatted)
    setErrorMsg(null)
    setSuccessMsg(null)
  }

  const executeSearch = async (targetUid?: string) => {
    const query = targetUid || inputVal
    if (!query.trim()) {
      setErrorMsg('Please enter a Public UID (e.g. LIFE-4892-AK)')
      return
    }

    setIsSearching(true)
    setErrorMsg(null)
    setSearchResult(null)
    setSuccessMsg(null)
    gameAudio.playTap()

    try {
      const found = await searchPlayerByUid(query)
      if (found) {
        setSearchResult(found)
        gameAudio.playPop()
      } else {
        setErrorMsg(`No adventurer found with UID "${query}". Check the code and try again!`)
      }
    } catch {
      setErrorMsg('Error searching for player. Please check your network.')
    } finally {
      setIsSearching(false)
    }
  }

  const handleQuickChipClick = (uid: string) => {
    setInputVal(uid)
    executeSearch(uid)
  }

  const handleAddFriend = async () => {
    if (!searchResult) return
    setIsAdding(true)
    setErrorMsg(null)

    const res = await sendFriendRequest(currentUser, searchResult.public_uid)
    setIsAdding(false)

    if (res.success) {
      gameAudio.playVictory()
      setSuccessMsg(res.message)
      setSearchResult(null)
      setInputVal('')
      if (onFriendAdded) onFriendAdded()
    } else {
      gameAudio.playPop()
      setErrorMsg(res.message)
    }
  }

  const [copied, setCopied] = useState(false)

  const handleCopyMyUid = () => {
    if (typeof navigator !== 'undefined' && currentUser.public_uid) {
      navigator.clipboard.writeText(currentUser.public_uid)
      setCopied(true)
      gameAudio.playPop()
      setTimeout(() => setCopied(false), 2500)
    }
  }

  return (
    <div className="glass-frosted p-5 sm:p-6 rounded-3xl border-2 border-[#e6d5b8] shadow-lg flex flex-col gap-4">
      {/* Search Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center">
            <UserPlus className="w-4 h-4 text-amber-800" />
          </div>
          <div>
            <h3 className="font-display font-black text-lg text-world-text tracking-wide">
              Discover Adventurers
            </h3>
            <p className="text-xs text-amber-900/60 font-semibold">
              Add friends to your party using their unique Public UID
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-500/15 px-3 py-1 rounded-full border border-emerald-500/30">
          <Shield className="w-3.5 h-3.5 text-emerald-700" />
          <span>Zero-Leak Privacy</span>
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-amber-800/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={inputVal}
            onChange={handleInputChange}
            onKeyDown={(e) => e.key === 'Enter' && executeSearch()}
            placeholder="LIFE-XXXX-XX"
            maxLength={13}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl glass-pill border border-white/90 text-sm font-mono font-black text-world-text placeholder:text-amber-900/35 focus:outline-none focus:ring-2 focus:ring-amber-400/50 uppercase"
          />
        </div>

        <button
          type="button"
          onClick={() => executeSearch()}
          disabled={isSearching}
          className="btn-clash-gold px-5 py-2.5 rounded-2xl text-white font-display font-black text-xs uppercase tracking-wider disabled:opacity-50 touch-bounce flex items-center gap-1.5"
        >
          <Search className="w-3.5 h-3.5" />
          <span>{isSearching ? 'Searching...' : 'Find'}</span>
        </button>
      </div>

      {/* Share Your Own UID */}
      <div className="flex items-center justify-between p-2.5 rounded-2xl bg-[#f5efe6]/70 border border-[#e6d5b8] text-xs">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold text-amber-900/70">Your Public UID:</span>
          <span className="font-mono font-black text-amber-950 bg-white/80 px-2 py-0.5 rounded-lg border border-amber-300/40">
            {currentUser.public_uid}
          </span>
        </div>
        <button
          type="button"
          onClick={handleCopyMyUid}
          className="glass-pill px-3 py-1 rounded-xl text-[11px] font-black text-amber-900 hover:bg-white transition-all border border-amber-300/40 touch-bounce shadow-xs"
        >
          {copied ? 'Copied! ✓' : 'Copy UID'}
        </button>
      </div>

      {/* Feedback Alerts */}
      {errorMsg && (
        <div className="p-3 rounded-2xl bg-rose-50 border border-rose-300 text-rose-800 text-xs font-bold flex items-center gap-2 animate-in fade-in duration-200">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
          <span>{errorMsg}</span>
        </div>
      )}

      {successMsg && (
        <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-in fade-in duration-200">
          <Check className="w-4 h-4 shrink-0 text-emerald-600 stroke-[3]" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Found Player Card Preview */}
      {searchResult && (
        <div className="p-4 rounded-2xl bg-white/70 backdrop-blur-md border-2 border-amber-400/50 shadow-md flex items-center justify-between gap-4 animate-in zoom-in-95 duration-200">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-center shrink-0">
              <CharacterSprite
                characterIndex={searchResult.active_character_index}
                evolutionStage={searchResult.character_evolution_stage}
                size={54}
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-black text-base text-world-text">
                  {searchResult.display_name}
                </span>
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-200 text-amber-950">
                  Lv. {searchResult.nexus_level}
                </span>
              </div>
              <p className="text-xs font-mono font-bold text-amber-800/80">
                {searchResult.public_uid} · {searchResult.character_name}
              </p>
              <p className="text-[11px] font-bold text-amber-900/60 mt-0.5">
                Streak: {searchResult.current_streak} days · {searchResult.consistency_tier}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddFriend}
            disabled={isAdding}
            className="btn-clash-green px-4 py-2 rounded-xl text-white font-display font-black text-xs uppercase tracking-wider disabled:opacity-50 touch-bounce shrink-0 flex items-center gap-1.5 shadow-md"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>{isAdding ? 'Adding...' : '+ Add to Party'}</span>
          </button>
        </div>
      )}
    </div>
  )
}
