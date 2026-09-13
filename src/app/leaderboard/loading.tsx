import React from 'react'

export default function LeaderboardLoading() {
  return (
    <main className="relative min-h-screen bg-world-sky overflow-x-hidden pt-20 pb-16">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Banner Skeleton */}
        <div className="rounded-3xl border-4 border-[#e6d5b8] bg-[#FDF9F1] p-8 sm:p-10 shadow-lg skeleton-pulse">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="h-5 w-40 rounded-lg bg-amber-200" />
              <div className="h-8 w-64 rounded-xl bg-amber-900/20" />
              <div className="h-4 w-80 rounded-lg bg-amber-900/10" />
            </div>
            <div className="h-10 w-44 rounded-2xl bg-amber-400/30" />
          </div>
        </div>

        {/* Podium Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end pt-2 pb-2 skeleton-pulse">
          <div className="h-64 rounded-3xl bg-white border-2 border-slate-300 p-6 flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-slate-100 mb-3" />
            <div className="h-5 w-24 rounded bg-slate-200" />
          </div>
          <div className="h-80 rounded-3xl bg-white border-4 border-amber-300 p-6 flex flex-col items-center justify-center md:-translate-y-4">
            <div className="w-20 h-20 rounded-full bg-amber-100 mb-3" />
            <div className="h-6 w-32 rounded bg-amber-200" />
          </div>
          <div className="h-64 rounded-3xl bg-white border-2 border-orange-200 p-6 flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-orange-100 mb-3" />
            <div className="h-5 w-24 rounded bg-orange-200" />
          </div>
        </div>

        {/* Table Skeleton */}
        <div className="rounded-3xl bg-white border-4 border-[#E5D3B3] p-6 skeleton-pulse space-y-4 shadow-lg">
          <div className="h-8 w-full rounded-xl bg-black/5" />
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-12 w-full rounded-xl bg-black/5" />
          ))}
        </div>
      </div>
    </main>
  )
}
