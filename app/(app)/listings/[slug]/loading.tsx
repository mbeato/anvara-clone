import { Skeleton } from "@/components/ui/skeleton"

export default function PropertyDetailLoading() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 items-start">
        {/* Left column — hero + meta + about */}
        <div className="lg:col-span-3 space-y-6">
          {/* Hero image skeleton */}
          <Skeleton className="w-full aspect-[4/3] rounded-xl" />

          {/* Meta skeleton */}
          <div className="space-y-3">
            <Skeleton className="h-8 w-2/3" />
            <div className="flex gap-3">
              <Skeleton className="h-5 w-20 rounded-full" />
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-5 w-28" />
            </div>
          </div>

          {/* About skeleton */}
          <div className="space-y-2">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-16 mt-1" />
          </div>
        </div>

        {/* Right column — sidebar skeleton */}
        <div className="lg:col-span-2">
          <div className="rounded-lg border p-6 space-y-4">
            <Skeleton className="h-7 w-32" />
            <Skeleton className="h-12 w-full rounded-md" />
            <Skeleton className="h-10 w-full rounded-md" />
            <Skeleton className="h-10 w-full rounded-md" />
            <Skeleton className="h-px w-full" />
            <div className="flex gap-3">
              <Skeleton className="h-8 w-full rounded" />
              <Skeleton className="h-8 w-full rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
