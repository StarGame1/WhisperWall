"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { Sparkles } from "lucide-react"
import { postMessage } from "@/lib/actions"
import { useRouter } from "next/navigation"

interface MessageDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function MessageDialog({ open, onOpenChange }: MessageDialogProps) {
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = () => {
    if (!message.trim()) {
      toast({
        title: "Error",
        description: "Please enter a message",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Use the server action directly
    postMessage(message)
      .then(() => {
        setMessage("")
        toast({
          title: "Success",
          description: "Your whisper has been posted",
        })
        onOpenChange(false)
        router.refresh() // Refresh the page to show the new message
      })
      .catch(() => {
        toast({
          title: "Error",
          description: "Failed to post whisper",
          variant: "destructive",
        })
      })
      .finally(() => {
        setIsSubmitting(false)
      })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md border border-primary/20 bg-gradient-card">
        <DialogHeader className="space-y-3">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <DialogTitle className="text-gradient">Share Your Whisper</DialogTitle>
          </div>
          <p className="text-sm text-muted-foreground">
            Express yourself anonymously. Your whisper will be shared with everyone.
          </p>
        </DialogHeader>

        <div className="py-4">
          <Textarea
            placeholder="What's on your mind?"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-[120px] resize-none focus-visible:ring-primary/50 bg-background/50 border-primary/20"
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
            className="border-primary/20 text-foreground hover:bg-primary/10"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-primary hover:bg-primary/90 shadow-md shadow-primary/20"
          >
            {isSubmitting ? "Posting..." : "Share Anonymously"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

