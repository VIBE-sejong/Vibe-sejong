"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { TeamFormState } from "./actions";

const initialState: TeamFormState = {};

export function TeamPostForm({
  action,
}: {
  action: (
    prevState: TeamFormState,
    formData: FormData
  ) => Promise<TeamFormState>;
}) {
  const [state, formAction, isPending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="space-y-3 rounded-lg border p-4">
      <div className="space-y-2">
        <Label htmlFor="title">제목</Label>
        <Input id="title" name="title" placeholder="이슈나 활동 내용을 적어주세요" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="content">내용</Label>
        <Textarea id="content" name="content" rows={4} />
      </div>
      {state.error && <p className="text-sm text-destructive">{state.error}</p>}
      <Button type="submit" disabled={isPending}>
        {isPending ? "등록 중..." : "등록"}
      </Button>
    </form>
  );
}
