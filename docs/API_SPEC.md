# LIFEQUEST (NEXUS) — SERVER ACTIONS & API SPECIFICATION

**Architecture:** Next.js 16+ React Server Actions (`'use server'`) with Supabase Auth & PostgreSQL Session Verification.

---

## 1. Authentication Endpoints (`/app/login/actions.ts`)

### 1.1 `login(formData: FormData)`
- **Input:**
  - `email`: string (valid email format)
  - `password`: string (minimum 6 characters)
- **Response:**
  - Success: Redirects to `/dashboard` with auth cookies set.
  - Failure: `{ error: string }`
- **Error Codes:**
  - `Invalid login credentials`: Password or email does not match.
  - `Email not confirmed`: Awaiting verification email confirmation.

### 1.2 `signup(formData: FormData)`
- **Input:**
  - `email`: string
  - `password`: string
  - `display_name`: string (optional, defaults to username portion of email)
- **Response:**
  - Success (Auto-confirmed or email sent): `{ success: true, message?: string }` or redirects to `/dashboard`.
  - Rate limited (HTTP 429): Surfaces clear prompt informing user of email rate limit.
  - Failure: `{ error: string }`

### 1.3 `logout()`
- **Action:** Clears Supabase auth session cookies and redirects to `/`.

---

## 2. Quest Engine Actions (`/app/dashboard/actions.ts`)

### 2.1 `createQuest(formData: FormData)`
- **Payload:**
  - `title`: string (required)
  - `description`: string | null
  - `path`: `'Learning' | 'Fitness' | 'Creativity' | 'Discipline' | 'Social'`
  - `difficulty`: `'Easy' | 'Medium' | 'Hard' | 'Epic'`
  - `planned_time`: number (minutes, optional)
  - `deadline`: ISO string | null
- **Security:** Verifies `auth.getUser()`. User ID is injected server-side.
- **Response:** `{ success: true, quest: Quest } | { error: string }`

### 2.2 `updateQuest(formData: FormData)`
- **Payload:**
  - `id`: string (UUID, required)
  - Updated fields: `title`, `description`, `path`, `difficulty`, `planned_time`, `deadline`
- **Security:** Requires `user_id = auth.uid()` via Supabase query match.
- **Response:** `{ success: true, quest: Quest } | { error: string }`

### 2.3 `completeQuest(questId: string)`
- **Atomic Progression Transaction:**
  1. Validates user owns the active quest.
  2. Calculates base XP, Gold, and Path attribute points based on difficulty:
     - Easy: 25 XP, 10 G, 1 Path pt
     - Medium: 50 XP, 25 G, 2 Path pts
     - Hard: 100 XP, 60 G, 4 Path pts
     - Epic: 200 XP, 150 G, 8 Path pts
  3. Updates quest status to `'completed'`.
  4. Records immutable entry in `quest_completions`.
  5. Computes updated lifetime XP and derives new level via $100 \times (N-1)^{1.5}$.
  6. Increments user's Gold balance in `profiles`.
  7. Increments attribute points in `paths`.
  8. Evaluates streak rules in `streaks`.
  9. Evaluates milestone achievement unlocks in `achievements`.
- **Response:**
  ```json
  {
    "success": true,
    "xpEarned": 50,
    "coinsEarned": 25,
    "newLevel": 2,
    "leveledUp": true
  }
  ```

### 2.4 `deleteQuest(questId: string)`
- **Payload:** `questId`: string (UUID)
- **Security:** Scoped to `eq('user_id', user.id)`
- **Response:** `{ success: true } | { error: string }`

---

## 3. Shop & Economy Actions

### 3.1 `buyShopItem(itemId: string, itemPrice: number)`
- **Payload:** `itemId`: string, `itemPrice`: number
- **Server Verification Rules:**
  - Verifies user authentication.
  - Verifies item exists in catalog and price matches server registry.
  - Queries `profiles.nexus_coins` to ensure balance $\ge$ price.
  - Checks `inventory` to guarantee unique items cannot be purchased twice.
  - Deducts price from `profiles.nexus_coins`.
  - Inserts new record into `inventory` with `is_equipped = false`.
- **Response:** `{ success: true, remainingCoins: number } | { error: string }`

### 3.2 `equipInventoryItem(itemId: string, equip: boolean)`
- **Payload:** `itemId`: string, `equip`: boolean
- **Action:** Updates `inventory.is_equipped`. For titles, automatically un-equips other active titles.
- **Response:** `{ success: true } | { error: string }`

---

## 4. Habit Monsters Arena Actions

### 4.1 `attackHabitMonster(monsterId: string, damage: number = 30)`
- **Payload:** `monsterId`: string, `damage`: number (default 30)
- **Execution:**
  - Decrements `current_hp` by damage (clamped at 0).
  - If HP reaches 0, sets status to `'defeated'` and records `defeated_at`.
  - Generates an unopened `mystery_boxes` record for the user.
- **Response:**
  ```json
  {
    "success": true,
    "newHp": 40,
    "isDefeated": false,
    "mysteryBoxAwarded": false
  }
  ```

### 4.2 `openMysteryBox(boxId: string)`
- **Payload:** `boxId`: string (UUID)
- **Execution:**
  - Verifies box is owned by user and `is_opened = false`.
  - Generates bonus Gold (100–250 G).
  - Updates `profiles.nexus_coins` and sets `is_opened = true`.
- **Response:** `{ success: true, coinsReward: number } | { error: string }`

### 4.3 `createHabitMonster(formData: FormData)`
- **Payload:** `name`, `bad_habit`, `description`, `threat_level`
- **Action:** Inserts a custom boss monster into `bad_habit_monsters` with max HP scaled to threat level (Threat 1: 60 HP, Threat 2: 90 HP, Threat 3: 120 HP).
- **Response:** `{ success: true, monster: HabitMonster } | { error: string }`
