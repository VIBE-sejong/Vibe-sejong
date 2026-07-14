import { z } from "zod";

export const weekSchema = z.object({
  weekNumber: z.coerce.number().int().min(1).max(52),
  title: z.string().trim().min(1, "제목을 입력해주세요").max(200),
  description: z.string().trim().max(10000).default(""),
});

export type WeekInput = z.infer<typeof weekSchema>;
