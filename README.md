# ⚔️ Life RPG — Gamified Habit & Progression Engine

[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Database%20%26%20Auth-3ECF8E?style=flat-square&logo=supabase)](https://supabase.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

> Turn your daily life, habits, productivity, and fitness goals into an epic RPG progression experience. Level up your character, battle monsters, collect mythical companions, team up with friends via unique Player UIDs, and conquer the realm!

---

## 🌟 Key Features

### 🎮 Immersive Living Game HUD & World Scene
- **Animated World Scene**: Responsive floating pedestal with dynamic daylight sky, ground shadows, and living character animations.
- **Reference-Accurate Sprite Animations**: Pixel-art and SVG sprites with natural micro-motions — breathing, spinning, leaping, waving, prancing, and victory celebrations.
- **Persistent Game HUD**: Instant visibility of current Level, XP progress bar, Gold reserves, Streak counters, and five core attributes (**Strength**, **Intelligence**, **Vitality**, **Agility**, and **Spirit**).

### 📋 Habit & Quest Management
- **Dynamic Quests**: Create custom daily tasks or epic milestones with customizable difficulty tiers, stat scaling, and rewards.
- **Dual Mode Switcher**: Seamlessly toggle between your active **Quests** board and the **Monster Arena**.
- **Instant XP & Gold Calculation**: Automatic level calculation, streak multiplication, and gold accumulation.

### 🐾 Companion System & Codex
- **Mythical Companions**: Unlock, summon, and bond with companions such as *Aqualynx*, *Emberfox*, *Frosthowl*, *Gladehorn*, *Solaria*, *Zephyros*, and more.
- **Interactive Companion Cinema**: Inspect your companion's bio, element, trait affinities, and animations in full screen.

### ⚔️ Monster Arena
- **Beast Battles**: Discover, inspect, and combat monsters spawned by uncompleted tasks and life challenges.
- **Interactive Combat**: Engage in turn-based encounters with animated retro visuals and responsive feedback.

### 👥 Real-Time Social & Party System
- **Unique Player UIDs**: Every adventurer is assigned a public tag (e.g., `LIFE-7K9P-X2`).
- **Real Player Discovery**: Search for friends across the realm by UID or username with full public profile inspection.
- **Friend Requests & Parties**: Send, accept, or decline party requests with live status updates backed by Supabase RLS.
- **Hall of Legends Leaderboard**: Compete with real adventurers on the global realm rankings.

### 📊 XP Analytics Dashboard
- **Visual Analytics**: Interactive daily, weekly, and monthly XP tracking on the Character screen powered by genuine quest completion history.
- **Trait Specialization**: View distribution breakdowns across Physical, Mental, and Spiritual growth vectors.

### 💎 Liquid Glassmorphism Design
- **Ultra-Modern Visuals**: Curated dark-glass HUD with multi-layer frosted blurs (`backdrop-blur-xl`), soft specular borders, and chromatic accents.
- **Touch & Motion Feedback**: Tactile button presses, smooth sheet transitions, and floating interactive controls.

### 🎵 8-Bit Retro Sound Engine
- **Web Audio API Synthesis**: Zero external audio dependencies — procedurally synthesized 8-bit sound effects for button clicks, quest completions, purchases, and level-ups.
- **Master Audio Toggle**: One-click mute/unmute control directly accessible from the navigation bar.

### 🛡️ Zero Fake Data Architecture
- **Production Integrity**: No hardcoded mock quests, placeholder leaderboards, or synthetic stats. Clean, authentic empty states guide players when starting fresh.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Frontend Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) + Custom Glassmorphism System
- **Icons**: [Lucide React](https://lucide.dev/)
- **Backend & Database**: [Supabase](https://supabase.com/) (PostgreSQL, Realtime, Row Level Security)
- **Authentication**: Supabase Auth (SSR Cookie-based sessions)
- **Audio**: Custom Web Audio API Synthesizer
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict Mode)

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js** v18.18.0 or higher
- **npm**, **pnpm**, or **yarn**
- A **Supabase** project (free tier at [supabase.com](https://supabase.com))

### 2. Clone the Repository
```bash
git clone https://github.com/ambhinsahana/solid-goggles.git
cd solid-goggles
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Configure Environment Variables
Copy the `.env.example` template into a new `.env.local` file:

```bash
cp .env.example .env.local
```

Open `.env.local` and add your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 5. Setup Database Schemas
Execute the provided SQL schema scripts in your Supabase SQL Editor:
1. Run [`schema.sql`](./schema.sql) — Sets up tables (`profiles`, `quests`, `quest_completions`, `user_inventory`, `companions`, `monsters`).
2. Run [`schema_update_social.sql`](./schema_update_social.sql) — Configures `public_uid`, `friendships`, and public read RLS policies.

### 6. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to start your adventure.

---

## 📂 Project Structure

```
nexus/
├── docs/                     # Architecture, specifications, and design decisions
├── public/                   # Static 8-bit sprites, icons, and arena art
├── src/
│   ├── app/                  # Next.js App Router pages & server actions
│   │   ├── character/        # Character sheet, inventory & XP analytics
│   │   ├── dashboard/        # Main game world, quest manager & social actions
│   │   ├── leaderboard/      # Hall of Legends realm rankings
│   │   ├── login/            # Authentication (Sign in / Sign up)
│   │   ├── monsters/         # Monster arena & combat encounters
│   │   ├── onboarding/       # Starter character archetype selection
│   │   ├── shop/             # Weapons, gear, and potions market
│   │   └── globals.css       # Liquid glassmorphism & sprite keyframes
│   ├── components/           # Reusable UI & Game components
│   │   ├── character/        # XP charts, companion roster, inventory
│   │   ├── characters/       # Pixel & SVG sprite renderers
│   │   ├── game/             # Character HUD, World Scene, Trait Panel
│   │   ├── monsters/         # Arena and battle simulator components
│   │   ├── social/           # UID Friend search, Party list, Profile modals
│   │   └── ui/               # Core accessible primitives
│   ├── lib/                  # Business logic & game engine
│   │   ├── audio/            # Web Audio API 8-bit sound synthesizer
│   │   ├── characters/       # Archetypes, sprites, and progression math
│   │   ├── progression/      # XP curves, levels, achievements, and shop
│   │   ├── social/           # Friendship queries and party logic
│   │   └── uid/              # Collision-free Player UID generator
│   └── utils/supabase/       # SSR, browser, and middleware Supabase clients
├── .env.example              # Environment variables template
├── LICENSE                   # MIT License
├── schema.sql                # Core database schema & RLS rules
└── schema_update_social.sql  # Social & friendship schema migrations
```

---

## 📜 License

This project is licensed under the [MIT License](LICENSE) — see the LICENSE file for details.
