"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { MessageSquare } from "lucide-react"
import { postReply } from "@/lib/actions"
import { useRouter } from "next/navigation"

interface ReplyDialogProps {
  messageId: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ReplyDialog({ messageId, open, onOpenChange }: ReplyDialogProps) {
  const [reply, setReply] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = () => {
    if (!reply.trim()) {
      toast({
        title: "Error",
        description: "Please enter a reply",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Use the server action directly
    postReply(messageId, reply)
      .then(() => {
        setReply("")
        toast({
          title: "Success",
          description: "Your reply has been posted",
        })
        onOpenChange(false)
        router.refresh() // Refresh the page to show the new reply
      })
      .catch(() => {
        toast({
          title: "Error",
          description: "Failed to post reply",
          variant: "destructive",
        })
      })
      .finally(() => {
        setIsSubmitting(false)
      })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md border border-secondary/20 bg-gradient-card">
        <DialogHeader className="space-y-3">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-secondary" />
            <DialogTitle>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-secondary to-primary">
                Reply to Whisper
              </span>
            </DialogTitle>
          </div>
          <p className="text-sm text-muted-foreground">
            Share your thoughts on this whisper. Your reply will be anonymous.
          </p>
        </DialogHeader>

        <div className="py-4">
          <Textarea
            placeholder="Write your reply..."
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            className="min-h-[100px] resize-none focus-visible:ring-secondary/50 bg-background/50 border-secondary/20"
            disabled={isSubmitting}
            autoFocus
          />
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
            className="border-secondary/20 text-foreground hover:bg-secondary/10"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-secondary hover:bg-secondary/90 shadow-md shadow-secondary/20"
          >
            {isSubmitting ? "Posting..." : "Reply Anonymously"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

