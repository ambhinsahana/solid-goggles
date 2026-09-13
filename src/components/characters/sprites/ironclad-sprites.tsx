import React from 'react'
import { PixelSvg, BaseSpriteProps } from './sprite-base'

export function IroncladSprite({ stage = 1, size = 128, className = '' }: BaseSpriteProps & { stage?: number }) {
  switch (stage) {
    case 1:
      // Sprout: Cute round clockwork bot with winding key
      return (
        <PixelSvg size={size} className={className} viewBox="0 0 32 32">
          <ellipse cx="16" cy="29" rx="7" ry="2" fill="rgba(0,0,0,0.25)" />
          {/* Top Brass Winding Key */}
          <circle cx="16" cy="8" r="2.5" fill="none" stroke="#d97706" strokeWidth="1.5" />
          <rect x="15" y="10" width="2" height="3" fill="#d97706" />
          {/* Boxy Brass Body */}
          <rect x="11" y="13" width="10" height="12" rx="2" fill="#78716c" />
          <rect x="12" y="14" width="8" height="10" fill="#a8a29e" />
          {/* Rivets */}
          <circle cx="13" cy="15" r="0.5" fill="#44403c" />
          <circle cx="19" cy="15" r="0.5" fill="#44403c" />
          <circle cx="13" cy="22" r="0.5" fill="#44403c" />
          <circle cx="19" cy="22" r="0.5" fill="#44403c" />
          {/* Glowing Cyan LED Eyes */}
          <rect x="13" y="17" width="2" height="2" fill="#06b6d4" />
          <rect x="17" y="17" width="2" height="2" fill="#06b6d4" />
          {/* Little Gear Wheels */}
          <rect x="11" y="25" width="3" height="3" fill="#44403c" />
          <rect x="18" y="25" width="3" height="3" fill="#44403c" />
        </PixelSvg>
      )

    case 2:
      // Adept: Bipedal Brass Knight with Spinning Gear Core
      return (
        <PixelSvg size={size} className={className} viewBox="0 0 32 32">
          <ellipse cx="16" cy="29" rx="8" ry="2.5" fill="rgba(0,0,0,0.25)" />
          {/* Steam Pipes on Back */}
          <rect x="9" y="10" width="2" height="6" fill="#78716c" />
          <rect x="21" y="10" width="2" height="6" fill="#78716c" />
          {/* Brass Torso */}
          <rect x="10" y="14" width="12" height="10" rx="2" fill="#78716c" />
          <rect x="11" y="15" width="10" height="8" fill="#d97706" />
          {/* Spinning Center Gear */}
          <circle cx="16" cy="19" r="2.5" fill="#facc15" />
          <circle cx="16" cy="19" r="1" fill="#44403c" />
          {/* Armored Legs */}
          <rect x="10" y="24" width="3" height="5" fill="#44403c" />
          <rect x="19" y="24" width="3" height="5" fill="#44403c" />
          {/* Knight Visor Head */}
          <rect x="10" y="8" width="12" height="7" rx="1" fill="#78716c" />
          <rect x="11" y="10" width="10" height="2" fill="#06b6d4" />
        </PixelSvg>
      )

    case 3:
      // Evolved: Heavy Steam Golem with Pressure Exhaust
      return (
        <PixelSvg size={size} className={className} viewBox="0 0 32 32">
          <ellipse cx="16" cy="29" rx="10" ry="3" fill="rgba(0,0,0,0.3)" />
          {/* Exhaust Chimneys */}
          <rect x="8" y="6" width="3" height="8" fill="#44403c" />
          <polygon points="8,6 7,4 12,4 11,6" fill="#78716c" />
          <rect x="21" y="6" width="3" height="8" fill="#44403c" />
          <polygon points="21,6 20,4 25,4 24,6" fill="#78716c" />
          {/* Heavy Plated Torso */}
          <rect x="9" y="13" width="14" height="12" rx="3" fill="#44403c" />
          <rect x="10" y="14" width="12" height="10" fill="#b45309" />
          {/* Furnace Pressure Gauge */}
          <circle cx="16" cy="19" r="3.5" fill="#f59e0b" />
          <circle cx="16" cy="19" r="2" fill="#ef4444" />
          {/* Heavy Gauntlets */}
          <rect x="6" y="15" width="4" height="8" rx="1" fill="#78716c" />
          <rect x="22" y="15" width="4" height="8" rx="1" fill="#78716c" />
          {/* Helmet with Dual Cyan Lenses */}
          <rect x="9" y="7" width="14" height="7" fill="#44403c" />
          <circle cx="13" cy="10" r="1.5" fill="#22d3ee" />
          <circle cx="19" cy="10" r="1.5" fill="#22d3ee" />
          {/* Stomp Feet */}
          <rect x="9" y="25" width="4" height="4" fill="#1c1917" />
          <rect x="19" y="25" width="4" height="4" fill="#1c1917" />
        </PixelSvg>
      )

    case 4:
      // Elite: Colossal Siege Automaton with Steam Furnace
      return (
        <PixelSvg size={size} className={className} viewBox="0 0 32 32">
          <ellipse cx="16" cy="30" rx="12" ry="3" fill="rgba(0,0,0,0.35)" />
          {/* Chimneys emitting steam puffs */}
          <rect x="7" y="4" width="3" height="9" fill="#292524" />
          <circle cx="8" cy="2" r="2" fill="#cbd5e1" opacity="0.6" />
          <rect x="22" y="4" width="3" height="9" fill="#292524" />
          <circle cx="23" cy="2" r="2" fill="#cbd5e1" opacity="0.6" />
          {/* Colossal Chassis */}
          <rect x="8" y="12" width="16" height="14" rx="3" fill="#1c1917" />
          <rect x="9" y="13" width="14" height="12" fill="#44403c" />
          {/* Molten Furnace Core */}
          <circle cx="16" cy="19" r="4" fill="#f97316" stroke="#facc15" strokeWidth="1" />
          <circle cx="16" cy="19" r="2" fill="#ffffff" />
          {/* Massive Fist Gauntlets */}
          <rect x="4" y="14" width="5" height="10" rx="2" fill="#b45309" />
          <rect x="23" y="14" width="5" height="10" rx="2" fill="#b45309" />
          {/* Iron Horns / Crest */}
          <polygon points="10,6 7,0 13,4" fill="#78716c" />
          <polygon points="22,6 25,0 19,4" fill="#78716c" />
          {/* Visor */}
          <rect x="8" y="6" width="16" height="7" fill="#292524" />
          <rect x="10" y="8" width="12" height="2" fill="#f59e0b" />
          {/* Heavy Pillars */}
          <rect x="8" y="25" width="5" height="5" fill="#1c1917" />
          <rect x="19" y="25" width="5" height="5" fill="#1c1917" />
        </PixelSvg>
      )

    case 5:
    default:
      // Legendary: Grand Clockwork Engine of Time with Golden Chronometer Rings
      return (
        <PixelSvg size={size} className={className} viewBox="0 0 32 32">
          {/* Rotating Chronometer Ring */}
          <circle cx="16" cy="15" r="14" fill="none" stroke="#facc15" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.8" />
          <circle cx="16" cy="15" r="11" fill="none" stroke="#d97706" strokeWidth="1" />
          <ellipse cx="16" cy="30" rx="13" ry="3" fill="rgba(0,0,0,0.4)" />
          {/* Clockwork Titan Chassis */}
          <rect x="8" y="11" width="16" height="15" rx="4" fill="#1c1917" />
          <rect x="9" y="12" width="14" height="13" fill="#44403c" />
          {/* Chrono Heart Engine */}
          <circle cx="16" cy="18" r="5" fill="#facc15" stroke="#ffffff" strokeWidth="1.5" />
          <line x1="16" y1="18" x2="16" y2="15" stroke="#1c1917" strokeWidth="1" />
          <line x1="16" y1="18" x2="18" y2="18" stroke="#1c1917" strokeWidth="1" />
          {/* Crown of Golden Gears */}
          <polygon points="16,0 13,5 19,5" fill="#facc15" />
          <polygon points="9,2 7,6 12,6" fill="#d97706" />
          <polygon points="23,2 25,6 20,6" fill="#d97706" />
          <rect x="8" y="5" width="16" height="7" fill="#292524" />
          <rect x="9" y="6" width="14" height="5" fill="#78716c" />
          {/* Sunforge Eyes */}
          <rect x="11" y="7" width="3" height="2" fill="#ffffff" />
          <rect x="18" y="7" width="3" height="2" fill="#ffffff" />
          {/* Giant Gold Gauntlets */}
          <rect x="4" y="13" width="5" height="11" rx="2" fill="#facc15" />
          <rect x="23" y="13" width="5" height="11" rx="2" fill="#facc15" />
          {/* Golden Stomp Pillars */}
          <rect x="8" y="25" width="5" height="5" fill="#d97706" />
          <rect x="19" y="25" width="5" height="5" fill="#d97706" />
        </PixelSvg>
      )
  }
}
