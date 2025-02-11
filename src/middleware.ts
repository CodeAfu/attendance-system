import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decrypt } from '@/lib/session';

const protectedRoutes = ["/admin"];
const publicRoutes = ["/account/login"];

export default async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path); 

  const cookie = request.cookies.get("session");

  const session = await decrypt(cookie?.value);

  if (isProtectedRoute && !session?.userId) {
    const loginUrl = new URL("/account/login", request.nextUrl);
    loginUrl.searchParams.set("redirect", path);
    return NextResponse.redirect(loginUrl);
  }

  if (isPublicRoute && session?.userId) {
    const redirectUrl = request.nextUrl.searchParams.get("redirect") || "/";
    return NextResponse.redirect(new URL(redirectUrl, request.nextUrl))
  }

  return NextResponse.next();
}
