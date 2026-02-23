// PLACEHOLDER — replaced by 06.3-02

import type { getAllProperties } from "@/lib/data"

type Property = Awaited<ReturnType<typeof getAllProperties>>[number]

interface AIChatClientProps {
  properties: Property[]
}

export function AIChatClient({ properties: _properties }: AIChatClientProps) {
  return (
    <div className="flex flex-1 items-center justify-center text-muted-foreground">
      AI Chat loading...
    </div>
  )
}
