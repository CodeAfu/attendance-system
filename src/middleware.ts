import { handleAuth } from '@/lib/auth';
import type { NextRequest } from 'next/server';

export default async function middleware(request: NextRequest) {
  return (
    handleAuth(request) 
  )
}

// export const config = {
//   matcher: [
//     '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
//   ],
// };
