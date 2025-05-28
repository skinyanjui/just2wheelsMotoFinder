import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"
import { getAuthUser } from "@/lib/auth"

// GET user's favorites
export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUser(request)

    if (!user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const favorites = await sql`
      SELECT f.id, f.created_at as favorited_at,
        l.id as listing_id, l.title, l.price, l.condition, l.location, l.category,
        (SELECT image_url FROM listing_images WHERE listing_id = l.id AND is_primary = true LIMIT 1) as image_url
      FROM favorites f
      JOIN listings l ON f.listing_id = l.id
      WHERE f.user_id = ${user.id}
      ORDER BY f.created_at DESC
    `

    return NextResponse.json(favorites)
  } catch (error) {
    console.error("Error fetching favorites:", error)
    return NextResponse.json({ error: "Failed to fetch favorites" }, { status: 500 })
  }
}

// POST to add a favorite
export async function POST(request: NextRequest) {
  try {
    const user = await getAuthUser(request)

    if (!user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const { listingId } = await request.json()

    if (!listingId) {
      return NextResponse.json({ error: "Listing ID is required" }, { status: 400 })
    }

    // Check if the listing exists
    const listingCheck = await sql`
      SELECT 1 FROM listings WHERE id = ${listingId}
    `

    if (listingCheck.length === 0) {
      return NextResponse.json({ error: "Listing not found" }, { status: 404 })
    }

    // Check if already favorited
    const existingFavorite = await sql`
      SELECT 1 FROM favorites
      WHERE user_id = ${user.id} AND listing_id = ${listingId}
    `

    if (existingFavorite.length > 0) {
      return NextResponse.json({ error: "Listing is already in favorites" }, { status: 409 })
    }

    // Add to favorites
    const result = await sql`
      INSERT INTO favorites (user_id, listing_id)
      VALUES (${user.id}, ${listingId})
      RETURNING id
    `

    return NextResponse.json({ id: result[0].id }, { status: 201 })
  } catch (error) {
    console.error("Error adding favorite:", error)
    return NextResponse.json({ error: "Failed to add favorite" }, { status: 500 })
  }
}
