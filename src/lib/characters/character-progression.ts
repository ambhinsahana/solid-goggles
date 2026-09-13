import { CHARACTER_ROSTER, CharacterDef, getCharacterByIndex } from './character-registry'

// Cumulative thresholds within a single character's evolution journey
// Stage 1 -> 2: 200 XP
// Stage 2 -> 3: +500 XP = 700 XP
// Stage 3 -> 4: +1200 XP = 1900 XP
// Stage 4 -> 5: +2500 XP = 4400 XP (Legendary max form for this character)
export const STAGE_THRESHOLDS = [0, 200, 700, 1900, 4400] as const
export const XP_PER_CHARACTER = 4400
export const TOTAL_ROSTER_XP = XP_PER_CHARACTER * CHARACTER_ROSTER.length // 66,000 XP

export interface CharacterProgressResult {
  // Global progression
  highestUnlockedIndex: number
  totalUnlockedCount: number
  isEntireRosterMaxed: boolean
  
  // Specific character view (either active selection or auto-computed highest)
  character: CharacterDef
  characterIndex: number
  evolutionStage: number // 1 to 5
  
  // XP metrics for this stage
  stageXpCurrent: number
  stageXpRequired: number
  progressPercent: number
  isStageMaxed: boolean
  
  // Character overall progress
  characterLifetimeXp: number
  characterMaxXp: number
  characterPercent: number
}

/**
 * Calculates character evolution stage and XP breakdown for a specific character given their invested XP
 */
export function calculateStageFromCharacterXp(characterXp: number): {
  stage: number
  stageXpCurrent: number
  stageXpRequired: number
  progressPercent: number
  isMaxed: boolean
} {
  const safeXp = Math.max(0, characterXp)
  
  if (safeXp >= XP_PER_CHARACTER) {
    return {
      stage: 5,
      stageXpCurrent: 2500,
      stageXpRequired: 2500,
      progressPercent: 100,
      isMaxed: true,
    }
  }

  // Determine stage based on thresholds
  let stage = 1
  if (safeXp >= STAGE_THRESHOLDS[3]) {
    stage = 4
  } else if (safeXp >= STAGE_THRESHOLDS[2]) {
    stage = 3
  } else if (safeXp >= STAGE_THRESHOLDS[1]) {
    stage = 2
  } else {
    stage = 1
  }

  const stageFloor = STAGE_THRESHOLDS[stage - 1]
  const stageCeiling = STAGE_THRESHOLDS[stage]
  const stageXpRequired = stageCeiling - stageFloor
  const stageXpCurrent = safeXp - stageFloor
  const progressPercent = Math.min(100, Math.round((stageXpCurrent / stageXpRequired) * 100))

  return {
    stage,
    stageXpCurrent,
    stageXpRequired,
    progressPercent,
    isMaxed: false,
  }
}

/**
 * Calculates full character progression based on total player lifetime XP.
 * If user has explicitly selected a characterIndex, returns details for that character;
 * otherwise defaults to the player's highest unlocked character.
 */
export function getCharacterProgression(
  lifetimeXp: number = 0,
  preferredCharacterIndex?: number
): CharacterProgressResult {
  const safeLifetimeXp = Math.max(0, lifetimeXp || 0)
  
  // Calculate which character index is naturally reached
  const naturalIndex = Math.min(
    CHARACTER_ROSTER.length - 1,
    Math.floor(safeLifetimeXp / XP_PER_CHARACTER)
  )
  
  const totalUnlockedCount = Math.min(CHARACTER_ROSTER.length, naturalIndex + 1)
  const isEntireRosterMaxed = safeLifetimeXp >= TOTAL_ROSTER_XP

  // Active character: either the user's preferred character (if within unlocked bounds), or natural highest
  const selectedIndex = (preferredCharacterIndex !== undefined && preferredCharacterIndex <= naturalIndex)
    ? Math.max(0, Math.min(CHARACTER_ROSTER.length - 1, preferredCharacterIndex))
    : naturalIndex

  // Calculate XP specifically allocated to the selected character:
  // If viewing a previous character that was fully mastered, their character XP is maxed (4400)
  // If viewing the current actively advancing character, XP is remainder
  let charXp = 0
  if (selectedIndex < naturalIndex) {
    charXp = XP_PER_CHARACTER
  } else if (selectedIndex === naturalIndex) {
    charXp = safeLifetimeXp % XP_PER_CHARACTER
    if (isEntireRosterMaxed) charXp = XP_PER_CHARACTER
  } else {
    charXp = 0
  }

  const stageData = calculateStageFromCharacterXp(charXp)
  const character = getCharacterByIndex(selectedIndex)
  const characterPercent = Math.min(100, Math.round((charXp / XP_PER_CHARACTER) * 100))

  return {
    highestUnlockedIndex: naturalIndex,
    totalUnlockedCount,
    isEntireRosterMaxed,
    character,
    characterIndex: selectedIndex,
    evolutionStage: stageData.stage,
    stageXpCurrent: stageData.stageXpCurrent,
    stageXpRequired: stageData.stageXpRequired,
    progressPercent: stageData.progressPercent,
    isStageMaxed: stageData.isMaxed,
    characterLifetimeXp: charXp,
    characterMaxXp: XP_PER_CHARACTER,
    characterPercent,
  }
}

/**
 * Checks if a specific character index is unlocked given total lifetime XP
 */
export function isCharacterUnlocked(characterIndex: number, lifetimeXp: number): boolean {
  const requiredXp = characterIndex * XP_PER_CHARACTER
  return (lifetimeXp || 0) >= requiredXp
}

/**
 * Returns minimum XP required to unlock a character index
 */
export function getUnlockXpForCharacter(characterIndex: number): number {
  return characterIndex * XP_PER_CHARACTER
}
