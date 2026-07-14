import { z } from "zod";

export const teamEditSchema = z.object({
  name: z.string().trim().min(1, "팀 이름을 입력해주세요").max(50),
  description: z.string().trim().max(2000).default(""),
});

export type TeamEditInput = z.infer<typeof teamEditSchema>;
