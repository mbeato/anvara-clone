import { Skeleton } from "@/components/ui/skeleton";

export function PropertyCardSkeleton() {
  return (
    <div className="rounded-lg sm:rounded-xl border bg-card overflow-hidden">
      <Skeleton className="aspect-[16/10] sm:aspect-[2/1] w-full" />
      <div className="p-1.5 sm:p-3 space-y-1 sm:space-y-2">
        <Skeleton className="h-3 sm:h-4 w-3/4" />
        <Skeleton className="h-2.5 sm:h-3 w-full" />
        <div className="flex justify-between">
          <Skeleton className="h-2.5 sm:h-3 w-1/3" />
          <Skeleton className="h-2.5 sm:h-3 w-1/4 hidden sm:block" />
        </div>
      </div>
    </div>
  );
}
