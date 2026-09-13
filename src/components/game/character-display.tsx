'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { CharacterSprite } from '@/components/characters/character-sprite'
import { getCharacterByIndex, getStageName } from '@/lib/characters/character-registry'
import { Sparkles, Heart } from 'lucide-react'
import { gameAudio } from '@/lib/audio/game-audio'

interface CharacterDisplayProps {
  characterIndex?: number
  evolutionStage?: number
  size?: number
  showInfo?: boolean
}

export function CharacterDisplay({
  characterIndex = 0,
  evolutionStage = 1,
  size = 180,
  showInfo = true,
}: CharacterDisplayProps) {
  const [isCheering, setIsCheering] = useState(false)
  const [hearts, setHearts] = useState<number[]>([])
  const character = getCharacterByIndex(characterIndex)
  const stageName = getStageName(evolutionStage)

  const handleSpriteClick = () => {
    gameAudio.playPet()
    setIsCheering(true)
    const newHeartId = Date.now()
    setHearts((prev) => [...prev, newHeartId])
    setTimeout(() => {
      setIsCheering(false)
    }, 600)
    setTimeout(() => {
      setHearts((prev) => prev.filter((id) => id !== newHeartId))
    }, 1200)
  }

  return (
    <div className="flex flex-col items-center select-none">
      {/* Grounding Platform and Hero Sprite Container */}
      <div className="relative flex justify-center items-end min-h-[220px] w-full">
        {/* Glow behind character matching their element color */}
        <div
          className="absolute bottom-6 w-40 h-40 rounded-full blur-3xl opacity-50 animate-pulse pointer-events-none -z-10"
          style={{ backgroundColor: character.color }}
        />

        {/* Floating Heart Reactions on Pet */}
        {hearts.map((id) => (
          <div
            key={id}
            className="absolute bottom-28 z-30 pointer-events-none animate-float text-rose-500"
            style={{ animationDuration: '1s' }}
          >
            <Heart className="w-6 h-6 fill-rose-500 stroke-rose-600 drop-shadow-md animate-ping" />
          </div>
        ))}

        {/* Frosted Glass Pedestal Disc with Iridescent Border */}
        <div className="absolute bottom-1 flex flex-col items-center pointer-events-none">
          {/* Glass Disc Base */}
          <div
            className="w-48 h-10 rounded-[100%] bg-white/40 backdrop-blur-md border-2 border-white/80 shadow-[0_8px_20px_rgba(0,0,0,0.1)]"
            style={{ borderColor: `${character.color}60` }}
          />
          <div
            className="w-36 h-5 -mt-8 rounded-[100%] bg-white/60 blur-[1px] border border-white/90"
          />
        </div>

        {/* Animated Hero Character Sprite with Tap-to-Cheer */}
        <div
          onClick={handleSpriteClick}
          className={`relative z-10 cursor-pointer touch-bounce transition-transform duration-300 ${
            isCheering ? '-translate-y-4 scale-110' : 'hover:scale-105'
          }`}
          title="Click to interact with your hero!"
        >
          <CharacterSprite
            characterIndex={character.index}
            evolutionStage={evolutionStage}
            size={size}
            animated={true}
          />
        </div>
      </div>

      {/* Info Badge below character */}
      {showInfo && (
        <div className="mt-2 flex flex-col items-center text-center space-y-1.5 z-20">
          <div
            onClick={() => gameAudio.playPop()}
            className="flex items-center gap-2 glass-pill px-4 py-1.5 rounded-full border border-white/90 shadow-sm touch-bounce cursor-pointer"
          >
            <span
              className="w-3 h-3 rounded-full shadow-sm ring-2 ring-white/60"
              style={{ backgroundColor: character.color }}
            />
            <span className="font-display font-black text-world-text text-sm tracking-wider">
              {character.name}
            </span>
            <span className="text-[11px] text-amber-950 font-black px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-200 to-amber-300 border border-amber-400/50 shadow-xs">
              Stage {evolutionStage}: {stageName}
            </span>
          </div>

          {/* 5-Dot Evolution Progress Indicator */}
          <div className="flex items-center gap-2 py-1">
            {[1, 2, 3, 4, 5].map((s) => {
              const isAchieved = s <= evolutionStage
              return (
                <div
                  key={s}
                  onClick={() => gameAudio.playPop()}
                  title={`Stage ${s}: ${getStageName(s)}`}
                  className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer touch-bounce ${
                    isAchieved
                      ? 'bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.9)] scale-110 border border-amber-200'
                      : 'bg-black/10 border border-black/10'
                  }`}
                />
              )
            })}
          </div>

          <Link
            href="/character"
            onClick={() => gameAudio.playTap()}
            className="text-[11px] font-black text-amber-900/70 hover:text-amber-800 transition-colors flex items-center gap-1 touch-bounce"
          >
            <Sparkles className="w-3 h-3 text-amber-600" />
            <span>View Codex Collection →</span>
          </Link>
        </div>
      )}
    </div>
  )
}
