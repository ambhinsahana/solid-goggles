'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { Shield, Swords } from 'lucide-react'
import { gameAudio } from '@/lib/audio/game-audio'

interface QuestMonsterSwitcherProps {
  questsContent: React.ReactNode
  monstersContent: React.ReactNode
}

export function QuestMonsterSwitcher({ questsContent, monstersContent }: QuestMonsterSwitcherProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  
  const [activeTab, setActiveTab] = useState<'quests' | 'monsters'>('quests')

  useEffect(() => {
    const tab = searchParams.get('tab')
    if (tab === 'monsters' || tab === 'quests') {
      setActiveTab(tab)
    }
  }, [searchParams])

  const handleTabChange = (tab: 'quests' | 'monsters') => {
    if (tab !== activeTab) {
      gameAudio.playSwoosh()
    }
    setActiveTab(tab)
    const params = new URLSearchParams(searchParams.toString())
    params.set('tab', tab)
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="w-full mt-4 flex flex-col gap-6">
      {/* Game-styled Liquid Glass Capsule Switcher */}
      <div className="flex p-1.5 liquid-glass rounded-2xl border border-white/95 w-full max-w-md mx-auto shadow-[0_8px_28px_rgba(100,70,30,0.08)]">
        <button
          onClick={() => handleTabChange('quests')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-black text-sm tracking-wide touch-bounce transition-all ${
            activeTab === 'quests'
              ? 'bg-gradient-to-b from-amber-400 to-amber-600 text-amber-950 shadow-[0_4px_0_#92400e,0_4px_12px_rgba(245,158,11,0.3)] border border-amber-300'
              : 'text-[#8a7a6a] hover:text-world-text hover:bg-white/40'
          }`}
        >
          <Shield className={`w-4 h-4 ${activeTab === 'quests' ? 'text-amber-950' : ''}`} />
          <span>QUEST BOARD</span>
        </button>
        <button
          onClick={() => handleTabChange('monsters')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-black text-sm tracking-wide touch-bounce transition-all ${
            activeTab === 'monsters'
              ? 'bg-gradient-to-b from-rose-500 to-rose-700 text-white shadow-[0_4px_0_#9f1239,0_4px_12px_rgba(244,63,94,0.3)] border border-rose-400'
              : 'text-[#8a7a6a] hover:text-world-text hover:bg-white/40'
          }`}
        >
          <Swords className={`w-4 h-4 ${activeTab === 'monsters' ? 'text-white animate-pulse' : ''}`} />
          <span>MONSTERS</span>
        </button>
      </div>

      {/* Content Area with smooth transition */}
      <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
        {activeTab === 'quests' ? questsContent : monstersContent}
      </div>
    </div>
  )
}
