-- One-time bootstrap: insert the first admin so someone can log in and use
-- the /admin/members UI to add everyone else. Edit the values below and run
-- once in the Supabase SQL Editor. Do not commit real student data here.

insert into members (student_id, name, team, part, role)
values ('22011909', '김성일', 'team_1', 'planning', 'admin');
