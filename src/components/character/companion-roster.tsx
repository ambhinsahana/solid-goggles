'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Sparkles, Flame, Droplets, Mountain, Zap, Shield, Heart, Check } from 'lucide-react'
import { gameAudio } from '@/lib/audio/game-audio'

export interface CompanionData {
  id: string
  name: string
  title: string
  element: 'earth' | 'fire' | 'water' | 'rock'
  elementLabel: string
  color: string
  borderColor: string
  bgGlow: string
  image: string
  stage: number
  maxStage: number
  passiveName: string
  passiveDesc: string
  cp: number
  evolutionLine: [string, string, string]
}

export const COMPANIONS: CompanionData[] = [
  {
    id: 'spriggo',
    name: 'Spriggo',
    title: 'The Sprout of Focus',
    element: 'earth',
    elementLabel: 'Plant / Earth Affinity',
    color: 'text-emerald-400',
    borderColor: 'border-emerald-500/40',
    bgGlow: 'from-emerald-500/20 via-emerald-950/20 to-black',
    image: '/spriggo-8bit.png',
    stage: 1,
    maxStage: 3,
    passiveName: 'Photosynthesis Aura',
    passiveDesc: 'Grants +5% bonus XP on all morning focus quests and boosts daily energy.',
    cp: 620,
    evolutionLine: ['Spriggo', 'Arboros (Lvl 5)', 'Yggdrasil (Lvl 10)'],
  },
  {
    id: 'ignis',
    name: 'Ignis',
    title: 'The Ember of Willpower',
    element: 'fire',
    elementLabel: 'Fire / Blaze Affinity',
    color: 'text-orange-400',
    borderColor: 'border-orange-500/40',
    bgGlow: 'from-orange-500/20 via-orange-950/20 to-black',
    image: '/ignis-8bit.png',
    stage: 1,
    maxStage: 3,
    passiveName: 'Combustion Drive',
    passiveDesc: 'Awards +10% Gold coins on Hard & Boss quests when completing under time pressure.',
    cp: 680,
    evolutionLine: ['Ignis', 'Pyroclast (Lvl 5)', 'Solaria (Lvl 10)'],
  },
  {
    id: 'aqualis',
    name: 'Aqualis',
    title: 'The Torrent of Clarity',
    element: 'water',
    elementLabel: 'Water / Ocean Affinity',
    color: 'text-cyan-400',
    borderColor: 'border-cyan-500/40',
    bgGlow: 'from-cyan-500/20 via-cyan-950/20 to-black',
    image: '/aqualis-8bit.png',
    stage: 1,
    maxStage: 3,
    passiveName: 'Deep Hydration Flow',
    passiveDesc: 'Shields your streak once per week if a daily habit is missed, preserving multiplier.',
    cp: 640,
    evolutionLine: ['Aqualis', 'Tsunami (Lvl 5)', 'Leviathus (Lvl 10)'],
  },
  {
    id: 'terran',
    name: 'Terran',
    title: 'The Mountain of Resilience',
    element: 'rock',
    elementLabel: 'Crystal / Geode Affinity',
    color: 'text-amber-400',
    borderColor: 'border-amber-500/40',
    bgGlow: 'from-amber-500/20 via-amber-950/20 to-black',
    image: '/terran-8bit.png',
    stage: 1,
    maxStage: 3,
    passiveName: 'Unbreakable Bastion',
    passiveDesc: 'Reduces damage from habit penalties by 20% and fortifies willpower reserves.',
    cp: 710,
    evolutionLine: ['Terran', 'Geodon (Lvl 5)', 'Colossus (Lvl 10)'],
  },
]

export function CompanionRoster() {
  const [activeId, setActiveId] = useState<string>('spriggo')
  const [bondedId, setBondedId] = useState<string>('spriggo')
  const [cheerCount, setCheerCount] = useState<number>(0)
  const [isCheering, setIsCheering] = useState<boolean>(false)

  const selected = COMPANIONS.find((c) => c.id === activeId) || COMPANIONS[0]

  const handleSelect = (id: string) => {
    gameAudio.playTap()
    setActiveId(id)
  }

  const handleBond = (id: string) => {
    gameAudio.playFanfare()
    setBondedId(id)
  }

  const handlePet = () => {
    gameAudio.playPet()
    setCheerCount((prev) => prev + 1)
    setIsCheering(true)
    setTimeout(() => setIsCheering(false), 400)
  }

  return (
    <div className="space-y-6">
      {/* Selector Tabs (Pokemon Go / Clash of Clans Style) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {COMPANIONS.map((comp) => {
          const isCurrent = comp.id === activeId
          const isBonded = comp.id === bondedId

          return (
            <button
              key={comp.id}
              onClick={() => handleSelect(comp.id)}
              className={`relative p-3 rounded-2xl border transition-all text-left flex items-center gap-3 overflow-hidden ${
                isCurrent
                  ? `bg-white/[0.08] ${comp.borderColor} ring-2 ring-nexus-neon/50 shadow-[0_0_20px_rgba(0,255,136,0.15)] scale-[1.02]`
                  : 'bg-black/40 border-white/10 hover:border-white/20 hover:bg-white/[0.03]'
              }`}
            >
              {/* 8-bit sprite thumbnail */}
              <div className="relative w-12 h-12 rounded-xl bg-black/60 border border-white/15 overflow-hidden flex-shrink-0">
                <Image
                  src={comp.image}
                  alt={comp.name}
                  fill
                  className="object-cover pixelated"
                  unoptimized
                />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="font-display font-bold text-white text-sm truncate">{comp.name}</span>
                  {isBonded && (
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  )}
                </div>
                <span className={`text-[10px] font-bold block truncate ${comp.color}`}>
                  {isBonded ? '★ Active Partner' : comp.elementLabel.split('/')[0]}
                </span>
              </div>
            </button>
          )
        })}
      </div>

      {/* Main 8-Bit Companion Display Card */}
      <div
        className={`p-6 sm:p-8 rounded-3xl bg-gradient-to-b ${selected.bgGlow} border ${selected.borderColor} relative overflow-hidden backdrop-blur-xl shadow-2xl transition-all duration-300`}
      >
        {/* Retro scanlines overlay effect */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none opacity-20" />

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Left: 8-Bit Sprite Showcase with Interactive Cheer */}
          <div className="md:col-span-5 flex flex-col items-center text-center">
            <div
              onClick={handlePet}
              className="relative w-52 h-52 sm:w-60 sm:h-60 rounded-3xl bg-black/70 border-4 border-white/20 shadow-[0_0_35px_rgba(0,0,0,0.8)] overflow-hidden cursor-pointer group hover:scale-[1.03] transition-all"
            >
              <Image
                src={selected.image}
                alt={`${selected.name} 8-Bit Sprite`}
                fill
                className={`object-cover pixelated transition-transform duration-200 ${
                  isCheering ? 'scale-110 -rotate-3' : 'group-hover:scale-105'
                }`}
                unoptimized
              />

              {/* Pixel Art 8-BIT Badge */}
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/80 border border-white/30 text-[10px] font-mono font-bold text-yellow-300 tracking-wider flex items-center gap-1.5 shadow-md">
                <Sparkles className="w-3 h-3 text-yellow-400" />
                8-BIT RETRO
              </div>

              {/* Cheering heart popup */}
              {isCheering && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none animate-ping">
                  <Heart className="w-16 h-16 text-rose-500 fill-rose-500 drop-shadow-[0_0_15px_rgba(244,63,94,0.8)]" />
                </div>
              )}

              {/* Click prompt overlay */}
              <div className="absolute bottom-2 inset-x-2 py-1 rounded-lg bg-black/80 border border-white/10 text-[10px] text-gray-300 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                ❤️ Click to pet & train (+{cheerCount} Joy)
              </div>
            </div>

            <div className="mt-3 flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-white/10 text-white font-mono text-xs font-bold border border-white/15">
                CP {selected.cp}
              </span>
              <span className="px-3 py-1 rounded-full bg-nexus-neon/10 text-nexus-neon text-xs font-bold border border-nexus-neon/30">
                Tier {selected.stage} Companion
              </span>
            </div>
          </div>

          {/* Right: Companion Lore, Stats, Passive & Evolution Line */}
          <div className="md:col-span-7 space-y-5">
            <div>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold uppercase tracking-wider ${selected.color}`}>
                  {selected.elementLabel}
                </span>
                {bondedId === selected.id && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-extrabold border border-emerald-500/40">
                    BONDED PARTNER
                  </span>
                )}
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight mt-1">
                {selected.name}
              </h2>
              <p className="text-sm font-semibold text-gray-300 mt-0.5">{selected.title}</p>
            </div>

            {/* Passive Skill Box */}
            <div className="p-4 rounded-2xl bg-black/60 border border-white/15 space-y-1.5 backdrop-blur-md">
              <div className="flex items-center gap-2 text-white font-bold text-xs">
                <Zap className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span>Passive Perk: {selected.passiveName}</span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">{selected.passiveDesc}</p>
            </div>

            {/* Evolution Line (Stage 1 -> 2 -> 3) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-gray-300">
                <span>Evolution Lineage</span>
                <span className="text-nexus-neon">Stage 1 / 3</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className={`p-2.5 rounded-xl border ${selected.borderColor} bg-white/[0.05]`}>
                  <span className="block font-bold text-white text-xs">{selected.evolutionLine[0]}</span>
                  <span className="text-[10px] text-emerald-400 font-semibold">Active (8-Bit)</span>
                </div>
                <div className="p-2.5 rounded-xl border border-white/10 bg-black/40 opacity-60">
                  <span className="block font-bold text-gray-400 text-xs">{selected.evolutionLine[1]}</span>
                  <span className="text-[10px] text-gray-500">Unlocks Lvl 5</span>
                </div>
                <div className="p-2.5 rounded-xl border border-white/10 bg-black/40 opacity-40">
                  <span className="block font-bold text-gray-400 text-xs">{selected.evolutionLine[2]}</span>
                  <span className="text-[10px] text-gray-500">Unlocks Lvl 10</span>
                </div>
              </div>
            </div>

            {/* Bond Action Button (Clash of Clans / Pokemon Go) */}
            <div className="pt-2 flex flex-wrap gap-3 items-center">
              {bondedId === selected.id ? (
                <div className="px-5 py-3 rounded-2xl bg-emerald-500/20 border-2 border-emerald-400 text-emerald-300 font-bold text-sm flex items-center gap-2">
                  <Check className="w-4 h-4 stroke-[3]" />
                  Active Companion Bonded
                </div>
              ) : (
                <button
                  onClick={() => handleBond(selected.id)}
                  className="btn-clash btn-clash-green px-6 py-3 rounded-2xl text-white font-extrabold text-sm flex items-center gap-2 tracking-wide"
                >
                  <Heart className="w-4 h-4 fill-white" />
                  Bond with {selected.name}
                </button>
              )}

              <button
                onClick={handlePet}
                className="btn-clash btn-clash-gold px-5 py-3 rounded-2xl text-amber-950 font-black text-sm flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Cheer & Train (+{cheerCount})
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
