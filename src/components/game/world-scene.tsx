'use client'

import { useEffect, useState } from 'react'

export function WorldScene() {
  const [particles, setParticles] = useState<React.CSSProperties[]>([])

  useEffect(() => {
    // Generate particle styles on the client side only
    // This prevents Hydration Mismatch errors since Math.random() produces different results on SSR vs CSR.
    const generatedParticles = Array.from({ length: 15 }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDuration: `${3 + Math.random() * 4}s`,
      animationDelay: `${Math.random() * 2}s`,
      opacity: 0.2 + Math.random() * 0.5,
      boxShadow: '0 0 4px rgba(255,255,255,0.8)'
    }))
    setParticles(generatedParticles)
  }, [])

  return (
    <div className="relative w-full h-[220px] overflow-hidden bg-gradient-to-b from-[#b5e2f2] to-[#e8f4f8] border-b-4 border-[#e6d5b8] shadow-sm rounded-b-3xl -mt-16 pt-16">
      {/* Sun/Moon */}
      <div className="absolute top-8 left-1/4 w-16 h-16 bg-white/90 rounded-full blur-[2px] shadow-[0_0_40px_rgba(255,255,255,0.8)] animate-pulse"></div>

      {/* Clouds */}
      <div className="absolute top-10 left-0 right-0 h-full pointer-events-none opacity-60">
        <div className="absolute top-4 w-32 h-10 bg-white rounded-full blur-xl animate-cloud-drift" style={{ animationDuration: '45s' }}></div>
        <div className="absolute top-12 w-48 h-12 bg-white rounded-full blur-xl animate-cloud-drift" style={{ animationDuration: '60s', animationDelay: '-20s' }}></div>
        <div className="absolute top-2 w-24 h-8 bg-white rounded-full blur-xl animate-cloud-drift" style={{ animationDuration: '35s', animationDelay: '-10s' }}></div>
      </div>

      {/* Distant Mountains */}
      <div className="absolute bottom-0 left-0 right-0 h-24 flex items-end opacity-20">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full">
          <path d="M0,120 L0,60 L100,20 L250,80 L400,10 L600,70 L750,30 L900,90 L1050,40 L1200,80 L1200,120 Z" fill="#6ba7b5" />
        </svg>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 flex items-end opacity-30">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full">
          <path d="M0,120 L0,80 L150,40 L300,90 L450,30 L550,70 L700,20 L850,80 L1000,50 L1200,90 L1200,120 Z" fill="#528f9e" />
        </svg>
      </div>

      {/* Ground Line / Grass */}
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-[#c5d8a4] to-transparent"></div>

      {/* Floating Particles (Fireflies/Sparkles) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((style, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-float"
            style={style}
          ></div>
        ))}
      </div>
    </div>
  )
}
