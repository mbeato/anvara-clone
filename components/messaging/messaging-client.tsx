"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ThreadList } from "./thread-list"
import { ConversationView } from "./conversation-view"
import type { getThreads } from "@/lib/data"

type Thread = Awaited<ReturnType<typeof getThreads>>[number]
type Message = Thread["messages"][number]

interface MessagingClientProps {
  threads: Thread[]
  initialThreadId?: string
}

export function MessagingClient({ threads: initialThreads, initialThreadId }: MessagingClientProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [threads, setThreads] = useState<Thread[]>(initialThreads)

  const activeThreadId =
    searchParams.get("thread") ?? initialThreadId ?? threads[0]?.id ?? null

  const activeThread = threads.find((t) => t.id === activeThreadId) ?? null

  function selectThread(threadId: string) {
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

  return (
    <div className="-m-4 flex h-[calc(100vh-3.5rem)] overflow-hidden border-t">
      {/* Left panel — thread list */}
      <div className="w-80 border-r flex flex-col overflow-hidden shrink-0">
        <ThreadList
          threads={threads}
          activeThreadId={activeThreadId}
          onSelectThread={selectThread}
        />
      </div>

      {/* Right panel — conversation view */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {activeThread ? (
          <ConversationView
            key={activeThread.id}
            thread={activeThread}
            onThreadUpdate={handleThreadUpdate}
          />
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
