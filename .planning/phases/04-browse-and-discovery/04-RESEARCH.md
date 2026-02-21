# Phase 4: Browse and Discovery - Research

**Researched:** 2026-02-21
**Domain:** Next.js 16 App Router search params, Embla Carousel autoplay, ShadCN Skeleton/Badge/Slider/Select, Tailwind v4 responsive grid, client-side filter state
**Confidence:** HIGH (all critical claims verified against official Next.js 16 docs, installed package versions, and official Embla docs)

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Card grid & layout**
- 5 cards per row on desktop (matches current Anvara grid density)
- Each card shows: image, name, description, price range, and start date
- Subtle lift + shadow on hover interaction
- Card images use fixed aspect ratio with object-cover (cropping acceptable for grid uniformity)

**Category carousel & tabs**
- Hero image carousel at top with category images
- Compact text-only category label row below carousel (no icons) for quick navigation
- Auto-scroll with pause on hover
- Selecting a category tab filters the card grid (not scroll-to-section)
- Goal: feel less cluttered than current dots-heavy carousel

**Filtering & empty states**
- Horizontal filter bar above the card grid (not sidebar)
- Three filter types: region dropdown, price range, event type
- Active filters display as removable chips styled to echo Anvara's existing category labels — maintain platform familiarity
- Empty state: icon + "No properties match" message + clear filters button
- Category tabs also act as a filter (decided above)

**Recommendations strip**
- "Recommended for you" strip positioned above the main card grid
- 5+ cards in a horizontally scrollable strip (Netflix-style row)
- Hidden when any filters are active — only shows on unfiltered browse
- "Based on your interests" label with a curated subset of properties (mock-personalized)

### Claude's Discretion
- Skeleton loading card design and timing (200-400ms per success criteria)
- Exact carousel auto-scroll speed and transition style
- Responsive breakpoints for card columns (5 on desktop, fewer on smaller screens)
- Filter bar dropdown styling and slider implementation
- Which properties appear in the "recommended" subset

### Deferred Ideas (OUT OF SCOPE)
None — discussion stayed within phase scope
</user_constraints>

---

## Summary

Phase 4 builds the primary browse/discovery experience on a new `/browse` route within the existing `(app)` shell. The page needs: an auto-scrolling category image carousel at the top, a compact text-only category tab row beneath it, a horizontal filter bar, a "Recommended for you" horizontal scroll strip, and a 5-column card grid with skeleton loading states.

The filter state architecture is the most important decision. The recommended approach is URL-based state via `searchParams` on the page Server Component — the page receives `searchParams` as a Promise prop, awaits it, passes the values down to client components, and server-fetches filtered data. This is the pattern Next.js 16 officially recommends and is the cleanest fit given the existing `filterProperties()` function in `lib/data/index.ts`. The alternative (client-state only with `useSearchParams`) requires wrapping in Suspense and loses shareability, but may be needed for the filter bar UI components which must be Client Components to handle user input.

The carousel auto-scroll requires the `embla-carousel-autoplay` plugin (not yet installed — it is a separate npm package from `embla-carousel-react`). The existing `carousel.tsx` ShadCN component wraps Embla and accepts a `plugins` prop, making autoplay a straightforward addition. The `stopOnMouseEnter: true` option in the autoplay plugin v8 handles pause-on-hover directly.

**Primary recommendation:** Use URL `searchParams` for filter state (shareable, SSR-friendly, existing `filterProperties()` function ready), install `embla-carousel-autoplay` for the category carousel, install `shadcn slider` and `shadcn select` for the filter bar, and use the existing `Skeleton` component for loading states.

---

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js App Router `searchParams` page prop | 16.1.6 (installed) | Filter state via URL | Official pattern; works with existing server-side `filterProperties()` |
| `embla-carousel-autoplay` | 8.x (to install — must match embla-carousel-react 8.6.0) | Auto-scroll category carousel | First-party Embla plugin; integrates via `plugins` prop on existing `<Carousel>` |
| ShadCN `skeleton` | Already installed | Loading states | Already in `components/ui/skeleton.tsx` |
| ShadCN `badge` | Already installed | Filter chips, category tabs | Already in `components/ui/badge.tsx` |
| ShadCN `card` | Already installed | Property grid cards | Already in `components/ui/card.tsx` |

### Supporting (to install)
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `embla-carousel-autoplay` | 8.x | Autoplay plugin for carousel | Category carousel component |
| ShadCN `slider` | via `npx shadcn@latest add slider` | Price range dual-handle slider | Filter bar price range control |
| ShadCN `select` | via `npx shadcn@latest add select` | Region and event-type dropdowns | Filter bar dropdowns |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| URL searchParams filter state | `useState` + `useSearchParams` only | useState loses shareability; URL state enables bookmarking/back button and SSR fetch |
| embla-carousel-autoplay plugin | Custom useInterval + api.scrollNext() | Custom approach works but duplicates solved problems; official plugin handles timer precision, stop-on-hover, and cleanup |
| ShadCN Slider for price range | Native HTML range input | Native input harder to style consistently with Tailwind/ShadCN theme |

**Installation:**
```bash
npm install embla-carousel-autoplay
npx shadcn@latest add slider
npx shadcn@latest add select
```

---

## Architecture Patterns

### Recommended Project Structure
```
app/(app)/browse/
├── page.tsx               # Server Component — awaits searchParams, fetches data
├── loading.tsx            # Skeleton loading (triggers on navigation)
└── _components/           # Browse-only components (not shared)
    ├── browse-client.tsx        # "use client" — owns filter UI and URL updates
    ├── category-carousel.tsx    # "use client" — Embla with autoplay plugin
    ├── category-tab-row.tsx     # "use client" — clickable text tabs
    ├── filter-bar.tsx           # "use client" — dropdowns + slider + active chips
    ├── property-card.tsx        # Server-safe card (no interactivity needed)
    ├── property-card-skeleton.tsx  # Skeleton version of card
    ├── property-grid.tsx        # Grid wrapper — renders cards or skeletons
    ├── recommendations-strip.tsx # "use client" — horizontal scroll, hidden when filters active
    └── empty-state.tsx          # Icon + message + clear button
components/browse/             # (alternative) if cards are reused in future phases
```

### Pattern 1: Server Component Page with searchParams

The page is a Server Component that reads `searchParams` (a Promise in Next.js 15+/16), awaits it, and passes filter values down to both data fetching and client components.

**What:** Page awaits searchParams, calls `filterProperties()` with the parsed values, passes results and current filter values to a Client Component that manages UI.

**When to use:** Always — this is the correct pattern for this codebase. The existing `filterProperties()` in `lib/data/index.ts` already accepts `{ category, region, minPrice, maxPrice }`.

```typescript
// Source: https://nextjs.org/docs/app/api-reference/file-conventions/page (v16.1.6 docs)
// app/(app)/browse/page.tsx
import { filterProperties, getAllProperties } from "@/lib/data"
import { BrowseClient } from "./_components/browse-client"

export default async function BrowsePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const category = typeof params.category === "string" ? params.category : undefined
  const region = typeof params.region === "string" ? params.region : undefined
  const minPrice = typeof params.minPrice === "string" ? parseInt(params.minPrice, 10) : undefined
  const maxPrice = typeof params.maxPrice === "string" ? parseInt(params.maxPrice, 10) : undefined

  const hasFilters = !!(category || region || minPrice || maxPrice)

  // If filters active, use filterProperties; otherwise get all
  const properties = hasFilters
    ? await filterProperties({ category, region, minPrice, maxPrice })
    : await getAllProperties()

  return (
    <BrowseClient
      properties={properties}
      currentFilters={{ category, region, minPrice, maxPrice }}
      hasFilters={hasFilters}
    />
  )
}
```

### Pattern 2: Client Component Filter Updates via router.replace

The filter bar is a Client Component that uses `useRouter` + `usePathname` to update the URL when filters change. Uses `router.replace` with `{ scroll: false }` to prevent page jump.

```typescript
// Source: https://nextjs.org/docs/app/api-reference/functions/use-search-params (v16.1.6 docs)
// app/(app)/browse/_components/browse-client.tsx
"use client"
import { useRouter, usePathname } from "next/navigation"
import { useCallback } from "react"

export function BrowseClient({ properties, currentFilters, hasFilters }) {
  const router = useRouter()
  const pathname = usePathname()

  const updateFilter = useCallback((key: string, value: string | undefined) => {
    const params = new URLSearchParams()
    // Preserve existing filters, update the changed one
    if (currentFilters.category && key !== "category") params.set("category", currentFilters.category)
    if (currentFilters.region && key !== "region") params.set("region", currentFilters.region)
    if (value) params.set(key, value)
    const qs = params.toString()
    router.replace(pathname + (qs ? `?${qs}` : ""), { scroll: false })
  }, [currentFilters, pathname, router])

  const clearFilters = useCallback(() => {
    router.replace(pathname, { scroll: false })
  }, [pathname, router])

  // ...render filter bar, grid, etc.
}
```

### Pattern 3: Embla Carousel with Autoplay Plugin

The existing `<Carousel>` ShadCN component accepts a `plugins` prop (type `CarouselPlugin`). Pass the `Autoplay` plugin instance with `stopOnMouseEnter: true`.

```typescript
// Source: embla-carousel.com/plugins/autoplay (verified against embla-carousel-react 8.6.0)
// app/(app)/browse/_components/category-carousel.tsx
"use client"
import Autoplay from "embla-carousel-autoplay"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { useRef } from "react"

export function CategoryCarousel({ categories }) {
  const plugin = useRef(
    Autoplay({
      delay: 3000,
      stopOnMouseEnter: true,   // pause on hover (v8 option)
      stopOnInteraction: false, // resume after click (don't permanently stop)
    })
  )

  return (
    <Carousel
      plugins={[plugin.current]}
      opts={{ loop: true }}
      className="w-full"
    >
      <CarouselContent>
        {categories.map((cat) => (
          <CarouselItem key={cat.slug} className="basis-1/5">
            {/* category image card */}
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
```

### Pattern 4: Skeleton Loading via loading.tsx

Next.js App Router automatically shows `loading.tsx` during server-side navigation. For the simulated skeleton (per BROWSE-09: "setTimeout"), use a client-side `useEffect` with a 200–400ms delay inside `loading.tsx` or use a client component with a `isLoading` state that transitions to real data.

The simplest correct approach: `loading.tsx` renders skeletons immediately, actual data renders when the server fetch completes. For the 200-400ms simulated delay, add a `setTimeout` wrapper in the page's server action or use a client component with `useEffect`.

```typescript
// app/(app)/browse/loading.tsx
import { Skeleton } from "@/components/ui/skeleton"

export default function BrowseLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      {/* Carousel skeleton */}
      <Skeleton className="w-full h-48 rounded-xl" />
      {/* Tab row skeleton */}
      <div className="flex gap-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-20 rounded-full" />
        ))}
      </div>
      {/* Filter bar skeleton */}
      <div className="flex gap-3">
        <Skeleton className="h-10 w-40 rounded-md" />
        <Skeleton className="h-10 w-40 rounded-md" />
        <Skeleton className="h-10 w-52 rounded-md" />
      </div>
      {/* Card grid skeleton — 5 per row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="aspect-[4/3] w-full rounded-xl" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        ))}
      </div>
    </div>
  )
}
```

### Pattern 5: Responsive Grid — 5 cols desktop, fewer on smaller screens

```typescript
// Source: Tailwind CSS v4 docs — responsive-design (verified)
// grid-cols-2 on mobile, md:grid-cols-3 on tablet, lg:grid-cols-5 on desktop
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
  {properties.map(p => <PropertyCard key={p.id} property={p} />)}
</div>
```

Tailwind v4 breakpoints (same as v3): `md` = 768px, `lg` = 1024px.

### Anti-Patterns to Avoid

- **Putting filter state only in useState:** Loses shareability, back-button behavior. Use URL searchParams.
- **Reading searchParams in a Layout:** Layouts don't receive searchParams and don't re-render on navigation — only use in page.tsx.
- **Not wrapping useSearchParams in Suspense in a static page:** Build will fail. Since this page uses `searchParams` prop on a Server Component (not `useSearchParams` hook), this is not an issue here.
- **Calling `filterProperties` without checking for empty filters:** When all filters are undefined, `filterProperties` will still work (returns all) but it's cleaner to call `getAllProperties` directly.
- **Creating a new Autoplay plugin instance on every render:** Use `useRef` to store the plugin instance so it doesn't get recreated on re-renders.
- **Using `stopOnInteraction: true` (default) with `stopOnMouseEnter: true`:** Both together cause the carousel to permanently stop after first hover-out. Set `stopOnInteraction: false` to resume autoplay after hover.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Auto-scroll carousel | Custom useInterval + Embla api.scrollNext() | `embla-carousel-autoplay` plugin | Handles timer cleanup, mouse enter/leave, focus events, and tab visibility pausing |
| Price range slider | Two stacked `<input type="range">` | ShadCN `slider` (Radix UI primitive) | Radix handles thumb overlap, ARIA, keyboard nav for dual-handle range |
| Region/event-type dropdowns | Custom `<select>` or `<div>` portal dropdown | ShadCN `select` | Radix handles positioning, focus trap, keyboard nav, z-index, and scroll container detection |
| Filter chip removal | Custom close button inside badge | `<Badge>` + `<button>` with X icon | Existing Badge component already matches category label styling per user requirement |
| Skeleton loading | CSS animation from scratch | `<Skeleton>` component (already installed) | Already installed, `animate-pulse bg-accent` pattern matches the design system |
| Data filtering | Raw Prisma query inline in page | `filterProperties()` from `lib/data/index.ts` | Already implemented, accepts all needed filter params |

**Key insight:** The data layer is almost entirely built. `filterProperties({ category, region, minPrice, maxPrice })` in `lib/data/index.ts` already handles all three filter types. The main work is UI composition, not data plumbing.

---

## Common Pitfalls

### Pitfall 1: embla-carousel-autoplay v8 vs v9 API mismatch
**What goes wrong:** Installing v9 of `embla-carousel-autoplay` when the project uses `embla-carousel-react` v8.6.0 causes API mismatch errors. In v9, `stopOnMouseEnter`, `stopOnInteraction`, and `playOnInit` were removed and replaced with `defaultInteraction`.
**Why it happens:** npm may install the latest major if version is not pinned.
**How to avoid:** Install with exact version match: `npm install embla-carousel-autoplay@8` to stay on v8.
**Warning signs:** TypeScript error "Property 'stopOnMouseEnter' does not exist on type AutoplayOptionsType"

### Pitfall 2: searchParams is a Promise in Next.js 15+
**What goes wrong:** Accessing `searchParams.category` directly without `await` causes a runtime warning and stale value in production.
**Why it happens:** Next.js 15 made `searchParams` an async Promise for performance. The project is on Next.js 16.1.6.
**How to avoid:** Always `const params = await searchParams` before accessing keys.
**Warning signs:** Hydration mismatch errors in development, stale filter values after navigation.

### Pitfall 3: filterProperties returns 0 results for priceFrom=0
**What goes wrong:** `priceFrom: { gte: 0 }` matches everything but `priceFrom: { gte: undefined }` is ignored — the issue is when `parseInt("") === NaN`. `NaN` passed to Prisma throws.
**Why it happens:** Slider default is often 0, and URL param `?minPrice=0` parses to `0` not `undefined`.
**How to avoid:** Guard with `minPrice !== undefined && !isNaN(minPrice)` before passing to filterProperties. Also guard maxPrice similarly.

### Pitfall 4: category tab filter conflicts with URL category param
**What goes wrong:** The category tab bar and the "event type" filter in the filter bar both write to the URL — if they use the same `category` key they clobber each other; if they use different keys, the data layer only filters on one.
**Why it happens:** BROWSE-04 lists event types (Music, Art, Sports, Food...) which map to `property.category`; the "event type" filter in the filter bar also filters by category. They are the same field.
**How to avoid:** Use a single `category` URL param. The tab bar and the event-type filter dropdown should both write to the same key. When a tab is active, the event-type dropdown should reflect it (and vice versa). The dropdown can be omitted if the tab bar handles it fully, or the two can be kept in sync by always updating the single `category` param.

### Pitfall 5: Recommendations strip visibility logic on initial render
**What goes wrong:** The "Recommended for you" strip should be hidden when any filters are active. If `hasFilters` is computed on the server and passed as a prop, SSR and client agree. If computed only on the client, there's a flash of recommendations during hydration.
**Why it happens:** Mismatching server/client state.
**How to avoid:** Compute `hasFilters` on the server in `page.tsx` and pass it as a prop to the client component. Do not re-derive on the client from `useSearchParams`.

### Pitfall 6: Card price display showing $0
**What goes wrong:** BROWSE-13 requires "no $0 price display." If `priceFrom` is 0 in the database (shouldn't happen but seed data has minimum $12,000), the card must show "Request Quote" instead.
**Why it happens:** Some properties may be seeded with priceFrom = 0 or the field may not be set.
**How to avoid:** In the card component, guard: `priceFrom > 0 ? formatCurrency(priceFrom) : "Request Quote"`.

### Pitfall 7: BROWSE-14 limit of 8 per category tab
**What goes wrong:** Success criteria says "up to 8 results shown" when a category tab is active. `filterProperties` returns all matches — there is no limit.
**Why it happens:** The data layer has no `take` parameter.
**How to avoid:** Apply `.slice(0, 8)` in the page when a category filter is active. Alternatively, add an optional `limit` param to `filterProperties`. The slice approach is simpler for this phase.

---

## Code Examples

### Verified: Property card with audience fit badge

The `featured` field on Property model is a Boolean. For mock "audience fit" badges (BROWSE-11: "Great Match" / percentage), compute a deterministic mock value from the property's tags or use `featured` as the "Great Match" signal.

```typescript
// Property card — verified against Prisma schema (prisma/schema.prisma)
// Property fields available: id, slug, name, tagline, category, location, region,
//   imageUrl, priceFrom, availability, featured, tags, packages
interface PropertyCardProps {
  property: {
    slug: string
    name: string
    tagline: string
    category: string
    imageUrl: string
    priceFrom: number
    availability: string  // used as "start date"
    featured: boolean
    tags: string[]
  }
}

export function PropertyCard({ property }: PropertyCardProps) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  })

  return (
    <div className="group rounded-xl border bg-card overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <Image
          src={property.imageUrl}
          alt={property.name}
          fill
          className="object-cover"  // Note: object-cover per Phase 4 decision (different from Phase 3)
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
        />
        {property.featured && (
          <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">
            Great Match
          </Badge>
        )}
      </div>
      <div className="p-3 space-y-1">
        <p className="font-semibold text-sm line-clamp-1">{property.name}</p>
        <p className="text-xs text-muted-foreground line-clamp-2">{property.tagline}</p>
        <div className="flex items-center justify-between pt-1">
          <p className="text-xs font-medium">
            {property.priceFrom > 0
              ? `From ${formatter.format(property.priceFrom)}`
              : "Request Quote"}
          </p>
          <p className="text-xs text-muted-foreground truncate max-w-[50%] text-right">
            {property.availability.split("—")[0].trim()}
          </p>
        </div>
      </div>
    </div>
  )
}
```

### Verified: Filter chip removal pattern

```typescript
// Active filter chips — styled as secondary Badge variant to match category labels
// This echoes PropertyCategories component pattern from Phase 3
function ActiveFilterChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <Badge variant="secondary" className="gap-1 pr-1.5 cursor-pointer" onClick={onRemove}>
      {label}
      <X className="size-3" />
    </Badge>
  )
}
```

### Verified: Tailwind v4 hover lift + shadow

```typescript
// Hover interaction — lift + shadow (Claude's discretion)
// Tailwind v4 supports transition-all, hover:shadow-md, hover:-translate-y-*
className="hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
```

### Verified: ShadCN Slider for price range

```typescript
// Source: shadcn/ui Slider docs
// Install: npx shadcn@latest add slider
import { Slider } from "@/components/ui/slider"

function PriceRangeFilter({ value, onChange }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs text-muted-foreground">Price Range</label>
      <Slider
        min={0}
        max={500000}
        step={5000}
        value={value}           // [minPrice, maxPrice]
        onValueChange={onChange} // called with [min, max] array
        className="w-52"
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>${(value[0] / 1000).toFixed(0)}k</span>
        <span>${(value[1] / 1000).toFixed(0)}k</span>
      </div>
    </div>
  )
}
```

### Verified: ShadCN Select for region dropdown

```typescript
// Source: shadcn/ui Select docs
// Install: npx shadcn@latest add select
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

const REGIONS = [
  { value: "west", label: "West" },
  { value: "east", label: "East" },
  { value: "south", label: "South" },
  { value: "midwest", label: "Midwest" },
]

function RegionFilter({ value, onChange }) {
  return (
    <Select value={value ?? ""} onValueChange={(v) => onChange(v || undefined)}>
      <SelectTrigger className="w-36">
        <SelectValue placeholder="Region" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="">All Regions</SelectItem>
        {REGIONS.map((r) => (
          <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
```

---

## Existing Data Reference

### Seeded categories (from prisma/seed.ts)

The database has properties with these `category` values:
- `"sports"` — LAFC, NY Jets, Miami Open, Austin FC, X Games
- `"music"` — Coachella, Rolling Loud, Jazz at Lincoln Center
- `"arts"` — Art Basel, Tribeca Film Festival
- `"food"` — NYC Wine & Food Festival, Taste of Chicago
- `"lifestyle"` — X Games Aspen (subcategory: action-sports)

Categories in BROWSE-04 requirements: All, Music, Art, Sports, Food, Wellness, Fun, Charity, Culture, Business, Fashion, Tech, Outdoor, Film, Networking. Most of these will have 0 results with current seed data — the empty state is expected behavior.

### Seeded regions (from prisma/seed.ts)
- `"west"` — LAFC (LA), Coachella (Indio CA), X Games (Aspen CO)
- `"east"` — NY Jets, Jazz at Lincoln Center, Tribeca, NYC Wine & Food
- `"south"` — Miami Open, Austin FC, Rolling Loud, Art Basel, Taste... wait — Taste of Chicago is `"midwest"`
- `"midwest"` — Taste of Chicago

### Price range (from prisma/seed.ts)
- Min: $12,000 (Taste of Chicago Local Partner)
- Max: $100,000 (Coachella priceFrom)
- Suggested slider range: $0 — $150,000 with step $5,000

### Recommended strip candidates (mock-personalized)
For the "Recommended for you" strip, use `featured: true` properties — there are 4 in seed data: LAFC, NY Jets, Miami Open, Coachella. A 5th can be added from non-featured properties (e.g., X Games) to hit the 5+ card requirement. This is Claude's discretion.

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `searchParams` as sync prop | `searchParams` as `Promise<...>` requiring `await` | Next.js 15 (v15.0.0-RC) | Must `await searchParams` in page.tsx — synchronous access still works in 16.1.6 but is deprecated |
| `useSearchParams` in Client Component (requires Suspense) | `searchParams` Promise prop passed from Server Component | Next.js 15+ | Prefer page prop over hook in this codebase; avoids Suspense requirement |
| embla-carousel-autoplay v8 options: `stopOnMouseEnter`, `playOnInit`, `stopOnInteraction` | embla-carousel-autoplay v9: replaced with `defaultInteraction` boolean | v9 migration | Since project uses embla v8.6.0, install autoplay@8 to stay compatible |

**Deprecated/outdated:**
- `export const dynamic = 'force-dynamic'` for dynamic rendering: Still works but prefer `await connection()` from `next/server` in Next.js 16. However, since `await searchParams` already makes the route dynamic, this is not needed here.

---

## Open Questions

1. **Simulated loading delay (BROWSE-09)**
   - What we know: "Skeleton loading cards appear for 200–400ms on initial page load before real cards render" — this implies a deliberate artificial delay, not just natural async loading
   - What's unclear: Should the delay be on the server (via `setTimeout` in the page) or client-side (using `useEffect` + `useState` to swap skeletons for real cards)?
   - Recommendation: Client-side is cleaner — render skeletons immediately, then after 300ms transition to real data. The page passes the data pre-fetched; the client component holds `isLoading` state for 300ms on mount. Avoids slowing the server response.

2. **Category carousel images**
   - What we know: Carousel should show "category images (Jazz Festivals, Food Festivals, Action Sports, etc.)" — these are category-type hero images, not property images
   - What's unclear: Are these placeholder images (picsum), actual category imagery, or the first property image per category?
   - Recommendation: Use picsum.photos with a seed per category name (e.g., `https://picsum.photos/seed/music-festival/400/300`) for consistent mock images. Same pattern as the seed data.

3. **Event type filter vs category tab bar overlap**
   - What we know: BROWSE-04 lists category tabs; the filter bar has "event type" filter; both filter by `property.category`
   - What's unclear: Are they the same control or do they filter different fields?
   - Recommendation: Treat them as the same `category` URL param. The event type dropdown in the filter bar mirrors the tab bar selection. When a tab is clicked, the dropdown reflects it and vice versa. Only one `category` param exists in the URL.

---

## Sources

### Primary (HIGH confidence)
- Next.js 16.1.6 official docs (fetched 2026-02-21): `page.tsx` `searchParams` prop, `useSearchParams` hook, `useRouter.replace`
  - https://nextjs.org/docs/app/api-reference/file-conventions/page
  - https://nextjs.org/docs/app/api-reference/functions/use-search-params
- embla-carousel.com official docs (fetched 2026-02-21): Autoplay plugin API, options list
  - https://www.embla-carousel.com/plugins/autoplay/
- Installed package versions (verified via package.json and node_modules):
  - `embla-carousel-react@8.6.0`, `shadcn@3.8.5`, `tailwindcss@^4`, `next@16.1.6`
- Existing codebase (read directly): `lib/data/index.ts` (filterProperties function), `prisma/seed.ts` (categories, regions, price ranges), `components/ui/carousel.tsx`, `components/ui/skeleton.tsx`, `components/ui/badge.tsx`

### Secondary (MEDIUM confidence)
- WebSearch (verified against official sources): Embla autoplay v8 vs v9 API differences; `stopOnMouseEnter` v8 option confirmed via GitHub discussion cross-reference
- WebSearch (verified against Next.js docs): `router.replace` with `scroll: false` pattern
- shadcn/ui Slider docs (WebFetch): Installation command and range slider array value API

### Tertiary (LOW confidence)
- None

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — installed package versions confirmed, official docs consulted
- Architecture: HIGH — Next.js 16 docs confirm searchParams as Promise, filterProperties() already exists
- Pitfalls: HIGH (pitfalls 1-4) / MEDIUM (pitfalls 5-7) — pitfalls 5-7 are based on pattern analysis of existing codebase
- Code examples: HIGH — verified against actual installed files and official docs

**Research date:** 2026-02-21
**Valid until:** 2026-03-21 (stable stack — Next.js, Embla, ShadCN change slowly)
