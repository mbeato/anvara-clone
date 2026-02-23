import { Skeleton } from "@/components/ui/skeleton";

export function PropertyCardSkeleton() {
  return (
    <div className="rounded-xl border bg-card overflow-hidden">
      <Skeleton className="aspect-[2/1] w-full" />
      <div className="p-2 sm:p-3 space-y-1.5 sm:space-y-2">
        <Skeleton className="h-3.5 sm:h-4 w-3/4" />
        <Skeleton className="h-3 w-full" />
        <div className="flex justify-between pt-1">
          <Skeleton className="h-3 w-1/3" />
          <Skeleton className="h-3 w-1/4" />
        </div>
      </div>
    </div>
  );
}
