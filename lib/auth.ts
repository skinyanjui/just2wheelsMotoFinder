import type { NextRequest } from "next/server"
import { jwtDecode } from "jwt-decode"
import { cookies } from "next/headers"

interface JwtPayload {
  sub: string
  name: string
  email: string
  image?: string
  exp: number
}

interface User {
  id: string
  name: string
  email: string
  image?: string
}

export async function getAuthUser(request: NextRequest): Promise<User | null> {
  try {
    // For API routes, get the token from the cookie in the request
    const token = request.cookies.get("auth-token")?.value

    if (!token) {
      return null
    }

    // Verify and decode the token
    const decoded = jwtDecode<JwtPayload>(token)

    // Check if token is expired
    const currentTime = Date.now() / 1000
    if (decoded.exp < currentTime) {
      return null
    }

    // Return the user
    return {
      id: decoded.sub,
      name: decoded.name,
      email: decoded.email,
      image: decoded.image,
    }
  } catch (error) {
    console.error("Auth token validation failed:", error)
    return null
  }
}

export async function getAuthUserFromServerComponent(): Promise<User | null> {
  try {
    // For server components, get the token from the cookie jar
    const token = cookies().get("auth-token")?.value

    if (!token) {
      return null
    }

    // Verify and decode the token
    const decoded = jwtDecode<JwtPayload>(token)

    // Check if token is expired
    const currentTime = Date.now() / 1000
    if (decoded.exp < currentTime) {
      return null
    }

    // Return the user
    return {
      id: decoded.sub,
      name: decoded.name,
      email: decoded.email,
      image: decoded.image,
    }
  } catch (error) {
    console.error("Auth token validation failed:", error)
    return null
  }
}
