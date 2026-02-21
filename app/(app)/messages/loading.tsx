import { Skeleton } from "@/components/ui/skeleton"

export default function MessagesLoading() {
  return (
    <div className="-m-4 flex h-[calc(100vh-3.5rem)] overflow-hidden border-t">
      {/* Left panel — thread list skeleton */}
      <div className="w-80 border-r flex flex-col overflow-hidden">
        <div className="p-4 border-b">
          <Skeleton className="h-5 w-24" />
        </div>
        <div className="flex-1 overflow-hidden p-2 space-y-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-lg">
              <Skeleton className="h-10 w-10 rounded-full shrink-0" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel — conversation placeholder */}
      <div className="flex-1 flex items-center justify-center">
        <p className="text-muted-foreground text-sm">Select a conversation</p>
      </div>
    </div>
  )
}
