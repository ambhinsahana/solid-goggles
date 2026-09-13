'use client'

import { useState } from 'react'
import { saveSupabaseConfig } from '@/app/dashboard/actions'
import { Database, Key, CheckCircle, ExternalLink, Sparkles, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Props {
  isConfigured: boolean
}

export function SupabaseConfigBanner({ isConfigured }: Props) {
  const [keyInput, setKeyInput] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [status, setStatus] = useState<string | null>(null)

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!keyInput.trim()) return

    setIsSaving(true)
    const formData = new FormData()
    formData.set('anon_key', keyInput.trim())

    const res = await saveSupabaseConfig(formData)
    setIsSaving(false)

    if (res.success) {
      setStatus('Successfully connected! Reloading...')
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    } else {
      setStatus(res.error || 'Failed to save key')
    }
  }

  if (isConfigured) {
    return null
  }

  return (
    <div className="p-5 rounded-xl glass-panel border-amber-500/40 bg-gradient-to-r from-amber-950/20 via-black/60 to-purple-950/20 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400">
            <Key className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              Connect Supabase Cloud Backend
              <span className="text-[10px] font-semibold text-amber-400 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30">
                Action Required
              </span>
            </h4>
            <p className="text-xs text-gray-400">
              Project URL: <code className="text-nexus-neon">https://quxmnzplekgvyycdoseu.supabase.co</code>
            </p>
          </div>
        </div>

        <a
          href="https://supabase.com/dashboard/project/quxmnzplekgvyycdoseu/settings/api"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-nexus-neon hover:text-white transition-colors underline font-medium"
        >
          <span>Copy Project Anon Key</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      <form onSubmit={handleSave} className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={keyInput}
          onChange={(e) => setKeyInput(e.target.value)}
          placeholder="Paste NEXT_PUBLIC_SUPABASE_ANON_KEY (eyJhbGciOi...)"
          className="flex-1 px-4 py-2 bg-black/60 border border-white/20 rounded-lg text-xs text-white placeholder-gray-500 focus:outline-none focus:border-nexus-neon"
        />
        <Button size="sm" type="submit" disabled={isSaving || !keyInput.trim()}>
          {isSaving ? 'Connecting...' : 'CONNECT BACKEND'}
        </Button>
      </form>

      {status && (
        <p className="text-xs font-semibold text-amber-400">
          {status}
        </p>
      )}

      <div className="flex items-center gap-2 text-[11px] text-gray-400">
        <Sparkles className="w-3.5 h-3.5 text-nexus-neon shrink-0" />
        <span>
          <strong>Local Session Mode is active below:</strong> You can forge, edit, update, complete, and track quests right now! Adding your anon key will sync everything directly to PostgreSQL.
        </span>
      </div>
    </div>
  )
}
