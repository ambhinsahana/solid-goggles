import React from 'react'
import { PixelSvg, BaseSpriteProps } from './sprite-base'

export function MosslingSprite({ stage = 1, size = 128, className = '' }: BaseSpriteProps & { stage?: number }) {
  switch (stage) {
    case 1:
      // Sprout: Baby Acorn Golem with single leaf sprout
      return (
        <PixelSvg size={size} className={className} viewBox="0 0 32 32">
          <ellipse cx="16" cy="29" rx="7" ry="2" fill="rgba(0,0,0,0.25)" />
          {/* Head Leaf Sprout */}
          <path d="M16 11 Q17 7 20 6 Q19 10 16 11 Z" fill="#22c55e" />
          <path d="M16 11 Q14 8 12 7 Q14 10 16 11 Z" fill="#4ade80" />
          {/* Round Wooden Body */}
          <rect x="11" y="14" width="10" height="12" rx="2" fill="#78350f" />
          <rect x="12" y="15" width="8" height="10" fill="#92400e" />
          {/* Moss Patch on Chest */}
          <rect x="13" y="18" width="6" height="6" fill="#16a34a" />
          <rect x="14" y="19" width="4" height="4" fill="#22c55e" />
          {/* Wooden Feet */}
          <rect x="12" y="26" width="3" height="3" fill="#451a03" />
          <rect x="17" y="26" width="3" height="3" fill="#451a03" />
          {/* Glowing Green Seed Eyes */}
          <rect x="13" y="16" width="2" height="2" fill="#4ade80" />
          <rect x="14" y="16" width="1" height="1" fill="#ffffff" />
          <rect x="17" y="16" width="2" height="2" fill="#4ade80" />
          <rect x="18" y="16" width="1" height="1" fill="#ffffff" />
        </PixelSvg>
      )

    case 2:
      // Adept: Bark Guardian with vine arms & leaf ruff
      return (
        <PixelSvg size={size} className={className} viewBox="0 0 32 32">
          <ellipse cx="16" cy="29" rx="9" ry="2.5" fill="rgba(0,0,0,0.25)" />
          {/* Twin Leaf Horns */}
          <path d="M13 9 Q10 4 8 3 Q11 7 13 9 Z" fill="#16a34a" />
          <path d="M19 9 Q22 4 24 3 Q21 7 19 9 Z" fill="#22c55e" />
          {/* Vine Arms */}
          <rect x="7" y="17" width="3" height="7" fill="#15803d" />
          <rect x="22" y="17" width="3" height="7" fill="#15803d" />
          {/* Bark Torso */}
          <rect x="10" y="13" width="12" height="13" fill="#78350f" />
          <rect x="11" y="14" width="10" height="11" fill="#92400e" />
          {/* Moss Chest Mantle */}
          <rect x="12" y="16" width="8" height="6" fill="#16a34a" />
          <circle cx="16" cy="19" r="2" fill="#4ade80" />
          {/* Feet */}
          <rect x="11" y="26" width="4" height="3" fill="#451a03" />
          <rect x="17" y="26" width="4" height="3" fill="#451a03" />
          {/* Glowing Eyes */}
          <rect x="13" y="14" width="2" height="2" fill="#86efac" />
          <rect x="17" y="14" width="2" height="2" fill="#86efac" />
        </PixelSvg>
      )

    case 3:
      // Evolved: Blooming Treant with Branch Antlers
      return (
        <PixelSvg size={size} className={className} viewBox="0 0 32 32">
          <ellipse cx="16" cy="29" rx="10" ry="3" fill="rgba(0,0,0,0.3)" />
          {/* Branch Antlers with Pink Blooms */}
          <path d="M12 9 L8 3 L6 4 L10 8 Z" fill="#78350f" />
          <circle cx="7" cy="3" r="2" fill="#f472b6" />
          <path d="M20 9 L24 3 L26 4 L22 8 Z" fill="#78350f" />
          <circle cx="25" cy="3" r="2" fill="#f472b6" />
          {/* Heavy Bark Body */}
          <rect x="9" y="12" width="14" height="14" fill="#78350f" />
          <rect x="10" y="13" width="12" height="12" fill="#92400e" />
          <rect x="11" y="16" width="10" height="7" fill="#15803d" />
          <circle cx="16" cy="19" r="3" fill="#22c55e" />
          {/* Stone Runes */}
          <rect x="8" y="15" width="3" height="7" fill="#451a03" />
          <rect x="21" y="15" width="3" height="7" fill="#451a03" />
          <rect x="10" y="26" width="4" height="3" fill="#451a03" />
          <rect x="18" y="26" width="4" height="3" fill="#451a03" />
          {/* Amber Tree Sap Eyes */}
          <rect x="12" y="14" width="3" height="2" fill="#fef08a" />
          <rect x="17" y="14" width="3" height="2" fill="#fef08a" />
        </PixelSvg>
      )

    case 4:
      // Elite: Ancient Forest Warden with Blossom Armor
      return (
        <PixelSvg size={size} className={className} viewBox="0 0 32 32">
          <ellipse cx="16" cy="30" rx="12" ry="3" fill="rgba(0,0,0,0.35)" />
          {/* Great Sprawling Canopy Horns */}
          <path d="M12 8 L6 2 L3 4 L8 8 Z" fill="#78350f" />
          <circle cx="5" cy="2" r="2.5" fill="#ec4899" />
          <circle cx="8" cy="4" r="2" fill="#4ade80" />
          <path d="M20 8 L26 2 L29 4 L24 8 Z" fill="#78350f" />
          <circle cx="27" cy="2" r="2.5" fill="#ec4899" />
          <circle cx="24" cy="4" r="2" fill="#4ade80" />
          {/* Colossal Wooden Armor */}
          <rect x="8" y="11" width="16" height="15" fill="#451a03" />
          <rect x="9" y="12" width="14" height="13" fill="#78350f" />
          <rect x="11" y="15" width="10" height="8" fill="#166534" />
          <circle cx="16" cy="18" r="3.5" fill="#22c55e" />
          <circle cx="16" cy="18" r="1.5" fill="#bbf7d0" />
          {/* Root Gauntlets */}
          <rect x="5" y="14" width="4" height="9" fill="#92400e" />
          <rect x="23" y="14" width="4" height="9" fill="#92400e" />
          {/* Heavy Stomp Feet */}
          <rect x="9" y="26" width="5" height="4" fill="#451a03" />
          <rect x="18" y="26" width="5" height="4" fill="#451a03" />
          {/* Emerald Eyes */}
          <rect x="12" y="13" width="3" height="2" fill="#86efac" />
          <rect x="17" y="13" width="3" height="2" fill="#86efac" />
        </PixelSvg>
      )

    case 5:
    default:
      // Legendary: World-Tree Avatar with Glowing Blossom Halo
      return (
        <PixelSvg size={size} className={className} viewBox="0 0 32 32">
          {/* Glowing Nature Halo */}
          <circle cx="16" cy="14" r="14" fill="#22c55e" opacity="0.25" />
          <ellipse cx="16" cy="30" rx="13" ry="3" fill="rgba(0,0,0,0.4)" />
          {/* Giant Spreading Yggdrasil Antlers */}
          <path d="M12 7 Q4 2 2 0 Q7 4 10 7 Z" fill="#78350f" />
          <path d="M20 7 Q28 2 30 0 Q25 4 22 7 Z" fill="#78350f" />
          <circle cx="2" cy="1" r="2.5" fill="#ec4899" />
          <circle cx="30" cy="1" r="2.5" fill="#ec4899" />
          <circle cx="16" cy="1" r="3" fill="#4ade80" />
          <circle cx="16" cy="1" r="1.5" fill="#ffffff" />
          {/* Titan Trunk Body */}
          <rect x="8" y="10" width="16" height="17" fill="#451a03" />
          <rect x="9" y="11" width="14" height="15" fill="#78350f" />
          <rect x="11" y="14" width="10" height="9" fill="#15803d" />
          {/* Heart of the Forest Rune */}
          <circle cx="16" cy="18" r="4.5" fill="#4ade80" />
          <circle cx="16" cy="18" r="2.5" fill="#ffffff" />
          {/* Floating Leaves */}
          <circle cx="6" cy="10" r="1.5" fill="#86efac" />
          <circle cx="26" cy="10" r="1.5" fill="#86efac" />
          {/* Huge Trunk Pillars */}
          <rect x="8" y="27" width="6" height="3" fill="#292524" />
          <rect x="18" y="27" width="6" height="3" fill="#292524" />
          {/* Radiant Gold Eyes */}
          <rect x="11" y="12" width="3" height="2" fill="#ffffff" />
          <rect x="18" y="12" width="3" height="2" fill="#ffffff" />
        </PixelSvg>
      )
  }
}
