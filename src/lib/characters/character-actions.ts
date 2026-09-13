// Character Idle Actions & Emote System for Life RPG
// Provides periodic, natural, character-tailored animations

export type CharacterActionType =
  | 'idle'
  | 'wave'
  | 'spin'
  | 'leap'
  | 'prance'
  | 'sit'
  | 'punch'
  | 'victory'
  | 'jump'
  | 'look_around'
  | 'stretch'
  | 'happy'
  | 'special'

export interface ActionDefinition {
  id: CharacterActionType
  name: string
  emoteText: string
  durationMs: number
  soundEffect?: 'tap' | 'pop' | 'strike' | 'victory' | 'pet'
  cssClass: string
}

export const BASE_ACTIONS: Record<CharacterActionType, ActionDefinition> = {
  idle: {
    id: 'idle',
    name: 'Serene Breathing',
    emoteText: '',
    durationMs: 0,
    cssClass: 'animate-ref-idle',
  },
  wave: {
    id: 'wave',
    name: 'Friendly Wave',
    emoteText: 'Hey adventurer! 👋',
    durationMs: 2100,
    soundEffect: 'tap',
    cssClass: 'animate-ref-wave',
  },
  spin: {
    id: 'spin',
    name: 'Turn & Spin',
    emoteText: 'Wheee! 💫',
    durationMs: 1900,
    soundEffect: 'pop',
    cssClass: 'animate-ref-spin',
  },
  leap: {
    id: 'leap',
    name: 'Joyful Bound',
    emoteText: 'Bound forward! 🐾',
    durationMs: 1800,
    soundEffect: 'pop',
    cssClass: 'animate-ref-leap',
  },
  prance: {
    id: 'prance',
    name: 'Playful Steps',
    emoteText: 'Tippy-taps! 🎵',
    durationMs: 1700,
    soundEffect: 'tap',
    cssClass: 'animate-ref-prance',
  },
  sit: {
    id: 'sit',
    name: 'Rest & Breathe',
    emoteText: 'Taking a peaceful rest... 🌿',
    durationMs: 2500,
    soundEffect: 'pet',
    cssClass: 'animate-ref-sit',
  },
  punch: {
    id: 'punch',
    name: 'Air Punch',
    emoteText: 'Power strike! 🥊',
    durationMs: 1600,
    soundEffect: 'strike',
    cssClass: 'animate-action-punch',
  },
  victory: {
    id: 'victory',
    name: 'Celebration Pose',
    emoteText: 'Leveling up! ⚔️',
    durationMs: 2200,
    soundEffect: 'victory',
    cssClass: 'animate-ref-celebrate',
  },
  jump: {
    id: 'jump',
    name: 'Playful Jump',
    emoteText: 'Boing! 💫',
    durationMs: 1800,
    soundEffect: 'pop',
    cssClass: 'animate-ref-leap',
  },
  look_around: {
    id: 'look_around',
    name: 'Scouting',
    emoteText: 'Exploring the realm... 👀',
    durationMs: 1900,
    cssClass: 'animate-action-look',
  },
  stretch: {
    id: 'stretch',
    name: 'Deep Stretch',
    emoteText: 'Ready for quests! 🧘',
    durationMs: 1800,
    cssClass: 'animate-action-stretch',
  },
  happy: {
    id: 'happy',
    name: 'Happy Cheer',
    emoteText: 'Let’s do this! ✨',
    durationMs: 2000,
    soundEffect: 'pet',
    cssClass: 'animate-ref-wave',
  },
  special: {
    id: 'special',
    name: 'Elemental Surge',
    emoteText: 'Elemental spark! ⚡',
    durationMs: 2000,
    soundEffect: 'pop',
    cssClass: 'animate-action-special',
  },
}

// Character archetype action customization
export const CHARACTER_ACTION_CUSTOMIZATIONS: Record<string, Partial<Record<CharacterActionType, string>>> = {
  Emberfox: {
    punch: 'Fire paw jab! 🔥',
    victory: 'Blazing victory! 🦊',
    special: 'Flame burst! 🌋',
  },
  Aqualynx: {
    wave: 'Tidal ripple! 🌊',
    jump: 'Splash jump! 💧',
    special: 'Geyser focus! 🌀',
  },
  Frostowl: {
    stretch: 'Wing expansion! ❄️',
    look_around: 'Eagle eye scan... 🦉',
    special: 'Blizzard aura! 🌨️',
  },
  Stonecub: {
    punch: 'Earth shatter stomp! 🪨',
    victory: 'Titan flex! 💪',
    special: 'Granite shield! ⛰️',
  },
  Mindmoth: {
    jump: 'Luminous levitation! 🦋',
    happy: 'Psyche shimmer! 🔮',
    special: 'Astral pulse! ✨',
  },
  Sylphid: {
    wave: 'Breeze greeting! 🍃',
    stretch: 'Floral flourish! 🌸',
    special: 'Gale whirl! 🌪️',
  },
  Boltbeak: {
    punch: 'Thunder pecking! ⚡',
    victory: 'Voltage surge! ⚡',
    special: 'Chain lightning! 🌩️',
  },
  Duskfang: {
    punch: 'Shadow swipe! 🌑',
    look_around: 'Stalking shadows... 🐾',
    special: 'Eclipse shroud! 🌘',
  },
}

export function getRandomActionForCharacter(characterName: string): ActionDefinition {
  const actionKeys: CharacterActionType[] = ['wave', 'spin', 'leap', 'prance', 'sit', 'victory']
  const randKey = actionKeys[Math.floor(Math.random() * actionKeys.length)]
  const base = BASE_ACTIONS[randKey]

  const customText = CHARACTER_ACTION_CUSTOMIZATIONS[characterName]?.[randKey]
  if (customText) {
    return { ...base, emoteText: customText }
  }
  return base
}
