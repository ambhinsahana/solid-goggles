'use client'

import React from 'react'
import { getCharacterByIndex, getCharacterById } from '@/lib/characters/character-registry'

// 15 Character Sprite Components
import { EmberfoxSprite } from './sprites/emberfox-sprites'
import { AqualynxSprite } from './sprites/aqualynx-sprites'
import { MosslingSprite } from './sprites/mossling-sprites'
import { ZephyrosSprite } from './sprites/zephyros-sprites'
import { SparkbeastSprite } from './sprites/sparkbeast-sprites'
import { TerranodSprite } from './sprites/terranod-sprites'
import { FrosthowlSprite } from './sprites/frosthowl-sprites'
import { ShadowshadeSprite } from './sprites/shadowshade-sprites'
import { PyrosaurSprite } from './sprites/pyrosaur-sprites'
import { GladehornSprite } from './sprites/gladehorn-sprites'
import { SolariaSprite } from './sprites/solaria-sprites'
import { VoidlingSprite } from './sprites/voidling-sprites'
import { IroncladSprite } from './sprites/ironclad-sprites'
import { MistweaverSprite } from './sprites/mistweaver-sprites'
import { StarlingSprite } from './sprites/starling-sprites'

export interface CharacterSpriteProps {
  characterId?: string
  characterIndex?: number
  evolutionStage?: number
  size?: number
  animated?: boolean
  className?: string
  silhouette?: boolean
}

export function CharacterSprite({
  characterId,
  characterIndex = 0,
  evolutionStage = 1,
  size = 128,
  animated = false,
  className = '',
  silhouette = false,
}: CharacterSpriteProps) {
  // Determine index from characterId or direct index
  let index = characterIndex
  if (characterId) {
    const char = getCharacterById(characterId)
    index = char.index
  }
  const safeIndex = Math.max(0, Math.min(14, index || 0))
  const safeStage = Math.max(1, Math.min(5, evolutionStage || 1))

  const renderSprite = () => {
    switch (safeIndex) {
      case 0:
        return <EmberfoxSprite stage={safeStage} size={size} />
      case 1:
        return <AqualynxSprite stage={safeStage} size={size} />
      case 2:
        return <MosslingSprite stage={safeStage} size={size} />
      case 3: // Voltimp (Thunder Imp)
        return <SparkbeastSprite stage={safeStage} size={size} />
      case 4: // Frostowl (Arctic Owl)
        return <FrosthowlSprite stage={safeStage} size={size} />
      case 5: // Stonecub (Earth Cub)
        return <TerranodSprite stage={safeStage} size={size} />
      case 6: // Bloomhare (Nature Hare)
        return <GladehornSprite stage={safeStage} size={size} />
      case 7: // Shadepup (Shadow Pup)
        return <ShadowshadeSprite stage={safeStage} size={size} />
      case 8: // Lumibee (Solar Bee)
        return <SolariaSprite stage={safeStage} size={size} />
      case 9: // Zephling (Air Sprite)
        return <ZephyrosSprite stage={safeStage} size={size} />
      case 10: // Magmahorn (Fire Horn)
        return <PyrosaurSprite stage={safeStage} size={size} />
      case 11: // Tidewyrm (Water Serpent)
        return <MistweaverSprite stage={safeStage} size={size} />
      case 12: // Mindmoth (Cosmic Moth)
        return <VoidlingSprite stage={safeStage} size={size} />
      case 13: // Ironimp (Clockwork Imp)
        return <IroncladSprite stage={safeStage} size={size} />
      case 14: // Starling (Astral Phoenix)
        return <StarlingSprite stage={safeStage} size={size} />
      default:
        return <EmberfoxSprite stage={safeStage} size={size} />
    }
  }

  const animationClass = animated ? 'animate-bob' : ''
  const silhouetteClass = silhouette ? 'filter brightness-0 contrast-200 opacity-25' : ''

  return (
    <div
      className={`inline-flex items-center justify-center relative select-none ${animationClass} ${silhouetteClass} ${className}`}
      style={{ width: size, height: size }}
    >
      {renderSprite()}
    </div>
  )
}
