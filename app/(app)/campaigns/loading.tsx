import { Skeleton } from "@/components/ui/skeleton"

export default function CampaignsLoading() {
  return (
    <div className="flex flex-col gap-6 p-6">
      {/* KPI cards row — 4 cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-28 rounded-xl" />
        ))}
      </div>

      {/* Campaign table */}
      <Skeleton className="h-96 w-full rounded-xl" />
    </div>
  )
}
