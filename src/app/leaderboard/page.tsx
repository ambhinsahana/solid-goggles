import { createClient } from '@/utils/supabase/server'
import { LeaderboardView, LeaderboardEntry } from '@/components/leaderboard/leaderboard-view'

import { WorldScene } from '@/components/game/world-scene'

export const metadata = {
  title: 'Leaderboard — LifeQuest',
  description: 'Global Hall of Legends: Compete with disciplined adventurers worldwide in XP, Level, and unbroken streaks.',
}

import { getStableFallbackUid } from '@/lib/uid/uid-generator'

export default async function LeaderboardPage() {
  const isSupabaseConfigured = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.length > 15
  )

  let entries: LeaderboardEntry[] = []
  let currentUser = {
    id: 'local-hero',
    display_name: 'Adventurer',
    public_uid: getStableFallbackUid('local-hero'),
    nexus_level: 1,
    lifetime_xp: 0,
    consistency_tier: 'Casual',
    current_streak: 0,
    active_creature_name: 'Emberfox',
  }

  if (isSupabaseConfigured) {
    try {
      const supabase = await createClient()

      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('id, display_name, public_uid, nexus_level, lifetime_xp, consistency_tier, active_creature_id')
          .eq('id', user.id)
          .single()

        let userStreak = 0
        const { data: streakData } = await supabase
          .from('streaks')
          .select('current_streak')
          .eq('user_id', user.id)
          .single()
        if (streakData?.current_streak) {
          userStreak = streakData.current_streak
        }

        if (profile) {
          currentUser = {
            id: profile.id,
            display_name: profile.display_name || 'Adventurer',
            public_uid: profile.public_uid || getStableFallbackUid(profile.id),
            nexus_level: profile.nexus_level || 1,
            lifetime_xp: profile.lifetime_xp || 0,
            consistency_tier: profile.consistency_tier || 'Casual',
            current_streak: userStreak,
            active_creature_name: 'Emberfox',
          }
        }
      }

      // Fetch real registered profiles only with privacy-safe fields
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, display_name, public_uid, nexus_level, lifetime_xp, consistency_tier, active_creature_id')
        .order('lifetime_xp', { ascending: false })
        .limit(50)

      if (profiles && profiles.length > 0) {
        // Fetch streaks
        const { data: streaks } = await supabase
          .from('streaks')
          .select('user_id, current_streak')

        const streakMap = new Map<string, number>()
        if (streaks) {
          streaks.forEach((s: any) => streakMap.set(s.user_id, s.current_streak))
        }

        // Fetch creature names
        const { data: creatures } = await supabase
          .from('creatures')
          .select('id, name')

        const creatureMap = new Map<number, string>()
        if (creatures) {
          creatures.forEach((c: any) => creatureMap.set(c.id, c.name))
        }

        entries = profiles.map((p: any, idx: number) => ({
          rank: idx + 1,
          id: p.id,
          display_name: p.display_name || 'Adventurer',
          public_uid: p.public_uid || getStableFallbackUid(p.id),
          nexus_level: p.nexus_level || 1,
          lifetime_xp: p.lifetime_xp || 0,
          consistency_tier: p.consistency_tier || 'Casual',
          current_streak: streakMap.get(p.id) || 0,
          active_creature_name: creatureMap.get(p.active_creature_id) || 'Emberfox',
        }))
      }
    } catch {
      // If error occurs, keep empty array - never invent fake users
      entries = []
    }
  }

  return (
    <main className="relative min-h-screen bg-world-sky overflow-x-hidden pt-20 pb-16">
      <WorldScene />
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto text-white">
        <LeaderboardView initialEntries={entries} currentUser={currentUser} />
      </div>
    </main>
  )
}
