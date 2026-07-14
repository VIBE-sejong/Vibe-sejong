"use client";

import { useActionState } from "react";
import { createActivityPostAction, type ActivityFormState } from "./actions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const initialState: ActivityFormState = {};

export function ActivityUploadForm({
  weekId,
  existingContent,
}: {
  weekId: string;
  existingContent: string;
}) {
  const [state, formAction, isPending] = useActionState(
    createActivityPostAction,
    initialState
  );

  return (
    <form action={formAction} className="space-y-3 rounded-lg border p-4">
      <input type="hidden" name="weekId" value={weekId} />
      <div className="space-y-2">
        <Label htmlFor="content">활동 내용</Label>
        <Textarea
          id="content"
          name="content"
          defaultValue={existingContent}
          rows={4}
          placeholder="이번 주에 한 활동을 적어주세요"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="images">사진 첨부</Label>
        <input
          id="images"
          name="images"
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif"
          multiple
          className="block w-full text-sm file:mr-3 file:rounded-md file:border-0 file:bg-secondary file:px-3 file:py-1.5 file:text-sm"
        />
      </div>
      {state.error && <p className="text-sm text-destructive">{state.error}</p>}
      {state.success && (
        <p className="text-sm text-emerald-600">업로드되었습니다</p>
      )}
      <Button type="submit" disabled={isPending}>
        {isPending ? "업로드 중..." : "업로드"}
      </Button>
    </form>
  );
}
