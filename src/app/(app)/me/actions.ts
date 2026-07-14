"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth/session.server";
import { profileSchema } from "@/lib/validation/member";
import { ALLOWED_IMAGE_TYPES, MAX_IMAGE_SIZE_BYTES } from "@/lib/validation/image";
import { getMemberById, updateMemberProfile } from "@/lib/data/members";
import {
  buildMemberAvatarPath,
  deleteProfileImage,
  uploadProfileImage,
} from "@/lib/storage/profile-images";

export interface ProfileFormState {
  error?: string;
  success?: boolean;
}

export async function updateMyProfileAction(
  _prevState: ProfileFormState,
  formData: FormData
): Promise<ProfileFormState> {
  const session = await getSession();
  if (!session) return { error: "로그인이 필요합니다" };

  const parsed = profileSchema.safeParse({
    bio: formData.get("bio") ?? "",
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "입력값을 확인해주세요" };
  }

  const file = formData.get("avatar");
  let avatarPath: string | undefined;

  if (file instanceof File && file.size > 0) {
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      return {
        error: "지원하지 않는 이미지 형식입니다 (png, jpg, webp, gif만 가능)",
      };
    }
    if (file.size > MAX_IMAGE_SIZE_BYTES) {
      return { error: "이미지 용량은 8MB를 초과할 수 없습니다" };
    }

    const existing = await getMemberById(session.sub);
    avatarPath = buildMemberAvatarPath(session.sub, file.name);
    await uploadProfileImage(avatarPath, file);

    if (existing?.avatar_path) {
      await deleteProfileImage(existing.avatar_path);
    }
  }

  await updateMemberProfile(session.sub, { bio: parsed.data.bio, avatarPath });

  revalidatePath("/me");
  return { success: true };
}
