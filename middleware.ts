import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const authToken = request.cookies.get('authToken')?.value;
  const isAuthPage = request.nextUrl.pathname === '/' || request.nextUrl.pathname.startsWith('/register');
  const isDashboardPage = request.nextUrl.pathname.startsWith('/dashboard');

  // Rule 1: Authenticated users trying to access login/register get redirected to dashboard
  if (isAuthPage && authToken) {
    return NextResponse.redirect(new URL('/dashboard/products', request.url))
  }

  // Rule 2: Unauthenticated users trying to access dashboard get redirected to login
  if (isDashboardPage && !authToken) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
