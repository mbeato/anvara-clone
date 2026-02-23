import { Skeleton } from "@/components/ui/skeleton"

export default function PublicListingLoading() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
        {/* Left column skeleton */}
        <div className="lg:col-span-3 space-y-4">
          <div className="space-y-3">
            <Skeleton className="h-8 w-2/3" />
            <div className="flex gap-2">
              <Skeleton className="h-5 w-20 rounded-full" />
              <Skeleton className="h-5 w-32" />
            </div>
          </div>
          <Skeleton className="w-full aspect-[4/3] rounded-xl" />
        </div>

        {/* Right column skeleton */}
        <div className="lg:col-span-2 space-y-8">
          <div className="space-y-2">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-32 w-full rounded-xl" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
