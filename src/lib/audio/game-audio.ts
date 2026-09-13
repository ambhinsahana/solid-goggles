// LifeQuest (Nexus) Web Audio Sound Synthesis Engine
// Zero external mp3 dependencies - generated in real-time via Web Audio API

class SoundManager {
  private ctx: AudioContext | null = null
  private isMuted: boolean = false

  constructor() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('lifequest_muted')
      this.isMuted = saved === 'true'
    }
  }

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext
      if (AudioCtx) {
        this.ctx = new AudioCtx()
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume()
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted
    if (typeof window !== 'undefined') {
      localStorage.setItem('lifequest_muted', String(this.isMuted))
    }
    return this.isMuted
  }

  public getMuted(): boolean {
    return this.isMuted
  }

  // Crisp tactile click/tap
  public playTap() {
    if (this.isMuted) return
    this.initContext()
    if (!this.ctx) return

    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(440, this.ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.05)

    gain.gain.setValueAtTime(0.08, this.ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05)

    osc.connect(gain)
    gain.connect(this.ctx.destination)
    osc.start()
    osc.stop(this.ctx.currentTime + 0.05)
  }

  // Bouncy high bubble pop (Hacktropica style pill/chip toggle)
  public playPop() {
    if (this.isMuted) return
    this.initContext()
    if (!this.ctx) return

    const t = this.ctx.currentTime
    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(520, t)
    osc.frequency.exponentialRampToValueAtTime(1150, t + 0.04)

    gain.gain.setValueAtTime(0.12, t)
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.06)

    osc.connect(gain)
    gain.connect(this.ctx.destination)
    osc.start(t)
    osc.stop(t + 0.06)
  }

  // Smooth airy swoosh for tab switches & drawer transitions
  public playSwoosh() {
    if (this.isMuted) return
    this.initContext()
    if (!this.ctx) return

    const t = this.ctx.currentTime
    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()

    osc.type = 'triangle'
    osc.frequency.setValueAtTime(800, t)
    osc.frequency.exponentialRampToValueAtTime(240, t + 0.12)

    gain.gain.setValueAtTime(0.08, t)
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.14)

    osc.connect(gain)
    gain.connect(this.ctx.destination)
    osc.start(t)
    osc.stop(t + 0.14)
  }

  // Crisp mechanical lock / equip sound
  public playEquip() {
    if (this.isMuted) return
    this.initContext()
    if (!this.ctx) return

    const t = this.ctx.currentTime
    const osc1 = this.ctx.createOscillator()
    const osc2 = this.ctx.createOscillator()
    const gain = this.ctx.createGain()

    osc1.type = 'triangle'
    osc2.type = 'sine'

    osc1.frequency.setValueAtTime(880, t) // A5
    osc2.frequency.setValueAtTime(1320, t + 0.05) // E6

    gain.gain.setValueAtTime(0.12, t)
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2)

    osc1.connect(gain)
    osc2.connect(gain)
    gain.connect(this.ctx.destination)

    osc1.start(t)
    osc1.stop(t + 0.08)
    osc2.start(t + 0.05)
    osc2.stop(t + 0.2)
  }

  // Subtle hover tick
  public playHover() {
    if (this.isMuted) return
    this.initContext()
    if (!this.ctx) return

    const t = this.ctx.currentTime
    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(1200, t)

    gain.gain.setValueAtTime(0.02, t)
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.02)

    osc.connect(gain)
    gain.connect(this.ctx.destination)
    osc.start(t)
    osc.stop(t + 0.02)
  }

  // Gold coin reward chime
  public playCoin() {
    if (this.isMuted) return
    this.initContext()
    if (!this.ctx) return

    const t = this.ctx.currentTime
    const osc1 = this.ctx.createOscillator()
    const osc2 = this.ctx.createOscillator()
    const gain = this.ctx.createGain()

    osc1.type = 'sine'
    osc2.type = 'triangle'

    osc1.frequency.setValueAtTime(987.77, t) // B5
    osc1.frequency.setValueAtTime(1318.51, t + 0.08) // E6

    osc2.frequency.setValueAtTime(1975.53, t + 0.08) // B6

    gain.gain.setValueAtTime(0.12, t)
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35)

    osc1.connect(gain)
    osc2.connect(gain)
    gain.connect(this.ctx.destination)

    osc1.start(t)
    osc2.start(t + 0.08)
    osc1.stop(t + 0.35)
    osc2.stop(t + 0.35)
  }

  // Quest victory fanfare / Level up arpeggio
  public playFanfare() {
    if (this.isMuted) return
    this.initContext()
    if (!this.ctx) return

    const notes = [523.25, 659.25, 783.99, 1046.50] // C5, E5, G5, C6
    const t = this.ctx.currentTime

    notes.forEach((freq, idx) => {
      if (!this.ctx) return
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()
      osc.type = 'triangle'
      osc.frequency.setValueAtTime(freq, t + idx * 0.08)

      gain.gain.setValueAtTime(0.15, t + idx * 0.08)
      gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.08 + 0.25)

      osc.connect(gain)
      gain.connect(this.ctx.destination)
      osc.start(t + idx * 0.08)
      osc.stop(t + idx * 0.08 + 0.25)
    })
  }

  public playVictory() {
    this.playFanfare()
  }

  // Monster heavy slash / strike
  public playStrike() {
    if (this.isMuted) return
    this.initContext()
    if (!this.ctx) return

    const t = this.ctx.currentTime
    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()

    osc.type = 'sawtooth'
    osc.frequency.setValueAtTime(220, t)
    osc.frequency.exponentialRampToValueAtTime(40, t + 0.2)

    gain.gain.setValueAtTime(0.25, t)
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.25)

    osc.connect(gain)
    gain.connect(this.ctx.destination)
    osc.start(t)
    osc.stop(t + 0.25)
  }

  // Cute companion pet / cheer sound (Pokemon Go style)
  public playPet() {
    if (this.isMuted) return
    this.initContext()
    if (!this.ctx) return

    const t = this.ctx.currentTime
    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(600, t)
    osc.frequency.exponentialRampToValueAtTime(950, t + 0.12)
    osc.frequency.exponentialRampToValueAtTime(1200, t + 0.22)

    gain.gain.setValueAtTime(0.1, t)
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3)

    osc.connect(gain)
    gain.connect(this.ctx.destination)
    osc.start(t)
    osc.stop(t + 0.3)
  }
}

export const gameAudio = new SoundManager()

export type SoundEffectType = 'tap' | 'pop' | 'swoosh' | 'equip' | 'coin' | 'fanfare' | 'victory' | 'strike' | 'pet' | 'hover'

export function playGameSound(effect: SoundEffectType) {
  switch (effect) {
    case 'tap': return gameAudio.playTap()
    case 'pop': return gameAudio.playPop()
    case 'swoosh': return gameAudio.playSwoosh()
    case 'equip': return gameAudio.playEquip()
    case 'coin': return gameAudio.playCoin()
    case 'fanfare': return gameAudio.playFanfare()
    case 'victory': return gameAudio.playVictory()
    case 'strike': return gameAudio.playStrike()
    case 'pet': return gameAudio.playPet()
    case 'hover': return gameAudio.playHover()
  }
}
