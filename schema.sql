-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- PROFILES
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  display_name text not null,
  timezone text default 'UTC',
  nexus_level integer default 1,
  lifetime_xp integer default 0,
  nexus_coins integer default 0,
  consistency_tier text default 'Casual',
  active_creature_id integer default 1,
  active_character_index integer default 0,
  character_evolution_stage integer default 1,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- PATHS (Attributes)
create table public.paths (
  user_id uuid references public.profiles(id) on delete cascade primary key,
  learning integer default 0,
  fitness integer default 0,
  creativity integer default 0,
  discipline integer default 0,
  social integer default 0
);

-- STREAKS
create table public.streaks (
  user_id uuid references public.profiles(id) on delete cascade primary key,
  current_streak integer default 0,
  longest_streak integer default 0,
  last_qualifying_date date,
  monthly_freezes_used integer default 0,
  last_freeze_date date
);

-- CREATURES REFERENCE
create table public.creatures (
  id integer primary key,
  name text not null,
  theme text not null,
  passive_name text not null,
  passive_description text not null
);

-- Seed Starter Creature (Spriggo)
insert into public.creatures (id, name, theme, passive_name, passive_description)
values 
  (1, 'Spriggo', 'Plant/Nature', 'Photosynthesis', '+5% bonus XP on morning quest completions'),
  (2, 'Ignis', 'Fire/Combat', 'Inner Fire', '+10% Gold on physical workouts'),
  (3, 'Aqualis', 'Water/Focus', 'Flow State', '+10% XP on deep work sessions')
on conflict (id) do nothing;

-- USER CREATURES (Progression)
create table public.user_creatures (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  creature_id integer references public.creatures(id),
  current_level integer default 1,
  is_mastered boolean default false,
  unlocked_at timestamp with time zone default timezone('utc'::text, now()),
  unique(user_id, creature_id)
);

-- QUESTS
create table public.quests (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  title text not null,
  description text,
  path text not null, -- 'Learning', 'Fitness', 'Creativity', 'Discipline', 'Social'
  difficulty text not null, -- 'Easy', 'Medium', 'Hard', 'Epic'
  deadline timestamp with time zone,
  planned_time integer, -- in minutes
  recurrence text,
  notes text,
  status text default 'active', -- 'active', 'completed', 'expired', 'failed'
  reschedule_count integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  completed_at timestamp with time zone
);

-- QUEST COMPLETIONS (History)
create table public.quest_completions (
  id uuid default uuid_generate_v4() primary key,
  quest_id uuid references public.quests(id) on delete set null,
  user_id uuid references public.profiles(id) on delete cascade,
  xp_earned integer not null,
  coins_earned integer not null,
  path_progressed text,
  completed_at timestamp with time zone default timezone('utc'::text, now())
);

-- MONSTERS (Bad Habits)
create table public.bad_habit_monsters (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  name text not null,
  bad_habit text not null,
  description text,
  max_hp integer not null,
  current_hp integer not null,
  threat_level integer default 1,
  status text default 'active', -- 'active', 'defeated'
  created_at timestamp with time zone default timezone('utc'::text, now()),
  defeated_at timestamp with time zone
);

-- MYSTERY BOXES
create table public.mystery_boxes (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  source_monster_id uuid references public.bad_habit_monsters(id) on delete set null,
  is_opened boolean default false,
  reward_type text,
  reward_amount integer,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  opened_at timestamp with time zone
);

-- ROW LEVEL SECURITY (RLS)
alter table public.profiles enable row level security;
create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

alter table public.paths enable row level security;
create policy "Users can view own paths" on public.paths for select using (auth.uid() = user_id);
create policy "Users can update own paths" on public.paths for update using (auth.uid() = user_id);

alter table public.streaks enable row level security;
create policy "Users can view own streaks" on public.streaks for select using (auth.uid() = user_id);

alter table public.user_creatures enable row level security;
create policy "Users can view own creatures" on public.user_creatures for select using (auth.uid() = user_id);

alter table public.quests enable row level security;
create policy "Users can CRUD own quests" on public.quests for all using (auth.uid() = user_id);

alter table public.quest_completions enable row level security;
create policy "Users can view own completions" on public.quest_completions for select using (auth.uid() = user_id);

alter table public.bad_habit_monsters enable row level security;
create policy "Users can CRUD own monsters" on public.bad_habit_monsters for all using (auth.uid() = user_id);

-- ACHIEVEMENTS
create table public.achievements (
  id text primary key,
  title text not null,
  description text not null,
  category text not null, -- 'Quests', 'Streaks', 'Level', 'Attributes', 'Monsters'
  icon text not null,
  condition_type text not null, -- 'quests_completed', 'streak_days', 'level_reached', 'monsters_slain'
  condition_value integer not null,
  xp_reward integer not null default 50,
  gold_reward integer not null default 25
);

-- USER ACHIEVEMENTS
create table public.user_achievements (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  achievement_id text references public.achievements(id) on delete cascade,
  unlocked_at timestamp with time zone default timezone('utc'::text, now()),
  unique(user_id, achievement_id)
);

-- SHOP ITEMS (Armory)
create table public.shop_items (
  id text primary key,
  name text not null,
  description text not null,
  type text not null, -- 'title', 'theme', 'badge', 'companion_skin'
  price integer not null,
  rarity text not null default 'Common', -- 'Common', 'Rare', 'Epic', 'Legendary'
  asset_icon text not null,
  is_active boolean default true
);

-- INVENTORY
create table public.inventory (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  item_id text references public.shop_items(id) on delete cascade,
  is_equipped boolean default false,
  acquired_at timestamp with time zone default timezone('utc'::text, now()),
  unique(user_id, item_id)
);

-- Seed Achievements
insert into public.achievements (id, title, description, category, icon, condition_type, condition_value, xp_reward, gold_reward)
values
  ('first_quest', 'First Step', 'Complete your very first quest.', 'Quests', 'Sparkles', 'quests_completed', 1, 50, 25),
  ('quest_novice', 'Pathfinder', 'Complete 5 quests.', 'Quests', 'Compass', 'quests_completed', 5, 100, 50),
  ('quest_adept', 'Quest Master', 'Complete 25 quests.', 'Quests', 'Sword', 'quests_completed', 25, 250, 150),
  ('quest_centurion', 'Centurion', 'Complete 100 quests.', 'Quests', 'Crown', 'quests_completed', 100, 1000, 500),
  ('streak_3', 'Spark of Will', 'Achieve a 3-day quest streak.', 'Streaks', 'Flame', 'streak_days', 3, 100, 50),
  ('streak_7', 'Iron Discipline', 'Achieve a 7-day quest streak.', 'Streaks', 'Shield', 'streak_days', 7, 250, 100),
  ('streak_30', 'Unstoppable', 'Achieve a 30-day quest streak.', 'Streaks', 'Trophy', 'streak_days', 30, 1000, 500),
  ('level_5', 'Rising Hero', 'Reach Character Level 5.', 'Level', 'Zap', 'level_reached', 5, 200, 100),
  ('level_10', 'Nexus Champion', 'Reach Character Level 10.', 'Level', 'Crown', 'level_reached', 10, 500, 250),
  ('first_monster', 'Bane of Habits', 'Defeat your first Habit Monster.', 'Monsters', 'Skull', 'monsters_slain', 1, 200, 100)
on conflict (id) do nothing;

-- Seed Shop Items
insert into public.shop_items (id, name, description, type, price, rarity, asset_icon)
values
  ('title_shadowblade', 'Shadowblade', 'A title for focused, stealthy achievers.', 'title', 150, 'Common', 'Tag'),
  ('title_archmage', 'Grand Archmage', 'A title for intellect and deep thinkers.', 'title', 300, 'Rare', 'Tag'),
  ('title_unstoppable', 'The Unstoppable', 'A legendary title reserved for streak masters.', 'title', 600, 'Legendary', 'Crown'),
  ('badge_gold_phoenix', 'Phoenix Sigil', 'A flaming badge of self-reinvention.', 'badge', 200, 'Rare', 'Flame'),
  ('badge_cyber_shield', 'Aegis of Will', 'A cyber shield badge for supreme discipline.', 'badge', 350, 'Epic', 'Shield'),
  ('skin_spriggo_autumn', 'Autumn Spriggo', 'Golden amber leaf skin for your companion.', 'companion_skin', 400, 'Rare', 'Sparkles'),
  ('skin_spriggo_cyber', 'Neon Cyber Spriggo', 'Cybernetic luminescence for Spriggo.', 'companion_skin', 750, 'Legendary', 'Zap'),
  ('theme_crimson_void', 'Crimson Void Theme', 'A deep crimson theme for your command center.', 'theme', 500, 'Epic', 'Palette')
on conflict (id) do nothing;

-- RLS for new tables
alter table public.achievements enable row level security;
create policy "Anyone can view achievements" on public.achievements for select using (true);

alter table public.user_achievements enable row level security;
create policy "Users can view own achievements" on public.user_achievements for select using (auth.uid() = user_id);

alter table public.shop_items enable row level security;
create policy "Anyone can view shop items" on public.shop_items for select using (true);

alter table public.inventory enable row level security;
create policy "Users can view own inventory" on public.inventory for select using (auth.uid() = user_id);
create policy "Users can update own inventory" on public.inventory for update using (auth.uid() = user_id);

-- TRIGGERS (Auto create profile on user signup)
create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'display_name', 'Adventurer'));
  
  insert into public.paths (user_id) values (new.id);
  insert into public.streaks (user_id) values (new.id);
  
  -- Assign Spriggo (Creature 1)
  insert into public.user_creatures (user_id, creature_id, current_level)
  values (new.id, 1, 1)
  on conflict do nothing;
  
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
