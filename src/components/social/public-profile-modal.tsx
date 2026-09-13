'use client'

import React from 'react'
import { PublicPlayerProfile } from '@/lib/types'
import { CharacterSprite } from '@/components/characters/character-sprite'
import { getCharacterByIndex, getStageName } from '@/lib/characters/character-registry'
import { gameAudio } from '@/lib/audio/game-audio'
import { X, Shield, Zap, Flame, Crown, Copy, Check } from 'lucide-react'
import { useState } from 'react'

interface PublicProfileModalProps {
  player: PublicPlayerProfile | null
  onClose: () => void
}

export function PublicProfileModal({ player, onClose }: PublicProfileModalProps) {
  const [copied, setCopied] = useState(false)

  if (!player) return null

  const character = getCharacterByIndex(player.active_character_index)
  const stageName = getStageName(player.character_evolution_stage)

  const handleCopyUid = () => {
    navigator.clipboard.writeText(player.public_uid)
    gameAudio.playPop()
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-3xl glass-frosted border-4 border-[#e6d5b8] shadow-2xl overflow-hidden p-6 text-world-text select-none animate-in zoom-in-95 duration-200">
        {/* Background Aura */}
        <div
          className="absolute -top-20 -right-20 w-52 h-52 rounded-full blur-3xl opacity-30 pointer-events-none -z-10"
          style={{ backgroundColor: character.color }}
        />

        {/* Close button */}
        <button
          onClick={() => {
            gameAudio.playTap()
            onClose()
          }}
          className="absolute top-4 right-4 p-2 rounded-full glass-pill text-amber-900 hover:text-black hover:bg-white/90 transition-colors touch-bounce"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-5 h-5 text-amber-700" />
          <span className="text-xs font-black uppercase tracking-widest text-amber-900/70">
            Public Gamer Card
          </span>
        </div>

        {/* Character Avatar & Glow Disc */}
        <div className="flex flex-col items-center justify-center py-3 relative">
          <div
            className="w-32 h-32 rounded-full flex items-center justify-center relative shadow-inner border-2 border-white/80"
            style={{
              background: `radial-gradient(circle, ${character.color}35 0%, rgba(255,255,255,0.8) 70%)`,
            }}
          >
            <CharacterSprite
              characterIndex={player.active_character_index}
              evolutionStage={player.character_evolution_stage}
              size={110}
              animated={true}
            />
          </div>

          <div className="mt-3 text-center">
            <h3 className="font-display font-black text-2xl text-world-text">
              {player.display_name}
            </h3>
            {/* Public UID badge */}
            <div
              onClick={handleCopyUid}
              className="mt-1 inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-pill border border-amber-400/40 text-xs font-mono font-bold text-amber-950 cursor-pointer touch-bounce hover:bg-white/90 shadow-xs"
              title="Click to copy UID"
            >
              <span>{player.public_uid}</span>
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-amber-700" />
              )}
            </div>
          </div>
        </div>

        {/* Public Attributes Grid */}
        <div className="grid grid-cols-3 gap-2.5 mt-4">
          {/* Level */}
          <div className="glass-pill p-3 rounded-2xl border border-white/80 flex flex-col items-center text-center">
            <Crown className="w-4 h-4 text-amber-600 mb-1" />
            <span className="text-[10px] font-black uppercase text-amber-900/60">Level</span>
            <span className="font-black text-lg text-world-text">{player.nexus_level}</span>
          </div>

          {/* Current Streak */}
          <div className="glass-pill p-3 rounded-2xl border border-white/80 flex flex-col items-center text-center">
            <Flame className="w-4 h-4 text-orange-500 mb-1" />
            <span className="text-[10px] font-black uppercase text-amber-900/60">Streak</span>
            <span className="font-black text-lg text-world-text">{player.current_streak}d</span>
          </div>

          {/* Lifetime XP */}
          <div className="glass-pill p-3 rounded-2xl border border-white/80 flex flex-col items-center text-center">
            <Zap className="w-4 h-4 text-sky-500 mb-1" />
            <span className="text-[10px] font-black uppercase text-amber-900/60">Total XP</span>
            <span className="font-black text-lg text-world-text">{player.lifetime_xp.toLocaleString()}</span>
          </div>
        </div>

        {/* Active Hero Details */}
        <div className="mt-4 p-3 rounded-2xl glass-pill border border-white/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full shadow-xs"
              style={{ backgroundColor: character.color }}
            />
            <span className="font-display font-black text-sm text-world-text">
              {character.name}
            </span>
          </div>
          <span className="text-xs font-black text-amber-900 px-2.5 py-0.5 rounded-full bg-amber-200/80 border border-amber-400/50">
            Stage {player.character_evolution_stage}: {stageName}
          </span>
        </div>

        {/* Security Privacy Guarantee */}
        <p className="mt-4 text-[11px] text-center text-amber-900/60 font-semibold">
          🛡️ Safe gamer profile: Email addresses & private account data are never revealed.
        </p>
      </div>
    </div>
  )
}
