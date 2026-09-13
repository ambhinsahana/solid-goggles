-- ============================================================
-- LIFE RPG: SOCIAL & REAL UID DATABASE MIGRATION
-- Adds public_uid, public gamer profile read policy, and friendships table
-- ============================================================

-- 1. Ensure public_uid exists on profiles
ALTER TABLE public.profiles 
  ADD COLUMN IF NOT EXISTS public_uid text UNIQUE;

-- 2. Ensure character progression columns exist on profiles
ALTER TABLE public.profiles 
  ADD COLUMN IF NOT EXISTS active_character_index integer DEFAULT 0;

ALTER TABLE public.profiles 
  ADD COLUMN IF NOT EXISTS character_evolution_stage integer DEFAULT 1;

-- 3. Update RLS on profiles to allow authenticated users to view gamer cards (display_name, public_uid, levels, etc.)
DROP POLICY IF EXISTS "Public profiles are viewable by authenticated users" ON public.profiles;
CREATE POLICY "Public profiles are viewable by authenticated users" 
  ON public.profiles FOR SELECT 
  TO authenticated 
  USING (true);

-- 4. Create friendships table
CREATE TABLE IF NOT EXISTS public.friendships (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  sender_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  receiver_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'declined', 'blocked')),
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(sender_id, receiver_id)
);

-- 5. Index for ultra-fast UID lookup & friendship checks
CREATE INDEX IF NOT EXISTS idx_profiles_public_uid ON public.profiles(public_uid);
CREATE INDEX IF NOT EXISTS idx_friendships_sender ON public.friendships(sender_id);
CREATE INDEX IF NOT EXISTS idx_friendships_receiver ON public.friendships(receiver_id);

-- 6. Friendships Row Level Security
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
