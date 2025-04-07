import { Suspense } from "react"
import { MessageFeed } from "@/components/message-feed"
import { CreateMessageButton } from "@/components/create-message-button"
import { Sparkles, MessageSquare } from "lucide-react"
import { LoadingFeed } from "@/components/loading-feed"

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[500px] h-[500px] rounded-full bg-accent/10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[500px] h-[500px] rounded-full bg-secondary/10 blur-3xl"></div>
      </div>

      <header className="sticky top-0 z-10 backdrop-blur-md border-b border-border/40 bg-background/70">
        <div className="container max-w-2xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary animate-pulse-slow" />
            <h1 className="text-xl font-bold text-gradient">Whisper Wall</h1>
          </div>
          <CreateMessageButton />
        </div>
      </header>

      <div className="container max-w-2xl mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-8">
          <MessageSquare className="h-5 w-5 text-secondary" />
          <h2 className="text-lg font-medium text-foreground">Recent Whispers</h2>
        </div>

        <Suspense fallback={<LoadingFeed />}>
          <MessageFeed />
        </Suspense>
      </div>
    </main>
  )
}

