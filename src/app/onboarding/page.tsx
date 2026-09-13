'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Sparkles, Sword, Flame, Shield, ArrowRight, Check, BookOpen, Dumbbell, Palette, Users, Zap, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { gameAudio } from '@/lib/audio/game-audio'
import { WorldScene } from '@/components/game/world-scene'

const STARTER_COMPANIONS = [
  {
    id: 'spriggo',
    name: 'Spriggo',
    title: 'The Sprout of Focus',
    element: 'Plant / Earth Affinity',
    color: 'text-[#5E8B4C]',
    borderColor: 'border-[#5E8B4C]',
    bgGradient: 'bg-[#5E8B4C]/10',
    image: '/spriggo-8bit.png',
    passiveName: 'Photosynthesis',
    passiveDesc: 'Grants +5% bonus XP on all morning focus quests and boosts daily energy.',
    cp: 620,
  },
  {
    id: 'ignis',
    name: 'Ignis',
    title: 'The Ember of Willpower',
    element: 'Fire / Blaze Affinity',
    color: 'text-[#D97757]',
    borderColor: 'border-[#D97757]',
    bgGradient: 'bg-[#D97757]/10',
    image: '/ignis-8bit.png',
    passiveName: 'Combustion Drive',
    passiveDesc: 'Awards +10% Gold coins on Hard & Habit Boss quests.',
    cp: 680,
  },
  {
    id: 'aqualis',
    name: 'Aqualis',
    title: 'The Torrent of Clarity',
    element: 'Water / Ocean Affinity',
    color: 'text-[#4C819F]',
    borderColor: 'border-[#4C819F]',
    bgGradient: 'bg-[#4C819F]/10',
    image: '/aqualis-8bit.png',
    passiveName: 'Deep Hydration Flow',
    passiveDesc: 'Shields your streak once per week if a daily habit is missed.',
    cp: 640,
  },
  {
    id: 'terran',
    name: 'Terran',
    title: 'The Mountain of Resilience',
    element: 'Crystal / Rock Affinity',
    color: 'text-[#B89852]',
    borderColor: 'border-[#B89852]',
    bgGradient: 'bg-[#B89852]/10',
    image: '/terran-8bit.png',
    passiveName: 'Unbreakable Bastion',
    passiveDesc: 'Reduces damage from habit penalties by 20% and fortifies willpower.',
    cp: 710,
  },
]

const PATHS = [
  {
    id: 'Learning',
    name: 'Path of Learning',
    description: 'Focus on reading, acquiring high-leverage skills, and mental sharpness.',
    icon: BookOpen,
    color: 'bg-[#4C819F]/10 border-[#4C819F]/40 text-[#4C819F]',
    statBonus: '+10% XP on mental & study quests',
    tag: 'LEARNING',
  },
  {
    id: 'Fitness',
    name: 'Path of Fitness',
    description: 'Hone physical endurance, strength workouts, nutrition, and restorative sleep.',
    icon: Dumbbell,
    color: 'bg-[#D97757]/10 border-[#D97757]/40 text-[#D97757]',
    statBonus: '+10% XP on physical training quests',
    tag: 'FITNESS',
  },
  {
    id: 'Creativity',
    name: 'Path of Creativity',
    description: 'Design, write, build software, compose, and bring original ideas to life.',
    icon: Palette,
    color: 'bg-[#896499]/10 border-[#896499]/40 text-[#896499]',
    statBonus: '+10% XP on creative creation quests',
    tag: 'CREATIVITY',
  },
  {
    id: 'Discipline',
    name: 'Path of Discipline',
    description: 'Build unbreakable habits, eliminate distractions, and slay procrastinations.',
    icon: Shield,
    color: 'bg-[#B89852]/10 border-[#B89852]/40 text-[#B89852]',
    statBonus: '+15% Damage against Habit Monsters',
    tag: 'DISCIPLINE',
  },
  {
    id: 'Social',
    name: 'Path of Social',
    description: 'Nurture relationships, communicate with clarity, lead and build community.',
    icon: Users,
    color: 'bg-[#5E8B4C]/10 border-[#5E8B4C]/40 text-[#5E8B4C]',
    statBonus: '+10% Gold rewards from party quests',
    tag: 'SOCIAL',
  },
]

const STARTER_QUESTS = [
  { title: 'Morning Hydration Protocol', description: 'Drink 500ml water right after waking up', path: 'Fitness', difficulty: 'Easy', xp: 50, coins: 15 },
  { title: 'Deep Work Sprint', description: 'Complete 30 minutes of uninterrupted study or coding', path: 'Learning', difficulty: 'Medium', xp: 120, coins: 35 },
  { title: 'Daily Creation Session', description: 'Write, draw, or design for 20 focused minutes', path: 'Creativity', difficulty: 'Medium', xp: 120, coins: 35 },
  { title: 'Distraction Slaying', description: 'Zero mindless social media scrolling for 3 hours', path: 'Discipline', difficulty: 'Hard', xp: 200, coins: 60 },
]

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [adventurerName, setAdventurerName] = useState('')
  const [selectedPath, setSelectedPath] = useState('Learning')
  const [selectedCompanionId, setSelectedCompanionId] = useState('spriggo')
  const [selectedQuest, setSelectedQuest] = useState(STARTER_QUESTS[0])
  const [customQuestTitle, setCustomQuestTitle] = useState('')

  const activeCompanion = STARTER_COMPANIONS.find((c) => c.id === selectedCompanionId) || STARTER_COMPANIONS[0]

  const handleNext = () => {
    if (step === 3) {
      gameAudio.playFanfare()
    }
    if (step < 4) {
      setStep(step + 1)
    } else {
      router.push(`/login?name=${encodeURIComponent(adventurerName || 'Hero')}`)
    }
  }

  return (
    <main className="relative min-h-screen bg-world-sky overflow-x-hidden pt-20 pb-16 flex flex-col justify-center">
      <WorldScene />

      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-12 w-full max-w-3xl mx-auto">
        
        {/* Step Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3 text-xs font-black tracking-widest text-[#8A7A6A] uppercase">
            <span className={step >= 1 ? 'text-[#D97757]' : ''}>1. Identity</span>
            <span className={step >= 2 ? 'text-[#D97757]' : ''}>2. Path</span>
            <span className={step >= 3 ? 'text-[#D97757]' : ''}>3. Companion</span>
            <span className={step >= 4 ? 'text-[#D97757]' : ''}>4. First Quest</span>
          </div>
          <div className="w-full bg-[#E5D3B3] h-2 rounded-full overflow-hidden shadow-inner border-2 border-[#E5D3B3]">
            <div
              className="bg-[#D97757] h-full transition-all duration-300 rounded-full shadow-[inset_0_-2px_0_rgba(0,0,0,0.2)]"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-white border-4 border-[#E5D3B3] p-8 sm:p-10 rounded-3xl shadow-[8px_8px_0_#E5D3B3] space-y-6">
          
          {/* STEP 1: IDENTITY */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FDF9F1] border-2 border-[#E5D3B3] text-[#8A7A6A] text-xs font-bold tracking-widest uppercase shadow-[0_2px_0_#E5D3B3]">
                  <Sparkles className="w-3.5 h-3.5 text-[#D97757]" />
                  Character Initialization
                </div>
                <h1 className="text-3xl sm:text-4xl font-black text-[#3D2C1E] tracking-tight uppercase">
                  NAME YOUR ADVENTURER
                </h1>
                <p className="text-[#8A7A6A] text-sm max-w-md mx-auto font-medium">
                  Every legend begins with a name. This will represent you on the leaderboards and in battle.
                </p>
              </div>

              <div className="max-w-md mx-auto space-y-4 pt-4">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-black tracking-widest text-[#8A7A6A] uppercase" htmlFor="adventurer">
                    Adventurer Name
                  </label>
                  <input
                    id="adventurer"
                    type="text"
                    value={adventurerName}
                    onChange={(e) => setAdventurerName(e.target.value)}
                    placeholder="e.g. Shadowblade, Kira, Orion"
                    className="px-4 py-3 bg-[#FDF9F1] border-2 border-[#E5D3B3] rounded-xl focus:outline-none focus:border-[#D97757] focus:ring-2 focus:ring-[#D97757]/20 text-[#3D2C1E] text-lg placeholder-[#8A7A6A]/50 font-bold shadow-inner"
                    autoFocus
                  />
                </div>

                <Button
                  size="lg"
                  onClick={handleNext}
                  disabled={!adventurerName.trim()}
                  className="w-full mt-4 bg-[#D97757] hover:bg-[#C26243] text-white border-2 border-[#A34928] shadow-[0_4px_0_#A34928] active:translate-y-1 active:shadow-none transition-all font-black px-6 py-6 rounded-xl text-lg uppercase disabled:opacity-50 disabled:active:translate-y-0 disabled:active:shadow-[0_4px_0_#A34928]"
                >
                  PROCEED TO PATH SELECTION
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>
          )}

          {/* STEP 2: CHOOSE YOUR PATH */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FDF9F1] border-2 border-[#E5D3B3] text-[#8A7A6A] text-xs font-bold tracking-widest uppercase shadow-[0_2px_0_#E5D3B3]">
                  <Flame className="w-3.5 h-3.5 text-[#D97757]" />
                  Core Affinity
                </div>
                <h1 className="text-3xl sm:text-4xl font-black text-[#3D2C1E] tracking-tight uppercase">
                  CHOOSE YOUR PRIMARY PATH
                </h1>
                <p className="text-[#8A7A6A] text-sm max-w-lg mx-auto font-medium">
                  Where will your focus lie? You will earn XP across all five paths, but your affinity grants passive bonuses.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                {PATHS.map((path) => {
                  const isSelected = selectedPath === path.id
                  const Icon = path.icon
                  return (
                    <button
                      key={path.id}
                      onClick={() => setSelectedPath(path.id)}
                      className={`text-left p-5 rounded-2xl border-4 transition-all relative overflow-hidden bg-white ${
                        isSelected
                          ? 'border-[#D97757] shadow-[4px_4px_0_rgba(217,119,87,0.3)] scale-[1.02]'
                          : 'border-[#E5D3B3] hover:border-[#D97757]/50 shadow-[4px_4px_0_rgba(229,211,179,0.5)] hover:translate-y-[-2px]'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className={`p-3 rounded-xl border-2 mb-3 shadow-[0_2px_0_currentColor] ${path.color}`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        {isSelected && (
                          <div className="w-8 h-8 rounded-full bg-[#D97757] text-white flex items-center justify-center border-2 border-[#A34928] shadow-[0_2px_0_#A34928]">
                            <Check className="w-5 h-5 stroke-[3]" />
                          </div>
                        )}
                      </div>
                      <h3 className="text-lg font-black text-[#3D2C1E] mb-1 uppercase">{path.name}</h3>
                      <p className="text-sm text-[#8A7A6A] font-medium mb-3 line-clamp-2">{path.description}</p>
                      <span className={`text-[11px] font-black uppercase tracking-wider px-2 py-1 rounded border-2 ${path.color}`}>
                        {path.statBonus}
                      </span>
                    </button>
                  )
                })}
              </div>

              <div className="flex justify-between items-center pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setStep(1)}
                  className="bg-[#FDF9F1] hover:bg-[#E5D3B3] text-[#3D2C1E] border-2 border-[#E5D3B3] shadow-[0_4px_0_#E5D3B3] active:translate-y-1 active:shadow-none transition-all font-black px-6 rounded-xl uppercase"
                >
                  Back
                </Button>
                <Button 
                  size="lg" 
                  onClick={handleNext}
                  className="bg-[#D97757] hover:bg-[#C26243] text-white border-2 border-[#A34928] shadow-[0_4px_0_#A34928] active:translate-y-1 active:shadow-none transition-all font-black px-8 rounded-xl uppercase tracking-wider"
                >
                  ACCEPT PATH & MEET COMPANION
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>
          )}

          {/* STEP 3: COMPANION */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FDF9F1] border-2 border-[#E5D3B3] text-[#8A7A6A] text-xs font-bold tracking-widest uppercase shadow-[0_2px_0_#E5D3B3]">
                  <Sparkles className="w-3.5 h-3.5 text-[#D97757]" />
                  8-Bit Starter Bond
                </div>
                <h1 className="text-3xl sm:text-4xl font-black text-[#3D2C1E] tracking-tight uppercase">
                  CHOOSE YOUR 8-BIT COMPANION
                </h1>
                <p className="text-[#8A7A6A] text-sm max-w-lg mx-auto font-medium">
                  Select your lifelong elemental partner. Companions evolve as you complete quests and defend your daily streaks.
                </p>
              </div>

              {/* 4-Companion 8-Bit Selector Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {STARTER_COMPANIONS.map((comp) => {
                  const isSelected = selectedCompanionId === comp.id
                  return (
                    <button
                      key={comp.id}
                      onClick={() => {
                        gameAudio.playTap()
                        setSelectedCompanionId(comp.id)
                      }}
                      className={`p-3 rounded-2xl border-4 transition-all text-center flex flex-col items-center gap-3 overflow-hidden bg-white ${
                        isSelected
                          ? `border-[#D97757] shadow-[4px_4px_0_rgba(217,119,87,0.3)] scale-[1.03]`
                          : 'border-[#E5D3B3] shadow-[4px_4px_0_rgba(229,211,179,0.5)] hover:translate-y-[-2px]'
                      }`}
                    >
                      <div className={`relative w-16 h-16 rounded-xl border-2 ${comp.borderColor} ${comp.bgGradient} shadow-inner overflow-hidden flex items-center justify-center`}>
                        <Image
                          src={comp.image}
                          alt={comp.name}
                          width={48}
                          height={48}
                          className="object-contain pixelated"
                          unoptimized
                        />
                      </div>
                      <div>
                        <span className="font-black text-[#3D2C1E] text-sm block uppercase">{comp.name}</span>
                        <span className={`text-[10px] font-bold tracking-wider uppercase ${comp.color}`}>{comp.element.split('/')[0]}</span>
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Chosen Companion Spotlight */}
              <div className={`max-w-md mx-auto p-6 rounded-3xl ${activeCompanion.bgGradient} border-4 ${activeCompanion.borderColor} text-center space-y-4 shadow-[8px_8px_0_currentColor] relative overflow-hidden transition-all duration-300`}>
                <div className={`relative w-36 h-36 mx-auto rounded-2xl bg-white border-4 ${activeCompanion.borderColor} shadow-[4px_4px_0_currentColor] overflow-hidden flex items-center justify-center`}>
                  <Image
                    src={activeCompanion.image}
                    alt={activeCompanion.name}
                    width={100}
                    height={100}
                    className="object-contain pixelated"
                    unoptimized
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#3D2C1E] border-2 border-[#1A120C] text-[10px] font-black text-[#FDF9F1] shadow-[0_2px_0_#1A120C]">
                    8-BIT
                  </div>
                </div>

                <div>
                  <h3 className="text-3xl font-black text-[#3D2C1E] uppercase">{activeCompanion.name}</h3>
                  <span className={`text-xs font-black uppercase tracking-widest ${activeCompanion.color}`}>
                    {activeCompanion.title} • {activeCompanion.element}
                  </span>
                </div>

                <div className="p-4 bg-white rounded-2xl border-4 border-[#E5D3B3] text-left text-sm space-y-2 shadow-[4px_4px_0_#E5D3B3]">
                  <div className="font-black text-[#3D2C1E] flex items-center gap-2 uppercase tracking-wide">
                    <Zap className="w-5 h-5 text-[#D97757]" />
                    Passive Perk: {activeCompanion.passiveName}
                  </div>
                  <p className="text-[#8A7A6A] font-medium leading-relaxed">
                    {activeCompanion.passiveDesc}
                  </p>
                </div>

                <div className="flex justify-around text-xs text-[#8A7A6A] pt-4 border-t-4 border-[#E5D3B3]/50">
                  <div>
                    <span className="block text-[#3D2C1E] font-black text-lg">LVL 1</span>
                    <span className="font-bold uppercase tracking-wider">Companion</span>
                  </div>
                  <div>
                    <span className={`block font-black text-lg ${activeCompanion.color}`}>Stage 1/3</span>
                    <span className="font-bold uppercase tracking-wider">Evolution</span>
                  </div>
                  <div>
                    <span className="block text-[#D97757] font-black text-lg">CP {activeCompanion.cp}</span>
                    <span className="font-bold uppercase tracking-wider">Combat Power</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setStep(2)}
                  className="bg-[#FDF9F1] hover:bg-[#E5D3B3] text-[#3D2C1E] border-2 border-[#E5D3B3] shadow-[0_4px_0_#E5D3B3] active:translate-y-1 active:shadow-none transition-all font-black px-6 rounded-xl uppercase"
                >
                  Back
                </Button>
                <Button 
                  size="lg" 
                  onClick={handleNext} 
                  className="bg-[#5E8B4C] hover:bg-[#4A733A] text-white border-2 border-[#365928] shadow-[0_4px_0_#365928] active:translate-y-1 active:shadow-none transition-all font-black px-8 rounded-xl uppercase tracking-wider"
                >
                  BOND WITH {activeCompanion.name}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>
          )}

          {/* STEP 4: FIRST QUEST */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FDF9F1] border-2 border-[#E5D3B3] text-[#8A7A6A] text-xs font-bold tracking-widest uppercase shadow-[0_2px_0_#E5D3B3]">
                  <Sword className="w-3.5 h-3.5 text-[#D97757]" />
                  First Objective
                </div>
                <h1 className="text-3xl sm:text-4xl font-black text-[#3D2C1E] tracking-tight uppercase">
                  FORGE YOUR FIRST QUEST
                </h1>
                <p className="text-[#8A7A6A] text-sm max-w-lg mx-auto font-medium">
                  Pick a starter quest or write your own to commence your LifeQuest journey.
                </p>
              </div>

              <div className="space-y-4 pt-2">
                {STARTER_QUESTS.map((quest, idx) => {
                  const isSelected = selectedQuest.title === quest.title && !customQuestTitle
                  return (
                    <div
                      key={idx}
                      onClick={() => {
                        setSelectedQuest(quest)
                        setCustomQuestTitle('')
                      }}
                      className={`p-5 rounded-2xl border-4 cursor-pointer transition-all flex items-center justify-between ${
                        isSelected
                          ? 'border-[#D97757] bg-[#FDF9F1] shadow-[4px_4px_0_rgba(217,119,87,0.3)] scale-[1.01]'
                          : 'border-[#E5D3B3] bg-white shadow-[4px_4px_0_rgba(229,211,179,0.5)] hover:border-[#D97757]/50 hover:translate-y-[-2px]'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-black text-[#3D2C1E] text-base uppercase">{quest.title}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-[#E5D3B3] border border-[#CBB48C] text-[#3D2C1E] font-black uppercase tracking-wider">
                            {quest.path}
                          </span>
                        </div>
                        <p className="text-sm text-[#8A7A6A] font-medium">{quest.description}</p>
                      </div>
                      <div className="text-right flex flex-col gap-1 items-end">
                        <span className="text-[#4C819F] bg-[#4C819F]/10 px-2 py-1 rounded text-xs font-black border-2 border-[#4C819F]/30 block shadow-[0_2px_0_rgba(76,129,159,0.3)]">+{quest.xp} XP</span>
                        <span className="text-[#B89852] bg-[#B89852]/10 px-2 py-1 rounded text-[10px] font-black border-2 border-[#B89852]/30 block shadow-[0_2px_0_rgba(184,152,82,0.3)]">+{quest.coins} GOLD</span>
                      </div>
                    </div>
                  )
                })}

                <div className="pt-4 mt-6 border-t-4 border-[#E5D3B3] border-dashed">
                  <label className="block text-xs font-black text-[#8A7A6A] uppercase tracking-wider mb-2">
                    Or Write a Custom Quest:
                  </label>
                  <input
                    type="text"
                    value={customQuestTitle}
                    onChange={(e) => setCustomQuestTitle(e.target.value)}
                    placeholder="e.g. Read Chapter 4 of Clean Code"
                    className="w-full px-5 py-4 bg-[#FDF9F1] border-2 border-[#E5D3B3] rounded-xl focus:outline-none focus:border-[#D97757] focus:ring-2 focus:ring-[#D97757]/20 text-[#3D2C1E] text-base placeholder-[#8A7A6A]/50 font-bold shadow-inner"
                  />
                </div>
              </div>

              {/* Summary card */}
              <div className="p-5 rounded-2xl bg-[#3D2C1E] border-4 border-[#8A7A6A] flex items-center justify-between text-sm shadow-[8px_8px_0_rgba(138,122,106,0.3)] mt-6">
                <div>
                  <span className="font-black text-[#FDF9F1] text-lg uppercase block mb-1">{adventurerName || 'Hero'}</span>
                  <p className="text-[#E5D3B3] font-bold text-xs uppercase tracking-wider">Path of {selectedPath} • {activeCompanion.name} Bonded</p>
                </div>
                <div className="text-right">
                  <span className="text-[#D97757] font-black text-xs uppercase tracking-wider block mb-1">First Quest Locked</span>
                  <p className="text-[#FDF9F1] font-bold">{customQuestTitle || selectedQuest.title}</p>
                </div>
              </div>

              <div className="flex justify-between items-center pt-6">
                <Button 
                  variant="outline" 
                  onClick={() => setStep(3)}
                  className="bg-[#FDF9F1] hover:bg-[#E5D3B3] text-[#3D2C1E] border-2 border-[#E5D3B3] shadow-[0_4px_0_#E5D3B3] active:translate-y-1 active:shadow-none transition-all font-black px-6 rounded-xl uppercase"
                >
                  Back
                </Button>
                <Button 
                  size="lg" 
                  onClick={handleNext}
                  className="bg-[#D97757] hover:bg-[#C26243] text-white border-2 border-[#A34928] shadow-[0_4px_0_#A34928] active:translate-y-1 active:shadow-none transition-all font-black px-8 rounded-xl text-lg uppercase tracking-wider"
                >
                  LOCK IN & ENTER THE NEXUS
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
