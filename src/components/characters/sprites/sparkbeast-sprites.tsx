import React from 'react'
import { PixelSvg, BaseSpriteProps } from './sprite-base'

export function SparkbeastSprite({ stage = 1, size = 128, className = '' }: BaseSpriteProps & { stage?: number }) {
  switch (stage) {
    case 1:
      // Sprout: Fluffy thunder pup with zigzag lightning tail
      return (
        <PixelSvg size={size} className={className} viewBox="0 0 32 32">
          <ellipse cx="16" cy="29" rx="7" ry="2" fill="rgba(0,0,0,0.25)" />
          {/* Zigzag Lightning Tail */}
          <polygon points="20,20 25,17 23,20 28,15 25,22 21,22" fill="#eab308" />
          <polygon points="23,17 26,14 27,15" fill="#fef08a" />
          {/* Paws */}
          <rect x="11" y="26" width="3" height="3" fill="#a16207" />
          <rect x="18" y="26" width="3" height="3" fill="#a16207" />
          {/* Body */}
          <rect x="12" y="18" width="8" height="9" fill="#eab308" />
          <rect x="13" y="19" width="6" height="7" fill="#facc15" />
          <rect x="14" y="21" width="4" height="5" fill="#fef9c3" />
          {/* Head */}
          <rect x="11" y="11" width="10" height="8" fill="#ca8a04" />
          <rect x="12" y="12" width="8" height="6" fill="#facc15" />
          {/* Lightning Bolt Ears */}
          <polygon points="10,11 8,5 12,9" fill="#eab308" />
          <polygon points="22,11 24,5 20,9" fill="#eab308" />
          {/* Eyes */}
          <rect x="13" y="13" width="2" height="3" fill="#1e1b4b" />
          <rect x="13" y="13" width="1" height="1" fill="#38bdf8" />
          <rect x="17" y="13" width="2" height="3" fill="#1e1b4b" />
          <rect x="17" y="13" width="1" height="1" fill="#38bdf8" />
          <rect x="15" y="16" width="2" height="2" fill="#713f12" />
        </PixelSvg>
      )

    case 2:
      // Adept: Agile electric hound
      return (
        <PixelSvg size={size} className={className} viewBox="0 0 32 32">
          <ellipse cx="16" cy="29" rx="9" ry="2.5" fill="rgba(0,0,0,0.25)" />
          {/* Twin Bolt Tails */}
          <polygon points="20,21 27,15 25,18 29,12 26,20 21,23" fill="#eab308" />
          <polygon points="26,14 30,10 27,16" fill="#fef08a" />
          {/* Legs & Body */}
          <rect x="10" y="24" width="3" height="5" fill="#854d0e" />
          <rect x="19" y="24" width="3" height="5" fill="#854d0e" />
          <rect x="11" y="16" width="10" height="9" fill="#ca8a04" />
          <rect x="12" y="17" width="8" height="7" fill="#eab308" />
          {/* Spark on Chest */}
          <polygon points="16,17 15,21 17,21 16,24" fill="#38bdf8" />
          {/* Head */}
          <rect x="9" y="9" width="14" height="9" fill="#ca8a04" />
          <rect x="10" y="10" width="12" height="7" fill="#facc15" />
          {/* Sharp Bolt Ears */}
          <polygon points="9,9 6,3 12,7" fill="#eab308" />
          <polygon points="23,9 26,3 20,7" fill="#eab308" />
          {/* Electric Blue Eyes */}
          <rect x="12" y="11" width="2" height="3" fill="#0369a1" />
          <rect x="12" y="11" width="1" height="1" fill="#38bdf8" />
          <rect x="18" y="11" width="2" height="3" fill="#0369a1" />
          <rect x="18" y="11" width="1" height="1" fill="#38bdf8" />
        </PixelSvg>
      )

    case 3:
      // Evolved: Thunder Wolf with Plasma Mane
      return (
        <PixelSvg size={size} className={className} viewBox="0 0 32 32">
          <ellipse cx="16" cy="29" rx="10" ry="3" fill="rgba(0,0,0,0.3)" />
          {/* Plasma Tails */}
          <polygon points="21,20 29,12 26,16 31,8 27,19 22,22" fill="#ca8a04" />
          <polygon points="26,14 31,8 30,12" fill="#38bdf8" />
          {/* Sturdy Armored Body */}
          <rect x="10" y="15" width="12" height="11" fill="#713f12" />
          <rect x="11" y="16" width="10" height="9" fill="#ca8a04" />
          {/* Electric Collar Spikes */}
          <polygon points="8,15 5,17 9,19" fill="#38bdf8" />
          <polygon points="24,15 27,17 23,19" fill="#38bdf8" />
          <polygon points="16,16 14,21 18,21 16,25" fill="#fef08a" />
          {/* Paws */}
          <rect x="10" y="25" width="3" height="4" fill="#3f2e18" />
          <rect x="19" y="25" width="3" height="4" fill="#3f2e18" />
          {/* Head & Horn Crest */}
          <rect x="8" y="8" width="16" height="9" fill="#854d0e" />
          <rect x="9" y="9" width="14" height="7" fill="#eab308" />
          <polygon points="8,8 4,2 11,6" fill="#facc15" />
          <polygon points="24,8 28,2 21,6" fill="#facc15" />
          <polygon points="16,4 15,8 17,8" fill="#38bdf8" />
          {/* Glowing Eyes */}
          <rect x="11" y="11" width="3" height="2" fill="#0284c7" />
          <rect x="12" y="11" width="1" height="1" fill="#ffffff" />
          <rect x="18" y="11" width="3" height="2" fill="#0284c7" />
          <rect x="19" y="11" width="1" height="1" fill="#ffffff" />
        </PixelSvg>
      )

    case 4:
      // Elite: Bolt-Armored Raiju Predator
      return (
        <PixelSvg size={size} className={className} viewBox="0 0 32 32">
          <ellipse cx="16" cy="30" rx="12" ry="3" fill="rgba(0,0,0,0.35)" />
          {/* Static Particle Sparks */}
          <polygon points="3,10 6,8 5,12" fill="#38bdf8" />
          <polygon points="29,10 26,8 27,12" fill="#38bdf8" />
          {/* Heavy Armored Body */}
          <rect x="9" y="14" width="14" height="12" fill="#3f2e18" />
          <rect x="10" y="15" width="12" height="10" fill="#a16207" />
          {/* Plasma Shoulders */}
          <polygon points="7,15 3,18 8,22" fill="#facc15" />
          <polygon points="25,15 29,18 24,22" fill="#facc15" />
          <circle cx="16" cy="19" r="3.5" fill="#fef08a" stroke="#38bdf8" strokeWidth="1" />
          {/* Claws */}
          <rect x="9" y="25" width="4" height="4" fill="#1c1917" />
          <rect x="19" y="25" width="4" height="4" fill="#1c1917" />
          {/* Head & Corona */}
          <rect x="8" y="7" width="16" height="9" fill="#713f12" />
          <rect x="9" y="8" width="14" height="7" fill="#eab308" />
          <polygon points="8,7 3,0 11,5" fill="#eab308" />
          <polygon points="24,7 29,0 21,5" fill="#eab308" />
          <polygon points="16,2 14,7 18,7" fill="#38bdf8" />
          {/* Blinding Eyes */}
          <rect x="11" y="10" width="3" height="2" fill="#38bdf8" />
          <rect x="12" y="10" width="1" height="1" fill="#ffffff" />
          <rect x="18" y="10" width="3" height="2" fill="#38bdf8" />
          <rect x="19" y="10" width="1" height="1" fill="#ffffff" />
        </PixelSvg>
      )

    case 5:
    default:
      // Legendary: Raiju God of Thunder with Orbiting Lightning Rings
      return (
        <PixelSvg size={size} className={className} viewBox="0 0 32 32">
          {/* Orbiting Lightning Ring */}
          <circle cx="16" cy="15" r="14" fill="none" stroke="#facc15" strokeWidth="1.5" strokeDasharray="5 3" opacity="0.7" />
          <ellipse cx="16" cy="30" rx="13" ry="3" fill="rgba(0,0,0,0.4)" />
          {/* Mythic Lightning Wings/Tails */}
          <polygon points="16,18 31,10 26,17 32,2 24,14 18,17" fill="#eab308" />
          <polygon points="28,8 32,2 28,12" fill="#38bdf8" />
          <polygon points="16,18 1,10 6,17 0,2 8,14 14,17" fill="#eab308" />
          <polygon points="4,8 0,2 4,12" fill="#38bdf8" />
          {/* Celestial Body */}
          <rect x="9" y="13" width="14" height="13" fill="#3f2e18" />
          <rect x="10" y="14" width="12" height="11" fill="#ca8a04" />
          <circle cx="16" cy="19" r="4.5" fill="#ffffff" stroke="#eab308" strokeWidth="1.5" />
          {/* Divine Thunder Crown */}
          <polygon points="16,0 12,6 20,6" fill="#ffffff" />
          <polygon points="10,3 7,7 12,7" fill="#38bdf8" />
          <polygon points="22,3 25,7 20,7" fill="#38bdf8" />
          <rect x="8" y="7" width="16" height="8" fill="#713f12" />
          <rect x="9" y="8" width="14" height="6" fill="#facc15" />
          {/* Lightning Eyes */}
          <rect x="11" y="9" width="3" height="2" fill="#ffffff" />
          <rect x="18" y="9" width="3" height="2" fill="#ffffff" />
          {/* Golden Paws */}
          <rect x="9" y="25" width="4" height="4" fill="#a16207" />
          <rect x="19" y="25" width="4" height="4" fill="#a16207" />
        </PixelSvg>
      )
  }
}
