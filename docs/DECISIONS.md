# LIFEQUEST (NEXUS) — ARCHITECTURAL DECISIONS & CHANGELOG

**Document Purpose:** Records all design, engineering, and product decisions made during the construction of LifeQuest to maintain full traceability and architectural integrity.

---

## 1. Decision Log

### ADR 001: Next.js 16 (Turbopack) & React 19 Server Actions
- **Context:** The application requires fast client rendering, SEO optimization, and secure server-side transaction processing for RPG rewards.
- **Decision:** Use Next.js 16 with Turbopack and React 19 Server Actions (`'use server'`).
- **Rationale:** Eliminates boilerplate REST API route handlers while enforcing complete isolation of database operations and progression math away from the browser.

### ADR 002: Zero-Trust Server-Side Progression Math
- **Context:** In gamified applications, client-side manipulation of XP, Gold, or stats destroys competitive integrity and user motivation.
- **Decision:** All reward allocations (XP, Gold, Path attribute increments, Level calculations, and Streak evaluations) are computed exclusively on the server in `nexus/src/lib/progression/`.
- **Rationale:** The client submits only the quest ID or strike intent; the server determines the difficulty, calculates rewards, and updates the database atomically.

### ADR 003: Non-Linear Level Progression Curve
- **Context:** Linear leveling curves cause rapid level inflation or early stagnation.
- **Decision:** Implement the exponential curve $\text{XP Required for Level } N = 100 \times (N-1)^{1.5}$.
  - Level 1: 0 XP
  - Level 2: 100 XP
  - Level 3: 283 XP
  - Level 5: 800 XP
  - Level 10: 2,700 XP
  - Level 20: 8,282 XP
- **Rationale:** Provides rapid early satisfaction for new adventurers while requiring compounding consistency for master levels.

### ADR 004: Dual-Mode Resilient Fallback Architecture
- **Context:** During development, demonstration, or if remote Supabase DDL migrations are pending, the application must not crash with unhandled database errors.
- **Decision:** Build graceful fallbacks across all views (`/dashboard`, `/character`, `/shop`, `/monsters`, `/leaderboard`). If Supabase credentials are not yet populated or tables are unseeded, the system falls back to active in-memory demo state without blocking the user.
- **Rationale:** Guarantees zero downtime, seamless hackathon judge evaluation, and uninterrupted UI testing.

### ADR 005: Auto-Provisioning Auth Trigger & Starter Seed Data
- **Context:** When users register via Supabase Auth, relational tables (`profiles`, `paths`, `streaks`, `user_creatures`) must be initialized immediately. If the `creatures` table is empty, a foreign key error crashes signup.
- **Decision:** Included starter seed data for `creatures` (Spriggo, Ignis, Aqualis) directly inside `nexus/schema.sql` and wrote the `handle_new_user()` trigger to automatically create default rows across all 4 tables with 50 bonus starter Gold.
- **Rationale:** Guarantees brand-new accounts are fully battle-ready immediately upon registration.

### ADR 006: Privacy-Preserving Leaderboard Architecture
- **Context:** Section 19 of the execution plan mandates that leaderboards use real database data without exposing private personal information.
- **Decision:** Queries only select `id`, `display_name`, `nexus_level`, `lifetime_xp`, `consistency_tier`, and companion name. Quests, habit notes, email addresses, and passwords are never queried or sent to the client on `/leaderboard`.
- **Rationale:** Strict adherence to data privacy and security best practices.

### ADR 007: Non-Punitive Habit Slaying Mechanics
- **Context:** Negative habits often trigger guilt or shame loops when gamified with punitive damage (e.g. losing levels or losing health when a habit is slipped).
- **Decision:** Habits are modeled as external monsters with HP pools. Users deal damage by *resisting* the impulse and taking positive action. Slaying the monster awards celebratory Mystery Boxes.
- **Rationale:** Fosters positive reinforcement, self-efficacy, and empowering personal development.
