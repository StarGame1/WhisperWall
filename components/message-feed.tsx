import { getMessages } from "@/lib/actions"
import { MessageCard } from "@/components/message-card"
import { MessageSquare } from "lucide-react"

export async function MessageFeed() {
  const messages = await getMessages()

  if (messages.length === 0) {
    return (
      <div className="text-center py-16 px-4 bg-gradient-message rounded-2xl border border-dashed border-primary/30">
        <div className="flex flex-col items-center gap-3">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
            <MessageSquare className="h-8 w-8 text-primary" />
          </div>
          <p className="text-muted-foreground">No whispers yet. Be the first to share your thoughts!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {messages.map((message) => (
        <MessageCard
          key={message.id}
          id={message.id}
          content={message.content}
          createdAt={message.createdAt}
          likeCount={message.likeCount}
          dislikeCount={message.dislikeCount}
          replies={message.replies}
        />
      ))}
    </div>
  )
}

