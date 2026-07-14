"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth/session.server";
import { canEditTeam, canPostToTeamBoard } from "@/lib/auth/team-access";
import { teamEditSchema } from "@/lib/validation/team";
import { teamPostSchema } from "@/lib/validation/team-post";
import { ALLOWED_IMAGE_TYPES, MAX_IMAGE_SIZE_BYTES } from "@/lib/validation/image";
import { updateTeam } from "@/lib/data/teams";
import { createTeamPost } from "@/lib/data/team-posts";
import {
  buildTeamPhotoPath,
  uploadProfileImage,
} from "@/lib/storage/profile-images";
import type { TeamName } from "@/types/db";

export interface TeamFormState {
  error?: string;
  success?: boolean;
}

export async function updateTeamAction(
  teamId: TeamName,
  _prevState: TeamFormState,
  formData: FormData
): Promise<TeamFormState> {
  const session = await getSession();
  if (!session) return { error: "로그인이 필요합니다" };
  if (!(await canEditTeam(session, teamId))) {
    return { error: "권한이 없습니다" };
  }

  const parsed = teamEditSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description") ?? "",
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "입력값을 확인해주세요" };
  }

  const file = formData.get("photo");
  let photoPath: string | undefined;

  if (file instanceof File && file.size > 0) {
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      return {
        error: "지원하지 않는 이미지 형식입니다 (png, jpg, webp, gif만 가능)",
      };
    }
    if (file.size > MAX_IMAGE_SIZE_BYTES) {
      return { error: "이미지 용량은 8MB를 초과할 수 없습니다" };
    }
    photoPath = buildTeamPhotoPath(teamId, file.name);
    await uploadProfileImage(photoPath, file);
  }

  await updateTeam(teamId, {
    name: parsed.data.name,
    description: parsed.data.description,
    photoPath,
    updatedBy: session.sub,
  });

  revalidatePath(`/teams/${teamId}`);
  revalidatePath("/teams");
  return { success: true };
}

export async function createTeamPostAction(
  teamId: TeamName,
  _prevState: TeamFormState,
  formData: FormData
): Promise<TeamFormState> {
  const session = await getSession();
  if (!session) return { error: "로그인이 필요합니다" };
  if (!canPostToTeamBoard(session, teamId)) {
    return { error: "본인 팀 게시판에만 작성할 수 있습니다" };
  }

  const parsed = teamPostSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content") ?? "",
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "입력값을 확인해주세요" };
  }

  await createTeamPost({
    teamId,
    authorId: session.sub,
    title: parsed.data.title,
    content: parsed.data.content,
  });

  revalidatePath(`/teams/${teamId}`);
  return { success: true };
}
