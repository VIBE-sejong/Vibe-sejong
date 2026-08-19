"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth/session.server";
import { WEEKLY_TEAM_NAMES } from "@/types/db";
import {
  activityPostSchema,
  ALLOWED_IMAGE_TYPES,
  MAX_IMAGE_SIZE_BYTES,
  MAX_IMAGES_PER_SUBMISSION,
} from "@/lib/validation/activity";
import {
  addActivityPostImage,
  countImagesForPost,
  upsertActivityPost,
} from "@/lib/data/activity-posts";
import {
  buildActivityImagePath,
  uploadActivityImage,
} from "@/lib/storage/activity-images";

export interface ActivityFormState {
  error?: string;
  success?: boolean;
}

export async function createActivityPostAction(
  _prevState: ActivityFormState,
  formData: FormData
): Promise<ActivityFormState> {
  const session = await getSession();
  if (!session) return { error: "로그인이 필요합니다" };
  if (!WEEKLY_TEAM_NAMES.includes(session.team)) {
    return { error: "운영진팀은 주차 활동을 제출하지 않습니다" };
  }

  const parsed = activityPostSchema.safeParse({
    weekId: formData.get("weekId"),
    content: formData.get("content") ?? "",
  });

  if (!parsed.success) {
    return { error: "입력값을 확인해주세요" };
  }

  const files = formData
    .getAll("images")
    .filter((f): f is File => f instanceof File && f.size > 0);

  if (files.length > MAX_IMAGES_PER_SUBMISSION) {
    return {
      error: `이미지는 최대 ${MAX_IMAGES_PER_SUBMISSION}장까지 업로드할 수 있습니다`,
    };
  }

  for (const file of files) {
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      return {
        error: "지원하지 않는 이미지 형식입니다 (png, jpg, webp, gif만 가능)",
      };
    }
    if (file.size > MAX_IMAGE_SIZE_BYTES) {
      return { error: "이미지 용량은 8MB를 초과할 수 없습니다" };
    }
  }

  const post = await upsertActivityPost({
    weekId: parsed.data.weekId,
    team: session.team,
    authorId: session.sub,
    content: parsed.data.content,
  });

  let position = await countImagesForPost(post.id);

  for (const file of files) {
    const path = buildActivityImagePath(
      post.week_id,
      post.team,
      post.id,
      file.name
    );
    await uploadActivityImage(path, file);
    await addActivityPostImage({
      activityPostId: post.id,
      storagePath: path,
      fileName: file.name,
      contentType: file.type,
      sizeBytes: file.size,
      position: position++,
    });
  }

  revalidatePath(`/weeks/${parsed.data.weekId}`);
  return { success: true };
}
