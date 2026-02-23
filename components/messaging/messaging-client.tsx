"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Send, MessageSquare, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThreadList } from "./thread-list"
import { ConversationView } from "./conversation-view"
import { startThread } from "@/app/actions/message"
import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"
import type { getThreads } from "@/lib/data"

type Thread = Awaited<ReturnType<typeof getThreads>>[number]
type Message = Thread["messages"][number]

interface MessagingClientProps {
  threads: Thread[]
  initialThreadId?: string
  newConversation?: { propertyId: string; propertyName: string }
}

export function MessagingClient({ threads: initialThreads, initialThreadId, newConversation }: MessagingClientProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const isMobile = useIsMobile()
  const [threads, setThreads] = useState<Thread[]>(initialThreads)
  const [composing, setComposing] = useState(!!newConversation)
  const [composeValue, setComposeValue] = useState("")
  const [sending, setSending] = useState(false)
  const [mobileView, setMobileView] = useState<"threads" | "conversation">("threads")

  const activeThreadId =
    searchParams.get("thread") ?? initialThreadId ?? threads[0]?.id ?? null

  const activeThread = threads.find((t) => t.id === activeThreadId) ?? null

  function selectThread(threadId: string) {
    setComposing(false)
    if (isMobile) setMobileView("conversation")
    router.push(`/messages?thread=${threadId}`)
  }

  function handleThreadUpdate(threadId: string, lastMessage: Message) {
    setThreads((prev) =>
      prev.map((t) => {
        if (t.id !== threadId) return t
        return {
          ...t,
          messages: [...t.messages, lastMessage],
        }
      })
    )
  }

  async function handleStartThread() {
    if (!newConversation || !composeValue.trim() || sending) return
    setSending(true)

    const result = await startThread(newConversation.propertyId, composeValue.trim())

    if (result.success) {
      if (isMobile) setMobileView("conversation")
      router.push(`/messages?thread=${result.threadId}`)
      router.refresh()
    }

    setSending(false)
  }

  function handleComposeKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleStartThread()
    }
  }

  // On mobile: thread list is visible when mobileView === "threads" (or composing shows compose full-width)
  const showThreadList = !isMobile || (mobileView === "threads" && !composing)
  const showConversation = !isMobile || mobileView === "conversation" || composing

  return (
    <div className="-m-4 flex h-[calc(100vh-3.5rem)] overflow-hidden border-t">
      {/* Left panel — thread list */}
      <div
        className={cn(
          "border-r flex flex-col overflow-hidden shrink-0",
          isMobile ? "w-full" : "w-80",
          !showThreadList && "hidden"
        )}
      >
        <ThreadList
          threads={threads}
          activeThreadId={composing ? null : activeThreadId}
          onSelectThread={selectThread}
        />
      </div>

      {/* Right panel — conversation or compose view */}
      <div className={cn("flex-1 flex flex-col overflow-hidden", !showConversation && "hidden")}>
        {composing && newConversation ? (
          <div className="flex flex-col h-full">
            {/* Back button on mobile */}
            {isMobile && (
              <button
                onClick={() => { setComposing(false); setMobileView("threads") }}
                className="flex items-center gap-1 px-4 py-2 text-sm text-muted-foreground hover:text-foreground border-b"
              >
                <ChevronLeft className="h-4 w-4" /> Back to threads
              </button>
            )}

            {/* Header */}
            <div className="border-b px-4 py-3 shrink-0">
              <p className="font-semibold text-sm">New message</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                To: {newConversation.propertyName}
              </p>
            </div>

            {/* Empty conversation area */}
            <div className="flex-1 flex items-center justify-center p-4">
              <div className="text-center space-y-3">
                <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-muted">
                  <MessageSquare className="size-6 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium">Start a conversation</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Send a message to {newConversation.propertyName}
                  </p>
                </div>
              </div>
            </div>

            {/* Compose input */}
            <div className="border-t shrink-0 p-4">
              <div className="flex items-center gap-2">
                <Input
                  value={composeValue}
                  onChange={(e) => setComposeValue(e.target.value)}
                  onKeyDown={handleComposeKeyDown}
                  placeholder="Type a message..."
                  disabled={sending}
                  className="flex-1"
                  autoFocus
                />
                <Button
                  type="button"
                  size="icon"
                  onClick={handleStartThread}
                  disabled={!composeValue.trim() || sending}
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ) : activeThread ? (
          <div className="flex flex-col h-full overflow-hidden">
            {/* Back button on mobile */}
            {isMobile && mobileView === "conversation" && (
              <button
                onClick={() => setMobileView("threads")}
                className="flex items-center gap-1 px-4 py-2 text-sm text-muted-foreground hover:text-foreground border-b shrink-0"
              >
                <ChevronLeft className="h-4 w-4" /> Back to threads
              </button>
            )}
            <ConversationView
              key={activeThread.id}
              thread={activeThread}
              onThreadUpdate={handleThreadUpdate}
            />
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center space-y-2">
              <p className="text-muted-foreground text-sm font-medium">
                Select a conversation
              </p>
              <p className="text-muted-foreground text-xs">
                Choose a thread from the left to start messaging
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
