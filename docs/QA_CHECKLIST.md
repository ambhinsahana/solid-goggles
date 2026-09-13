# LIFEQUEST (NEXUS) — QA & END-TO-END VERIFICATION CHECKLIST

---

## 1. Authentication & Onboarding
- [x] **New User Sign Up:** Email/password creation executes without crashing.
- [x] **Rate Limit Surfacing:** If Supabase free tier email rate limit is hit, exact user-friendly prompt is displayed.
- [x] **Database Trigger Auto-Provisioning:** Creates default row in `profiles`, `paths`, `streaks`, and `user_creatures` with starter companion (Spriggo).
- [x] **Sign In & Session Persistence:** Logged-in session stores auth cookies and redirects to `/dashboard`.
- [x] **Sign Out:** Clears session and redirects cleanly to `/`.
- [x] **4-Step Onboarding Flow:** `/onboarding` permits selecting archetype, companion, and starter quest with seamless transition to `/dashboard`.

---

## 2. Quest Engine & Progression
- [x] **Create Quest:** Modal submits title, path, difficulty, estimated time, and deadline. Renders immediately on dashboard.
- [x] **Edit Quest:** Clicking edit opens pre-populated modal. Modifying title, path, or difficulty updates card state.
- [x] **Delete Quest:** Clicking delete immediately purges the quest from state and database.
- [x] **Complete Quest:**
  - Awards correct XP and Gold based on difficulty matrix (Easy: 25 XP/10 G, Medium: 50 XP/25 G, Hard: 100 XP/60 G, Epic: 200 XP/150 G).
  - Increments matching Path attribute in `paths` table.
  - Computes level using $100 \times (N-1)^{1.5}$.
  - Triggers level-up notification when crossing XP threshold.
- [x] **Filter & Sort:** Quests filter properly by status (All, Active, Completed) and sort by difficulty.

---

## 3. Character & Attribute Systems
- [x] **Path Gauges:** 5 Path attribute gauges render with proper percentages and level tier titles.
- [x] **Companion Evolution:**
  - Displays selected creature (Spriggo, Ignis, Aqualis).
  - Evolution stages (Stage 1 @ Lvl 1, Stage 2 @ Lvl 5, Stage 3 @ Lvl 10) indicate current and next form.
- [x] **Wardrobe & Equipment:**
  - Acquired titles, badges, and companion skins can be equipped or unequipped.
  - Equipping a title automatically updates active player title.
- [x] **Trophy Hall:** Condition-based achievements correctly render locked/unlocked badges.

---

## 4. Armory & Economy
- [x] **Gold Display:** Available Gold balance renders accurately in the top vault card.
- [x] **Sufficient Balance Check:** If user has insufficient Gold, "Need Gold" button is disabled and helpful message is shown.
- [x] **Purchase Flow:**
  - Clicking "Acquire" immediately deducts Gold and marks item as "Owned".
  - Prevents purchasing unique items more than once.
- [x] **Category Filtering:** Tabs filter by Titles, Badges, Companion Skins, and UI Themes.

---

## 5. Habit Monsters Arena
- [x] **Boss HP Gauges:** Active monsters display current HP / max HP with color-shifting vitality bar.
- [x] **Habit Resistance Strike:** Clicking "Resist Habit (-30 HP)" deals 30 damage, updating HP bar.
- [x] **Defeat & Mystery Box Bounty:**
  - Reducing monster HP to 0 marks it as defeated and moves it to the Trophy Room.
  - Automatically awards an unopened Mystery Box.
- [x] **Unboxing Mystery Chest:** Clicking "Unlock" opens the mystery box and awards 100–250 bonus Gold to user's balance.
- [x] **Custom Monster Summoning:** Modal allows defining custom bad habits, strategies, and threat levels (60, 90, 120 HP).

---

## 6. Global Leaderboard
- [x] **Ranking Metric Switching:** Tabs sort seamlessly by Lifetime XP, Iron Streaks, and Highest Level.
- [x] **Top 3 Podium:** Renders gold, silver, and bronze pedestals with distinct crowning styling.
- [x] **Search Filtering:** Live search input filters adventurers by name in real-time.
- [x] **Privacy Preservation:** Strictly avoids exposing email, passwords, or personal quest notes.

---

## 7. Cross-Platform & Build Verification
- [x] **TypeScript Compilation:** Zero errors (`npx tsc --noEmit` and `npm run build`).
- [x] **Responsive Layout:** Tested on Mobile (375px), Tablet (768px), and Desktop (1440px).
- [x] **Console Cleanliness:** No uncaught exceptions or React hydration mismatches.
