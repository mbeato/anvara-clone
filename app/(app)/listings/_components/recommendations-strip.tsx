"use client"

import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { getAllProperties } from "@/lib/data"
import { PropertyCard } from "./property-card"

type Property = Awaited<ReturnType<typeof getAllProperties>>[number]

interface ListingStripProps {
  title: string
  subtitle: string
  properties: Property[]
}

export function ListingStrip({ title, subtitle, properties }: ListingStripProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  if (properties.length === 0) return null

  function scroll(direction: "left" | "right") {
    if (!scrollRef.current) return
    const amount = scrollRef.current.clientWidth * 0.6
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    })
  }

  return (
    <section className="space-y-2 sm:space-y-3">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-base sm:text-lg font-semibold">{title}</h2>
          <p className="text-xs sm:text-sm text-muted-foreground">{subtitle}</p>
        </div>
        <div className="hidden sm:flex items-center gap-1">
          <button
            type="button"
            onClick={() => scroll("left")}
            className="p-1.5 rounded-full border hover:bg-accent transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => scroll("right")}
            className="p-1.5 rounded-full border hover:bg-accent transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
      <div
        ref={scrollRef}
        className="flex gap-3 sm:gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
      >
        {properties.map((p) => (
          <div key={p.id} className="min-w-[160px] max-w-[180px] sm:min-w-[240px] sm:max-w-[260px] flex-shrink-0 snap-start">
            <PropertyCard property={p} />
          </div>
        ))}
      </div>
    </section>
  )
}

/** @deprecated Use ListingStrip directly */
export function RecommendationsStrip({ properties }: { properties: Property[] }) {
  return (
    <ListingStrip
      title="Recommended for you"
      subtitle="Based on your interests"
      properties={properties}
    />
  )
}
