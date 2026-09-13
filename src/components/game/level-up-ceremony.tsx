'use client'

import React, { useEffect, useState } from 'react'
import { CharacterSprite } from '@/components/characters/character-sprite'
import { gameAudio } from '@/lib/audio/game-audio'
import { Sparkles, Trophy, ArrowRight, Star, X } from 'lucide-react'

export interface LevelUpEventData {
  oldLevel: number
  newLevel: number
  characterIndex: number
  characterName: string
  evolutionStage: number
  stageName: string
  evolved: boolean
  xpEarned: number
  coinsEarned: number
}

interface LevelUpCeremonyProps {
  eventData: LevelUpEventData | null
  onDismiss: () => void
}

export function LevelUpCeremony({ eventData, onDismiss }: LevelUpCeremonyProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!eventData) {
      setVisible(false)
      return
    }

    setVisible(true)
    // Play celebratory sound fanfare
    gameAudio.playVictory()

    // Auto-dismiss after 5 seconds if not clicked
    const timer = setTimeout(() => {
      handleClose()
    }, 5000)

    return () => clearTimeout(timer)
  }, [eventData])

  const handleClose = () => {
    setVisible(false)
    gameAudio.playPop()
    setTimeout(() => {
      onDismiss()
    }, 300)
  }

  if (!eventData || !visible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
      {/* Dimmed backdrop with liquid glass blur */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-md transition-opacity"
        onClick={handleClose}
      />

      {/* ~70% Viewport Epic Modal Card */}
      <div className="relative z-10 w-full max-w-2xl max-h-[85vh] overflow-hidden rounded-3xl liquid-glass-hud border-2 border-amber-300/80 shadow-[0_25px_70px_rgba(245,158,11,0.35)] p-6 sm:p-10 text-center flex flex-col items-center justify-between animate-in zoom-in-95 duration-300">
        {/* Floating background rays */}
        <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-amber-400/20 blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-orange-500/20 blur-3xl pointer-events-none animate-pulse" />

        {/* Dismiss X button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-black/10 hover:bg-black/20 text-amber-950/70 hover:text-amber-950 transition-colors touch-bounce cursor-pointer"
          title="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-900 text-xs font-black uppercase tracking-widest mb-3 shadow-xs animate-bounce">
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span>REALM MILESTONE REACHED</span>
          <Sparkles className="w-4 h-4 text-amber-600" />
        </div>

        {/* Title */}
        <h2 className="text-4xl sm:text-5xl font-display font-black text-amber-950 tracking-tight drop-shadow-sm mb-2">
          ✨ LEVEL UP! ✨
        </h2>
        <p className="text-sm font-bold text-amber-900/70 max-w-md mx-auto mb-6">
          Your unwavering consistency and discipline have awakened greater elemental power!
        </p>

        {/* Center: Character with Celebrate Animation */}
        <div className="relative my-2 flex flex-col items-center justify-center">
          {/* Ground Aura Pedestal */}
          <div className="absolute -bottom-2 w-48 h-8 rounded-full bg-amber-500/30 blur-md pointer-events-none animate-pulse" />
          
          <div className="animate-ref-celebrate p-4">
            <CharacterSprite
              characterIndex={eventData.characterIndex}
              evolutionStage={eventData.evolutionStage}
              size={140}
              animated={true}
            />
          </div>

          <span className="text-sm font-black text-amber-900 mt-1 uppercase tracking-wider">
            {eventData.characterName}
          </span>
        </div>

        {/* Level Transition Pill */}
        <div className="flex items-center justify-center gap-4 my-5 bg-white/80 border border-amber-300/80 rounded-2xl px-6 py-3 shadow-md">
          <div className="text-center">
            <span className="text-[10px] uppercase font-bold text-amber-900/60 block">Previous</span>
            <span className="text-2xl font-black font-display text-slate-500">LVL {eventData.oldLevel}</span>
          </div>

          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-400/30 text-amber-800">
            <ArrowRight className="w-5 h-5 stroke-[3]" />
          </div>

          <div className="text-center">
            <span className="text-[10px] uppercase font-bold text-amber-900/60 block">Ascended To</span>
            <span className="text-3xl font-black font-display text-amber-600 drop-shadow-xs">
              LVL {eventData.newLevel}
            </span>
          </div>
        </div>

        {/* Evolution Event Banner if triggered */}
        {eventData.evolved && (
          <div className="w-full bg-gradient-to-r from-amber-500/20 via-yellow-400/30 to-amber-500/20 border-2 border-amber-400 rounded-2xl p-3.5 mb-5 text-center animate-in zoom-in-90 duration-300 shadow-md">
            <div className="flex items-center justify-center gap-1.5 text-xs font-black uppercase tracking-wider text-amber-900 mb-1">
              <Star className="w-4 h-4 fill-amber-500 text-amber-500 animate-spin" />
              <span>FORM EVOLUTION UNLOCKED!</span>
              <Star className="w-4 h-4 fill-amber-500 text-amber-500 animate-spin" />
            </div>
            <p className="text-base font-black text-amber-950 font-display">
              {eventData.characterName} evolved to Stage {eventData.evolutionStage} — {eventData.stageName}!
            </p>
          </div>
        )}

        {/* Action Button */}
        <button
          onClick={handleClose}
          type="button"
          className="btn-clash-gold w-full sm:w-auto px-10 py-3.5 rounded-2xl bg-gradient-to-b from-amber-400 to-amber-600 text-amber-950 font-black text-base tracking-wider uppercase shadow-[0_6px_0_#92400e] hover:shadow-[0_2px_0_#92400e] hover:translate-y-[2px] transition-all touch-bounce flex items-center justify-center gap-2 cursor-pointer mt-2"
        >
          <Trophy className="w-5 h-5 text-amber-950" />
          <span>CLAIM GLORY & CONTINUE</span>
        </button>
      </div>
    </div>
  )
}
