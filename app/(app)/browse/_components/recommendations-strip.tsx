"use client"

import type { getAllProperties } from "@/lib/data"
import { PropertyCard } from "./property-card"

type Property = Awaited<ReturnType<typeof getAllProperties>>[number]

interface RecommendationsStripProps {
  properties: Property[]
}

export function RecommendationsStrip({ properties }: RecommendationsStripProps) {
  if (properties.length === 0) return null

  return (
    <section className="space-y-3">
      <div>
        <h2 className="text-lg font-semibold">Recommended for you</h2>
        <p className="text-sm text-muted-foreground">Based on your interests</p>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
        {properties.map((p) => (
          <div key={p.id} className="min-w-[200px] max-w-[220px] flex-shrink-0 snap-start">
            <PropertyCard property={p} />
          </div>
        ))}
      </div>
    </section>
  )
}
