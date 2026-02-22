import { getAllProperties, getThreads } from "@/lib/data"
import { deriveAnalytics } from "@/lib/data/analytics"
import { KpiCard } from "./_components/kpi-card"
import { ImpressionsAreaChart } from "./_components/impressions-area-chart"
import { CategoryBarChart } from "./_components/category-bar-chart"
import { RecentActivityTable } from "./_components/recent-activity-table"
import { ChartArea, TrendingUp, Briefcase, MessageSquare } from "lucide-react"

export const metadata = { title: "Campaign Analytics | Anvara" }

const iconMap = {
  ChartArea,
  TrendingUp,
  Briefcase,
  MessageSquare,
} as const

export default async function DashboardPage() {
  const [properties, threads] = await Promise.all([
    getAllProperties(),
    getThreads(),
  ])

  const analytics = deriveAnalytics(properties, threads)

  return (
    <div className="space-y-6 p-6 max-w-7xl mx-auto">
      {/* Page heading */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Campaign Analytics</h1>
        <p className="text-muted-foreground">
          Performance overview across your sponsorship portfolio
        </p>
      </div>

      {/* KPI row: 2 cols on mobile, 4 cols on lg */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {analytics.kpis.map((kpi) => (
          <KpiCard
            key={kpi.label}
            label={kpi.label}
            value={kpi.value}
            trend={kpi.trend}
            icon={iconMap[kpi.iconName]}
          />
        ))}
      </div>

      {/* Charts row: full width stacked on mobile, 2/3 + 1/3 on lg */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <ImpressionsAreaChart data={analytics.impressionsTrend} />
        </div>
        <CategoryBarChart data={analytics.categoryBreakdown} />
      </div>

      {/* Recent activity table */}
      <RecentActivityTable data={analytics.recentActivity} />
    </div>
  )
}
