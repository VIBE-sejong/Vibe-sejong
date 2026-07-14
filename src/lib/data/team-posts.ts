import "server-only";
import { getServiceRoleClient } from "@/lib/supabase/server-client";
import { canViewTeamPrivate } from "@/lib/auth/team-access";
import type { SessionClaims } from "@/lib/auth/session";
import type { TeamName, TeamPost } from "@/types/db";

export async function listTeamPostsForViewer(
  session: SessionClaims,
  teamId: TeamName
): Promise<TeamPost[]> {
  if (!canViewTeamPrivate(session, teamId)) {
    throw new Error("Forbidden: cannot view this team's board");
  }

  const supabase = getServiceRoleClient();
  const { data, error } = await supabase
    .from("team_posts")
    .select("*, author:members(id,name)")
    .eq("team", teamId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []) as unknown as TeamPost[];
}

export interface CreateTeamPostInput {
  teamId: TeamName;
  authorId: string;
  title: string;
  content: string;
}

export async function createTeamPost(
  input: CreateTeamPostInput
): Promise<TeamPost> {
  const supabase = getServiceRoleClient();
  const { data, error } = await supabase
    .from("team_posts")
    .insert({
      team: input.teamId,
      author_id: input.authorId,
      title: input.title,
      content: input.content,
    })
    .select("*, author:members(id,name)")
    .single();

  if (error) throw error;
  return data as unknown as TeamPost;
}
