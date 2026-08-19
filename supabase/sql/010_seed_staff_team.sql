-- Seeds the 운영진팀 row so it shows up on the /teams board like the other
-- 4 teams. Run after 009_add_staff_team.sql has committed.

insert into teams (team_name, name) values
  ('team_staff', '운영진팀')
on conflict (team_name) do nothing;
