"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface PropertyAboutProps {
  description: string
}

export function PropertyAbout({ description }: PropertyAboutProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold">About this Listing</h2>
      <p
        className={cn(
          "text-muted-foreground leading-relaxed",
          !expanded && "line-clamp-4"
        )}
      >
        {description}
      </p>
      <button
        className="text-sm text-primary hover:underline cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? "Read less" : "Read more"}
      </button>
    </div>
  )
}
