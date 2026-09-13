import React from 'react'
import { PixelSvg, BaseSpriteProps } from './sprite-base'

export function SolariaSprite({ stage = 1, size = 128, className = '' }: BaseSpriteProps & { stage?: number }) {
  switch (stage) {
    case 1:
      // Sprout: Solar Starlet Orb with baby wings
      return (
        <PixelSvg size={size} className={className} viewBox="0 0 32 32">
          <ellipse cx="16" cy="29" rx="6" ry="2" fill="rgba(0,0,0,0.25)" />
          {/* Baby Wings */}
          <polygon points="10,17 4,14 8,21" fill="#fef08a" />
          <polygon points="22,17 28,14 24,21" fill="#fef08a" />
          {/* Golden Orb Body */}
          <circle cx="16" cy="18" r="6" fill="#f59e0b" />
          <circle cx="16" cy="18" r="5" fill="#fbbf24" />
          {/* Halo Sparkle */}
          <circle cx="16" cy="9" r="2" fill="#fef08a" />
          {/* Cute Eyes */}
          <rect x="13" y="16" width="2" height="3" fill="#78350f" />
          <rect x="13" y="16" width="1" height="1" fill="#ffffff" />
          <rect x="17" y="16" width="2" height="3" fill="#78350f" />
          <rect x="17" y="16" width="1" height="1" fill="#ffffff" />
        </PixelSvg>
      )

    case 2:
      // Adept: Cherub Sun Sprite with Solar Ring
      return (
        <PixelSvg size={size} className={className} viewBox="0 0 32 32">
          <ellipse cx="16" cy="29" rx="8" ry="2.5" fill="rgba(0,0,0,0.25)" />
          {/* Solar Halo Ring */}
          <circle cx="16" cy="8" r="4" fill="none" stroke="#facc15" strokeWidth="1.5" />
          {/* Feathered Wings */}
          <polygon points="10,16 2,10 6,21" fill="#fef08a" />
          <polygon points="22,16 30,10 26,21" fill="#fef08a" />
          {/* Body */}
          <rect x="12" y="14" width="8" height="11" fill="#f59e0b" />
          <rect x="13" y="15" width="6" height="9" fill="#fbbf24" />
          {/* Robe/Legs */}
          <rect x="12" y="24" width="3" height="4" fill="#d97706" />
          <rect x="17" y="24" width="3" height="4" fill="#d97706" />
          {/* Head */}
          <rect x="11" y="9" width="10" height="7" fill="#f59e0b" />
          <rect x="12" y="10" width="8" height="5" fill="#fde68a" />
          {/* Amber Eyes */}
          <rect x="13" y="11" width="2" height="2" fill="#92400e" />
          <rect x="17" y="11" width="2" height="2" fill="#92400e" />
        </PixelSvg>
      )

    case 3:
      // Evolved: Armored Solar Warrior with Radiant Wings
      return (
        <PixelSvg size={size} className={className} viewBox="0 0 32 32">
          <ellipse cx="16" cy="29" rx="10" ry="3" fill="rgba(0,0,0,0.3)" />
          {/* Radiant Wings */}
          <polygon points="10,15 0,7 5,22" fill="#fbbf24" />
          <polygon points="10,17 2,11 6,20" fill="#fef08a" />
          <polygon points="22,15 32,7 27,22" fill="#fbbf24" />
          <polygon points="22,17 30,11 26,20" fill="#fef08a" />
          {/* Armored Golden Body */}
          <rect x="10" y="14" width="12" height="12" fill="#d97706" />
          <rect x="11" y="15" width="10" height="10" fill="#f59e0b" />
          <circle cx="16" cy="19" r="3" fill="#fffbeb" />
          {/* Sun Crown */}
          <polygon points="16,3 13,8 19,8" fill="#fde68a" />
          {/* Head */}
          <rect x="9" y="8" width="14" height="7" fill="#d97706" />
          <rect x="10" y="9" width="12" height="5" fill="#fbbf24" />
          {/* Piercing Light Eyes */}
          <rect x="12" y="10" width="2" height="2" fill="#ffffff" />
          <rect x="18" y="10" width="2" height="2" fill="#ffffff" />
          {/* Boots */}
          <rect x="11" y="25" width="3" height="4" fill="#b45309" />
          <rect x="18" y="25" width="3" height="4" fill="#b45309" />
        </PixelSvg>
      )

    case 4:
      // Elite: Archangel of Dawn with Four Glowing Wings
      return (
        <PixelSvg size={size} className={className} viewBox="0 0 32 32">
          <ellipse cx="16" cy="30" rx="12" ry="3" fill="rgba(0,0,0,0.35)" />
          {/* Upper Wings */}
          <polygon points="10,13 -1,3 4,16" fill="#facc15" />
          <polygon points="22,13 33,3 28,16" fill="#facc15" />
          {/* Lower Wings */}
          <polygon points="11,17 1,16 6,24" fill="#fef08a" />
          <polygon points="21,17 31,16 26,24" fill="#fef08a" />
          {/* Radiant Seraph Body */}
          <rect x="9" y="13" width="14" height="13" fill="#b45309" />
          <rect x="10" y="14" width="12" height="11" fill="#d97706" />
          <circle cx="16" cy="18" r="3.5" fill="#ffffff" stroke="#facc15" strokeWidth="1" />
          {/* Archangel Crown */}
          <polygon points="16,1 12,6 20,6" fill="#ffffff" />
          <polygon points="16,4 14,8 18,8" fill="#facc15" />
          {/* Head */}
          <rect x="8" y="7" width="16" height="8" fill="#d97706" />
          <rect x="9" y="8" width="14" height="6" fill="#fbbf24" />
          {/* Eyes */}
          <rect x="11" y="9" width="3" height="2" fill="#ffffff" />
          <rect x="18" y="9" width="3" height="2" fill="#ffffff" />
          {/* Sabatons */}
          <rect x="10" y="25" width="3" height="5" fill="#78350f" />
          <rect x="19" y="25" width="3" height="5" fill="#78350f" />
        </PixelSvg>
      )

    case 5:
    default:
      // Legendary: Seraph Sovereign of the Noon Sun with 6 Radiant Wings
      return (
        <PixelSvg size={size} className={className} viewBox="0 0 32 32">
          {/* Golden Solar Flare Halo */}
          <circle cx="16" cy="15" r="14" fill="#f59e0b" opacity="0.35" />
          <circle cx="16" cy="15" r="13" fill="none" stroke="#facc15" strokeWidth="1.5" strokeDasharray="3 2" />
          <ellipse cx="16" cy="30" rx="13" ry="3" fill="rgba(0,0,0,0.4)" />
          {/* Six Radiant Solar Wings */}
          <polygon points="12,12 -2,-1 4,14" fill="#fde047" />
          <polygon points="20,12 34,-1 28,14" fill="#fde047" />
          <polygon points="11,15 -1,11 5,20" fill="#facc15" />
          <polygon points="21,15 33,11 27,20" fill="#facc15" />
          <polygon points="11,19 1,22 8,26" fill="#fef08a" />
          <polygon points="21,19 31,22 24,26" fill="#fef08a" />
          {/* Seraph Body & Golden Heart */}
          <rect x="9" y="12" width="14" height="14" fill="#78350f" />
          <rect x="10" y="13" width="12" height="12" fill="#d97706" />
          <circle cx="16" cy="18" r="4.5" fill="#ffffff" stroke="#facc15" strokeWidth="1.5" />
          {/* Solar Eclipse Crown */}
          <polygon points="16,0 12,5 20,5" fill="#ffffff" />
          <polygon points="10,2 8,6 13,6" fill="#fde047" />
          <polygon points="22,2 24,6 19,6" fill="#fde047" />
          <rect x="8" y="6" width="16" height="8" fill="#b45309" />
          <rect x="9" y="7" width="14" height="6" fill="#fbbf24" />
          {/* Holy Noon Eyes */}
          <rect x="11" y="8" width="3" height="2" fill="#ffffff" />
          <rect x="18" y="8" width="3" height="2" fill="#ffffff" />
          {/* Sabatons */}
          <rect x="10" y="25" width="4" height="5" fill="#facc15" />
          <rect x="18" y="25" width="4" height="5" fill="#facc15" />
        </PixelSvg>
      )
  }
}
