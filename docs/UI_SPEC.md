# LIFEQUEST (NEXUS) — UI & DESIGN SYSTEM SPECIFICATION

**Design Philosophy:** "Cyber-Mythic RPG meets High-Performance Productivity."  
The user should feel like the protagonist in a sci-fi fantasy world where real-world discipline builds a formidable digital avatar.

---

## 1. Color Palette & Theming Tokens

### 1.1 Base Canvas & Glass
- **Obsidian Black Base:** `#030712` / `rgb(3, 7, 18)`
- **Glass Panel Surface:** `rgba(255, 255, 255, 0.02)` with `backdrop-filter: blur(20px)`
- **Panel Border Stroke:** `rgba(255, 255, 255, 0.08)` to `rgba(255, 255, 255, 0.15)`

### 1.2 Elemental Path Accents
- **Learning (Mind):** Celestial Cyan (`#00E5FF`, `rgba(0, 229, 255, 0.2)`)
- **Fitness (Vitality):** Solar Orange / Ember (`#F97316`, `rgba(249, 115, 22, 0.2)`)
- **Creativity (Innovation):** Arcane Violet / Purple (`#A855F7`, `rgba(168, 85, 247, 0.2)`)
- **Discipline (Willpower):** Royal Indigo (`#6366F1`, `rgba(99, 102, 241, 0.2)`)
- **Social (Bond):** Radiant Emerald (`#10B981`, `rgba(16, 185, 129, 0.2)`)

### 1.3 Economy & Rarity Accents
- **Gold & Vault:** Molten Amber (`#F59E0B`, `rgba(245, 158, 11, 0.2)`)
- **Threat & Habit Danger:** Crimson Rose (`#F43F5E`, `rgba(244, 63, 94, 0.2)`)
- **Common:** Silver Slate (`#94A3B8`)
- **Rare:** Azure Blue (`#3B82F6`)
- **Epic:** Imperial Violet (`#A855F7`)
- **Legendary:** Solar Gold (`#F59E0B`)

---

## 2. Information Hierarchy Standards

### 2.1 The 5-Second Dashboard Rule
Upon landing on the Command Center (`/dashboard`), the user must be able to answer 5 questions in under 5 seconds:
1. **Who am I?** (Character name, equipped title, active creature avatar).
2. **What level am I?** (Nexus Level, current XP / XP required to level up).
3. **How disciplined have I been?** (Unbroken streak counter with flame animation).
4. **What must I do next?** (Active quest cards ordered by deadline/difficulty).
5. **What reward will I receive?** (Clear XP & Gold pill badges on each quest card).

### 2.2 Quest Card Design Guidelines
- Path indicator icon and color strip on the left border.
- Clear title with optional description and planned execution time (e.g. `⚡ 45m`).
- Difficulty indicator badge (Easy / Medium / Hard / Epic).
- Reward tag showing exact `+XX XP` and `+XX Gold`.
- Quick action controls: Complete (Green check), Edit (Pencil modal trigger), Delete (Trash bin).

---

## 3. Responsive Layout & Breakpoints
- **Mobile (<640px):** Single-column stacked cards, collapsible hamburger navigation, full-width modal sheets.
- **Tablet (640px – 1024px):** 2-column grid for quests and shop items, persistent top navigation.
- **Desktop (1024px+):** Multi-column dashboard with 4-metric quick overview row, 3-column quest grid, and multi-attribute gauge bars.

---

## 4. Animation & Micro-Interaction Principles
- **Transitions:** `transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1)` on hover states.
- **State Feedback:** Instant optimistic UI updates on quest completion, equips, and strikes, with asynchronous server synchronization.
- **Celebration Triggers:** Glowing particle aura on level-up thresholds and Mystery Box unlocks.
