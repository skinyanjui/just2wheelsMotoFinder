"use client"

import type React from "react"
import { createContext, useState, useEffect } from "react"
import { jwtDecode } from "jwt-decode"
import Cookies from "js-cookie"

interface User {
  id: string
  name: string
  email: string
  image?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<boolean>
  signOut: () => void
  register: (name: string, email: string, password: string) => Promise<boolean>
}

// JWT token interface
interface JwtPayload {
  sub: string
  name: string
  email: string
  image?: string
  exp: number
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  signIn: async () => false,
  signOut: () => {},
  register: async () => false,
})

// Cookie configuration
const COOKIE_NAME = "auth-token"
const COOKIE_OPTIONS = {
  expires: 30, // 30 days
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  path: "/",
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for existing token on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = Cookies.get(COOKIE_NAME)

        if (token) {
          // Verify and decode the token
          const decoded = jwtDecode<JwtPayload>(token)

          // Check if token is expired
          const currentTime = Date.now() / 1000
          if (decoded.exp < currentTime) {
            // Token expired, remove it
            Cookies.remove(COOKIE_NAME)
            setUser(null)
          } else {
            // Valid token, set user
            setUser({
              id: decoded.sub,
              name: decoded.name,
              email: decoded.email,
              image: decoded.image,
            })
          }
        }
      } catch (error) {
        console.error("Auth token validation failed:", error)
        Cookies.remove(COOKIE_NAME)
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const generateToken = (userData: User): string => {
    // In a real app, this would be done server-side
    // This is a simplified mock implementation
    const now = Date.now() / 1000
    const expiresIn = 60 * 60 * 24 * 30 // 30 days

    const payload = {
      sub: userData.id,
      name: userData.name,
      email: userData.email,
      image: userData.image,
      iat: now,
      exp: now + expiresIn,
    }

    // In a real app, you would sign this with a secret
    // For demo purposes, we're just encoding it
    return btoa(JSON.stringify(payload))
  }

  const generateId = () => {
    // Generate a simple UUID using browser crypto
    const array = new Uint8Array(16)
    crypto.getRandomValues(array)
    return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join("")
  }

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true)

      // In a real app, this would be an API call to validate credentials
      if (email && password) {
        const mockUser: User = {
          id: "user-1",
          name: "John Rider",
          email,
          image: "/placeholder.svg?height=200&width=200&query=person",
        }

        // Generate token and store in cookie
        const token = generateToken(mockUser)
        Cookies.set(COOKIE_NAME, token, COOKIE_OPTIONS)

        // Also set in HTTP-only cookie via API call (in a real app)
        // await fetch('/api/auth/session', { method: 'POST', body: JSON.stringify({ token }) })

        setUser(mockUser)
        return true
      }
      return false
    } catch (error) {
      console.error("Login failed:", error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const signOut = async () => {
    try {
      setIsLoading(true)

      // Remove cookie
      Cookies.remove(COOKIE_NAME)

      // Also remove HTTP-only cookie via API call (in a real app)
      // await fetch('/api/auth/logout', { method: 'POST' })

      setUser(null)
    } catch (error) {
      console.error("Logout failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (name: string, email: string, password: string) => {
    try {
      setIsLoading(true)

      // In a real app, this would be an API call to create a user
      if (name && email && password) {
        const mockUser: User = {
          id: "user-" + generateId(),
          name,
          email,
          image: "/placeholder.svg?height=200&width=200&query=person",
        }

        // Generate token and store in cookie
        const token = generateToken(mockUser)
        Cookies.set(COOKIE_NAME, token, COOKIE_OPTIONS)

        // Also set in HTTP-only cookie via API call (in a real app)
        // await fetch('/api/auth/session', { method: 'POST', body: JSON.stringify({ token }) })

        setUser(mockUser)
        return true
      }
      return false
    } catch (error) {
      console.error("Registration failed:", error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  return <AuthContext.Provider value={{ user, isLoading, signIn, signOut, register }}>{children}</AuthContext.Provider>
}
