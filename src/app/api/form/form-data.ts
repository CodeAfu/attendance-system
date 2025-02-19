import { z } from "zod";
import { TraineeSchema, CourseSchema } from "@/lib/validations";

const formDataSchema = z.object({
  userSchema: TraineeSchema,
  courseSchema: CourseSchema,
})


export default function FormData() {
  return formDataSchema;
}