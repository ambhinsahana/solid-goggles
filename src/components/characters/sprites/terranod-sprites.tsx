import React from 'react'
import { PixelSvg, BaseSpriteProps } from './sprite-base'

export function TerranodSprite({ stage = 1, size = 128, className = '' }: BaseSpriteProps & { stage?: number }) {
  switch (stage) {
    case 1:
      // Sprout: Pebble armadillo with crystal sprout
      return (
        <PixelSvg size={size} className={className} viewBox="0 0 32 32">
          <ellipse cx="16" cy="29" rx="8" ry="2" fill="rgba(0,0,0,0.25)" />
          {/* Round Stone Shell */}
          <ellipse cx="16" cy="20" rx="7" ry="6" fill="#44403c" />
          <ellipse cx="16" cy="19" rx="6" ry="5" fill="#78716c" />
          {/* Amethyst Crystal Sprout */}
          <polygon points="16,11 14,14 18,14" fill="#a855f7" />
          <polygon points="16,12 15,14 17,14" fill="#c084fc" />
          {/* Snout & Eyes */}
          <polygon points="11,21 8,23 11,24" fill="#a8a29e" />
          <rect x="12" y="18" width="2" height="2" fill="#1c1917" />
          <rect x="12" y="18" width="1" height="1" fill="#c084fc" />
          {/* Short Stubby Feet */}
          <rect x="11" y="25" width="3" height="3" fill="#292524" />
          <rect x="18" y="25" width="3" height="3" fill="#292524" />
        </PixelSvg>
      )

    case 2:
      // Adept: Segmented stone carapace with crystal spines
      return (
        <PixelSvg size={size} className={className} viewBox="0 0 32 32">
          <ellipse cx="16" cy="29" rx="9" ry="2.5" fill="rgba(0,0,0,0.25)" />
          {/* Segmented Back Carapace */}
          <rect x="10" y="15" width="12" height="10" rx="3" fill="#44403c" />
          <rect x="11" y="16" width="10" height="8" rx="2" fill="#78716c" />
          {/* Crystal Spines */}
          <polygon points="13,11 11,15 15,15" fill="#a855f7" />
          <polygon points="19,11 17,15 21,15" fill="#a855f7" />
          <polygon points="16,9 14,14 18,14" fill="#c084fc" />
          {/* Stone Plated Snout & Head */}
          <rect x="7" y="17" width="6" height="5" fill="#57534e" />
          <rect x="9" y="18" width="2" height="2" fill="#c084fc" />
          {/* Plated Legs */}
          <rect x="10" y="24" width="3" height="4" fill="#292524" />
          <rect x="19" y="24" width="3" height="4" fill="#292524" />
        </PixelSvg>
      )

    case 3:
      // Evolved: Heavy Armored Geode Tank with Tail Mace
      return (
        <PixelSvg size={size} className={className} viewBox="0 0 32 32">
          <ellipse cx="16" cy="29" rx="11" ry="3" fill="rgba(0,0,0,0.3)" />
          {/* Spiked Crystal Tail Mace */}
          <rect x="22" y="20" width="5" height="3" fill="#44403c" />
          <circle cx="28" cy="21" r="3" fill="#a855f7" />
          <polygon points="28,17 29,19 31,19" fill="#e9d5ff" />
          {/* Heavy Plated Shell */}
          <rect x="8" y="13" width="16" height="13" rx="4" fill="#292524" />
          <rect x="9" y="14" width="14" height="11" rx="3" fill="#57534e" />
          {/* Glowing Crystal Geode Core */}
          <circle cx="16" cy="19" r="3.5" fill="#a855f7" />
          <circle cx="16" cy="19" r="2" fill="#f3e8ff" />
          {/* Back Quartz Clusters */}
          <polygon points="12,8 9,14 15,14" fill="#c084fc" />
          <polygon points="20,8 17,14 23,14" fill="#c084fc" />
          {/* Armored Head */}
          <rect x="6" y="16" width="5" height="6" fill="#44403c" />
          <rect x="8" y="17" width="2" height="2" fill="#e9d5ff" />
          {/* Heavy Clawed Paws */}
          <rect x="9" y="25" width="4" height="4" fill="#1c1917" />
          <rect x="17" y="25" width="4" height="4" fill="#1c1917" />
        </PixelSvg>
      )

    case 4:
      // Elite: Diamond Juggernaut with Spiked Carapace
      return (
        <PixelSvg size={size} className={className} viewBox="0 0 32 32">
          <ellipse cx="16" cy="30" rx="12" ry="3" fill="rgba(0,0,0,0.35)" />
          {/* Spiked Tail */}
          <rect x="23" y="19" width="6" height="4" fill="#292524" />
          <circle cx="30" cy="20" r="3.5" fill="#7e22ce" />
          <circle cx="30" cy="20" r="2" fill="#e9d5ff" />
          {/* Massive Geode Carapace */}
          <rect x="7" y="11" width="18" height="15" rx="5" fill="#1c1917" />
          <rect x="8" y="12" width="16" height="13" rx="4" fill="#44403c" />
          {/* Giant Sprouting Crystals */}
          <polygon points="10,6 6,12 13,12" fill="#a855f7" />
          <polygon points="16,4 12,11 20,11" fill="#c084fc" />
          <polygon points="22,6 18,12 25,12" fill="#a855f7" />
          {/* Core Eye */}
          <circle cx="16" cy="18" r="4" fill="#7e22ce" />
          <circle cx="16" cy="18" r="2" fill="#ffffff" />
          {/* Heavy Claws */}
          <rect x="8" y="25" width="5" height="4" fill="#1c1917" />
          <rect x="18" y="25" width="5" height="4" fill="#1c1917" />
        </PixelSvg>
      )

    case 5:
    default:
      // Legendary: Tectonic Titan with Orbiting Runic Monoliths
      return (
        <PixelSvg size={size} className={className} viewBox="0 0 32 32">
          {/* Floating Orbiting Crystals */}
          <polygon points="4,10 2,14 6,14" fill="#c084fc" opacity="0.8" />
          <polygon points="28,10 26,14 30,14" fill="#c084fc" opacity="0.8" />
          <polygon points="16,2 14,6 18,6" fill="#f3e8ff" />
          <ellipse cx="16" cy="30" rx="13" ry="3" fill="rgba(0,0,0,0.4)" />
          {/* Colossal Mountain Carapace */}
          <rect x="6" y="10" width="20" height="16" rx="6" fill="#1c1917" />
          <rect x="7" y="11" width="18" height="14" rx="5" fill="#44403c" />
          {/* Crown of Raw Amethyst Pillars */}
          <polygon points="10,4 6,11 14,11" fill="#7e22ce" />
          <polygon points="16,1 12,10 20,10" fill="#c084fc" />
          <polygon points="22,4 18,11 26,11" fill="#7e22ce" />
          {/* Tectonic Heart Gem */}
          <circle cx="16" cy="18" r="5" fill="#a855f7" />
          <circle cx="16" cy="18" r="3" fill="#ffffff" />
          {/* Heavy Granite Pillars */}
          <rect x="7" y="25" width="6" height="4" fill="#1c1917" />
          <rect x="19" y="25" width="6" height="4" fill="#1c1917" />
          {/* Eyes */}
          <rect x="6" y="15" width="2" height="2" fill="#ffffff" />
        </PixelSvg>
      )
  }
}
