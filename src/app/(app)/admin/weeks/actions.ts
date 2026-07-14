"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session.server";
import { weekSchema } from "@/lib/validation/week";
import { createWeek, updateWeek } from "@/lib/data/weeks";

export interface WeekFormState {
  error?: string;
}

async function requireAdmin() {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    throw new Error("Forbidden");
  }
  return session;
}

export async function createWeekAction(
  _prevState: WeekFormState,
  formData: FormData
): Promise<WeekFormState> {
  const session = await requireAdmin();

  const parsed = weekSchema.safeParse({
    weekNumber: formData.get("weekNumber"),
    title: formData.get("title"),
    description: formData.get("description") ?? "",
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "입력값을 확인해주세요" };
  }

  try {
    await createWeek({
      weekNumber: parsed.data.weekNumber,
      title: parsed.data.title,
      description: parsed.data.description,
      createdBy: session.sub,
    });
  } catch {
    return { error: "이미 존재하는 주차 번호입니다" };
  }

  revalidatePath("/dashboard");
  revalidatePath("/admin/weeks");
  redirect("/admin/weeks");
}

export async function updateWeekAction(
  weekId: string,
  _prevState: WeekFormState,
  formData: FormData
): Promise<WeekFormState> {
  await requireAdmin();

  const parsed = weekSchema.safeParse({
    weekNumber: formData.get("weekNumber"),
    title: formData.get("title"),
    description: formData.get("description") ?? "",
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "입력값을 확인해주세요" };
  }

  try {
    await updateWeek(weekId, parsed.data);
  } catch {
    return { error: "저장 중 오류가 발생했습니다" };
  }

  revalidatePath("/dashboard");
  revalidatePath("/admin/weeks");
  revalidatePath(`/weeks/${weekId}`);
  redirect("/admin/weeks");
}
