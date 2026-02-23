import { Skeleton } from "@/components/ui/skeleton"

export default function DealsLoading() {
  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Heading skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-7 w-24" />
        <Skeleton className="h-4 w-48" />
      </div>

      {/* Stats row skeleton — 5 blocks */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-16 rounded-xl" />
        ))}
      </div>

      {/* Pipeline columns skeleton — 4 columns with 2-3 cards each */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, col) => (
          <div key={col} className="flex flex-col gap-3">
            <Skeleton className="h-5 w-32" />
            {Array.from({ length: col === 1 ? 3 : 2 }).map((_, card) => (
              <Skeleton key={card} className="h-32 rounded-xl" />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
