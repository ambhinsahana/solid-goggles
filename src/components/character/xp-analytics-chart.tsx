'use client'

import React, { useState, useMemo } from 'react'
import { Sparkles, TrendingUp, Calendar, Compass, ArrowRight, Zap, Info } from 'lucide-react'
import Link from 'next/link'
import { gameAudio } from '@/lib/audio/game-audio'

export interface QuestCompletionRecord {
  id: string
  xp_earned: number
  completed_at: string
  path_progressed?: string
}

interface XpAnalyticsChartProps {
  completions: QuestCompletionRecord[]
  className?: string
}

type TimeView = 'daily' | 'weekly' | 'monthly'

export function XpAnalyticsChart({ completions, className = '' }: XpAnalyticsChartProps) {
  const [timeView, setTimeView] = useState<TimeView>('weekly')
  const [hoveredPointIndex, setHoveredPointIndex] = useState<number | null>(null)

  // 1. Process real completion records strictly - NO fabricated backfill
  const chartData = useMemo(() => {
    const now = new Date()

    if (timeView === 'daily') {
      // 4-hour segments for today
      const slots = [
        { label: '00:00 - 04:00', startH: 0, endH: 4, shortLabel: 'Dawn 1' },
        { label: '04:00 - 08:00', startH: 4, endH: 8, shortLabel: 'Morning' },
        { label: '08:00 - 12:00', startH: 8, endH: 12, shortLabel: 'Midday' },
        { label: '12:00 - 16:00', startH: 12, endH: 16, shortLabel: 'Afternoon' },
        { label: '16:00 - 20:00', startH: 16, endH: 20, shortLabel: 'Dusk' },
        { label: '20:00 - 24:00', startH: 20, endH: 24, shortLabel: 'Night' },
      ]

      const todayCompletions = completions.filter((c) => {
        const d = new Date(c.completed_at)
        return d.toDateString() === now.toDateString()
      })

      return slots.map((slot) => {
        const inSlot = todayCompletions.filter((c) => {
          const h = new Date(c.completed_at).getHours()
          return h >= slot.startH && h < slot.endH
        })
        const xp = inSlot.reduce((sum, item) => sum + item.xp_earned, 0)
        return {
          label: slot.label,
          displayLabel: slot.shortLabel,
          xp,
          count: inSlot.length,
          dateStr: 'Today',
        }
      })
    }

    if (timeView === 'weekly') {
      // Past 7 days ending today
      const days = []
      const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

      for (let i = 6; i >= 0; i--) {
        const targetDate = new Date(now)
        targetDate.setDate(now.getDate() - i)
        targetDate.setHours(0, 0, 0, 0)

        const nextDate = new Date(targetDate)
        nextDate.setDate(targetDate.getDate() + 1)

        const onThisDay = completions.filter((c) => {
          const d = new Date(c.completed_at)
          return d >= targetDate && d < nextDate
        })

        const xp = onThisDay.reduce((sum, item) => sum + item.xp_earned, 0)
        const dayLabel = dayNames[targetDate.getDay()]
        const dateStr = targetDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })

        days.push({
          label: `${dayLabel} (${dateStr})`,
          displayLabel: i === 0 ? 'Today' : dayLabel,
          xp,
          count: onThisDay.length,
          dateStr,
        })
      }
      return days
    }

    // Monthly View: Past 4 weeks
    const weeks = []
    for (let w = 3; w >= 0; w--) {
      const end = new Date(now)
      end.setDate(now.getDate() - w * 7)
      const start = new Date(end)
      start.setDate(end.getDate() - 6)
      start.setHours(0, 0, 0, 0)
      end.setHours(23, 59, 59, 999)

      const inWeek = completions.filter((c) => {
        const d = new Date(c.completed_at)
        return d >= start && d <= end
      })

      const xp = inWeek.reduce((sum, item) => sum + item.xp_earned, 0)
      const startStr = start.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
      const endStr = end.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })

      weeks.push({
        label: `${startStr} - ${endStr}`,
        displayLabel: `W${4 - w}`,
        xp,
        count: inWeek.length,
        dateStr: `${startStr} - ${endStr}`,
      })
    }
    return weeks
  }, [completions, timeView])

  const totalXpInView = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.xp, 0)
  }, [chartData])

  const maxXp = useMemo(() => {
    const rawMax = Math.max(...chartData.map((d) => d.xp), 0)
    return rawMax === 0 ? 100 : Math.ceil((rawMax * 1.25) / 50) * 50
  }, [chartData])

  // If user has zero quest completions in total, show pure empty state
  if (completions.length === 0) {
    return (
      <div className={`parchment-card p-6 rounded-3xl border border-black/10 flex flex-col justify-between ${className}`}>
        <div className="flex items-center justify-between border-b border-black/10 pb-3">
          <h3 className="text-xl font-display font-black text-world-text tracking-tight flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-world-accent" />
            PLAYER XP TRACKING
          </h3>
          <span className="text-xs text-[#8a7a6a] font-semibold">Real XP Activity</span>
        </div>

        {/* Themed Empty State Graphic */}
        <div className="py-12 px-4 text-center flex flex-col items-center justify-center space-y-3">
          <div className="w-16 h-16 rounded-3xl bg-amber-400/20 border-2 border-amber-400/40 flex items-center justify-center text-amber-700 shadow-inner">
            <Compass className="w-8 h-8 animate-spin-slow" />
          </div>

          <div className="space-y-1">
            <h4 className="font-display font-black text-lg text-world-text">
              YOUR XP JOURNEY STARTS HERE
            </h4>
            <p className="text-xs text-[#8a7a6a] max-w-sm mx-auto font-bold leading-relaxed">
              No XP earned yet. Complete your first quest on the Dashboard to begin recording your personal progression graph.
            </p>
          </div>

          <Link
            href="/dashboard"
            onClick={() => gameAudio.playPop()}
            className="btn-clash-gold px-5 py-2 rounded-2xl text-amber-950 font-black text-xs uppercase tracking-wider touch-bounce inline-flex items-center gap-1.5 shadow-md mt-2"
          >
            <span>Begin First Quest</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    )
  }

  // SVG Chart Geometry
  const svgWidth = 460
  const svgHeight = 170
  const paddingX = 35
  const paddingBottom = 30
  const paddingTop = 20

  const availableW = svgWidth - paddingX * 2
  const availableH = svgHeight - paddingTop - paddingBottom

  const points = chartData.map((d, idx) => {
    const x = paddingX + (idx / (chartData.length - 1 || 1)) * availableW
    const normalizedY = d.xp / (maxXp || 1)
    const y = paddingTop + (1 - normalizedY) * availableH
    return { x, y, data: d }
  })

  // Smooth SVG Path
  const linePath = points.reduce((acc, pt, idx) => {
    if (idx === 0) return `M ${pt.x},${pt.y}`
    const prev = points[idx - 1]
    const midX = (prev.x + pt.x) / 2
    return `${acc} C ${midX},${prev.y} ${midX},${pt.y} ${pt.x},${pt.y}`
  }, '')

  const areaPath = points.length > 0
    ? `${linePath} L ${points[points.length - 1].x},${svgHeight - paddingBottom} L ${points[0].x},${svgHeight - paddingBottom} Z`
    : ''

  const activePoint = hoveredPointIndex !== null ? points[hoveredPointIndex] : null

  return (
    <div className={`parchment-card p-6 space-y-4 rounded-3xl border border-black/10 ${className}`}>
      {/* Header & View Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-black/10 pb-3">
        <div>
          <h3 className="text-xl font-display font-black text-world-text tracking-tight flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-world-accent" />
            PLAYER XP TRACKING
          </h3>
          <p className="text-xs text-[#8a7a6a] font-semibold">
            {timeView === 'daily' && 'Today’s XP Transactions'}
            {timeView === 'weekly' && 'Last 7 Days Progress'}
            {timeView === 'monthly' && 'Last 4 Weeks Accumulation'}
            {' · '}
            <span className="font-bold text-amber-700">+{totalXpInView} XP</span>
          </p>
        </div>

        {/* View Toggle Tabs */}
        <div className="flex items-center gap-1 p-1 rounded-2xl bg-black/5 border border-black/10">
          {(['daily', 'weekly', 'monthly'] as TimeView[]).map((tab) => {
            const isActive = timeView === tab
            return (
              <button
                key={tab}
                type="button"
                onClick={() => {
                  gameAudio.playTap()
                  setTimeView(tab)
                  setHoveredPointIndex(null)
                }}
                className={`px-3 py-1 rounded-xl text-xs font-black uppercase tracking-wider transition-all touch-bounce ${
                  isActive
                    ? 'bg-amber-500 text-white shadow-xs scale-105'
                    : 'text-[#8a7a6a] hover:text-world-text hover:bg-white/60'
                }`}
              >
                {tab}
              </button>
            )
          })}
        </div>
      </div>

      {/* SVG Chart Container */}
      <div className="relative w-full rounded-2xl bg-white/50 border border-black/5 p-3 overflow-hidden">
        {/* Active Point Floating Tooltip */}
        {activePoint && (
          <div
            className="absolute z-20 pointer-events-none -translate-x-1/2 transition-transform duration-150"
            style={{
              left: `${(activePoint.x / svgWidth) * 100}%`,
              top: `${Math.max(10, (activePoint.y / svgHeight) * 100 - 30)}%`,
            }}
          >
            <div className="liquid-glass-dark px-3 py-1.5 rounded-xl text-white text-xs shadow-lg border border-amber-300/40 font-mono whitespace-nowrap text-center">
              <div className="font-bold text-amber-300">+{activePoint.data.xp} XP</div>
              <div className="text-[10px] text-amber-100/75">
                {activePoint.data.count} quest{activePoint.data.count === 1 ? '' : 's'} · {activePoint.data.dateStr}
              </div>
            </div>
          </div>
        )}

        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-44 overflow-visible select-none"
        >
          <defs>
            {/* Soft Fantasy Gradient Fill */}
            <linearGradient id="xpAreaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.38" />
              <stop offset="70%" stopColor="#d97706" stopOpacity="0.10" />
              <stop offset="100%" stopColor="#d97706" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="xpLineGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="50%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>
          </defs>

          {/* Subtle Horizontal Grid Lines */}
          {[0, 0.5, 1].map((ratio) => {
            const y = paddingTop + ratio * availableH
            const xpVal = Math.round((1 - ratio) * maxXp)
            return (
              <g key={ratio}>
                <line
                  x1={paddingX}
                  y1={y}
                  x2={svgWidth - paddingX}
                  y2={y}
                  stroke="rgba(0,0,0,0.06)"
                  strokeDasharray="4 4"
                />
                <text
                  x={paddingX - 8}
                  y={y + 3}
                  textAnchor="end"
                  className="text-[9px] font-mono fill-amber-900/40 font-bold"
                >
                  {xpVal}
                </text>
              </g>
            )
          })}

          {/* Area Fill */}
          {areaPath && (
            <path d={areaPath} fill="url(#xpAreaGradient)" className="transition-all duration-300" />
          )}

          {/* Curve Line */}
          {linePath && (
            <path
              d={linePath}
              fill="none"
              stroke="url(#xpLineGradient)"
              strokeWidth="3.5"
              strokeLinecap="round"
              className="transition-all duration-300 drop-shadow-sm"
            />
          )}

          {/* Interactive Data Points */}
          {points.map((pt, idx) => {
            const isHovered = hoveredPointIndex === idx
            return (
              <g
                key={idx}
                className="cursor-pointer"
                onMouseEnter={() => {
                  gameAudio.playTap()
                  setHoveredPointIndex(idx)
                }}
                onMouseLeave={() => setHoveredPointIndex(null)}
                onClick={() => setHoveredPointIndex(idx)}
              >
                {/* Hit area */}
                <circle cx={pt.x} cy={pt.y} r="14" fill="transparent" />

                {/* Visible node circle */}
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={isHovered ? 6 : pt.data.xp > 0 ? 4.5 : 3}
                  fill={isHovered ? '#ffffff' : pt.data.xp > 0 ? '#f59e0b' : '#c4b5a0'}
                  stroke={isHovered ? '#b45309' : '#ffffff'}
                  strokeWidth={isHovered ? 3 : 2}
                  className="transition-all duration-200"
                />

                {/* X-axis Label */}
                <text
                  x={pt.x}
                  y={svgHeight - 10}
                  textAnchor="middle"
                  className={`text-[10px] font-display font-black transition-colors ${
                    isHovered ? 'fill-amber-900 font-extrabold' : 'fill-[#8a7a6a]'
                  }`}
                >
                  {pt.data.displayLabel}
                </text>
              </g>
            )
          })}
        </svg>
      </div>

      {/* Footer Info */}
      <div className="flex items-center justify-between text-[11px] text-[#8a7a6a] pt-1">
        <div className="flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-amber-600" />
          <span>Tap data points for date & XP breakdown</span>
        </div>
        <span className="font-mono font-bold text-amber-800/80">
          Total Quest Completions: {completions.length}
        </span>
      </div>
    </div>
  )
}
