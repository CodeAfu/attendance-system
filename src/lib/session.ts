// import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

type SessionPayload = {
  userId: string;
  role: string;
  expiresAt: Date;
};

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function createSession(userId: string | null, role: string | null) {
  if (!userId) {
    throw new Error("User ID is required to create a session.");
  }
  if (!role) {
    throw new Error("User does not have a role.");
  }
  
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000);
  const session = await encrypt({ userId, role, expiresAt });
  const cookieStore = await cookies();

  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function updateSession() {
  const session = (await cookies()).get('session')?.value;
  const payload = await decrypt(session);

  if (!session || !payload) {
    return null;
  }

  const expires = new Date(Date.now() + 15 * 60 * 1000)
 
  const cookieStore = await cookies()
  cookieStore.set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: 'lax',
    path: '/',
  })
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}

export async function getSession() {
  const cookieStore = await cookies();
  return cookieStore.get("session")?.value;
}

export async function isValidSession() {
  const session = await getSession();
  const sessionData = await decrypt(session);
  return !!sessionData?.userId;
}

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch {
    console.log("Failed to verify session");
  }
}