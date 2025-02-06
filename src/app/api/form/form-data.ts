import { z } from "zod";
import { userSchema, courseSchema } from "@/lib/validations";

const formDataSchema = z.object({
  userSchema,
  courseSchema,
})


export default function FormData() {
  return formDataSchema;
}