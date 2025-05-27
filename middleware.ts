import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Paths that require authentication
const protectedPaths = [
  "/profile",
  "/messages",
  "/listings/create",
  "/listings/my-listings",
  "/saved-searches",
  "/favorites",
  "/notifications",
]

// Paths that should redirect to dashboard if user is already authenticated
const authPaths = ["/auth/login", "/auth/register"]

export function middleware(request: NextRequest) {
  const currentPath = request.nextUrl.pathname

  // Check if user is authenticated (has a session token)
  const isAuthenticated = request.cookies.has("auth-token")

  // If accessing a protected path without authentication
  if (protectedPaths.some((path) => currentPath.startsWith(path)) && !isAuthenticated) {
    const url = new URL("/auth/login", request.url)
    url.searchParams.set("callbackUrl", encodeURI(currentPath))
    return NextResponse.redirect(url)
  }

  // If accessing auth pages while already authenticated
  if (authPaths.some((path) => currentPath === path) && isAuthenticated) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.png$).*)",
  ],
}
