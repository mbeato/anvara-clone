"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import type { MockDeal } from "@/lib/data/stub-data"

const STAGES: {
  key: MockDeal["stage"]
  label: string
  color: string
  dotColor: string
}[] = [
  { key: "prospect", label: "Prospecting", color: "border-l-blue-500", dotColor: "bg-blue-500" },
  { key: "negotiating", label: "Negotiating", color: "border-l-amber-500", dotColor: "bg-amber-500" },
  { key: "agreed", label: "Agreed", color: "border-l-emerald-500", dotColor: "bg-emerald-500" },
  { key: "live", label: "Live", color: "border-l-primary", dotColor: "bg-primary" },
]

function formatUSD(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n)
}

function DealCard({
  deal,
  stageColor,
}: {
  deal: MockDeal
  stageColor: string
}) {
  return (
    <Card className={`border-l-2 ${stageColor}`}>
      <CardHeader className="pb-2 pt-3 px-3">
        <p className="font-medium text-sm leading-snug truncate">{deal.property}</p>
      </CardHeader>
      <CardContent className="px-3 pb-3 space-y-1.5">
        <p className="text-base font-semibold tabular-nums">{formatUSD(deal.value)}</p>
        <p className="text-xs text-muted-foreground">{deal.contact}</p>
        <p className="text-xs text-muted-foreground">
          Last activity: {deal.lastActivity}
        </p>
        <Badge variant="outline" className="text-xs capitalize">
          {deal.category}
        </Badge>
      </CardContent>
    </Card>
  )
}

interface DealsPipelineProps {
  deals: MockDeal[]
}

export function DealsPipeline({ deals }: DealsPipelineProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {STAGES.map((stage) => {
        const stageDeals = deals.filter((d) => d.stage === stage.key)
        return (
          <div key={stage.key} className="flex flex-col gap-3">
            {/* Stage header */}
            <div className="flex items-center gap-2">
              <span className={`h-2 w-2 rounded-full flex-shrink-0 ${stage.dotColor}`} />
              <span className="text-sm font-semibold">{stage.label}</span>
              <span className="ml-auto text-xs font-medium text-muted-foreground bg-muted rounded-full px-2 py-0.5">
                {stageDeals.length}
              </span>
            </div>

            {/* Deal cards */}
            {stageDeals.length === 0 ? (
              <p className="text-xs text-muted-foreground italic px-1">No deals</p>
            ) : (
              stageDeals.map((deal) => (
                <DealCard key={deal.id} deal={deal} stageColor={stage.color} />
              ))
            )}
          </div>
        )
      })}
    </div>
  )
}
