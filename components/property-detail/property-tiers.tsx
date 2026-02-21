"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface Package {
  id: string
  name: string
  priceUsd: number
  inclusions: string[]
  maxSponsors: number
}

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
})

function formatPrice(priceUsd: number): string {
  if (priceUsd === 0) return "Contact for pricing"
  return formatter.format(priceUsd)
}

interface PropertyTiersProps {
  packages: Package[]
}

export function PropertyTiers({ packages }: PropertyTiersProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const sorted = [...packages].sort((a, b) => a.priceUsd - b.priceUsd)

  function handleClick(id: string) {
    setSelectedId((prev) => (prev === id ? null : id))
  }

  if (sorted.length === 0) return null

  return (
    <section>
      <h2 className="text-lg font-semibold mb-4">Sponsorship Tiers</h2>
      <div className="space-y-3">
        {sorted.map((pkg) => {
          const isSelected = selectedId === pkg.id
          return (
            <button
              key={pkg.id}
              type="button"
              onClick={() => handleClick(pkg.id)}
              className={cn(
                "w-full text-left rounded-lg border px-4 py-3 transition-all duration-150",
                isSelected
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-muted-foreground/40"
              )}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{pkg.name}</span>
                <span className="font-semibold tabular-nums">
                  {formatPrice(pkg.priceUsd)}
                </span>
              </div>

              {isSelected && (
                <div className="mt-3">
                  <ul className="space-y-1.5">
                    {pkg.inclusions.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {pkg.maxSponsors} sponsor slot{pkg.maxSponsors !== 1 ? "s" : ""} available
                  </p>
                </div>
              )}
            </button>
          )
        })}
      </div>
    </section>
  )
}
