import { z } from "zod";
import { UserSchema, CourseSchema } from "@/lib/validations";

const formDataSchema = z.object({
  userSchema: UserSchema,
  courseSchema: CourseSchema,
})


export default function FormData() {
  return formDataSchema;
}