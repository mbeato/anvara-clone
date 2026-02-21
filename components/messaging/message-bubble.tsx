interface MessageBubbleProps {
  message: {
    id: string
    content: string
    sender: string
    isAI: boolean
    createdAt: Date
  }
  isOffer?: boolean
}

export function isOfferMessage(content: string): boolean {
  return content.startsWith("[OFFER]")
}

export function MessageBubble({ message, isOffer = false }: MessageBubbleProps) {
  // Offer messages are rendered as OfferCard by the parent — skip bubble rendering
  if (isOfferMessage(message.content)) {
    return null
  }

  const isAdvertiser = message.sender === "advertiser"

  const timeString = new Date(message.createdAt).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  })

  return (
    <div className={`flex ${isAdvertiser ? "justify-end" : "justify-start"}`}>
      <div className="flex flex-col max-w-[70%]">
        <div
          className={
            isAdvertiser
              ? "bg-blue-600 text-white rounded-2xl rounded-br-sm px-4 py-2.5"
              : "bg-muted text-foreground rounded-2xl rounded-bl-sm px-4 py-2.5"
          }
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
        </div>
        <span
          className={`text-[10px] mt-1 text-muted-foreground ${
            isAdvertiser ? "text-right" : "text-left"
          }`}
        >
          {timeString}
        </span>
      </div>
    </div>
  )
}
