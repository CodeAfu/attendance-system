"use server";

import { LoginSchema } from "@/lib/validations";
import { createSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { LoginState } from "@/lib/types";

const testUser = {
  id: "1",
  email: "testEmail@donotreply.com",
  password: "password123",
};

export async function login(
  prevState: LoginState | undefined,
  formData: FormData
): Promise<LoginState | undefined> {
  const formEntries = Object.fromEntries(formData) as Record<string, string>;
  const result = LoginSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
      inputs: {
        email: formEntries.email ?? "",
        password: formEntries.password ?? "",
      },    
    }
  }

  const { email, password } = result.data;

  // TODO: Replace this to check with DB users
  if (email !== testUser.email || password !== testUser.password) {
    return {
      errors: {
        message: ["Invalid email or password"],
      },
      inputs: { email, password },
    }
  }

  await createSession(testUser.id);

  redirect("/admin");
}

export async function logout() {

}

