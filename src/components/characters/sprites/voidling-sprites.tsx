import React from 'react'
import { PixelSvg, BaseSpriteProps } from './sprite-base'

export function VoidlingSprite({ stage = 1, size = 128, className = '' }: BaseSpriteProps & { stage?: number }) {
  switch (stage) {
    case 1:
      // Sprout: Floating Starry Nebula Droplet
      return (
        <PixelSvg size={size} className={className} viewBox="0 0 32 32">
          <ellipse cx="16" cy="29" rx="6" ry="2" fill="rgba(0,0,0,0.25)" />
          {/* Nebula Body */}
          <circle cx="16" cy="18" r="6" fill="#6d28d9" />
          <circle cx="16" cy="18" r="5" fill="#8b5cf6" />
          {/* Orbiting Starlight Spark */}
          <polygon points="10,12 8,14 10,16 12,14" fill="#a78bfa" />
          <polygon points="22,12 20,14 22,16 24,14" fill="#a78bfa" />
          {/* Cute Galaxy Eyes */}
          <rect x="13" y="16" width="2" height="3" fill="#2e1065" />
          <rect x="13" y="16" width="1" height="1" fill="#38bdf8" />
          <rect x="17" y="16" width="2" height="3" fill="#2e1065" />
          <rect x="17" y="16" width="1" height="1" fill="#38bdf8" />
        </PixelSvg>
      )

    case 2:
      // Adept: Cosmic Spirit with Planetary Ring Collar
      return (
        <PixelSvg size={size} className={className} viewBox="0 0 32 32">
          <ellipse cx="16" cy="29" rx="8" ry="2.5" fill="rgba(0,0,0,0.25)" />
          {/* Planetary Ring */}
          <ellipse cx="16" cy="17" rx="10" ry="3" fill="none" stroke="#a78bfa" strokeWidth="1.5" />
          {/* Cosmic Body */}
          <rect x="11" y="15" width="10" height="10" rx="3" fill="#5b21b6" />
          <rect x="12" y="16" width="8" height="8" rx="2" fill="#7c3aed" />
          {/* Floating Feet */}
          <circle cx="13" cy="26" r="1.5" fill="#c4b5fd" />
          <circle cx="19" cy="26" r="1.5" fill="#c4b5fd" />
          {/* Head */}
          <rect x="10" y="9" width="12" height="8" rx="2" fill="#6d28d9" />
          <rect x="11" y="10" width="10" height="6" fill="#8b5cf6" />
          {/* Starlight Frills */}
          <polygon points="8,9 5,6 10,8" fill="#c4b5fd" />
          <polygon points="24,9 27,6 22,8" fill="#c4b5fd" />
          {/* Eyes */}
          <rect x="12" y="11" width="2" height="3" fill="#22d3ee" />
          <rect x="18" y="11" width="2" height="3" fill="#22d3ee" />
        </PixelSvg>
      )

    case 3:
      // Evolved: Astralkin with Orbiting Mini Moons
      return (
        <PixelSvg size={size} className={className} viewBox="0 0 32 32">
          <ellipse cx="16" cy="29" rx="10" ry="3" fill="rgba(0,0,0,0.3)" />
          {/* Orbiting Moon Orbs */}
          <circle cx="4" cy="14" r="2" fill="#38bdf8" />
          <circle cx="28" cy="14" r="2" fill="#e879f9" />
          <ellipse cx="16" cy="17" rx="13" ry="4" fill="none" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="3 2" />
          {/* Astralkin Body */}
          <rect x="10" y="14" width="12" height="12" rx="3" fill="#4c1d95" />
          <rect x="11" y="15" width="10" height="10" rx="2" fill="#6d28d9" />
          <circle cx="16" cy="19" r="3" fill="#f43f5e" />
          <circle cx="16" cy="19" r="1.5" fill="#ffffff" />
          {/* Cosmic Head */}
          <rect x="9" y="8" width="14" height="8" rx="3" fill="#5b21b6" />
          <rect x="10" y="9" width="12" height="6" fill="#7c3aed" />
          {/* Stellar Antennae */}
          <line x1="12" y1="8" x2="8" y2="2" stroke="#a78bfa" strokeWidth="1.5" />
          <circle cx="8" cy="2" r="1.5" fill="#38bdf8" />
          <line x1="20" y1="8" x2="24" y2="2" stroke="#a78bfa" strokeWidth="1.5" />
          <circle cx="24" cy="2" r="1.5" fill="#38bdf8" />
          {/* Eyes */}
          <rect x="12" y="10" width="2" height="3" fill="#ffffff" />
          <rect x="18" y="10" width="2" height="3" fill="#ffffff" />
        </PixelSvg>
      )

    case 4:
      // Elite: Constellation Beast with Glowing Zodiac Lines
      return (
        <PixelSvg size={size} className={className} viewBox="0 0 32 32">
          <ellipse cx="16" cy="30" rx="12" ry="3" fill="rgba(0,0,0,0.35)" />
          {/* Zodiac Star Lines */}
          <path d="M4 12 L10 7 L16 3 L22 7 L28 12" stroke="#38bdf8" strokeWidth="1" fill="none" />
          <circle cx="4" cy="12" r="2" fill="#ffffff" />
          <circle cx="10" cy="7" r="2" fill="#ffffff" />
          <circle cx="16" cy="3" r="2.5" fill="#f43f5e" />
          <circle cx="22" cy="7" r="2" fill="#ffffff" />
          <circle cx="28" cy="12" r="2" fill="#ffffff" />
          {/* Cosmic Titan Body */}
          <rect x="9" y="13" width="14" height="13" fill="#2e1065" />
          <rect x="10" y="14" width="12" height="11" fill="#4c1d95" />
          <circle cx="16" cy="18" r="3.5" fill="#7c3aed" stroke="#38bdf8" strokeWidth="1" />
          {/* Head */}
          <rect x="8" y="7" width="16" height="8" fill="#3b0764" />
          <rect x="9" y="8" width="14" height="6" fill="#5b21b6" />
          {/* Cosmic Eyes */}
          <rect x="11" y="9" width="3" height="2" fill="#38bdf8" />
          <rect x="18" y="9" width="3" height="2" fill="#38bdf8" />
          {/* Legs */}
          <rect x="10" y="25" width="3" height="4" fill="#1e1b4b" />
          <rect x="19" y="25" width="3" height="4" fill="#1e1b4b" />
        </PixelSvg>
      )

    case 5:
    default:
      // Legendary: Cosmic Entity of Infinity with Spiral Galaxy Aura
      return (
        <PixelSvg size={size} className={className} viewBox="0 0 32 32">
          {/* Spiral Galaxy Ring Aura */}
          <circle cx="16" cy="15" r="14" fill="#4c1d95" opacity="0.35" />
          <circle cx="16" cy="15" r="13" fill="none" stroke="#c084fc" strokeWidth="1.5" strokeDasharray="4 2" />
          <circle cx="16" cy="15" r="10" fill="none" stroke="#38bdf8" strokeWidth="1" strokeDasharray="2 2" />
          <ellipse cx="16" cy="30" rx="13" ry="3" fill="rgba(0,0,0,0.4)" />
          {/* Infinite Celestial Wings */}
          <path d="M16 16 Q32 8 32 -1 Q25 6 21 14 Z" fill="#7c3aed" />
          <path d="M16 16 Q0 8 0 -1 Q7 6 11 14 Z" fill="#7c3aed" />
          {/* Infinite Cosmic Body */}
          <rect x="9" y="12" width="14" height="14" fill="#2e1065" />
          <rect x="10" y="13" width="12" height="12" fill="#4c1d95" />
          {/* Supermassive Core */}
          <circle cx="16" cy="18" r="4.5" fill="#f43f5e" />
          <circle cx="16" cy="18" r="2.5" fill="#ffffff" />
          {/* Infinity Crown */}
          <polygon points="16,0 12,5 20,5" fill="#ffffff" />
          <polygon points="9,2 7,6 12,6" fill="#38bdf8" />
          <polygon points="23,2 25,6 20,6" fill="#38bdf8" />
          <rect x="8" y="6" width="16" height="8" fill="#3b0764" />
          <rect x="9" y="7" width="14" height="6" fill="#5b21b6" />
          {/* Omniscient Eyes */}
          <rect x="11" y="8" width="3" height="2" fill="#ffffff" />
          <rect x="18" y="8" width="3" height="2" fill="#ffffff" />
          {/* Starlight Pillars */}
          <rect x="9" y="25" width="4" height="4" fill="#2e1065" />
          <rect x="19" y="25" width="4" height="4" fill="#2e1065" />
        </PixelSvg>
      )
  }
}
