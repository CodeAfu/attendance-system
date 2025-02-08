import { z } from "zod";
import { CourseSchema, UserSchema } from "@/lib/validations";

export type DropdownType = {
  name: string;
}

export type Error = {
  success: boolean;
  message: string;
}

export type APIResponse<T = unknown> = {
  success: boolean;
  data: T;
}

export type QRData = {
  venue: string;
  course: string;
  qrCode: string | null;
  url: string | "#";
}

// Zod
export type User = z.infer<typeof UserSchema>;
export type Course = z.infer<typeof CourseSchema>;

// Enums
export enum FetchType {
  text,
  date,
}


