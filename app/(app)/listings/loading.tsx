import { Skeleton } from "@/components/ui/skeleton";
import { PropertyCardSkeleton } from "./_components/property-card-skeleton";

export default function BrowseLoading() {
  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-6 space-y-3 sm:space-y-6">
      {/* Carousel skeleton — compact chips on mobile, full bar on desktop */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide sm:hidden">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="w-28 aspect-[16/9] flex-shrink-0 rounded-lg" />
        ))}
      </div>
      <Skeleton className="hidden sm:block w-full h-48 rounded-xl" />

      {/* Category tabs skeleton */}
      <div className="flex gap-1.5 sm:gap-2 overflow-x-auto scrollbar-hide">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-7 sm:h-8 w-14 sm:w-16 shrink-0 rounded-full" />
        ))}
      </div>

      {/* Filter bar skeleton — mobile: stacked, desktop: inline */}
      <div className="sm:hidden flex flex-col gap-2">
        <div className="flex gap-2">
          <Skeleton className="h-9 flex-1 rounded-md" />
          <Skeleton className="h-9 flex-1 rounded-md" />
        </div>
        <Skeleton className="h-9 w-full rounded-md" />
      </div>
      <div className="hidden sm:flex gap-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-40 rounded-md" />
        ))}
      </div>

      {/* Card grid skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <PropertyCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
