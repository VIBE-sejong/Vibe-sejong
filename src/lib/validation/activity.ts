import { z } from "zod";

export { ALLOWED_IMAGE_TYPES, MAX_IMAGE_SIZE_BYTES } from "./image";
export const MAX_IMAGES_PER_SUBMISSION = 10;

export const activityPostSchema = z.object({
  weekId: z.string().uuid(),
  content: z.string().trim().max(5000).default(""),
});

export type ActivityPostInput = z.infer<typeof activityPostSchema>;
