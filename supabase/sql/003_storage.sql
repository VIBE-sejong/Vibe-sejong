-- Private bucket for activity images. Uploads/reads are only ever done by the
-- server using the service_role key (which bypasses storage RLS), so these
-- policies just make sure the anon/publishable key can't touch it directly.

insert into storage.buckets (id, name, public)
values ('activity-images', 'activity-images', false)
on conflict (id) do nothing;

create policy "deny all anon read" on storage.objects
  for select to anon using (bucket_id = 'activity-images' and false);
create policy "deny all authenticated read" on storage.objects
  for select to authenticated using (bucket_id = 'activity-images' and false);
create policy "deny all anon write" on storage.objects
  for insert to anon with check (bucket_id = 'activity-images' and false);
create policy "deny all authenticated write" on storage.objects
  for insert to authenticated with check (bucket_id = 'activity-images' and false);
