import Link from 'next/link'
import { Sparkles, Sword, Flame, Trophy, Crown, Shield, BookOpen, Dumbbell, Palette, Users, ArrowRight, Zap, Target, HeartHandshake } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { WorldScene } from '@/components/game/world-scene'

export default function AboutPage() {
  const paths = [
    {
      name: 'Learning',
      icon: BookOpen,
      color: 'text-[#3D2C1E] border-[#E5D3B3] bg-[#FDF9F1]',
      description: 'Mastery of intellect, deep work, knowledge acquisition, and mental discipline.',
    },
    {
      name: 'Fitness',
      icon: Dumbbell,
      color: 'text-[#3D2C1E] border-[#E5D3B3] bg-[#FDF9F1]',
      description: 'Physical endurance, strength training, athletic consistency, and vibrant energy.',
    },
    {
      name: 'Creativity',
      icon: Palette,
      color: 'text-[#3D2C1E] border-[#E5D3B3] bg-[#FDF9F1]',
      description: 'Original expression, software architecture, writing, artwork, and creative problem solving.',
    },
    {
      name: 'Discipline',
      icon: Shield,
      color: 'text-[#3D2C1E] border-[#E5D3B3] bg-[#FDF9F1]',
      description: 'Willpower, breaking destructive habits, resisting instant gratification, and routine.',
    },
    {
      name: 'Social',
      icon: Users,
      color: 'text-[#3D2C1E] border-[#E5D3B3] bg-[#FDF9F1]',
      description: 'Building deep relationships, high-trust communication, leadership, and community impact.',
    },
  ]

  return (
    <main className="relative min-h-screen bg-world-sky overflow-x-hidden pt-20 pb-16">
      <WorldScene />

      <div className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 overflow-hidden text-[#3D2C1E]">
        <div className="max-w-5xl mx-auto space-y-24 relative z-10">
          
          {/* Hero Section */}
          <section className="text-center space-y-8 pt-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FDF9F1] border-2 border-[#E5D3B3] text-[#8A7A6A] text-xs font-bold tracking-widest uppercase shadow-[0_2px_0_#E5D3B3]">
              <Sparkles className="w-4 h-4 text-[#D97757]" />
              The Lore of the Nexus
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-black text-[#3D2C1E] tracking-tight drop-shadow-sm uppercase">
              TURN YOUR LIFE INTO <span className="text-[#D97757]">AN EPIC RPG</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-[#8A7A6A] max-w-3xl mx-auto leading-relaxed font-medium">
              NEXUS transforms everyday self-improvement into an authentic role-playing adventure. 
              Every push-up, book chapter, focus session, and broken bad habit rewards your character with 
              real-time XP, Gold, companion evolution, and legendary status.
            </p>
            
            <div className="flex justify-center gap-4 pt-4">
              <Button 
                size="lg" 
                asChild
                className="bg-[#D97757] hover:bg-[#C26243] text-white border-2 border-[#A34928] shadow-[0_4px_0_#A34928] active:translate-y-1 active:shadow-none transition-all font-bold px-8 py-6 rounded-xl text-lg"
              >
                <Link href="/onboarding">
                  ENTER THE NEXUS
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                asChild
                className="bg-[#FDF9F1] hover:bg-[#E5D3B3] text-[#3D2C1E] border-2 border-[#E5D3B3] shadow-[0_4px_0_#E5D3B3] active:translate-y-1 active:shadow-none transition-all font-bold px-8 py-6 rounded-xl text-lg"
              >
                <Link href="/login">
                  LOG INTO COMMAND
                </Link>
              </Button>
            </div>
          </section>

          {/* The Core Loop */}
          <section className="space-y-10 relative">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-black text-[#3D2C1E] tracking-tight uppercase">THE ADVENTURE LOOP</h2>
              <p className="text-[#8A7A6A] text-sm max-w-xl mx-auto font-medium">
                How real-world discipline translates directly into character progression.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  step: '01',
                  title: 'Real Life Quests',
                  icon: Target,
                  desc: 'Set daily or epic objectives across Fitness, Learning, Creativity, Discipline, or Social paths.',
                },
                {
                  step: '02',
                  title: 'Earn XP & Gold',
                  icon: Zap,
                  desc: 'Completing quests verifies your activity and awards server-calculated XP, Gold, and attribute boosts.',
                },
                {
                  step: '03',
                  title: 'Evolve Companions',
                  icon: Flame,
                  desc: 'Bond with creatures like Spriggo. Maintain streaks to trigger elemental companion evolutions.',
                },
                {
                  step: '04',
                  title: 'Slay Bad Habits',
                  icon: Sword,
                  desc: 'Face Habit Monsters with real HP. Deal damage by resisting urges and completing discipline tasks.',
                },
              ].map((item, i) => (
                <div key={i} className="bg-white border-4 border-[#E5D3B3] p-6 rounded-2xl relative group hover:-translate-y-1 transition-transform shadow-[4px_4px_0_rgba(229,211,179,0.5)]">
                  <span className="text-4xl font-black text-[#E5D3B3]/40 absolute top-3 right-4">
                    {item.step}
                  </span>
                  <div className="w-12 h-12 bg-[#FDF9F1] border-2 border-[#E5D3B3] rounded-xl flex items-center justify-center mb-4 shadow-[0_2px_0_#E5D3B3]">
                    <item.icon className="w-6 h-6 text-[#D97757]" />
                  </div>
                  <h3 className="text-lg font-black text-[#3D2C1E] mb-2 uppercase">{item.title}</h3>
                  <p className="text-sm text-[#8A7A6A] leading-relaxed font-medium">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* The 5 Paths */}
          <section className="space-y-10 bg-[#E5D3B3]/20 p-8 sm:p-12 rounded-3xl border-4 border-[#E5D3B3]">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-black text-[#3D2C1E] tracking-tight uppercase">THE FIVE PATHS OF MASTERY</h2>
              <p className="text-[#8A7A6A] text-sm max-w-xl mx-auto font-medium">
                Every quest is categorized under an attribute path. Build a balanced legend.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {paths.map((p, i) => {
                const Icon = p.icon
                return (
                  <div key={i} className={`bg-white border-4 border-[#E5D3B3] p-6 rounded-2xl space-y-3 shadow-[4px_4px_0_rgba(229,211,179,0.5)] ${i === 3 ? 'md:col-span-1 md:col-start-1' : ''} ${i === 4 ? 'md:col-span-1 md:col-start-2' : ''}`}>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center border-2 shadow-[0_2px_0_#E5D3B3] ${p.color}`}>
                      <Icon className="w-6 h-6 text-[#D97757]" />
                    </div>
                    <h3 className="text-xl font-black text-[#3D2C1E] uppercase">{p.name}</h3>
                    <p className="text-sm text-[#8A7A6A] font-medium leading-relaxed">{p.description}</p>
                  </div>
                )
              })}
            </div>
          </section>

          {/* Habit Monsters Feature */}
          <section className="bg-[#3D2C1E] border-4 border-[#8A7A6A] p-8 sm:p-12 rounded-3xl relative overflow-hidden shadow-[8px_8px_0_rgba(138,122,106,0.3)]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E5D3B3] border-2 border-[#D97757] text-[#D97757] text-xs font-black uppercase tracking-wider shadow-[0_2px_0_#D97757]">
                  <Sword className="w-3.5 h-3.5" />
                  Boss Battles
                </div>
                <h2 className="text-3xl font-black text-[#FDF9F1] uppercase drop-shadow-md">
                  SLAY YOUR BAD HABITS IN COMBAT
                </h2>
                <p className="text-[#E5D3B3] text-sm leading-relaxed font-medium">
                  Doomscrolling, late-night snacking, and procrastination manifest as fearsome Habit Monsters. 
                  Each day you uphold discipline, you deal damage to their HP pool. Defeat bosses to unlock Mystery Boxes 
                  packed with rare titles and gold coins.
                </p>
                <div className="pt-4">
                  <Button 
                    asChild 
                    className="bg-[#D97757] hover:bg-[#C26243] text-white border-2 border-[#A34928] shadow-[0_4px_0_#A34928] active:translate-y-1 active:shadow-none transition-all font-bold px-6 py-5 rounded-xl"
                  >
                    <Link href="/onboarding">
                      CHALLENGE A MONSTER
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#2A1E14] border-4 border-[#8A7A6A] space-y-4 relative shadow-inner">
                {/* Decorative retro pixels */}
                <div className="absolute top-2 right-2 flex gap-1">
                  <div className="w-2 h-2 bg-[#D97757]" />
                  <div className="w-2 h-2 bg-[#D97757]" />
                </div>
                <div className="flex justify-between items-center border-b-2 border-[#3D2C1E] pb-3">
                  <div>
                    <h4 className="font-black text-lg text-[#FDF9F1] uppercase">Doomscroll Leviathan</h4>
                    <span className="text-xs text-[#D97757] font-bold uppercase tracking-widest">Threat Level 3 • Boss</span>
                  </div>
                  <span className="text-sm font-black text-[#FDF9F1] bg-[#3D2C1E] px-2 py-1 rounded">120/300 HP</span>
                </div>
                <div className="w-full bg-[#3D2C1E] h-4 rounded border-2 border-[#1A120C] overflow-hidden p-0.5">
                  <div className="bg-[#D97757] h-full w-[40%] rounded-sm" />
                </div>
                <p className="text-xs text-[#E5D3B3] italic font-medium pt-2">
                  "It feeds on endless vertical feeds and stolen midnight sleep. Resist the feed to deal 30 damage daily."
                </p>
              </div>
            </div>
          </section>

          {/* CTA Footer */}
          <section className="text-center py-16 space-y-8 bg-white border-4 border-[#E5D3B3] rounded-3xl shadow-[8px_8px_0_#E5D3B3]">
            <div className="flex justify-center pb-4">
              <Trophy className="w-16 h-16 text-[#D97757]" />
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-[#3D2C1E] uppercase">
              YOUR ADVENTURE AWAITS
            </h2>
            <p className="text-[#8A7A6A] max-w-lg mx-auto text-base font-medium">
              Join the Nexus today. Set your first quest, bond with your creature, and turn your life into a game.
            </p>
            <div className="pt-4">
              <Button 
                size="lg" 
                asChild 
                className="bg-[#3D2C1E] hover:bg-[#2A1E14] text-[#FDF9F1] border-2 border-[#1A120C] shadow-[0_6px_0_#1A120C] active:translate-y-1.5 active:shadow-none transition-all font-black px-10 py-8 rounded-2xl text-xl uppercase tracking-wider"
              >
                <Link href="/onboarding">
                  START PLAYING NOW
                  <ArrowRight className="ml-3 w-6 h-6" />
                </Link>
              </Button>
            </div>
          </section>
          
        </div>
      </div>
    </main>
  )
}
