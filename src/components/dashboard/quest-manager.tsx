'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Quest, QuestDifficulty, PathType, Profile } from '@/lib/types'
import { createQuest, updateQuest, completeQuest, deleteQuest } from '@/app/dashboard/actions'
import { calculateLevelFromXP } from '@/lib/progression/levels'
import { Button } from '@/components/ui/button'
import { MorphSlider } from '@/components/ui/morph-slider'
import { gameAudio } from '@/lib/audio/game-audio'
import { LevelUpCeremony, LevelUpEventData } from '@/components/game/level-up-ceremony'
import { getStageName } from '@/lib/characters/character-registry'
import { 
  Plus, Edit3, Trash2, CheckCircle2, Sword, Clock, 
  Sparkles, X, AlertCircle, Coins, Flame
} from 'lucide-react'

const PATH_BADGES: Record<PathType, { bg: string; text: string; border: string }> = {
  Learning: { bg: 'bg-cyan-100', text: 'text-cyan-800', border: 'border-cyan-300' },
  Fitness: { bg: 'bg-rose-100', text: 'text-rose-800', border: 'border-rose-300' },
  Creativity: { bg: 'bg-purple-100', text: 'text-purple-800', border: 'border-purple-300' },
  Discipline: { bg: 'bg-amber-100', text: 'text-amber-800', border: 'border-amber-300' },
  Social: { bg: 'bg-emerald-100', text: 'text-emerald-800', border: 'border-emerald-300' },
}

const DIFFICULTY_REWARDS: Record<QuestDifficulty, { xp: number; coins: number; color: string }> = {
  Easy: { xp: 50, coins: 15, color: 'text-green-800 border-green-300 bg-green-100' },
  Medium: { xp: 100, coins: 30, color: 'text-blue-800 border-blue-300 bg-blue-100' },
  Hard: { xp: 200, coins: 60, color: 'text-purple-800 border-purple-300 bg-purple-100' },
  Epic: { xp: 400, coins: 120, color: 'text-orange-800 border-orange-400 bg-orange-100' },
}

const MODE_BADGES: Record<string, { label: string; style: string }> = {
  'one_time': { label: '⚡ One Time', style: 'bg-amber-100 text-amber-900 border-amber-300' },
  'overall_day': { label: '⏳ Overall Day', style: 'bg-sky-100 text-sky-900 border-sky-300' },
  'daily': { label: '⚡ One Time', style: 'bg-amber-100 text-amber-900 border-amber-300' },
  'weekly': { label: '⏳ Overall Day', style: 'bg-sky-100 text-sky-900 border-sky-300' },
  'epic': { label: '⚡ One Time', style: 'bg-amber-100 text-amber-900 border-amber-300' },
  'one-off': { label: '⚡ One Time', style: 'bg-amber-100 text-amber-900 border-amber-300' },
}

interface QuestManagerProps {
  initialQuests: Quest[]
  initialProfile: Profile | null
  isSupabaseConnected: boolean
}

export function QuestManager({ 
  initialQuests, 
  initialProfile, 
  isSupabaseConnected 
}: QuestManagerProps) {
  const router = useRouter()
  const [quests, setQuests] = useState<Quest[]>(initialQuests)
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active')
  const [editingQuest, setEditingQuest] = useState<Quest | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [completingQuestId, setCompletingQuestId] = useState<string | null>(null)
  const [levelUpData, setLevelUpData] = useState<LevelUpEventData | null>(null)
  const [feedbackMessage, setFeedbackMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null)
  const [profile, setProfile] = useState<Profile>(initialProfile || {
    id: 'local-user',
    display_name: 'Hero',
    nexus_level: 1,
    lifetime_xp: 0,
    nexus_coins: 0,
    consistency_tier: 'Casual',
    active_creature_id: 1,
  })

  const activeQuests = quests.filter(q => q.status === 'active')
  const completedQuests = quests.filter(q => q.status === 'completed')

  const showNotification = (text: string, type: 'success' | 'error' = 'success') => {
    setFeedbackMessage({ text, type })
    setTimeout(() => setFeedbackMessage(null), 4000)
  }

  // CREATE QUEST HANDLER
  const handleCreateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isSubmitting) return

    const form = e.currentTarget
    const formData = new FormData(form)
    const title = (formData.get('title') as string)?.trim()

    if (!title) {
      showNotification('Quest title is required', 'error')
      return
    }

    setIsSubmitting(true)
    try {
      const result = await createQuest(formData)

      if (result.error && result.error !== 'SUPABASE_NOT_CONFIGURED') {
        showNotification(result.error, 'error')
        setIsSubmitting(false)
        return
      }

      if (result.quest) {
        setQuests(prev => [result.quest as Quest, ...prev])
        setIsCreating(false)
        showNotification('Quest created successfully!')
        form.reset()
        router.refresh()
      } else if (result.error === 'SUPABASE_NOT_CONFIGURED') {
        // Local fallback create
        const newQuest: Quest = {
          id: 'local-' + Date.now(),
          user_id: profile.id,
          title,
          description: (formData.get('description') as string)?.trim() || null,
          path: (formData.get('path') as PathType) || 'Learning',
          difficulty: (formData.get('difficulty') as QuestDifficulty) || 'Medium',
          mode: (formData.get('mode') as 'one_time' | 'overall_day') || 'one_time',
          planned_time: formData.get('planned_time') ? parseInt(formData.get('planned_time') as string, 10) : null,
          notes: (formData.get('notes') as string)?.trim() || null,
          status: 'active',
          created_at: new Date().toISOString()
        }
        setQuests(prev => [newQuest, ...prev])
        setIsCreating(false)
        showNotification('Quest created successfully (Local Session)!')
      }
    } catch (err) {
      showNotification(err instanceof Error ? err.message : 'Failed to create quest', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  // UPDATE / EDIT QUEST HANDLER
  const handleUpdateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!editingQuest || isSubmitting) return

    setIsSubmitting(true)
    try {
      const formData = new FormData(e.currentTarget)
      formData.set('id', editingQuest.id)

      const result = await updateQuest(formData)

      if (result.error && result.error !== 'SUPABASE_NOT_CONFIGURED') {
        showNotification(result.error, 'error')
        setIsSubmitting(false)
        return
      }

      const updatedTitle = (formData.get('title') as string)?.trim() || editingQuest.title
      const updatedDesc = (formData.get('description') as string)?.trim() || null
      const updatedPath = formData.get('path') as PathType
      const updatedDiff = formData.get('difficulty') as QuestDifficulty
      const updatedMode = (formData.get('mode') as 'one_time' | 'overall_day') || 'one_time'
      const updatedTime = formData.get('planned_time') ? parseInt(formData.get('planned_time') as string, 10) : null
      const updatedNotes = (formData.get('notes') as string)?.trim() || null

      setQuests(prev => prev.map(q => {
        if (q.id === editingQuest.id) {
          return {
            ...q,
            title: updatedTitle,
            description: updatedDesc,
            path: updatedPath,
            difficulty: updatedDiff,
            mode: updatedMode,
            planned_time: updatedTime,
            notes: updatedNotes,
          }
        }
        return q
      }))

      setEditingQuest(null)
      showNotification('Quest updated successfully!')
      router.refresh()
    } catch (err) {
      showNotification(err instanceof Error ? err.message : 'Failed to update quest', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  // COMPLETE QUEST HANDLER
  const handleComplete = async (quest: Quest) => {
    if (completingQuestId) return
    setCompletingQuestId(quest.id)
    const rewards = DIFFICULTY_REWARDS[quest.difficulty] || DIFFICULTY_REWARDS.Medium
    gameAudio.playCoin()
    gameAudio.playFanfare()

    try {
      if (isSupabaseConnected) {
        const result = await completeQuest(quest.id)
        if (result.error) {
          showNotification(result.error, 'error')
          setCompletingQuestId(null)
          return
        }
        if (result.success) {
          setQuests(prev => prev.map(q => q.id === quest.id ? { ...q, status: 'completed' } : q))
          setProfile(prev => ({
            ...prev,
            lifetime_xp: result.newXP || prev.lifetime_xp + rewards.xp,
            nexus_level: result.newLevel || prev.nexus_level,
            nexus_coins: result.newCoins || prev.nexus_coins + rewards.coins,
            character_evolution_stage: result.evolutionStage || prev.character_evolution_stage,
          }))
          showNotification(`Quest Complete! +${result.rewards?.xp || rewards.xp} XP & +${result.rewards?.coins || rewards.coins} Coins!`)
          router.refresh()

          // Trigger Epic ~70% Viewport Level-Up & Evolution Ceremony
          if (result.leveledUp || result.evolved) {
            setLevelUpData({
              oldLevel: result.oldLevel ?? profile.nexus_level,
              newLevel: result.newLevel,
              characterIndex: profile.active_character_index ?? 0,
              characterName: result.characterName || 'Hero',
              evolutionStage: result.evolutionStage || profile.character_evolution_stage || 1,
              stageName: getStageName(result.evolutionStage || profile.character_evolution_stage || 1),
              evolved: Boolean(result.evolved),
              xpEarned: result.rewards?.xp || rewards.xp,
              coinsEarned: result.rewards?.coins || rewards.coins,
            })
          }
          setCompletingQuestId(null)
          return
        }
      }

      // Local execution fallback
      const isOneTime = quest.mode !== 'overall_day'
      const earnedXp = Math.round(rewards.xp * (isOneTime ? 1.0 : 0.8))
      const newXP = profile.lifetime_xp + earnedXp
      const newCoins = profile.nexus_coins + rewards.coins
      const { level: newLevel } = calculateLevelFromXP(newXP)
      const oldLevel = profile.nexus_level

      setQuests(prev => prev.map(q => q.id === quest.id ? { ...q, status: 'completed' } : q))
      setProfile(prev => ({
        ...prev,
        lifetime_xp: newXP,
        nexus_level: newLevel,
        nexus_coins: newCoins,
      }))
      showNotification(`Quest Complete! +${earnedXp} XP & +${rewards.coins} Coins!`)

      if (newLevel > oldLevel) {
        setLevelUpData({
          oldLevel,
          newLevel,
          characterIndex: profile.active_character_index ?? 0,
          characterName: 'Hero',
          evolutionStage: profile.character_evolution_stage || 1,
          stageName: getStageName(profile.character_evolution_stage || 1),
          evolved: false,
          xpEarned: earnedXp,
          coinsEarned: rewards.coins,
        })
      }
    } finally {
      setCompletingQuestId(null)
    }
  }

  // DELETE QUEST HANDLER
  const handleDelete = async (questId: string) => {
    if (!window.confirm('Are you sure you want to abandon and delete this quest?')) return
    gameAudio.playTap()
    setIsSubmitting(true)
    try {
      if (isSupabaseConnected) {
        const result = await deleteQuest(questId)
        if (result.error) {
          showNotification(result.error, 'error')
          return
        }
      }
      setQuests(prev => prev.filter(q => q.id !== questId))
      showNotification('Quest deleted')
      router.refresh()
    } catch (err) {
      showNotification(err instanceof Error ? err.message : 'Failed to delete quest', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const currentLevelInfo = calculateLevelFromXP(profile.lifetime_xp)

  return (
    <div className="space-y-8">
      {/* Toast Notification */}
      {feedbackMessage && (
        <div className={`p-4 rounded-xl text-sm font-semibold flex items-center gap-3 transition-all animate-in fade-in slide-in-from-top-2 ${
          feedbackMessage.type === 'success' 
            ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300' 
            : 'bg-red-500/20 border border-red-500/40 text-red-300'
        }`}>
          {feedbackMessage.type === 'success' ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <AlertCircle className="w-5 h-5 text-red-400" />}
          <span>{feedbackMessage.text}</span>
        </div>
      )}



      {/* Quest Engine Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <h2 className="text-2xl font-display font-black text-white tracking-tight">QUEST LOG</h2>
          {/* React Bits Morph Slider Tabs */}
          <MorphSlider
            options={[
              { id: 'active', label: 'Active Quests', icon: Sword, badge: String(activeQuests.length) },
              { id: 'completed', label: 'Hall of Fame', icon: CheckCircle2, badge: String(completedQuests.length) },
            ]}
            value={activeTab}
            onChange={(val) => {
              gameAudio.playSwoosh()
              setActiveTab(val as 'active' | 'completed')
            }}
            size="sm"
          />
        </div>

        <Button 
          onClick={() => {
            gameAudio.playPop()
            setIsCreating(true)
          }} 
          className="btn-clash-gold bg-gradient-to-r from-amber-400 to-amber-600 text-amber-950 font-black flex items-center gap-2 touch-bounce shadow-[0_4px_0_#92400e]"
        >
          <Plus className="w-4 h-4" />
          FORGE NEW QUEST
        </Button>
      </div>

      {/* Quests Display */}
      {activeTab === 'active' && (
        <div className="space-y-4">
          {activeQuests.length === 0 ? (
            <div className="glass-frosted p-12 text-center space-y-4 rounded-2xl border border-white/90 shadow-md">
              <Sword className="w-12 h-12 mx-auto text-amber-600 animate-bounce" />
              <div className="space-y-1">
                <h3 className="text-lg font-black text-amber-950 font-display">YOUR QUEST BOARD IS EMPTY</h3>
                <p className="text-sm text-amber-900/60 max-w-sm mx-auto font-bold">
                  No active quests found. Forge your first quest to begin leveling up.
                </p>
              </div>
              <Button
                onClick={() => {
                  gameAudio.playPop()
                  setIsCreating(true)
                }}
                className="btn-clash-gold bg-gradient-to-b from-amber-400 to-amber-600 text-amber-950 font-black touch-bounce"
              >
                <Plus className="w-4 h-4 mr-2" />
                CREATE FIRST QUEST
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeQuests.map((quest) => {
                const pathStyle = PATH_BADGES[quest.path] || PATH_BADGES.Learning
                const reward = DIFFICULTY_REWARDS[quest.difficulty] || DIFFICULTY_REWARDS.Medium

                return (
                  <div 
                    key={quest.id} 
                    className="relative glass-frosted border border-white/90 rounded-2xl p-5 shadow-[0_10px_30px_rgba(100,70,30,0.06)] text-world-text overflow-hidden group touch-bounce backdrop-blur-xl"
                  >
                    
                    <div className="space-y-3 relative z-10">
                      {/* Badge bar */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${pathStyle.bg} ${pathStyle.text} ${pathStyle.border}`}>
                            {quest.path}
                          </span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${reward.color}`}>
                            {quest.difficulty}
                          </span>
                          {quest.mode && (
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${MODE_BADGES[quest.mode]?.style || 'bg-amber-100 text-amber-900 border-amber-300'}`}>
                              {MODE_BADGES[quest.mode]?.label || '⚡ ONE TIME'}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2 text-xs font-bold text-amber-700">
                          <span>+{reward.xp} XP</span>
                          <span className="flex items-center gap-0.5"><Coins className="w-3.5 h-3.5 text-yellow-600" /> +{reward.coins} G</span>
                        </div>
                      </div>

                      {/* Content */}
                      <div>
                        <h3 className="text-lg font-bold text-[#2d1b11] group-hover:text-amber-900 transition-colors">
                          {quest.title}
                        </h3>
                        {quest.description && (
                          <p className="text-xs text-[#5c493c] mt-1 leading-relaxed line-clamp-2">
                            {quest.description}
                          </p>
                        )}
                      </div>

                      {/* Meta Info */}
                      {(quest.planned_time || quest.notes) && (
                        <div className="flex items-center gap-4 text-xs text-[#7d695b] pt-1">
                          {quest.planned_time && (
                            <div className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" />
                              <span>{quest.planned_time} mins</span>
                            </div>
                          )}
                          {quest.notes && (
                            <span className="truncate italic">Note: {quest.notes}</span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Bottom Action Bar */}
                    <div className="flex items-center justify-between pt-4 mt-4 border-t border-[#c2a878]/30 relative z-10">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => setEditingQuest(quest)}
                          className="p-1.5 rounded-lg text-[#7d695b] hover:text-[#2d1b11] hover:bg-black/5 transition-all"
                          title="Edit Quest"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(quest.id)}
                          className="p-1.5 rounded-lg text-[#7d695b] hover:text-red-700 hover:bg-red-500/10 transition-all"
                          title="Delete Quest"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <Button 
                        size="sm" 
                        onClick={() => handleComplete(quest)}
                        disabled={completingQuestId === quest.id}
                        className="btn-clash bg-gradient-to-r from-emerald-600 to-green-700 text-white font-black px-4 py-2 border-2 border-emerald-900 shadow-[2px_2px_0px_#064e3b] disabled:opacity-50"
                      >
                        <CheckCircle2 className="w-4 h-4 mr-1.5 stroke-[3]" />
                        {completingQuestId === quest.id ? 'COMPLETING...' : 'COMPLETE'}
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* Completed Quests Tab */}
      {activeTab === 'completed' && (
        <div className="space-y-4">
          {completedQuests.length === 0 ? (
            <div className="glass-panel p-12 text-center text-gray-500">
              <p>No completed quests yet. Complete active quests to see them in your Hall of Fame.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {completedQuests.map((quest) => (
                <div key={quest.id} className="relative bg-[#ebe3d1] border-2 border-[#d4c4a8] rounded p-4 opacity-75 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#7d695b] font-semibold">{quest.path} • {quest.difficulty}</span>
                    <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                    </span>
                  </div>
                  <h4 className="font-bold text-base line-through text-[#7d695b]">{quest.title}</h4>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* CREATE QUEST MODAL */}
      {isCreating && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel p-6 sm:p-8 max-w-lg w-full relative space-y-5 bg-nexus-bg border-nexus-neon/40 shadow-[0_0_30px_rgba(0,229,255,0.2)]">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-display font-bold text-white">FORGE NEW QUEST</h3>
              <button onClick={() => setIsCreating(false)} className="text-gray-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-nexus-neon uppercase">Quest Title *</label>
                <input
                  name="title"
                  required
                  placeholder="e.g. Read 20 pages of System Design"
                  className="w-full px-3 py-2 bg-black/50 border border-white/15 rounded-md focus:border-nexus-neon focus:outline-none text-white text-sm"
                  autoFocus
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-nexus-neon uppercase">Description</label>
                <textarea
                  name="description"
                  rows={2}
                  placeholder="Details, focus goals, or conditions..."
                  className="w-full px-3 py-2 bg-black/50 border border-white/15 rounded-md focus:border-nexus-neon focus:outline-none text-white text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-nexus-neon uppercase">Path Affinity</label>
                  <select
                    name="path"
                    defaultValue="Learning"
                    className="w-full px-3 py-2 bg-black/80 border border-white/15 rounded-md focus:border-nexus-neon focus:outline-none text-white text-sm"
                  >
                    <option value="Learning">Learning (Intellect)</option>
                    <option value="Fitness">Fitness (Strength)</option>
                    <option value="Creativity">Creativity (Art)</option>
                    <option value="Discipline">Discipline (Focus)</option>
                    <option value="Social">Social (Fellowship)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-nexus-neon uppercase">Execution Mode</label>
                  <select
                    name="mode"
                    defaultValue="one_time"
                    className="w-full px-3 py-2 bg-black/80 border border-white/15 rounded-md focus:border-nexus-neon focus:outline-none text-white text-sm"
                  >
                    <option value="one_time">⚡ ONE TIME (Continuous Sitting • 100% Full XP)</option>
                    <option value="overall_day">⏳ OVERALL DAY (Flexible Sessions • 80% XP)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-nexus-neon uppercase">Difficulty</label>
                  <select
                    name="difficulty"
                    defaultValue="Medium"
                    className="w-full px-3 py-2 bg-black/80 border border-white/15 rounded-md focus:border-nexus-neon focus:outline-none text-white text-sm"
                  >
                    <option value="Easy">Easy (50 XP / 15 G)</option>
                    <option value="Medium">Medium (100 XP / 30 G)</option>
                    <option value="Hard">Hard (200 XP / 60 G)</option>
                    <option value="Epic">Epic (400 XP / 120 G)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-nexus-neon uppercase">Planned Time (Minutes)</label>
                  <input
                    name="planned_time"
                    type="number"
                    min="1"
                    placeholder="e.g. 30"
                    className="w-full px-3 py-2 bg-black/50 border border-white/15 rounded-md focus:border-nexus-neon focus:outline-none text-white text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-nexus-neon uppercase">Deadline / Target</label>
                  <input
                    name="deadline"
                    type="date"
                    className="w-full px-3 py-2 bg-black/50 border border-white/15 rounded-md focus:border-nexus-neon focus:outline-none text-white text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-nexus-neon uppercase">Notes</label>
                <input
                  name="notes"
                  placeholder="Optional tips or reminders..."
                  className="w-full px-3 py-2 bg-black/50 border border-white/15 rounded-md focus:border-nexus-neon focus:outline-none text-white text-sm"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <Button type="button" variant="ghost" onClick={() => setIsCreating(false)} disabled={isSubmitting}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'FORGING...' : 'FORGE QUEST'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT QUEST MODAL */}
      {editingQuest && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel p-6 sm:p-8 max-w-lg w-full relative space-y-5 bg-nexus-bg border-nexus-neon/40 shadow-[0_0_30px_rgba(0,229,255,0.2)]">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-display font-bold text-white">EDIT QUEST</h3>
              <button onClick={() => setEditingQuest(null)} className="text-gray-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-nexus-neon uppercase">Quest Title *</label>
                <input
                  name="title"
                  defaultValue={editingQuest.title}
                  required
                  className="w-full px-3 py-2 bg-black/50 border border-white/15 rounded-md focus:border-nexus-neon focus:outline-none text-white text-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-nexus-neon uppercase">Description</label>
                <textarea
                  name="description"
                  defaultValue={editingQuest.description || ''}
                  rows={2}
                  className="w-full px-3 py-2 bg-black/50 border border-white/15 rounded-md focus:border-nexus-neon focus:outline-none text-white text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-nexus-neon uppercase">Path Affinity</label>
                  <select
                    name="path"
                    defaultValue={editingQuest.path}
                    className="w-full px-3 py-2 bg-black/80 border border-white/15 rounded-md focus:border-nexus-neon focus:outline-none text-white text-sm"
                  >
                    <option value="Learning">Learning (Intellect)</option>
                    <option value="Fitness">Fitness (Strength)</option>
                    <option value="Creativity">Creativity (Art)</option>
                    <option value="Discipline">Discipline (Focus)</option>
                    <option value="Social">Social (Fellowship)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-nexus-neon uppercase">Execution Mode</label>
                  <select
                    name="mode"
                    defaultValue={editingQuest.mode === 'overall_day' ? 'overall_day' : 'one_time'}
                    className="w-full px-3 py-2 bg-black/80 border border-white/15 rounded-md focus:border-nexus-neon focus:outline-none text-white text-sm"
                  >
                    <option value="one_time">⚡ ONE TIME (Continuous Sitting • 100% Full XP)</option>
                    <option value="overall_day">⏳ OVERALL DAY (Flexible Sessions • 80% XP)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-nexus-neon uppercase">Difficulty</label>
                  <select
                    name="difficulty"
                    defaultValue={editingQuest.difficulty}
                    className="w-full px-3 py-2 bg-black/80 border border-white/15 rounded-md focus:border-nexus-neon focus:outline-none text-white text-sm"
                  >
                    <option value="Easy">Easy (50 XP / 15 G)</option>
                    <option value="Medium">Medium (100 XP / 30 G)</option>
                    <option value="Hard">Hard (200 XP / 60 G)</option>
                    <option value="Epic">Epic (400 XP / 120 G)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-nexus-neon uppercase">Planned Time (Minutes)</label>
                  <input
                    name="planned_time"
                    type="number"
                    defaultValue={editingQuest.planned_time || ''}
                    placeholder="e.g. 30"
                    className="w-full px-3 py-2 bg-black/50 border border-white/15 rounded-md focus:border-nexus-neon focus:outline-none text-white text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-nexus-neon uppercase">Notes</label>
                  <input
                    name="notes"
                    defaultValue={editingQuest.notes || ''}
                    className="w-full px-3 py-2 bg-black/50 border border-white/15 rounded-md focus:border-nexus-neon focus:outline-none text-white text-sm"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <Button type="button" variant="ghost" onClick={() => setEditingQuest(null)} disabled={isSubmitting}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'SAVING...' : 'SAVE CHANGES'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ═══════════ EPIC ~70% VIEWPORT LEVEL-UP & EVOLUTION CEREMONY ═══════════ */}
      <LevelUpCeremony 
        eventData={levelUpData} 
        onDismiss={() => setLevelUpData(null)} 
      />
    </div>
  )
}
