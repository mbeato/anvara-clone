export function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="bg-muted rounded-2xl rounded-bl-sm px-4 py-3">
        <div className="flex items-center gap-1">
          <span
            className="h-2 w-2 rounded-full bg-muted-foreground/60 animate-bounce [animation-delay:-0.3s]"
          />
          <span
            className="h-2 w-2 rounded-full bg-muted-foreground/60 animate-bounce [animation-delay:-0.15s]"
          />
          <span
            className="h-2 w-2 rounded-full bg-muted-foreground/60 animate-bounce"
          />
        </div>
      </div>
    </div>
  )
}
