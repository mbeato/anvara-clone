import { Skeleton } from "@/components/ui/skeleton";
import { PropertyCardSkeleton } from "./_components/property-card-skeleton";

export default function BrowseLoading() {
  return (
    <div className="p-6 space-y-6">
      {/* Carousel skeleton */}
      <Skeleton className="w-full h-48 rounded-xl" />

      {/* Category tabs skeleton — 8 pill-shaped skeletons */}
      <div className="flex gap-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-20 rounded-full" />
        ))}
      </div>

      {/* Filter bar skeleton — 3 rectangular skeletons */}
      <div className="flex gap-3">
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
