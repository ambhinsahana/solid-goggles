'use client'

import React from 'react'
import { Sparkles, Crown, Zap } from 'lucide-react'
import { gameAudio } from '@/lib/audio/game-audio'
import { PlayerUid } from '@/components/game/player-uid'

interface CharacterHudProps {
  name: string
  publicUid?: string
  level: number
  title: string
  xp: number
  nextLevelXp: number
  coins: number
  streak: number
  characterName?: string
  evolutionStage?: number
  stageName?: string
  stageProgressPercent?: number
  stageXpCurrent?: number
  stageXpRequired?: number
}

export function CharacterHud({
  name,
  publicUid,
  level,
  title,
  xp,
  nextLevelXp,
  coins,
  streak,
  characterName,
  evolutionStage = 1,
  stageName = 'Sprout',
  stageProgressPercent = 0,
  stageXpCurrent = 0,
  stageXpRequired = 200,
}: CharacterHudProps) {
  const levelProgressPercent = Math.min(100, Math.max(0, (xp / (nextLevelXp || 100)) * 100))

  return (
    <div className="liquid-glass-hud p-4 sm:p-5 w-full flex flex-col gap-3 rounded-3xl border border-white/95 shadow-[0_16px_36px_rgba(100,70,30,0.10)]">
      {/* Header: Name, UID, Title, and Level Badge */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <div className="w-7 h-7 rounded-lg bg-amber-400/20 border border-amber-400/40 flex items-center justify-center shrink-0">
              <Crown className="w-4 h-4 text-amber-600 drop-shadow-sm" />
            </div>
            <h2 className="font-display font-black text-xl sm:text-2xl text-world-text tracking-wide drop-shadow-sm">
              {name || 'Adventurer'}
            </h2>
            {publicUid && (
              <>
                <span className="text-amber-900/30 text-sm hidden sm:inline">·</span>
                <PlayerUid uid={publicUid} />
              </>
            )}
          </div>
          <div className="flex items-center gap-2 mt-1 ml-9">
            <span className="text-xs text-amber-700 font-black uppercase tracking-widest">
              « {title || 'Novice'} »
            </span>
            {characterName && (
              <span className="text-[11px] font-black text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-full border border-emerald-300 shadow-xs">
                {characterName} • Stage {evolutionStage} ({stageName})
              </span>
            )}
          </div>
        </div>
        <div
          onClick={() => gameAudio.playPop()}
          className="flex flex-col items-center justify-center w-14 h-14 rounded-2xl border-2 border-amber-300 bg-gradient-to-b from-amber-100 to-amber-200 shadow-[0_4px_0_#d97706] touch-bounce cursor-pointer"
          title="Player Level"
        >
          <span className="text-[9px] font-black uppercase tracking-widest text-amber-800">LVL</span>
          <span className="font-display font-black text-xl text-amber-950 -mt-1">
            {level}
          </span>
        </div>
      </div>

      {/* Two Progression Gauges: Level XP & Character Evolution */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
        {/* Level XP Bar */}
        <div className="flex flex-col gap-1.5 glass-pill p-3 rounded-xl border border-white/90">
          <div className="flex justify-between text-xs font-black text-world-text">
            <span className="flex items-center gap-1 text-cyan-800 font-black">
              <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
              Player Level XP
            </span>
            <span className="text-cyan-900 font-black">{xp} / {nextLevelXp}</span>
          </div>
          <div className="h-3 w-full bg-cyan-950/10 rounded-full overflow-hidden border border-white/60 p-0.5">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 transition-all duration-700 rounded-full shadow-inner"
              style={{ width: `${levelProgressPercent}%` }}
            />
          </div>
        </div>

        {/* Character Evolution Stage Progress Bar */}
        <div className="flex flex-col gap-1.5 glass-pill p-3 rounded-xl border border-white/90">
          <div className="flex justify-between text-xs font-black text-world-text">
            <span className="flex items-center gap-1 text-amber-800 font-black">
              <Zap className="w-3.5 h-3.5 text-amber-600" />
              Evolution Progress
            </span>
            <span className="text-amber-900 font-black">
              {stageXpCurrent} / {stageXpRequired} XP ({stageProgressPercent}%)
            </span>
          </div>
          <div className="h-3 w-full bg-amber-950/10 rounded-full overflow-hidden border border-white/60 p-0.5">
            <div
              className="h-full bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 transition-all duration-700 rounded-full shadow-inner"
              style={{ width: `${stageProgressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Currencies & Real Stats Bar */}
      <div className="flex items-center justify-between mt-1 pt-3 border-t border-amber-900/10">
        <div
          onClick={() => gameAudio.playCoin()}
          className="flex items-center gap-2 touch-bounce cursor-pointer"
          title="Gold Reserve Coins"
        >
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-yellow-300 to-amber-500 shadow-sm border border-amber-600/50 flex items-center justify-center font-black text-[11px] text-amber-950">
            G
          </div>
          <div className="flex flex-col">
            <span className="font-black text-amber-700 text-sm leading-none">{coins}</span>
            <span className="text-[9px] font-black text-amber-900/60 uppercase">Coins</span>
          </div>
        </div>

        <div
          onClick={() => gameAudio.playPop()}
          className="flex items-center gap-2 touch-bounce cursor-pointer"
          title="Active Daily Streak"
        >
          <span className="text-2xl animate-bounce">🔥</span>
          <div className="flex flex-col">
            <span className="font-black text-rose-600 text-sm leading-none">{streak} Days</span>
            <span className="text-[9px] font-black text-rose-900/60 uppercase">Streak</span>
          </div>
        </div>

        <div
          onClick={() => gameAudio.playPop()}
          className="flex items-center gap-2 touch-bounce cursor-pointer"
          title="Lifetime Earned XP"
        >
          <div className="w-7 h-7 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-cyan-600" />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-cyan-700 text-sm leading-none">{xp}</span>
            <span className="text-[9px] font-black text-cyan-900/60 uppercase">Lifetime XP</span>
          </div>
        </div>
      </div>
    </div>
  )
}
