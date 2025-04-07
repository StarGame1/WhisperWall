import { type NextRequest, NextResponse } from "next/server"
import { dislikeReply } from "@/lib/actions"

export async function POST(request: NextRequest, { params }: { params: { messageId: string; replyId: string } }) {
  try {
    const { messageId, replyId } = params

    await dislikeReply(messageId, replyId)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error disliking reply:", error)
    return NextResponse.json({ error: "Failed to dislike reply" }, { status: 500 })
  }
}

