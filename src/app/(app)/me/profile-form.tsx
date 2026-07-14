"use client";

import { useActionState } from "react";
import { updateMyProfileAction, type ProfileFormState } from "./actions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const initialState: ProfileFormState = {};

export function ProfileForm({ bio }: { bio: string }) {
  const [state, formAction, isPending] = useActionState(
    updateMyProfileAction,
    initialState
  );

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="avatar">프로필 사진</Label>
        <input
          id="avatar"
          name="avatar"
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif"
          className="block w-full text-sm file:mr-3 file:rounded-md file:border-0 file:bg-secondary file:px-3 file:py-1.5 file:text-sm"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="bio">자기소개</Label>
        <Textarea
          id="bio"
          name="bio"
          defaultValue={bio}
          rows={4}
          placeholder="나를 소개하는 한마디를 남겨보세요"
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
