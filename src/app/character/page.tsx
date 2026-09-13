import { createClient } from '@/utils/supabase/server'
import { calculateLevelFromXP } from '@/lib/progression/levels'
import { SYSTEM_ACHIEVEMENTS } from '@/lib/progression/achievements'
import { Profile, PathStats, InventoryItem } from '@/lib/types'
import { Sparkles, Shield, Sword, Award, Flame, BookOpen, Dumbbell, Palette, Users, Zap, Check } from 'lucide-react'
import { CharacterInventory } from '@/components/character/character-inventory'
import { WorldScene } from '@/components/game/world-scene'
import { CharacterSprite } from '@/components/characters/character-sprite'
import { CharacterCodexRoster } from '@/components/character/character-codex-roster'
import { XpAnalyticsChart } from '@/components/character/xp-analytics-chart'
import { getCharacterProgression } from '@/lib/characters/character-progression'
import { getStageName } from '@/lib/characters/character-registry'

export default async function CharacterPage() {
  const isSupabaseConfigured = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && 
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY && 
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.length > 15
  )

  let isUserAuthenticated = false

  // True zero-state defaults for new players
  let profile: Profile = {
    id: 'hero',
    display_name: 'Adventurer',
    nexus_level: 1,
    lifetime_xp: 0,
    nexus_coins: 0,
    consistency_tier: 'Casual',
    active_creature_id: 1,
    active_character_index: 0,
    character_evolution_stage: 1,
  }

  let paths: PathStats = {
    user_id: 'hero',
    learning: 0,
    fitness: 0,
    creativity: 0,
    discipline: 0,
    social: 0,
  }

  // Real data only: No fake pre-equipped items
  let inventoryItems: InventoryItem[] = []
  let completions: { id: string; xp_earned: number; completed_at: string; path_progressed?: string }[] = []
  let unlockedAchievementIds = new Set<string>()

  if (isSupabaseConfigured) {
    try {
      const supabase = await createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        isUserAuthenticated = true
        const { data: profData } = await supabase.from('profiles').select('*').eq('id', user.id).single()
        if (profData) profile = profData as Profile

        const { data: pathData } = await supabase.from('paths').select('*').eq('user_id', user.id).single()
        if (pathData) paths = pathData as PathStats

        const { data: invData } = await supabase.from('inventory').select('*, shop_items(*)').eq('user_id', user.id)
        if (invData && invData.length > 0) {
          inventoryItems = invData.map((inv: any) => ({
            ...inv,
            item: inv.shop_items
          }))
        }

        const { data: achData } = await supabase.from('user_achievements').select('achievement_id').eq('user_id', user.id)
        if (achData) {
          unlockedAchievementIds = new Set(achData.map((a: any) => a.achievement_id))
        }

        // Fetch real quest completion transactions for XP Analytics
        const { data: compData } = await supabase
          .from('quest_completions')
          .select('id, xp_earned, completed_at, path_progressed')
          .eq('user_id', user.id)
          .order('completed_at', { ascending: true })

        if (compData) {
          completions = compData
        }
      }
    } catch {
      // Graceful fallback to default zero-state
    }
  }

  const levelInfo = calculateLevelFromXP(profile.lifetime_xp || 0)
  const equippedTitle = inventoryItems.find(i => i.is_equipped && i.item?.type === 'title')?.item?.name || 'Initiate'

  const activeCharIndex = profile.active_character_index ?? 0
  const charProgression = getCharacterProgression(profile.lifetime_xp || 0, activeCharIndex)
  const stageName = getStageName(charProgression.evolutionStage)

  const pathAttributes = [
    { name: 'Learning', value: paths.learning, icon: BookOpen, color: 'text-cyan-600 bg-cyan-50 border-cyan-200' },
    { name: 'Fitness', value: paths.fitness, icon: Dumbbell, color: 'text-rose-600 bg-rose-50 border-rose-200' },
    { name: 'Creativity', value: paths.creativity, icon: Palette, color: 'text-purple-600 bg-purple-50 border-purple-200' },
    { name: 'Discipline', value: paths.discipline, icon: Shield, color: 'text-amber-600 bg-amber-50 border-amber-200' },
    { name: 'Social', value: paths.social, icon: Users, color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
  ]

  return (
    <main className="relative min-h-screen bg-world-sky overflow-x-hidden pt-20 pb-16">
      <WorldScene />
      <div className="relative z-10 max-w-7xl mx-auto space-y-8 px-4 sm:px-6 lg:px-8">
        
        {/* ═══════════ CHARACTER HERO BANNER (Gamified World Style) ═══════════ */}
        <div className="parchment-card p-6 sm:p-8 relative overflow-hidden rounded-3xl border-2 border-world-accent/50 shadow-xl">
          <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10">
            {/* Active Character Sprite Avatar */}
            <div className="relative flex items-center justify-center p-3 rounded-2xl bg-black/5 border-2 border-world-accent shadow-md">
              <CharacterSprite
                characterIndex={activeCharIndex}
                evolutionStage={charProgression.evolutionStage}
                size={100}
                animated={true}
              />
              <span className="absolute -bottom-2.5 bg-world-accent text-world-panel font-black text-xs px-2.5 py-0.5 rounded-full shadow-md">
                LVL {levelInfo.level}
              </span>
            </div>

            {/* Identity & Level info */}
            <div className="space-y-2 text-center sm:text-left flex-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h1 className="text-3xl font-display font-extrabold text-world-text tracking-tight">
                  {profile.display_name}
                </h1>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 font-bold uppercase tracking-wider">
                  « {equippedTitle} »
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-world-accent/15 border border-world-accent/40 text-world-text font-bold">
                  {charProgression.character.name} • Stage {charProgression.evolutionStage} ({stageName})
                </span>
              </div>

              <div className="space-y-1 max-w-xl">
                <div className="flex justify-between text-xs text-[#8a7a6a] font-semibold">
                  <span>Progress to Level {levelInfo.level + 1}</span>
                  <span>{levelInfo.currentLevelXP} / {levelInfo.nextLevelXP} XP ({levelInfo.progressPercent}%)</span>
                </div>
                <div className="w-full bg-black/10 h-3 rounded-full overflow-hidden border border-black/10">
                  <div 
                    className="bg-gradient-to-r from-amber-400 to-amber-600 h-full transition-all duration-500 rounded-full"
                    style={{ width: `${levelInfo.progressPercent}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Treasury summary */}
            <div className="flex sm:flex-col gap-6 sm:gap-3 text-center sm:text-right border-t sm:border-t-0 sm:border-l border-black/10 pt-4 sm:pt-0 sm:pl-6">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#8a7a6a] font-bold block">Lifetime XP</span>
                <span className="text-2xl font-black font-display text-cyan-700">{profile.lifetime_xp || 0}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#8a7a6a] font-bold block">Gold Reserve</span>
                <span className="text-2xl font-black font-display text-amber-600">{profile.nexus_coins || 0} G</span>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════ 15-CHARACTER CODEX ROSTER ═══════════ */}
        <div className="parchment-card p-6 sm:p-8 rounded-3xl border-2 border-world-accent/40 shadow-xl">
          <CharacterCodexRoster
            currentLifetimeXp={profile.lifetime_xp || 0}
            activeCharacterIndex={activeCharIndex}
            isLoggedIn={isUserAuthenticated}
          />
        </div>

        {/* ═══════════ 2-Column Grid: Attributes & Companion ═══════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Attributes Matrix */}
          <div className="parchment-card p-6 space-y-6 rounded-3xl border border-black/10">
            <div className="flex items-center justify-between border-b border-black/10 pb-3">
              <h3 className="text-xl font-display font-black text-world-text tracking-tight flex items-center gap-2">
                <Sword className="w-5 h-5 text-world-accent" />
                PATH ATTRIBUTES (THE 5 DISCIPLINES)
              </h3>
              <span className="text-xs text-[#8a7a6a] font-semibold">Self-Mastery Points</span>
            </div>

            <div className="space-y-4">
              {pathAttributes.map((attr, i) => {
                const Icon = attr.icon
                const maxDisplay = 50
                const percent = Math.min(100, Math.round((attr.value / maxDisplay) * 100))
                return (
                  <div key={i} className="p-3.5 rounded-xl bg-black/5 border border-black/5 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className={`p-1.5 rounded-lg border ${attr.color}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-bold text-world-text font-display">{attr.name}</span>
                      </div>
                      <span className="text-sm font-black text-world-text">{attr.value} PTS</span>
                    </div>

                    <div className="w-full bg-black/10 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-amber-400 to-amber-600 h-full rounded-full"
                        style={{ width: `${Math.max(5, percent)}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Real Database XP Tracking Graph */}
          <XpAnalyticsChart completions={completions} />
        </div>

        {/* ═══════════ Interactive Wardrobe & Inventory ═══════════ */}
        <div className="parchment-card p-6 rounded-3xl border border-black/10">
          <CharacterInventory initialInventory={inventoryItems} />
        </div>

        {/* ═══════════ ACHIEVEMENT TROPHY HALL ═══════════ */}
        <div className="parchment-card p-6 space-y-6 rounded-3xl border border-black/10">
          <div className="flex items-center justify-between border-b border-black/10 pb-3">
            <h3 className="text-xl font-display font-black text-world-text tracking-tight flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              ACHIEVEMENT TROPHY HALL
            </h3>
            <div className="flex items-center gap-3">
              <span className="text-xs text-[#8a7a6a] font-semibold">
                {unlockedAchievementIds.size} / {SYSTEM_ACHIEVEMENTS.length} Unlocked
              </span>
              <div className="w-24 h-2 bg-black/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full transition-all" 
                  style={{ width: `${Math.round((unlockedAchievementIds.size / SYSTEM_ACHIEVEMENTS.length) * 100)}%` }} 
                />
              </div>
            </div>
          </div>

          {/* ──── STREAK MILESTONES (Consistency Focus) ──── */}
          {(() => {
            const streakAchs = SYSTEM_ACHIEVEMENTS.filter(a => a.category === 'Streaks')
            return (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-orange-500" />
                  <h4 className="text-sm font-black text-world-text uppercase tracking-wider font-display">
                    🔥 Consistency Milestones
                  </h4>
                  <span className="text-[10px] text-[#8a7a6a] font-semibold ml-auto">
                    {streakAchs.filter(a => unlockedAchievementIds.has(a.id)).length}/{streakAchs.length}
                  </span>
                </div>

                {/* Streak timeline */}
                <div className="relative">
                  <div className="absolute top-6 left-0 right-0 h-[2px] bg-black/10 z-0" />
                  <div 
                    className="absolute top-6 left-0 h-[2px] bg-gradient-to-r from-orange-500 to-amber-400 z-[1] transition-all duration-700"
                    style={{ 
                      width: `${Math.min(100, (streakAchs.filter(a => unlockedAchievementIds.has(a.id)).length / streakAchs.length) * 100)}%` 
                    }}
                  />

                  <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2 relative z-10">
                    {streakAchs.map((ach) => {
                      const isUnlocked = unlockedAchievementIds.has(ach.id)
                      return (
                        <div key={ach.id} className="flex flex-col items-center text-center group">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg transition-all duration-200 ${
                            isUnlocked 
                              ? 'bg-gradient-to-br from-amber-400/20 to-orange-500/20 border-2 border-amber-500 shadow-sm scale-105'
                              : 'bg-black/5 border border-black/10 opacity-40 group-hover:opacity-70'
                          }`}>
                            {isUnlocked ? '🏆' : '🔒'}
                          </div>
                          <span className={`text-[9px] font-bold mt-1.5 leading-tight ${isUnlocked ? 'text-amber-700' : 'text-[#8a7a6a]'}`}>
                            {ach.condition_value}d
                          </span>
                          <span className={`text-[8px] leading-tight max-w-[60px] truncate ${isUnlocked ? 'text-world-text' : 'text-[#8a7a6a]'}`}>
                            {ach.title.replace(/[🔥⚔️🛡️👑🏛️🌟💫🌍]\s?/g, '')}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            )
          })()}

          {/* ──── OTHER ACHIEVEMENTS (Quest / Level / Monster) ──── */}
          {(() => {
            const otherAchs = SYSTEM_ACHIEVEMENTS.filter(a => a.category !== 'Streaks')
            return (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                {otherAchs.map((ach) => {
                  const isUnlocked = unlockedAchievementIds.has(ach.id)
                  return (
                    <div
                      key={ach.id}
                      className={`p-4 rounded-xl border transition-all ${
                        isUnlocked
                          ? 'bg-amber-500/10 border-amber-500/30 shadow-sm'
                          : 'bg-black/5 border-black/5 opacity-50'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className={`p-2 rounded-lg text-lg ${isUnlocked ? '' : 'grayscale opacity-50'}`}>
                          {ach.category === 'Quests' ? '⚔️' : ach.category === 'Level' ? '⬆️' : '💀'}
                        </div>
                        {isUnlocked ? (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-700 flex items-center gap-1">
                            <Check className="w-3 h-3 stroke-[3]" /> Done
                          </span>
                        ) : (
                          <span className="text-[10px] text-[#8a7a6a] font-semibold uppercase">🔒 Locked</span>
                        )}
                      </div>
                      <h4 className="font-bold text-world-text text-sm">{ach.title}</h4>
                      <p className="text-[11px] text-[#8a7a6a] mt-1 line-clamp-2">{ach.description}</p>
                      <div className="mt-3 pt-2 border-t border-black/5 flex justify-between text-[11px] text-[#8a7a6a]">
                        <span className="flex items-center gap-1 font-bold text-cyan-700"><Zap className="w-3 h-3 text-cyan-600" />+{ach.xp_reward} XP</span>
                        <span className="text-amber-600 font-bold">+{ach.gold_reward} G</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            )
          })()}
        </div>
      </div>
    </main>
  )
}
