// LIFEQUEST SHOP & ECONOMY ENGINE
// Functional consumables + cosmetic collectibles

import { ShopItem } from '@/lib/types'

/**
 * ═══════════════════════════════════════════════════════════════
 * SHOP ECONOMY BALANCING NOTES
 * ═══════════════════════════════════════════════════════════════
 * Base coin earnings per quest:
 *   Easy    = 15 G
 *   Medium  = 30 G
 *   Hard    = 60 G
 *   Epic    = 120 G
 *
 * Average player does ~3 Medium quests/day ≈ 90 G/day
 * Streak Freezer (80 G) ≈ 1 day of effort — affordable safety net
 * Rescheduling (40 G) ≈ quick & cheap — encourages planning
 * XP Booster (200 G) ≈ 2+ days — meaningful investment
 * Mystery Box (120 G) ≈ exciting mid-tier gamble
 * ═══════════════════════════════════════════════════════════════
 */

export const SYSTEM_SHOP_ITEMS: ShopItem[] = [
  // ────────────────────────────────────────────────
  // SECTION 1: FUNCTIONAL CONSUMABLES (New RPG Items)
  // ────────────────────────────────────────────────
  {
    id: 'consumable_streak_freeze',
    name: '🧊 Streak Freezer',
    description: 'Protect your precious streak! Freeze your streak for 1 day when life gets in the way. You won\'t lose progress even if you miss a day. Limited to 2 uses per month.',
    type: 'consumable',
    price: 80,
    rarity: 'Rare',
    asset_icon: 'Shield',
    is_active: true,
  },
  {
    id: 'consumable_reschedule',
    name: '📜 Rescheduling Scroll',
    description: 'Time magic! Move any active quest to tomorrow without penalty. The quest stays alive, your rhythm stays intact. Perfect for when plans change.',
    type: 'consumable',
    price: 40,
    rarity: 'Common',
    asset_icon: 'Clock',
    is_active: true,
  },
  {
    id: 'consumable_xp_boost',
    name: '⚡ XP Booster',
    description: 'Channel raw arcane energy! Gain 1.5× XP on ALL quests completed in the next 24 hours. Stack the grind, level faster, become legendary.',
    type: 'consumable',
    price: 200,
    rarity: 'Epic',
    asset_icon: 'Zap',
    is_active: true,
  },
  {
    id: 'consumable_mystery_box',
    name: '🎁 Mystery Box',
    description: 'A shimmering chest of unknown origin. Could contain bonus Gold (50-500 G), rare XP drops, exclusive titles, or... absolutely nothing. Fortune favors the bold!',
    type: 'consumable',
    price: 120,
    rarity: 'Legendary',
    asset_icon: 'Gift',
    is_active: true,
  },

  // ────────────────────────────────────────────────
  // SECTION 2: COSMETIC COLLECTIBLES (Original Items)
  // ────────────────────────────────────────────────
  {
    id: 'title_shadowblade',
    name: 'Shadowblade',
    description: 'A title for focused, stealthy achievers who move in silence.',
    type: 'title',
    price: 150,
    rarity: 'Common',
    asset_icon: 'Tag',
    is_active: true,
  },
  {
    id: 'title_archmage',
    name: 'Grand Archmage',
    description: 'A prestigious title for intellect, deep study, and mental grit.',
    type: 'title',
    price: 300,
    rarity: 'Rare',
    asset_icon: 'Tag',
    is_active: true,
  },
  {
    id: 'title_unstoppable',
    name: 'The Unstoppable',
    description: 'A legendary title reserved only for masters of unbroken streaks.',
    type: 'title',
    price: 600,
    rarity: 'Legendary',
    asset_icon: 'Crown',
    is_active: true,
  },
  {
    id: 'badge_gold_phoenix',
    name: 'Phoenix Sigil',
    description: 'A flaming badge symbolizing constant personal reinvention.',
    type: 'badge',
    price: 200,
    rarity: 'Rare',
    asset_icon: 'Flame',
    is_active: true,
  },
  {
    id: 'badge_cyber_shield',
    name: 'Aegis of Will',
    description: 'A cyber shield badge recognizing supreme willpower and habit defense.',
    type: 'badge',
    price: 350,
    rarity: 'Epic',
    asset_icon: 'Shield',
    is_active: true,
  },
  {
    id: 'theme_crimson_void',
    name: 'Crimson Void Theme',
    description: 'A deep crimson theme accent for your Command Center interface.',
    type: 'theme',
    price: 500,
    rarity: 'Epic',
    asset_icon: 'Palette',
    is_active: true,
  },
]

export interface PurchaseValidationResult {
  allowed: boolean
  error?: string
}

/**
 * Validates whether a user can purchase an item.
 * Rules:
 * - User must have sufficient Gold.
 * - Unique items (titles, skins, themes) cannot be purchased twice.
 * - Consumables CAN be purchased multiple times (they stack).
 */
export function validateItemPurchase(
  userGold: number,
  item: ShopItem,
  alreadyOwned: boolean
): PurchaseValidationResult {
  // Consumables can be re-purchased
  if (alreadyOwned && item.type !== 'consumable') {
    return { allowed: false, error: 'You already own this item.' }
  }

  if (userGold < item.price) {
    return {
      allowed: false,
      error: `Insufficient Gold. You have ${userGold} G, but this item costs ${item.price} G.`,
    }
  }

  return { allowed: true }
}

/**
 * Mystery Box reward table — weighted random outcomes
 */
export interface MysteryBoxReward {
  type: 'gold' | 'xp' | 'title' | 'nothing'
  amount: number
  label: string
}

const MYSTERY_BOX_TABLE: { reward: MysteryBoxReward; weight: number }[] = [
  { reward: { type: 'gold', amount: 50, label: '50 Gold Coins' }, weight: 30 },
  { reward: { type: 'gold', amount: 150, label: '150 Gold Coins' }, weight: 20 },
  { reward: { type: 'gold', amount: 500, label: '💎 500 Gold Jackpot!' }, weight: 5 },
  { reward: { type: 'xp', amount: 200, label: '200 Bonus XP' }, weight: 25 },
  { reward: { type: 'xp', amount: 500, label: '⚡ 500 XP Surge!' }, weight: 8 },
  { reward: { type: 'nothing', amount: 0, label: '💨 Empty... bad luck!' }, weight: 12 },
]

export function rollMysteryBox(): MysteryBoxReward {
  const totalWeight = MYSTERY_BOX_TABLE.reduce((sum, entry) => sum + entry.weight, 0)
  let roll = Math.random() * totalWeight
  for (const entry of MYSTERY_BOX_TABLE) {
    roll -= entry.weight
    if (roll <= 0) return entry.reward
  }
  return MYSTERY_BOX_TABLE[0].reward
}
