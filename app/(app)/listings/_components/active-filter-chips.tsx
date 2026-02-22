"use client"

import { X } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
})

const PRICE_MAX = 150000

interface ActiveFilterChipsProps {
  currentFilters: {
    category?: string
    region?: string
    minPrice?: number
    maxPrice?: number
  }
  onRemoveFilter: (key: string) => void
  onClearAll: () => void
}

interface Chip {
  key: string
  label: string
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export function ActiveFilterChips({
  currentFilters,
  onRemoveFilter,
  onClearAll,
}: ActiveFilterChipsProps) {
  const chips: Chip[] = []

  if (currentFilters.category) {
    chips.push({ key: "category", label: capitalize(currentFilters.category) })
  }
  if (currentFilters.region) {
    chips.push({ key: "region", label: capitalize(currentFilters.region) })
  }
  if (currentFilters.minPrice !== undefined) {
    chips.push({
      key: "minPrice",
      label: `Min: ${priceFormatter.format(currentFilters.minPrice)}`,
    })
  }
  if (
    currentFilters.maxPrice !== undefined &&
    currentFilters.maxPrice < PRICE_MAX
  ) {
    chips.push({
      key: "maxPrice",
      label: `Max: ${priceFormatter.format(currentFilters.maxPrice)}`,
    })
  }

  if (chips.length === 0) return null

  return (
    <div className="flex flex-wrap items-center gap-2">
      {chips.map((chip) => (
        <Badge
          key={chip.key}
          variant="secondary"
          className="gap-1 pr-1.5 cursor-pointer hover:bg-destructive/10"
          onClick={() => onRemoveFilter(chip.key)}
        >
          {chip.label}
          <X className="size-3" />
        </Badge>
      ))}
      {chips.length >= 2 && (
        <button
          className="text-xs text-muted-foreground hover:text-foreground underline"
          onClick={onClearAll}
        >
          Clear all
        </button>
      )}
    </div>
  )
}
