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
    borderClass: "border-yellow-500/40",
    badgeVariant: "outline",
    label: "Pending",
    badgeClass: "border-yellow-500 text-yellow-700 dark:text-yellow-400",
  },
  accepted: {
    borderClass: "border-green-500/40",
    badgeVariant: "default",
    label: "Accepted",
    badgeClass: "bg-green-600 text-white border-green-600",
  },
  declined: {
    borderClass: "border-red-500/40",
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
    <div className="flex justify-end">
      <div className={`max-w-[70%] rounded-2xl rounded-br-sm border ${config.borderClass} bg-blue-600 px-4 py-3 text-white`}>
        {/* Header */}
        <div className="flex items-center justify-between gap-3 mb-1.5">
          <span className="text-[10px] font-medium uppercase tracking-wide text-blue-200">
            Offer Submitted
          </span>
          <Badge
            variant={config.badgeVariant}
            className={`text-[10px] px-1.5 py-0 h-4 ${config.badgeClass}`}
          >
            {config.label}
          </Badge>
        </div>

        {/* Amount + tier */}
        <p className="text-lg font-bold">${amount.toLocaleString()}</p>
        <p className="text-xs text-blue-100 mt-0.5">{tierName}</p>

        {/* Optional note */}
        {note && (
          <p className="text-xs text-blue-100 italic mt-1">&ldquo;{note}&rdquo;</p>
        )}

        {/* Timestamp */}
        <span className="text-[10px] text-blue-200 block text-right mt-1.5">{timeString}</span>
      </div>
    </div>
  )
}
