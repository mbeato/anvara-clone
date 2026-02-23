import { KpiCard } from "@/app/(app)/dashboard/_components/kpi-card"
import type { CampaignKpi } from "@/lib/data/stub-data"
import {
  DollarSign,
  Activity,
  BarChart2,
  MousePointerClick,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

const iconMap: Record<CampaignKpi["iconName"], LucideIcon> = {
  DollarSign,
  Activity,
  BarChart2,
  MousePointerClick,
}

interface CampaignsStatsProps {
  stats: CampaignKpi[]
}

export function CampaignsStats({ stats }: CampaignsStatsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((kpi) => (
        <KpiCard
          key={kpi.label}
          label={kpi.label}
          value={kpi.value}
          trend={kpi.trend}
          icon={iconMap[kpi.iconName]}
        />
      ))}
    </div>
  )
}
