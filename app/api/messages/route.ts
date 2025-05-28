import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"
import { getAuthUser } from "@/lib/auth"

// GET user's conversations
export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUser(request)

    if (!user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const conversations = await sql`
      SELECT c.id, c.listing_id, c.created_at,
        l.title as listing_title,
        (SELECT image_url FROM listing_images WHERE listing_id = l.id AND is_primary = true LIMIT 1) as listing_image,
        CASE
          WHEN c.buyer_id = ${user.id} THEN c.seller_id
          ELSE c.buyer_id
        END as other_user_id,
        CASE
          WHEN c.buyer_id = ${user.id} THEN seller.name
          ELSE buyer.name
        END as other_user_name,
        CASE
          WHEN c.buyer_id = ${user.id} THEN seller.image_url
          ELSE buyer.image_url
        END as other_user_image,
        (
          SELECT content
          FROM messages
          WHERE conversation_id = c.id
          ORDER BY created_at DESC
          LIMIT 1
        ) as last_message,
        (
          SELECT created_at
          FROM messages
          WHERE conversation_id = c.id
          ORDER BY created_at DESC
          LIMIT 1
        ) as last_message_time,
        (
          SELECT COUNT(*)
          FROM messages
          WHERE conversation_id = c.id
          AND sender_id != ${user.id}
          AND is_read = false
        ) as unread_count
      FROM conversations c
      JOIN listings l ON c.listing_id = l.id
      JOIN users buyer ON c.buyer_id = buyer.id
      JOIN users seller ON c.seller_id = seller.id
      WHERE c.buyer_id = ${user.id} OR c.seller_id = ${user.id}
      ORDER BY last_message_time DESC
    `

    return NextResponse.json(conversations)
  } catch (error) {
    console.error("Error fetching conversations:", error)
    return NextResponse.json({ error: "Failed to fetch conversations" }, { status: 500 })
  }
}

// POST to create a new conversation or send a message
export async function POST(request: NextRequest) {
  try {
    const user = await getAuthUser(request)

    if (!user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const { listingId, sellerId, message } = await request.json()

    if (!listingId || !message) {
      return NextResponse.json({ error: "Listing ID and message are required" }, { status: 400 })
    }

    // Start a transaction
    const result = await sql.begin(async (sql) => {
      let conversationId

      // Check if conversation already exists
      const existingConversation = await sql`
        SELECT id FROM conversations
        WHERE listing_id = ${listingId}
        AND (
          (buyer_id = ${user.id} AND seller_id = ${sellerId})
          OR
          (buyer_id = ${sellerId} AND seller_id = ${user.id})
        )
      `

      if (existingConversation.length > 0) {
        conversationId = existingConversation[0].id
      } else {
        // Create a new conversation
        const newConversation = await sql`
          INSERT INTO conversations (listing_id, buyer_id, seller_id)
          VALUES (
            ${listingId},
            ${user.id === sellerId ? sellerId : user.id},
            ${sellerId}
          )
          RETURNING id
        `

        conversationId = newConversation[0].id
      }

      // Add the message
      const newMessage = await sql`
        INSERT INTO messages (conversation_id, sender_id, content)
        VALUES (${conversationId}, ${user.id}, ${message})
        RETURNING id, created_at
      `

      return {
        conversationId,
        messageId: newMessage[0].id,
        timestamp: newMessage[0].created_at,
      }
    })

    return NextResponse.json(result, { status: 201 })
  } catch (error) {
    console.error("Error sending message:", error)
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }
}
