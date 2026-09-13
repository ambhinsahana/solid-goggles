'use client'

import { useState, useTransition } from 'react'
import { InventoryItem, ShopItemType } from '@/lib/types'
import { equipInventoryItem } from '@/app/dashboard/actions'
import { Tag, Flame, Shield, Sparkles, Zap, Palette, Crown, Check, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface CharacterInventoryProps {
  items?: InventoryItem[]
  initialInventory?: InventoryItem[]
}

const RARITY_STYLES = {
  Common: 'border-white/10 text-gray-300 bg-white/[0.02]',
  Rare: 'border-blue-500/30 text-blue-400 bg-blue-500/[0.04]',
  Epic: 'border-purple-500/30 text-purple-400 bg-purple-500/[0.04]',
  Legendary: 'border-amber-500/40 text-amber-400 bg-amber-500/[0.06] shadow-[0_0_15px_rgba(245,158,11,0.1)]',
}

const ICON_MAP: Record<string, any> = {
  Tag,
  Flame,
  Shield,
  Sparkles,
  Zap,
  Palette,
  Crown,
}

export function CharacterInventory({ items, initialInventory }: CharacterInventoryProps) {
  const initial = initialInventory ?? items ?? []
  const [inventory, setInventory] = useState<InventoryItem[]>(initial)
  const [activeFilter, setActiveFilter] = useState<string>('all')
  const [isPending, startTransition] = useTransition()
  const [actionError, setActionError] = useState<string | null>(null)

  const handleToggleEquip = (item: InventoryItem) => {
    setActionError(null)
    const nextEquippedState = !item.is_equipped

    // Optimistic update
    setInventory((prev) =>
      prev.map((i) => {
        // If equipping a title, unequip other titles to keep single active title
        if (item.item?.type === 'title' && nextEquippedState && i.item?.type === 'title') {
          return { ...i, is_equipped: i.id === item.id }
        }
        if (i.id === item.id) {
          return { ...i, is_equipped: nextEquippedState }
        }
        return i
      })
    )

    startTransition(async () => {
      const res = await equipInventoryItem(item.item_id, nextEquippedState)
      if (res.error && res.error !== 'SUPABASE_NOT_CONFIGURED') {
        setActionError(res.error)
        // Revert on error
        setInventory(initial)
      }
    })
  }

  const filteredItems = inventory.filter((item) => {
    if (activeFilter === 'all') return true
    return item.item?.type === activeFilter
  })

  return (
    <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-xl font-black text-white flex items-center gap-2">
            <Shield className="w-5 h-5 text-indigo-400" />
            Equipment & Wardrobe
          </h3>
          <p className="text-sm text-gray-400 mt-0.5">
            Equip custom titles, crests, and elemental companion skins acquired from the Armory.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 text-xs">
          {[
            { id: 'all', label: 'All Items' },
            { id: 'title', label: 'Titles' },
            { id: 'badge', label: 'Badges' },
            { id: 'companion_skin', label: 'Skins' },
            { id: 'theme', label: 'Themes' },
          ].map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                activeFilter === filter.id
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {actionError && (
        <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold">
          {actionError}
        </div>
      )}

      {filteredItems.length === 0 ? (
        <div className="p-8 text-center border border-dashed border-white/10 rounded-xl bg-white/[0.01]">
          <Tag className="w-10 h-10 text-gray-600 mx-auto mb-3" />
          <h4 className="text-sm font-bold text-gray-300 font-display">YOUR INVENTORY IS EMPTY</h4>
          <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
            You have not acquired any cosmetics in this category yet. Earn Gold by completing daily quests and browse the Armory.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 text-black text-xs font-bold hover:brightness-110 shadow-lg shadow-amber-500/20"
          >
            Visit Armory <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((inv) => {
            const item = inv.item
            if (!item) return null
            const IconComp = ICON_MAP[item.asset_icon] || Tag
            const rarityClass = RARITY_STYLES[item.rarity] || RARITY_STYLES.Common

            return (
              <div
                key={inv.id}
                className={`p-4 rounded-xl border transition-all flex flex-col justify-between ${rarityClass} ${
                  inv.is_equipped ? 'ring-2 ring-indigo-500/50' : ''
                }`}
              >
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-2.5 rounded-lg bg-black/40 border border-white/10 text-white">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-black/50 border border-white/10">
                        {item.rarity}
                      </span>
                      {inv.is_equipped && (
                        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full flex items-center gap-1 border border-emerald-500/30">
                          <Check className="w-3 h-3 stroke-[3]" /> Equipped
                        </span>
                      )}
                    </div>
                  </div>

                  <h4 className="font-bold text-white text-base leading-tight">{item.name}</h4>
                  <p className="text-xs text-gray-400 mt-1.5 line-clamp-2">{item.description}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[11px] text-gray-400 uppercase font-semibold">
                    {item.type.replace('_', ' ')}
                  </span>
                  <button
                    onClick={() => handleToggleEquip(inv)}
                    disabled={isPending}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      inv.is_equipped
                        ? 'bg-white/10 text-gray-300 hover:bg-white/20'
                        : 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-md shadow-indigo-600/30'
                    }`}
                  >
                    {inv.is_equipped ? 'Unequip' : 'Equip'}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
