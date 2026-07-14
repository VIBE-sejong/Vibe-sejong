"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session.server";
import { memberSchema } from "@/lib/validation/member";
import { createMember, deleteMember, updateMember } from "@/lib/data/members";
import type { MemberPart, MemberRole, TeamName } from "@/types/db";

export interface MemberFormState {
  error?: string;
}

async function requireAdmin() {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    throw new Error("Forbidden");
  }
  return session;
}

function parseMemberForm(formData: FormData) {
  return memberSchema.safeParse({
    studentId: formData.get("studentId"),
    name: formData.get("name"),
    team: formData.get("team"),
    part: formData.get("part"),
    role: formData.get("role"),
  });
}

export async function createMemberAction(
  _prevState: MemberFormState,
  formData: FormData
): Promise<MemberFormState> {
  await requireAdmin();

  const parsed = parseMemberForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "입력값을 확인해주세요" };
  }

  try {
    await createMember({
      studentId: parsed.data.studentId,
      name: parsed.data.name,
      team: parsed.data.team as TeamName,
      part: parsed.data.part as MemberPart,
      role: parsed.data.role as MemberRole,
    });
  } catch {
    return { error: "이미 등록된 학번입니다" };
  }

  revalidatePath("/admin/members");
  redirect("/admin/members");
}

export interface DeleteMemberState {
  error?: string;
}

export async function deleteMemberAction(
  memberId: string
): Promise<DeleteMemberState> {
  const session = await requireAdmin();

  if (memberId === session.sub) {
    return { error: "본인 계정은 삭제할 수 없습니다" };
  }

  await deleteMember(memberId);
  revalidatePath("/admin/members");
  return {};
}

export async function updateMemberAction(
  memberId: string,
  _prevState: MemberFormState,
  formData: FormData
): Promise<MemberFormState> {
  await requireAdmin();

  const parsed = parseMemberForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "입력값을 확인해주세요" };
  }

  try {
    await updateMember(memberId, {
      studentId: parsed.data.studentId,
      name: parsed.data.name,
      team: parsed.data.team as TeamName,
      part: parsed.data.part as MemberPart,
      role: parsed.data.role as MemberRole,
    });
  } catch {
    return { error: "저장 중 오류가 발생했습니다" };
  }

  revalidatePath("/admin/members");
  redirect("/admin/members");
}
