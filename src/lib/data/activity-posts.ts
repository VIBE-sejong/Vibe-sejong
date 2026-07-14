import "server-only";
import { getServiceRoleClient } from "@/lib/supabase/server-client";
import { getSignedImageUrl } from "@/lib/storage/activity-images";
import type {
  ActivityPost,
  ActivityPostImage,
  ActivityPostWithImages,
  TeamName,
} from "@/types/db";

interface RawPostRow extends ActivityPost {
  author: { id: string; name: string; team: TeamName } | null;
  images: ActivityPostImage[] | null;
}

export async function listPostsForWeek(
  weekId: string
): Promise<ActivityPostWithImages[]> {
  const supabase = getServiceRoleClient();
  const { data, error } = await supabase
    .from("activity_posts")
    .select(
      "*, author:members(id,name,team), images:activity_post_images(*)"
    )
    .eq("week_id", weekId)
    .order("team", { ascending: true });

  if (error) throw error;

  const rows = (data ?? []) as unknown as RawPostRow[];

  return Promise.all(
    rows.map(async (row) => {
      const images = (row.images ?? []).sort((a, b) => a.position - b.position);
      const imagesWithUrls = await Promise.all(
        images.map(async (img) => ({
          ...img,
          url: await getSignedImageUrl(img.storage_path),
        }))
      );

      return {
        id: row.id,
        week_id: row.week_id,
        team: row.team,
        author_id: row.author_id,
        content: row.content,
        created_at: row.created_at,
        updated_at: row.updated_at,
        author: row.author ?? { id: row.author_id, name: "알 수 없음", team: row.team },
        images: imagesWithUrls,
      };
    })
  );
}

export async function countSubmittedTeamsByWeek(): Promise<
  Record<string, number>
> {
  const supabase = getServiceRoleClient();
  const { data, error } = await supabase
    .from("activity_posts")
    .select("week_id");

  if (error) throw error;

  const counts: Record<string, number> = {};
  for (const row of data ?? []) {
    counts[row.week_id] = (counts[row.week_id] ?? 0) + 1;
  }
  return counts;
}

export interface UpsertActivityPostInput {
  weekId: string;
  team: TeamName;
  authorId: string;
  content: string;
}

export async function upsertActivityPost(
  input: UpsertActivityPostInput
): Promise<ActivityPost> {
  const supabase = getServiceRoleClient();
  const { data, error } = await supabase
    .from("activity_posts")
    .upsert(
      {
        week_id: input.weekId,
        team: input.team,
        author_id: input.authorId,
        content: input.content,
      },
      { onConflict: "week_id,team" }
    )
    .select("*")
    .single();

  if (error) throw error;
  return data as ActivityPost;
}

export async function addActivityPostImage(input: {
  activityPostId: string;
  storagePath: string;
  fileName: string;
  contentType: string;
  sizeBytes: number;
  position: number;
}): Promise<void> {
  const supabase = getServiceRoleClient();
  const { error } = await supabase.from("activity_post_images").insert({
    activity_post_id: input.activityPostId,
    storage_path: input.storagePath,
    file_name: input.fileName,
    content_type: input.contentType,
    size_bytes: input.sizeBytes,
    position: input.position,
  });

  if (error) throw error;
}

export async function countImagesForPost(activityPostId: string): Promise<number> {
  const supabase = getServiceRoleClient();
  const { count, error } = await supabase
    .from("activity_post_images")
    .select("*", { count: "exact", head: true })
    .eq("activity_post_id", activityPostId);

  if (error) throw error;
  return count ?? 0;
}
