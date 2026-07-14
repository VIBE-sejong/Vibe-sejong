-- Defense-in-depth: the app only ever talks to Supabase via the service_role
-- key (which bypasses RLS), so these policies exist purely to make sure the
-- anon/publishable key can never read or write anything if it were ever
-- accidentally used or leaked.

alter table members enable row level security;
alter table weeks enable row level security;
alter table activity_posts enable row level security;
alter table activity_post_images enable row level security;

create policy "deny all anon" on members for all to anon using (false) with check (false);
create policy "deny all authenticated" on members for all to authenticated using (false) with check (false);

create policy "deny all anon" on weeks for all to anon using (false) with check (false);
create policy "deny all authenticated" on weeks for all to authenticated using (false) with check (false);

create policy "deny all anon" on activity_posts for all to anon using (false) with check (false);
create policy "deny all authenticated" on activity_posts for all to authenticated using (false) with check (false);

create policy "deny all anon" on activity_post_images for all to anon using (false) with check (false);
create policy "deny all authenticated" on activity_post_images for all to authenticated using (false) with check (false);
