"use server";

import { redirect } from "next/navigation";
import { loginSchema } from "@/lib/validation/auth";
import { findMemberByStudentId } from "@/lib/data/members";
import { setSessionCookie } from "@/lib/auth/session.server";

export interface LoginState {
  error?: string;
}

export async function loginAction(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const parsed = loginSchema.safeParse({
    studentId: formData.get("studentId"),
    name: formData.get("name"),
  });

  if (!parsed.success) {
    return { error: "학번과 이름을 올바르게 입력해주세요" };
  }

  const member = await findMemberByStudentId(parsed.data.studentId);

  if (!member || member.name.trim() !== parsed.data.name.trim()) {
    return { error: "학번 또는 이름이 일치하지 않습니다" };
  }

  await setSessionCookie({
    sub: member.id,
    studentId: member.student_id,
    name: member.name,
    team: member.team,
    role: member.role,
  });

  redirect("/dashboard");
}
