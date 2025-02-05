import { z } from "zod";
import { userSchema } from "@/app/api/form/user";
import { courseSchema } from "@/app/api/form/course";

const formDataSchema = z.object({
  userSchema,
  courseSchema,
})


export default function FormData() {
  return formDataSchema;
}