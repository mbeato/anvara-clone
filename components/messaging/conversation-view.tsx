"use client"

import { useOptimistic, useRef, useEffect, useState, useTransition } from "react"
import Link from "next/link"
import { Send, X, Info, RefreshCw } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { sendMessage } from "@/app/actions/message"
import { MessageBubble } from "./message-bubble"
import { TypingIndicator } from "./typing-indicator"
import type { getThread } from "@/lib/data"

type Thread = NonNullable<Awaited<ReturnType<typeof getThread>>>
type Message = Thread["messages"][number]

interface ConversationViewProps {
  thread: Thread
  onThreadUpdate?: (threadId: string, lastMessage: Message) => void
}

export function ConversationView({ thread, onThreadUpdate }: ConversationViewProps) {
  const [messages, setMessages] = useState<Message[]>(thread.messages)
  const [isTyping, setIsTyping] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showBanner, setShowBanner] = useState(true)
  const [inputValue, setInputValue] = useState("")
  const [isPending, startTransition] = useTransition()
  const scrollRef = useRef<HTMLDivElement>(null)

  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (current: Message[], newMsg: Message) => [...current, newMsg]
  )

  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [optimisticMessages, isTyping])

  // Reset state when thread changes
  useEffect(() => {
    setMessages(thread.messages)
    setIsTyping(false)
    setError(null)
    setInputValue("")
  }, [thread.id, thread.messages])

  async function handleSend(content: string) {
    if (!content.trim() || isTyping) return

    const tempMsg: Message = {
      id: `temp-${Date.now()}`,
      threadId: thread.id,
      content: content.trim(),
      sender: "advertiser",
      isAI: false,
      createdAt: new Date(),
    }

    setInputValue("")
    setError(null)

    startTransition(() => {
      addOptimisticMessage(tempMsg)
    })

    // Save advertiser message
    const result = await sendMessage(thread.id, content.trim())

    if (!result.success) {
      setError("Failed to send message. Try again.")
      return
    }

    setIsTyping(true)

    // Trigger AI response
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ threadId: thread.id }),
      })

      const data = await response.json()

      if (response.ok && data.message) {
        const aiMsg: Message = data.message
        setMessages((prev) => {
          // Replace any temp messages with actual and add AI response
          const withoutTemp = prev.filter((m) => !m.id.startsWith("temp-"))
          const advertiserMsg: Message = {
            ...tempMsg,
            id: result.messageId,
          }
          const updated = [...withoutTemp, advertiserMsg, aiMsg]
          onThreadUpdate?.(thread.id, aiMsg)
          return updated
        })
      } else {
        // Add advertiser message but show error for AI response
        setMessages((prev) => {
          const withoutTemp = prev.filter((m) => !m.id.startsWith("temp-"))
          const advertiserMsg: Message = {
            ...tempMsg,
            id: result.messageId,
          }
          return [...withoutTemp, advertiserMsg]
        })
        setError("Couldn't generate response. Try again.")
      }
    } catch {
      setMessages((prev) => {
        const withoutTemp = prev.filter((m) => !m.id.startsWith("temp-"))
        const advertiserMsg: Message = {
          ...tempMsg,
          id: result.messageId,
        }
        return [...withoutTemp, advertiserMsg]
      })
      setError("Couldn't generate response. Try again.")
    } finally {
      setIsTyping(false)
    }
  }

  function handleRetry() {
    setError(null)
    setIsTyping(true)
    fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ threadId: thread.id }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          const aiMsg: Message = data.message
          setMessages((prev) => [...prev, aiMsg])
          onThreadUpdate?.(thread.id, aiMsg)
        } else {
          setError("Couldn't generate response. Try again.")
        }
      })
      .catch(() => {
        setError("Couldn't generate response. Try again.")
      })
      .finally(() => {
        setIsTyping(false)
      })
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend(inputValue)
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b px-4 py-3 shrink-0">
        <div className="flex items-center gap-2">
          <Link
            href={`/properties/${thread.property.slug}`}
            className="font-semibold text-sm hover:underline"
          >
            {thread.property.name}
          </Link>
          <Badge variant="secondary" className="text-xs">
            {thread.property.category}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground mt-0.5">{thread.subject}</p>
      </div>

      {/* AI-simulated banner */}
      {showBanner && (
        <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-950/20 border-b shrink-0">
          <Info className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
          <p className="text-xs text-blue-700 dark:text-blue-300 flex-1">
            Responses are AI-simulated for demo purposes
          </p>
          <button
            type="button"
            onClick={() => setShowBanner(false)}
            className="text-blue-500 hover:text-blue-700 dark:hover:text-blue-200 shrink-0"
            aria-label="Dismiss banner"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* Messages area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-3"
      >
        {optimisticMessages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-sm text-muted-foreground">No messages yet. Start the conversation!</p>
          </div>
        ) : (
          optimisticMessages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))
        )}

        {/* Typing indicator */}
        {isTyping && <TypingIndicator />}
      </div>

      {/* Error state */}
      {error && (
        <div className="px-4 py-2 border-t shrink-0">
          <div className="flex items-center gap-2">
            <p className="text-xs text-red-600 dark:text-red-400 flex-1">{error}</p>
            {error.includes("generate") && (
              <button
                type="button"
                onClick={handleRetry}
                className="flex items-center gap-1 text-xs text-red-600 dark:text-red-400 hover:underline shrink-0"
              >
                <RefreshCw className="h-3 w-3" />
                Retry
              </button>
            )}
          </div>
        </div>
      )}

      {/* Input area */}
      <div className="border-t p-4 shrink-0">
        <div className="flex items-center gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            disabled={isTyping || isPending}
            className="flex-1"
          />
          <Button
            type="button"
            size="icon"
            onClick={() => handleSend(inputValue)}
            disabled={!inputValue.trim() || isTyping || isPending}
            aria-label="Send message"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
