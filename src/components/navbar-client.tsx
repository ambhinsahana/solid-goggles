'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Sparkles, Shield, Award, ShoppingBag, Trophy, Volume2, VolumeX, Menu, X, User, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { gameAudio } from '@/lib/audio/game-audio'
import { logout } from '@/app/login/actions'

interface NavbarClientProps {
  isAuthenticated: boolean
  displayName?: string
  coins: number
  xp: number
  streak: number
}

export function NavbarClient({
  isAuthenticated,
  displayName = 'Adventurer',
  coins = 0,
  xp = 0,
  streak = 0,
}: NavbarClientProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const pathname = usePathname()

  const navLinks = [
    { href: '/dashboard', label: 'DASHBOARD', icon: Shield },
    { href: '/character', label: 'CHARACTERS', icon: Award },
    { href: '/shop', label: 'SHOP', icon: ShoppingBag },
    { href: '/leaderboard', label: 'SOCIAL', icon: Trophy },
  ]

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true)
      await logout()
    } catch {
      setIsLoggingOut(false)
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/85 liquid-glass-hud shadow-[0_8px_32px_rgba(100,70,30,0.08)] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link
            href={isAuthenticated ? '/dashboard' : '/'}
            onClick={() => gameAudio.playPop()}
            className="flex items-center gap-2.5 group touch-bounce"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-300 to-amber-500 border border-amber-200/80 shadow-[0_2px_10px_rgba(212,168,83,0.35)] flex items-center justify-center group-hover:scale-105 transition-all">
              <Sparkles className="w-5 h-5 text-amber-950 drop-shadow-sm" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-black tracking-widest text-lg text-world-text group-hover:text-amber-700 transition-colors">
                LIFE RPG
              </span>
              <span className="text-[10px] tracking-widest text-amber-900/60 uppercase -mt-1 font-bold">
                Your Adventure
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1.5 bg-black/5 p-1 rounded-xl border border-black/5">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              const Icon = link.icon
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => gameAudio.playTap()}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-black tracking-wide touch-bounce ${
                    isActive
                      ? 'text-amber-950 bg-white/90 shadow-sm border border-white/90 scale-100'
                      : 'text-[#8a7a6a] hover:text-world-text hover:bg-white/40 border border-transparent'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-600' : ''}`} />
                  <span>{link.label}</span>
                </Link>
              )
            })}
          </div>

          {/* Right Action Buttons & Sound Toggle */}
          <div className="hidden md:flex items-center gap-3">
            {/* Real Stats HUD */}
            <div className="flex items-center gap-3 mr-1 glass-pill px-3.5 py-1.5 rounded-full border border-white/90 shadow-sm">
              <div
                className="flex items-center gap-1.5 touch-bounce cursor-default"
                title="Gold Coins"
                onClick={() => gameAudio.playCoin()}
              >
                <span className="text-sm font-black text-amber-600 drop-shadow-sm">{coins}</span>
                <div className="w-4 h-4 rounded-full bg-gradient-to-br from-yellow-300 to-amber-500 shadow-sm border border-amber-600/50 flex items-center justify-center text-[9px] text-amber-950 font-black">
                  G
                </div>
              </div>
              <div className="w-px h-4 bg-amber-900/10"></div>
              <div
                className="flex items-center gap-1.5 touch-bounce cursor-default"
                title="Lifetime XP"
                onClick={() => gameAudio.playPop()}
              >
                <span className="text-sm font-black text-cyan-600 drop-shadow-sm">{xp}</span>
                <Sparkles className="w-4 h-4 text-cyan-500" />
              </div>
              <div className="w-px h-4 bg-amber-900/10"></div>
              <div
                className="flex items-center gap-1.5 touch-bounce cursor-default"
                title="Day Streak"
                onClick={() => gameAudio.playPop()}
              >
                <span className="text-sm font-black text-rose-500 drop-shadow-sm">{streak}</span>
                <span className="text-sm animate-bounce">🔥</span>
              </div>
            </div>

            {/* Audio Toggle */}
            <button
              onClick={() => {
                const muted = gameAudio.toggleMute()
                setIsMuted(muted)
                if (!muted) gameAudio.playPop()
              }}
              className="glass-pill rounded-full flex items-center justify-center cursor-pointer touch-bounce px-2.5 py-1.5 hover:border-amber-400 text-[#8a7a6a] hover:text-amber-800 gap-1 text-xs font-bold"
              title={isMuted ? 'Turn Sound ON' : 'Mute Sound'}
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-4 h-4 text-rose-500" />
                  <span className="text-[10px] text-rose-500 font-black">MUTE</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-emerald-600 animate-pulse" />
                  <span className="text-[10px] text-emerald-700 font-black">SFX ON</span>
                </>
              )}
            </button>

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/character"
                  onClick={() => gameAudio.playTap()}
                  className="flex items-center gap-1.5 text-xs font-black text-world-text/90 hover:text-amber-800 px-2.5 py-1.5 rounded-lg glass-pill hover:bg-white/80 touch-bounce"
                  title="Your Character Profile"
                >
                  <div className="w-6 h-6 rounded-full bg-amber-200/60 border border-amber-400/50 flex items-center justify-center">
                    <User className="w-3.5 h-3.5 text-amber-800" />
                  </div>
                  <span className="max-w-[100px] truncate">{displayName}</span>
                </Link>
                <button
                  onClick={async () => {
                    gameAudio.playTap()
                    await handleLogout()
                  }}
                  disabled={isLoggingOut}
                  className="flex items-center gap-1 text-xs font-black text-rose-600 hover:text-rose-700 px-3 py-1.5 rounded-lg border border-rose-200 bg-rose-50/70 hover:bg-rose-100 touch-bounce cursor-pointer shadow-sm"
                  title="Sign out of your account"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>{isLoggingOut ? 'EXITING...' : 'LOG OUT'}</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  onClick={() => gameAudio.playTap()}
                  className="flex items-center gap-1.5 text-sm font-black text-[#8a7a6a] hover:text-world-text px-3 py-1.5 rounded-lg hover:bg-white/50 touch-bounce"
                >
                  <User className="w-4 h-4 text-amber-600" />
                  <span>LOGIN</span>
                </Link>
                <Button size="sm" asChild className="btn-clash-gold bg-gradient-to-b from-amber-400 to-amber-600 text-amber-950 border-none shadow-[0_4px_0_#92400e] hover:shadow-[0_2px_0_#92400e] hover:translate-y-[2px] transition-all font-black px-5 touch-bounce">
                  <Link href="/onboarding" onClick={() => gameAudio.playPop()}>
                    PLAY NOW
                  </Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => {
                gameAudio.playTap()
                setIsOpen(!isOpen)
              }}
              className="text-[#8a7a6a] hover:text-world-text p-2 focus:outline-none touch-bounce"
              aria-label="Toggle Navigation Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden border-b border-nexus-border bg-world-panel/95 backdrop-blur-2xl px-4 pt-2 pb-6 space-y-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            const Icon = link.icon
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold tracking-wide transition-all ${
                  isActive
                    ? 'text-world-text bg-world-accent/20 border border-world-accent/50'
                    : 'text-[#8a7a6a] hover:text-world-text hover:bg-black/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{link.label}</span>
              </Link>
            )
          })}
          <div className="pt-4 border-t border-black/10 flex flex-col gap-2">
            <div className="flex items-center justify-around py-3 bg-black/5 rounded-lg border border-black/10 mb-2">
              <div className="flex items-center gap-1.5" title="Coins">
                <span className="text-sm font-black text-amber-500">{coins}</span>
                <span className="text-xs font-bold text-amber-600">G</span>
              </div>
              <div className="flex items-center gap-1.5" title="XP">
                <span className="text-sm font-black text-cyan-600">{xp}</span>
                <Sparkles className="w-4 h-4 text-cyan-500" />
              </div>
              <div className="flex items-center gap-1.5" title="Streak">
                <span className="text-sm font-black text-rose-500">{streak}</span>
                <span className="text-sm">🔥</span>
              </div>
            </div>
            {isAuthenticated ? (
              <button
                onClick={() => {
                  setIsOpen(false)
                  handleLogout()
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-black text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-200"
              >
                <LogOut className="w-4 h-4" />
                <span>LOG OUT</span>
              </button>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-bold text-[#8a7a6a] hover:bg-black/5"
                >
                  <User className="w-4 h-4 text-world-accent" />
                  <span>LOGIN</span>
                </Link>
                <Button asChild className="w-full btn-clash-gold bg-gradient-to-b from-amber-400 to-amber-600 text-amber-950 border-none shadow-[0_4px_0_#92400e] font-black">
                  <Link href="/onboarding" onClick={() => setIsOpen(false)}>
                    PLAY NOW
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
