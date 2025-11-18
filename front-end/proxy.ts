import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

// Admin-only routes (checked before page loads)
const ADMIN_ONLY_ROUTES = [
  '/dashboard/users',
  '/dashboard/stores/new',
  // Store edit routes (pattern matching for dynamic routes)
  // Note: We check if pathname matches the pattern /dashboard/stores/[slug]/edit
  // Add more admin-only routes here as needed
  // '/dashboard/settings',
  // '/dashboard/analytics',
];

// Get JWT secret from environment variable
// In production, set NEXT_PUBLIC_JWT_SECRET to match Django's SECRET_KEY
// For development, using Django's default SECRET_KEY
const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET || 'django-insecure-(nl9duwutv_#%h%j7k3bni&r*!$b==1y6k6%7#)4j+xlc8go5(';

/**
 * Validates JWT token and returns payload if valid, null if invalid
 */
async function validateToken(token: string): Promise<any | null> {
  try {
    const secret = new TextEncoder().encode(JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch {
    return null;
  }
}

export async function proxy(request: NextRequest) {
  const token = request.cookies.get('jwt');
  let tokenPayload: any | null = null;

  // Validate token if it exists
  if (token) {
    tokenPayload = await validateToken(token.value);
  }

  // Protect all dashboard routes (includes /dashboard, /dashboard/projects, /dashboard/user, etc.)
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    // If no token or invalid token, redirect to login and clear invalid token
    if (!token || !tokenPayload) {
      const response = NextResponse.redirect(new URL('/login', request.url));
      // Clear invalid token cookie
      if (token) {
        response.cookies.delete('jwt');
      }
      return response;
    }

    // Check if route is admin-only
    const isAdminOnlyRoute =
      ADMIN_ONLY_ROUTES.some((route) => request.nextUrl.pathname.startsWith(route)) ||
      // Check for store edit routes (e.g., /dashboard/stores/[slug]/edit)
      /^\/dashboard\/stores\/[^/]+\/edit$/.test(request.nextUrl.pathname);

    if (isAdminOnlyRoute) {
      // Check if user is admin (role is in token payload)
      const userRole = tokenPayload.role;

      // If not admin, redirect to dashboard (don't log them out)
      if (userRole !== 'admin') {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
      // If admin, allow through (continue to page)
    }
  }

  // Redirect to dashboard if valid token and trying to access login or homepage
  if (token && tokenPayload) {
    if (request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  // If invalid token exists on login/homepage, clear it
  if (token && !tokenPayload) {
    if (request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/') {
      const response = NextResponse.next();
      response.cookies.delete('jwt');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register', '/'],
};
