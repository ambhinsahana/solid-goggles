import React from 'react'
import { PixelSvg, BaseSpriteProps } from './sprite-base'

export function ZephyrosSprite({ stage = 1, size = 128, className = '' }: BaseSpriteProps & { stage?: number }) {
  switch (stage) {
    case 1:
      // Sprout: Fluffy baby gale falcon chick
      return (
        <PixelSvg size={size} className={className} viewBox="0 0 32 32">
          <ellipse cx="16" cy="29" rx="7" ry="2" fill="rgba(0,0,0,0.25)" />
          {/* Baby Wings */}
          <rect x="9" y="17" width="3" height="5" fill="#38bdf8" />
          <rect x="20" y="17" width="3" height="5" fill="#38bdf8" />
          {/* Fluffy Cloud Body */}
          <circle cx="16" cy="20" r="6" fill="#7dd3fc" />
          <circle cx="16" cy="21" r="4" fill="#f0f9ff" />
          {/* Tiny Talons */}
          <rect x="13" y="26" width="2" height="3" fill="#f59e0b" />
          <rect x="17" y="26" width="2" height="3" fill="#f59e0b" />
          {/* Head Tuft */}
          <polygon points="16,10 15,6 18,9" fill="#0284c7" />
          {/* Big Cute Eyes */}
          <rect x="13" y="17" width="2" height="2" fill="#0369a1" />
          <rect x="13" y="17" width="1" height="1" fill="#ffffff" />
          <rect x="17" y="17" width="2" height="2" fill="#0369a1" />
          <rect x="17" y="17" width="1" height="1" fill="#ffffff" />
          {/* Tiny Beak */}
          <polygon points="16,19 15,21 17,21" fill="#f59e0b" />
        </PixelSvg>
      )

    case 2:
      // Adept: Swift Wind Scout Falcon
      return (
        <PixelSvg size={size} className={className} viewBox="0 0 32 32">
          <ellipse cx="16" cy="29" rx="8" ry="2.5" fill="rgba(0,0,0,0.25)" />
          {/* Aerodynamic Wings */}
          <path d="M12 16 L4 10 L8 20 Z" fill="#0284c7" />
          <path d="M20 16 L28 10 L24 20 Z" fill="#0284c7" />
          {/* Tail Feathers */}
          <polygon points="16,24 14,28 18,28" fill="#0369a1" />
          {/* Torso */}
          <rect x="12" y="14" width="8" height="11" fill="#0284c7" />
          <rect x="13" y="15" width="6" height="9" fill="#38bdf8" />
          <rect x="14" y="17" width="4" height="6" fill="#f0f9ff" />
          {/* Talons */}
          <rect x="12" y="25" width="3" height="4" fill="#d97706" />
          <rect x="17" y="25" width="3" height="4" fill="#d97706" />
          {/* Head & Crest */}
          <polygon points="16,6 13,11 19,11" fill="#0369a1" />
          <polygon points="16,3 15,7 18,7" fill="#38bdf8" />
          <rect x="12" y="10" width="8" height="6" fill="#0284c7" />
          {/* Sharp Eyes */}
          <rect x="13" y="11" width="2" height="2" fill="#f59e0b" />
          <rect x="17" y="11" width="2" height="2" fill="#f59e0b" />
          {/* Beak */}
          <polygon points="16,13 14,16 18,16" fill="#f59e0b" />
        </PixelSvg>
      )

    case 3:
      // Evolved: Razor Gale Raptor with Cloud Mantle
      return (
        <PixelSvg size={size} className={className} viewBox="0 0 32 32">
          <ellipse cx="16" cy="29" rx="10" ry="3" fill="rgba(0,0,0,0.3)" />
          {/* Bladed Wings */}
          <path d="M11 15 L1 8 L7 22 Z" fill="#0369a1" />
          <path d="M10 16 L3 11 L7 20 Z" fill="#38bdf8" />
          <path d="M21 15 L31 8 L25 22 Z" fill="#0369a1" />
          <path d="M22 16 L29 11 L25 20 Z" fill="#38bdf8" />
          {/* Sturdy Body */}
          <rect x="11" y="13" width="10" height="12" fill="#0369a1" />
          <rect x="12" y="14" width="8" height="10" fill="#0284c7" />
          <circle cx="16" cy="18" r="2.5" fill="#f0f9ff" />
          {/* Feather Crest */}
          <polygon points="16,1 12,8 20,8" fill="#0ea5e9" />
          <polygon points="16,4 14,8 18,8" fill="#ffffff" />
          {/* Talons */}
          <rect x="11" y="25" width="4" height="4" fill="#b45309" />
          <rect x="17" y="25" width="4" height="4" fill="#b45309" />
          {/* Sharp Beak & Eyes */}
          <rect x="13" y="10" width="2" height="2" fill="#fef08a" />
          <rect x="17" y="10" width="2" height="2" fill="#fef08a" />
          <polygon points="16,11 14,15 18,15" fill="#f59e0b" />
        </PixelSvg>
      )

    case 4:
      // Elite: Thunder-Cloud Eagle with Silver Wind-Helm
      return (
        <PixelSvg size={size} className={className} viewBox="0 0 32 32">
          <ellipse cx="16" cy="30" rx="12" ry="3" fill="rgba(0,0,0,0.35)" />
          {/* Four-Winged Spread */}
          <path d="M10 14 L0 4 L5 16 Z" fill="#0369a1" />
          <path d="M11 16 L1 14 L7 23 Z" fill="#0284c7" />
          <path d="M22 14 L32 4 L27 16 Z" fill="#0369a1" />
          <path d="M21 16 L31 14 L25 23 Z" fill="#0284c7" />
          {/* Armored Raptor Body */}
          <rect x="10" y="12" width="12" height="14" fill="#082f49" />
          <rect x="11" y="13" width="10" height="12" fill="#0284c7" />
          <polygon points="16,15 13,21 19,21" fill="#e0f2fe" />
          {/* Wind Helm */}
          <polygon points="16,2 11,8 21,8" fill="#94a3b8" />
          <polygon points="16,0 14,5 18,5" fill="#38bdf8" />
          {/* Golden Talons */}
          <rect x="10" y="26" width="4" height="4" fill="#d97706" />
          <rect x="18" y="26" width="4" height="4" fill="#d97706" />
          {/* Eyes */}
          <rect x="12" y="9" width="3" height="2" fill="#38bdf8" />
          <rect x="17" y="9" width="3" height="2" fill="#38bdf8" />
        </PixelSvg>
      )

    case 5:
    default:
      // Legendary: Lord of the Tempest with Hurricane Mantle
      return (
        <PixelSvg size={size} className={className} viewBox="0 0 32 32">
          {/* Cyclone Swirl Ring */}
          <circle cx="16" cy="15" r="14" fill="none" stroke="#7dd3fc" strokeWidth="1.5" strokeDasharray="4 2" opacity="0.6" />
          <ellipse cx="16" cy="30" rx="13" ry="3" fill="rgba(0,0,0,0.4)" />
          {/* Mythic Sky Wings */}
          <path d="M9 13 Q-3 0 0 -2 Q5 7 8 18 Z" fill="#0284c7" />
          <path d="M10 15 Q-1 8 2 2 Q7 10 9 20 Z" fill="#38bdf8" />
          <path d="M23 13 Q35 0 32 -2 Q27 7 24 18 Z" fill="#0284c7" />
          <path d="M22 15 Q33 8 30 2 Q25 10 23 20 Z" fill="#38bdf8" />
          {/* Tempest Body & Core Eye */}
          <rect x="9" y="11" width="14" height="15" fill="#082f49" />
          <rect x="10" y="12" width="12" height="13" fill="#0284c7" />
          <circle cx="16" cy="18" r="4" fill="#f0f9ff" stroke="#38bdf8" strokeWidth="1" />
          <circle cx="16" cy="18" r="2" fill="#0284c7" />
          {/* Storm Crown */}
          <polygon points="16,0 12,6 20,6" fill="#ffffff" />
          <polygon points="16,3 10,7 22,7" fill="#38bdf8" />
          {/* Mythic Talons */}
          <rect x="9" y="26" width="4" height="4" fill="#f59e0b" />
          <rect x="19" y="26" width="4" height="4" fill="#f59e0b" />
          {/* Blinding Starlight Eyes */}
          <rect x="11" y="8" width="3" height="2" fill="#ffffff" />
          <rect x="18" y="8" width="3" height="2" fill="#ffffff" />
        </PixelSvg>
      )
  }
}
