"use client";

import { useActionState, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MEMBER_PARTS,
  MEMBER_ROLES,
  PART_LABELS,
  TEAM_LABELS,
  TEAM_NAMES,
} from "@/types/db";
import type { Member, MemberPart, MemberRole, TeamName } from "@/types/db";
import type { MemberFormState } from "./actions";

const initialState: MemberFormState = {};

const ROLE_LABELS: Record<MemberRole, string> = {
  admin: "관리자",
  member: "소모임원",
};

export function MemberForm({
  action,
  member,
}: {
  action: (
    prevState: MemberFormState,
    formData: FormData
  ) => Promise<MemberFormState>;
  member?: Member;
}) {
  const [state, formAction, isPending] = useActionState(action, initialState);
  const [team, setTeam] = useState<TeamName>(member?.team ?? "team_1");
  const [part, setPart] = useState<MemberPart>(member?.part ?? "design");
  const [role, setRole] = useState<MemberRole>(member?.role ?? "member");

  return (
    <form action={formAction} className="max-w-md space-y-4">
      <input type="hidden" name="team" value={team} />
      <input type="hidden" name="part" value={part} />
      <input type="hidden" name="role" value={role} />

      <div className="space-y-2">
        <Label htmlFor="studentId">학번</Label>
        <Input
          id="studentId"
          name="studentId"
          defaultValue={member?.student_id}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="name">이름</Label>
        <Input id="name" name="name" defaultValue={member?.name} required />
      </div>
      <div className="space-y-2">
        <Label>팀</Label>
        <Select value={team} onValueChange={(v) => setTeam(v as TeamName)}>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {TEAM_NAMES.map((t) => (
              <SelectItem key={t} value={t}>
                {TEAM_LABELS[t]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>역할(파트)</Label>
        <Select value={part} onValueChange={(v) => setPart(v as MemberPart)}>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {MEMBER_PARTS.map((p) => (
              <SelectItem key={p} value={p}>
                {PART_LABELS[p]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>권한</Label>
        <Select value={role} onValueChange={(v) => setRole(v as MemberRole)}>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {MEMBER_ROLES.map((r) => (
              <SelectItem key={r} value={r}>
                {ROLE_LABELS[r]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {state.error && <p className="text-sm text-destructive">{state.error}</p>}
      <Button type="submit" disabled={isPending}>
        {isPending ? "저장 중..." : "저장"}
      </Button>
    </form>
  );
}
