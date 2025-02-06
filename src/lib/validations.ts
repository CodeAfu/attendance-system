import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(1, "Please provide your name."),
  employer: z.string().min(1, "Please provide your employer."),
  NRIC: z.string().regex(
    /^(?:\d{6}|\d{5}\*)\d{2}[0-9]{3}[13579]$|^(?:\d{6}|\d{5}\*)\d{2}[0-9]{3}[02468]$/,
    { message: "Invalid NRIC format" }
  ),
  citizenship: z.string(),
  gender: z.enum(["male", "female"], {
    invalid_type_error: "Please select a gender"
  }),
  signature: z.string(), // Base64 image string
});

export const courseSchema = z.object({
  courseId: z.string().min(3, "Please provide a course ID"),
  courseName: z.string().min(3, "Please provide a course name"),
  venue: z.string().min(1, "Please provide a venue."),
})




