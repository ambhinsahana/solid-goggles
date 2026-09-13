# LIFEQUEST (NEXUS) — PRODUCT SPECIFICATION

**Version:** 1.0.0  
**Status:** Production Ready / Active Hackathon Build  
**Tagline:** Turn Your Life Into a Game.  

---

## 1. Executive Summary & Core Mission
LifeQuest (operating under the cyber-mythic aesthetic "NEXUS") is an open-world gamified personal development platform. It bridges the gap between real-world productivity and RPG progression mechanics, allowing users to evolve their digital avatar, unlock titles and companion evolutions, slay bad habits, and climb global leaderboards by maintaining discipline in daily life.

---

## 2. Core User Loop
```
REAL-LIFE ACTIVITY
       │
       ▼
ACTIVE QUEST CREATION (Title, Difficulty, Path, Time, Deadline)
       │
       ▼
DISCIPLINED EXECUTION & LOGGING
       │
       ▼
SERVER-VALIDATED COMPLETION
       │
       ▼
REWARDS: XP + GOLD + PATH ATTRIBUTES (Learning, Fitness, Creativity, Discipline, Social)
       │
       ▼
NON-LINEAR LEVEL UP (100 * (N-1)^1.5)
       │
       ▼
COMPANION EVOLUTION (Spriggo, Ignis, Aqualis across 3 Stages)
       │
       ▼
HABIT SLAYING & ARMORY UNLOCKS (Titles, Sigils, Skins, Mystery Boxes)
       │
       ▼
GLOBAL LEADERBOARD ASCENT & UNBROKEN STREAKS
```

---

## 3. The 5 Core Paths of Progression
The game recognizes 5 foundational pillars of personal growth:
1. **Learning (Mind & Intellect):** Reading, coding, studying, mastering new skills.
2. **Fitness (Vitality & Body):** Strength training, endurance, cardio, mobility, hydration.
3. **Creativity (Art & Innovation):** Writing, designing, crafting, producing original work.
4. **Discipline (Willpower & Routine):** Early rising, deep focus blocks, habit resistance, timeboxing.
5. **Social (Connection & Empathy):** Networking, mentoring, family time, community impact.

---

## 4. Key Systems & Modules

### 4.1 Quest Engine
- **Difficulty Matrix:**
  - Easy: 25 XP, 10 Gold, 1 Path Stat
  - Medium: 50 XP, 25 Gold, 2 Path Stats
  - Hard: 100 XP, 60 Gold, 4 Path Stats
  - Epic: 200 XP, 150 Gold, 8 Path Stats
- **CRUD Operations:** Full create, read, inline edit (with difficulty/path adjustment), completion, and deletion.
- **Server Verification:** Rewards and XP are strictly computed on the server. The client cannot send arbitrary reward values.

### 4.2 Non-Linear Level Progression
$$\text{XP Required for Level } N = 100 \times (N-1)^{1.5}$$
Levels represent true dedication, resisting rapid inflation and ensuring high-level players hold immense prestige.

### 4.3 Companion Evolution Engine
Users bond with an elemental guardian upon onboarding:
- **Spriggo (Earth / Learning & Nature):** Evolves through Sproutling (Lvl 1), Floraguard (Lvl 5), and Yggdrasil (Lvl 10).
- **Ignis (Fire / Fitness & Willpower):** Evolves through Spark (Lvl 1), Blazeclaw (Lvl 5), and Sol Invictus (Lvl 10).
- **Aqualis (Water / Mind & Creativity):** Evolves through Droplet (Lvl 1), Torrent (Lvl 5), and Leviathan Warden (Lvl 10).

### 4.4 Habit Monsters Arena
Negative habits are personified as raid bosses with persistent HP pools.
- Defeating habits is logged through real-world resistance (e.g. 30 minutes offline, avoiding junk food).
- Slaying bosses awards **Mystery Boxes** containing bonus Gold and rare titles.
- Non-punitive, empowering framing that celebrates willpower over guilt.

### 4.5 The Armory & Wardrobe
- **Shop Catalog:** Four tiers of cosmetic rarity (Common, Rare, Epic, Legendary).
- **Cosmetics:** Titles (e.g. *Shadowblade*, *Grand Archmage*, *The Unstoppable*), Badges/Sigils (e.g. *Phoenix Sigil*, *Aegis of Will*), Companion Skins (e.g. *Autumn Spriggo*, *Neon Cyber Spriggo*), and Interface Themes.
- **Wardrobe Manager:** Interactive client interface allowing instant equipping/unequipping with optimistic state reflection.

### 4.6 Global Hall of Legends (Leaderboard)
- Real-time aggregation of server-verified stats.
- Top 3 podium with elevated Gold, Silver, and Bronze pedestals.
- Multiple competitive vectors: Lifetime XP, Unbroken Streaks, and Level.
- Public-safe privacy: strictly isolates email, password, and private task content from ranking queries.
