import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json()

    if (!token) {
      return NextResponse.json({ error: "Token is required" }, { status: 400 })
    }

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

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Session creation failed:", error)
    return NextResponse.json({ error: "Failed to create session" }, { status: 500 })
  }
}

export async function DELETE() {
  try {
    // Clear HTTP-only cookie
    cookies().delete("auth-token")
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Session deletion failed:", error)
    return NextResponse.json({ error: "Failed to delete session" }, { status: 500 })
  }
}
