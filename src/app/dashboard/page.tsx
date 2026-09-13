import { Suspense } from 'react'
import { createClient } from '@/utils/supabase/server'
import { QuestManager } from '@/components/dashboard/quest-manager'
import { MonstersArena } from '@/components/monsters/monsters-arena'
import { WorldScene } from '@/components/game/world-scene'
import { CharacterWorldScene } from '@/components/game/character-world-scene'
import { CharacterHud } from '@/components/game/character-hud'
import { TraitPanel } from '@/components/game/trait-panel'
import { QuestMonsterSwitcher } from '@/components/game/quest-monster-switcher'
import { Quest, Profile, HabitMonster, MysteryBox, PathStats } from '@/lib/types'
import { calculateLevelFromXP } from '@/lib/progression/levels'
import { getCharacterProgression } from '@/lib/characters/character-progression'
import { getStageName } from '@/lib/characters/character-registry'
import { getStableFallbackUid } from '@/lib/uid/uid-generator'

// Real data only: No fake demo entities
export default async function DashboardPage() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  const isSupabaseConfigured = Boolean(
    url && key && url !== 'your-supabase-url' && key.length > 15
  )

  let profile: Profile | null = null
  let quests: Quest[] = []
  let monsters: HabitMonster[] = []
  let boxes: MysteryBox[] = []
  let isUserAuthenticated = false
  let streakCount = 0

  let paths: PathStats = {
    user_id: 'hero',
    learning: 0,
    fitness: 0,
    creativity: 0,
    discipline: 0,
    social: 0,
  }

  if (isSupabaseConfigured) {
    try {
      const supabase = await createClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (user) {
        isUserAuthenticated = true

        // Fetch user profile from Supabase
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()

        if (profileData) {
          profile = profileData as Profile
        }

        // Fetch user streak
        const { data: streakData } = await supabase
          .from('streaks')
          .select('current_streak')
          .eq('user_id', user.id)
          .single()

        if (streakData) {
          streakCount = streakData.current_streak ?? 0
        }

        // Fallback streak if streaks table has pending RLS updates
        if (streakCount === 0 && profile?.consistency_tier?.includes('S:')) {
          const match = profile.consistency_tier.match(/S:(\d+)/)
          if (match) streakCount = parseInt(match[1], 10)
        }

        // Fetch user path stats
        const { data: pathData } = await supabase
          .from('paths')
          .select('*')
          .eq('user_id', user.id)
          .single()

        if (pathData) {
          paths = pathData as PathStats
        }

        // Fetch user quests - if user has no quests, keep empty array
        const { data: questsData } = await supabase
          .from('quests')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })

        if (questsData) {
          quests = questsData.map((q: any) => ({
            ...q,
            mode: q.mode || (q.recurrence === 'overall_day' || q.recurrence === 'one_time' ? q.recurrence : 'one_time')
          })) as Quest[]
        }

        // Fetch monsters
        const { data: dbMonsters } = await supabase
          .from('bad_habit_monsters')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })

        if (dbMonsters) {
          monsters = dbMonsters as HabitMonster[]
        }

        // Fetch mystery boxes
        const { data: dbBoxes } = await supabase
          .from('mystery_boxes')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })

        if (dbBoxes) {
          boxes = dbBoxes as MysteryBox[]
        }
      }
    } catch {
      // Graceful fallback to demo mode
    }
  }

  // True zero-state defaults for new or unauthenticated users
  if (!profile) {
    profile = {
      id: 'local-hero',
      display_name: 'Adventurer',
      nexus_level: 1,
      lifetime_xp: 0,
      nexus_coins: 0,
      consistency_tier: 'Casual',
      active_creature_id: 1,
      active_character_index: 0,
      character_evolution_stage: 1,
    }
  }

  // Ensure persistent collision-safe public UID
  if (!profile.public_uid) {
    profile.public_uid = getStableFallbackUid(profile.id)
  }

  const levelInfo = calculateLevelFromXP(profile.lifetime_xp || 0)
  const progression = getCharacterProgression(
    profile.lifetime_xp || 0,
    profile.active_character_index ?? 0
  )

  const currentStageName = getStageName(progression.evolutionStage)

  return (
    <main className="relative min-h-screen bg-world-sky overflow-x-hidden pt-20 pb-16">
      <WorldScene />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* ═══════════ TOP HERO GAME HUD ═══════════ */}
        <CharacterHud
          name={profile.display_name}
          publicUid={profile.public_uid}
          level={levelInfo.level}
          xp={profile.lifetime_xp || 0}
          coins={profile.nexus_coins || 0}
          title={`${progression.character.name} ${currentStageName}`}
          nextLevelXp={levelInfo.nextLevelXP}
          streak={streakCount}
          characterName={progression.character.name}
          evolutionStage={progression.evolutionStage}
          stageName={currentStageName}
          stageProgressPercent={progression.progressPercent}
          stageXpCurrent={progression.stageXpCurrent}
          stageXpRequired={progression.stageXpRequired}
        />

        {/* ═══════════ ANIMATED WORLD SCENE & FIVE DISCIPLINES ═══════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Hero Character World Scene with Idle Actions & Anime Environment */}
          <div className="lg:col-span-7 flex">
            <CharacterWorldScene
              characterIndex={progression.characterIndex}
              evolutionStage={progression.evolutionStage}
              characterName={progression.character.name}
              level={levelInfo.level}
              className="h-full min-h-[310px]"
            />
          </div>

          {/* Five Disciplines Trait Radar / Attributes Panel */}
          <div className="lg:col-span-5 flex">
            <TraitPanel paths={paths as unknown as Record<string, number>} className="h-full w-full" />
          </div>
        </div>

        {/* ═══════════ QUESTS & HABIT MONSTERS SWITCHER ═══════════ */}
        <div className="mt-8">
          <Suspense fallback={<div className="h-96 w-full flex items-center justify-center parchment-card">Loading realm contents...</div>}>
            <QuestMonsterSwitcher
              questsContent={
                <QuestManager
                  initialQuests={quests}
                  initialProfile={profile}
                  isSupabaseConnected={isSupabaseConfigured && isUserAuthenticated}
                />
              }
              monstersContent={
                <MonstersArena
                  initialMonsters={monsters}
                  initialBoxes={boxes}
                  isLoggedIn={isUserAuthenticated}
                />
              }
            />
          </Suspense>
        </div>
      </div>
    </main>
  )
}
