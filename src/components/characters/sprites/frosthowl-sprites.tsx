import React from 'react'
import { PixelSvg, BaseSpriteProps } from './sprite-base'

export function FrosthowlSprite({ stage = 1, size = 128, className = '' }: BaseSpriteProps & { stage?: number }) {
  switch (stage) {
    case 1:
      // Sprout: Baby Arctic Wolf Pup
      return (
        <PixelSvg size={size} className={className} viewBox="0 0 32 32">
          <ellipse cx="16" cy="29" rx="7" ry="2" fill="rgba(0,0,0,0.25)" />
          {/* Fluffy Tail */}
          <polygon points="21,21 26,17 24,24 20,23" fill="#93c5fd" />
          <circle cx="26" cy="18" r="1.5" fill="#f0f9ff" />
          {/* Paws */}
          <rect x="11" y="26" width="3" height="3" fill="#1e3a8a" />
          <rect x="18" y="26" width="3" height="3" fill="#1e3a8a" />
          {/* Body */}
          <rect x="12" y="18" width="8" height="9" fill="#93c5fd" />
          <rect x="13" y="19" width="6" height="7" fill="#bfdbfe" />
          <rect x="14" y="21" width="4" height="5" fill="#ffffff" />
          {/* Head */}
          <rect x="11" y="11" width="10" height="8" fill="#60a5fa" />
          <rect x="12" y="12" width="8" height="6" fill="#93c5fd" />
          {/* Ears */}
          <polygon points="10,11 9,6 13,10" fill="#3b82f6" />
          <polygon points="22,11 23,6 19,10" fill="#3b82f6" />
          {/* Eyes */}
          <rect x="13" y="13" width="2" height="3" fill="#0c4a6e" />
          <rect x="13" y="13" width="1" height="1" fill="#38bdf8" />
          <rect x="17" y="13" width="2" height="3" fill="#0c4a6e" />
          <rect x="17" y="13" width="1" height="1" fill="#38bdf8" />
          <rect x="15" y="16" width="2" height="2" fill="#1e293b" />
        </PixelSvg>
      )

    case 2:
      // Adept: Lean Snow Hunter Wolf with Icicle Cheeks
      return (
        <PixelSvg size={size} className={className} viewBox="0 0 32 32">
          <ellipse cx="16" cy="29" rx="9" ry="2.5" fill="rgba(0,0,0,0.25)" />
          {/* Ice Tail */}
          <path d="M21 21 Q27 18 29 13 Q25 16 21 23 Z" fill="#60a5fa" />
          <circle cx="28" cy="13" r="2" fill="#dbeafe" />
          {/* Body */}
          <rect x="10" y="24" width="3" height="5" fill="#1e3a8a" />
          <rect x="19" y="24" width="3" height="5" fill="#1e3a8a" />
          <rect x="11" y="16" width="10" height="9" fill="#3b82f6" />
          <rect x="12" y="17" width="8" height="7" fill="#60a5fa" />
          {/* Icicle Cheek Ruffs */}
          <polygon points="9,14 6,17 10,17" fill="#dbeafe" />
          <polygon points="23,14 26,17 22,17" fill="#dbeafe" />
          {/* Head & Ears */}
          <rect x="9" y="9" width="14" height="9" fill="#2563eb" />
          <rect x="10" y="10" width="12" height="7" fill="#60a5fa" />
          <polygon points="9,9 7,3 12,7" fill="#1d4ed8" />
          <polygon points="23,9 25,3 20,7" fill="#1d4ed8" />
          {/* Eyes */}
          <rect x="12" y="11" width="2" height="3" fill="#082f49" />
          <rect x="12" y="11" width="1" height="1" fill="#93c5fd" />
          <rect x="18" y="11" width="2" height="3" fill="#082f49" />
          <rect x="18" y="11" width="1" height="1" fill="#93c5fd" />
        </PixelSvg>
      )

    case 3:
      // Evolved: Glacial Wolf with Ice Horns & Frost Breath
      return (
        <PixelSvg size={size} className={className} viewBox="0 0 32 32">
          <ellipse cx="16" cy="29" rx="10" ry="3" fill="rgba(0,0,0,0.3)" />
          {/* Crystalline Tail */}
          <path d="M22 20 Q29 14 31 8 Q26 12 22 18 Z" fill="#2563eb" />
          <polygon points="29,8 31,4 32,9" fill="#bfdbfe" />
          {/* Armored Body */}
          <rect x="10" y="15" width="12" height="11" fill="#1e3a8a" />
          <rect x="11" y="16" width="10" height="9" fill="#3b82f6" />
          <polygon points="16,16 13,22 19,22" fill="#eff6ff" />
          {/* Ice Horns */}
          <polygon points="9,8 6,1 12,5" fill="#60a5fa" />
          <polygon points="23,8 26,1 20,5" fill="#60a5fa" />
          <polygon points="16,4 14,8 18,8" fill="#dbeafe" />
          {/* Head */}
          <rect x="8" y="8" width="16" height="9" fill="#1d4ed8" />
          <rect x="9" y="9" width="14" height="7" fill="#3b82f6" />
          {/* Frost Eyes */}
          <rect x="11" y="11" width="3" height="2" fill="#082f49" />
          <rect x="12" y="11" width="1" height="1" fill="#93c5fd" />
          <rect x="18" y="11" width="3" height="2" fill="#082f49" />
          <rect x="18" y="11" width="1" height="1" fill="#93c5fd" />
          {/* Paws */}
          <rect x="10" y="25" width="3" height="4" fill="#0f172a" />
          <rect x="19" y="25" width="3" height="4" fill="#0f172a" />
        </PixelSvg>
      )

    case 4:
      // Elite: Permafrost Alpha Wolf with Crystal Mantle
      return (
        <PixelSvg size={size} className={className} viewBox="0 0 32 32">
          <ellipse cx="16" cy="30" rx="12" ry="3" fill="rgba(0,0,0,0.35)" />
          {/* Massive Blizzard Tail */}
          <path d="M19 19 Q29 13 32 5 Q26 10 22 16 Z" fill="#1d4ed8" />
          <polygon points="30,6 32,1 28,5" fill="#ffffff" />
          {/* Heavy Glacial Body */}
          <rect x="9" y="14" width="14" height="12" fill="#0f172a" />
          <rect x="10" y="15" width="12" height="10" fill="#1e40af" />
          {/* Crystal Shoulders */}
          <polygon points="7,15 3,12 8,18" fill="#93c5fd" />
          <polygon points="25,15 29,12 24,18" fill="#93c5fd" />
          <circle cx="16" cy="19" r="3" fill="#ffffff" />
          {/* Crown of Ice */}
          <polygon points="16,1 12,7 20,7" fill="#dbeafe" />
          <polygon points="8,7 4,0 11,5" fill="#3b82f6" />
          <polygon points="24,7 28,0 21,5" fill="#3b82f6" />
          {/* Claws */}
          <rect x="9" y="25" width="4" height="4" fill="#020617" />
          <rect x="19" y="25" width="4" height="4" fill="#020617" />
          {/* Glowing Icy Eyes */}
          <rect x="11" y="10" width="3" height="2" fill="#60a5fa" />
          <rect x="12" y="10" width="1" height="1" fill="#ffffff" />
          <rect x="18" y="10" width="3" height="2" fill="#60a5fa" />
          <rect x="19" y="10" width="1" height="1" fill="#ffffff" />
        </PixelSvg>
      )

    case 5:
    default:
      // Legendary: Glacial Sovereign King with Diamond Ice Crown
      return (
        <PixelSvg size={size} className={className} viewBox="0 0 32 32">
          {/* Floating Ice Shards */}
          <polygon points="4,8 6,4 5,9" fill="#bfdbfe" />
          <polygon points="28,8 26,4 27,9" fill="#bfdbfe" />
          <polygon points="16,0 18,3 14,3" fill="#ffffff" />
          <ellipse cx="16" cy="30" rx="13" ry="3" fill="rgba(0,0,0,0.4)" />
          {/* Colossal Glacier Tails */}
          <path d="M16 18 Q31 14 32 3 Q27 8 22 16 Z" fill="#1d4ed8" />
          <path d="M17 19 Q31 9 30 0 Q25 6 21 15 Z" fill="#60a5fa" />
          <path d="M16 18 Q1 14 0 3 Q5 8 10 16 Z" fill="#1d4ed8" />
          <path d="M15 19 Q1 9 2 0 Q7 6 11 15 Z" fill="#60a5fa" />
          {/* Sovereign Fur & Diamond Armor */}
          <rect x="9" y="13" width="14" height="13" fill="#0f172a" />
          <rect x="10" y="14" width="12" height="11" fill="#1e3a8a" />
          <circle cx="16" cy="19" r="4" fill="#ffffff" stroke="#38bdf8" strokeWidth="1" />
          {/* Diamond Ice Crown */}
          <polygon points="16,0 12,6 20,6" fill="#ffffff" />
          <polygon points="10,3 7,7 12,7" fill="#60a5fa" />
          <polygon points="22,3 25,7 20,7" fill="#60a5fa" />
          <rect x="8" y="7" width="16" height="8" fill="#1e40af" />
          <rect x="9" y="8" width="14" height="6" fill="#3b82f6" />
          {/* Blinding Frost Eyes */}
          <rect x="11" y="9" width="3" height="2" fill="#ffffff" />
          <rect x="18" y="9" width="3" height="2" fill="#ffffff" />
          {/* Paws */}
          <rect x="9" y="25" width="4" height="4" fill="#1e293b" />
          <rect x="19" y="25" width="4" height="4" fill="#1e293b" />
        </PixelSvg>
      )
  }
}
