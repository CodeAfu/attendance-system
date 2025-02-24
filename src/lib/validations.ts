import { z } from "zod";

export const TraineeSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: "Please provide your first name" }),
  lastName: z
    .string()
    .min(1, { message: "Please provide your last name" }),
  employer: z
    .string()
    .min(1, { message: "Please provide your employer" })
    .optional(),
  gender: z
    .enum(["male", "female"], { message: "Please select a gender" })
    .optional(),
  nric: z
    .string()
    .regex(
      /^(?:\d{6}|\d{5}\*)-?\d{2}-?\d{3}[13579]$|^(?:\d{6}|\d{5}\*)-?\d{2}-?\d{3}[02468]$/,
      { message: "Invalid NRIC format" }
    )
    .trim()
    .optional(),
  citizenship: z
    .string()
    .trim()
    .optional(),
  signature: z    // Base64 image string
    .string()
    .trim()
    .optional()
});

export const CourseSchema = z.object({
  courseId: z
    .string()
    .min(3, { message: "Please provide a course ID" })
    .trim(),
  courseName: z
    .string()
    .min(3, { message: "Please provide a course name" })
    .trim(),
  venue: z
    .string()
    .min(1, { message: "Please provide a venue" })
    .trim()
    .optional(),
})

export const LoginSchema = z.object({
  email: z
    .string()
    .email({ message: "Please provide a valid email address" })
    .trim(),
  password: z
    .string()
    .min(8, { message: "Password must contain atleast 8 characters" })
    .regex(/[a-zA-Z]/, { message: 'Password must contain at least one letter.' })
    .regex(/[0-9]/, { message: 'Password must contain at least one number.' })
    .trim(),
});

export const RegisterSchema = z.object({  // Registration for admin/moderator accounts
  username: z
    .string()
    .min(3, { message: "Username must contain atleast 3 characters" })
    .trim(),
  email: z
    .string()
    .email({ message: "Please enter a valid email address "})
    .trim(),
  password: z
    .string()
    .min(8, "Password must contain atleast 8 characters")
    .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
    .regex(/[0-9]/, { message: 'Contain at least one number.' })
    .trim(),
});


