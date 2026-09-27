-- MovieFlix database schema for Supabase
-- Run this once in Supabase -> SQL Editor.

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  name text not null default '',
  username text not null unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.site_sessions (
  session_id text primary key,
  user_id uuid references auth.users(id) on delete set null,
  email text,
  username text,
  name text,
  path text not null default '/',
  country text,
  city text,
  user_agent text,
  created_at timestamptz not null default now(),
  last_seen timestamptz not null default now()
);

create index if not exists site_sessions_last_seen_idx on public.site_sessions(last_seen desc);
create index if not exists site_sessions_user_id_idx on public.site_sessions(user_id);

alter table public.profiles enable row level security;
alter table public.site_sessions enable row level security;

-- Public clients never need direct access to these tables.
-- MovieFlix server routes use SUPABASE_SERVICE_ROLE_KEY.
-- Keep the service-role key server-only and never prefix it with NEXT_PUBLIC_.
