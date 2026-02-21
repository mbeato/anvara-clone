import { Badge } from "@/components/ui/badge"

interface PropertyFormatsProps {
  category: string
  subcategory: string | null
}

const FORMAT_MAP: Record<string, string[]> = {
  sports: [
    "Premium Footprint",
    "In-Stadium Signage",
    "Digital Content",
    "Player Appearances",
    "VIP Hospitality",
    "Broadcast Integration",
  ],
  music: [
    "On-Site Activation",
    "Stage Branding",
    "Experiential Pop-Up",
    "Artist Integration",
    "Digital Content",
    "VIP Lounge",
  ],
  festival: [
    "On-Site Activation",
    "Stage Branding",
    "Experiential Pop-Up",
    "Artist Integration",
    "Digital Content",
    "VIP Lounge",
  ],
  tech: [
    "Keynote Sponsorship",
    "Booth Space",
    "Panel Hosting",
    "Attendee Swag",
    "Digital Content",
    "Networking Event",
  ],
  conference: [
    "Keynote Sponsorship",
    "Booth Space",
    "Panel Hosting",
    "Attendee Swag",
    "Digital Content",
    "Networking Event",
  ],
  arts: [
    "Gallery Presence",
    "Experiential Installation",
    "Collector Events",
    "Digital Content",
    "VIP Preview",
    "Brand Placement",
  ],
  lifestyle: [
    "On-Site Activation",
    "Brand Placement",
    "Influencer Integration",
    "Digital Content",
    "VIP Access",
    "Social Media Integration",
  ],
}

const DEFAULT_FORMATS = [
  "On-Site Activation",
  "Digital Content",
  "Brand Placement",
  "VIP Access",
  "Social Media Integration",
]

function deriveFormats(category: string, subcategory: string | null): string[] {
  const key = category.toLowerCase()
  const subKey = subcategory?.toLowerCase() ?? ""

  // Check subcategory first, then category, then default
  if (subKey && FORMAT_MAP[subKey]) return FORMAT_MAP[subKey]
  if (FORMAT_MAP[key]) return FORMAT_MAP[key]
  return DEFAULT_FORMATS
}

export function PropertyFormats({ category, subcategory }: PropertyFormatsProps) {
  const formats = deriveFormats(category, subcategory)

  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold">Activation Formats</h2>
      <div className="flex flex-wrap gap-2">
        {formats.map((format) => (
          <Badge key={format} variant="outline">
            {format}
          </Badge>
        ))}
      </div>
    </section>
  )
}
