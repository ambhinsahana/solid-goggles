import React from 'react'
import { PixelSvg, BaseSpriteProps } from './sprite-base'

export function StarlingSprite({ stage = 1, size = 128, className = '' }: BaseSpriteProps & { stage?: number }) {
  switch (stage) {
    case 1:
      // Sprout: Tiny Neon Starlight Chick
      return (
        <PixelSvg size={size} className={className} viewBox="0 0 32 32">
          <ellipse cx="16" cy="29" rx="7" ry="2" fill="rgba(0,0,0,0.25)" />
          {/* Starlight Tail Feather */}
          <polygon points="16,23 18,27 15,26" fill="#ec4899" />
          <circle cx="18" cy="27" r="1.5" fill="#fbcfe8" />
          {/* Little Wings */}
          <rect x="9" y="17" width="3" height="5" fill="#db2777" />
          <rect x="20" y="17" width="3" height="5" fill="#db2777" />
          {/* Fluffy Stardust Body */}
          <circle cx="16" cy="19" r="6" fill="#ec4899" />
          <circle cx="16" cy="20" r="4" fill="#fdf2f8" />
          {/* Feet */}
          <rect x="13" y="26" width="2" height="3" fill="#be185d" />
          <rect x="17" y="26" width="2" height="3" fill="#be185d" />
          {/* Head & Stardust Crest */}
          <polygon points="16,10 14,5 18,8" fill="#f43f5e" />
          <circle cx="14" cy="5" r="1.5" fill="#fef08a" />
          {/* Starlet Eyes */}
          <rect x="13" y="17" width="2" height="2" fill="#831843" />
          <rect x="13" y="17" width="1" height="1" fill="#fdf2f8" />
          <rect x="17" y="17" width="2" height="2" fill="#831843" />
          <rect x="17" y="17" width="1" height="1" fill="#fdf2f8" />
          {/* Golden Beak */}
          <polygon points="16,19 14,21 18,21" fill="#facc15" />
        </PixelSvg>
      )

    case 2:
      // Adept: Swift Star-Bird with Comet Tails
      return (
        <PixelSvg size={size} className={className} viewBox="0 0 32 32">
          <ellipse cx="16" cy="29" rx="8" ry="2.5" fill="rgba(0,0,0,0.25)" />
          {/* Twin Comet Ribbon Tails */}
          <path d="M14 23 Q10 27 7 28 Q11 25 15 23 Z" fill="#db2777" />
          <path d="M18 23 Q22 27 25 28 Q21 25 17 23 Z" fill="#db2777" />
          {/* Wings */}
          <polygon points="11,16 3,10 7,21" fill="#db2777" />
          <polygon points="21,16 29,10 25,21" fill="#db2777" />
          {/* Body */}
          <rect x="12" y="14" width="8" height="11" fill="#be185d" />
          <rect x="13" y="15" width="6" height="9" fill="#ec4899" />
          <circle cx="16" cy="18" r="2" fill="#fef08a" />
          {/* Talons */}
          <rect x="12" y="25" width="3" height="4" fill="#831843" />
          <rect x="17" y="25" width="3" height="4" fill="#831843" />
          {/* Crest */}
          <polygon points="16,5 13,10 19,10" fill="#f43f5e" />
          <circle cx="16" cy="4" r="2" fill="#facc15" />
          {/* Head & Eyes */}
          <rect x="11" y="9" width="10" height="7" fill="#be185d" />
          <rect x="12" y="10" width="8" height="5" fill="#f472b6" />
          <rect x="13" y="11" width="2" height="2" fill="#ffffff" />
          <rect x="17" y="11" width="2" height="2" fill="#ffffff" />
        </PixelSvg>
      )

    case 3:
      // Evolved: Blazing Astral Phoenix with Nebula Wings
      return (
        <PixelSvg size={size} className={className} viewBox="0 0 32 32">
          <ellipse cx="16" cy="29" rx="10" ry="3" fill="rgba(0,0,0,0.3)" />
          {/* Sweeping Nebula Wings */}
          <polygon points="10,15 -1,7 4,22" fill="#db2777" />
          <polygon points="10,17 1,11 5,20" fill="#ec4899" />
          <polygon points="22,15 33,7 28,22" fill="#db2777" />
          <polygon points="22,17 31,11 27,20" fill="#ec4899" />
          {/* Phoenix Body */}
          <rect x="10" y="14" width="12" height="12" fill="#9d174d" />
          <rect x="11" y="15" width="10" height="10" fill="#db2777" />
          {/* Glowing Astral Star Heart */}
          <circle cx="16" cy="19" r="3" fill="#facc15" />
          <circle cx="16" cy="19" r="1.5" fill="#ffffff" />
          {/* Triple Feather Crown */}
          <polygon points="16,1 13,7 19,7" fill="#facc15" />
          <polygon points="10,4 9,8 13,8" fill="#f43f5e" />
          <polygon points="22,4 23,8 19,8" fill="#f43f5e" />
          {/* Head */}
          <rect x="9" y="7" width="14" height="8" fill="#831843" />
          <rect x="10" y="8" width="12" height="6" fill="#db2777" />
          {/* Starlight Eyes */}
          <rect x="12" y="9" width="2" height="2" fill="#ffffff" />
          <rect x="18" y="9" width="2" height="2" fill="#ffffff" />
          {/* Golden Talons */}
          <rect x="11" y="25" width="3" height="4" fill="#facc15" />
          <rect x="18" y="25" width="3" height="4" fill="#facc15" />
        </PixelSvg>
      )

    case 4:
      // Elite: Supernova Phoenix with Four Ribbons & Stellar Crown
      return (
        <PixelSvg size={size} className={className} viewBox="0 0 32 32">
          <ellipse cx="16" cy="30" rx="12" ry="3" fill="rgba(0,0,0,0.35)" />
          {/* Four Flaming Ribbon Tails */}
          <path d="M12 24 Q6 28 2 30 Q7 26 13 24 Z" fill="#f43f5e" />
          <path d="M14 25 Q9 29 5 32 Q10 27 15 25 Z" fill="#facc15" />
          <path d="M20 24 Q26 28 30 30 Q25 26 19 24 Z" fill="#f43f5e" />
          <path d="M18 25 Q23 29 27 32 Q22 27 17 25 Z" fill="#facc15" />
          {/* Supernova Wings */}
          <polygon points="10,13 -2,2 3,17" fill="#9d174d" />
          <polygon points="11,16 0,11 6,24" fill="#f43f5e" />
          <polygon points="22,13 34,2 29,17" fill="#9d174d" />
          <polygon points="21,16 32,11 26,24" fill="#f43f5e" />
          {/* Supernova Body */}
          <rect x="9" y="13" width="14" height="13" fill="#500724" />
          <rect x="10" y="14" width="12" height="11" fill="#9d174d" />
          <circle cx="16" cy="18" r="3.5" fill="#fef08a" stroke="#f43f5e" strokeWidth="1" />
          <circle cx="16" cy="18" r="2" fill="#ffffff" />
          {/* Blinding Starlight Crown */}
          <polygon points="16,0 12,6 20,6" fill="#ffffff" />
          <polygon points="16,3 13,7 19,7" fill="#facc15" />
          <polygon points="9,2 7,7 12,6" fill="#f43f5e" />
          <polygon points="23,2 25,7 20,6" fill="#f43f5e" />
          {/* Head */}
          <rect x="8" y="6" width="16" height="8" fill="#831843" />
          <rect x="9" y="7" width="14" height="6" fill="#db2777" />
          {/* Eyes */}
          <rect x="11" y="8" width="3" height="2" fill="#ffffff" />
          <rect x="18" y="8" width="3" height="2" fill="#ffffff" />
          {/* Talons */}
          <rect x="10" y="25" width="4" height="5" fill="#facc15" />
          <rect x="18" y="25" width="4" height="5" fill="#facc15" />
        </PixelSvg>
      )

    case 5:
    default:
      // Legendary: Universal Cosmic Rebirth Phoenix (Apex of Life RPG)
      return (
        <PixelSvg size={size} className={className} viewBox="0 0 32 32">
          {/* Stellar Nova Halo */}
          <circle cx="16" cy="15" r="15" fill="#f43f5e" opacity="0.35" />
          <circle cx="16" cy="15" r="13" fill="none" stroke="#facc15" strokeWidth="1.5" strokeDasharray="4 2" />
          <circle cx="16" cy="15" r="11" fill="none" stroke="#ffffff" strokeWidth="1" strokeDasharray="2 2" />
          <ellipse cx="16" cy="30" rx="13" ry="3" fill="rgba(0,0,0,0.4)" />
          {/* Universal Cosmic Wings Holding Starfields */}
          <polygon points="12,12 -3,-2 2,14" fill="#db2777" />
          <polygon points="20,12 35,-2 30,14" fill="#db2777" />
          <polygon points="11,15 -2,9 4,20" fill="#f43f5e" />
          <polygon points="21,15 34,9 28,20" fill="#f43f5e" />
          <polygon points="11,19 0,21 7,26" fill="#facc15" />
          <polygon points="21,19 32,21 25,26" fill="#facc15" />
          {/* Astral Phoenix Body */}
          <rect x="9" y="11" width="14" height="15" fill="#500724" />
          <rect x="10" y="12" width="12" height="13" fill="#9d174d" />
          {/* Cosmic Rebirth Core */}
          <circle cx="16" cy="18" r="4.5" fill="#facc15" stroke="#ffffff" strokeWidth="1.5" />
          <circle cx="16" cy="18" r="2.5" fill="#ffffff" />
          {/* Supreme Astral Crown */}
          <polygon points="16,-1 12,5 20,5" fill="#ffffff" />
          <polygon points="9,1 7,6 12,6" fill="#facc15" />
          <polygon points="23,1 25,6 20,6" fill="#facc15" />
          <rect x="8" y="5" width="16" height="8" fill="#831843" />
          <rect x="9" y="6" width="14" height="6" fill="#db2777" />
          {/* Eternal Light Eyes */}
          <rect x="11" y="7" width="3" height="2" fill="#ffffff" />
          <rect x="18" y="7" width="3" height="2" fill="#ffffff" />
          {/* Mythic Golden Talons */}
          <rect x="10" y="25" width="4" height="5" fill="#facc15" />
          <rect x="18" y="25" width="4" height="5" fill="#facc15" />
        </PixelSvg>
      )
  }
}
