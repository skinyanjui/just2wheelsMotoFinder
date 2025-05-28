import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Define paths that require authentication
const protectedPaths = [
  "/listings/create",
  "/listings/my-listings",
  "/messages",
  "/profile",
  "/favorites",
  "/saved-searches",
  "/notifications",
]

// Define paths that should redirect authenticated users
const authPaths = ["/auth/login", "/auth/register"]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if user is authenticated by looking for the auth cookie
  const isAuthenticated = request.cookies.has("auth-token")

  // Handle protected routes - redirect to login if not authenticated
  if (protectedPaths.some((path) => pathname.startsWith(path)) && !isAuthenticated) {
    const url = request.nextUrl.clone()
    url.pathname = "/auth/login"
    url.searchParams.set("callbackUrl", pathname)
    return NextResponse.redirect(url)
  }

  // Redirect authenticated users away from auth pages
  if (authPaths.some((path) => pathname === path) && isAuthenticated) {
    const url = request.nextUrl.clone()
    url.pathname = "/"
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
}
