-- VISE club site schema
-- Run this first in the Supabase SQL Editor.

create extension if not exists "pgcrypto";

create type member_role as enum ('admin', 'member');
create type team_name as enum ('team_1', 'team_2', 'team_3', 'team_4');
create type member_part as enum ('design', 'planning', 'dev');

create table members (
  id uuid primary key default gen_random_uuid(),
  student_id text not null unique,
  name text not null,
  team team_name not null,
  part member_part not null,
  role member_role not null default 'member',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_members_team on members(team);

create table weeks (
  id uuid primary key default gen_random_uuid(),
  week_number int not null unique,
  title text not null,
  description text not null default '',
  created_by uuid references members(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_weeks_week_number on weeks(week_number);

create table activity_posts (
  id uuid primary key default gen_random_uuid(),
  week_id uuid not null references weeks(id) on delete cascade,
  team team_name not null,
  author_id uuid not null references members(id) on delete cascade,
  content text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (week_id, team)
);

create index idx_activity_posts_week on activity_posts(week_id);

create table activity_post_images (
  id uuid primary key default gen_random_uuid(),
  activity_post_id uuid not null references activity_posts(id) on delete cascade,
  storage_path text not null,
  file_name text not null,
  content_type text,
  size_bytes int,
  position smallint not null default 0,
  created_at timestamptz not null default now()
);

create index idx_activity_post_images_post on activity_post_images(activity_post_id);

create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger trg_members_updated_at before update on members
  for each row execute function set_updated_at();
create trigger trg_weeks_updated_at before update on weeks
  for each row execute function set_updated_at();
create trigger trg_activity_posts_updated_at before update on activity_posts
  for each row execute function set_updated_at();
