-- Adds self-service profile fields to members, and the new teams/team_posts
-- tables for the Team feature. Does not touch team_name, members.team, or
-- activity_posts.team.

alter table members add column avatar_path text;
alter table members add column bio text not null default '';

create table teams (
  team_name team_name primary key,
  name text not null,
  description text not null default '',
  photo_path text,
  updated_by uuid references members(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Seed the 4 fixed teams with default display names (editable later by the
-- team's 기획 member or an admin).
insert into teams (team_name, name) values
  ('team_1', '1팀'),
  ('team_2', '2팀'),
  ('team_3', '3팀'),
  ('team_4', '4팀');

create table team_posts (
  id uuid primary key default gen_random_uuid(),
  team team_name not null references teams(team_name) on delete cascade,
  author_id uuid not null references members(id) on delete cascade,
  title text not null,
  content text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_team_posts_team on team_posts(team, created_at desc);

create trigger trg_teams_updated_at before update on teams
  for each row execute function set_updated_at();
create trigger trg_team_posts_updated_at before update on team_posts
  for each row execute function set_updated_at();
