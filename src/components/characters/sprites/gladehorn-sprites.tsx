import React from 'react'
import { PixelSvg, BaseSpriteProps } from './sprite-base'

export function GladehornSprite({ stage = 1, size = 128, className = '' }: BaseSpriteProps & { stage?: number }) {
  switch (stage) {
    case 1:
      // Sprout: Spotted Fawn with budding horns
      return (
        <PixelSvg size={size} className={className} viewBox="0 0 32 32">
          <ellipse cx="16" cy="29" rx="7" ry="2" fill="rgba(0,0,0,0.25)" />
          {/* Fawn Body */}
          <rect x="11" y="17" width="10" height="9" fill="#059669" />
          <rect x="12" y="18" width="8" height="7" fill="#10b981" />
          {/* Fawn Spots */}
          <circle cx="14" cy="19" r="1" fill="#ecfdf5" />
          <circle cx="17" cy="21" r="1" fill="#ecfdf5" />
          {/* Slender Hooves */}
          <rect x="12" y="25" width="2" height="4" fill="#064e3b" />
          <rect x="18" y="25" width="2" height="4" fill="#064e3b" />
          {/* Head & Bud Horns */}
          <rect x="11" y="11" width="10" height="7" fill="#047857" />
          <rect x="12" y="12" width="8" height="5" fill="#10b981" />
          <circle cx="13" cy="9" r="1.5" fill="#facc15" />
          <circle cx="19" cy="9" r="1.5" fill="#facc15" />
          {/* Gentle Eyes */}
          <rect x="13" y="13" width="2" height="2" fill="#064e3b" />
          <rect x="13" y="13" width="1" height="1" fill="#ffffff" />
          <rect x="17" y="13" width="2" height="2" fill="#064e3b" />
          <rect x="17" y="13" width="1" height="1" fill="#ffffff" />
        </PixelSvg>
      )

    case 2:
      // Adept: Young Stag with velvet antlers
      return (
        <PixelSvg size={size} className={className} viewBox="0 0 32 32">
          <ellipse cx="16" cy="29" rx="8" ry="2.5" fill="rgba(0,0,0,0.25)" />
          {/* Stag Body */}
          <rect x="10" y="16" width="12" height="9" fill="#047857" />
          <rect x="11" y="17" width="10" height="7" fill="#10b981" />
          <circle cx="16" cy="20" r="2" fill="#a7f3d0" />
          {/* Legs */}
          <rect x="11" y="24" width="2" height="5" fill="#064e3b" />
          <rect x="19" y="24" width="2" height="5" fill="#064e3b" />
          {/* Velvet Branching Antlers */}
          <path d="M13 10 L10 5 L8 6" stroke="#047857" strokeWidth="1.5" />
          <path d="M19 10 L22 5 L24 6" stroke="#047857" strokeWidth="1.5" />
          {/* Head */}
          <rect x="10" y="10" width="12" height="7" fill="#047857" />
          <rect x="11" y="11" width="10" height="5" fill="#10b981" />
          {/* Eyes */}
          <rect x="12" y="12" width="2" height="2" fill="#fef08a" />
          <rect x="18" y="12" width="2" height="2" fill="#fef08a" />
        </PixelSvg>
      )

    case 3:
      // Evolved: Noble Forest Monarch with Glowing Green Antler Lanterns
      return (
        <PixelSvg size={size} className={className} viewBox="0 0 32 32">
          <ellipse cx="16" cy="29" rx="10" ry="3" fill="rgba(0,0,0,0.3)" />
          {/* Antlers with Lantern Orbs */}
          <path d="M13 9 L8 2 L6 4 M8 2 L11 1" stroke="#047857" strokeWidth="1.5" />
          <circle cx="6" cy="4" r="2" fill="#4ade80" />
          <path d="M19 9 L24 2 L26 4 M24 2 L21 1" stroke="#047857" strokeWidth="1.5" />
          <circle cx="26" cy="4" r="2" fill="#4ade80" />
          {/* Noble Stag Body */}
          <rect x="10" y="14" width="12" height="11" fill="#065f46" />
          <rect x="11" y="15" width="10" height="9" fill="#059669" />
          <circle cx="16" cy="19" r="3" fill="#6ee7b7" />
          {/* Legs */}
          <rect x="11" y="24" width="3" height="5" fill="#064e3b" />
          <rect x="18" y="24" width="3" height="5" fill="#064e3b" />
          {/* Head */}
          <rect x="9" y="9" width="14" height="7" fill="#065f46" />
          <rect x="10" y="10" width="12" height="5" fill="#10b981" />
          {/* Eyes */}
          <rect x="11" y="11" width="3" height="2" fill="#ecfdf5" />
          <rect x="18" y="11" width="3" height="2" fill="#ecfdf5" />
        </PixelSvg>
      )

    case 4:
      // Elite: High Forest Lord with Sprawling Antlers
      return (
        <PixelSvg size={size} className={className} viewBox="0 0 32 32">
          <ellipse cx="16" cy="30" rx="12" ry="3" fill="rgba(0,0,0,0.35)" />
          {/* Sprawling Crystalline Antlers */}
          <path d="M13 8 L6 1 L2 4 M6 1 L9 0" stroke="#064e3b" strokeWidth="2" />
          <circle cx="2" cy="4" r="2.5" fill="#facc15" />
          <path d="M19 8 L26 1 L30 4 M26 1 L23 0" stroke="#064e3b" strokeWidth="2" />
          <circle cx="30" cy="4" r="2.5" fill="#facc15" />
          {/* Lord Body */}
          <rect x="9" y="13" width="14" height="12" fill="#064e3b" />
          <rect x="10" y="14" width="12" height="10" fill="#047857" />
          <circle cx="16" cy="18" r="3.5" fill="#a7f3d0" />
          <circle cx="16" cy="18" r="1.5" fill="#ffffff" />
          {/* Hooves */}
          <rect x="10" y="24" width="3" height="6" fill="#022c22" />
          <rect x="19" y="24" width="3" height="6" fill="#022c22" />
          {/* Head */}
          <rect x="8" y="7" width="16" height="8" fill="#064e3b" />
          <rect x="9" y="8" width="14" height="6" fill="#059669" />
          {/* Glowing Eyes */}
          <rect x="11" y="9" width="3" height="2" fill="#ffffff" />
          <rect x="18" y="9" width="3" height="2" fill="#ffffff" />
        </PixelSvg>
      )

    case 5:
    default:
      // Legendary: Celestial Great Stag with Astral Antlers
      return (
        <PixelSvg size={size} className={className} viewBox="0 0 32 32">
          {/* Golden Forest Halo */}
          <circle cx="16" cy="15" r="14" fill="#10b981" opacity="0.3" />
          <ellipse cx="16" cy="30" rx="13" ry="3" fill="rgba(0,0,0,0.4)" />
          {/* Giant Astral Golden Antlers */}
          <path d="M12 7 Q3 0 0 -2 M12 7 Q6 2 2 8" stroke="#facc15" strokeWidth="2" fill="none" />
          <path d="M20 7 Q29 0 32 -2 M20 7 Q26 2 30 8" stroke="#facc15" strokeWidth="2" fill="none" />
          <circle cx="0" cy="-2" r="2.5" fill="#ffffff" />
          <circle cx="32" cy="-2" r="2.5" fill="#ffffff" />
          {/* Sovereign Stag Body */}
          <rect x="9" y="12" width="14" height="13" fill="#022c22" />
          <rect x="10" y="13" width="12" height="11" fill="#065f46" />
          <circle cx="16" cy="18" r="4.5" fill="#34d399" />
          <circle cx="16" cy="18" r="2" fill="#ffffff" />
          {/* Head & Celestial Crown */}
          <polygon points="16,0 13,5 19,5" fill="#facc15" />
          <rect x="8" y="6" width="16" height="8" fill="#064e3b" />
          <rect x="9" y="7" width="14" height="6" fill="#059669" />
          {/* Holy Light Eyes */}
          <rect x="11" y="8" width="3" height="2" fill="#ffffff" />
          <rect x="18" y="8" width="3" height="2" fill="#ffffff" />
          {/* Hooves */}
          <rect x="10" y="24" width="3" height="6" fill="#facc15" />
          <rect x="19" y="24" width="3" height="6" fill="#facc15" />
        </PixelSvg>
      )
  }
}
