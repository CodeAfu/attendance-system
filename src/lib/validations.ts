import { z } from "zod";

export const TraineeSchema = z.object({
  name: z.string().min(1, "Please provide your name"),
  employer: z.string().min(1, "Please provide your employer"),
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

export const CourseSchema = z.object({
  courseId: z.string().min(3, "Please provide a course ID"),
  courseName: z.string().min(3, "Please provide a course name"),
  venue: z.string().min(1, "Please provide a venue"),
})

export const LoginSchema = z.object({
  email: z.string().email("Please provide a valid email address"),
  password: z.string().min(8, "Password must contain atleast 8 characters").regex(
    /^(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z0-9]{8,}$/,
    { message: "Password format is invalid" }
  ),
});

export const RegisterSchema = z.object({  // Registration for admin/moderator accounts
  username: z.string().min(3, "Username must contain atleast 3 characters"),
  email: z.string().email().trim(),
  password: z.string().min(8, "Password must contain atleast 8 characters").regex(
    /^(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z0-9]{8,}$/,
    { message: "Password must contain a letter and a number" }
  ).trim(),
});


