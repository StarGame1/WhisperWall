import { type NextRequest, NextResponse } from "next/server"
import { dislikeMessage } from "@/lib/actions"

export async function POST(request: NextRequest, { params }: { params: { messageId: string } }) {
  try {
    const messageId = params.messageId

    await dislikeMessage(messageId)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error disliking message:", error)
    return NextResponse.json({ error: "Failed to dislike message" }, { status: 500 })
  }
}

