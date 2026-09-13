import React from 'react'

export default function ShopLoading() {
  return (
    <main className="relative min-h-screen bg-world-sky overflow-x-hidden pt-20 pb-16">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Banner & Vault Skeleton */}
        <div className="rounded-2xl bg-[#FDF9F1] border-2 border-[#E5D3B3] p-8 sm:p-10 shadow-sm skeleton-pulse">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="h-5 w-36 rounded-lg bg-amber-200" />
              <div className="h-8 w-56 rounded-xl bg-amber-900/20" />
              <div className="h-4 w-72 rounded-lg bg-amber-900/10" />
            </div>
            <div className="h-20 w-48 rounded-2xl bg-white border-2 border-[#E5D3B3]" />
          </div>
        </div>

        {/* Consumables Grid Skeleton */}
        <div className="space-y-4 skeleton-pulse">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 border-2 border-blue-300" />
            <div className="space-y-1">
              <div className="h-6 w-48 rounded-lg bg-amber-900/20" />
              <div className="h-3.5 w-64 rounded-lg bg-amber-900/10" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-56 rounded-2xl bg-white border-2 border-[#E5D3B3] p-5 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-black/5" />
                  <div className="h-5 w-32 rounded-lg bg-black/10" />
                  <div className="h-3 w-40 rounded bg-black/5" />
                </div>
                <div className="h-9 w-full rounded-xl bg-black/5" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
