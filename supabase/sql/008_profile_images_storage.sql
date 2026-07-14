-- Private bucket for team photos and member avatars. No new storage
-- policies needed: the deny-all policies created in 003_storage.sql already
-- block anon/authenticated access to storage.objects for every bucket (each
-- policy's condition is "... and false", which is always false regardless of
-- bucket_id) — service-role bypasses RLS and is the only writer/reader.
-- Path prefixes ('teams/…', 'members/…') are for organization only.

insert into storage.buckets (id, name, public)
values ('profile-images', 'profile-images', false)
on conflict (id) do nothing;
