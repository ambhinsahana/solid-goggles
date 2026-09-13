'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { CharacterSprite } from '@/components/characters/character-sprite'
import { getCharacterByIndex, getStageName } from '@/lib/characters/character-registry'
import {
  BASE_ACTIONS,
  getRandomActionForCharacter,
  ActionDefinition,
  CharacterActionType,
  CHARACTER_ACTION_CUSTOMIZATIONS,
} from '@/lib/characters/character-actions'
import { gameAudio } from '@/lib/audio/game-audio'
import { Sparkles, Heart, Compass, Pause, Play, Wand2 } from 'lucide-react'

interface CharacterWorldSceneProps {
  characterIndex?: number
  evolutionStage?: number
  characterName?: string
  level?: number
  className?: string
}

export function CharacterWorldScene({
  characterIndex = 0,
  evolutionStage = 1,
  characterName,
  level = 1,
  className = '',
}: CharacterWorldSceneProps) {
  const character = getCharacterByIndex(characterIndex)
  const displayName = characterName || character.name
  const stageName = getStageName(evolutionStage)

  const [currentAction, setCurrentAction] = useState<ActionDefinition>(BASE_ACTIONS.idle)
  const [isActing, setIsActing] = useState(false)
  const [speechBubble, setSpeechBubble] = useState<string | null>(null)
  const [hearts, setHearts] = useState<{ id: number; x: number }[]>([])
  const [isAutoActive, setIsAutoActive] = useState(true)

  const actionTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const loopTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Execute an action on the character
  const triggerAction = (action: ActionDefinition, playSound = true) => {
    if (actionTimeoutRef.current) clearTimeout(actionTimeoutRef.current)

    setCurrentAction(action)
    setIsActing(true)
    setSpeechBubble(action.emoteText)

    if (playSound) {
      if (action.soundEffect === 'strike') {
        gameAudio.playStrike()
      } else if (action.soundEffect === 'victory') {
        gameAudio.playVictory()
      } else if (action.soundEffect === 'pet') {
        gameAudio.playPet()
      } else {
        gameAudio.playPop()
      }
    }

    // After duration, return to idle
    actionTimeoutRef.current = setTimeout(() => {
      setCurrentAction(BASE_ACTIONS.idle)
      setIsActing(false)
      // Hide speech bubble slightly after action finishes
      setTimeout(() => {
        setSpeechBubble(null)
      }, 700)
    }, action.durationMs || 1800)
  }

  // Periodic automatic idle action loop matching reference video pacing
  useEffect(() => {
    if (!isAutoActive) return

    const scheduleNextAction = () => {
      // Natural random interval between 7 and 12 seconds
      const delay = Math.floor(Math.random() * 5000) + 7000
      loopTimeoutRef.current = setTimeout(() => {
        if (!isActing) {
          const nextAction = getRandomActionForCharacter(character.name)
          triggerAction(nextAction, true)
        }
        scheduleNextAction()
      }, delay)
    }

    scheduleNextAction()

    return () => {
      if (loopTimeoutRef.current) clearTimeout(loopTimeoutRef.current)
      if (actionTimeoutRef.current) clearTimeout(actionTimeoutRef.current)
    }
  }, [isAutoActive, isActing, character.name])

  // Click on character (Cheer / Pet reaction)
  const handleCharacterClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    const rect = e.currentTarget.getBoundingClientRect()
    const relativeX = e.clientX - rect.left - 20

    // Spawn floating heart
    const newHeart = { id: Date.now() + Math.random(), x: relativeX }
    setHearts((prev) => [...prev, newHeart])
    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h.id !== newHeart.id))
    }, 1400)

    // Trigger happy cheer action
    const happyAction = {
      ...BASE_ACTIONS.happy,
      emoteText: CHARACTER_ACTION_CUSTOMIZATIONS[character.name]?.happy || `Yay! Ready with ${displayName}! ✨`,
    }
    triggerAction(happyAction, true)
  }

  // Quick Action Buttons matching reference video behaviors
  const quickActions: { id: CharacterActionType; label: string; icon: string }[] = [
    { id: 'wave', label: 'Wave', icon: '👋' },
    { id: 'spin', label: 'Spin', icon: '💫' },
    { id: 'leap', label: 'Bound', icon: '🐾' },
    { id: 'sit', label: 'Rest', icon: '🌿' },
    { id: 'victory', label: 'Celebrate', icon: '✨' },
  ]

  return (
    <div
      className={`relative w-full rounded-3xl border-2 border-white/90 shadow-xl overflow-hidden liquid-glass select-none ${className}`}
      style={{
        background: 'linear-gradient(180deg, #e3f2fd 0%, #fff8e7 65%, #edf7e7 100%)',
      }}
    >
      {/* Anime Sky & Environmental Background Layers */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft Golden Sun Glow */}
        <div className="absolute -top-12 right-12 w-48 h-48 rounded-full bg-gradient-to-br from-amber-300/40 via-yellow-200/25 to-transparent blur-2xl" />

        {/* Drifting Anime Clouds */}
        <div className="absolute top-4 left-0 w-full opacity-60">
          <svg
            className="w-24 h-10 text-white/80 animate-cloud-drift absolute top-2"
            viewBox="0 0 100 40"
            fill="currentColor"
            style={{ animationDuration: '45s' }}
          >
            <path d="M20,30 Q10,30 10,20 Q10,10 25,10 Q35,0 55,5 Q75,0 85,15 Q95,15 95,25 Q95,30 85,30 Z" />
          </svg>
          <svg
            className="w-36 h-14 text-white/70 animate-cloud-drift absolute top-10"
            viewBox="0 0 100 40"
            fill="currentColor"
            style={{ animationDuration: '70s', animationDelay: '-20s' }}
          >
            <path d="M20,30 Q10,30 10,20 Q10,10 25,10 Q35,0 55,5 Q75,0 85,15 Q95,15 95,25 Q95,30 85,30 Z" />
          </svg>
        </div>

        {/* Distant Anime Mountain Silhouette Layers */}
        <svg
          className="absolute bottom-16 left-0 w-full h-28 opacity-45"
          preserveAspectRatio="none"
          viewBox="0 0 800 200"
        >
          {/* Back distant blue-green mountains */}
          <path
            d="M0,160 L120,60 L240,140 L380,40 L520,130 L660,70 L800,150 L800,200 L0,200 Z"
            fill="#8cb3a7"
          />
          {/* Mid soft emerald hills */}
          <path
            d="M0,170 Q180,100 360,150 T720,140 L800,160 L800,200 L0,200 Z"
            fill="#a1c99c"
            opacity="0.7"
          />
        </svg>

        {/* Foreground Lush Grass & Wildflowers */}
        <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-[#c5e6a6] via-[#dcf2bc] to-transparent" />

        {/* Cute Stylized Grass Blades & Flowers */}
        <div className="absolute bottom-2 left-6 text-emerald-600/70 text-xs font-mono">
          🌾 🌸 🌿
        </div>
        <div className="absolute bottom-2 right-8 text-emerald-600/70 text-xs font-mono">
          🌼 🌿 🌸
        </div>

        {/* Floating Sparkles & Luminous Magic Orbs */}
        <div className="absolute top-12 left-1/4 w-2 h-2 rounded-full bg-amber-300/80 animate-particle-glow" />
        <div
          className="absolute top-20 right-1/3 w-1.5 h-1.5 rounded-full bg-sky-400/80 animate-particle-glow"
          style={{ animationDelay: '1s' }}
        />
        <div
          className="absolute bottom-24 left-1/3 w-2 h-2 rounded-full bg-emerald-400/70 animate-particle-glow"
          style={{ animationDelay: '1.8s' }}
        />
      </div>

      {/* Top Header Bar: Character Identity & Auto-Play Toggle */}
      <div className="relative z-20 flex items-center justify-between p-3.5 sm:p-4">
        {/* Active Character Identity Badge */}
        <div className="flex items-center gap-2.5">
          <div
            className="w-4 h-4 rounded-full ring-2 ring-white/90 shadow-sm"
            style={{ backgroundColor: character.color }}
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-black text-world-text text-base sm:text-lg tracking-wide">
                {character.name}
              </span>
              <span className="text-[11px] font-black px-2 py-0.5 rounded-full bg-amber-200/90 text-amber-950 border border-amber-400/60 shadow-xs">
                Lv. {level}
              </span>
              <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-white/70 text-amber-900 border border-amber-300/50 hidden sm:inline-block">
                Stage {evolutionStage}: {stageName}
              </span>
            </div>
            <p className="text-[11px] text-amber-900/75 font-semibold">
              {character.archetype} · {character.element.toUpperCase()}
            </p>
          </div>
        </div>

        {/* Action / World Controls */}
        <div className="flex items-center gap-1.5">
          {/* Pause / Play Auto Idle Loop */}
          <button
            type="button"
            onClick={() => setIsAutoActive(!isAutoActive)}
            title={isAutoActive ? 'Pause idle auto-actions' : 'Resume idle auto-actions'}
            className="flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full glass-pill text-amber-950 hover:bg-white/90 transition-all touch-bounce"
          >
            {isAutoActive ? (
              <>
                <Pause className="w-3 h-3 text-amber-700" />
                <span className="hidden sm:inline">Auto</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 text-emerald-700 fill-emerald-600" />
                <span className="hidden sm:inline">Paused</span>
              </>
            )}
          </button>

          {/* Link to Codex Roster */}
          <Link
            href="/character"
            onClick={() => gameAudio.playTap()}
            title="Open Character Codex"
            className="flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full glass-pill text-amber-950 hover:bg-white/90 transition-all touch-bounce"
          >
            <Compass className="w-3 h-3 text-amber-700" />
            <span className="hidden sm:inline">Codex</span>
          </Link>
        </div>
      </div>

      {/* Main Character Stage & Action Display */}
      <div className="relative z-10 flex flex-col items-center justify-center pt-2 pb-5 min-h-[220px]">
        {/* Floating Emote Speech Bubble */}
        <div
          className={`transition-all duration-300 transform ${
            speechBubble
              ? 'opacity-100 -translate-y-2 scale-100'
              : 'opacity-0 translate-y-2 scale-90 pointer-events-none'
          } mb-3`}
        >
          <div className="relative px-4 py-2 rounded-2xl glass-frosted-dark text-white font-display font-black text-xs sm:text-sm tracking-wide shadow-lg border border-amber-300/50 flex items-center gap-1.5">
            <span>{speechBubble || '...'}</span>
            {/* Bubble arrow down */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#2a1c12] rotate-45 border-r border-b border-amber-300/50" />
          </div>
        </div>

        {/* Floating Heart Reactions */}
        {hearts.map((h) => (
          <div
            key={h.id}
            className="absolute top-16 z-30 pointer-events-none text-rose-500 animate-float"
            style={{ left: `calc(50% + ${h.x}px)` }}
          >
            <Heart className="w-6 h-6 fill-rose-500 stroke-rose-600 drop-shadow-md animate-ping" />
          </div>
        ))}

        {/* Clean Ground Pedestal & Ambient Shadow (Matching Reference Video) */}
        <div className="relative flex flex-col items-center">
          {/* Soft Ground Ambient Shadow */}
          <div className="absolute -bottom-3 w-48 h-8 rounded-[100%] bg-black/15 blur-sm pointer-events-none -z-10" />

          {/* Clean Voxel Grassy Block Pedestal */}
          <div className="absolute -bottom-2 w-44 h-8 rounded-2xl bg-gradient-to-b from-[#7cb342] via-[#689f38] to-[#558b2f] border-t-2 border-[#aed581] shadow-inner pointer-events-none flex items-center justify-center">
            {/* Pedestal Earth Base Layer */}
            <div className="absolute bottom-0 w-full h-2.5 rounded-b-2xl bg-[#5d4037] border-t border-[#4e342e]" />
          </div>

          {/* The Hero Character Sprite */}
          <div
            onClick={handleCharacterClick}
            className={`cursor-pointer touch-bounce transition-transform duration-300 relative z-20 ${
              currentAction.cssClass || 'animate-ref-idle'
            }`}
            title={`Click to cheer with ${displayName}!`}
          >
            <CharacterSprite
              characterIndex={character.index}
              evolutionStage={evolutionStage}
              size={156}
              animated={!isActing}
            />
          </div>
        </div>

        {/* Evolution Progress Dots */}
        <div className="mt-4 flex items-center gap-2">
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
                    : 'bg-black/15 border border-black/10'
                }`}
              />
            )
          })}
        </div>
      </div>

      {/* Bottom Interactive Emote Action Bar */}
      <div className="relative z-20 px-3 pb-3 pt-1 flex items-center justify-center gap-2 flex-wrap">
        <span className="text-[11px] font-bold text-amber-950/70 flex items-center gap-1 mr-1">
          <Wand2 className="w-3 h-3 text-amber-700" />
          <span>Action:</span>
        </span>
        {quickActions.map((qa) => {
          const actionDef = BASE_ACTIONS[qa.id]
          const customText =
            CHARACTER_ACTION_CUSTOMIZATIONS[character.name]?.[qa.id] || actionDef.emoteText
          const actionWithCustom = { ...actionDef, emoteText: customText }
          const isCurrent = currentAction.id === qa.id

          return (
            <button
              key={qa.id}
              type="button"
              onClick={() => triggerAction(actionWithCustom, true)}
              className={`text-xs font-black px-3 py-1 rounded-full transition-all touch-bounce flex items-center gap-1 ${
                isCurrent
                  ? 'bg-amber-500 text-white shadow-md scale-105 border border-amber-300'
                  : 'glass-pill text-amber-950 hover:bg-white/90 border border-white/80 shadow-xs'
              }`}
            >
              <span>{qa.icon}</span>
              <span>{qa.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
