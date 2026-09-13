// LIFEQUEST STREAK ENGINE — Authoritative Day-Streak Calculation

export interface StreakUpdateResult {
  newCurrentStreak: number
  newLongestStreak: number
  isConsecutive: boolean
  isSameDay: boolean
  wasBroken: boolean
}

/**
 * Calculates updated streak when a qualifying quest is completed.
 * Rule: Multiple quests completed on the same day DO NOT advance streak multiple times.
 */
export function evaluateStreak(
  currentStreak: number,
  longestStreak: number,
  lastQualifyingDate: string | null,
  activityDate: Date = new Date()
): StreakUpdateResult {
  const todayStr = activityDate.toISOString().split('T')[0]

  if (!lastQualifyingDate) {
    // First ever activity
    const newStreak = 1
    return {
      newCurrentStreak: newStreak,
      newLongestStreak: Math.max(longestStreak, newStreak),
      isConsecutive: true,
      isSameDay: false,
      wasBroken: false,
    }
  }

  const lastDate = new Date(lastQualifyingDate)
  const currentDate = new Date(todayStr)
  
  // Calculate difference in calendar days
  const diffTime = currentDate.getTime() - lastDate.getTime()
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 0) {
    // Activity on the same day — preserve existing streak
    return {
      newCurrentStreak: currentStreak,
      newLongestStreak: longestStreak,
      isConsecutive: false,
      isSameDay: true,
      wasBroken: false,
    }
  } else if (diffDays === 1) {
    // Exactly consecutive day
    const newStreak = currentStreak + 1
    return {
      newCurrentStreak: newStreak,
      newLongestStreak: Math.max(longestStreak, newStreak),
      isConsecutive: true,
      isSameDay: false,
      wasBroken: false,
    }
  } else {
    // Missed at least one calendar day — reset to 1
    const newStreak = 1
    return {
      newCurrentStreak: newStreak,
      newLongestStreak: longestStreak,
      isConsecutive: false,
      isSameDay: false,
      wasBroken: true,
    }
  }
}
