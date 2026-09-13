import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Sword, Flame, Trophy, Crown, Zap, Shield, Heart } from "lucide-react";
import Link from "next/link";
import { CompanionCinema } from "@/components/game/companion-cinema";
import { WorldScene } from "@/components/game/world-scene";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-world-sky overflow-hidden">
      {/* Anime Fantasy Background */}
      <WorldScene />

      <div className="relative z-10 flex flex-col items-center justify-center pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full min-h-screen">
        {/* Top Tagline */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-world-panel/90 backdrop-blur-md border-2 border-world-accent/30 text-world-text font-black mb-8 tracking-widest uppercase shadow-sm">
          <Sparkles className="h-4 w-4 text-world-accent animate-pulse" />
          <span>LifeQuest 2.0 — Your Real-Life RPG</span>
        </div>

        {/* Hero Title */}
        <div className="text-center max-w-5xl space-y-6 mb-12">
          <h1 className="text-6xl sm:text-8xl lg:text-9xl font-black tracking-tight text-world-text leading-none font-display drop-shadow-md">
            PLAY YOUR <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#e8c37d] to-[#b88c3a] drop-shadow-lg filter drop-shadow-[0_2px_2px_rgba(0,0,0,0.1)]">LIFE</span>.
          </h1>

          <p className="text-lg sm:text-2xl text-[#6b5c4d] font-bold max-w-2xl mx-auto leading-relaxed">
            Level up your character, bond with elemental companions, conquer bad habit bosses, and claim legendary rewards.
          </p>
        </div>

        {/* Action Buttons - Clash of Clans Style */}
        <div className="flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto mb-16">
          <Button
            size="lg"
            asChild
            className="bg-gradient-to-b from-[#f4d068] to-[#d4a853] hover:from-[#fce085] hover:to-[#e8c37d] text-[#4a361c] border-[3px] border-[#ffe8a1] font-black text-xl px-10 py-8 rounded-2xl w-full sm:w-auto tracking-wide shadow-[0_6px_0_#a88132,0_15px_20px_rgba(212,168,83,0.4)] active:shadow-[0_0px_0_#a88132] active:translate-y-[6px] transition-all"
          >
            <Link href="/onboarding" className="flex items-center gap-3">
              START YOUR ADVENTURE
              <ArrowRight className="h-6 w-6 stroke-[3]" />
            </Link>
          </Button>

          <Button
            size="lg"
            variant="outline"
            asChild
            className="bg-white/90 hover:bg-white text-world-text border-[3px] border-world-accent/20 font-black text-xl px-10 py-8 rounded-2xl w-full sm:w-auto tracking-wide shadow-[0_6px_0_rgba(138,101,34,0.15)] active:shadow-none active:translate-y-[6px] transition-all backdrop-blur-sm"
          >
            <Link href="/dashboard" className="flex items-center gap-3">
              <Sword className="h-6 w-6 text-world-accent" />
              COMMAND CENTER
            </Link>
          </Button>
        </div>

        {/* Hero Looping Pokemon-Style Companion Cinema Showcase */}
        <div className="w-full max-w-4xl mx-auto relative rounded-[2rem] p-3 bg-world-panel/60 backdrop-blur-md border-[3px] border-world-accent/20 shadow-2xl">
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-30">
            <span className="text-sm font-black uppercase tracking-widest text-[#5a4123] bg-gradient-to-b from-[#fce085] to-[#f4d068] border-[3px] border-[#ffe8a1] px-6 py-2 rounded-full inline-flex items-center gap-2 shadow-[0_4px_0_#a88132]">
              <Heart className="w-5 h-5 text-rose-500 fill-rose-500 animate-pulse" />
              Live Sanctuary Playground
            </span>
          </div>
          <div className="rounded-3xl overflow-hidden border-[3px] border-white/40 shadow-inner bg-black">
            <CompanionCinema showStats={false} className="border-none shadow-none rounded-none" />
          </div>
        </div>

        {/* 6-Pillar Gameplay Loop Badges */}
        <div className="mt-24 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 w-full max-w-6xl mx-auto">
          {[
            { label: "REAL QUESTS", sub: "Daily Habits", icon: Sword, color: "text-[#4a90e2] bg-[#4a90e2]/10 border-[#4a90e2]/30" },
            { label: "XP PROGRESS", sub: "100*(N-1)^1.5", icon: Sparkles, color: "text-[#d4a853] bg-[#d4a853]/10 border-[#d4a853]/30" },
            { label: "COMPANIONS", sub: "Emberfox & Aqualynx", icon: Flame, color: "text-[#e25c4a] bg-[#e25c4a]/10 border-[#e25c4a]/30" },
            { label: "HABIT BOSSES", sub: "Slain for Bounties", icon: Zap, color: "text-[#9b59b6] bg-[#9b59b6]/10 border-[#9b59b6]/30" },
            { label: "ARMORY SHOP", sub: "Titles & Skins", icon: Trophy, color: "text-[#f39c12] bg-[#f39c12]/10 border-[#f39c12]/30" },
            { label: "HALL OF FAME", sub: "Global Ranks", icon: Crown, color: "text-[#2ecc71] bg-[#2ecc71]/10 border-[#2ecc71]/30" },
          ].map((step, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center gap-3 p-5 rounded-2xl bg-white border-2 border-world-accent/10 hover:border-world-accent/40 hover:-translate-y-1 hover:shadow-lg transition-all group shadow-sm"
            >
              <div className={`p-3 rounded-xl border-2 ${step.color} group-hover:scale-110 transition-transform shadow-inner`}>
                <step.icon className="h-7 w-7" />
              </div>
              <div className="space-y-1">
                <span className="text-sm font-black tracking-wider text-world-text block">
                  {step.label}
                </span>
                <span className="text-[10px] text-[#8a7a6a] font-bold uppercase block">
                  {step.sub}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
