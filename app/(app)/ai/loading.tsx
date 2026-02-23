import { Skeleton } from "@/components/ui/skeleton"

export default function AILoading() {
  return (
    <div className="flex flex-col h-full gap-4 p-4">
      {/* Header placeholder */}
      <Skeleton className="h-12 w-full" />

      {/* Chat messages area */}
      <div className="flex flex-1 flex-col gap-3">
        {/* Left-aligned bubble */}
        <div className="flex justify-start">
          <Skeleton className="h-10 w-[55%]" />
        </div>
        {/* Right-aligned bubble */}
        <div className="flex justify-end">
          <Skeleton className="h-10 w-[40%]" />
        </div>
        {/* Left-aligned bubble */}
        <div className="flex justify-start">
          <Skeleton className="h-10 w-[70%]" />
        </div>
        {/* Right-aligned bubble */}
        <div className="flex justify-end">
          <Skeleton className="h-10 w-[45%]" />
        </div>
      </div>

      {/* Input placeholder */}
      <Skeleton className="h-12 w-full" />
    </div>
  )
}
