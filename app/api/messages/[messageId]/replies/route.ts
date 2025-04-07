import { type NextRequest, NextResponse } from "next/server"
import { postReply } from "@/lib/actions"

export async function POST(request: NextRequest, { params }: { params: { messageId: string } }) {
  try {
    const messageId = params.messageId
    const formData = await request.formData()
    const content = formData.get("content") as string

    if (!content || typeof content !== "string") {
      return NextResponse.json({ error: "Content is required" }, { status: 400 })
    }

    await postReply(messageId, content)

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (error) {
    console.error("Error posting reply:", error)
    return NextResponse.json({ error: "Failed to post reply" }, { status: 500 })
  }
}

