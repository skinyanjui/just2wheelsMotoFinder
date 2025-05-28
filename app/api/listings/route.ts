import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"
import { getAuthUser } from "@/lib/auth"

// GET all listings with pagination and filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    // Pagination
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "20")
    const offset = (page - 1) * limit

    // Filters
    const category = searchParams.get("category")
    const minPrice = searchParams.get("minPrice")
    const maxPrice = searchParams.get("maxPrice")
    const condition = searchParams.get("condition")
    const search = searchParams.get("q")

    // Build the query
    let query = `
      SELECT l.*, 
        u.name as seller_name, 
        u.image_url as seller_image,
        (SELECT image_url FROM listing_images WHERE listing_id = l.id AND is_primary = true LIMIT 1) as primary_image
      FROM listings l
      JOIN users u ON l.user_id = u.id
      WHERE l.is_active = true
    `

    const queryParams = []

    if (category) {
      queryParams.push(category)
      query += ` AND l.category = $${queryParams.length}`
    }

    if (minPrice) {
      queryParams.push(Number.parseFloat(minPrice))
      query += ` AND l.price >= $${queryParams.length}`
    }

    if (maxPrice) {
      queryParams.push(Number.parseFloat(maxPrice))
      query += ` AND l.price <= $${queryParams.length}`
    }

    if (condition) {
      queryParams.push(condition)
      query += ` AND l.condition = $${queryParams.length}`
    }

    if (search) {
      queryParams.push(`%${search}%`)
      query += ` AND (l.title ILIKE $${queryParams.length} OR l.description ILIKE $${queryParams.length})`
    }

    // Add order by and pagination
    query += ` ORDER BY l.created_at DESC LIMIT ${limit} OFFSET ${offset}`

    // Execute the query
    const listings = await sql.unsafe(query, ...queryParams)

    // Get total count for pagination
    let countQuery = `
      SELECT COUNT(*) FROM listings l
      WHERE l.is_active = true
    `

    if (category) countQuery += ` AND l.category = $1`
    if (minPrice) countQuery += ` AND l.price >= $${queryParams.indexOf(Number.parseFloat(minPrice)) + 1}`
    if (maxPrice) countQuery += ` AND l.price <= $${queryParams.indexOf(Number.parseFloat(maxPrice)) + 1}`
    if (condition) countQuery += ` AND l.condition = $${queryParams.indexOf(condition) + 1}`
    if (search)
      countQuery += ` AND (l.title ILIKE $${queryParams.indexOf(`%${search}%`) + 1} OR l.description ILIKE $${queryParams.indexOf(`%${search}%`) + 1})`

    const countResult = await sql.unsafe(countQuery, ...queryParams)
    const totalCount = Number.parseInt(countResult[0].count)

    return NextResponse.json({
      listings,
      pagination: {
        total: totalCount,
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching listings:", error)
    return NextResponse.json({ error: "Failed to fetch listings" }, { status: 500 })
  }
}

// POST a new listing
export async function POST(request: NextRequest) {
  try {
    const user = await getAuthUser(request)

    if (!user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const { title, description, price, category, condition, location, features, images, motorcycleDetails } =
      await request.json()

    // Validate required fields
    if (!title || !description || !price || !category || !condition || !location) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Start a transaction
    const result = await sql.begin(async (sql) => {
      // Create the listing
      const listingResult = await sql`
        INSERT INTO listings (
          user_id, title, description, price, category, condition, location
        ) VALUES (
          ${user.id}, ${title}, ${description}, ${price}, ${category}, ${condition}, ${location}
        ) RETURNING id
      `

      const listingId = listingResult[0].id

      // Add features if provided
      if (features && features.length > 0) {
        for (const feature of features) {
          await sql`
            INSERT INTO listing_features (listing_id, feature)
            VALUES (${listingId}, ${feature})
          `
        }
      }

      // Add images if provided
      if (images && images.length > 0) {
        for (let i = 0; i < images.length; i++) {
          await sql`
            INSERT INTO listing_images (
              listing_id, image_url, is_primary, display_order
            ) VALUES (
              ${listingId}, ${images[i].url}, ${i === 0}, ${i}
            )
          `
        }
      }

      // Add motorcycle details if applicable
      if (category === "motorcycles" && motorcycleDetails) {
        await sql`
          INSERT INTO motorcycle_details (
            listing_id, year, make, model, mileage, engine_size, engine_type, transmission, color
          ) VALUES (
            ${listingId},
            ${motorcycleDetails.year || null},
            ${motorcycleDetails.make || null},
            ${motorcycleDetails.model || null},
            ${motorcycleDetails.mileage || null},
            ${motorcycleDetails.engineSize || null},
            ${motorcycleDetails.engineType || null},
            ${motorcycleDetails.transmission || null},
            ${motorcycleDetails.color || null}
          )
        `
      }

      return listingId
    })

    return NextResponse.json({ id: result }, { status: 201 })
  } catch (error) {
    console.error("Error creating listing:", error)
    return NextResponse.json({ error: "Failed to create listing" }, { status: 500 })
  }
}
