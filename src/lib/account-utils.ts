import bcrypt from "bcrypt";
import { decrypt } from "@/lib/session";
import { cookies } from "next/headers";

export async function hashPassword(password: string): Promise<string> {
  const salt = bcrypt.genSaltSync(13);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

export async function checkPassword(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}


export async function isLoggedIn(): Promise<boolean> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session");

  if (!sessionCookie) {
    return false;
  }

  const sessionData = await decrypt(sessionCookie.value);

  return !!sessionData?.userId;
}
