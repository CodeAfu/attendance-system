import { prisma } from "@/lib/prisma";
import { decrypt, getSession, validateSession } from "@/lib/session";

export async function loadUserDetails()
  : Promise<{ email: string, role: string } | { message: string }> {
  const session = await getSession();
  const sessionData = await decrypt(session?.value);
  
  if (!sessionData?.userId) {
    return {
      message: "Error occurred while loading user data from session"
    }
  }

  const user = await prisma.systemUser.findFirst({
    where: {
      id: sessionData.userId
    },
    select: {
      email: true,
      role: true
    }
  });

  if (!user) {
    return {
      message: "User not found"
    }
  }

  return user;
}

export async function getAccountByEmail(email: string) {
  if (!validateSession()) return {
    message: "Please login to an authorized account to perform this action",
  };
  const user = prisma.systemUser.findFirst({
    where: {
      email
    }
  });

  return user;
}