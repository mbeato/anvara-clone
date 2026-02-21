"use client"

import { useOptimistic, useRef, useEffect, useState, useTransition } from "react"
import Link from "next/link"
import { Send, X, Info, RefreshCw, DollarSign } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { sendMessage } from "@/app/actions/message"
import { createOfferInThread } from "@/app/actions/offer"
import { MessageBubble, isOfferMessage } from "./message-bubble"
import { TypingIndicator } from "./typing-indicator"
import { OfferCard } from "./offer-card"
import { InlineOfferForm } from "./inline-offer-form"
import type { getThread } from "@/lib/data"

type Thread = NonNullable<Awaited<ReturnType<typeof getThread>>>
type Message = Thread["messages"][number]
type Offer = Thread["offers"][number]

interface ConversationViewProps {
  thread: Thread
  onThreadUpdate?: (threadId: string, lastMessage: Message) => void
}

function parseOfferContent(content: string): { amount: number; tier: string; note?: string } {
  const amountMatch = content.match(/\$([0-9,]+)/)
  const tierMatch = content.match(/— (.+?)(?:\. Note:|$)/)
  const noteMatch = content.match(/Note: (.+)$/)

  const amount = amountMatch
    ? parseInt(amountMatch[1].replace(/,/g, ""), 10)
    : 0
  const tier = tierMatch ? tierMatch[1].trim() : "Unknown Tier"
  const note = noteMatch ? noteMatch[1].trim() : undefined

  return { amount, tier, note }
}

function findMatchingOffer(message: Message, offers: Offer[]): Offer | undefined {
  // Match by finding the offer closest in creation time to the message
  return offers.find(
    (o) =>
      Math.abs(
        new Date(o.createdAt).getTime() - new Date(message.createdAt).getTime()
      ) < 5000
  )
}

export function ConversationView({ thread, onThreadUpdate }: ConversationViewProps) {
  const [messages, setMessages] = useState<Message[]>(thread.messages)
  const [offers, setOffers] = useState<Offer[]>(thread.offers)
  const [isTyping, setIsTyping] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showBanner, setShowBanner] = useState(true)
  const [inputValue, setInputValue] = useState("")
  const [isPending, startTransition] = useTransition()
  const [showOfferForm, setShowOfferForm] = useState(false)
  const [isSubmittingOffer, setIsSubmittingOffer] = useState(false)
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
    setOffers(thread.offers)
    setIsTyping(false)
    setError(null)
    setInputValue("")
    setShowOfferForm(false)
  }, [thread.id, thread.messages, thread.offers])

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

  async function handleOfferSubmit(amount: number, packageName: string, note: string) {
    setIsSubmittingOffer(true)
    setError(null)

    const result = await createOfferInThread(thread.id, amount, packageName, note || undefined)

    if (!result.success) {
      setError("Failed to submit offer. Try again.")
      setIsSubmittingOffer(false)
      return
    }

    const offerContent = `[OFFER] $${amount.toLocaleString()} — ${packageName}${
      note ? `. Note: ${note}` : ""
    }`

    const offerMsg: Message = {
      id: result.messageId,
      threadId: thread.id,
      content: offerContent,
      sender: "advertiser",
      isAI: false,
      createdAt: new Date(),
    }

    const newOffer: Offer = {
      id: result.offerId,
      threadId: thread.id,
      amount,
      terms: `${packageName}${note ? " — " + note : ""}`,
      status: "pending",
      createdAt: new Date(),
    }

    setMessages((prev) => [...prev, offerMsg])
    setOffers((prev) => [...prev, newOffer])
    setShowOfferForm(false)
    setIsTyping(true)

    // Trigger AI response to the offer
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ threadId: thread.id }),
      })

      const data = await response.json()

      if (response.ok && data.message) {
        const aiMsg: Message = data.message
        setMessages((prev) => [...prev, aiMsg])
        onThreadUpdate?.(thread.id, aiMsg)
      } else {
        setError("Couldn't generate response. Try again.")
      }
    } catch {
      setError("Couldn't generate response. Try again.")
    } finally {
      setIsTyping(false)
      setIsSubmittingOffer(false)
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
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <Link
              href={`/properties/${thread.property.slug}`}
              className="font-semibold text-sm hover:underline truncate"
            >
              {thread.property.name}
            </Link>
            <Badge variant="secondary" className="text-xs shrink-0">
              {thread.property.category}
            </Badge>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowOfferForm(true)}
            disabled={isTyping || isSubmittingOffer || showOfferForm}
            className="shrink-0 gap-1.5"
          >
            <DollarSign className="h-3.5 w-3.5" />
            Make an Offer
          </Button>
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
          optimisticMessages.map((msg) => {
            if (isOfferMessage(msg.content)) {
              const { amount, tier, note } = parseOfferContent(msg.content)
              const matchingOffer = findMatchingOffer(msg, offers)
              const status = matchingOffer?.status ?? "pending"
              return (
                <OfferCard
                  key={msg.id}
                  amount={amount}
                  tierName={tier}
                  status={status}
                  note={note}
                  createdAt={msg.createdAt}
                />
              )
            }
            return <MessageBubble key={msg.id} message={msg} />
          })
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

      {/* Bottom area — offer form + input */}
      <div className="border-t shrink-0">
        {/* Inline offer form */}
        {showOfferForm && (
          <div className="p-4 border-b">
            <InlineOfferForm
              packages={thread.property.packages}
              onSubmit={handleOfferSubmit}
              onCancel={() => setShowOfferForm(false)}
              isSubmitting={isSubmittingOffer}
            />
          </div>
        )}

        {/* Message input */}
        <div className="p-4">
          <div className="flex items-center gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              disabled={isTyping || isPending || isSubmittingOffer}
              className="flex-1"
            />
            <Button
              type="button"
              size="icon"
              onClick={() => handleSend(inputValue)}
              disabled={!inputValue.trim() || isTyping || isPending || isSubmittingOffer}
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
