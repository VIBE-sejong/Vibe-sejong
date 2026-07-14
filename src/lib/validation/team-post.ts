import { z } from "zod";

export const teamPostSchema = z.object({
  title: z.string().trim().min(1, "제목을 입력해주세요").max(200),
  content: z.string().trim().max(5000).default(""),
});

export type TeamPostInput = z.infer<typeof teamPostSchema>;
