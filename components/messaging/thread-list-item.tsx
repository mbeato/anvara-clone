import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import type { getThreads } from "@/lib/data"

type Thread = Awaited<ReturnType<typeof getThreads>>[number]

interface ThreadListItemProps {
  thread: Thread
  isActive: boolean
  isUnread: boolean
  onClick: () => void
}

function formatTimestamp(date: Date): string {
  const now = new Date()
  const d = new Date(date)
  const diffMs = now.getTime() - d.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return "Today"
  if (diffDays === 1) return "Yesterday"
  if (diffDays < 7) {
    return d.toLocaleDateString("en-US", { weekday: "short" })
  }
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" })
}

function getOfferStatusVariant(status: string): "default" | "secondary" | "destructive" | "outline" {
  switch (status.toLowerCase()) {
    case "accepted": return "default"
    case "declined": return "destructive"
    default: return "secondary"
  }
}

export function ThreadListItem({ thread, isActive, isUnread, onClick }: ThreadListItemProps) {
  const lastMessage = thread.messages[thread.messages.length - 1]
  const latestOffer = thread.offers[0]
  const snippet = lastMessage?.content ?? "No messages yet"
  const truncatedSnippet = snippet.length > 60 ? snippet.slice(0, 57) + "..." : snippet
  const timestamp = lastMessage?.createdAt ?? thread.createdAt

  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full flex items-start gap-3 p-3 text-left transition-colors hover:bg-accent/30 ${
        isActive ? "bg-accent/50" : ""
      }`}
    >
      {/* Property thumbnail */}
      <div className="relative shrink-0">
        <div className="h-10 w-10 rounded-full overflow-hidden bg-muted">
          {thread.property.imageUrl ? (
            <Image
              src={thread.property.imageUrl}
              alt={thread.property.name}
              width={40}
              height={40}
              className="h-10 w-10 object-cover"
            />
          ) : (
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-xs font-semibold text-primary">
                {thread.property.name.charAt(0)}
              </span>
            </div>
          )}
        </div>
        {/* Unread dot */}
        {isUnread && (
          <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-primary border border-background" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-1 mb-0.5">
          <span className={`text-sm truncate ${isUnread ? "font-semibold" : "font-medium"}`}>
            {thread.property.name}
          </span>
          <span className="text-xs text-muted-foreground shrink-0">
            {formatTimestamp(timestamp)}
          </span>
        </div>
        <p className="text-xs text-muted-foreground line-clamp-1">{truncatedSnippet}</p>
        {latestOffer && (
          <div className="mt-1">
            <Badge
              variant={getOfferStatusVariant(latestOffer.status)}
              className="text-[10px] px-1.5 py-0 h-4"
            >
              {latestOffer.status.charAt(0).toUpperCase() + latestOffer.status.slice(1)}
            </Badge>
          </div>
        )}
      </div>
    </button>
  )
}
