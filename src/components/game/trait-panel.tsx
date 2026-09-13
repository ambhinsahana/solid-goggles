'use client'

import { Brain, Dumbbell, Palette, ShieldAlert, Users } from 'lucide-react'
import { gameAudio } from '@/lib/audio/game-audio'

interface Trait {
  id: string
  name: string
  level: number
  xp: number
  nextLevelXp: number
  color: string
  icon: React.ReactNode
}

interface TraitPanelProps {
  paths: Record<string, number> // path -> level
  className?: string
}

// Map path IDs to their display properties
const TRAIT_CONFIG: Record<string, { name: string, color: string, icon: React.ReactNode }> = {
  learning: { name: 'Intellect', color: 'from-cyan-500 to-blue-500', icon: <Brain className="w-4 h-4 text-cyan-600" /> },
  fitness: { name: 'Fitness', color: 'from-rose-500 to-red-600', icon: <Dumbbell className="w-4 h-4 text-rose-600" /> },
  creativity: { name: 'Creativity', color: 'from-purple-500 to-violet-600', icon: <Palette className="w-4 h-4 text-purple-600" /> },
  discipline: { name: 'Discipline', color: 'from-amber-400 to-orange-500', icon: <ShieldAlert className="w-4 h-4 text-amber-600" /> },
  social: { name: 'Social', color: 'from-emerald-400 to-teal-600', icon: <Users className="w-4 h-4 text-emerald-600" /> },
}

export function TraitPanel({ paths = {}, className = '' }: TraitPanelProps) {
  // Construct traits array based on real paths progression
  const traits = Object.entries(TRAIT_CONFIG).map(([pathId, config]) => {
    const rawVal = paths[pathId] || 0
    const level = Math.max(1, Math.floor(rawVal / 10) + 1)
    const nextLevelXp = level * 20
    const xp = rawVal

    return {
      id: pathId,
      name: config.name,
      level,
      xp,
      nextLevelXp,
      color: config.color,
      icon: config.icon
    }
  })

  return (
    <div className={`liquid-glass p-4 sm:p-5 w-full rounded-3xl border border-white/90 shadow-[0_12px_36px_rgba(100,70,30,0.08)] ${className}`}>
      <h3 className="font-display font-black text-amber-950 text-sm uppercase tracking-widest mb-3.5 flex items-center gap-2">
        <span>Character Attributes</span>
        <div className="h-px bg-amber-900/10 flex-1"></div>
      </h3>

      <div className="flex flex-col gap-2.5">
        {traits.map((trait) => {
          const progressPercent = Math.min(100, Math.max(0, (trait.xp / trait.nextLevelXp) * 100))

          return (
            <div
              key={trait.id}
              onClick={() => gameAudio.playPop()}
              className="flex flex-col gap-1.5 glass-pill p-2.5 rounded-xl border border-white/80 touch-bounce cursor-pointer hover:border-amber-300"
            >
              <div className="flex justify-between items-center text-xs font-black text-world-text">
                <div className="flex items-center gap-2">
                  <div className="p-1 rounded-lg bg-white/80 shadow-xs border border-white/90">
                    {trait.icon}
                  </div>
                  <span className="font-black tracking-wide">{trait.name}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-amber-900/50 text-[10px] font-black uppercase tracking-wider">LVL</span>
                  <span className="font-black text-amber-700 text-sm">{trait.level}</span>
                </div>
              </div>
              <div className="h-2 w-full bg-black/10 rounded-full overflow-hidden shadow-inner border border-white/60">
                <div 
                  className={`h-full bg-gradient-to-r ${trait.color} rounded-full transition-all duration-700 ease-out`}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
