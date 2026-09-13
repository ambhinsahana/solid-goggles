import React from 'react'
import { PixelSvg, BaseSpriteProps } from './sprite-base'

export function EmberfoxSprite({ stage = 1, size = 128, className = '' }: BaseSpriteProps & { stage?: number }) {
  switch (stage) {
    case 1:
      // Sprout: Baby flame fox kit
      return (
        <PixelSvg size={size} className={className} viewBox="0 0 32 32">
          {/* Shadow */}
          <ellipse cx="16" cy="29" rx="7" ry="2" fill="rgba(0,0,0,0.25)" />
          {/* Tail */}
          <rect x="20" y="19" width="3" height="3" fill="#ea580c" />
          <rect x="23" y="16" width="3" height="4" fill="#f97316" />
          <rect x="24" y="13" width="3" height="4" fill="#facc15" />
          <rect x="25" y="12" width="2" height="2" fill="#fef08a" />
          {/* Back Paws */}
          <rect x="11" y="26" width="3" height="3" fill="#9a3412" />
          <rect x="18" y="26" width="3" height="3" fill="#9a3412" />
          {/* Body */}
          <rect x="12" y="18" width="8" height="9" fill="#f97316" />
          <rect x="13" y="19" width="6" height="7" fill="#fb923c" />
          <rect x="14" y="21" width="4" height="5" fill="#fef3c7" />
          {/* Front Paws */}
          <rect x="13" y="27" width="2" height="2" fill="#7c2d12" />
          <rect x="17" y="27" width="2" height="2" fill="#7c2d12" />
          {/* Head */}
          <rect x="11" y="11" width="10" height="8" fill="#f97316" />
          <rect x="12" y="12" width="8" height="6" fill="#fb923c" />
          {/* Cheeks Cream */}
          <rect x="10" y="15" width="2" height="3" fill="#fef3c7" />
          <rect x="20" y="15" width="2" height="3" fill="#fef3c7" />
          {/* Snout */}
          <rect x="15" y="16" width="2" height="2" fill="#7c2d12" />
          {/* Big Cute Eyes */}
          <rect x="13" y="13" width="2" height="3" fill="#431407" />
          <rect x="13" y="13" width="1" height="1" fill="#ffffff" />
          <rect x="17" y="13" width="2" height="3" fill="#431407" />
          <rect x="17" y="13" width="1" height="1" fill="#ffffff" />
          {/* Ears */}
          <rect x="11" y="7" width="3" height="4" fill="#ea580c" />
          <rect x="12" y="8" width="1" height="2" fill="#fef3c7" />
          <rect x="18" y="7" width="3" height="4" fill="#ea580c" />
          <rect x="19" y="8" width="1" height="2" fill="#fef3c7" />
        </PixelSvg>
      )

    case 2:
      // Adept: Agile twin-flame fox
      return (
        <PixelSvg size={size} className={className} viewBox="0 0 32 32">
          <ellipse cx="16" cy="29" rx="9" ry="2.5" fill="rgba(0,0,0,0.25)" />
          {/* Twin Tails */}
          <path d="M21 21 H24 V17 H27 V12 H29 V9 H27 V11 H25 V14 H22 Z" fill="#ea580c" />
          <path d="M22 20 H25 V16 H28 V12 H27 V14 H24 V17 H22 Z" fill="#facc15" />
          <path d="M19 22 H22 V18 H25 V14 H24 V16 H21 V19 H19 Z" fill="#f97316" />
          {/* Legs & Body */}
          <rect x="10" y="24" width="3" height="5" fill="#7c2d12" />
          <rect x="19" y="24" width="3" height="5" fill="#7c2d12" />
          <rect x="11" y="16" width="10" height="9" fill="#ea580c" />
          <rect x="12" y="17" width="8" height="7" fill="#f97316" />
          <rect x="13" y="18" width="4" height="6" fill="#fef3c7" />
          {/* Head & Mane */}
          <rect x="9" y="9" width="14" height="9" fill="#ea580c" />
          <rect x="10" y="10" width="12" height="7" fill="#f97316" />
          {/* Fire Tuft on Chest */}
          <rect x="14" y="15" width="4" height="3" fill="#facc15" />
          {/* Eyes */}
          <rect x="12" y="11" width="2" height="3" fill="#1c1917" />
          <rect x="12" y="11" width="1" height="1" fill="#fbbf24" />
          <rect x="18" y="11" width="2" height="3" fill="#1c1917" />
          <rect x="18" y="11" width="1" height="1" fill="#fbbf24" />
          {/* Snout */}
          <rect x="15" y="14" width="2" height="2" fill="#431407" />
          {/* Long Fox Ears */}
          <rect x="9" y="4" width="3" height="6" fill="#c2410c" />
          <rect x="10" y="5" width="1" height="4" fill="#fef3c7" />
          <rect x="20" y="4" width="3" height="6" fill="#c2410c" />
          <rect x="21" y="5" width="1" height="4" fill="#fef3c7" />
          {/* Forehead Flame Diamond */}
          <rect x="15" y="8" width="2" height="2" fill="#facc15" />
        </PixelSvg>
      )

    case 3:
      // Evolved: Three-Tailed Warrior with Blazing Chest Rune
      return (
        <PixelSvg size={size} className={className} viewBox="0 0 32 32">
          <ellipse cx="16" cy="29" rx="10" ry="3" fill="rgba(0,0,0,0.3)" />
          {/* 3 Great Fire Tails */}
          <path d="M22 21 H25 V16 H29 V10 H31 V7 H28 V9 H26 V13 H23 Z" fill="#dc2626" />
          <path d="M21 20 H24 V15 H27 V9 H29 V7 H27 V9 H24 V13 H21 Z" fill="#f97316" />
          <path d="M20 22 H23 V17 H26 V11 H25 V13 H22 V17 H20 Z" fill="#facc15" />
          {/* Left Tail Wisp */}
          <path d="M10 21 H7 V16 H4 V11 H2 V8 H4 V10 H6 V14 H9 Z" fill="#f97316" />
          <path d="M8 18 H6 V13 H4 V10 H5 V12 H7 V15 H8 Z" fill="#facc15" />
          {/* Sturdy Armored Body */}
          <rect x="10" y="15" width="12" height="11" fill="#9a3412" />
          <rect x="11" y="16" width="10" height="9" fill="#ea580c" />
          {/* Flame Armor Plates */}
          <rect x="9" y="18" width="3" height="5" fill="#f97316" />
          <rect x="20" y="18" width="3" height="5" fill="#f97316" />
          {/* Chest Blazing Sun Rune */}
          <rect x="14" y="18" width="4" height="4" fill="#facc15" />
          <rect x="15" y="19" width="2" height="2" fill="#fffbeb" />
          {/* Paws */}
          <rect x="10" y="25" width="3" height="4" fill="#431407" />
          <rect x="19" y="25" width="3" height="4" fill="#431407" />
          {/* Mane and Head */}
          <rect x="8" y="8" width="16" height="9" fill="#c2410c" />
          <rect x="9" y="9" width="14" height="7" fill="#f97316" />
          {/* Ears with Fire Horns */}
          <polygon points="8,8 6,2 11,6" fill="#dc2626" />
          <polygon points="24,8 26,2 21,6" fill="#dc2626" />
          <rect x="8" y="4" width="2" height="3" fill="#facc15" />
          <rect x="22" y="4" width="2" height="3" fill="#facc15" />
          {/* Fierce Amber Eyes */}
          <rect x="11" y="11" width="3" height="2" fill="#451a03" />
          <rect x="12" y="11" width="2" height="1" fill="#fbbf24" />
          <rect x="18" y="11" width="3" height="2" fill="#451a03" />
          <rect x="18" y="11" width="2" height="1" fill="#fbbf24" />
          <rect x="15" y="13" width="2" height="2" fill="#1c1917" />
        </PixelSvg>
      )

    case 4:
      // Elite: Five-Tailed Magma Beast
      return (
        <PixelSvg size={size} className={className} viewBox="0 0 32 32">
          <ellipse cx="16" cy="30" rx="12" ry="3" fill="rgba(0,0,0,0.35)" />
          {/* 5 Expansive Tails fan */}
          <path d="M18 20 Q28 16 30 5 Q25 9 22 17 Z" fill="#b91c1c" />
          <path d="M19 19 Q29 14 31 7 Q26 11 23 16 Z" fill="#ea580c" />
          <path d="M20 18 Q27 12 28 8 Q24 12 21 16 Z" fill="#facc15" />
          <path d="M13 20 Q3 16 1 5 Q6 9 9 17 Z" fill="#b91c1c" />
          <path d="M12 19 Q2 14 0 7 Q5 11 8 16 Z" fill="#ea580c" />
          {/* Heavy Armored Body */}
          <rect x="9" y="14" width="14" height="12" fill="#7c2d12" />
          <rect x="10" y="15" width="12" height="10" fill="#c2410c" />
          {/* Magma Shoulder Guards */}
          <rect x="6" y="15" width="4" height="6" fill="#ef4444" />
          <rect x="7" y="16" width="2" height="4" fill="#facc15" />
          <rect x="22" y="15" width="4" height="6" fill="#ef4444" />
          <rect x="23" y="16" width="2" height="4" fill="#facc15" />
          {/* Core Sigil */}
          <circle cx="16" cy="19" r="3" fill="#fef08a" />
          <rect x="15" y="18" width="2" height="2" fill="#ffffff" />
          {/* Claws */}
          <rect x="9" y="25" width="4" height="4" fill="#292524" />
          <rect x="19" y="25" width="4" height="4" fill="#292524" />
          {/* Head & Crown Horns */}
          <rect x="8" y="7" width="16" height="9" fill="#9a3412" />
          <rect x="9" y="8" width="14" height="7" fill="#ea580c" />
          <polygon points="8,7 4,1 11,5" fill="#f97316" />
          <polygon points="24,7 28,1 21,5" fill="#f97316" />
          <polygon points="16,6 16,1 18,5" fill="#facc15" />
          {/* Glowing Eyes */}
          <rect x="11" y="10" width="3" height="2" fill="#facc15" />
          <rect x="12" y="10" width="1" height="1" fill="#ffffff" />
          <rect x="18" y="10" width="3" height="2" fill="#facc15" />
          <rect x="19" y="10" width="1" height="1" fill="#ffffff" />
        </PixelSvg>
      )

    case 5:
    default:
      // Legendary: Supreme Nine-Tails Celestial Fox
      return (
        <PixelSvg size={size} className={className} viewBox="0 0 32 32">
          {/* Celestial Solar Aura */}
          <circle cx="16" cy="15" r="14" fill="url(#emberAura)" opacity="0.4" />
          <defs>
            <radialGradient id="emberAura" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fef08a" stopOpacity="0.8" />
              <stop offset="60%" stopColor="#f97316" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
            </radialGradient>
          </defs>
          <ellipse cx="16" cy="30" rx="13" ry="3" fill="rgba(0,0,0,0.4)" />
          {/* Nine Flaming Celestial Tails Halo */}
          <path d="M16 18 Q31 16 32 3 Q27 8 23 16 Z" fill="#dc2626" />
          <path d="M17 17 Q30 11 31 1 Q26 7 22 15 Z" fill="#f97316" />
          <path d="M18 16 Q28 7 28 0 Q24 6 21 14 Z" fill="#facc15" />
          <path d="M16 18 Q1 16 0 3 Q5 8 9 16 Z" fill="#dc2626" />
          <path d="M15 17 Q2 11 1 1 Q6 7 10 15 Z" fill="#f97316" />
          <path d="M14 16 Q4 7 4 0 Q8 6 11 14 Z" fill="#facc15" />
          <path d="M16 15 Q16 4 16 -1 Q18 4 17 13 Z" fill="#fef08a" />
          {/* Mythic Body & Golden Armored Fur */}
          <rect x="9" y="13" width="14" height="13" fill="#7c2d12" />
          <rect x="10" y="14" width="12" height="11" fill="#ea580c" />
          <rect x="12" y="16" width="8" height="8" fill="#facc15" />
          <circle cx="16" cy="20" r="3" fill="#ffffff" />
          {/* Crown of Celestial Embers */}
          <polygon points="16,2 14,7 18,7" fill="#ffffff" />
          <polygon points="12,4 11,8 14,8" fill="#facc15" />
          <polygon points="20,4 21,8 18,8" fill="#facc15" />
          <rect x="8" y="7" width="16" height="8" fill="#c2410c" />
          <rect x="9" y="8" width="14" height="6" fill="#fb923c" />
          {/* Ethereal Eyes with Light Trails */}
          <rect x="11" y="9" width="3" height="2" fill="#ffffff" />
          <rect x="18" y="9" width="3" height="2" fill="#ffffff" />
          <rect x="10" y="10" width="1" height="1" fill="#facc15" />
          <rect x="21" y="10" width="1" height="1" fill="#facc15" />
          {/* Golden Paws */}
          <rect x="9" y="25" width="4" height="4" fill="#d97706" />
          <rect x="19" y="25" width="4" height="4" fill="#d97706" />
        </PixelSvg>
      )
  }
}
