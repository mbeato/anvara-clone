"use client"

import { SearchX } from "lucide-react"
import { Button } from "@/components/ui/button"

interface EmptyStateProps {
  onClearFilters: () => void
}

export function EmptyState({ onClearFilters }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
      <SearchX className="size-12 text-muted-foreground/50" />
      <div className="space-y-1">
        <h3 className="font-semibold text-lg">No properties match</h3>
        <p className="text-sm text-muted-foreground">
          Try adjusting your filters or browse all properties
        </p>
      </div>
      <Button variant="outline" onClick={onClearFilters}>
        Clear all filters
      </Button>
    </div>
  )
}
