"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { MockCampaign } from "@/lib/data/stub-data"

interface CampaignsTableProps {
  data: MockCampaign[]
}

function formatUSD(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n)
}

function formatNumber(n: number): string {
  return n.toLocaleString("en-US")
}

function StatusBadge({ status }: { status: MockCampaign["status"] }) {
  if (status === "active") {
    return <Badge variant="default">Active</Badge>
  }
  if (status === "paused") {
    return <Badge variant="secondary">Paused</Badge>
  }
  return <Badge variant="outline">Completed</Badge>
}

export function CampaignsTable({ data }: CampaignsTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>All Campaigns</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/40">
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  Campaign Name
                </th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  Property
                </th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  Status
                </th>
                <th className="px-4 py-3 text-right font-medium text-muted-foreground">
                  Budget
                </th>
                <th className="px-4 py-3 text-right font-medium text-muted-foreground">
                  Spend
                </th>
                <th className="px-4 py-3 text-right font-medium text-muted-foreground">
                  Impressions
                </th>
                <th className="px-4 py-3 text-right font-medium text-muted-foreground">
                  Clicks
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {data.map((campaign) => (
                <tr
                  key={campaign.id}
                  className="hover:bg-muted/30 transition-colors"
                >
                  <td className="px-4 py-3 font-medium">{campaign.name}</td>
                  <td className="px-4 py-3 text-muted-foreground max-w-[200px] truncate">
                    {campaign.property}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={campaign.status} />
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums">
                    {formatUSD(campaign.budget)}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums">
                    {formatUSD(campaign.spend)}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums text-muted-foreground">
                    {formatNumber(campaign.impressions)}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums text-muted-foreground">
                    {formatNumber(campaign.clicks)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
