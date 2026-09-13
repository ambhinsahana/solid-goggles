'use client'

import { useState, useTransition, useCallback } from 'react'
import { ShopItem, ShopItemType } from '@/lib/types'
import { buyShopItem } from '@/app/dashboard/actions'
import { rollMysteryBox, MysteryBoxReward } from '@/lib/progression/shop'
import { 
  Coins, 
  Sparkles, 
  Shield, 
  Tag, 
  Flame, 
  Zap, 
  Crown, 
  Palette, 
  Check, 
  ShoppingBag, 
  Lock,
  ArrowRight,
  Sparkle,
  Clock,
  Gift,
  Package,
  Star,
  Swords,
  X
} from 'lucide-react'
import Link from 'next/link'

interface ShopCatalogProps {
  initialItems: ShopItem[]
  userGold: number
  ownedItemIds: string[]
  isLoggedIn: boolean
}

const ICON_MAP: Record<string, any> = {
  Tag,
  Flame,
  Shield,
  Sparkles,
  Zap,
  Palette,
  Crown,
  Clock,
  Gift,
}

const RARITY_CONFIG: Record<string, { 
  badge: string; border: string; glow: string; text: string; 
  gradient: string; particle: string; bgAccent: string 
}> = {
  Common: {
    badge: 'bg-slate-100 text-slate-700 border-slate-300',
    border: 'border-slate-300 hover:border-slate-400',
    glow: '',
    text: 'text-slate-800',
    gradient: 'from-slate-50 to-slate-100/50',
    particle: 'bg-slate-400',
    bgAccent: 'bg-slate-200',
  },
  Rare: {
    badge: 'bg-blue-100 text-blue-700 border-blue-300',
    border: 'border-blue-300 hover:border-blue-400',
    glow: 'hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]',
    text: 'text-blue-800',
    gradient: 'from-blue-50 to-cyan-100/50',
    particle: 'bg-blue-400',
    bgAccent: 'bg-blue-200',
  },
  Epic: {
    badge: 'bg-purple-100 text-purple-700 border-purple-300',
    border: 'border-purple-300 hover:border-purple-400',
    glow: 'hover:shadow-[0_0_35px_rgba(168,85,247,0.25)]',
    text: 'text-purple-800',
    gradient: 'from-purple-50 to-fuchsia-100/50',
    particle: 'bg-purple-400',
    bgAccent: 'bg-purple-200',
  },
  Legendary: {
    badge: 'bg-amber-100 text-amber-700 border-amber-400',
    border: 'border-amber-400 hover:border-amber-500',
    glow: 'shadow-[0_0_20px_rgba(245,158,11,0.15)] hover:shadow-[0_0_40px_rgba(245,158,11,0.35)]',
    text: 'text-amber-800',
    gradient: 'from-amber-50 to-orange-100/50',
    particle: 'bg-amber-400',
    bgAccent: 'bg-amber-200',
  },
}

const TYPE_LABELS: Record<string, { label: string; emoji: string }> = {
  consumable: { label: 'Power-Ups', emoji: '⚡' },
  title: { label: 'Titles', emoji: '🏷️' },
  badge: { label: 'Sigils', emoji: '🛡️' },
  theme: { label: 'Themes', emoji: '🎨' },
}

export function ShopCatalog({ initialItems, userGold: initialGold, ownedItemIds: initialOwned, isLoggedIn }: ShopCatalogProps) {
  const [gold, setGold] = useState(initialGold)
  const [ownedSet, setOwnedSet] = useState<Set<string>>(new Set(initialOwned))
  const [isPending, startTransition] = useTransition()
  const [purchasingId, setPurchasingId] = useState<string | null>(null)
  const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
  const [mysteryReward, setMysteryReward] = useState<MysteryBoxReward | null>(null)
  const [isBoxOpening, setIsBoxOpening] = useState(false)

  const handlePurchase = useCallback((item: ShopItem) => {
    if (!isLoggedIn) {
      setFeedback({ message: '🔒 Sign in to access the Armory!', type: 'error' })
      return
    }

    if (ownedSet.has(item.id) && item.type !== 'consumable') {
      setFeedback({ message: '📦 You already own this item.', type: 'error' })
      return
    }

    if (gold < item.price) {
      setFeedback({ 
        message: `💰 Need ${item.price - gold} more Gold. Complete quests to earn more!`, 
        type: 'error' 
      })
      return
    }

    // Handle Mystery Box special flow
    if (item.id === 'consumable_mystery_box') {
      setIsBoxOpening(true)
      setMysteryReward(null)
      setGold(prev => prev - item.price)

      setTimeout(() => {
        const reward = rollMysteryBox()
        setMysteryReward(reward)
        setIsBoxOpening(false)
      }, 2000)

      startTransition(async () => {
        await buyShopItem(item.id, item.price)
      })
      return
    }

    setFeedback(null)
    setPurchasingId(item.id)

    // Optimistic purchase
    setGold(prev => prev - item.price)
    if (item.type !== 'consumable') {
      setOwnedSet(prev => new Set([...prev, item.id]))
    }

    startTransition(async () => {
      const res = await buyShopItem(item.id, item.price)
      setPurchasingId(null)

      if (res.error && res.error !== 'SUPABASE_NOT_CONFIGURED') {
        setGold(prev => prev + item.price)
        if (item.type !== 'consumable') {
          setOwnedSet(prev => {
            const next = new Set(prev)
            next.delete(item.id)
            return next
          })
        }
        setFeedback({ message: res.error, type: 'error' })
      } else {
        const effectMsg = getItemEffectMessage(item)
        setFeedback({ message: effectMsg, type: 'success' })
      }
    })
  }, [isLoggedIn, ownedSet, gold, startTransition])

  // Functional consumables only (Streak Freezer, Rescheduling Scroll, XP Booster, Mystery Box)
  const consumables = initialItems.filter(i => i.type === 'consumable')

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* ═══ SHOP HERO BANNER - Parchment Gamified ═══ */}
      <div className="relative overflow-hidden rounded-2xl bg-[#FDF9F1] border-2 border-[#E5D3B3] p-8 sm:p-10 shadow-sm">
        {/* Subtle texture overlay */}
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none mix-blend-multiply"
          style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/aged-paper.png")' }}
        />
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-amber-100 border border-amber-300 text-amber-800 text-xs font-black mb-3 tracking-wide uppercase shadow-[0_2px_0_rgba(252,211,77,1)]">
              <ShoppingBag className="w-3.5 h-3.5" />
              Nexus Armory & Bazaar
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-[#3D2C1E] tracking-tight drop-shadow-sm">
              Spend Your Spoils
            </h1>
            <p className="text-sm sm:text-base text-[#8A7A6A] mt-2 max-w-xl font-medium">
              Power-ups to boost your grind. Cosmetics to flex your status. 
              Every coin earned through discipline — spend it wisely, warrior.
            </p>
          </div>

          {/* Gold Vault */}
          <div className="flex items-center gap-4 px-6 py-5 rounded-2xl bg-white border-2 border-[#E5D3B3] shadow-[0_4px_0_#E5D3B3] min-w-[200px]">
            <div className="p-3.5 rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 text-white shadow-[0_2px_0_#b45309]">
              <Coins className="w-7 h-7" />
            </div>
            <div>
              <span className="text-[10px] font-black text-[#8A7A6A] uppercase tracking-widest block">
                Gold Vault
              </span>
              <span className="text-3xl font-black text-amber-500 tracking-tight flex items-baseline gap-1 drop-shadow-sm">
                {gold.toLocaleString()} <span className="text-lg font-bold text-amber-400">G</span>
              </span>
            </div>
          </div>
        </div>

        {/* Feedback */}
        {feedback && (
          <div
            className={`mt-6 p-4 rounded-xl border-2 text-sm font-bold flex items-center justify-between transition-all relative z-10 ${
              feedback.type === 'success'
                ? 'bg-green-100 border-green-400 text-green-900 shadow-[0_2px_0_rgba(74,222,128,1)]'
                : 'bg-red-100 border-red-400 text-red-900 shadow-[0_2px_0_rgba(248,113,113,1)]'
            }`}
          >
            <span>{feedback.message}</span>
            <button onClick={() => setFeedback(null)} className="ml-3 opacity-60 hover:opacity-100 transition-opacity">
              <X className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {/* ═══ MYSTERY BOX REWARD POPUP ═══ */}
      {(isBoxOpening || mysteryReward) && (
        <div className="relative overflow-hidden rounded-2xl border-4 border-amber-400 bg-[#FDF9F1] p-10 text-center shadow-[0_8px_0_#fbbf24] animate-in zoom-in-95 duration-200">
          <div 
            className="absolute inset-0 opacity-20 pointer-events-none mix-blend-multiply"
            style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/aged-paper.png")' }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.2),transparent_70%)] pointer-events-none" />
          
          {isBoxOpening ? (
            <div className="relative z-10 space-y-4">
              <div className="text-7xl animate-bounce">🎁</div>
              <p className="text-2xl font-black text-amber-600 animate-pulse">Opening Mystery Box...</p>
              <div className="flex justify-center gap-1.5 mt-4">
                {[0,1,2,3,4].map(i => (
                  <div key={i} className="w-4 h-4 rounded-full bg-amber-400 animate-ping" style={{ animationDelay: `${i * 0.15}s` }} />
                ))}
              </div>
            </div>
          ) : mysteryReward && (
            <div className="relative z-10 space-y-4">
              <div className="text-7xl drop-shadow-md">
                {mysteryReward.type === 'nothing' ? '💨' : mysteryReward.type === 'gold' ? '💰' : '⚡'}
              </div>
              <p className="text-3xl font-black text-[#3D2C1E]">{mysteryReward.label}</p>
              <p className="text-sm font-bold text-[#8A7A6A]">
                {mysteryReward.type === 'nothing' ? 'Better luck next time, warrior...' : 'The box has blessed you!'}
              </p>
              <button
                onClick={() => setMysteryReward(null)}
                className="mt-4 px-8 py-3 rounded-xl bg-gradient-to-b from-amber-400 to-amber-600 text-white text-sm font-black uppercase tracking-wider transition-all shadow-[0_4px_0_#b45309] hover:translate-y-[2px] hover:shadow-[0_2px_0_#b45309] active:translate-y-[4px] active:shadow-none"
              >
                Claim & Close
              </button>
            </div>
          )}
        </div>
      )}

      {/* ═══ POWER-UPS & CONSUMABLES SECTION ═══ */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-100 border-2 border-blue-300">
            <Zap className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-black text-[#3D2C1E] tracking-tight">Power-Ups & Consumables</h2>
            <p className="text-xs font-medium text-[#8A7A6A]">Functional items that boost your progression. Purchase anytime with earned Gold.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {consumables.map(item => (
            <ConsumableCard
              key={item.id}
              item={item}
              gold={gold}
              isPending={isPending}
              purchasingId={purchasingId}
              onPurchase={handlePurchase}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════
   CONSUMABLE POWER-UP CARD — Parchment Gamified design
   ══════════════════════════════════════════════ */

function ConsumableCard({ item, gold, isPending, purchasingId, onPurchase }: {
  item: ShopItem
  gold: number
  isPending: boolean
  purchasingId: string | null
  onPurchase: (item: ShopItem) => void
}) {
  const theme = RARITY_CONFIG[item.rarity] || RARITY_CONFIG.Common
  const canAfford = gold >= item.price
  const isBusy = purchasingId === item.id

  const effectLabels: Record<string, string> = {
    consumable_streak_freeze: '🧊 Protects streak for 1 day',
    consumable_reschedule: '📜 Move quest to tomorrow',
    consumable_xp_boost: '⚡ 1.5× XP for 24 hours',
    consumable_mystery_box: '🎁 Random reward drop',
  }

  return (
    <div
      className={`relative group flex flex-col justify-between rounded-2xl overflow-hidden bg-white border-2 transition-all duration-300 ${theme.border} shadow-[0_4px_0_#E5D3B3] hover:-translate-y-1`}
    >
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply"
        style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/aged-paper.png")' }}
      />
      
      {/* Power-up header stripe */}
      <div className={`h-2 w-full bg-gradient-to-r ${
        item.id.includes('freeze') ? 'from-cyan-400 to-blue-400' :
        item.id.includes('reschedule') ? 'from-emerald-400 to-teal-400' :
        item.id.includes('xp_boost') ? 'from-purple-400 to-fuchsia-400' :
        'from-amber-400 to-orange-400'
      }`} />

      <div className="p-5 flex flex-col flex-1 relative z-10">
        {/* Icon & rarity */}
        <div className="flex items-start justify-between mb-3">
          <div className="text-4xl drop-shadow-sm transform group-hover:scale-110 transition-transform">
            {item.id.includes('freeze') ? '🧊' :
             item.id.includes('reschedule') ? '📜' :
             item.id.includes('xp_boost') ? '⚡' : '🎁'}
          </div>
          <span className={`text-[9px] uppercase font-black tracking-widest px-2 py-0.5 rounded-lg border-2 ${theme.badge} shadow-sm`}>
            {item.rarity}
          </span>
        </div>

        <h3 className="text-lg font-black text-[#3D2C1E] tracking-tight leading-snug">{item.name.replace(/[🧊📜⚡🎁]\s?/, '')}</h3>
        <p className="text-[11px] text-[#8A7A6A] font-medium mt-1 line-clamp-3 leading-relaxed flex-1">{item.description}</p>

        {/* Effect tag */}
        <div className="mt-3 px-2.5 py-1.5 rounded-lg bg-[#FDF9F1] border-2 border-[#E5D3B3] text-[10px] font-black text-[#8A7A6A] tracking-wide text-center shadow-inner">
          {effectLabels[item.id] || 'Special Effect'}
        </div>
      </div>

      {/* Purchase footer */}
      <div className="px-5 pb-5 pt-0 relative z-10">
        <button
          onClick={() => onPurchase(item)}
          disabled={isPending || !canAfford}
          className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-black tracking-wider uppercase transition-all duration-200 ${
            canAfford
              ? 'bg-gradient-to-b from-amber-400 to-amber-500 text-white shadow-[0_4px_0_#b45309] hover:translate-y-[2px] hover:shadow-[0_2px_0_#b45309] active:translate-y-[4px] active:shadow-none'
              : 'bg-white text-[#8A7A6A] cursor-not-allowed border-2 border-[#E5D3B3] shadow-sm'
          }`}
        >
          <Coins className="w-4 h-4" />
          {isBusy ? 'Processing...' : canAfford ? `Buy — ${item.price} G` : `Need ${item.price - gold} G`}
        </button>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════
   HELPER — Effect messages per item
   ══════════════════════════════════════════════ */
function getItemEffectMessage(item: ShopItem): string {
  switch (item.id) {
    case 'consumable_streak_freeze':
      return '🧊 Streak Freezer activated! Your streak is protected for today.'
    case 'consumable_reschedule':
      return '📜 Rescheduling Scroll acquired! Use it on any active quest.'
    case 'consumable_xp_boost':
      return '⚡ XP Booster active! All quests give 1.5× XP for 24 hours!'
    case 'consumable_mystery_box':
      return '🎁 Mystery Box opened!'
    default:
      return `✅ Successfully acquired ${item.name}! Visit your Wardrobe to equip it.`
  }
}
