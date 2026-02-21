"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { ThreadList } from "./thread-list"
import type { getThreads } from "@/lib/data"

type Thread = Awaited<ReturnType<typeof getThreads>>[number]

interface MessagingClientProps {
  threads: Thread[]
  initialThreadId?: string
}

export function MessagingClient({ threads, initialThreadId }: MessagingClientProps) {
  const searchParams = useSearchParams()
  const router = useRouter()

  const activeThreadId =
    searchParams.get("thread") ?? initialThreadId ?? threads[0]?.id ?? null

  function selectThread(threadId: string) {
    router.push(`/messages?thread=${threadId}`)
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

      {/* Right panel — conversation view (added in 05-02) */}
      <div className="flex-1 flex items-center justify-center overflow-hidden">
        {activeThreadId ? (
          <p className="text-muted-foreground text-sm">
            Loading conversation...
          </p>
        ) : (
          <div className="text-center space-y-2">
            <p className="text-muted-foreground text-sm font-medium">
              Select a conversation
            </p>
            <p className="text-muted-foreground text-xs">
              Choose a thread from the left to start messaging
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
