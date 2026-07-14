"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { WeekFormState } from "./actions";
import type { Week } from "@/types/db";

const initialState: WeekFormState = {};

export function WeekForm({
  action,
  week,
}: {
  action: (
    prevState: WeekFormState,
    formData: FormData
  ) => Promise<WeekFormState>;
  week?: Week;
}) {
  const [state, formAction, isPending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="max-w-md space-y-4">
      <div className="space-y-2">
        <Label htmlFor="weekNumber">주차</Label>
        <Input
          id="weekNumber"
          name="weekNumber"
          type="number"
          min={1}
          defaultValue={week?.week_number}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="title">제목</Label>
        <Input id="title" name="title" defaultValue={week?.title} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">설명</Label>
        <Textarea
          id="description"
          name="description"
          rows={6}
          defaultValue={week?.description}
        />
      </div>
      {state.error && <p className="text-sm text-destructive">{state.error}</p>}
      <Button type="submit" disabled={isPending}>
        {isPending ? "저장 중..." : "저장"}
      </Button>
    </form>
  );
}
