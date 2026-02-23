// ---------------------------------------------------------------------------
// Stub data — deterministic mock data for Campaigns and Deals
// NO Math.random() — all hardcoded values
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Campaign types and data
// ---------------------------------------------------------------------------

export interface MockCampaign {
  id: string;
  name: string;
  property: string;
  status: "active" | "paused" | "completed";
  startDate: string;
  endDate: string;
  budget: number;
  spend: number;
  impressions: number;
  clicks: number;
}

export function getMockCampaigns(): MockCampaign[] {
  return [
    {
      id: "cmp-001",
      name: "Coachella Spring Activation",
      property: "Coachella Valley Music and Arts Festival",
      status: "active",
      startDate: "2026-01-15",
      endDate: "2026-04-30",
      budget: 45000,
      spend: 28400,
      impressions: 872000,
      clicks: 14200,
    },
    {
      id: "cmp-002",
      name: "Austin Food & Wine Main Stage",
      property: "Austin Food & Wine Festival",
      status: "active",
      startDate: "2026-02-01",
      endDate: "2026-05-15",
      budget: 32000,
      spend: 11600,
      impressions: 415000,
      clicks: 8750,
    },
    {
      id: "cmp-003",
      name: "Jazz in the Park Season Sponsor",
      property: "Jazz in the Park",
      status: "paused",
      startDate: "2026-01-10",
      endDate: "2026-06-30",
      budget: 18000,
      spend: 9200,
      impressions: 234000,
      clicks: 4900,
    },
    {
      id: "cmp-004",
      name: "X Games Extreme Partnership",
      property: "X Games Aspen",
      status: "completed",
      startDate: "2026-01-01",
      endDate: "2026-02-28",
      budget: 25000,
      spend: 24800,
      impressions: 641000,
      clicks: 12300,
    },
    {
      id: "cmp-005",
      name: "Sundance Film Lounge",
      property: "Sundance Film Festival",
      status: "completed",
      startDate: "2026-01-05",
      endDate: "2026-01-31",
      budget: 15000,
      spend: 14750,
      impressions: 318000,
      clicks: 6400,
    },
    {
      id: "cmp-006",
      name: "SXSW Interactive Brand Hub",
      property: "SXSW Interactive",
      status: "active",
      startDate: "2026-02-15",
      endDate: "2026-05-31",
      budget: 38000,
      spend: 7200,
      impressions: 153000,
      clicks: 3100,
    },
    {
      id: "cmp-007",
      name: "New Orleans Jazz Fest Title",
      property: "New Orleans Jazz & Heritage Festival",
      status: "active",
      startDate: "2026-02-20",
      endDate: "2026-06-15",
      budget: 28000,
      spend: 4100,
      impressions: 97000,
      clicks: 2800,
    },
  ];
}

// ---------------------------------------------------------------------------
// Campaign stats (derived — no randomness)
// ---------------------------------------------------------------------------

export interface CampaignKpi {
  label: string;
  value: string;
  trend: number;
  iconName: "DollarSign" | "Activity" | "BarChart2" | "MousePointerClick";
}

export function getCampaignStats(): CampaignKpi[] {
  const campaigns = getMockCampaigns();

  const totalSpend = campaigns.reduce((sum, c) => sum + c.spend, 0);
  const activeCampaigns = campaigns.filter((c) => c.status === "active").length;
  const totalImpressions = campaigns.reduce((sum, c) => sum + c.impressions, 0);
  const avgImpressions = Math.round(totalImpressions / campaigns.length);
  const totalClicks = campaigns.reduce((sum, c) => sum + c.clicks, 0);

  function formatCurrency(n: number): string {
    if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
    return `$${n.toLocaleString()}`;
  }

  function formatNumber(n: number): string {
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
    return n.toLocaleString();
  }

  return [
    {
      label: "Total Spend",
      value: formatCurrency(totalSpend),
      trend: 18.4,
      iconName: "DollarSign",
    },
    {
      label: "Active Campaigns",
      value: activeCampaigns.toString(),
      trend: 33.3,
      iconName: "Activity",
    },
    {
      label: "Avg. Impressions",
      value: formatNumber(avgImpressions),
      trend: 11.7,
      iconName: "BarChart2",
    },
    {
      label: "Total Clicks",
      value: formatNumber(totalClicks),
      trend: 9.2,
      iconName: "MousePointerClick",
    },
  ];
}

// ---------------------------------------------------------------------------
// Deal types and data
// ---------------------------------------------------------------------------

export interface MockDeal {
  id: string;
  property: string;
  stage: "prospect" | "negotiating" | "agreed" | "live";
  value: number;
  contact: string;
  lastActivity: string;
  category: string;
}

export function getMockDeals(): MockDeal[] {
  return [
    {
      id: "deal-001",
      property: "Coachella Valley Music and Arts Festival",
      stage: "live",
      value: 45000,
      contact: "Morgan Lee",
      lastActivity: "2026-02-20",
      category: "music",
    },
    {
      id: "deal-002",
      property: "Austin Food & Wine Festival",
      stage: "live",
      value: 32000,
      contact: "Sarah Chen",
      lastActivity: "2026-02-19",
      category: "food",
    },
    {
      id: "deal-003",
      property: "SXSW Interactive",
      stage: "agreed",
      value: 38000,
      contact: "James Rivera",
      lastActivity: "2026-02-18",
      category: "tech",
    },
    {
      id: "deal-004",
      property: "New Orleans Jazz & Heritage Festival",
      stage: "agreed",
      value: 28000,
      contact: "Priya Patel",
      lastActivity: "2026-02-17",
      category: "music",
    },
    {
      id: "deal-005",
      property: "Bonnaroo Music & Arts Festival",
      stage: "negotiating",
      value: 22000,
      contact: "Alex Thompson",
      lastActivity: "2026-02-16",
      category: "music",
    },
    {
      id: "deal-006",
      property: "Lollapalooza Chicago",
      stage: "negotiating",
      value: 50000,
      contact: "Dana Kim",
      lastActivity: "2026-02-15",
      category: "music",
    },
    {
      id: "deal-007",
      property: "Tribeca Film Festival",
      stage: "negotiating",
      value: 15000,
      contact: "Jordan Walsh",
      lastActivity: "2026-02-14",
      category: "film",
    },
    {
      id: "deal-008",
      property: "Telluride Bluegrass Festival",
      stage: "prospect",
      value: 8000,
      contact: "Sam Nguyen",
      lastActivity: "2026-02-13",
      category: "music",
    },
    {
      id: "deal-009",
      property: "Aspen Ideas Festival",
      stage: "prospect",
      value: 12000,
      contact: "Riley Brooks",
      lastActivity: "2026-02-12",
      category: "ideas",
    },
    {
      id: "deal-010",
      property: "Outside Lands Music Festival",
      stage: "prospect",
      value: 3000,
      contact: "Casey Reyes",
      lastActivity: "2026-02-11",
      category: "music",
    },
  ];
}
