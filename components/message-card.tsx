"use client"

import { useState } from "react"
import { formatDistanceToNow } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ThumbsUp, ThumbsDown, MessageSquare, ChevronDown, ChevronUp } from "lucide-react"
import { ReplyDialog } from "@/components/reply-dialog"
import { ReplyList } from "@/components/reply-list"
import { likeMessage, dislikeMessage } from "@/lib/actions"
import type { Reply } from "@/lib/types"

interface MessageCardProps {
  id: string
  content: string
  createdAt: string
  likeCount: number
  dislikeCount: number
  replies: Reply[]
}

export function MessageCard({
  id,
  content,
  createdAt,
  likeCount: initialLikeCount,
  dislikeCount: initialDislikeCount,
  replies,
}: MessageCardProps) {
  const [isReplyDialogOpen, setIsReplyDialogOpen] = useState(false)
  const [showReplies, setShowReplies] = useState(false)
  const [likes, setLikes] = useState(initialLikeCount)
  const [dislikes, setDislikes] = useState(initialDislikeCount)

  const hasReplies = replies.length > 0

  return (
    <div className="bg-gradient-message backdrop-blur-sm rounded-2xl shadow-lg border border-primary/10 overflow-hidden transition-all duration-300 hover:shadow-primary/5 hover:border-primary/20 group">
      <div className="p-5">
        <p className="text-foreground mb-3 leading-relaxed">{content}</p>

        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
              {content.charAt(0).toUpperCase()}
            </div>
            <span className="text-xs text-muted-foreground font-medium">Anonymous</span>
          </div>
          <span className="text-xs text-muted-foreground">{formatDistanceToNow(new Date(createdAt))}</span>
        </div>

        <div className="flex items-center gap-1 pt-2 border-t border-primary/10">
          <form
            action={async () => {
              setLikes((prev) => prev + 1)
              await likeMessage(id)
            }}
          >
            <Button
              type="submit"
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-muted-foreground hover:text-primary hover:bg-primary/10"
            >
              <ThumbsUp className="h-4 w-4 mr-1" />
              <span className="text-xs">{likes}</span>
            </Button>
          </form>

          <form
            action={async () => {
              setDislikes((prev) => prev + 1)
              await dislikeMessage(id)
            }}
          >
            <Button
              type="submit"
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-muted-foreground hover:text-primary hover:bg-primary/10"
            >
              <ThumbsDown className="h-4 w-4 mr-1" />
              <span className="text-xs">{dislikes}</span>
            </Button>
          </form>

          <div className="flex-1"></div>

          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-3 text-muted-foreground hover:text-primary hover:bg-primary/10"
            onClick={() => setIsReplyDialogOpen(true)}
          >
            <MessageSquare className="h-4 w-4 mr-1" />
            <span className="text-xs">Reply</span>
          </Button>

          {hasReplies && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-3 text-muted-foreground hover:text-primary hover:bg-primary/10"
              onClick={() => setShowReplies(!showReplies)}
            >
              {showReplies ? (
                <>
                  <ChevronUp className="h-4 w-4 mr-1" />
                  <span className="text-xs">Hide Replies</span>
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4 mr-1" />
                  <span className="text-xs">Show Replies ({replies.length})</span>
                </>
              )}
            </Button>
          )}
        </div>
      </div>

      {showReplies && hasReplies && (
        <div className="bg-muted/50 border-t border-primary/10 p-4">
          <ReplyList messageId={id} replies={replies} />
        </div>
      )}

      <ReplyDialog messageId={id} open={isReplyDialogOpen} onOpenChange={setIsReplyDialogOpen} />
    </div>
  )
}

