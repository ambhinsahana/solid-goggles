'use client'

import React, { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { gameAudio } from '@/lib/audio/game-audio'

interface PlayerUidProps {
  uid: string
  className?: string
  showCopyToast?: boolean
}

export function PlayerUid({ uid, className = '' }: PlayerUidProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation()
    try {
      await navigator.clipboard.writeText(uid)
      gameAudio.playPop()
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback
    }
  }

  if (!uid) return null

  return (
    <div className={`relative inline-flex items-center gap-1.5 ${className}`}>
      <button
        onClick={handleCopy}
        type="button"
        title="Click to copy your Player UID"
        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-amber-950/10 hover:bg-amber-950/15 border border-amber-900/20 text-[11px] font-mono font-bold text-amber-900/80 hover:text-amber-950 touch-bounce cursor-pointer transition-all shadow-2xs"
      >
        <span>{uid}</span>
        {copied ? (
          <Check className="w-3 h-3 text-emerald-600 stroke-[3]" />
        ) : (
          <Copy className="w-2.5 h-2.5 text-amber-800/60 hover:text-amber-900" />
        )}
      </button>

      {/* Floating Game Toast */}
      {copied && (
        <div className="absolute -top-7 left-1/2 -translate-x-1/2 z-50 pointer-events-none animate-in fade-in zoom-in-90 duration-200">
          <div className="bg-amber-950 text-amber-100 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md shadow-md border border-amber-600/40 whitespace-nowrap flex items-center gap-1">
            <Check className="w-2.5 h-2.5 text-emerald-400 stroke-[3]" />
            <span>UID COPIED</span>
          </div>
        </div>
      )}
    </div>
  )
}
