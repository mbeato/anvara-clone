import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface OfferCardProps {
  amount: number
  tierName: string
  status: string
  note?: string
  createdAt: Date
}

const STATUS_CONFIG: Record<
  string,
  { borderClass: string; badgeVariant: "outline" | "default" | "destructive"; label: string; badgeClass: string }
> = {
  pending: {
    borderClass: "border-l-yellow-500",
    badgeVariant: "outline",
    label: "Pending",
    badgeClass: "border-yellow-500 text-yellow-700 dark:text-yellow-400",
  },
  accepted: {
    borderClass: "border-l-green-500",
    badgeVariant: "default",
    label: "Accepted",
    badgeClass: "bg-green-600 text-white border-green-600",
  },
  declined: {
    borderClass: "border-l-red-500",
    badgeVariant: "destructive",
    label: "Declined",
    badgeClass: "",
  },
}

export function OfferCard({ amount, tierName, status, note, createdAt }: OfferCardProps) {
  const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.pending

  const timeString = new Date(createdAt).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  })

  return (
    <Card className={`w-full border-l-4 ${config.borderClass}`}>
      <CardContent className="p-4">
        {/* Header row */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Offer Submitted
          </span>
          <Badge
            variant={config.badgeVariant}
            className={config.badgeClass}
          >
            {config.label}
          </Badge>
        </div>

        {/* Amount */}
        <p className="text-2xl font-bold text-foreground">
          ${amount.toLocaleString()}
        </p>

        {/* Tier */}
        <p className="text-sm text-muted-foreground mt-1">
          Tier: {tierName}
        </p>

        {/* Optional note */}
        {note && (
          <p className="text-sm text-muted-foreground italic mt-1">
            {note}
          </p>
        )}

        {/* Timestamp */}
        <div className="flex justify-end mt-3">
          <span className="text-[10px] text-muted-foreground">{timeString}</span>
        </div>
      </CardContent>
    </Card>
  )
}
