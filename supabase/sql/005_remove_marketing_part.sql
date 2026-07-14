-- Removes 'marketing' from the member_part enum (the club dropped that role).
-- Run this only if you already ran 001_schema.sql with the old 4-value enum.
-- Precondition: no member currently has part = 'marketing' — reassign them
-- first (e.g. `update members set part = 'design' where part = 'marketing';`)
-- or this migration will fail on the USING cast below.

alter type member_part rename to member_part_old;
create type member_part as enum ('design', 'planning', 'dev');
alter table members alter column part type member_part using part::text::member_part;
drop type member_part_old;
