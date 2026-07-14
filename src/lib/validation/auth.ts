import { z } from "zod";

export const loginSchema = z.object({
  studentId: z.string().trim().min(1, "학번을 입력해주세요").max(20),
  name: z.string().trim().min(1, "이름을 입력해주세요").max(50),
});

export type LoginInput = z.infer<typeof loginSchema>;
