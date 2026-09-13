// LIFEQUEST REWARD SYSTEM

export type QuestDifficulty = 'Easy' | 'Medium' | 'Hard' | 'Epic'
export type QuestPath = 'Learning' | 'Fitness' | 'Creativity' | 'Discipline' | 'Social'

export interface QuestReward {
  xp: number
  coins: number
  attributePoints: number
}

const BASE_REWARDS: Record<QuestDifficulty, QuestReward> = {
  Easy: { xp: 50, coins: 15, attributePoints: 1 },
  Medium: { xp: 100, coins: 30, attributePoints: 2 },
  Hard: { xp: 200, coins: 60, attributePoints: 4 },
  Epic: { xp: 400, coins: 120, attributePoints: 8 },
}

/**
 * Computes server-verified rewards for completing a quest.
 */
export function calculateQuestRewards(
  difficulty: QuestDifficulty,
  hasPassiveBonus: boolean = false
): QuestReward {
  const base = BASE_REWARDS[difficulty] || BASE_REWARDS.Medium
  const multiplier = hasPassiveBonus ? 1.05 : 1.0 // 5% companion passive bonus

  return {
    xp: Math.round(base.xp * multiplier),
    coins: Math.round(base.coins * multiplier),
    attributePoints: base.attributePoints,
  }
}
