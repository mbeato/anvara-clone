import { getMockDeals } from "@/lib/data/stub-data"
import { DealsPipeline } from "./_components/deals-pipeline"

export const metadata = { title: "Deals | Anvara" }

function formatUSD(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n)
}

export default function DealsPage() {
  const deals = getMockDeals()

  const totalValue = deals.reduce((sum, d) => sum + d.value, 0)
  const prospectCount = deals.filter((d) => d.stage === "prospect").length
  const negotiatingCount = deals.filter((d) => d.stage === "negotiating").length
  const agreedCount = deals.filter((d) => d.stage === "agreed").length
  const liveCount = deals.filter((d) => d.stage === "live").length

  return (
    <div className="space-y-6 p-6 max-w-7xl mx-auto">
      {/* Page heading */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Deals</h1>
        <p className="text-muted-foreground">Your sponsorship pipeline</p>
      </div>

      {/* Summary stats row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="col-span-2 md:col-span-1 rounded-xl border bg-card p-4">
          <p className="text-xs text-muted-foreground mb-1">Pipeline Value</p>
          <p className="text-xl font-bold tabular-nums">{formatUSD(totalValue)}</p>
        </div>
        <div className="rounded-xl border bg-card p-4">
          <p className="text-xs text-muted-foreground mb-1">All Deals</p>
          <p className="text-xl font-bold">{deals.length}</p>
        </div>
        <div className="rounded-xl border bg-card p-4">
          <p className="text-xs text-muted-foreground mb-1">Prospecting</p>
          <p className="text-xl font-bold">{prospectCount}</p>
        </div>
        <div className="rounded-xl border bg-card p-4">
          <p className="text-xs text-muted-foreground mb-1">Negotiating</p>
          <p className="text-xl font-bold">{negotiatingCount}</p>
        </div>
        <div className="rounded-xl border bg-card p-4">
          <p className="text-xs text-muted-foreground mb-1">Agreed / Live</p>
          <p className="text-xl font-bold">{agreedCount + liveCount}</p>
        </div>
      </div>

      {/* Pipeline view */}
      <DealsPipeline deals={deals} />
    </div>
  )
}
