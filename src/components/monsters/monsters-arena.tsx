'use client'

import { useState, useTransition } from 'react'
import Image from 'next/image'
import { HabitMonster, MysteryBox } from '@/lib/types'
import { attackHabitMonster, relapseHabitMonster, openMysteryBox, createHabitMonster } from '@/app/dashboard/actions'
import { 
  Skull, 
  Swords, 
  Gift, 
  Plus, 
  X, 
  CheckCircle2, 
  Zap, 
  AlertTriangle,
  Trophy,
  Shield,
  RotateCcw
} from 'lucide-react'
import { gameAudio } from '@/lib/audio/game-audio'

function getMonsterImage(name: string): string {
  const lower = name.toLowerCase()
  if (lower.includes('leviathan') || lower.includes('doomscroll')) return '/leviathan-8bit.png'
  if (lower.includes('specter') || lower.includes('procrastination')) return '/specter-8bit.png'
  if (lower.includes('phantom') || lower.includes('caffeine')) return '/phantom-8bit.png'
  if (lower.includes('spriggo')) return '/spriggo-8bit.png'
  if (lower.includes('ignis')) return '/ignis-8bit.png'
  if (lower.includes('aqualis')) return '/aqualis-8bit.png'
  if (lower.includes('terran')) return '/terran-8bit.png'
  
  // Random fallback for unspecified monsters
  const allSprites = [
    '/leviathan-8bit.png', 
    '/specter-8bit.png', 
    '/phantom-8bit.png',
    '/spriggo-8bit.png',
    '/ignis-8bit.png',
    '/aqualis-8bit.png',
    '/terran-8bit.png'
  ]
  const hash = lower.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return allSprites[hash % allSprites.length]
}

interface MonstersArenaProps {
  initialMonsters: HabitMonster[]
  initialBoxes: MysteryBox[]
  isLoggedIn: boolean
}

export function MonstersArena({ initialMonsters, initialBoxes, isLoggedIn }: MonstersArenaProps) {
  const [monsters, setMonsters] = useState<HabitMonster[]>(initialMonsters)
  const [boxes, setBoxes] = useState<MysteryBox[]>(initialBoxes)
  const [isPending, startTransition] = useTransition()
  const [strikingId, setStrikingId] = useState<string | null>(null)
  const [openingBoxId, setOpeningBoxId] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null)

  // Attack Monster handler
  const handleAttack = (monster: HabitMonster) => {
    if (!isLoggedIn) {
      setFeedback({ message: 'Sign in to log habit resistance and slay beasts!', type: 'error' })
      return
    }

    const damage = 30
    const nextHp = Math.max(0, monster.current_hp - damage)
    const isNowDefeated = nextHp === 0

    gameAudio.playStrike()
    if (isNowDefeated) {
      gameAudio.playFanfare()
    }

    setStrikingId(monster.id)
    setFeedback(null)

    // Optimistic update
    setMonsters((prev) =>
      prev.map((m) => {
        if (m.id === monster.id) {
          return {
            ...m,
            current_hp: nextHp,
            status: isNowDefeated ? 'defeated' : 'active',
            defeated_at: isNowDefeated ? new Date().toISOString() : null,
          }
        }
        return m
      })
    )

    if (isNowDefeated) {
      // Optimistically add mystery box
      const tempBox: MysteryBox = {
        id: 'box-' + Date.now(),
        user_id: monster.user_id,
        source_monster_id: monster.id,
        is_opened: false,
        reward_type: 'Gold & Prestige Reward',
        reward_amount: 150,
        created_at: new Date().toISOString(),
      }
      setBoxes((prev) => [tempBox, ...prev])
    }

    startTransition(async () => {
      const res = await attackHabitMonster(monster.id, damage)
      setStrikingId(null)

      if (res.error && res.error !== 'SUPABASE_NOT_CONFIGURED') {
        // Rollback
        setMonsters(initialMonsters)
        setFeedback({ message: res.error, type: 'error' })
      } else {
        if (res.isDefeated || isNowDefeated) {
          setFeedback({
            message: `VICTORY! You conquered ${monster.name}! A legendary Mystery Box has been awarded!`,
            type: 'success',
          })
        } else {
          setFeedback({
            message: `Direct hit! Dealt 30 discipline damage to ${monster.name}. Keep resisting!`,
            type: 'info',
          })
        }
      }
    })
  }

  // Record Relapse handler (Setback: heals the monster by 30 HP)
  const handleRelapse = (monster: HabitMonster) => {
    gameAudio.playTap()
    setStrikingId(monster.id)
    setFeedback(null)

    const initialMonsters = monsters
    const newHp = Math.min(monster.max_hp, monster.current_hp + 30)

    setMonsters((prev) =>
      prev.map((m) =>
        m.id === monster.id
          ? { ...m, current_hp: newHp, status: 'active', defeated_at: null }
          : m
      )
    )

    startTransition(async () => {
      const res = await relapseHabitMonster(monster.id, 30)
      setStrikingId(null)

      if (res.error && res.error !== 'SUPABASE_NOT_CONFIGURED') {
        setMonsters(initialMonsters)
        setFeedback({ message: res.error, type: 'error' })
      } else {
        setFeedback({
          message: `Relapse recorded for ${monster.name}. The monster regenerated +30 HP. Stay disciplined and conquer it!`,
          type: 'error',
        })
      }
    })
  }

  // Open Mystery Box handler
  const handleOpenBox = (box: MysteryBox) => {
    if (!isLoggedIn) return
    setOpeningBoxId(box.id)
    setFeedback(null)
    gameAudio.playCoin()

    startTransition(async () => {
      const res = await openMysteryBox(box.id)
      setOpeningBoxId(null)

      if (res.error && res.error !== 'SUPABASE_NOT_CONFIGURED') {
        setFeedback({ message: res.error, type: 'error' })
      } else {
        gameAudio.playFanfare()
        const rewardCoins = res.coinsReward || 120
        setBoxes((prev) =>
          prev.map((b) => (b.id === box.id ? { ...b, is_opened: true, opened_at: new Date().toISOString() } : b))
        )
        setFeedback({
          message: `UNBOXED! Claimed +${rewardCoins} Gold from the Mystery Box!`,
          type: 'success',
        })
      }
    })
  }

  // Create Habit Monster handler
  const handleCreateMonster = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)

    startTransition(async () => {
      const res = await createHabitMonster(formData)
      if (res.error && res.error !== 'SUPABASE_NOT_CONFIGURED') {
        setFeedback({ message: res.error, type: 'error' })
      } else {
        const newMonster: HabitMonster = res.monster || {
          id: 'mon-' + Date.now(),
          user_id: 'local',
          name: formData.get('name') as string,
          bad_habit: formData.get('bad_habit') as string,
          description: formData.get('description') as string,
          max_hp: 100,
          current_hp: 100,
          threat_level: 2,
          status: 'active',
          created_at: new Date().toISOString(),
        }
        setMonsters((prev) => [newMonster, ...prev])
        setIsModalOpen(false)
        setFeedback({
          message: `Summoned ${newMonster.name}! Strike it every time you resist the habit.`,
          type: 'success',
        })
      }
    })
  }

  const activeMonsters = monsters.filter((m) => m.status === 'active')
  const defeatedMonsters = monsters.filter((m) => m.status === 'defeated')
  const unopenedBoxes = boxes.filter((b) => !b.is_opened)

  return (
    <div className="space-y-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Top Arena Banner - Parchment Style */}
      <div className="relative overflow-hidden rounded-2xl glass-frosted border border-white/90 p-6 sm:p-8 shadow-[0_12px_36px_rgba(100,70,30,0.06)] backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-rose-100/80 border border-rose-300 text-rose-800 text-xs font-black mb-3 tracking-wide uppercase shadow-xs">
              <Swords className="w-3.5 h-3.5 text-rose-600" />
              The Crucible
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-world-text tracking-tight drop-shadow-sm">
              Habit Monsters
            </h1>
            <p className="text-sm sm:text-base text-amber-900/70 mt-2 max-w-xl font-bold">
              Transform your bad habits into 8-bit monsters. Deal damage to them every time you resist a craving in real life!
            </p>
          </div>

          <button
            onClick={() => {
              gameAudio.playPop()
              setIsModalOpen(true)
            }}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-b from-rose-500 to-rose-700 text-white text-sm font-black transition-all shadow-[0_4px_0_#9f1239] hover:brightness-105 active:scale-95 touch-bounce shrink-0 border border-rose-400"
          >
            <Plus className="w-4 h-4" /> Summon Boss
          </button>
        </div>

        {/* Global Feedback Notice */}
        {feedback && (
          <div
            className={`mt-6 p-4 rounded-xl border-2 font-bold flex items-center gap-3 transition-all relative z-10 ${
              feedback.type === 'success'
                ? 'bg-green-100 border-green-400 text-green-900 shadow-[0_2px_0_rgba(74,222,128,1)]'
                : feedback.type === 'info'
                ? 'bg-blue-100 border-blue-400 text-blue-900 shadow-[0_2px_0_rgba(96,165,250,1)]'
                : 'bg-red-100 border-red-400 text-red-900 shadow-[0_2px_0_rgba(248,113,113,1)]'
            }`}
          >
            {feedback.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
            ) : feedback.type === 'info' ? (
              <Zap className="w-5 h-5 text-blue-600 shrink-0" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
            )}
            <span>{feedback.message}</span>
          </div>
        )}
      </div>

      {/* Mystery Boxes Vault */}
      {unopenedBoxes.length > 0 && (
        <div className="p-6 rounded-2xl bg-[#FDF9F1] border-2 border-[#E5D3B3] shadow-sm relative overflow-hidden">
          <div 
            className="absolute inset-0 opacity-20 pointer-events-none mix-blend-multiply"
            style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/aged-paper.png")' }}
          />
          
          <div className="flex items-center justify-between mb-4 relative z-10">
            <div className="flex items-center gap-2">
              <Gift className="w-6 h-6 text-amber-500 animate-bounce" />
              <h3 className="text-xl font-black text-[#3D2C1E]">Unopened Spoils</h3>
              <span className="px-2 py-0.5 rounded-lg bg-amber-100 text-amber-800 text-xs font-black border-2 border-amber-300 shadow-[0_2px_0_rgba(252,211,77,1)]">
                {unopenedBoxes.length} Available
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
            {unopenedBoxes.map((box) => {
              const isOpening = openingBoxId === box.id
              return (
                <div
                  key={box.id}
                  className="p-4 rounded-xl bg-white border-2 border-[#E5D3B3] flex items-center justify-between gap-4 shadow-[0_2px_0_#E5D3B3]"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-amber-100 text-amber-600 border border-amber-300">
                      <Gift className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#3D2C1E] text-sm">Boss Bounty Chest</h4>
                      <span className="text-xs text-[#8A7A6A] font-medium">Contains Gold</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleOpenBox(box)}
                    disabled={isPending}
                    className="flex items-center justify-center px-4 py-2 rounded-lg bg-gradient-to-b from-amber-400 to-amber-600 text-[#3D2C1E] text-xs font-black uppercase tracking-wider transition-all shadow-[0_3px_0_#b45309] hover:translate-y-[1px] hover:shadow-[0_2px_0_#b45309] active:translate-y-[3px] active:shadow-none"
                  >
                    {isOpening ? 'Opening...' : 'Unlock'}
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Active Monsters Section */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <h2 className="text-2xl font-black text-[#3D2C1E] tracking-tight flex items-center gap-2">
            <Skull className="w-6 h-6 text-red-500" />
            Active Habit Terrors
          </h2>
          <span className="text-sm text-[#8A7A6A] font-bold bg-[#E5D3B3]/30 px-3 py-1 rounded-lg border border-[#E5D3B3]">
            Strike when you resist the impulse
          </span>
        </div>

        {monsters.length === 0 ? (
          <div className="p-12 text-center rounded-2xl border-2 border-dashed border-[#E5D3B3] bg-[#FDF9F1] space-y-4">
            <Skull className="w-12 h-12 text-red-400 mx-auto" />
            <div className="space-y-1">
              <h3 className="text-lg font-black text-[#3D2C1E] font-display">NO MONSTERS DISCOVERED</h3>
              <p className="text-sm text-[#8A7A6A] max-w-md mx-auto font-medium">
                No bad habit monsters have been summoned yet. Name an unwanted habit to summon a boss and conquer it through daily discipline.
              </p>
            </div>
            <button
              onClick={() => {
                gameAudio.playPop()
                setIsModalOpen(true)
              }}
              className="btn-clash-crimson px-5 py-2.5 rounded-xl text-white font-black text-xs uppercase tracking-wider touch-bounce inline-flex items-center gap-2 shadow-md"
            >
              <Plus className="w-4 h-4" />
              SUMMON FIRST HABIT BEAST
            </button>
          </div>
        ) : activeMonsters.length === 0 ? (
          <div className="p-12 text-center rounded-2xl border-2 border-dashed border-[#E5D3B3] bg-[#FDF9F1]">
            <Shield className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
            <h3 className="text-lg font-black text-[#3D2C1E] font-display">ALL HABIT MONSTERS VANQUISHED</h3>
            <p className="text-sm text-[#8A7A6A] mt-2 max-w-md mx-auto font-medium">
              Your discipline reigns supreme. Have another bad habit you want to conquer? Summon a new boss to continue the fight!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeMonsters.map((monster) => {
              const hpPct = Math.round((monster.current_hp / monster.max_hp) * 100)
              const isStriking = strikingId === monster.id

              let barColor = 'bg-green-500'
              if (hpPct <= 50 && hpPct > 25) barColor = 'bg-amber-500'
              if (hpPct <= 25) barColor = 'bg-red-500'

              return (
                <div
                  key={monster.id}
                  className="relative flex flex-col justify-between rounded-2xl glass-frosted border border-white/90 p-5 transition-all shadow-[0_10px_30px_rgba(100,70,30,0.06)] group overflow-hidden touch-bounce backdrop-blur-xl"
                >
                  <div className="relative z-10">
                    {/* 8-Bit Boss Artwork */}
                    <div className="relative w-full h-40 mb-4 rounded-xl bg-gradient-to-b from-[#8ebcd4] to-[#6096b4] border-4 border-[#3D2C1E] overflow-hidden flex items-center justify-center shadow-inner">
                      {/* Pixel ground */}
                      <div className="absolute bottom-0 w-full h-1/3 bg-[#543b27] border-t-4 border-[#3D2C1E]" />
                      
                      <Image
                        src={getMonsterImage(monster.name)}
                        alt={monster.name}
                        width={120}
                        height={120}
                        className={`object-contain pixelated relative z-10 transition-all duration-300 ${
                          isStriking ? 'scale-95 brightness-150 hue-rotate-180 animate-pulse' : 'group-hover:scale-110 group-hover:-translate-y-2'
                        }`}
                        unoptimized
                      />
                      
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/60 border-2 border-[#3D2C1E] text-[10px] font-mono font-bold text-white shadow">
                        LVL {monster.threat_level * 10}
                      </div>
                    </div>

                    <h3 className="text-xl font-black text-[#3D2C1E] tracking-tight leading-tight">
                      {monster.name}
                    </h3>
                    <div className="mt-2 p-2 rounded-lg bg-red-50 border border-red-200 text-xs text-red-900 font-bold">
                      <span className="text-red-700 block text-[10px] uppercase tracking-wider mb-0.5 opacity-80">
                        Target Habit:
                      </span>
                      {monster.bad_habit}
                    </div>

                    {monster.description && (
                      <p className="text-sm text-[#8A7A6A] font-medium mt-3 line-clamp-2">
                        {monster.description}
                      </p>
                    )}
                  </div>

                  {/* HP Gauge & Attack Action */}
                  <div className="mt-5 pt-4 border-t-2 border-dashed border-[#E5D3B3] space-y-4 relative z-10">
                    <div>
                      <div className="flex justify-between text-xs font-black mb-1.5 uppercase tracking-wide">
                        <span className="text-[#8A7A6A]">HP</span>
                        <span className="text-[#3D2C1E]">
                          {monster.current_hp} / {monster.max_hp}
                        </span>
                      </div>
                      <div className="h-4 w-full bg-[#E5D3B3] rounded-full overflow-hidden border-2 border-[#3D2C1E] shadow-inner">
                        <div
                          className={`h-full transition-all duration-500 ${barColor}`}
                          style={{ width: `${hpPct}%` }}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => handleAttack(monster)}
                        disabled={isPending}
                        className="btn-clash-rose flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-gradient-to-b from-rose-500 to-rose-700 text-white font-black text-xs uppercase tracking-wider transition-all shadow-[0_4px_0_#9f1239] border border-rose-400 touch-bounce"
                        title="Resisted the bad habit today: deals 30 discipline damage"
                      >
                        <Swords className="w-4 h-4" />
                        <span>{isStriking ? '...' : 'Resist (-30)'}</span>
                      </button>

                      <button
                        onClick={() => handleRelapse(monster)}
                        disabled={isPending}
                        className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-gradient-to-b from-amber-600 to-amber-800 text-white font-black text-xs uppercase tracking-wider transition-all shadow-[0_4px_0_#78350f] border border-amber-500 touch-bounce hover:from-amber-500 hover:to-amber-700"
                        title="Gave in to the bad habit: monster heals +30 HP"
                      >
                        <RotateCcw className="w-4 h-4 text-amber-200" />
                        <span>{isStriking ? '...' : 'Relapse (+30)'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Defeated Monsters Trophy Section */}
      {defeatedMonsters.length > 0 && (
        <div className="pt-6 border-t-2 border-dashed border-[#E5D3B3]">
          <h3 className="text-xl font-black text-[#3D2C1E] tracking-tight flex items-center gap-2 mb-4">
            <Trophy className="w-6 h-6 text-amber-500" />
            Trophy Room ({defeatedMonsters.length})
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {defeatedMonsters.map((monster) => (
              <div
                key={monster.id}
                className="p-3.5 rounded-xl bg-[#FDF9F1] border-2 border-[#E5D3B3] flex items-center justify-between opacity-80"
              >
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-lg bg-[#E5D3B3]/50 border-2 border-[#E5D3B3] overflow-hidden flex-shrink-0 grayscale">
                    <Image
                      src={getMonsterImage(monster.name)}
                      alt={monster.name}
                      fill
                      className="object-contain pixelated"
                      unoptimized
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#3D2C1E] text-sm line-through">
                      {monster.name}
                    </h4>
                    <span className="text-xs font-medium text-[#8A7A6A]">{monster.bad_habit}</span>
                  </div>
                </div>
                <span className="text-[10px] font-black text-emerald-800 bg-emerald-100 px-2 py-1 rounded-lg border border-emerald-300 uppercase tracking-wide">
                  Defeated
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Summon Monster Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md rounded-2xl bg-[#FDF9F1] border-4 border-[#E5D3B3] p-6 sm:p-8 shadow-2xl animate-in zoom-in-95 duration-200">
            <div 
              className="absolute inset-0 opacity-20 pointer-events-none mix-blend-multiply rounded-xl"
              style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/aged-paper.png")' }}
            />
            
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-xl text-[#8A7A6A] hover:text-[#3D2C1E] hover:bg-[#E5D3B3]/50 transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2 text-red-600 text-xs font-black uppercase tracking-wider">
                <Skull className="w-4 h-4" /> Crucible Summoner
              </div>
              <h3 className="text-2xl font-black text-[#3D2C1E]">Summon Boss</h3>
              <p className="text-sm font-medium text-[#8A7A6A] mt-1 mb-6">
                Give your bad habit a name and stats.
              </p>

              <form onSubmit={handleCreateMonster} className="space-y-4">
                <div>
                  <label className="block text-xs font-black text-[#8A7A6A] uppercase tracking-wider mb-1.5">
                    Monster Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="e.g. Midnight Doomscroller"
                    className="w-full px-4 py-3 rounded-xl bg-white border-2 border-[#E5D3B3] text-[#3D2C1E] font-medium placeholder-[#E5D3B3] focus:outline-none focus:border-red-400 focus:ring-4 focus:ring-red-100 transition-all shadow-inner"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-[#8A7A6A] uppercase tracking-wider mb-1.5">
                    The Bad Habit
                  </label>
                  <input
                    type="text"
                    name="bad_habit"
                    required
                    placeholder="e.g. Scrolling in bed after 11 PM"
                    className="w-full px-4 py-3 rounded-xl bg-white border-2 border-[#E5D3B3] text-[#3D2C1E] font-medium placeholder-[#E5D3B3] focus:outline-none focus:border-red-400 focus:ring-4 focus:ring-red-100 transition-all shadow-inner"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-[#8A7A6A] uppercase tracking-wider mb-1.5">
                    Counter-Strategy
                  </label>
                  <textarea
                    name="description"
                    rows={2}
                    placeholder="e.g. Put phone across the room"
                    className="w-full px-4 py-3 rounded-xl bg-white border-2 border-[#E5D3B3] text-[#3D2C1E] font-medium placeholder-[#E5D3B3] focus:outline-none focus:border-red-400 focus:ring-4 focus:ring-red-100 transition-all shadow-inner resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-[#8A7A6A] uppercase tracking-wider mb-1.5">
                    Threat Level
                  </label>
                  <select
                    name="threat_level"
                    defaultValue="2"
                    className="w-full px-4 py-3 rounded-xl bg-white border-2 border-[#E5D3B3] text-[#3D2C1E] font-bold focus:outline-none focus:border-red-400 focus:ring-4 focus:ring-red-100 transition-all shadow-sm appearance-none"
                  >
                    <option value="1">Threat I — Minor Habit (60 HP)</option>
                    <option value="2">Threat II — Persistent Habit (90 HP)</option>
                    <option value="3">Threat III — Apex Boss (120 HP)</option>
                  </select>
                </div>

                <div className="pt-4 flex flex-col-reverse sm:flex-row items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white border-2 border-[#E5D3B3] text-[#8A7A6A] text-sm font-black uppercase tracking-wider hover:bg-[#E5D3B3]/20 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isPending}
                    className="w-full sm:w-auto flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-b from-red-500 to-red-700 text-white text-sm font-black uppercase tracking-wider transition-all shadow-[0_4px_0_#991b1b] hover:translate-y-[2px] hover:shadow-[0_2px_0_#991b1b] active:translate-y-[4px] active:shadow-none"
                  >
                    {isPending ? 'Summoning...' : 'Summon Boss'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
