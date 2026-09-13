// LIFEQUEST PROGRESSION ENGINE — Non-linear Level System
// Formula: XP required for level N = 100 * N^1.5

/**
 * Returns total lifetime XP required to reach level N.
 */
export function getXPForLevel(level: number): number {
  if (level <= 1) return 0
  return Math.floor(100 * Math.pow(level - 1, 1.5))
}

/**
 * Returns the XP threshold needed to advance from current level to next level.
 */
export function getXPToNextLevel(currentLevel: number): number {
  const currentLevelBaseXP = getXPForLevel(currentLevel)
  const nextLevelBaseXP = getXPForLevel(currentLevel + 1)
  return nextLevelBaseXP - currentLevelBaseXP
}

/**
 * Calculates current level and progress info from total lifetime XP.
 */
export function calculateLevelFromXP(lifetimeXP: number): {
  level: number
  currentLevelXP: number
  nextLevelXP: number
  progressPercent: number
} {
  let level = 1
  while (getXPForLevel(level + 1) <= lifetimeXP) {
    level++
  }

  const baseXP = getXPForLevel(level)
  const nextXP = getXPForLevel(level + 1)
  const requiredForNext = nextXP - baseXP
  const currentProgress = Math.max(0, lifetimeXP - baseXP)
  const progressPercent = requiredForNext > 0 
    ? Math.min(100, Math.round((currentProgress / requiredForNext) * 100))
    : 100

  return {
    level,
    currentLevelXP: currentProgress,
    nextLevelXP: requiredForNext,
    progressPercent,
  }
}
