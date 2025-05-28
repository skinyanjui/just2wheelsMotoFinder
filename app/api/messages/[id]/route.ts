import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"
import { getAuthUser } from "@/lib/auth"

// GET messages for a conversation
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getAuthUser(request)

    if (!user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const conversationId = params.id

    // Check if the user is part of this conversation
    const conversationCheck = await sql`
      SELECT 1 FROM conversations
      WHERE id = ${conversationId}
      AND (buyer_id = ${user.id} OR seller_id = ${user.id})
    `

    if (conversationCheck.length === 0) {
      return NextResponse.json({ error: "Conversation not found or access denied" }, { status: 404 })
    }

    // Get the messages
    const messages = await sql`
      SELECT m.id, m.content, m.sender_id, m.is_read, m.created_at,
        u.name as sender_name, u.image_url as sender_image
      FROM messages m
      JOIN users u ON m.sender_id = u.id
      WHERE m.conversation_id = ${conversationId}
      ORDER BY m.created_at ASC
    `

    // Mark unread messages as read if they were sent to the current user
    await sql`
      UPDATE messages
      SET is_read = true
      WHERE conversation_id = ${conversationId}
      AND sender_id != ${user.id}
      AND is_read = false
    `

    // Get conversation details
    const conversationDetails = await sql`
      SELECT c.id, c.listing_id, l.title as listing_title,
        (SELECT image_url FROM listing_images WHERE listing_id = l.id AND is_primary = true LIMIT 1) as listing_image,
        buyer.id as buyer_id, buyer.name as buyer_name, buyer.image_url as buyer_image,
        seller.id as seller_id, seller.name as seller_name, seller.image_url as seller_image
      FROM conversations c
      JOIN listings l ON c.listing_id = l.id
      JOIN users buyer ON c.buyer_id = buyer.id
      JOIN users seller ON c.seller_id = seller.id
      WHERE c.id = ${conversationId}
    `

    return NextResponse.json({
      conversation: conversationDetails[0],
      messages,
    })
  } catch (error) {
    console.error("Error fetching messages:", error)
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 })
  }
}

// POST to send a message in a conversation
export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getAuthUser(request)

    if (!user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const conversationId = params.id
    const { message } = await request.json()

    if (!message) {
      return NextResponse.json({ error: "Message content is required" }, { status: 400 })
    }

    // Check if the user is part of this conversation
    const conversationCheck = await sql`
      SELECT 1 FROM conversations
      WHERE id = ${conversationId}
      AND (buyer_id = ${user.id} OR seller_id = ${user.id})
    `

    if (conversationCheck.length === 0) {
      return NextResponse.json({ error: "Conversation not found or access denied" }, { status: 404 })
    }

    // Add the message
    const result = await sql`
      INSERT INTO messages (conversation_id, sender_id, content)
      VALUES (${conversationId}, ${user.id}, ${message})
      RETURNING id, created_at
    `

    // Update conversation timestamp
    await sql`
      UPDATE conversations
      SET updated_at = CURRENT_TIMESTAMP
      WHERE id = ${conversationId}
    `

    return NextResponse.json(
      {
        id: result[0].id,
        timestamp: result[0].created_at,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error sending message:", error)
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }
}
