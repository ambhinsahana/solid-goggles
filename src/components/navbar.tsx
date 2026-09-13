import { createClient } from '@/utils/supabase/server'
import { NavbarClient } from './navbar-client'

export async function Navbar() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  const isSupabaseConfigured = Boolean(
    url && key && url !== 'your-supabase-url' && key.length > 15
  )

  let isAuthenticated = false
  let displayName = 'Adventurer'
  let coins = 0
  let xp = 0
  let streak = 0

  if (isSupabaseConfigured) {
    try {
      const supabase = await createClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (user) {
        isAuthenticated = true
        displayName = user.user_metadata?.display_name || user.email?.split('@')[0] || 'Adventurer'

        // Fetch user profile stats
        const { data: profile } = await supabase
          .from('profiles')
          .select('nexus_coins, lifetime_xp, display_name, consistency_tier')
          .eq('id', user.id)
          .single()

        if (profile) {
          if (profile.display_name) displayName = profile.display_name
          coins = profile.nexus_coins ?? 0
          xp = profile.lifetime_xp ?? 0
        }

        // Fetch user streak
        const { data: streakData } = await supabase
          .from('streaks')
          .select('current_streak')
          .eq('user_id', user.id)
          .single()

        if (streakData) {
          streak = streakData.current_streak ?? 0
        }

        if (streak === 0 && profile?.consistency_tier?.includes('S:')) {
          const match = profile.consistency_tier.match(/S:(\d+)/)
          if (match) streak = parseInt(match[1], 10)
        }
      }
    } catch {
      // Graceful fallback to unauthenticated zero-state
    }
  }

  return (
    <NavbarClient
      isAuthenticated={isAuthenticated}
      displayName={displayName}
      coins={coins}
      xp={xp}
      streak={streak}
    />
  )
}
