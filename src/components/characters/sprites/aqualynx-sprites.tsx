import React from 'react'
import { PixelSvg, BaseSpriteProps } from './sprite-base'

export function AqualynxSprite({ stage = 1, size = 128, className = '' }: BaseSpriteProps & { stage?: number }) {
  switch (stage) {
    case 1:
      // Sprout: Cute water kitten with droplet tail
      return (
        <PixelSvg size={size} className={className} viewBox="0 0 32 32">
          <ellipse cx="16" cy="29" rx="7" ry="2" fill="rgba(0,0,0,0.25)" />
          {/* Water Droplet Tail */}
          <circle cx="24" cy="18" r="3" fill="#06b6d4" />
          <polygon points="24,14 22,17 26,17" fill="#22d3ee" />
          <circle cx="23" cy="17" r="1" fill="#ffffff" />
          {/* Back Paws */}
          <rect x="11" y="26" width="3" height="3" fill="#0e7490" />
          <rect x="18" y="26" width="3" height="3" fill="#0e7490" />
          {/* Body */}
          <rect x="12" y="18" width="8" height="9" fill="#06b6d4" />
          <rect x="13" y="19" width="6" height="7" fill="#22d3ee" />
          <rect x="14" y="21" width="4" height="5" fill="#e0f2fe" />
          {/* Front Paws */}
          <rect x="13" y="27" width="2" height="2" fill="#155e75" />
          <rect x="17" y="27" width="2" height="2" fill="#155e75" />
          {/* Head */}
          <rect x="11" y="11" width="10" height="8" fill="#0891b2" />
          <rect x="12" y="12" width="8" height="6" fill="#06b6d4" />
          {/* Cheeks */}
          <rect x="10" y="15" width="2" height="3" fill="#e0f2fe" />
          <rect x="20" y="15" width="2" height="3" fill="#e0f2fe" />
          {/* Eyes */}
          <rect x="13" y="13" width="2" height="3" fill="#082f49" />
          <rect x="13" y="13" width="1" height="1" fill="#ffffff" />
          <rect x="17" y="13" width="2" height="3" fill="#082f49" />
          <rect x="17" y="13" width="1" height="1" fill="#ffffff" />
          {/* Lynx Tuft Ears */}
          <polygon points="11,11 12,6 14,10" fill="#0891b2" />
          <rect x="12" y="5" width="1" height="2" fill="#0284c7" />
          <polygon points="21,11 20,6 18,10" fill="#0891b2" />
          <rect x="19" y="5" width="1" height="2" fill="#0284c7" />
        </PixelSvg>
      )

    case 2:
      // Adept: Streamlined aquatic lynx with wave fins
      return (
        <PixelSvg size={size} className={className} viewBox="0 0 32 32">
          <ellipse cx="16" cy="29" rx="9" ry="2.5" fill="rgba(0,0,0,0.25)" />
          {/* Wave Tail */}
          <path d="M21 21 C24 19 26 15 28 12 C26 13 24 16 22 18 Z" fill="#0891b2" />
          <circle cx="28" cy="11" r="2.5" fill="#38bdf8" />
          <circle cx="27" cy="10" r="1" fill="#ffffff" />
          {/* Legs & Body */}
          <rect x="10" y="24" width="3" height="5" fill="#0e7490" />
          <rect x="19" y="24" width="3" height="5" fill="#0e7490" />
          <rect x="11" y="16" width="10" height="9" fill="#0891b2" />
          <rect x="12" y="17" width="8" height="7" fill="#06b6d4" />
          <rect x="14" y="18" width="4" height="6" fill="#e0f2fe" />
          {/* Dorsal Fin */}
          <polygon points="16,14 17,11 18,15" fill="#38bdf8" />
          {/* Head */}
          <rect x="9" y="9" width="14" height="9" fill="#0e7490" />
          <rect x="10" y="10" width="12" height="7" fill="#06b6d4" />
          {/* Whiskers */}
          <rect x="8" y="15" width="2" height="1" fill="#38bdf8" />
          <rect x="22" y="15" width="2" height="1" fill="#38bdf8" />
          {/* Eyes */}
          <rect x="12" y="11" width="2" height="3" fill="#0c4a6e" />
          <rect x="12" y="11" width="1" height="1" fill="#38bdf8" />
          <rect x="18" y="11" width="2" height="3" fill="#0c4a6e" />
          <rect x="18" y="11" width="1" height="1" fill="#38bdf8" />
          {/* Extended Tufted Ears */}
          <polygon points="9,9 10,3 12,8" fill="#0284c7" />
          <polygon points="23,9 22,3 20,8" fill="#0284c7" />
        </PixelSvg>
      )

    case 3:
      // Evolved: Wave-Crested Sea Hunter with Tidal Pearl
      return (
        <PixelSvg size={size} className={className} viewBox="0 0 32 32">
          <ellipse cx="16" cy="29" rx="10" ry="3" fill="rgba(0,0,0,0.3)" />
          {/* Dual Wave Tails */}
          <path d="M22 21 Q28 16 30 10 Q26 13 22 17 Z" fill="#0284c7" />
          <path d="M20 22 Q27 18 28 13 Q25 15 21 19 Z" fill="#38bdf8" />
          <circle cx="30" cy="9" r="2" fill="#bae6fd" />
          {/* Body & Scaled Armor */}
          <rect x="10" y="15" width="12" height="11" fill="#0369a1" />
          <rect x="11" y="16" width="10" height="9" fill="#0284c7" />
          <circle cx="16" cy="20" r="2.5" fill="#f0f9ff" stroke="#38bdf8" />
          {/* Wave Shoulders */}
          <path d="M8 17 Q6 15 8 13 Q10 15 9 18 Z" fill="#38bdf8" />
          <path d="M24 17 Q26 15 24 13 Q22 15 23 18 Z" fill="#38bdf8" />
          {/* Paws */}
          <rect x="10" y="25" width="3" height="4" fill="#075985" />
          <rect x="19" y="25" width="3" height="4" fill="#075985" />
          {/* Head & Crown Tuft */}
          <rect x="8" y="8" width="16" height="9" fill="#0369a1" />
          <rect x="9" y="9" width="14" height="7" fill="#0284c7" />
          <polygon points="8,8 6,2 11,6" fill="#0ea5e9" />
          <polygon points="24,8 26,2 21,6" fill="#0ea5e9" />
          <circle cx="16" cy="6" r="2" fill="#7dd3fc" />
          {/* Deep Ocean Eyes */}
          <rect x="11" y="11" width="3" height="2" fill="#082f49" />
          <rect x="12" y="11" width="1" height="1" fill="#38bdf8" />
          <rect x="18" y="11" width="3" height="2" fill="#082f49" />
          <rect x="18" y="11" width="1" height="1" fill="#38bdf8" />
        </PixelSvg>
      )

    case 4:
      // Elite: Torrential Wave Lynx with Abyssal Claws
      return (
        <PixelSvg size={size} className={className} viewBox="0 0 32 32">
          <ellipse cx="16" cy="30" rx="12" ry="3" fill="rgba(0,0,0,0.35)" />
          {/* Triple Sprawling Torrent Tails */}
          <path d="M19 19 Q29 14 31 6 Q25 10 22 16 Z" fill="#0369a1" />
          <path d="M21 20 Q31 16 32 9 Q27 12 23 17 Z" fill="#0284c7" />
          <path d="M18 21 Q27 20 29 14 Q24 16 20 19 Z" fill="#38bdf8" />
          {/* Heavy Armored Body */}
          <rect x="9" y="14" width="14" height="12" fill="#082f49" />
          <rect x="10" y="15" width="12" height="10" fill="#0369a1" />
          <circle cx="16" cy="19" r="3" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="1" />
          {/* Wave Armor Flanks */}
          <polygon points="7,17 5,12 10,15" fill="#38bdf8" />
          <polygon points="25,17 27,12 22,15" fill="#38bdf8" />
          {/* Claws */}
          <rect x="9" y="25" width="4" height="4" fill="#0c4a6e" />
          <rect x="19" y="25" width="4" height="4" fill="#0c4a6e" />
          {/* Head & Fins */}
          <rect x="8" y="7" width="16" height="9" fill="#075985" />
          <rect x="9" y="8" width="14" height="7" fill="#0284c7" />
          <polygon points="8,7 4,1 11,5" fill="#0ea5e9" />
          <polygon points="24,7 28,1 21,5" fill="#0ea5e9" />
          <circle cx="16" cy="4" r="2.5" fill="#38bdf8" />
          {/* Glowing Eyes */}
          <rect x="11" y="10" width="3" height="2" fill="#7dd3fc" />
          <rect x="12" y="10" width="1" height="1" fill="#ffffff" />
          <rect x="18" y="10" width="3" height="2" fill="#7dd3fc" />
          <rect x="19" y="10" width="1" height="1" fill="#ffffff" />
        </PixelSvg>
      )

    case 5:
    default:
      // Legendary: Abyssal Sovereign Lynx with Orbiting Tidal Spheres
      return (
        <PixelSvg size={size} className={className} viewBox="0 0 32 32">
          {/* Orbiting Water Orbs */}
          <circle cx="6" cy="9" r="2.5" fill="#38bdf8" opacity="0.8" />
          <circle cx="26" cy="9" r="2.5" fill="#38bdf8" opacity="0.8" />
          <circle cx="16" cy="2" r="3" fill="#7dd3fc" opacity="0.9" />
          <circle cx="16" cy="2" r="1.5" fill="#ffffff" />
          <ellipse cx="16" cy="30" rx="13" ry="3" fill="rgba(0,0,0,0.4)" />
          {/* Giant Leviathan Wave Tails */}
          <path d="M16 18 Q31 15 32 4 Q27 8 22 16 Z" fill="#0284c7" />
          <path d="M17 19 Q31 10 30 1 Q25 7 21 15 Z" fill="#0ea5e9" />
          <path d="M16 18 Q1 15 0 4 Q5 8 10 16 Z" fill="#0284c7" />
          <path d="M15 19 Q1 10 2 1 Q7 7 11 15 Z" fill="#0ea5e9" />
          {/* Abyssal Body & Ocean Crystal Core */}
          <rect x="9" y="13" width="14" height="13" fill="#082f49" />
          <rect x="10" y="14" width="12" height="11" fill="#0369a1" />
          <circle cx="16" cy="20" r="4" fill="#bae6fd" stroke="#0ea5e9" />
          <circle cx="16" cy="20" r="2" fill="#ffffff" />
          {/* Regal Crown & Antler Fins */}
          <polygon points="16,3 13,8 19,8" fill="#ffffff" />
          <polygon points="10,5 9,9 13,9" fill="#38bdf8" />
          <polygon points="22,5 23,9 19,9" fill="#38bdf8" />
          <rect x="8" y="7" width="16" height="8" fill="#075985" />
          <rect x="9" y="8" width="14" height="6" fill="#0284c7" />
          {/* Glowing Eyes */}
          <rect x="11" y="9" width="3" height="2" fill="#ffffff" />
          <rect x="18" y="9" width="3" height="2" fill="#ffffff" />
          <rect x="10" y="10" width="1" height="1" fill="#38bdf8" />
          <rect x="21" y="10" width="1" height="1" fill="#38bdf8" />
          {/* Paws */}
          <rect x="9" y="25" width="4" height="4" fill="#0e7490" />
          <rect x="19" y="25" width="4" height="4" fill="#0e7490" />
        </PixelSvg>
      )
  }
}
