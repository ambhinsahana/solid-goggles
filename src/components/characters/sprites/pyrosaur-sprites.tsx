import React from 'react'
import { PixelSvg, BaseSpriteProps } from './sprite-base'

export function PyrosaurSprite({ stage = 1, size = 128, className = '' }: BaseSpriteProps & { stage?: number }) {
  switch (stage) {
    case 1:
      // Sprout: Baby Magma Drake Reptile
      return (
        <PixelSvg size={size} className={className} viewBox="0 0 32 32">
          <ellipse cx="16" cy="29" rx="7" ry="2" fill="rgba(0,0,0,0.25)" />
          {/* Spiked Tail */}
          <polygon points="21,22 26,19 25,24 20,24" fill="#ef4444" />
          <circle cx="26" cy="19" r="1.5" fill="#facc15" />
          {/* Feet */}
          <rect x="11" y="26" width="3" height="3" fill="#991b1b" />
          <rect x="18" y="26" width="3" height="3" fill="#991b1b" />
          {/* Drake Body */}
          <rect x="11" y="17" width="10" height="10" rx="2" fill="#dc2626" />
          <rect x="12" y="18" width="8" height="8" fill="#ef4444" />
          <rect x="14" y="20" width="4" height="6" fill="#fef08a" />
          {/* Snout & Head */}
          <rect x="10" y="11" width="12" height="8" fill="#b91c1c" />
          <rect x="11" y="12" width="10" height="6" fill="#ef4444" />
          {/* Magma Horn */}
          <polygon points="16,6 14,11 18,11" fill="#facc15" />
          {/* Eyes */}
          <rect x="12" y="13" width="2" height="2" fill="#450a0a" />
          <rect x="12" y="13" width="1" height="1" fill="#facc15" />
          <rect x="18" y="13" width="2" height="2" fill="#450a0a" />
          <rect x="18" y="13" width="1" height="1" fill="#facc15" />
        </PixelSvg>
      )

    case 2:
      // Adept: Bipedal Drake with Molten Chest Scales
      return (
        <PixelSvg size={size} className={className} viewBox="0 0 32 32">
          <ellipse cx="16" cy="29" rx="9" ry="2.5" fill="rgba(0,0,0,0.25)" />
          {/* Spiked Fire Tail */}
          <path d="M21 21 Q27 18 29 12 Q25 15 21 23 Z" fill="#dc2626" />
          <polygon points="28,12 30,8 31,13" fill="#f97316" />
          {/* Body */}
          <rect x="10" y="24" width="3" height="5" fill="#7f1d1d" />
          <rect x="19" y="24" width="3" height="5" fill="#7f1d1d" />
          <rect x="11" y="15" width="10" height="10" fill="#b91c1c" />
          <rect x="12" y="16" width="8" height="8" fill="#dc2626" />
          {/* Molten Chest Core */}
          <polygon points="16,17 14,22 18,22" fill="#facc15" />
          {/* Drake Head */}
          <rect x="9" y="9" width="14" height="9" fill="#991b1b" />
          <rect x="10" y="10" width="12" height="7" fill="#dc2626" />
          {/* Twin Horns */}
          <polygon points="9,9 7,4 12,8" fill="#f97316" />
          <polygon points="23,9 25,4 20,8" fill="#f97316" />
          {/* Eyes */}
          <rect x="12" y="11" width="2" height="2" fill="#facc15" />
          <rect x="18" y="11" width="2" height="2" fill="#facc15" />
        </PixelSvg>
      )

    case 3:
      // Evolved: Armored Dragon Knight with Molten Wings
      return (
        <PixelSvg size={size} className={className} viewBox="0 0 32 32">
          <ellipse cx="16" cy="29" rx="10" ry="3" fill="rgba(0,0,0,0.3)" />
          {/* Fire Wings */}
          <polygon points="11,15 2,9 7,20" fill="#ea580c" />
          <polygon points="21,15 30,9 25,20" fill="#ea580c" />
          {/* Heavy Drake Body */}
          <rect x="10" y="14" width="12" height="12" fill="#7f1d1d" />
          <rect x="11" y="15" width="10" height="10" fill="#b91c1c" />
          <circle cx="16" cy="19" r="3" fill="#facc15" />
          <circle cx="16" cy="19" r="1.5" fill="#ffffff" />
          {/* Horns */}
          <polygon points="9,8 5,1 11,6" fill="#f97316" />
          <polygon points="23,8 27,1 21,6" fill="#f97316" />
          {/* Head */}
          <rect x="8" y="8" width="16" height="8" fill="#991b1b" />
          <rect x="9" y="9" width="14" height="6" fill="#dc2626" />
          {/* Eyes */}
          <rect x="11" y="10" width="3" height="2" fill="#fef08a" />
          <rect x="18" y="10" width="3" height="2" fill="#fef08a" />
          {/* Heavy Claws */}
          <rect x="10" y="25" width="3" height="4" fill="#450a0a" />
          <rect x="19" y="25" width="3" height="4" fill="#450a0a" />
        </PixelSvg>
      )

    case 4:
      // Elite: Heavy Lava Drake with Twin Volcanic Horns
      return (
        <PixelSvg size={size} className={className} viewBox="0 0 32 32">
          <ellipse cx="16" cy="30" rx="12" ry="3" fill="rgba(0,0,0,0.35)" />
          {/* Great Molten Wings */}
          <polygon points="10,14 0,5 5,18" fill="#b91c1c" />
          <polygon points="22,14 32,5 27,18" fill="#b91c1c" />
          <polygon points="9,16 1,10 6,19" fill="#facc15" />
          <polygon points="23,16 31,10 26,19" fill="#facc15" />
          {/* Heavy Molten Body */}
          <rect x="9" y="13" width="14" height="13" fill="#450a0a" />
          <rect x="10" y="14" width="12" height="11" fill="#7f1d1d" />
          <circle cx="16" cy="19" r="3.5" fill="#f97316" stroke="#facc15" strokeWidth="1" />
          {/* Great Horns */}
          <polygon points="8,7 3,0 11,5" fill="#f97316" />
          <polygon points="24,7 29,0 21,5" fill="#f97316" />
          {/* Head */}
          <rect x="8" y="7" width="16" height="8" fill="#7f1d1d" />
          <rect x="9" y="8" width="14" height="6" fill="#b91c1c" />
          {/* Eyes */}
          <rect x="11" y="9" width="3" height="2" fill="#ffffff" />
          <rect x="18" y="9" width="3" height="2" fill="#ffffff" />
          {/* Claws */}
          <rect x="9" y="25" width="4" height="4" fill="#1c1917" />
          <rect x="19" y="25" width="4" height="4" fill="#1c1917" />
        </PixelSvg>
      )

    case 5:
    default:
      // Legendary: Volcanic Dragon Sovereign with Colossal Obsidian Wings
      return (
        <PixelSvg size={size} className={className} viewBox="0 0 32 32">
          {/* Roaring Magma Aura */}
          <circle cx="16" cy="15" r="14" fill="#ef4444" opacity="0.3" />
          <ellipse cx="16" cy="30" rx="13" ry="3" fill="rgba(0,0,0,0.4)" />
          {/* Colossal Obsidian Wings */}
          <polygon points="16,15 0,2 3,14 10,18" fill="#1c1917" />
          <polygon points="16,15 32,2 29,14 22,18" fill="#1c1917" />
          <polygon points="12,13 3,6 6,15" fill="#ef4444" />
          <polygon points="20,13 29,6 26,15" fill="#ef4444" />
          {/* Sovereign Dragon Body */}
          <rect x="9" y="12" width="14" height="14" fill="#1c1917" />
          <rect x="10" y="13" width="12" height="12" fill="#7f1d1d" />
          <circle cx="16" cy="18" r="4.5" fill="#facc15" />
          <circle cx="16" cy="18" r="2.5" fill="#ffffff" />
          {/* Blazing Crown */}
          <polygon points="16,0 12,6 20,6" fill="#facc15" />
          <polygon points="8,4 4,0 11,6" fill="#ef4444" />
          <polygon points="24,4 28,0 21,6" fill="#ef4444" />
          <rect x="8" y="6" width="16" height="8" fill="#1c1917" />
          <rect x="9" y="7" width="14" height="6" fill="#991b1b" />
          {/* Glowing Eyes */}
          <rect x="11" y="8" width="3" height="2" fill="#ffffff" />
          <rect x="18" y="8" width="3" height="2" fill="#ffffff" />
          {/* Claws */}
          <rect x="9" y="25" width="4" height="4" fill="#1c1917" />
          <rect x="19" y="25" width="4" height="4" fill="#1c1917" />
        </PixelSvg>
      )
  }
}
