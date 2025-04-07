import { type NextRequest, NextResponse } from "next/server"
import { likeMessage } from "@/lib/actions"

export async function POST(request: NextRequest, { params }: { params: { messageId: string } }) {
  try {
    const messageId = params.messageId

    await likeMessage(messageId)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error liking message:", error)
    return NextResponse.json({ error: "Failed to like message" }, { status: 500 })
  }
}

