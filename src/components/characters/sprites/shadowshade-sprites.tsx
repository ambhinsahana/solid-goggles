import React from 'react'
import { PixelSvg, BaseSpriteProps } from './sprite-base'

export function ShadowshadeSprite({ stage = 1, size = 128, className = '' }: BaseSpriteProps & { stage?: number }) {
  switch (stage) {
    case 1:
      // Sprout: Floating Umbra Wisp
      return (
        <PixelSvg size={size} className={className} viewBox="0 0 32 32">
          <ellipse cx="16" cy="29" rx="6" ry="2" fill="rgba(0,0,0,0.25)" />
          {/* Floating Shadow Wisp Body */}
          <circle cx="16" cy="18" r="6" fill="#1e1b4b" />
          <circle cx="16" cy="18" r="5" fill="#312e81" />
          {/* Smoke Tail Trails */}
          <polygon points="16,23 13,27 15,25 17,28 17,23" fill="#4338ca" />
          {/* Violet Glow Eyes */}
          <rect x="13" y="16" width="2" height="3" fill="#c084fc" />
          <rect x="13" y="16" width="1" height="1" fill="#ffffff" />
          <rect x="17" y="16" width="2" height="3" fill="#c084fc" />
          <rect x="17" y="16" width="1" height="1" fill="#ffffff" />
          {/* Wisp Horns */}
          <polygon points="12,13 10,9 13,11" fill="#6366f1" />
          <polygon points="20,13 22,9 19,11" fill="#6366f1" />
        </PixelSvg>
      )

    case 2:
      // Adept: Nocturnal Spirit Cat with Shadow Tendril Ears
      return (
        <PixelSvg size={size} className={className} viewBox="0 0 32 32">
          <ellipse cx="16" cy="29" rx="8" ry="2.5" fill="rgba(0,0,0,0.25)" />
          {/* Ethereal Violet Tail */}
          <path d="M21 21 Q28 17 29 11 Q24 15 21 22 Z" fill="#4338ca" />
          <circle cx="28" cy="11" r="2" fill="#a855f7" />
          {/* Sleek Body */}
          <rect x="10" y="24" width="3" height="5" fill="#0f172a" />
          <rect x="19" y="24" width="3" height="5" fill="#0f172a" />
          <rect x="11" y="16" width="10" height="9" fill="#1e1b4b" />
          <rect x="12" y="17" width="8" height="7" fill="#312e81" />
          {/* Head & Tendril Ears */}
          <rect x="9" y="9" width="14" height="9" fill="#1e1b4b" />
          <rect x="10" y="10" width="12" height="7" fill="#312e81" />
          <polygon points="9,9 6,2 12,6" fill="#6366f1" />
          <polygon points="23,9 26,2 20,6" fill="#6366f1" />
          {/* Piercing Neon Purple Eyes */}
          <rect x="12" y="11" width="2" height="3" fill="#e879f9" />
          <rect x="18" y="11" width="2" height="3" fill="#e879f9" />
        </PixelSvg>
      )

    case 3:
      // Evolved: Shadow Stalker Panther with Void Claws
      return (
        <PixelSvg size={size} className={className} viewBox="0 0 32 32">
          <ellipse cx="16" cy="29" rx="10" ry="3" fill="rgba(0,0,0,0.3)" />
          {/* Scythe Tail */}
          <path d="M22 20 Q30 14 31 7 Q25 11 21 18 Z" fill="#312e81" />
          <polygon points="31,7 32,3 28,6" fill="#c084fc" />
          {/* Shadow Panther Body */}
          <rect x="10" y="15" width="12" height="11" fill="#0f172a" />
          <rect x="11" y="16" width="10" height="9" fill="#1e1b4b" />
          <circle cx="16" cy="20" r="2.5" fill="#c084fc" />
          {/* Void Horns */}
          <polygon points="9,8 5,1 11,5" fill="#4338ca" />
          <polygon points="23,8 27,1 21,5" fill="#4338ca" />
          <polygon points="16,3 14,7 18,7" fill="#a855f7" />
          {/* Head */}
          <rect x="8" y="8" width="16" height="9" fill="#0f172a" />
          <rect x="9" y="9" width="14" height="7" fill="#1e1b4b" />
          {/* Eyes */}
          <rect x="11" y="11" width="3" height="2" fill="#f0abfc" />
          <rect x="18" y="11" width="3" height="2" fill="#f0abfc" />
          {/* Claws */}
          <rect x="10" y="25" width="3" height="4" fill="#020617" />
          <rect x="19" y="25" width="3" height="4" fill="#020617" />
        </PixelSvg>
      )

    case 4:
      // Elite: Void Reaver draped in Umbral Cloak
      return (
        <PixelSvg size={size} className={className} viewBox="0 0 32 32">
          <ellipse cx="16" cy="30" rx="12" ry="3" fill="rgba(0,0,0,0.35)" />
          {/* Dual Void Scythe Tails */}
          <path d="M19 19 Q31 13 32 4 Q25 9 22 16 Z" fill="#1e1b4b" />
          <path d="M21 21 Q30 19 32 12 Q27 14 23 18 Z" fill="#a855f7" />
          {/* Heavy Void Armor */}
          <rect x="9" y="14" width="14" height="12" fill="#020617" />
          <rect x="10" y="15" width="12" height="10" fill="#0f172a" />
          <circle cx="16" cy="19" r="3.5" fill="#7e22ce" stroke="#e879f9" strokeWidth="1" />
          {/* Shadow Spikes */}
          <polygon points="6,15 2,12 8,19" fill="#a855f7" />
          <polygon points="26,15 30,12 24,19" fill="#a855f7" />
          {/* Head & Horns */}
          <rect x="8" y="7" width="16" height="9" fill="#020617" />
          <rect x="9" y="8" width="14" height="7" fill="#1e1b4b" />
          <polygon points="8,7 3,0 11,5" fill="#6b21a8" />
          <polygon points="24,7 29,0 21,5" fill="#6b21a8" />
          {/* Glowing Eyes */}
          <rect x="11" y="10" width="3" height="2" fill="#f5d0fe" />
          <rect x="18" y="10" width="3" height="2" fill="#f5d0fe" />
          {/* Claws */}
          <rect x="9" y="25" width="4" height="4" fill="#020617" />
          <rect x="19" y="25" width="4" height="4" fill="#020617" />
        </PixelSvg>
      )

    case 5:
    default:
      // Legendary: Eclipse Sovereign of the Void with Ethereal Wings
      return (
        <PixelSvg size={size} className={className} viewBox="0 0 32 32">
          {/* Eclipse Void Ring */}
          <circle cx="16" cy="15" r="14" fill="#581c87" opacity="0.4" />
          <circle cx="16" cy="15" r="12" fill="#020617" />
          <circle cx="16" cy="15" r="13" fill="none" stroke="#e879f9" strokeWidth="1" opacity="0.8" />
          <ellipse cx="16" cy="30" rx="13" ry="3" fill="rgba(0,0,0,0.4)" />
          {/* Cosmic Void Wings */}
          <path d="M16 16 Q32 10 32 1 Q26 7 21 15 Z" fill="#3b0764" />
          <path d="M16 16 Q0 10 0 1 Q6 7 11 15 Z" fill="#3b0764" />
          {/* Sovereign Void Body */}
          <rect x="9" y="13" width="14" height="13" fill="#020617" />
          <rect x="10" y="14" width="12" height="11" fill="#1e1b4b" />
          <circle cx="16" cy="19" r="4" fill="#a855f7" />
          <circle cx="16" cy="19" r="2" fill="#ffffff" />
          {/* Crown of Dark Stars */}
          <polygon points="16,1 12,6 20,6" fill="#f5d0fe" />
          <polygon points="10,3 7,7 12,7" fill="#c084fc" />
          <polygon points="22,3 25,7 20,7" fill="#c084fc" />
          <rect x="8" y="7" width="16" height="8" fill="#020617" />
          <rect x="9" y="8" width="14" height="6" fill="#1e1b4b" />
          {/* Blinding Starlight Eyes */}
          <rect x="11" y="9" width="3" height="2" fill="#ffffff" />
          <rect x="18" y="9" width="3" height="2" fill="#ffffff" />
          {/* Claws */}
          <rect x="9" y="25" width="4" height="4" fill="#020617" />
          <rect x="19" y="25" width="4" height="4" fill="#020617" />
        </PixelSvg>
      )
  }
}
