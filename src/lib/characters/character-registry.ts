export interface EvolutionStage {
  stage: number
  name: string
  titlePrefix: string
  description: string
}

export const EVOLUTION_STAGES: EvolutionStage[] = [
  { stage: 1, name: 'Sprout', titlePrefix: 'Fledgling', description: 'Freshly awakened form, curious and eager to learn.' },
  { stage: 2, name: 'Adept', titlePrefix: 'Trained', description: 'Gaining discipline and refining elemental power.' },
  { stage: 3, name: 'Evolved', titlePrefix: 'Ascendant', description: 'A robust warrior bearing glowing sigils of mastery.' },
  { stage: 4, name: 'Elite', titlePrefix: 'Master', description: 'A formidable combatant radiating seasoned battle prowess.' },
  { stage: 5, name: 'Legendary', titlePrefix: 'Mythic', description: 'The pinnacle of evolution, revered across the realms.' },
]

export interface CharacterDef {
  index: number
  id: string
  name: string
  archetype: string
  element: 'Fire' | 'Water' | 'Nature' | 'Air' | 'Lightning' | 'Earth' | 'Ice' | 'Shadow' | 'Solar' | 'Cosmic'
  color: string
  accentColor: string
  bgGradient: string
  description: string
  lore: string
  unlockOrder: number
}

export const CHARACTER_ROSTER: CharacterDef[] = [
  {
    index: 0,
    id: 'emberfox',
    name: 'Emberfox',
    archetype: 'Fire Fox',
    element: 'Fire',
    color: '#f97316',
    accentColor: '#ea580c',
    bgGradient: 'from-orange-500/20 via-amber-500/10 to-transparent',
    description: 'A nimble flame spirit ignited by creative passion and willpower.',
    lore: 'Born from the embers of the first forged forge-stone, Emberfox runs like wild wildfire through mountains.',
    unlockOrder: 1,
  },
  {
    index: 1,
    id: 'aqualynx',
    name: 'Aqualynx',
    archetype: 'River Lynx',
    element: 'Water',
    color: '#06b6d4',
    accentColor: '#0891b2',
    bgGradient: 'from-cyan-500/20 via-blue-500/10 to-transparent',
    description: 'A serene aquatic feline moving with effortless adaptability and focus.',
    lore: 'Patient as a waterfall pool, Aqualynx waits for the perfect moment before striking with razor precision.',
    unlockOrder: 2,
  },
  {
    index: 2,
    id: 'mossling',
    name: 'Mossling',
    archetype: 'Forest Guardian',
    element: 'Nature',
    color: '#22c55e',
    accentColor: '#16a34a',
    bgGradient: 'from-emerald-500/20 via-green-500/10 to-transparent',
    description: 'An ancient guardian of flora and woodland life, thriving on patience.',
    lore: 'Covered in elder moss and ancient bark, Mossling embodies quiet daily growth that slowly moves mountains.',
    unlockOrder: 3,
  },
  {
    index: 3,
    id: 'zephyros',
    name: 'Zephyros',
    archetype: 'Gale Falcon',
    element: 'Air',
    color: '#38bdf8',
    accentColor: '#0284c7',
    bgGradient: 'from-sky-500/20 via-indigo-500/10 to-transparent',
    description: 'A swift avian voyager soaring through towering thermals at lightning speeds.',
    lore: 'The wind whispers secrets to Zephyros as it dives through cloud canyons to scout the uncharted frontier.',
    unlockOrder: 4,
  },
  {
    index: 4,
    id: 'sparkbeast',
    name: 'Sparkbeast',
    archetype: 'Thunder Pup',
    element: 'Lightning',
    color: '#eab308',
    accentColor: '#ca8a04',
    bgGradient: 'from-yellow-500/20 via-amber-500/10 to-transparent',
    description: 'A static-charged pack fighter crackling with explosive kinetic momentum.',
    lore: 'When lightning strikes the iron peaks, Sparkbeast is born, forever charging forward without hesitation.',
    unlockOrder: 5,
  },
  {
    index: 5,
    id: 'terranod',
    name: 'Terranod',
    archetype: 'Crystal Armadillo',
    element: 'Earth',
    color: '#84cc16',
    accentColor: '#65a30d',
    bgGradient: 'from-lime-500/20 via-emerald-500/10 to-transparent',
    description: 'A fortress of quartz and geode armor, impervious to burnout and despair.',
    lore: 'Formed under tectonic pressures, Terranod rolls into an impenetrable ball when adversity strikes.',
    unlockOrder: 6,
  },
  {
    index: 6,
    id: 'frosthowl',
    name: 'Frosthowl',
    archetype: 'Arctic Wolf',
    element: 'Ice',
    color: '#93c5fd',
    accentColor: '#3b82f6',
    bgGradient: 'from-blue-400/20 via-cyan-400/10 to-transparent',
    description: 'A solitary glacier stalker whose chilling resolve cuts through all fog.',
    lore: 'Echoing across moonlit permafrost, Frosthowl leads adventurers through the darkest blizzards.',
    unlockOrder: 7,
  },
  {
    index: 7,
    id: 'shadowshade',
    name: 'Shadowshade',
    archetype: 'Umbra Wisp',
    element: 'Shadow',
    color: '#a855f7',
    accentColor: '#7e22ce',
    bgGradient: 'from-purple-500/20 via-indigo-500/10 to-transparent',
    description: 'A silent shadow entity that moves unseen, mastering focus and mental stealth.',
    lore: 'Dwells between the ticks of the clock, vanishing when distracted and sharpening when deep work begins.',
    unlockOrder: 8,
  },
  {
    index: 8,
    id: 'pyrosaur',
    name: 'Pyrosaur',
    archetype: 'Magma Drake',
    element: 'Fire',
    color: '#ef4444',
    accentColor: '#b91c1c',
    bgGradient: 'from-rose-500/20 via-orange-500/10 to-transparent',
    description: 'A heavy volcanic reptile with molten scales that incinerate procrastination.',
    lore: 'Resting within active craters, Pyrosaur transforms intense volcanic pressure into pure constructive drive.',
    unlockOrder: 9,
  },
  {
    index: 9,
    id: 'gladehorn',
    name: 'Gladehorn',
    archetype: 'Elder Stag',
    element: 'Nature',
    color: '#10b981',
    accentColor: '#047857',
    bgGradient: 'from-teal-500/20 via-emerald-500/10 to-transparent',
    description: 'A noble forest monarch whose blossoming antlers purify chaotic minds.',
    lore: 'Wherever Gladehorn treads, wild blossoms bloom and serenity returns to troubled hearts.',
    unlockOrder: 10,
  },
  {
    index: 10,
    id: 'solaria',
    name: 'Solaria',
    archetype: 'Sun Seraph',
    element: 'Solar',
    color: '#f59e0b',
    accentColor: '#d97706',
    bgGradient: 'from-amber-400/20 via-yellow-400/10 to-transparent',
    description: 'A radiant herald of daylight and dawn, energizing daily morning routines.',
    lore: 'Wielding the first rays of morning light, Solaria dispels night terrors and summons the morning energy.',
    unlockOrder: 11,
  },
  {
    index: 11,
    id: 'voidling',
    name: 'Voidling',
    archetype: 'Cosmic Sprite',
    element: 'Cosmic',
    color: '#8b5cf6',
    accentColor: '#6d28d9',
    bgGradient: 'from-violet-500/20 via-fuchsia-500/10 to-transparent',
    description: 'An enigmatic starry anomaly that bends negative distractions into raw knowledge.',
    lore: 'Born in interstellar nebulas, Voidling absorbs idle thoughts and distills them into cosmic insight.',
    unlockOrder: 12,
  },
  {
    index: 12,
    id: 'ironclad',
    name: 'Ironclad',
    archetype: 'Clockwork Automaton',
    element: 'Earth',
    color: '#78716c',
    accentColor: '#44403c',
    bgGradient: 'from-stone-500/20 via-amber-500/10 to-transparent',
    description: 'A tireless mechanical titan built on daily routine and rhythmic discipline.',
    lore: 'Forged with precision brass gears, Ironclad never falters, ticking steadily onward step by step.',
    unlockOrder: 13,
  },
  {
    index: 13,
    id: 'mistweaver',
    name: 'Mistweaver',
    archetype: 'Illusion Serpent',
    element: 'Water',
    color: '#14b8a6',
    accentColor: '#0f766e',
    bgGradient: 'from-teal-400/20 via-cyan-500/10 to-transparent',
    description: 'A serpentine weaver of coastal mist, guiding travellers through illusion and doubt.',
    lore: 'Gliding between tide and shore, Mistweaver cleanses self-doubt with calming oceanic whispers.',
    unlockOrder: 14,
  },
  {
    index: 14,
    id: 'starling',
    name: 'Starling',
    archetype: 'Astral Phoenix',
    element: 'Solar',
    color: '#ec4899',
    accentColor: '#be185d',
    bgGradient: 'from-pink-500/20 via-purple-500/10 to-transparent',
    description: 'The supreme mythical rebirth phoenix, eternal champion of continuous lifelong ascent.',
    lore: 'The crowning legend of the Life RPG realm, rising in brilliant starlight whenever a hero achieves greatness.',
    unlockOrder: 15,
  },
]

export function getCharacterById(id: string): CharacterDef {
  return CHARACTER_ROSTER.find(c => c.id.toLowerCase() === id.toLowerCase()) || CHARACTER_ROSTER[0]
}

export function getCharacterByIndex(index: number): CharacterDef {
  const safeIndex = Math.max(0, Math.min(CHARACTER_ROSTER.length - 1, index || 0))
  return CHARACTER_ROSTER[safeIndex]
}

export function getStageName(stage: number): string {
  const safeStage = Math.max(1, Math.min(5, stage || 1))
  return EVOLUTION_STAGES[safeStage - 1].name
}

export function getStageTitlePrefix(stage: number): string {
  const safeStage = Math.max(1, Math.min(5, stage || 1))
  return EVOLUTION_STAGES[safeStage - 1].titlePrefix
}
