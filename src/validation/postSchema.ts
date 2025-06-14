import { z } from "zod";

export const postSchema = z.object({
  title: z.string().min(3).max(100),
  content: z.string().min(10).max(1000),
});

export type PostInput = z.infer<typeof postSchema>;
