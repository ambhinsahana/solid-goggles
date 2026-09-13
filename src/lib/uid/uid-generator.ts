// Collision-safe, readable Public Player Identifier (UID)
// Format: LIFE-XXXX-XX (e.g. LIFE-7K4A-92)
// Uses uppercase alphanumeric characters excluding ambiguous glyphs (0, O, 1, I)

const ALPHABET = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ'

export function generatePublicUid(): string {
  let part1 = ''
  for (let i = 0; i < 4; i++) {
    const rand = Math.floor(Math.random() * ALPHABET.length)
    part1 += ALPHABET[rand]
  }

  let part2 = ''
  for (let i = 0; i < 2; i++) {
    const rand = Math.floor(Math.random() * ALPHABET.length)
    part2 += ALPHABET[rand]
  }

  return `LIFE-${part1}-${part2}`
}

export function isValidPublicUid(uid: string): boolean {
  if (!uid || typeof uid !== 'string') return false
  const clean = uid.trim().toUpperCase()
  return /^LIFE-[2-9A-HJ-NP-Z]{4}-[2-9A-HJ-NP-Z]{2}$/.test(clean)
}

export function formatPublicUid(input: string): string {
  if (!input) return ''
  let clean = input.trim().toUpperCase()
  if (!clean.startsWith('LIFE-')) {
    // If user just typed the code without LIFE- prefix, handle gracefully
    clean = clean.replace(/[^2-9A-HJ-NP-Z]/g, '')
    if (clean.length === 6) {
      return `LIFE-${clean.slice(0, 4)}-${clean.slice(4, 6)}`
    }
  }
  return clean
}

// Generate stable deterministic fallback UID for demo/unauthenticated accounts
export function getStableFallbackUid(userId: string = 'local-hero'): string {
  let hash = 0
  for (let i = 0; i < userId.length; i++) {
    hash = (hash << 5) - hash + userId.charCodeAt(i)
    hash |= 0
  }
  const abs = Math.abs(hash)
  const p1 = ALPHABET[(abs >> 0) % ALPHABET.length] +
             ALPHABET[(abs >> 3) % ALPHABET.length] +
             ALPHABET[(abs >> 6) % ALPHABET.length] +
             ALPHABET[(abs >> 9) % ALPHABET.length]
  const p2 = ALPHABET[(abs >> 12) % ALPHABET.length] +
             ALPHABET[(abs >> 15) % ALPHABET.length]
  return `LIFE-${p1}-${p2}`
}
