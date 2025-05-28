import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"
import { getAuthUser } from "@/lib/auth"

// GET a specific listing by ID
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    // Get the listing with seller info
    const listingResult = await sql`
      SELECT l.*, u.name as seller_name, u.image_url as seller_image, u.id as seller_id,
        (SELECT COUNT(*) FROM listings WHERE user_id = u.id AND is_active = true) as seller_listings_count,
        (SELECT MIN(created_at) FROM users WHERE id = u.id) as seller_joined_date
      FROM listings l
      JOIN users u ON l.user_id = u.id
      WHERE l.id = ${id}
    `

    if (listingResult.length === 0) {
      return NextResponse.json({ error: "Listing not found" }, { status: 404 })
    }

    const listing = listingResult[0]

    // Get images
    const images = await sql`
      SELECT id, image_url, is_primary, display_order
      FROM listing_images
      WHERE listing_id = ${id}
      ORDER BY display_order
    `

    // Get features
    const features = await sql`
      SELECT feature
      FROM listing_features
      WHERE listing_id = ${id}
    `

    // Get motorcycle details if applicable
    let motorcycleDetails = null
    if (listing.category === "motorcycles") {
      const detailsResult = await sql`
        SELECT *
        FROM motorcycle_details
        WHERE listing_id = ${id}
      `

      if (detailsResult.length > 0) {
        motorcycleDetails = detailsResult[0]
      }
    }

    // Format the response
    const response = {
      id: listing.id,
      title: listing.title,
      description: listing.description,
      price: Number.parseFloat(listing.price),
      category: listing.category,
      condition: listing.condition,
      location: listing.location,
      isFeatured: listing.is_featured,
      isActive: listing.is_active,
      createdAt: listing.created_at,
      updatedAt: listing.updated_at,
      images: images.map((img) => ({
        id: img.id,
        url: img.image_url,
        isPrimary: img.is_primary,
        displayOrder: img.display_order,
      })),
      features: features.map((f) => f.feature),
      seller: {
        id: listing.seller_id,
        name: listing.seller_name,
        image: listing.seller_image,
        listingsCount: Number.parseInt(listing.seller_listings_count),
        joinedDate: listing.seller_joined_date,
      },
    }

    // Add motorcycle details if available
    if (motorcycleDetails) {
      response.motorcycleDetails = {
        year: motorcycleDetails.year,
        make: motorcycleDetails.make,
        model: motorcycleDetails.model,
        mileage: motorcycleDetails.mileage,
        engineSize: motorcycleDetails.engine_size,
        engineType: motorcycleDetails.engine_type,
        transmission: motorcycleDetails.transmission,
        color: motorcycleDetails.color,
      }
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Error fetching listing:", error)
    return NextResponse.json({ error: "Failed to fetch listing" }, { status: 500 })
  }
}

// PUT to update a listing
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getAuthUser(request)

    if (!user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const id = params.id

    // Check if the listing exists and belongs to the user
    const listingCheck = await sql`
      SELECT user_id FROM listings WHERE id = ${id}
    `

    if (listingCheck.length === 0) {
      return NextResponse.json({ error: "Listing not found" }, { status: 404 })
    }

    if (listingCheck[0].user_id !== user.id) {
      return NextResponse.json({ error: "You do not have permission to update this listing" }, { status: 403 })
    }

    const { title, description, price, category, condition, location, isActive, features, images, motorcycleDetails } =
      await request.json()

    // Start a transaction
    await sql.begin(async (sql) => {
      // Update the listing
      await sql`
        UPDATE listings
        SET
          title = COALESCE(${title}, title),
          description = COALESCE(${description}, description),
          price = COALESCE(${price}, price),
          category = COALESCE(${category}, category),
          condition = COALESCE(${condition}, condition),
          location = COALESCE(${location}, location),
          is_active = COALESCE(${isActive}, is_active),
          updated_at = CURRENT_TIMESTAMP
        WHERE id = ${id}
      `

      // Update features if provided
      if (features) {
        // Delete existing features
        await sql`DELETE FROM listing_features WHERE listing_id = ${id}`

        // Add new features
        for (const feature of features) {
          await sql`
            INSERT INTO listing_features (listing_id, feature)
            VALUES (${id}, ${feature})
          `
        }
      }

      // Update images if provided
      if (images) {
        // Delete existing images
        await sql`DELETE FROM listing_images WHERE listing_id = ${id}`

        // Add new images
        for (let i = 0; i < images.length; i++) {
          await sql`
            INSERT INTO listing_images (
              listing_id, image_url, is_primary, display_order
            ) VALUES (
              ${id}, ${images[i].url}, ${i === 0}, ${i}
            )
          `
        }
      }

      // Update motorcycle details if applicable
      if (category === "motorcycles" && motorcycleDetails) {
        // Check if details already exist
        const detailsCheck = await sql`
          SELECT 1 FROM motorcycle_details WHERE listing_id = ${id}
        `

        if (detailsCheck.length > 0) {
          // Update existing details
          await sql`
            UPDATE motorcycle_details
            SET
              year = COALESCE(${motorcycleDetails.year}, year),
              make = COALESCE(${motorcycleDetails.make}, make),
              model = COALESCE(${motorcycleDetails.model}, model),
              mileage = COALESCE(${motorcycleDetails.mileage}, mileage),
              engine_size = COALESCE(${motorcycleDetails.engineSize}, engine_size),
              engine_type = COALESCE(${motorcycleDetails.engineType}, engine_type),
              transmission = COALESCE(${motorcycleDetails.transmission}, transmission),
              color = COALESCE(${motorcycleDetails.color}, color)
            WHERE listing_id = ${id}
          `
        } else {
          // Insert new details
          await sql`
            INSERT INTO motorcycle_details (
              listing_id, year, make, model, mileage, engine_size, engine_type, transmission, color
            ) VALUES (
              ${id},
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
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating listing:", error)
    return NextResponse.json({ error: "Failed to update listing" }, { status: 500 })
  }
}

// DELETE a listing
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getAuthUser(request)

    if (!user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const id = params.id

    // Check if the listing exists and belongs to the user
    const listingCheck = await sql`
      SELECT user_id FROM listings WHERE id = ${id}
    `

    if (listingCheck.length === 0) {
      return NextResponse.json({ error: "Listing not found" }, { status: 404 })
    }

    if (listingCheck[0].user_id !== user.id) {
      return NextResponse.json({ error: "You do not have permission to delete this listing" }, { status: 403 })
    }

    // Delete the listing (this will cascade to related tables)
    await sql`DELETE FROM listings WHERE id = ${id}`

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting listing:", error)
    return NextResponse.json({ error: "Failed to delete listing" }, { status: 500 })
  }
}
