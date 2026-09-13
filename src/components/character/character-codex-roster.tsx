'use client'

import React, { useState } from 'react'
import { CHARACTER_ROSTER, CharacterDef, EVOLUTION_STAGES } from '@/lib/characters/character-registry'
import { getUnlockXpForCharacter, XP_PER_CHARACTER } from '@/lib/characters/character-progression'
import { CharacterSprite } from '@/components/characters/character-sprite'
import { setActiveCharacter } from '@/app/character/actions'
import { gameAudio } from '@/lib/audio/game-audio'
import { Sparkles, Lock, Check, Shield, Flame, Droplets, Leaf, Wind, Zap, Mountain, Snowflake, Moon, Sun, Orbit } from 'lucide-react'

interface CharacterCodexRosterProps {
  currentLifetimeXp: number
  activeCharacterIndex: number
  isLoggedIn?: boolean
}

export function CharacterCodexRoster({
  currentLifetimeXp = 0,
  activeCharacterIndex = 0,
  isLoggedIn = false,
}: CharacterCodexRosterProps) {
  const [selectedCharacterIndex, setSelectedCharacterIndex] = useState<number>(activeCharacterIndex)
  const [previewStages, setPreviewStages] = useState<Record<number, number>>({})
  const [isEquipping, setIsEquipping] = useState(false)
  const [equippedIndex, setEquippedIndex] = useState<number>(activeCharacterIndex)
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked'>('all')

  const naturalUnlockedCount = Math.min(
    CHARACTER_ROSTER.length,
    Math.floor(currentLifetimeXp / XP_PER_CHARACTER) + 1
  )

  const handleStageSelect = (charIndex: number, stage: number) => {
    gameAudio.playPop()
    setPreviewStages((prev) => ({ ...prev, [charIndex]: stage }))
  }

  const handleEquip = async (charIndex: number) => {
    gameAudio.playEquip()
    setIsEquipping(true)
    setEquippedIndex(charIndex)
    if (isLoggedIn) {
      await setActiveCharacter(charIndex)
    }
    setIsEquipping(false)
  }

  const getElementIcon = (element: string) => {
    switch (element) {
      case 'Fire': return <Flame className="w-3.5 h-3.5 text-orange-500" />
      case 'Water': return <Droplets className="w-3.5 h-3.5 text-cyan-500" />
      case 'Nature': return <Leaf className="w-3.5 h-3.5 text-emerald-500" />
      case 'Air': return <Wind className="w-3.5 h-3.5 text-sky-400" />
      case 'Lightning': return <Zap className="w-3.5 h-3.5 text-yellow-500" />
      case 'Earth': return <Mountain className="w-3.5 h-3.5 text-lime-600" />
      case 'Ice': return <Snowflake className="w-3.5 h-3.5 text-blue-400" />
      case 'Shadow': return <Moon className="w-3.5 h-3.5 text-purple-400" />
      case 'Solar': return <Sun className="w-3.5 h-3.5 text-amber-500" />
      case 'Cosmic': return <Orbit className="w-3.5 h-3.5 text-violet-400" />
      default: return <Shield className="w-3.5 h-3.5 text-world-accent" />
    }
  }

  const filteredCharacters = CHARACTER_ROSTER.filter((char) => {
    const isUnlocked = char.index < naturalUnlockedCount
    if (filter === 'unlocked') return isUnlocked
    if (filter === 'locked') return !isUnlocked
    return true
  })

  return (
    <div className="space-y-6">
      {/* Codex Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-900/10 pb-4">
        <div>
          <h3 className="font-display font-black text-2xl text-world-text tracking-wide flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-amber-600" />
            CHARACTER CODEX ({naturalUnlockedCount}/{CHARACTER_ROSTER.length} DISCOVERED)
          </h3>
          <p className="text-xs text-[#8a7a6a] mt-0.5">
            Progress through daily quests and milestones to awaken all 15 legendary characters and their 5 evolution forms.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-1.5 glass-pill p-1.5 rounded-2xl border border-white/90 self-start sm:self-auto shadow-sm">
          <button
            onClick={() => {
              gameAudio.playSwoosh()
              setFilter('all')
            }}
            className={`px-3 py-1 rounded-xl text-xs font-black touch-bounce transition-all ${
              filter === 'all'
                ? 'bg-amber-500 text-amber-950 shadow-sm border border-amber-400'
                : 'text-[#8a7a6a] hover:text-world-text hover:bg-white/40'
            }`}
          >
            All (15)
          </button>
          <button
            onClick={() => {
              gameAudio.playSwoosh()
              setFilter('unlocked')
            }}
            className={`px-3 py-1 rounded-xl text-xs font-black touch-bounce transition-all ${
              filter === 'unlocked'
                ? 'bg-emerald-600 text-white shadow-sm border border-emerald-500'
                : 'text-[#8a7a6a] hover:text-world-text hover:bg-white/40'
            }`}
          >
            Unlocked ({naturalUnlockedCount})
          </button>
          <button
            onClick={() => {
              gameAudio.playSwoosh()
              setFilter('locked')
            }}
            className={`px-3 py-1 rounded-xl text-xs font-black touch-bounce transition-all ${
              filter === 'locked'
                ? 'bg-rose-600 text-white shadow-sm border border-rose-500'
                : 'text-[#8a7a6a] hover:text-world-text hover:bg-white/40'
            }`}
          >
            Locked ({CHARACTER_ROSTER.length - naturalUnlockedCount})
          </button>
        </div>
      </div>

      {/* 15-Character Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredCharacters.map((char) => {
          const isUnlocked = char.index < naturalUnlockedCount
          const isEquipped = char.index === equippedIndex
          const requiredXp = getUnlockXpForCharacter(char.index)
          const currentStage = previewStages[char.index] || 1

          return (
            <div
              key={char.id}
              className={`glass-frosted p-5 rounded-2xl flex flex-col justify-between transition-all duration-300 relative overflow-hidden border border-white/90 shadow-[0_10px_30px_rgba(100,70,30,0.06)] ${
                isEquipped
                  ? 'ring-2 ring-amber-500/80 shadow-[0_12px_36px_rgba(212,168,83,0.25)]'
                  : 'hover:border-amber-300'
              } ${!isUnlocked ? 'opacity-85' : ''}`}
            >
              {/* Top Bar: Index, Name, Element Badge */}
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-amber-900/60 tracking-widest uppercase">
                      #{String(char.index + 1).padStart(2, '0')}
                    </span>
                    <h4 className="font-display font-black text-lg text-world-text leading-tight">
                      {char.name}
                    </h4>
                  </div>
                  <span className="text-xs text-amber-900/60 font-bold block">
                    {char.archetype}
                  </span>
                </div>

                <div className="flex flex-col items-end gap-1">
                  <div className="flex items-center gap-1.5 glass-pill px-2.5 py-0.5 rounded-full border border-white/80 text-xs font-black text-world-text shadow-xs">
                    {getElementIcon(char.element)}
                    <span>{char.element}</span>
                  </div>
                  {isEquipped && (
                    <span className="text-[10px] font-black bg-gradient-to-r from-amber-400 to-amber-500 text-amber-950 px-2.5 py-0.5 rounded-full shadow-xs border border-amber-300">
                      ★ ACTIVE HERO
                    </span>
                  )}
                </div>
              </div>

              {/* Character Sprite Display Stage */}
              <div className="my-4 py-4 flex flex-col items-center justify-center relative min-h-[160px] glass-pill rounded-2xl border border-white/70 overflow-hidden shadow-inner">
                {/* Glow circle */}
                {isUnlocked && (
                  <div
                    className="absolute w-28 h-28 rounded-full blur-2xl opacity-40 pointer-events-none"
                    style={{ backgroundColor: char.color }}
                  />
                )}

                <div
                  onClick={() => isUnlocked && gameAudio.playPet()}
                  className="cursor-pointer touch-bounce transition-transform duration-200 hover:scale-105"
                  title={isUnlocked ? 'Click to cheer with this character!' : undefined}
                >
                  <CharacterSprite
                    characterIndex={char.index}
                    evolutionStage={currentStage}
                    size={140}
                    animated={isUnlocked}
                    silhouette={!isUnlocked}
                  />
                </div>

                {/* Lock Overlay if Locked */}
                {!isUnlocked && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px] rounded-2xl text-center p-3">
                    <div className="w-11 h-11 rounded-2xl bg-black/70 border border-white/30 flex items-center justify-center mb-1 text-white shadow-md">
                      <Lock className="w-5 h-5 text-amber-400" />
                    </div>
                    <span className="text-xs font-black text-white drop-shadow-md">
                      Locked Character
                    </span>
                    <span className="text-[11px] text-amber-300 font-black drop-shadow">
                      Requires {requiredXp.toLocaleString()} Total XP
                    </span>
                  </div>
                )}
              </div>

              {/* Evolution Stage Switcher Bar */}
              {isUnlocked ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[11px] font-black text-[#8a7a6a]">
                    <span>Stage {currentStage}: {EVOLUTION_STAGES[currentStage - 1].name}</span>
                    <span className="text-[10px] text-amber-700 font-bold">Preview Form</span>
                  </div>

                  {/* 5 Stage Selectors */}
                  <div className="grid grid-cols-5 gap-1.5">
                    {[1, 2, 3, 4, 5].map((s) => {
                      const isCurrent = currentStage === s
                      return (
                        <button
                          key={s}
                          onClick={() => handleStageSelect(char.index, s)}
                          className={`py-1.5 rounded-xl text-xs font-black touch-bounce transition-all border ${
                            isCurrent
                              ? 'bg-gradient-to-b from-amber-400 to-amber-500 text-amber-950 border-amber-300 shadow-sm font-black'
                              : 'glass-pill text-[#8a7a6a] hover:text-world-text border-white/80'
                          }`}
                        >
                          S{s}
                        </button>
                      )
                    })}
                  </div>

                  {/* Equip Button */}
                  <button
                    onClick={() => handleEquip(char.index)}
                    disabled={isEquipped || isEquipping}
                    className={`w-full py-2.5 rounded-xl text-xs font-black tracking-wide transition-all shadow-sm flex items-center justify-center gap-1.5 touch-bounce ${
                      isEquipped
                        ? 'bg-emerald-600 text-white cursor-default border border-emerald-500 shadow-xs'
                        : 'btn-clash-gold bg-gradient-to-b from-amber-400 to-amber-600 text-amber-950 hover:brightness-105 border border-amber-300 shadow-[0_4px_0_#92400e]'
                    }`}
                  >
                    {isEquipped ? (
                      <>
                        <Check className="w-4 h-4 stroke-[3]" />
                        CURRENTLY ACTIVE
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        SELECT CHARACTER
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="w-full bg-black/10 h-2.5 rounded-full overflow-hidden border border-white/60">
                    <div
                      className="bg-gradient-to-r from-amber-400 to-orange-500 h-full transition-all rounded-full shadow-inner"
                      style={{
                        width: `${Math.min(
                          100,
                          Math.round((currentLifetimeXp / Math.max(1, requiredXp)) * 100)
                        )}%`,
                      }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-amber-900/70 font-black">
                    <span>Progress to Unlock</span>
                    <span>{currentLifetimeXp} / {requiredXp} XP</span>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
