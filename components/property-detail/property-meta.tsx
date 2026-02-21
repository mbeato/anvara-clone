import { MapPin, Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface PropertyMetaProps {
  property: {
    name: string
    category: string
    location: string
    availability: string
  }
}

export function PropertyMeta({ property }: PropertyMetaProps) {
  const { name, category, location, availability } = property

  return (
    <div className="space-y-3">
      <h1 className="text-2xl font-bold">{name}</h1>
      <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
        <Badge variant="secondary" className="capitalize">
          {category}
        </Badge>
        <div className="flex items-center gap-1">
          <MapPin className="h-3.5 w-3.5 shrink-0" />
          <span>{location}</span>
        </div>
        <div className="flex items-center gap-1">
          <Calendar className="h-3.5 w-3.5 shrink-0" />
          <span>{availability}</span>
        </div>
      </div>
    </div>
  )
}
