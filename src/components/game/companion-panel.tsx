'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Sparkles, Heart } from 'lucide-react'
import type { Creature } from '@/lib/types'
import { gameAudio } from '@/lib/audio/game-audio'

interface CompanionPanelProps {
  creature?: Creature | null
}

export function CompanionPanel({ creature }: CompanionPanelProps) {
  const [isCheering, setIsCheering] = useState(false)

  const handlePet = () => {
    gameAudio.playPet()
    setIsCheering(true)
    setTimeout(() => setIsCheering(false), 500)
  }

  if (!creature) {
    return (
      <div className="glass-frosted p-4 sm:p-5 w-full rounded-2xl border border-white/90 shadow-[0_10px_30px_rgba(100,70,30,0.06)] flex flex-col items-center justify-center text-center opacity-85 backdrop-blur-xl">
        <div className="w-14 h-14 rounded-2xl bg-amber-400/10 border border-amber-300/30 flex items-center justify-center mb-2.5">
          <Sparkles className="w-6 h-6 text-amber-600" />
        </div>
        <p className="text-sm font-black text-amber-950">No Companion Active</p>
        <Link
          href="/character"
          onClick={() => gameAudio.playTap()}
          className="text-xs text-amber-700 hover:text-amber-900 font-black mt-1 touch-bounce"
        >
          Visit the Characters tab to summon one →
        </Link>
      </div>
    )
  }

  // Files in /public/ use hyphens, e.g. spriggo-8bit.png, ignis-8bit.png
  const safeTheme = creature.theme.toLowerCase().replace('_', '-')
  const imagePath = `/${safeTheme}-8bit.png`

  // Element colors based on theme
  const getElementColor = (theme: string) => {
    switch (theme.toLowerCase()) {
      case 'ignis':
      case 'fire':
        return 'text-orange-600 bg-orange-50 border-orange-300'
      case 'aqualis':
      case 'water':
        return 'text-blue-600 bg-blue-50 border-blue-300'
      case 'terran':
      case 'mossling':
      case 'spriggo':
      case 'earth':
      case 'nature':
        return 'text-emerald-700 bg-emerald-50 border-emerald-300'
      case 'specter':
      case 'shadow':
        return 'text-purple-600 bg-purple-50 border-purple-300'
      case 'leviathan':
      case 'water':
        return 'text-cyan-700 bg-cyan-50 border-cyan-300'
      case 'phantom':
      case 'cosmic':
        return 'text-indigo-600 bg-indigo-50 border-indigo-300'
      default:
        return 'text-amber-700 bg-amber-50 border-amber-300'
    }
  }

  const elementStyle = getElementColor(creature.theme)

  return (
    <div className="glass-frosted p-4 sm:p-5 w-full rounded-2xl border border-white/90 shadow-[0_10px_30px_rgba(100,70,30,0.06)] flex gap-4 items-center backdrop-blur-xl">
      <div
        onClick={handlePet}
        className={`relative w-22 h-22 sm:w-24 sm:h-24 flex-shrink-0 glass-pill rounded-2xl border border-white/90 overflow-hidden flex items-center justify-center shadow-inner cursor-pointer touch-bounce ${
          isCheering ? 'scale-110 -translate-y-2' : ''
        }`}
        title="Click to pet your companion!"
      >
        {/* Subtle animated background based on element */}
        <div className={`absolute inset-0 opacity-25 animate-pulse ${elementStyle.split(' ')[1]}`}></div>

        <Image
          src={imagePath}
          alt={creature.name}
          width={80}
          height={80}
          className="relative z-10 drop-shadow-md hover:scale-110 transition-transform duration-300"
          onError={(e) => {
            e.currentTarget.src = '/ignis-8bit.png'
          }}
        />
      </div>

      <div className="flex flex-col flex-1">
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <h3 className="font-display font-black text-amber-950 text-base sm:text-lg leading-tight">
              {creature.name}
            </h3>
            <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border w-fit mt-1 shadow-xs ${elementStyle}`}>
              {creature.theme} Element
            </span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-black text-amber-900/50 uppercase tracking-widest">LVL</span>
            <span className="font-black text-amber-800 text-sm">{creature.current_level || 1}</span>
          </div>
        </div>

        <div className="mt-2.5 flex items-start gap-2 glass-pill p-2 rounded-xl border border-white/70">
          <Sparkles className="w-3.5 h-3.5 text-amber-600 mt-0.5 flex-shrink-0" />
          <div className="flex flex-col">
            <span className="text-xs font-black text-amber-950">{creature.passive_name}</span>
            <span className="text-[10px] font-bold text-amber-900/70 leading-tight mt-0.5">{creature.passive_description}</span>
          </div>
        </div>

        {/* Bond Level */}
        <div
          onClick={handlePet}
          className="mt-2.5 flex items-center gap-2 cursor-pointer touch-bounce"
          title="Bond Level - click to increase!"
        >
          <Heart className="w-3.5 h-3.5 fill-rose-400 stroke-rose-500" />
          <div className="h-2 flex-1 bg-rose-950/10 rounded-full overflow-hidden border border-white/60">
            <div className="h-full bg-gradient-to-r from-rose-400 to-red-500 w-[80%] rounded-full shadow-inner"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
