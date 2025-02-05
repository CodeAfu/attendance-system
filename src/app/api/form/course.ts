import { z } from "zod";

export const courseSchema = z.object({
  courseId: z.string(),
  courseName: z.string(),
  venue: z.string(),
})