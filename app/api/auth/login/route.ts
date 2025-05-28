import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"
import { compare } from "bcryptjs" // Changed from bcrypt to bcryptjs
import { sign } from "jsonwebtoken"
import { cookies } from "next/headers"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Validate input
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Find the user
    const users = await sql`
      SELECT id, name, email, password_hash, image_url
      FROM users
      WHERE email = ${email}
    `

    if (users.length === 0) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    const user = users[0]

    // Verify password
    const passwordMatch = await compare(password, user.password_hash)
    if (!passwordMatch) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    // Create JWT token
    const token = sign(
      {
        sub: user.id,
        name: user.name,
        email: user.email,
        image: user.image_url,
      },
      process.env.JWT_SECRET || "fallback-secret",
      { expiresIn: "30d" },
    )

    // Set HTTP-only cookie
    cookies().set({
      name: "auth-token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    })

    return NextResponse.json({
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image_url,
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Failed to authenticate user" }, { status: 500 })
  }
}
