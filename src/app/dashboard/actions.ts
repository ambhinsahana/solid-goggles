'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/utils/supabase/server'
import { calculateQuestRewards, QuestDifficulty, QuestPath } from '@/lib/progression/rewards'
import { calculateLevelFromXP } from '@/lib/progression/levels'
import { evaluateStreak } from '@/lib/progression/streaks'
import { getCharacterProgression } from '@/lib/characters/character-progression'
import * as fs from 'fs'
import * as path from 'path'

function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  return Boolean(url && key && url !== 'your-supabase-url' && key.length > 10)
}

/**
 * Saves the Supabase Anon Key provided by the user directly into .env.local
 */
export async function saveSupabaseConfig(formData: FormData) {
  const anonKey = (formData.get('anon_key') as string)?.trim()
  if (!anonKey) {
    return { error: 'Anon key cannot be empty' }
  }

  try {
    const envPath = path.join(process.cwd(), '.env.local')
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://quxmnzplekgvyycdoseu.supabase.co'
    const newContent = `NEXT_PUBLIC_SUPABASE_URL=${url}\nNEXT_PUBLIC_SUPABASE_ANON_KEY=${anonKey}\n`
    fs.writeFileSync(envPath, newContent, 'utf-8')
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = anonKey
    revalidatePath('/', 'layout')
    return { success: true }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to write .env.local'
    return { error: message }
  }
}

/**
 * Creates a new quest
 */
export async function createQuest(formData: FormData) {
  const title = (formData.get('title') as string)?.trim()
  const description = (formData.get('description') as string)?.trim() || null
  const pathType = (formData.get('path') as QuestPath) || 'Learning'
  const difficulty = (formData.get('difficulty') as QuestDifficulty) || 'Medium'
  const rawMode = (formData.get('mode') as string)?.trim()
  const mode = rawMode === 'overall_day' ? 'overall_day' : 'one_time'
  const plannedTimeStr = formData.get('planned_time') as string
  const plannedTime = plannedTimeStr ? parseInt(plannedTimeStr, 10) : null
  const deadline = (formData.get('deadline') as string)?.trim() || null
  const notes = (formData.get('notes') as string)?.trim() || null

  if (!title) {
    return { error: 'Quest title is required' }
  }

  if (!isSupabaseConfigured()) {
    return { 
      error: 'SUPABASE_NOT_CONFIGURED',
      quest: {
        id: 'local-' + Date.now(),
        user_id: 'local-adventurer',
        title,
        description,
        path: pathType,
        difficulty,
        mode,
        planned_time: plannedTime,
        deadline,
        notes,
        status: 'active',
        created_at: new Date().toISOString()
      }
    }
  }

  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return { error: 'Unauthorized. Please log in.' }
    }

    const { data, error } = await supabase.from('quests').insert({
      user_id: user.id,
      title,
      description,
      path: pathType,
      difficulty,
      mode,
      planned_time: plannedTime,
      deadline,
      notes,
      status: 'active',
    }).select().single()

    if (error) {
      return { error: error.message }
    }

    revalidatePath('/dashboard')
    return { success: true, quest: data }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to create quest'
    return { error: message }
  }
}

/**
 * Updates an existing quest (Title, Description, Path, Difficulty, Planned Time, Deadline, Notes)
 */
export async function updateQuest(formData: FormData) {
  const questId = (formData.get('id') as string)?.trim()
  const title = (formData.get('title') as string)?.trim()
  const description = (formData.get('description') as string)?.trim() || null
  const pathType = (formData.get('path') as QuestPath) || 'Learning'
  const difficulty = (formData.get('difficulty') as QuestDifficulty) || 'Medium'
  const rawMode = (formData.get('mode') as string)?.trim()
  const mode = rawMode === 'overall_day' ? 'overall_day' : 'one_time'
  const plannedTimeStr = formData.get('planned_time') as string
  const plannedTime = plannedTimeStr ? parseInt(plannedTimeStr, 10) : null
  const deadline = (formData.get('deadline') as string)?.trim() || null
  const notes = (formData.get('notes') as string)?.trim() || null

  if (!questId) {
    return { error: 'Quest ID is required for editing' }
  }
  if (!title) {
    return { error: 'Quest title cannot be empty' }
  }

  if (!isSupabaseConfigured()) {
    return { 
      error: 'SUPABASE_NOT_CONFIGURED',
      quest: {
        id: questId,
        title,
        description,
        path: pathType,
        difficulty,
        mode,
        planned_time: plannedTime,
        deadline,
        notes,
      }
    }
  }

  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return { error: 'Unauthorized. Please log in.' }
    }

    const { data, error } = await supabase
      .from('quests')
      .update({
        title,
        description,
        path: pathType,
        difficulty,
        mode,
        planned_time: plannedTime,
        deadline,
        notes,
      })
      .eq('id', questId)
      .eq('user_id', user.id)
      .select()
      .single()

    if (error) {
      return { error: error.message }
    }

    revalidatePath('/dashboard')
    return { success: true, quest: data }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to update quest'
    return { error: message }
  }
}

/**
 * Completes a quest and executes the server-side progression transaction
 */
export async function completeQuest(questId: string) {
  if (!questId) {
    return { error: 'Quest ID is required' }
  }

  if (!isSupabaseConfigured()) {
    return { error: 'SUPABASE_NOT_CONFIGURED' }
  }

  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return { error: 'Unauthorized' }
    }

    // 1. Fetch quest to verify ownership and active status
    const { data: quest, error: questError } = await supabase
      .from('quests')
      .select('*')
      .eq('id', questId)
      .eq('user_id', user.id)
      .single()

    if (questError || !quest) {
      return { error: 'Quest not found' }
    }

    if (quest.status === 'completed') {
      return { error: 'Quest is already completed' }
    }

    // 2. Calculate server-verified rewards with execution mode multiplier
    // ONE TIME = 100% full XP (1.0x); OVERALL DAY = flexible schedule 80% XP (0.8x)
    const isOneTime = (quest.mode || quest.execution_mode) !== 'overall_day'
    const baseRewards = calculateQuestRewards(quest.difficulty as QuestDifficulty, true)
    const multiplier = isOneTime ? 1.0 : 0.8
    const finalXp = Math.round(baseRewards.xp * multiplier)
    const rewards = {
      ...baseRewards,
      xp: finalXp,
      isOneTime,
      multiplier,
    }

    // 3. Fetch profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    const oldLevel = profile?.nexus_level || 1
    const currentXP = profile?.lifetime_xp || 0
    const currentCoins = profile?.nexus_coins || 0
    const newXP = currentXP + rewards.xp
    const newCoins = currentCoins + rewards.coins
    const { level: newLevel } = calculateLevelFromXP(newXP)

    const activeCharIndex = profile?.active_character_index ?? 0
    const oldProgression = getCharacterProgression(currentXP, activeCharIndex)
    const newProgression = getCharacterProgression(newXP, activeCharIndex)
    const evolved = newProgression.evolutionStage > oldProgression.evolutionStage

    // 4. Update Profile
    await supabase
      .from('profiles')
      .update({
        lifetime_xp: newXP,
        nexus_level: newLevel,
        nexus_coins: newCoins,
        character_evolution_stage: newProgression.evolutionStage,
      })
      .eq('id', user.id)

    // 5. Update Path Attributes
    const pathColumn = quest.path.toLowerCase()
    const { data: pathData } = await supabase
      .from('paths')
      .select('*')
      .eq('user_id', user.id)
      .single()

    if (pathData && pathColumn in pathData) {
      const currentVal = pathData[pathColumn] || 0
      await supabase
        .from('paths')
        .update({ [pathColumn]: currentVal + rewards.attributePoints })
        .eq('user_id', user.id)
    }

    // 6. Mark quest completed
    await supabase
      .from('quests')
      .update({
        status: 'completed',
        completed_at: new Date().toISOString(),
      })
      .eq('id', questId)
      .eq('user_id', user.id)

    // 7. Update Streak via authoritative evaluateStreak & upsert
    const todayStr = new Date().toISOString().split('T')[0]
    const { data: streakData } = await supabase
      .from('streaks')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle()

    const evaluated = evaluateStreak(
      streakData?.current_streak ?? 0,
      streakData?.longest_streak ?? 0,
      streakData?.last_qualifying_date ?? null
    )

    await supabase.from('streaks').upsert({
      user_id: user.id,
      current_streak: evaluated.newCurrentStreak,
      longest_streak: evaluated.newLongestStreak,
      last_qualifying_date: todayStr,
    })

    const streakResult = {
      currentStreak: evaluated.newCurrentStreak,
      longestStreak: evaluated.newLongestStreak,
      isConsecutive: evaluated.isConsecutive,
      isSameDay: evaluated.isSameDay,
    }

    // 8. Record into quest_completions audit log
    await supabase.from('quest_completions').insert({
      quest_id: questId,
      user_id: user.id,
      xp_earned: rewards.xp,
      coins_earned: rewards.coins,
      path_progressed: quest.path,
    })

    revalidatePath('/dashboard')
    return {
      success: true,
      rewards,
      oldLevel,
      newLevel,
      newXP,
      newCoins,
      streak: streakResult,
      leveledUp: newLevel > oldLevel,
      evolved,
      evolutionStage: newProgression.evolutionStage,
      characterName: newProgression.character.name,
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Quest completion failed'
    return { error: message }
  }
}

/**
 * Deletes a quest
 */
export async function deleteQuest(questId: string) {
  if (!questId) {
    return { error: 'Quest ID is required' }
  }

  if (!isSupabaseConfigured()) {
    return { error: 'SUPABASE_NOT_CONFIGURED' }
  }

  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return { error: 'Unauthorized' }
    }

    const { error } = await supabase
      .from('quests')
      .delete()
      .eq('id', questId)
      .eq('user_id', user.id)

    if (error) {
      return { error: error.message }
    }

    revalidatePath('/dashboard')
    return { success: true }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to delete quest'
    return { error: message }
  }
}

/**
 * Buys an item from the Armory/Shop with Gold
 */
export async function buyShopItem(itemId: string, itemPrice: number) {
  if (!itemId) return { error: 'Item ID is required' }

  if (!isSupabaseConfigured()) {
    return { error: 'SUPABASE_NOT_CONFIGURED' }
  }

  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'Unauthorized' }

    // Fetch user profile
    const { data: profile } = await supabase.from('profiles').select('nexus_coins').eq('id', user.id).single()
    const coins = profile?.nexus_coins || 0

    if (coins < itemPrice) {
      return { error: `Insufficient Gold. You have ${coins} G, but this item costs ${itemPrice} G.` }
    }

    // Check if already in inventory
    const { data: existing } = await supabase.from('inventory').select('id').eq('user_id', user.id).eq('item_id', itemId).single()
    if (existing) {
      return { error: 'You already own this item.' }
    }

    // Deduct gold
    await supabase.from('profiles').update({ nexus_coins: coins - itemPrice }).eq('id', user.id)

    // Add to inventory
    await supabase.from('inventory').insert({
      user_id: user.id,
      item_id: itemId,
      is_equipped: false
    })

    revalidatePath('/shop')
    revalidatePath('/character')
    revalidatePath('/dashboard')
    return { success: true, remainingCoins: coins - itemPrice }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Purchase failed'
    return { error: message }
  }
}

/**
 * Equips or unequips an inventory item
 */
export async function equipInventoryItem(itemId: string, equip: boolean = true) {
  if (!isSupabaseConfigured()) return { error: 'SUPABASE_NOT_CONFIGURED' }

  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'Unauthorized' }

    await supabase.from('inventory').update({ is_equipped: equip }).eq('user_id', user.id).eq('item_id', itemId)

    revalidatePath('/character')
    revalidatePath('/dashboard')
    return { success: true }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to equip item'
    return { error: message }
  }
}

/**
 * Attacks a Habit Monster by upholding discipline or completing anti-habit tasks
 */
export async function attackHabitMonster(monsterId: string, damage: number = 30) {
  if (!monsterId) return { error: 'Monster ID is required' }

  if (!isSupabaseConfigured()) return { error: 'SUPABASE_NOT_CONFIGURED' }

  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'Unauthorized' }

    const { data: monster } = await supabase.from('bad_habit_monsters').select('*').eq('id', monsterId).eq('user_id', user.id).single()
    if (!monster) return { error: 'Monster not found' }

    const newHp = Math.max(0, monster.current_hp - damage)
    const isDefeated = newHp === 0

    await supabase.from('bad_habit_monsters').update({
      current_hp: newHp,
      status: isDefeated ? 'defeated' : 'active',
      defeated_at: isDefeated ? new Date().toISOString() : null,
    }).eq('id', monsterId).eq('user_id', user.id)

    // If defeated, award a Mystery Box
    let mysteryBoxAwarded = false
    if (isDefeated) {
      await supabase.from('mystery_boxes').insert({
        user_id: user.id,
        source_monster_id: monsterId,
        is_opened: false,
        reward_type: 'Gold & Rare Title',
        reward_amount: 150,
      })
      mysteryBoxAwarded = true
    }

    revalidatePath('/monsters')
    revalidatePath('/dashboard')
    return { success: true, newHp, isDefeated, mysteryBoxAwarded }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Monster strike failed'
    return { error: message }
  }
}

/**
 * Opens a mystery box
 */
export async function openMysteryBox(boxId: string) {
  if (!isSupabaseConfigured()) return { error: 'SUPABASE_NOT_CONFIGURED' }

  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'Unauthorized' }

    const { data: box } = await supabase.from('mystery_boxes').select('*').eq('id', boxId).eq('user_id', user.id).single()
    if (!box || box.is_opened) return { error: 'Box not found or already opened' }

    const coinsReward = box.reward_amount || 100

    // Add gold to profile
    const { data: profile } = await supabase.from('profiles').select('nexus_coins').eq('id', user.id).single()
    const currentCoins = profile?.nexus_coins || 0

    await supabase.from('profiles').update({ nexus_coins: currentCoins + coinsReward }).eq('id', user.id)
    await supabase.from('mystery_boxes').update({ is_opened: true, opened_at: new Date().toISOString() }).eq('id', boxId)

    revalidatePath('/monsters')
    revalidatePath('/dashboard')
    return { success: true, coinsReward }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Opening mystery box failed'
    return { error: message }
  }
}

/**
 * Creates a new Habit Monster to conquer a negative habit
 */
export async function createHabitMonster(formData: FormData) {
  const name = (formData.get('name') as string)?.trim()
  const badHabit = (formData.get('bad_habit') as string)?.trim()
  const description = (formData.get('description') as string)?.trim() || null
  const threatLevel = parseInt((formData.get('threat_level') as string) || '1', 10)
  const maxHp = threatLevel === 3 ? 120 : threatLevel === 2 ? 90 : 60

  if (!name || !badHabit) {
    return { error: 'Monster name and habit description are required' }
  }

  if (!isSupabaseConfigured()) {
    return { error: 'SUPABASE_NOT_CONFIGURED' }
  }

  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'Unauthorized' }

    const { data, error } = await supabase.from('bad_habit_monsters').insert({
      user_id: user.id,
      name,
      bad_habit: badHabit,
      description,
      max_hp: maxHp,
      current_hp: maxHp,
      threat_level: threatLevel,
      status: 'active'
    }).select().single()

    if (error) return { error: error.message }

    revalidatePath('/monsters')
    return { success: true, monster: data }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to summon monster'
    return { error: message }
  }
}


