"use client"

import * as React from "react"
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
}

export function FilterBar({
  currentFilters,
  onFilterChange,
  onPriceChange,
}: FilterBarProps) {
  const sliderMin = currentFilters.minPrice ?? 0
  const sliderMax = currentFilters.maxPrice ?? PRICE_MAX

  function handlePriceCommit(values: number[]) {
    const min = values[0] > 0 ? values[0] : undefined
    const max = values[1] < PRICE_MAX ? values[1] : undefined
    onPriceChange(min, max)
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Region dropdown */}
      <Select
        value={currentFilters.region ?? "all"}
        onValueChange={(val) =>
          onFilterChange("region", val === "all" ? undefined : val)
        }
      >
        <SelectTrigger className="w-40 h-9">
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

      {/* Event Type dropdown */}
      <Select
        value={currentFilters.category ?? "all"}
        onValueChange={(val) =>
          onFilterChange("category", val === "all" ? undefined : val)
        }
      >
        <SelectTrigger className="w-40 h-9">
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

      {/* Price range slider */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Price</span>
          <Slider
            min={0}
            max={PRICE_MAX}
            step={5000}
            value={[sliderMin, sliderMax]}
            onValueCommit={handlePriceCommit}
            className="w-52"
          />
        </div>
        <span className="text-xs text-muted-foreground">
          {priceFormatter.format(sliderMin)} &mdash; {priceFormatter.format(sliderMax)}
        </span>
      </div>
    </div>
  )
}
