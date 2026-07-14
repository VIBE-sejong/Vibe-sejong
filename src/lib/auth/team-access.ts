import "server-only";
import { getMemberById } from "@/lib/data/members";
import type { SessionClaims } from "./session";
import type { TeamName } from "@/types/db";

/** May this session see teamId's private description + internal board? */
export function canViewTeamPrivate(
  session: SessionClaims,
  teamId: TeamName
): boolean {
  return session.role === "admin" || session.team === teamId;
}

/**
 * May this session post to teamId's internal board?
 * Admin oversight is read-only: an admin who isn't personally a member of
 * teamId cannot author posts there.
 */
export function canPostToTeamBoard(
  session: SessionClaims,
  teamId: TeamName
): boolean {
  return session.team === teamId;
}

/**
 * May this session edit teamId's name/photo/description?
 * `part` isn't in the session JWT, so this requires a live DB read.
 */
export async function canEditTeam(
  session: SessionClaims,
  teamId: TeamName
): Promise<boolean> {
  if (session.role === "admin") return true;
  if (session.team !== teamId) return false;
  const member = await getMemberById(session.sub);
  return member?.part === "planning";
}
