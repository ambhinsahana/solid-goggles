'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/utils/supabase/server'
import { getCharacterProgression } from '@/lib/characters/character-progression'

export async function setActiveCharacter(characterIndex: number) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { success: false, error: 'Unauthorized' }

    // Verify that characterIndex is unlocked for this user's XP
    const { data: profile } = await supabase
      .from('profiles')
      .select('lifetime_xp')
      .eq('id', user.id)
      .single()

    const lifetimeXp = profile?.lifetime_xp || 0
    const progression = getCharacterProgression(lifetimeXp)

    if (characterIndex > progression.highestUnlockedIndex) {
      return { success: false, error: 'Character is not unlocked yet' }
    }

    const { error } = await supabase
      .from('profiles')
      .update({ active_character_index: characterIndex })
      .eq('id', user.id)

    if (error) return { success: false, error: error.message }

    revalidatePath('/dashboard')
    revalidatePath('/character')
    return { success: true }
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to update active character' }
  }
}
