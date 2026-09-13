-- ============================================================
-- LIFE RPG: COMPLETE DATABASE REPAIR & MIGRATION SCRIPT
-- Run this script in the Supabase SQL Editor (Dashboard -> SQL Editor)
-- Safely applies all missing columns, missing tables, and RLS policies.
-- Safe to re-run multiple times (idempotent).
-- ============================================================

-- 1. QUESTS: Add mode column if not present
ALTER TABLE public.quests 
  ADD COLUMN IF NOT EXISTS mode text DEFAULT 'one_time';

-- 2. PROFILES: Add public_uid and character progression columns
ALTER TABLE public.profiles 
  ADD COLUMN IF NOT EXISTS public_uid text UNIQUE,
  ADD COLUMN IF NOT EXISTS active_character_index integer DEFAULT 0,
  ADD COLUMN IF NOT EXISTS character_evolution_stage integer DEFAULT 1;

CREATE INDEX IF NOT EXISTS idx_profiles_public_uid ON public.profiles(public_uid);

-- Ensure public profiles are viewable by authenticated users for social search & leaderboards
DROP POLICY IF EXISTS "Public profiles are viewable by authenticated users" ON public.profiles;
CREATE POLICY "Public profiles are viewable by authenticated users" 
  ON public.profiles FOR SELECT 
  TO authenticated 
  USING (true);

-- 3. STREAKS: Add UPDATE and INSERT policies for users
ALTER TABLE public.streaks ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own streaks" ON public.streaks;
CREATE POLICY "Users can view own streaks" 
  ON public.streaks FOR SELECT 
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own streaks" ON public.streaks;
CREATE POLICY "Users can update own streaks" 
  ON public.streaks FOR UPDATE 
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own streaks" ON public.streaks;
CREATE POLICY "Users can insert own streaks" 
  ON public.streaks FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- 4. QUEST COMPLETIONS: Add INSERT policy for users
ALTER TABLE public.quest_completions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own completions" ON public.quest_completions;
CREATE POLICY "Users can view own completions" 
  ON public.quest_completions FOR SELECT 
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own completions" ON public.quest_completions;
CREATE POLICY "Users can insert own completions" 
  ON public.quest_completions FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- 5. USER ACHIEVEMENTS TABLE & POLICIES
CREATE TABLE IF NOT EXISTS public.user_achievements (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  achievement_id text REFERENCES public.achievements(id) ON DELETE CASCADE NOT NULL,
  unlocked_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id, achievement_id)
);

ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own achievements" ON public.user_achievements;
CREATE POLICY "Users can view own achievements" 
  ON public.user_achievements FOR SELECT 
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own achievements" ON public.user_achievements;
CREATE POLICY "Users can insert own achievements" 
  ON public.user_achievements FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- 6. INVENTORY TABLE & POLICIES
CREATE TABLE IF NOT EXISTS public.inventory (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  item_id text NOT NULL,
  is_equipped boolean DEFAULT false,
  acquired_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id, item_id)
);

ALTER TABLE public.inventory ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own inventory" ON public.inventory;
CREATE POLICY "Users can view own inventory" 
  ON public.inventory FOR SELECT 
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own inventory" ON public.inventory;
CREATE POLICY "Users can update own inventory" 
  ON public.inventory FOR UPDATE 
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own inventory" ON public.inventory;
CREATE POLICY "Users can insert own inventory" 
  ON public.inventory FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- 7. FRIENDSHIPS TABLE & POLICIES
CREATE TABLE IF NOT EXISTS public.friendships (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  sender_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  receiver_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'declined', 'blocked')),
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(sender_id, receiver_id)
);

ALTER TABLE public.friendships ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own friendships" ON public.friendships;
CREATE POLICY "Users can view own friendships" 
  ON public.friendships FOR SELECT 
  TO authenticated 
  USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

DROP POLICY IF EXISTS "Users can create friendships as sender" ON public.friendships;
CREATE POLICY "Users can create friendships as sender" 
  ON public.friendships FOR INSERT 
  TO authenticated 
  WITH CHECK (auth.uid() = sender_id);

DROP POLICY IF EXISTS "Users can update own friendships" ON public.friendships;
CREATE POLICY "Users can update own friendships" 
  ON public.friendships FOR UPDATE 
  TO authenticated 
  USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

DROP POLICY IF EXISTS "Users can delete own friendships" ON public.friendships;
CREATE POLICY "Users can delete own friendships" 
  ON public.friendships FOR DELETE 
  TO authenticated 
  USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

CREATE INDEX IF NOT EXISTS idx_friendships_sender ON public.friendships(sender_id);
CREATE INDEX IF NOT EXISTS idx_friendships_receiver ON public.friendships(receiver_id);
