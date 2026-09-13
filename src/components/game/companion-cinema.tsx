'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { gameAudio } from '@/lib/audio/game-audio'
import { 
  Play, 
  Pause, 
  Sparkles, 
  Heart, 
  Volume2, 
  VolumeX, 
  Flame, 
  Droplets, 
  Leaf, 
  ShieldCheck, 
  Zap, 
  Maximize2 
} from 'lucide-react'

interface CompanionCinemaProps {
  className?: string
  showStats?: boolean
}

export function CompanionCinema({ className = '', showStats = true }: CompanionCinemaProps) {
  const [currentFrame, setCurrentFrame] = useState<number>(0)
  const [isPlaying, setIsPlaying] = useState<boolean>(true)
  const [isMuted, setIsMuted] = useState<boolean>(false)
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number; emote: string }[]>([])
  const [cheerCount, setCheerCount] = useState<number>(142)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Endless looping animation frame alternator
  useEffect(() => {
    if (!isPlaying) return
    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev === 0 ? 1 : 0))
    }, 2800)
    return () => clearInterval(interval)
  }, [isPlaying])

  // Canvas floating particle engine (Embers, bubbles, leaves, sparkles)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    const particles: {
      x: number
      y: number
      size: number
      speedY: number
      speedX: number
      color: string
      alpha: number
      type: 'ember' | 'bubble' | 'leaf' | 'sparkle'
    }[] = []

    const colors = {
      ember: '#f97316',
      bubble: '#00e5ff',
      leaf: '#22c55e',
      sparkle: '#eab308',
    }

    const types: ('ember' | 'bubble' | 'leaf' | 'sparkle')[] = ['ember', 'bubble', 'leaf', 'sparkle']

    for (let i = 0; i < 35; i++) {
      const type = types[Math.floor(Math.random() * types.length)]
      particles.push({
        x: Math.random() * 800,
        y: Math.random() * 450,
        size: Math.random() * 4 + 2,
        speedY: -(Math.random() * 0.8 + 0.3),
        speedX: (Math.random() - 0.5) * 0.6,
        color: colors[type],
        alpha: Math.random() * 0.7 + 0.3,
        type,
      })
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p) => {
        p.y += p.speedY
        p.x += p.speedX
        if (p.y < -10) p.y = canvas.height + 10
        if (p.x < -10) p.x = canvas.width + 10
        if (p.x > canvas.width + 10) p.x = -10

        ctx.save()
        ctx.globalAlpha = p.alpha
        ctx.fillStyle = p.color
        ctx.shadowColor = p.color
        ctx.shadowBlur = 8

        ctx.beginPath()
        if (p.type === 'sparkle') {
          ctx.arc(p.x, p.y, p.size * 0.8, 0, Math.PI * 2)
        } else {
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        }
        ctx.fill()
        ctx.restore()
      })

      animationId = requestAnimationFrame(render)
    }

    render()
    return () => cancelAnimationFrame(animationId)
  }, [])

  // Interactive petting / tap reaction
  const handleArenaClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    gameAudio.playPet()
    setCheerCount((c) => c + 1)

    const emotes = ['❤️', '✨', '⚡', '🌟', '🍀']
    const emote = emotes[Math.floor(Math.random() * emotes.length)]
    const newHeart = { id: Date.now() + Math.random(), x, y, emote }

    setHearts((prev) => [...prev, newHeart])
    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h.id !== newHeart.id))
    }, 1200)
  }

  const toggleAudio = (e: React.MouseEvent) => {
    e.stopPropagation()
    const muted = gameAudio.toggleMute()
    setIsMuted(muted)
  }

  return (
    <div className={`relative overflow-hidden rounded-3xl border-2 border-amber-500/40 bg-black shadow-[0_0_40px_rgba(245,158,11,0.2)] group ${className}`}>
      {/* Visual Video Display Canvas & Cross-fading frames */}
      <div
        onClick={handleArenaClick}
        className="relative aspect-video w-full overflow-hidden cursor-pointer select-none"
      >
        {/* Frame 1: Companions Gathered */}
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            currentFrame === 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
          style={{ transitionProperty: 'opacity, transform' }}
        >
          <Image
            src="/creatures-arena.jpg"
            alt="LifeQuest Elemental Companions Playing - Loop Frame 1"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Frame 2: Leaping & Elemental Sparks */}
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            currentFrame === 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
          style={{ transitionProperty: 'opacity, transform' }}
        >
          <Image
            src="/creatures-arena-frame2.jpg"
            alt="LifeQuest Elemental Companions Leaping - Loop Frame 2"
            fill
            className="object-cover"
          />
        </div>

        {/* Floating Particles Canvas Overlay */}
        <canvas
          ref={canvasRef}
          width={800}
          height={450}
          className="absolute inset-0 w-full h-full pointer-events-none z-20"
        />

        {/* Click Heart Emote Bursts */}
        {hearts.map((h) => (
          <div
            key={h.id}
            className="absolute pointer-events-none z-30 text-2xl font-black animate-ping"
            style={{
              left: `${h.x - 12}px`,
              top: `${h.y - 12}px`,
              animationDuration: '1s',
            }}
          >
            {h.emote}
          </div>
        ))}

        {/* Top Badges & Live Status */}
        <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/70 border border-emerald-500/40 backdrop-blur-md shadow-lg pointer-events-auto">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-[11px] font-black uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
              Live Sanctuary Loop
            </span>
          </div>

          <div className="flex items-center gap-2 pointer-events-auto">
            <button
              onClick={toggleAudio}
              className="p-2 rounded-full bg-black/70 border border-white/20 text-white hover:bg-white/20 hover:scale-105 transition-all shadow-md"
              title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setIsPlaying(!isPlaying)
              }}
              className="p-2 rounded-full bg-black/70 border border-white/20 text-white hover:bg-white/20 hover:scale-105 transition-all shadow-md"
              title={isPlaying ? 'Pause Loop' : 'Play Loop'}
            >
              {isPlaying ? <Pause className="w-4 h-4 text-amber-400" /> : <Play className="w-4 h-4 text-emerald-400" />}
            </button>
          </div>
        </div>

        {/* Bottom Interactive Hint */}
        <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
          <div className="px-3.5 py-1.5 rounded-xl bg-black/70 border border-white/20 backdrop-blur-md text-xs font-bold text-gray-300 pointer-events-auto flex items-center gap-2">
            <Heart className="w-4 h-4 text-rose-500 animate-pulse" />
            <span>Click companions to train & cheer!</span>
            <span className="ml-2 px-2 py-0.5 rounded-md bg-white/10 text-amber-400 font-mono text-[10px]">
              +{cheerCount} Joy
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40">
            <Zap className="w-3.5 h-3.5" /> 60 FPS Engine
          </div>
        </div>
      </div>

      {/* Pokemon Go / Clash of Clans Style Stats Bar */}
      {showStats && (
        <div className="p-5 bg-gradient-to-r from-neutral-950 via-black to-neutral-950 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div 
            onClick={() => {
              gameAudio.playPet()
              setCheerCount((c) => c + 1)
            }}
            className="p-2.5 rounded-2xl bg-white/[0.03] border border-emerald-500/30 hover:border-emerald-400/60 transition-all cursor-pointer flex items-center gap-3 group"
          >
            <div className="relative w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/40 overflow-hidden flex-shrink-0 group-hover:scale-110 transition-transform">
              <Image 
                src="/spriggo-8bit.png" 
                alt="8-bit Mossling" 
                fill 
                className="object-cover pixelated"
                unoptimized
              />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider block">Mossling • 8-Bit</span>
              <span className="text-xs font-black text-white">Bloom Lvl 7</span>
            </div>
          </div>

          <div 
            onClick={() => {
              gameAudio.playPet()
              setCheerCount((c) => c + 1)
            }}
            className="p-2.5 rounded-2xl bg-white/[0.03] border border-orange-500/30 hover:border-orange-400/60 transition-all cursor-pointer flex items-center gap-3 group"
          >
            <div className="relative w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/40 overflow-hidden flex-shrink-0 group-hover:scale-110 transition-transform">
              <Image 
                src="/ignis-8bit.png" 
                alt="8-bit Ignis" 
                fill 
                className="object-cover pixelated"
                unoptimized
              />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-orange-400 tracking-wider block">Ignis • 8-Bit</span>
              <span className="text-xs font-black text-white">Blaze Lvl 5</span>
            </div>
          </div>

          <div 
            onClick={() => {
              gameAudio.playPet()
              setCheerCount((c) => c + 1)
            }}
            className="p-2.5 rounded-2xl bg-white/[0.03] border border-cyan-500/30 hover:border-cyan-400/60 transition-all cursor-pointer flex items-center gap-3 group"
          >
            <div className="relative w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/40 overflow-hidden flex-shrink-0 group-hover:scale-110 transition-transform">
              <Image 
                src="/aqualis-8bit.png" 
                alt="8-bit Aqualis" 
                fill 
                className="object-cover pixelated"
                unoptimized
              />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider block">Aqualis • 8-Bit</span>
              <span className="text-xs font-black text-white">Torrent Lvl 6</span>
            </div>
          </div>

          <div 
            onClick={() => {
              gameAudio.playPet()
              setCheerCount((c) => c + 1)
            }}
            className="p-2.5 rounded-2xl bg-white/[0.03] border border-amber-500/30 hover:border-amber-400/60 transition-all cursor-pointer flex items-center gap-3 group"
          >
            <div className="relative w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/40 overflow-hidden flex-shrink-0 group-hover:scale-110 transition-transform">
              <Image 
                src="/terran-8bit.png" 
                alt="8-bit Terran" 
                fill 
                className="object-cover pixelated"
                unoptimized
              />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider block">Terran • 8-Bit</span>
              <span className="text-xs font-black text-white">Mountain Lvl 8</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
