import React from 'react'

export default function DashboardLoading() {
  return (
    <main className="relative min-h-screen bg-world-sky overflow-x-hidden pt-20 pb-16">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* HUD Skeleton */}
        <div className="glass-frosted p-5 w-full rounded-2xl border border-white/90 shadow-md backdrop-blur-xl skeleton-pulse">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-400/20" />
              <div className="h-6 w-40 rounded-lg bg-amber-900/15" />
              <div className="h-5 w-24 rounded-full bg-amber-900/10 hidden sm:block" />
            </div>
            <div className="flex items-center gap-2">
              <div className="h-7 w-20 rounded-full bg-amber-900/10" />
              <div className="h-7 w-20 rounded-full bg-amber-900/10" />
            </div>
          </div>
          <div className="mt-4 space-y-1.5">
            <div className="h-2.5 w-full rounded-full bg-black/10" />
          </div>
        </div>

        {/* Hero World Scene & Attributes Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* World Scene Skeleton */}
          <div className="lg:col-span-7 rounded-2xl border-4 border-[#e6d5b8] bg-[#dcf0fa]/70 min-h-[310px] p-6 flex flex-col items-center justify-center skeleton-pulse shadow-md">
            <div className="w-36 h-36 rounded-full bg-white/50 mb-3" />
            <div className="h-5 w-32 rounded-lg bg-amber-900/20" />
            <div className="h-4 w-48 rounded-lg bg-amber-900/10 mt-2" />
          </div>

          {/* Trait Attributes Skeleton */}
          <div className="lg:col-span-5 rounded-2xl glass-frosted border border-white/90 p-5 space-y-3 skeleton-pulse">
            <div className="h-4 w-36 rounded-lg bg-amber-900/15 mb-4" />
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-10 w-full rounded-xl bg-black/5" />
            ))}
          </div>
        </div>

        {/* Quests Area Skeleton */}
        <div className="rounded-2xl glass-frosted border-2 border-[#e6d5b8] p-6 space-y-4 skeleton-pulse">
          <div className="flex justify-between items-center">
            <div className="h-7 w-32 rounded-lg bg-amber-900/20" />
            <div className="h-8 w-28 rounded-xl bg-amber-400/30" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="h-32 rounded-2xl bg-black/5" />
            <div className="h-32 rounded-2xl bg-black/5" />
          </div>
        </div>
      </div>
    </main>
  )
}
