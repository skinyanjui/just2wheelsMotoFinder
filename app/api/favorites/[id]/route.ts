import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"
import { getAuthUser } from "@/lib/auth"

// DELETE a favorite
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getAuthUser(request)

    if (!user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const listingId = params.id

    // Delete the favorite
    const result = await sql`
      DELETE FROM favorites
      WHERE user_id = ${user.id} AND listing_id = ${listingId}
      RETURNING id
    `

    if (result.length === 0) {
      return NextResponse.json({ error: "Favorite not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error removing favorite:", error)
    return NextResponse.json({ error: "Failed to remove favorite" }, { status: 500 })
  }
}
