import "server-only";
import { getServiceRoleClient } from "@/lib/supabase/server-client";
import { getSignedProfileImageUrl } from "@/lib/storage/profile-images";
import { canViewTeamPrivate } from "@/lib/auth/team-access";
import type { SessionClaims } from "@/lib/auth/session";
import type { Team, TeamName } from "@/types/db";

export interface TeamPublic {
  team_name: TeamName;
  name: string;
  photo_path: string | null;
  photo_url: string | null;
}

export interface TeamFull extends TeamPublic {
  description: string;
  updated_at: string;
}

export async function listTeamsPublic(): Promise<TeamPublic[]> {
  const supabase = getServiceRoleClient();
  const { data, error } = await supabase
    .from("teams")
    .select("team_name, name, photo_path")
    .order("team_name", { ascending: true });

  if (error) throw error;

  return Promise.all(
    ((data ?? []) as Pick<Team, "team_name" | "name" | "photo_path">[]).map(
      async (row) => ({
        ...row,
        photo_url: await getSignedProfileImageUrl(row.photo_path),
      })
    )
  );
}

async function getTeamPublicRow(teamId: TeamName): Promise<TeamPublic | null> {
  const supabase = getServiceRoleClient();
  const { data, error } = await supabase
    .from("teams")
    .select("team_name, name, photo_path")
    .eq("team_name", teamId)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  return { ...data, photo_url: await getSignedProfileImageUrl(data.photo_path) };
}

async function getTeamFullRow(teamId: TeamName): Promise<TeamFull | null> {
  const supabase = getServiceRoleClient();
  const { data, error } = await supabase
    .from("teams")
    .select("team_name, name, photo_path, description, updated_at")
    .eq("team_name", teamId)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  return { ...data, photo_url: await getSignedProfileImageUrl(data.photo_path) };
}

export async function getTeamForViewer(
  session: SessionClaims,
  teamId: TeamName
): Promise<
  { team: TeamFull; isPrivate: true } | { team: TeamPublic; isPrivate: false } | null
> {
  if (canViewTeamPrivate(session, teamId)) {
    const team = await getTeamFullRow(teamId);
    return team ? { team, isPrivate: true } : null;
  }

  const team = await getTeamPublicRow(teamId);
  return team ? { team, isPrivate: false } : null;
}

export interface UpdateTeamInput {
  name: string;
  description: string;
  photoPath?: string;
  updatedBy: string;
}

export async function updateTeam(
  teamId: TeamName,
  input: UpdateTeamInput
): Promise<void> {
  const supabase = getServiceRoleClient();
  const patch: Record<string, unknown> = {
    name: input.name,
    description: input.description,
    updated_by: input.updatedBy,
  };
  if (input.photoPath) patch.photo_path = input.photoPath;

  const { error } = await supabase
    .from("teams")
    .update(patch)
    .eq("team_name", teamId);

  if (error) throw error;
}
