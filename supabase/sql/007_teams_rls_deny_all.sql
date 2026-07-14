-- Same defense-in-depth deny-all pattern as 002_rls_deny_all.sql.

alter table teams enable row level security;
alter table team_posts enable row level security;

create policy "deny all anon" on teams for all to anon using (false) with check (false);
create policy "deny all authenticated" on teams for all to authenticated using (false) with check (false);

create policy "deny all anon" on team_posts for all to anon using (false) with check (false);
create policy "deny all authenticated" on team_posts for all to authenticated using (false) with check (false);
