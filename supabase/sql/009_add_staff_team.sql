-- Adds a 5th team value for 운영진 (staff/organizers). Run this file alone
-- (a fresh "Run") before 010_seed_staff_team.sql — Postgres does not allow a
-- new enum value to be used in the same transaction that adds it.

alter type team_name add value if not exists 'team_staff';
