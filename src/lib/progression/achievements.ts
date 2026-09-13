// LIFEQUEST ACHIEVEMENT ENGINE — Consistency-First Milestone System
// Redesigned: Milestones focus on CONSISTENCY over raw counts.
// Every 10 days until 50, then every 50 days onwards.

import { Achievement } from '@/lib/types'

export const SYSTEM_ACHIEVEMENTS: Achievement[] = [
  // ════════════════════════════════════════════
  //  CONSISTENCY MILESTONES (Core — Every 10 days to 50, then every 50)
  // ════════════════════════════════════════════
  {
    id: 'streak_10',
    title: '🔥 Ember of Discipline',
    description: 'Maintain a 10-day quest streak. The flame of consistency has been lit.',
    category: 'Streaks',
    icon: 'Flame',
    condition_type: 'streak_days',
    condition_value: 10,
    xp_reward: 150,
    gold_reward: 75,
  },
  {
    id: 'streak_20',
    title: '🔥🔥 Forge of Habit',
    description: 'Maintain a 20-day quest streak. Your daily rhythm is becoming second nature.',
    category: 'Streaks',
    icon: 'Flame',
    condition_type: 'streak_days',
    condition_value: 20,
    xp_reward: 300,
    gold_reward: 150,
  },
  {
    id: 'streak_30',
    title: '⚔️ Iron Will',
    description: 'Maintain a 30-day quest streak. One full month of unwavering discipline.',
    category: 'Streaks',
    icon: 'Shield',
    condition_type: 'streak_days',
    condition_value: 30,
    xp_reward: 500,
    gold_reward: 250,
  },
  {
    id: 'streak_40',
    title: '🛡️ Guardian of Purpose',
    description: 'Maintain a 40-day quest streak. Others falter. You endure.',
    category: 'Streaks',
    icon: 'Shield',
    condition_type: 'streak_days',
    condition_value: 40,
    xp_reward: 700,
    gold_reward: 350,
  },
  {
    id: 'streak_50',
    title: '👑 Apex Warrior',
    description: 'Maintain a 50-day quest streak. You have entered the realm of the elite.',
    category: 'Streaks',
    icon: 'Crown',
    condition_type: 'streak_days',
    condition_value: 50,
    xp_reward: 1000,
    gold_reward: 500,
  },
  {
    id: 'streak_100',
    title: '🏛️ Centurion of Discipline',
    description: '100-day quest streak. A living legend. Your name echoes through the halls.',
    category: 'Streaks',
    icon: 'Trophy',
    condition_type: 'streak_days',
    condition_value: 100,
    xp_reward: 2500,
    gold_reward: 1000,
  },
  {
    id: 'streak_150',
    title: '🌟 Ascendant',
    description: '150-day quest streak. You have transcended mere discipline.',
    category: 'Streaks',
    icon: 'Sparkles',
    condition_type: 'streak_days',
    condition_value: 150,
    xp_reward: 4000,
    gold_reward: 1500,
  },
  {
    id: 'streak_200',
    title: '💫 Eternal Flame',
    description: '200-day quest streak. Your dedication burns brighter than the stars.',
    category: 'Streaks',
    icon: 'Zap',
    condition_type: 'streak_days',
    condition_value: 200,
    xp_reward: 6000,
    gold_reward: 2500,
  },
  {
    id: 'streak_365',
    title: '🌍 Year One — Immortal',
    description: '365-day quest streak. One entire year without breaking. You are IMMORTAL.',
    category: 'Streaks',
    icon: 'Crown',
    condition_type: 'streak_days',
    condition_value: 365,
    xp_reward: 15000,
    gold_reward: 5000,
  },

  // ════════════════════════════════════════════
  //  QUEST COUNT MILESTONES (Secondary)
  // ════════════════════════════════════════════
  {
    id: 'first_quest',
    title: '🗡️ First Step',
    description: 'Complete your very first quest. Every journey begins here.',
    category: 'Quests',
    icon: 'Sparkles',
    condition_type: 'quests_completed',
    condition_value: 1,
    xp_reward: 50,
    gold_reward: 25,
  },
  {
    id: 'quest_25',
    title: '⚔️ Seasoned Adventurer',
    description: 'Complete 25 quests. You\'re no longer a novice.',
    category: 'Quests',
    icon: 'Sword',
    condition_type: 'quests_completed',
    condition_value: 25,
    xp_reward: 250,
    gold_reward: 150,
  },
  {
    id: 'quest_100',
    title: '🏆 Quest Centurion',
    description: 'Complete 100 quests. A true champion of productivity.',
    category: 'Quests',
    icon: 'Crown',
    condition_type: 'quests_completed',
    condition_value: 100,
    xp_reward: 1000,
    gold_reward: 500,
  },

  // ════════════════════════════════════════════
  //  LEVEL MILESTONES
  // ════════════════════════════════════════════
  {
    id: 'level_5',
    title: '⬆️ Rising Hero',
    description: 'Reach Character Level 5.',
    category: 'Level',
    icon: 'Zap',
    condition_type: 'level_reached',
    condition_value: 5,
    xp_reward: 200,
    gold_reward: 100,
  },
  {
    id: 'level_10',
    title: '🏅 Nexus Champion',
    description: 'Reach Character Level 10.',
    category: 'Level',
    icon: 'Crown',
    condition_type: 'level_reached',
    condition_value: 10,
    xp_reward: 500,
    gold_reward: 250,
  },

  // ════════════════════════════════════════════
  //  MONSTER SLAYER MILESTONES
  // ════════════════════════════════════════════
  {
    id: 'first_monster',
    title: '💀 Bane of Habits',
    description: 'Defeat your first Habit Monster.',
    category: 'Monsters',
    icon: 'Skull',
    condition_type: 'monsters_slain',
    condition_value: 1,
    xp_reward: 200,
    gold_reward: 100,
  },
]

export interface PlayerStats {
  questsCompletedCount: number
  currentStreak: number
  level: number
  monstersSlainCount: number
}

/**
 * Evaluates all system achievements against player stats.
 * Returns newly unlocked achievements that haven't been unlocked yet.
 */
export function checkNewAchievements(
  stats: PlayerStats,
  alreadyUnlockedIds: Set<string>
): Achievement[] {
  const newUnlocks: Achievement[] = []

  for (const ach of SYSTEM_ACHIEVEMENTS) {
    if (alreadyUnlockedIds.has(ach.id)) continue

    let isUnlocked = false
    switch (ach.condition_type) {
      case 'quests_completed':
        isUnlocked = stats.questsCompletedCount >= ach.condition_value
        break
      case 'streak_days':
        isUnlocked = stats.currentStreak >= ach.condition_value
        break
      case 'level_reached':
        isUnlocked = stats.level >= ach.condition_value
        break
      case 'monsters_slain':
        isUnlocked = stats.monstersSlainCount >= ach.condition_value
        break
    }

    if (isUnlocked) {
      newUnlocks.push(ach)
    }
  }

  return newUnlocks
}
