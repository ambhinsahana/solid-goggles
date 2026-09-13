-- Migration: Add character progression fields to profiles table
-- Preserves all existing data, auth, companions, and stats

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS active_character_index integer DEFAULT 0,
  ADD COLUMN IF NOT EXISTS character_evolution_stage integer DEFAULT 1;

-- Add comments for documentation
COMMENT ON COLUMN public.profiles.active_character_index IS 'Index of the current character in the 15-character roster (0-14)';
COMMENT ON COLUMN public.profiles.character_evolution_stage IS 'Current evolution stage of the character (1-5: Sprout, Adept, Evolved, Elite, Legendary)';
