import { type NextRequest, NextResponse } from "next/server"
import { likeReply } from "@/lib/actions"

export async function POST(request: NextRequest, { params }: { params: { messageId: string; replyId: string } }) {
  try {
    const { messageId, replyId } = params

    await likeReply(messageId, replyId)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error liking reply:", error)
    return NextResponse.json({ error: "Failed to like reply" }, { status: 500 })
  }
}

