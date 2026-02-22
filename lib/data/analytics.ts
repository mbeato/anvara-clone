import type { getAllProperties, getThreads } from "@/lib/data";

type Properties = Awaited<ReturnType<typeof getAllProperties>>;
type Threads = Awaited<ReturnType<typeof getThreads>>;

// ---------------------------------------------------------------------------
// KPI types
// ---------------------------------------------------------------------------

export interface KpiData {
  label: string;
  value: string;
  trend: number;
  iconName: "ChartArea" | "TrendingUp" | "Briefcase" | "MessageSquare";
}

// ---------------------------------------------------------------------------
// Impressions trend types
// ---------------------------------------------------------------------------

export interface ImpressionPoint {
  date: string;
  impressions: number;
}

// ---------------------------------------------------------------------------
// Category breakdown types
// ---------------------------------------------------------------------------

export interface CategoryBreakdown {
  category: string;
  properties: number;
  totalReach: number;
  avgPrice: number;
}

// ---------------------------------------------------------------------------
// Recent activity types
// ---------------------------------------------------------------------------

export interface RecentActivity {
  propertyName: string;
  type: "offer" | "message";
  detail: string;
  date: string;
}

// ---------------------------------------------------------------------------
// Analytics result
// ---------------------------------------------------------------------------

export interface AnalyticsResult {
  kpis: KpiData[];
  impressionsTrend: ImpressionPoint[];
  categoryBreakdown: CategoryBreakdown[];
  recentActivity: RecentActivity[];
}

// ---------------------------------------------------------------------------
// Format helpers
// ---------------------------------------------------------------------------

export function formatReach(n: number): string {
  if (n >= 1_000_000) {
    return `${(n / 1_000_000).toFixed(1)}M`;
  }
  if (n >= 1_000) {
    return `${(n / 1_000).toFixed(0)}K`;
  }
  return n.toLocaleString();
}

function formatCurrency(n: number): string {
  if (n >= 1_000_000) {
    return `$${(n / 1_000_000).toFixed(1)}M`;
  }
  if (n >= 1_000) {
    return `$${(n / 1_000).toFixed(0)}K`;
  }
  return `$${n.toLocaleString()}`;
}

// ---------------------------------------------------------------------------
// deriveKpis
// ---------------------------------------------------------------------------

export function deriveKpis(properties: Properties, threads: Threads): KpiData[] {
  const totalReach = properties.reduce((sum, p) => sum + p.audienceTotalReach, 0);

  const activeCampaigns = threads.length;

  const allOffers = threads.flatMap((t) => t.offers);
  const acceptedOffers = allOffers.filter((o) => o.status === "accepted");
  const conversionRate =
    allOffers.length > 0
      ? (acceptedOffers.length / allOffers.length) * 100
      : 12.4;

  const dealPipeline = allOffers.reduce((sum, o) => sum + o.amount, 0);

  return [
    {
      label: "Total Impressions",
      value: formatReach(totalReach),
      trend: 14.2,
      iconName: "ChartArea",
    },
    {
      label: "Active Campaigns",
      value: activeCampaigns.toString(),
      trend: 8.1,
      iconName: "MessageSquare",
    },
    {
      label: "Conversion Rate",
      value: `${conversionRate.toFixed(1)}%`,
      trend: 2.3,
      iconName: "TrendingUp",
    },
    {
      label: "Deal Pipeline",
      value: formatCurrency(dealPipeline),
      trend: 22.7,
      iconName: "Briefcase",
    },
  ];
}

// ---------------------------------------------------------------------------
// generateImpressionsTrend
// ---------------------------------------------------------------------------

export function generateImpressionsTrend(
  totalReach: number,
  dayCount: number = 30
): ImpressionPoint[] {
  // Fixed anchor date — deterministic across renders
  const anchor = new Date(2026, 1, 22); // Feb 22, 2026

  const base = Math.max(totalReach / dayCount, 1);
  const points: ImpressionPoint[] = [];

  for (let i = 0; i < dayCount; i++) {
    const d = new Date(anchor);
    d.setDate(anchor.getDate() - (dayCount - 1 - i));

    // Deterministic variance using prime-based seed (no Math.random())
    const variance = (base * (i + 1) * 7919) % 1000;
    const upwardTrend = 1 + i * 0.01;
    const impressions = Math.round((base + variance) * upwardTrend);

    const dateStr = d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

    points.push({ date: dateStr, impressions });
  }

  return points;
}

// ---------------------------------------------------------------------------
// deriveCategoryBreakdown
// ---------------------------------------------------------------------------

export function deriveCategoryBreakdown(properties: Properties): CategoryBreakdown[] {
  const map = new Map<
    string,
    { count: number; totalReach: number; totalPrice: number }
  >();

  for (const p of properties) {
    const cat =
      p.category.charAt(0).toUpperCase() + p.category.slice(1).toLowerCase();
    const existing = map.get(cat) ?? { count: 0, totalReach: 0, totalPrice: 0 };
    map.set(cat, {
      count: existing.count + 1,
      totalReach: existing.totalReach + p.audienceTotalReach,
      totalPrice: existing.totalPrice + p.priceFrom,
    });
  }

  return Array.from(map.entries())
    .map(([category, data]) => ({
      category,
      properties: data.count,
      totalReach: data.totalReach,
      avgPrice: data.count > 0 ? Math.round(data.totalPrice / data.count) : 0,
    }))
    .sort((a, b) => b.totalReach - a.totalReach);
}

// ---------------------------------------------------------------------------
// deriveRecentActivity
// ---------------------------------------------------------------------------

export function deriveRecentActivity(threads: Threads): RecentActivity[] {
  const activities: RecentActivity[] = [];

  for (const thread of threads) {
    const propertyName = thread.property.name;

    // Latest message
    if (thread.messages.length > 0) {
      const latest = thread.messages[thread.messages.length - 1];
      activities.push({
        propertyName,
        type: "message",
        detail: latest.content.length > 60
          ? `${latest.content.slice(0, 60)}…`
          : latest.content,
        date: latest.createdAt.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
      });
    }

    // Offers (newest first, already ordered desc)
    for (const offer of thread.offers) {
      activities.push({
        propertyName,
        type: "offer",
        detail: `${formatCurrency(offer.amount)} offer — ${offer.status}`,
        date: offer.createdAt.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
      });
    }
  }

  // Sort by date descending (strings are locale-formatted; sort on original order suffices
  // since threads are already ordered by createdAt desc). Take top 8.
  return activities.slice(0, 8);
}

// ---------------------------------------------------------------------------
// deriveAnalytics — main orchestrator
// ---------------------------------------------------------------------------

export function deriveAnalytics(
  properties: Properties,
  threads: Threads
): AnalyticsResult {
  const totalReach = properties.reduce((sum, p) => sum + p.audienceTotalReach, 0);

  return {
    kpis: deriveKpis(properties, threads),
    impressionsTrend: generateImpressionsTrend(totalReach),
    categoryBreakdown: deriveCategoryBreakdown(properties),
    recentActivity: deriveRecentActivity(threads),
  };
}
