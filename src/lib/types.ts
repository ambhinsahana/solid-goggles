export type PathType = 'Learning' | 'Fitness' | 'Creativity' | 'Discipline' | 'Social'
export type QuestDifficulty = 'Easy' | 'Medium' | 'Hard' | 'Epic'
export type QuestStatus = 'active' | 'completed' | 'expired' | 'failed'

export interface Profile {
  id: string
  display_name: string
  public_uid?: string
  timezone?: string
  nexus_level: number
  lifetime_xp: number
  nexus_coins: number
  consistency_tier: string
  active_creature_id: number
  active_character_index?: number
  character_evolution_stage?: number
  created_at?: string
}

export interface PathStats {
  user_id: string
  learning: number
  fitness: number
  creativity: number
  discipline: number
  social: number
}

export interface Streak {
  user_id: string
  current_streak: number
  longest_streak: number
  last_qualifying_date?: string | null
  monthly_freezes_used?: number
  last_freeze_date?: string | null
}

export interface Creature {
  id: number
  name: string
  theme: string
  passive_name: string
  passive_description: string
  current_level?: number
}

export type QuestMode = 'one_time' | 'overall_day' | 'daily' | 'weekly' | 'epic' | 'one-off'

export interface Quest {
  id: string
  user_id: string
  title: string
  description?: string | null
  path: PathType
  difficulty: QuestDifficulty
  mode?: QuestMode
  deadline?: string | null
  planned_time?: number | null // in minutes
  recurrence?: string | null
  notes?: string | null
  status: QuestStatus
  reschedule_count?: number
  created_at?: string
  completed_at?: string | null
}

export interface QuestCompletion {
  id: string
  quest_id: string | null
  user_id: string
  xp_earned: number
  coins_earned: number
  path_progressed: PathType | null
  completed_at: string
}

export interface Achievement {
  id: string
  title: string
  description: string
  category: 'Quests' | 'Streaks' | 'Level' | 'Attributes' | 'Monsters'
  icon: string
  condition_type: 'quests_completed' | 'streak_days' | 'level_reached' | 'monsters_slain'
  condition_value: number
  xp_reward: number
  gold_reward: number
  unlocked?: boolean
  unlocked_at?: string | null
}

export interface UserAchievement {
  id: string
  user_id: string
  achievement_id: string
  unlocked_at: string
}

export type ShopItemType = 'title' | 'theme' | 'badge' | 'companion_skin' | 'consumable'
export type ItemRarity = 'Common' | 'Rare' | 'Epic' | 'Legendary'

export interface ShopItem {
  id: string
  name: string
  description: string
  type: ShopItemType
  price: number
  rarity: ItemRarity
  asset_icon: string
  is_active: boolean
  is_owned?: boolean
  is_equipped?: boolean
}

export interface InventoryItem {
  id: string
  user_id: string
  item_id: string
  is_equipped: boolean
  acquired_at: string
  item?: ShopItem
}

export interface HabitMonster {
  id: string
  user_id: string
  name: string
  bad_habit: string
  description?: string | null
  max_hp: number
  current_hp: number
  threat_level: number
  status: 'active' | 'defeated'
  created_at: string
  defeated_at?: string | null
}

export interface MysteryBox {
  id: string
  user_id: string
  source_monster_id?: string | null
  is_opened: boolean
  reward_type?: string | null
  reward_amount?: number | null
  created_at: string
  opened_at?: string | null
}

export interface PublicPlayerProfile {
  id: string
  display_name: string
  public_uid: string
  nexus_level: number
  lifetime_xp: number
  consistency_tier: string
  current_streak: number
  active_character_index: number
  character_evolution_stage: number
  character_name: string
}

export type FriendshipStatus = 'pending' | 'accepted' | 'declined'

export interface Friendship {
  id: string
  sender_id: string
  receiver_id: string
  status: FriendshipStatus
  created_at: string
  updated_at: string
  friend_profile?: PublicPlayerProfile
}

