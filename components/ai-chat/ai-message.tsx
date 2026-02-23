import { PropertyCard } from "@/app/(app)/listings/_components/property-card"
import type { getAllProperties } from "@/lib/data"

type Property = Awaited<ReturnType<typeof getAllProperties>>[number]

interface AIMessageProps {
  content: string
  recommendedProperties: Property[]
}

export function AIMessage({ content, recommendedProperties }: AIMessageProps) {
  return (
    <div className="flex justify-start">
      <div className="flex flex-col gap-3 max-w-[85%]">
        <div className="bg-muted text-foreground rounded-2xl rounded-bl-sm px-4 py-2.5">
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
        </div>
        {recommendedProperties.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {recommendedProperties.map((p) => (
              <PropertyCard key={p.slug} property={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
