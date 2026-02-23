"use client"

import { useState } from "react"
import { Slider } from "@/components/ui/slider"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
  notation: "compact",
})

const PRICE_MAX = 150000

interface FilterBarProps {
  currentFilters: {
    category?: string
    region?: string
    minPrice?: number
    maxPrice?: number
  }
  onFilterChange: (key: string, value: string | undefined) => void
  onPriceChange: (min: number | undefined, max: number | undefined) => void
  totalCount?: number
}

export function FilterBar({
  currentFilters,
  onFilterChange,
  onPriceChange,
  totalCount,
}: FilterBarProps) {
  const committedRange: [number, number] = [
    currentFilters.minPrice ?? 0,
    currentFilters.maxPrice ?? PRICE_MAX,
  ]
  const [dragRange, setDragRange] = useState<number[] | null>(null)
  const liveRange = dragRange ?? committedRange

  function handlePriceCommit(values: number[]) {
    setDragRange(null)
    const min = values[0] > 0 ? values[0] : undefined
    const max = values[1] < PRICE_MAX ? values[1] : undefined
    onPriceChange(min, max)
  }

  return (
    <div className="flex w-full min-w-0 flex-col gap-2 sm:w-auto sm:shrink-0 sm:flex-row sm:items-center sm:gap-3">
      {/* Mobile: all three controls in one tight row */}
      <div className="flex w-full min-w-0 items-center gap-2 sm:gap-3">
        {/* Region dropdown */}
        <div className="min-w-0 flex-1 sm:flex-none">
          <Select
            value={currentFilters.region ?? "all"}
            onValueChange={(val) =>
              onFilterChange("region", val === "all" ? undefined : val)
            }
          >
            <SelectTrigger className="h-8 w-full min-w-0 text-xs sm:h-9 sm:w-40 sm:text-sm">
              <SelectValue placeholder="All Regions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              <SelectItem value="West">West</SelectItem>
              <SelectItem value="East">East</SelectItem>
              <SelectItem value="South">South</SelectItem>
              <SelectItem value="Midwest">Midwest</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Event Type dropdown */}
        <div className="min-w-0 flex-1 sm:flex-none">
          <Select
            value={currentFilters.category ?? "all"}
            onValueChange={(val) =>
              onFilterChange("category", val === "all" ? undefined : val)
            }
          >
            <SelectTrigger className="h-8 w-full min-w-0 text-xs sm:h-9 sm:w-40 sm:text-sm">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="sports">Sports</SelectItem>
              <SelectItem value="music">Music</SelectItem>
              <SelectItem value="arts">Arts</SelectItem>
              <SelectItem value="food">Food</SelectItem>
              <SelectItem value="lifestyle">Lifestyle</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Price range slider — inline with labels */}
      <div className="flex w-full min-w-0 items-center gap-2 sm:w-auto sm:flex-col sm:items-stretch sm:gap-1">
        <span className="text-[10px] sm:text-xs font-medium text-muted-foreground shrink-0">Price</span>
        <Slider
          min={0}
          max={PRICE_MAX}
          step={5000}
          value={liveRange}
          onValueChange={setDragRange}
          onValueCommit={handlePriceCommit}
          className="min-w-0 flex-1 sm:w-52 sm:flex-none"
        />
        <div className="flex gap-1 shrink-0 whitespace-nowrap">
          <span className="text-[10px] sm:text-xs text-muted-foreground">
            {priceFormatter.format(liveRange[0])}
          </span>
          <span className="text-[10px] sm:text-xs text-muted-foreground">–</span>
          <span className="text-[10px] sm:text-xs text-muted-foreground">
            {priceFormatter.format(liveRange[1])}
          </span>
        </div>
      </div>

      {/* Listing count */}
      {totalCount !== undefined && (
        <p className="shrink-0 text-[10px] sm:text-xs text-muted-foreground whitespace-nowrap">
          {totalCount} {totalCount === 1 ? "listing" : "listings"}
        </p>
      )}
    </div>
  )
}
