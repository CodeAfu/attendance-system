"use server";

import { LoginSchema } from "@/lib/validations";
import { createSession } from "@/lib/session";
import { redirect } from "next/navigation";

const testUser = {
  id: "1",
  email: "testEmail@donotreply.com",
  password: "pass",
};

export async function login(prevState: any, formData: FormData) {
  const result = LoginSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    }
  }

  const { email, password } = result.data;

  if (email !== testUser.email || password !== testUser.password) {
    return {
      errors: {
        email: ["Invalid email or password"],
      },
    }
  }

  await createSession(testUser.id);

  redirect("/admin");
}

export async function logout() {

}

