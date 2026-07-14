import "server-only";
import { randomUUID } from "crypto";
import { getServiceRoleClient } from "@/lib/supabase/server-client";
import type { TeamName } from "@/types/db";

const BUCKET = process.env.SUPABASE_STORAGE_BUCKET || "activity-images";
const SIGNED_URL_TTL_SECONDS = 60 * 60; // 1 hour

export function buildActivityImagePath(
  weekId: string,
  team: TeamName,
  postId: string,
  originalFileName: string
): string {
  return `${weekId}/${team}/${postId}/${randomUUID()}-${originalFileName}`;
}

export async function uploadActivityImage(
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

export async function getSignedImageUrl(path: string): Promise<string | null> {
  const supabase = getServiceRoleClient();
  const { data, error } = await supabase.storage
    .from(BUCKET)
    .createSignedUrl(path, SIGNED_URL_TTL_SECONDS);

  if (error) return null;
  return data?.signedUrl ?? null;
}
