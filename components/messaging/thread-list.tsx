import { ThreadListItem } from "./thread-list-item"
import type { getThreads } from "@/lib/data"

type Thread = Awaited<ReturnType<typeof getThreads>>[number]

interface ThreadListProps {
  threads: Thread[]
  activeThreadId: string | null
  onSelectThread: (threadId: string) => void
}

export function ThreadList({ threads, activeThreadId, onSelectThread }: ThreadListProps) {
  return (
    <>
      {/* Header */}
      <div className="p-4 border-b shrink-0">
        <div className="flex items-center gap-2">
          <h2 className="font-semibold text-sm">Messages</h2>
          {threads.length > 0 && (
            <span className="inline-flex items-center justify-center h-5 min-w-5 px-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
              {threads.length}
            </span>
          )}
        </div>
      </div>

      {/* Thread list */}
      {threads.length === 0 ? (
        <div className="flex-1 flex items-center justify-center p-4">
          <p className="text-muted-foreground text-sm text-center">
            No conversations yet. Start by making an offer on a property.
          </p>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto">
          {threads.map((thread, index) => (
            <ThreadListItem
              key={thread.id}
              thread={thread}
              isActive={thread.id === activeThreadId}
              isUnread={index < 2}
              onClick={() => onSelectThread(thread.id)}
            />
          ))}
        </div>
      )}
    </>
  )
}
