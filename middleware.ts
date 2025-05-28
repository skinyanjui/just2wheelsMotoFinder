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
  const authToken = request.cookies.get("auth-token")
  const isAuthenticated = !!authToken?.value

  // For a real app, we would verify the token here
  // This is a simplified implementation
  let tokenIsValid = false

  if (isAuthenticated) {
    try {
      // Basic validation - check if token is properly formatted
      const decodedToken = JSON.parse(atob(authToken.value))
      const currentTime = Date.now() / 1000

      // Check if token has required fields and is not expired
      tokenIsValid = !!(decodedToken.sub && decodedToken.exp && decodedToken.exp > currentTime)
    } catch (error) {
      console.error("Token validation failed:", error)
      tokenIsValid = false
    }
  }

  // Handle protected routes - redirect to login if not authenticated
  if (protectedPaths.some((path) => pathname.startsWith(path)) && (!isAuthenticated || !tokenIsValid)) {
    const url = request.nextUrl.clone()
    url.pathname = "/auth/login"
    url.searchParams.set("callbackUrl", pathname)

    // Create response with redirect
    const response = NextResponse.redirect(url)

    // If token is invalid, clear it
    if (isAuthenticated && !tokenIsValid) {
      response.cookies.delete("auth-token")
    }

    return response
  }

  // Redirect authenticated users away from auth pages
  if (authPaths.some((path) => pathname === path) && isAuthenticated && tokenIsValid) {
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
