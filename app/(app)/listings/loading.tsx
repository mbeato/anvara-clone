import { Skeleton } from "@/components/ui/skeleton";
import { PropertyCardSkeleton } from "./_components/property-card-skeleton";

export default function BrowseLoading() {
  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6 space-y-4 sm:space-y-6">
      {/* Carousel skeleton */}
      <Skeleton className="w-full h-48 rounded-xl" />

      {/* Category tabs skeleton — scrollable row matching CategoryTabRow */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-16 shrink-0 rounded-full" />
        ))}
      </div>

      {/* Filter bar skeleton — mobile: stacked, desktop: inline */}
      {/* Mobile (sm:hidden): two dropdowns side-by-side + one full-width below */}
      <div className="sm:hidden flex flex-col gap-2">
        <div className="flex gap-2">
          <Skeleton className="h-9 flex-1 rounded-md" />
          <Skeleton className="h-9 flex-1 rounded-md" />
        </div>
        <Skeleton className="h-9 w-full rounded-md" />
      </div>
      {/* Desktop (hidden sm:flex): three fixed-width skeletons inline */}
      <div className="hidden sm:flex gap-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-40 rounded-md" />
        ))}
      </div>

      {/* Card grid skeleton — 10 PropertyCardSkeleton */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <PropertyCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
