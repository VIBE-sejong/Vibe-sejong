import { z } from "zod";
import { MEMBER_PARTS, MEMBER_ROLES, TEAM_NAMES } from "@/types/db";

export const memberSchema = z.object({
  studentId: z.string().trim().min(1, "학번을 입력해주세요").max(20),
  name: z.string().trim().min(1, "이름을 입력해주세요").max(50),
  team: z.enum(TEAM_NAMES as [string, ...string[]]),
  part: z.enum(MEMBER_PARTS as [string, ...string[]]),
  role: z.enum(MEMBER_ROLES as [string, ...string[]]),
});

export type MemberInput = z.infer<typeof memberSchema>;

export const profileSchema = z.object({
  bio: z.string().trim().max(1000).default(""),
});

export type ProfileInput = z.infer<typeof profileSchema>;
