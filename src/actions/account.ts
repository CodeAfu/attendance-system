"use server";

import { LoginSchema } from "@/lib/validations";
import { createSession, deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { LoginState } from "@/lib/types";
import { prisma } from "@/lib/prisma";
import { checkPassword } from "@/lib/account-utils";

export async function login(
  prevState: LoginState | undefined,
  formData: FormData
): Promise<LoginState | undefined> {
  const formEntries = Object.fromEntries(formData) as Record<string, string>;
  const result = LoginSchema.safeParse(Object.fromEntries(formData));

  // zod validation
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
  const redirectTo = formEntries.redirectTo || "/admin";

  // DB validation
  try {
    const user = await prisma.systemUser.findFirst({ 
      where: {
        email
      }, 
      select: {
        id: true,
        email: true,
        hashedPassword: true
      }
    });
    
    if (!user) {
      return {
        errors: {
          message: ["Invalid email or password"]
        },
        inputs: {
          email: formEntries.email ?? "",
          password: formEntries.password ?? "",
        },
      }
    }

    const isValidPassword = await checkPassword(password, user.hashedPassword);
    if (!isValidPassword) {
      return {
        errors: {
          message: ["Invalid email or password"]
        },
        inputs: {
          email: formEntries.email ?? "",
          password: formEntries.password ?? "",
        },
      }
    }

    await createSession(user.id);
  } catch (error) {
    console.error(error);
  }
  redirect(redirectTo);
}

export async function logout() {
  await deleteSession();
}

