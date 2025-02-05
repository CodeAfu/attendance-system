import { z } from "zod";


export const userSchema = z.object({
  name: z.string().min(1, "Please provide your name."),
  employer: z.string().min(1, "Please provide your employer."),
  NRIC: z.string().regex(
    /^(?:\d{6}|\d{5}\*)\d{2}[0-9]{3}[13579]$|^(?:\d{6}|\d{5}\*)\d{2}[0-9]{3}[02468]$/,
    "Invalid NRIC format"
  ),
  citizenship: z.string(),
  gender: z.string()
    .refine((value) => value === "male" || value === "female",
    "Gender must be Male or Female",
  ),
  signature: z.string(), // Base64 image string
});

export default function User() {
  return 
}
