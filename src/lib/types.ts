import { z } from "zod";
import { CourseSchema, TraineeSchema } from "@/lib/validations";

export type LoginState = {
  errors?: Record<string, string[]>;
  inputs?: LoginFields;
};

export type LoginFields = {
  email: string;
  password: string;
}

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

export type ActionResponse = {
  success: boolean;
  message: string;
}

export type QRData = {
  venue: string;
  course: string;
  qrCode: string | null;
  url: string | "#";
}

// Zod
export type User = z.infer<typeof TraineeSchema>;
export type Course = z.infer<typeof CourseSchema>;

// Enums
export enum FetchType {
  text,
  date,
}


