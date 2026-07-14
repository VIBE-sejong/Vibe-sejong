"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { TeamFormState } from "./actions";

const initialState: TeamFormState = {};

export function TeamEditForm({
  action,
  name,
  description,
}: {
  action: (
    prevState: TeamFormState,
    formData: FormData
  ) => Promise<TeamFormState>;
  name: string;
  description: string;
}) {
  const [state, formAction, isPending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="space-y-4 rounded-lg border p-4">
      <div className="space-y-2">
        <Label htmlFor="photo">팀 사진</Label>
        <input
          id="photo"
          name="photo"
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif"
          className="block w-full text-sm file:mr-3 file:rounded-md file:border-0 file:bg-secondary file:px-3 file:py-1.5 file:text-sm"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="name">팀 이름</Label>
        <Input id="name" name="name" defaultValue={name} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">팀 소개</Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={description}
          rows={4}
          placeholder="팀 소개를 작성해주세요 (다른 팀에게는 보이지 않습니다)"
        />
      </div>
      {state.error && <p className="text-sm text-destructive">{state.error}</p>}
      {state.success && (
        <p className="text-sm text-emerald-600">저장되었습니다</p>
      )}
      <Button type="submit" disabled={isPending}>
        {isPending ? "저장 중..." : "저장"}
      </Button>
    </form>
  );
}
