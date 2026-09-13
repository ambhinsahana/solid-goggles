import { createClient } from '@/utils/supabase/server'
import { SYSTEM_SHOP_ITEMS } from '@/lib/progression/shop'
import { ShopItem } from '@/lib/types'
import { ShopCatalog } from '@/components/shop/shop-catalog'

import { WorldScene } from '@/components/game/world-scene'

export const metadata = {
  title: 'Armory & Bazaar — LifeQuest',
  description: 'Spend hard-earned quest Gold on consumable power-ups, potions, prestige titles, and warrior sigils.',
}

export default async function ShopPage() {
  const isSupabaseConfigured = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.length > 15
  )

  let items: ShopItem[] = SYSTEM_SHOP_ITEMS.filter(i => i.type !== 'companion_skin')
  let userGold = 0 // Real data only: 0 initial gold
  let ownedItemIds: string[] = [] // Real data only: 0 owned items until purchased
  let isLoggedIn = false

  if (isSupabaseConfigured) {
    try {
      const supabase = await createClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (user) {
        isLoggedIn = true

        // Fetch user coins
        const { data: profile } = await supabase
          .from('profiles')
          .select('nexus_coins')
          .eq('id', user.id)
          .single()

        if (profile) {
          userGold = profile.nexus_coins ?? 0
        }

        // Fetch user inventory
        const { data: inventory } = await supabase
          .from('inventory')
          .select('item_id')
          .eq('user_id', user.id)

        if (inventory) {
          ownedItemIds = inventory.map((i: any) => i.item_id)
        }

        // Fetch database shop items if available
        const { data: dbItems } = await supabase
          .from('shop_items')
          .select('*')
          .eq('is_active', true)

        if (dbItems && dbItems.length > 0) {
          items = (dbItems as ShopItem[]).filter(i => i.type !== 'companion_skin')
        }
      }
    } catch {
      // Fallback gracefully to default items
    }
  }

  return (
    <main className="relative min-h-screen bg-world-sky overflow-x-hidden pt-20 pb-16">
      <WorldScene />
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto text-white">
        <ShopCatalog
          initialItems={items}
          userGold={userGold}
          ownedItemIds={ownedItemIds}
          isLoggedIn={isLoggedIn}
        />
      </div>
    </main>
  )
}
