import { type NextRequest, NextResponse } from "next/server"
import { postMessage } from "@/lib/actions"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const content = formData.get("content") as string

    if (!content || typeof content !== "string") {
      return NextResponse.json({ error: "Content is required" }, { status: 400 })
    }

    await postMessage(content)

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (error) {
    console.error("Error posting message:", error)
    return NextResponse.json({ error: "Failed to post message" }, { status: 500 })
  }
}

