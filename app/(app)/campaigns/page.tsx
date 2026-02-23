import { getMockCampaigns, getCampaignStats } from "@/lib/data/stub-data"
import { CampaignsStats } from "./_components/campaigns-stats"
import { CampaignsTable } from "./_components/campaigns-table"

export const metadata = { title: "Campaigns | Anvara" }

export default function CampaignsPage() {
  const campaigns = getMockCampaigns()
  const stats = getCampaignStats()

  return (
    <div className="space-y-6 p-6 max-w-7xl mx-auto">
      {/* Page heading */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Campaigns</h1>
        <p className="text-muted-foreground">
          Track performance across your active and past sponsorship campaigns
        </p>
      </div>

      {/* KPI summary cards */}
      <CampaignsStats stats={stats} />

      {/* Campaign data table */}
      <CampaignsTable data={campaigns} />
    </div>
  )
}
