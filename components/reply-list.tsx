"use client"

import type { Reply } from "@/lib/types"
import { formatDistanceToNow } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ThumbsUp, ThumbsDown } from "lucide-react"
import { useState } from "react"
import { likeReply, dislikeReply } from "@/lib/actions"

interface ReplyListProps {
  messageId: string
  replies: Reply[]
}

export function ReplyList({ messageId, replies }: ReplyListProps) {
  if (replies.length === 0) {
    return null
  }

  return (
    <div className="space-y-3">
      {replies.map((reply) => (
        <ReplyItem key={reply.id} messageId={messageId} reply={reply} />
      ))}
    </div>
  )
}

interface ReplyItemProps {
  messageId: string
  reply: Reply
}

function ReplyItem({ messageId, reply }: ReplyItemProps) {
  const [likes, setLikes] = useState(reply.likeCount)
  const [dislikes, setDislikes] = useState(reply.dislikeCount)

  return (
    <div className="bg-gradient-reply backdrop-blur-sm rounded-xl shadow-sm border border-secondary/10 p-3 transition-all duration-300 hover:shadow-secondary/5 hover:border-secondary/20">
      <p className="text-sm text-foreground mb-2">{reply.content}</p>

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1">
          <form
            action={async () => {
              setLikes((prev) => prev + 1)
              await likeReply(messageId, reply.id)
            }}
          >
            <Button
              type="submit"
              variant="ghost"
              size="sm"
              className="h-6 px-1 text-muted-foreground hover:text-secondary hover:bg-secondary/10"
            >
              <ThumbsUp className="h-3 w-3 mr-1" />
              <span className="text-xs">{likes}</span>
            </Button>
          </form>

          <form
            action={async () => {
              setDislikes((prev) => prev + 1)
              await dislikeReply(messageId, reply.id)
            }}
          >
            <Button
              type="submit"
              variant="ghost"
              size="sm"
              className="h-6 px-1 text-muted-foreground hover:text-secondary hover:bg-secondary/10"
            >
              <ThumbsDown className="h-3 w-3 mr-1" />
              <span className="text-xs">{dislikes}</span>
            </Button>
          </form>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center text-secondary text-xs">
            {reply.content.charAt(0).toUpperCase()}
          </div>
          <span className="text-xs text-muted-foreground">{formatDistanceToNow(new Date(reply.createdAt))}</span>
        </div>
      </div>
    </div>
  )
}

