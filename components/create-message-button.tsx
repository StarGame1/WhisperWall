"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { PenSquare } from "lucide-react"
import { MessageDialog } from "@/components/message-dialog"

export function CreateMessageButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        size="sm"
        className="rounded-full px-4 py-2 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all hover:scale-105"
      >
        <PenSquare className="h-4 w-4 mr-2" />
        <span>New Whisper</span>
      </Button>

      <MessageDialog open={isOpen} onOpenChange={setIsOpen} />
    </>
  )
}

