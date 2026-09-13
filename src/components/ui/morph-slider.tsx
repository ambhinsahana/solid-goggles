'use client'

import React, { useRef, useState, useEffect } from 'react'
import { gameAudio } from '@/lib/audio/game-audio'

export interface MorphSliderOption {
  id: string
  label: string
  icon?: React.ComponentType<{ className?: string }>
  badge?: string
  accentColor?: string
}

interface MorphSliderProps {
  options: MorphSliderOption[]
  value: string
  onChange: (value: string) => void
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function MorphSlider({
  options,
  value,
  onChange,
  size = 'md',
  className = '',
}: MorphSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<Map<string, HTMLButtonElement>>(new Map())
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  })

  const updateIndicator = () => {
    const el = itemRefs.current.get(value)
    const container = containerRef.current
    if (el && container) {
      const containerRect = container.getBoundingClientRect()
      const itemRect = el.getBoundingClientRect()
      setIndicatorStyle({
        left: itemRect.left - containerRect.left,
        width: itemRect.width,
        opacity: 1,
      })
    }
  }

  useEffect(() => {
    updateIndicator()
    window.addEventListener('resize', updateIndicator)
    return () => window.removeEventListener('resize', updateIndicator)
  }, [value, options])

  const handleSelect = (id: string) => {
    if (id !== value) {
      gameAudio.playTap()
      onChange(id)
    }
  }

  const paddingSize = size === 'sm' ? 'p-1' : size === 'lg' ? 'p-2' : 'p-1.5'
  const textSize =
    size === 'sm'
      ? 'text-xs py-1.5 px-3'
      : size === 'lg'
      ? 'text-sm py-2.5 px-5'
      : 'text-xs sm:text-sm py-2 px-4'

  return (
    <div
      ref={containerRef}
      className={`relative inline-flex items-center rounded-2xl bg-black/60 border border-white/10 backdrop-blur-xl shadow-inner ${paddingSize} ${className}`}
      role="tablist"
    >
      {/* Elastic Morphing Indicator Pill */}
      <div
        className="absolute top-1 bottom-1 rounded-xl bg-gradient-to-r from-amber-500/90 via-yellow-500/90 to-amber-600/90 shadow-[0_0_20px_rgba(245,158,11,0.35)] transition-all duration-300 pointer-events-none"
        style={{
          left: `${indicatorStyle.left}px`,
          width: `${indicatorStyle.width}px`,
          opacity: indicatorStyle.opacity,
          transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)', // Bouncy elastic spring
        }}
      />

      {/* Slider Items */}
      {options.map((option) => {
        const isSelected = value === option.id
        const Icon = option.icon

        return (
          <button
            key={option.id}
            ref={(node) => {
              if (node) itemRefs.current.set(option.id, node)
              else itemRefs.current.delete(option.id)
            }}
            type="button"
            onClick={() => handleSelect(option.id)}
            className={`relative z-10 flex items-center justify-center gap-2 rounded-xl font-black uppercase tracking-wider transition-all duration-200 ${textSize} ${
              isSelected
                ? 'text-black font-black scale-100'
                : 'text-gray-400 hover:text-white active:scale-95'
            }`}
            role="tab"
            aria-selected={isSelected}
          >
            {Icon && (
              <Icon
                className={`w-4 h-4 transition-transform duration-200 ${
                  isSelected ? 'scale-110 text-black' : 'text-gray-400'
                }`}
              />
            )}
            <span>{option.label}</span>
            {option.badge && (
              <span
                className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                  isSelected
                    ? 'bg-black/20 text-black'
                    : 'bg-white/10 text-amber-300'
                }`}
              >
                {option.badge}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
