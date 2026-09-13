import React from 'react'

export default function CharacterLoading() {
  return (
    <main className="relative min-h-screen bg-world-sky overflow-x-hidden pt-20 pb-16">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Banner Skeleton */}
        <div className="rounded-3xl border-4 border-[#e6d5b8] bg-[#FDF9F1] p-8 skeleton-pulse shadow-md">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-3 w-full sm:w-1/2">
              <div className="h-5 w-32 rounded-lg bg-amber-400/30" />
              <div className="h-8 w-64 rounded-xl bg-amber-900/20" />
              <div className="h-4 w-80 rounded-lg bg-amber-900/10" />
            </div>
            <div className="w-36 h-36 rounded-full bg-white/60 border-2 border-[#e6d5b8]" />
          </div>
        </div>

        {/* 15 Character Codex Grid Skeleton */}
        <div className="parchment-card p-6 rounded-3xl border border-black/10 space-y-6 skeleton-pulse">
          <div className="flex justify-between items-center border-b border-black/10 pb-3">
            <div className="h-6 w-48 rounded-lg bg-amber-900/20" />
            <div className="h-5 w-24 rounded-full bg-amber-900/10" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {[...Array(15)].map((_, i) => (
              <div key={i} className="h-32 rounded-2xl bg-black/5 flex flex-col items-center justify-center p-3">
                <div className="w-16 h-16 rounded-full bg-white/40 mb-2" />
                <div className="h-3.5 w-16 rounded bg-amber-900/15" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
