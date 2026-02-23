"use client"

import { useState, useRef, useEffect, useMemo } from "react"
import { Sparkles, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { TypingIndicator } from "@/components/messaging/typing-indicator"
import { AIMessage } from "./ai-message"
import { UserMessage } from "./user-message"
import type { getAllProperties } from "@/lib/data"

type Property = Awaited<ReturnType<typeof getAllProperties>>[number]
type UserMsg = { role: "user"; content: string }
type AIMsg = { role: "assistant"; content: string; recommendedSlugs: string[] }
type ChatMessage = UserMsg | AIMsg

interface AIChatClientProps {
  properties: Property[]
}

export function AIChatClient({ properties }: AIChatClientProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const scrollRef = useRef<HTMLDivElement>(null)

  const propertyMap = useMemo(
    () => new Map(properties.map((p) => [p.slug, p])),
    [properties]
  )

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isLoading])

  async function handleSend(content: string) {
    if (!content.trim() || isLoading) return

    const userMessage: UserMsg = { role: "user", content: content.trim() }
    const updatedMessages: ChatMessage[] = [...messages, userMessage]

    setInputValue("")
    setError(null)
    setMessages(updatedMessages)
    setIsLoading(true)

    try {
      const response = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }

      const data = (await response.json()) as { text: string; recommendedSlugs: string[] }
      const aiMessage: AIMsg = {
        role: "assistant",
        content: data.text,
        recommendedSlugs: data.recommendedSlugs ?? [],
      }
      setMessages((prev) => [...prev, aiMessage])
    } catch {
      setError("Failed to get a response. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      void handleSend(inputValue)
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b px-4 py-3 shrink-0">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          <h1 className="font-semibold text-sm">Anvara AI</h1>
        </div>
        <p className="text-xs text-muted-foreground mt-0.5">
          Describe what you&apos;re looking for and I&apos;ll recommend sponsorship opportunities
        </p>
      </div>

      {/* Messages area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center h-full gap-3 text-center">
            <Sparkles className="h-8 w-8 text-primary" />
            <h2 className="text-lg font-semibold">Anvara AI</h2>
            <p className="text-sm text-muted-foreground max-w-xs">
              Describe what you&apos;re looking for and I&apos;ll find relevant sponsorship
              opportunities for you.
            </p>
          </div>
        ) : (
          messages.map((msg, i) =>
            msg.role === "user" ? (
              <UserMessage key={i} content={msg.content} />
            ) : (
              <AIMessage
                key={i}
                content={msg.content}
                recommendedProperties={msg.recommendedSlugs
                  .map((slug) => propertyMap.get(slug))
                  .filter((p): p is Property => p !== undefined)}
              />
            )
          )
        )}
        {isLoading && <TypingIndicator />}
      </div>

      {/* Error */}
      {error && (
        <div className="px-4 py-2 border-t shrink-0">
          <p className="text-xs text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      {/* Input area */}
      <div className="border-t p-4 shrink-0">
        <div className="flex items-center gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about sponsorship opportunities..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button
            type="button"
            size="icon"
            onClick={() => void handleSend(inputValue)}
            disabled={!inputValue.trim() || isLoading}
            aria-label="Send message"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
