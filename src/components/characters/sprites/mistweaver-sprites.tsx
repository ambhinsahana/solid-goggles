import React from 'react'
import { PixelSvg, BaseSpriteProps } from './sprite-base'

export function MistweaverSprite({ stage = 1, size = 128, className = '' }: BaseSpriteProps & { stage?: number }) {
  switch (stage) {
    case 1:
      // Sprout: Tiny sea serpent curled like a droplet
      return (
        <PixelSvg size={size} className={className} viewBox="0 0 32 32">
          <ellipse cx="16" cy="29" rx="7" ry="2" fill="rgba(0,0,0,0.25)" />
          {/* Curled Serpent Body */}
          <path d="M12 26 C10 23 11 18 16 18 C20 18 22 22 20 25 C18 27 15 27 13 26 Z" fill="#0d9488" />
          <path d="M13 25 C12 23 13 19 16 19 C19 19 20 22 19 24 Z" fill="#14b8a6" />
          {/* Serpent Head */}
          <rect x="12" y="12" width="8" height="7" rx="2" fill="#0f766e" />
          <rect x="13" y="13" width="6" height="5" fill="#14b8a6" />
          {/* Tiny Pearl Horns */}
          <circle cx="13" cy="11" r="1.5" fill="#f0fdfa" />
          <circle cx="19" cy="11" r="1.5" fill="#f0fdfa" />
          {/* Cute Eyes */}
          <rect x="14" y="14" width="2" height="2" fill="#134e4a" />
          <rect x="14" y="14" width="1" height="1" fill="#ccfbf1" />
          <rect x="17" y="14" width="2" height="2" fill="#134e4a" />
          <rect x="17" y="14" width="1" height="1" fill="#ccfbf1" />
        </PixelSvg>
      )

    case 2:
      // Adept: Floating Ribbon Serpent with Mist Fins
      return (
        <PixelSvg size={size} className={className} viewBox="0 0 32 32">
          <ellipse cx="16" cy="29" rx="8" ry="2.5" fill="rgba(0,0,0,0.25)" />
          {/* S-curved Ribbon Body */}
          <path d="M16 13 Q24 16 22 23 Q20 27 14 27 Q10 26 12 21 Q14 17 16 13 Z" fill="#0f766e" />
          <path d="M16 14 Q22 17 21 22 Q19 25 15 25 Q12 24 13 21 Z" fill="#2dd4bf" />
          {/* Mist Fins */}
          <polygon points="12,18 7,16 10,21" fill="#99f6e4" />
          <polygon points="21,18 26,16 23,21" fill="#99f6e4" />
          {/* Head & Pearl Horns */}
          <rect x="11" y="8" width="10" height="7" rx="2" fill="#0f766e" />
          <rect x="12" y="9" width="8" height="5" fill="#14b8a6" />
          <polygon points="11,8 8,4 13,7" fill="#ccfbf1" />
          <polygon points="21,8 24,4 19,7" fill="#ccfbf1" />
          {/* Whisker Wisps */}
          <line x1="12" y1="13" x2="8" y2="15" stroke="#5eead4" strokeWidth="1" />
          <line x1="20" y1="13" x2="24" y2="15" stroke="#5eead4" strokeWidth="1" />
          {/* Eyes */}
          <rect x="13" y="10" width="2" height="2" fill="#115e59" />
          <rect x="17" y="10" width="2" height="2" fill="#115e59" />
        </PixelSvg>
      )

    case 3:
      // Evolved: Dragon-Serpent with Billowing Fog Whiskers
      return (
        <PixelSvg size={size} className={className} viewBox="0 0 32 32">
          <ellipse cx="16" cy="29" rx="10" ry="3" fill="rgba(0,0,0,0.3)" />
          {/* Serpentine Loops */}
          <path d="M16 11 Q26 13 24 20 Q22 26 14 26 Q8 26 9 20 Q10 14 16 11 Z" fill="#115e59" />
          <path d="M16 12 Q24 14 22 19 Q20 24 14 24 Q10 24 11 19 Z" fill="#14b8a6" />
          {/* Dorsal Mist Fins */}
          <polygon points="20,13 23,10 21,16" fill="#99f6e4" />
          <polygon points="13,13 10,10 12,16" fill="#99f6e4" />
          {/* Jade Scales Pearl */}
          <circle cx="16" cy="18" r="3" fill="#ccfbf1" stroke="#0d9488" />
          {/* Dragon Head */}
          <rect x="10" y="7" width="12" height="7" rx="2" fill="#0f766e" />
          <rect x="11" y="8" width="10" height="5" fill="#2dd4bf" />
          {/* Antler Horns */}
          <polygon points="11,7 6,1 12,5" fill="#f0fdfa" />
          <polygon points="21,7 26,1 20,5" fill="#f0fdfa" />
          {/* Billowing Whiskers */}
          <path d="M11 12 Q5 14 3 19" stroke="#99f6e4" strokeWidth="1.5" fill="none" />
          <path d="M21 12 Q27 14 29 19" stroke="#99f6e4" strokeWidth="1.5" fill="none" />
          {/* Eyes */}
          <rect x="12" y="9" width="3" height="2" fill="#042f2e" />
          <rect x="13" y="9" width="1" height="1" fill="#f0fdfa" />
          <rect x="17" y="9" width="3" height="2" fill="#042f2e" />
          <rect x="18" y="9" width="1" height="1" fill="#f0fdfa" />
        </PixelSvg>
      )

    case 4:
      // Elite: Celestial Sea Dragon with Dual Pearl Horns
      return (
        <PixelSvg size={size} className={className} viewBox="0 0 32 32">
          <ellipse cx="16" cy="30" rx="12" ry="3" fill="rgba(0,0,0,0.35)" />
          {/* Dynamic Dragon Coils */}
          <path d="M16 9 Q28 12 26 21 Q24 28 14 28 Q6 28 7 19 Q8 13 16 9 Z" fill="#042f2e" />
          <path d="M16 11 Q26 13 24 20 Q22 26 14 26 Q8 26 9 19 Z" fill="#0f766e" />
          <circle cx="16" cy="18" r="3.5" fill="#f0fdfa" stroke="#2dd4bf" strokeWidth="1" />
          {/* Tidal Mist Claws */}
          <rect x="8" y="24" width="3" height="4" fill="#14b8a6" />
          <rect x="21" y="24" width="3" height="4" fill="#14b8a6" />
          {/* Great Pearl Horns */}
          <polygon points="10,6 4,0 12,4" fill="#ccfbf1" />
          <polygon points="22,6 28,0 20,4" fill="#ccfbf1" />
          {/* Head */}
          <rect x="9" y="6" width="14" height="8" rx="2" fill="#042f2e" />
          <rect x="10" y="7" width="12" height="6" fill="#14b8a6" />
          {/* Glowing Eyes */}
          <rect x="11" y="8" width="3" height="2" fill="#ffffff" />
          <rect x="18" y="8" width="3" height="2" fill="#ffffff" />
        </PixelSvg>
      )

    case 5:
    default:
      // Legendary: Leviathan Mist Dragon wrapping through an Ethereal Cloud Gate
      return (
        <PixelSvg size={size} className={className} viewBox="0 0 32 32">
          {/* Ethereal Mist Ring */}
          <circle cx="16" cy="15" r="14" fill="#14b8a6" opacity="0.3" />
          <circle cx="16" cy="15" r="13" fill="none" stroke="#99f6e4" strokeWidth="1.5" strokeDasharray="3 3" />
          <ellipse cx="16" cy="30" rx="13" ry="3" fill="rgba(0,0,0,0.4)" />
          {/* Giant Coiled Dragon Body */}
          <path d="M16 8 Q31 11 29 22 Q27 30 14 30 Q3 30 4 19 Q5 11 16 8 Z" fill="#042f2e" />
          <path d="M16 10 Q28 12 26 21 Q24 28 14 28 Q6 28 7 19 Z" fill="#0f766e" />
          {/* Radiant Tide Orb */}
          <circle cx="16" cy="18" r="4.5" fill="#f0fdfa" stroke="#2dd4bf" strokeWidth="1.5" />
          <circle cx="16" cy="18" r="2.5" fill="#ffffff" />
          {/* Grand Pearl Crown */}
          <polygon points="16,0 13,5 19,5" fill="#ffffff" />
          <polygon points="9,2 5,7 11,6" fill="#ccfbf1" />
          <polygon points="23,2 27,7 21,6" fill="#ccfbf1" />
          <rect x="8" y="5" width="16" height="8" rx="2" fill="#042f2e" />
          <rect x="9" y="6" width="14" height="6" fill="#14b8a6" />
          {/* Luminous Pearl Eyes */}
          <rect x="11" y="7" width="3" height="2" fill="#ffffff" />
          <rect x="18" y="7" width="3" height="2" fill="#ffffff" />
        </PixelSvg>
      )
  }
}
