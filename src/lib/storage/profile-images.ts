import "server-only";
import { randomUUID } from "crypto";
import { getServiceRoleClient } from "@/lib/supabase/server-client";
import type { TeamName } from "@/types/db";

const BUCKET = process.env.SUPABASE_PROFILE_BUCKET || "profile-images";
const SIGNED_URL_TTL_SECONDS = 60 * 60; // 1 hour

export function buildTeamPhotoPath(
  teamId: TeamName,
  originalFileName: string
): string {
  return `teams/${teamId}/${randomUUID()}-${originalFileName}`;
}

export function buildMemberAvatarPath(
  memberId: string,
  originalFileName: string
): string {
  return `members/${memberId}/${randomUUID()}-${originalFileName}`;
}

export async function uploadProfileImage(
  path: string,
  file: File
): Promise<void> {
  const supabase = getServiceRoleClient();
  const buffer = Buffer.from(await file.arrayBuffer());
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, buffer, {
      contentType: file.type || "application/octet-stream",
      upsert: false,
    });

  if (error) throw error;
}

export async function getSignedProfileImageUrl(
  path: string | null
): Promise<string | null> {
  if (!path) return null;
  const supabase = getServiceRoleClient();
  const { data, error } = await supabase.storage
    .from(BUCKET)
    .createSignedUrl(path, SIGNED_URL_TTL_SECONDS);

  if (error) return null;
  return data?.signedUrl ?? null;
}

export async function deleteProfileImage(path: string): Promise<void> {
  const supabase = getServiceRoleClient();
  await supabase.storage.from(BUCKET).remove([path]);
}
