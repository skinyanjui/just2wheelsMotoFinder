"use client"

import type React from "react"

import { createContext, useState, useEffect } from "react"

interface User {
  id: string
  name: string
  email: string
  image?: string
}

interface AuthContextType {
  user: User | null
  signIn: (email: string, password: string) => Promise<boolean>
  signOut: () => void
  register: (name: string, email: string, password: string) => Promise<boolean>
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  signIn: async () => false,
  signOut: () => {},
  register: async () => false,
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Failed to parse stored user:", error)
        localStorage.removeItem("user")
      }
    }
  }, [])

  const signIn = async (email: string, password: string) => {
    // In a real app, this would be an API call to your auth endpoint
    try {
      // Mock successful login
      if (email && password) {
        const mockUser: User = {
          id: "user-1",
          name: "John Rider",
          email,
          image: "/placeholder.svg?height=200&width=200&query=person",
        }
        setUser(mockUser)
        localStorage.setItem("user", JSON.stringify(mockUser))
        return true
      }
      return false
    } catch (error) {
      console.error("Login failed:", error)
      return false
    }
  }

  const signOut = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  const register = async (name: string, email: string, password: string) => {
    // In a real app, this would be an API call to your registration endpoint
    try {
      // Mock successful registration
      if (name && email && password) {
        const mockUser: User = {
          id: "user-" + Math.floor(Math.random() * 1000),
          name,
          email,
          image: "/placeholder.svg?height=200&width=200&query=person",
        }
        setUser(mockUser)
        localStorage.setItem("user", JSON.stringify(mockUser))
        return true
      }
      return false
    } catch (error) {
      console.error("Registration failed:", error)
      return false
    }
  }

  return <AuthContext.Provider value={{ user, signIn, signOut, register }}>{children}</AuthContext.Provider>
}
