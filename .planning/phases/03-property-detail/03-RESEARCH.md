# Phase 3: Property Detail - Research

**Researched:** 2026-02-21
**Domain:** Next.js 16 dynamic routes, ShadCN Carousel/Chart/Dialog/Badge/Tabs, Recharts, Tailwind sticky layout
**Confidence:** HIGH (all critical claims verified against official docs and installed package versions)

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Page layout & hero section**
- 60/40 split at top: left side is a single image with carousel (dots/arrows to cycle), right side is sticky offer sidebar
- Images must be properly contained — no cropping tops/bottoms, no oversized full-width banners
- Property metadata below the image carousel: name, category badge, date range, location
- The sidebar sticks as user scrolls down through the rest of the page (like Airbnb booking widget)

**Page flow (top to bottom)**
1. Hero row: Image carousel (60%) + Sticky sidebar (40%)
2. Property name + metadata (category, date, location)
3. About this Listing (truncated with "Read more" expand)
4. Tiers section (vertical layout)
5. Audience demographics (visual charts)
6. Ideal Brand Categories (chips/tags)
7. Activation Formats (chips/tags)

**Offer sidebar (sticky, right side)**
- Top: Minimum spend / starting price
- Primary CTA: "Make an Offer" button (green, prominent) — opens modal form overlay
- Secondary: "Message" button
- Tertiary: "Schedule Call" button
- Trust badges: "Verified Seller" and "Money Secured" — both kept, below CTAs
- "Build your own offer" section at bottom of sidebar

**Pricing tier display**
- Vertical layout with ascending prices (cheapest at top, most expensive at bottom)
- Clickable rows — selecting a tier expands its description/bullet list on the right side
- Selected tier highlighted with Anvara brand-colored border/accent, others stay muted
- Prices formatted as full dollar amounts with commas: $15,000 (never $0, never abbreviated)
- "Build your own offer" below tiers: structured form with fields for budget, desired deliverables (checkboxes), and notes

**About this Listing**
- Positioned ABOVE tiers — users should understand the property before seeing pricing
- Truncated to 3-4 lines with "Read more" to expand full description

**Audience demographics**
- Visual charts + numbers, not plain text lists
- Gender as a split bar chart
- Age as a distribution chart
- HHI as a range indicator
- Lifestyle categories visualized (not just bullets)

**Brand categories & activation formats**
- Both displayed as chip/tag pills in flowing rows
- Compact, scannable, visually distinct from body text

**Make an Offer CTA behavior**
- Opens a modal form overlay (stays on the detail page)
- Form fields: amount, terms — submit creates the offer
- Does NOT navigate away from the page

### Claude's Discretion
- Exact chart library/implementation for demographics
- Carousel animation and transition style
- Spacing, typography, and card styling within the overall layout
- Loading/error states for the detail page
- How "Schedule Call" behaves (placeholder or functional)
- Trust badge icon choices

### Deferred Ideas (OUT OF SCOPE)
- Documents section (DETAIL-12 explicitly deferred)
</user_constraints>

---

## Summary

Phase 3 builds the property detail page — the most component-dense page in the project. It requires four new ShadCN component installs (carousel, chart, dialog, badge), one new Tailwind layout pattern (60/40 sticky split), a dynamic route with async params (Next.js 16 breaking change fully in effect), and a modal form for offer submission.

The project runs Next.js 16.1.6 (confirmed from installed package), not 15. In Next.js 16, synchronous access to `params` has been **fully removed** — the codemod-era backward compatibility that existed in 15 is gone. Every dynamic route page must `await params` before accessing its values. This was already flagged as a Phase 3 blocker in STATE.md.

The demographic data is stored as structured strings in the schema (`"62% male, 38% female"`, `"18–34"`, `"premium"`). These strings must be parsed at render time to derive chart data. No schema changes are needed — parsing logic belongs in component helpers.

**Primary recommendation:** Use ShadCN Carousel (Embla), ShadCN Chart (Recharts), ShadCN Dialog, ShadCN Badge, and ShadCN Tabs installed via `npx shadcn@latest add`. All chart rendering should use `ChartContainer` from the ShadCN chart primitives wrapping Recharts components directly — no custom chart abstractions.

---

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 16.1.6 (installed) | Dynamic route page, data fetching | Already in project; params must be async |
| ShadCN Carousel | latest (via CLI) | Hero image carousel with dots/arrows | Built on Embla; integrates with existing ShadCN setup |
| ShadCN Chart | latest (via CLI) | Demographics visualizations | Built on Recharts; ShadCN-native, no extra abstraction |
| ShadCN Dialog | latest (via CLI) | "Make an Offer" modal form | Radix Dialog primitive, accessible, managed state |
| ShadCN Badge | latest (via CLI) | Brand category + activation format chips | Correct semantic component for chip/tag pills |
| ShadCN Tabs | latest (via CLI) | Alternative tier selector (if needed) | Available but context prefers click-to-expand rows |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| Recharts | installed by ShadCN Chart | Bar/line charts for demographics | Installed automatically with `shadcn add chart` |
| Embla Carousel | installed by ShadCN Carousel | Swipe/animation on image carousel | Installed automatically with `shadcn add carousel` |
| Lucide React | 0.575.0 (installed) | Trust badge icons, CTA icons | Already installed; use Shield, BadgeCheck, Lock, etc. |
| Next.js `notFound()` | built-in | 404 for unknown property slug/id | Call when Prisma returns null |
| `Intl.NumberFormat` | built-in | Price formatting ($15,000 style) | No library needed; browser/Node native |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| ShadCN Chart (Recharts) | Victory, Nivo, Chart.js | Recharts chosen because ShadCN Chart wraps it natively with matching color tokens and theming; no additional setup |
| ShadCN Carousel (Embla) | Custom CSS scroll-snap carousel | Embla adds swipe support, API for dots, and loop — worth the install over hand-rolling |
| ShadCN Dialog | Sheet (slide-over) | Dialog is correct for centered modal form; Sheet is for sidebars |
| ShadCN Badge | Custom `<span>` with classes | Badge is pre-styled to spec with variants; use `variant="secondary"` or `variant="outline"` for chips |

### Installation

```bash
# All four new components at once
npx shadcn@latest add carousel chart dialog badge

# If tier section needs tabs (check context: click-to-expand preferred)
npx shadcn@latest add tabs

# accordion (for "Read more" expand on About section — alternative to state-driven truncation)
npx shadcn@latest add accordion
```

Note: `npx shadcn@latest` is the correct command for this project (package.json lists `"shadcn": "^3.8.5"` as devDependency, and the project's radix-ui package is 1.4.3 with the unified radix-ui package pattern from Feb 2026).

---

## Architecture Patterns

### Recommended File Structure

```
app/(app)/properties/[slug]/
├── page.tsx                    # Async Server Component — fetches property, renders full detail
└── loading.tsx                 # Skeleton loading state (optional but recommended)

components/
├── property-detail/
│   ├── property-hero.tsx       # 60% carousel + image container
│   ├── property-meta.tsx       # Name, category badge, date, location row
│   ├── property-about.tsx      # Truncated description with "Read more" state
│   ├── property-tiers.tsx      # Vertical tier list with click-to-expand
│   ├── property-demographics.tsx  # Charts section (gender, age, HHI)
│   ├── property-categories.tsx # Brand categories chip row
│   ├── property-formats.tsx    # Activation formats chip row
│   ├── offer-sidebar.tsx       # Sticky sidebar with CTAs and trust badges
│   └── make-offer-dialog.tsx   # Modal form for offer submission
```

### Pattern 1: Next.js 16 Async Dynamic Route Page

**What:** In Next.js 16, `params` is always a Promise. Synchronous access is fully removed (was deprecated-but-working in v15, now hard error in v16).

**When to use:** Every dynamic route page in this project.

**Example:**
```typescript
// Source: https://nextjs.org/docs/app/api-reference/file-conventions/dynamic-routes
// Route: app/(app)/properties/[slug]/page.tsx

import { notFound } from "next/navigation"
import { getPropertyBySlug } from "@/lib/data"

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const property = await getPropertyBySlug(slug)

  if (!property) {
    notFound()
  }

  return <PropertyDetail property={property} />
}

export async function generateStaticParams() {
  // Returns slugs for build-time prerendering
  // With Prisma + Neon, call getAllProperties() and map slugs
  // If DB unavailable at build time, return [] to make all pages dynamic
  return []
}
```

**Critical:** The type annotation `params: Promise<{ slug: string }>` is required. `PageProps<'/[slug]'>` helper type is also available in Next.js 16.

### Pattern 2: Sticky Sidebar with 60/40 Layout

**What:** CSS Grid or Flexbox with `position: sticky` on the sidebar column. The scroll container must be the page scroll — the sidebar scrolls relative to the viewport.

**When to use:** Hero row and anywhere the sidebar should stick as content scrolls.

**Sticky pitfall:** `position: sticky` only works if no ancestor element has `overflow: hidden` or `overflow: auto` set between the sticky element and the scroll container (the viewport). The current shell uses `SidebarInset` which does not set overflow — this is safe.

**Example:**
```tsx
// 60/40 grid layout — sticky sidebar
<div className="grid grid-cols-5 gap-6 items-start">
  {/* 60% — image carousel */}
  <div className="col-span-3">
    <PropertyHero images={property.images} />
  </div>

  {/* 40% — sticky sidebar */}
  <div className="col-span-2 sticky top-4">
    <OfferSidebar property={property} />
  </div>
</div>
```

**Key classes:** `sticky top-4` (or `top-[72px]` if header height needs clearance), `items-start` on the grid container (without `items-start`, the sticky column stretches to grid height and doesn't stick properly).

### Pattern 3: ShadCN Carousel with Dot Indicators

**What:** Embla-backed carousel using `setApi` to access the carousel instance for dot state tracking.

**Example:**
```tsx
// Source: https://ui.shadcn.com/docs/components/carousel
"use client"
import * as React from "react"
import { type CarouselApi, Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel"

export function PropertyHero({ images }: { images: string[] }) {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!api) return
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap())
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  return (
    <div className="relative">
      <Carousel setApi={setApi} opts={{ loop: true }}>
        <CarouselContent>
          {images.map((src, i) => (
            <CarouselItem key={i}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                <Image src={src} alt="" fill className="object-cover" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-3" />
        <CarouselNext className="right-3" />
      </Carousel>
      {/* Dot indicators */}
      <div className="flex justify-center gap-1.5 mt-3">
        {Array.from({ length: count }).map((_, i) => (
          <button
            key={i}
            className={cn(
              "h-1.5 rounded-full transition-all",
              i === current ? "w-4 bg-primary" : "w-1.5 bg-muted-foreground/40"
            )}
            onClick={() => api?.scrollTo(i)}
          />
        ))}
      </div>
    </div>
  )
}
```

**Important:** Carousel component requires `"use client"` since it uses React state and event listeners.

### Pattern 4: ShadCN Chart for Demographics

**What:** ShadCN's `ChartContainer` wrapping Recharts components. Chart config maps data keys to labels and colors.

**Data parsing challenge:** `audienceGender` is stored as `"62% male, 38% female"`. Parse at render time with a helper:

```typescript
// Parse gender string: "62% male, 38% female"
function parseGender(raw: string): { male: number; female: number } {
  const maleMatch = raw.match(/(\d+)%\s*male/)
  const femaleMatch = raw.match(/(\d+)%\s*female/)
  return {
    male: maleMatch ? parseInt(maleMatch[1]) : 50,
    female: femaleMatch ? parseInt(femaleMatch[1]) : 50,
  }
}
```

**Gender split bar chart (horizontal stacked):**
```tsx
// Source: https://ui.shadcn.com/docs/components/chart
import { ChartContainer } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, Cell } from "recharts"

const genderConfig = {
  male: { label: "Male", color: "var(--color-chart-1)" },
  female: { label: "Female", color: "var(--color-chart-2)" },
}

// Single horizontal stacked bar
const data = [{ name: "gender", male: 62, female: 38 }]

<ChartContainer config={genderConfig} className="h-8 w-full">
  <BarChart layout="vertical" data={data} barSize={28}>
    <Bar dataKey="male" stackId="a" fill="var(--color-chart-1)" radius={[4, 0, 0, 4]} />
    <Bar dataKey="female" stackId="a" fill="var(--color-chart-2)" radius={[0, 4, 4, 0]} />
  </BarChart>
</ChartContainer>
```

**Income indicator:** `audienceIncome` values are `"premium"`, `"mass-market"`, `"affluent"`. These map to a 4-point scale. Render as a visual range bar with a dot position rather than a full chart.

### Pattern 5: ShadCN Dialog for Make an Offer

**What:** `Dialog` controlled by state in the parent, triggered by the "Make an Offer" button. Form inside handles offer submission.

**Example:**
```tsx
// Source: https://ui.shadcn.com/docs/components/dialog
"use client"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function MakeOfferDialog({ propertyId }: { propertyId: string }) {
  const [open, setOpen] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    // Call server action or API route to create offer
    // Then close: setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
          Make an Offer
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Make an Offer</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input name="amount" type="number" placeholder="Offer amount (USD)" required />
          <textarea name="terms" placeholder="Terms and notes..." className="..." />
          <Button type="submit" className="w-full">Submit Offer</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
```

**Note:** The offer submission needs a Server Action or API route. A Server Action is the idiomatic approach in Next.js 16 App Router. This creates a record in the `Offer` table linked to a `Thread`. Since no thread exists yet, creating an offer requires first creating a thread.

### Pattern 6: Tier Click-to-Expand

**What:** Controlled state in a client component where clicking a tier row sets it as selected. Selected tier shows expanded inclusions. No ShadCN Accordion needed — simple React state.

**Example:**
```tsx
"use client"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Package } from "@prisma/client" // or use Prisma return type

export function PropertyTiers({ packages }: { packages: Package[] }) {
  const [selectedId, setSelectedId] = useState<string | null>(null)

  // Sort ascending by price
  const sorted = [...packages].sort((a, b) => a.priceUsd - b.priceUsd)

  return (
    <div className="space-y-2">
      {sorted.map((pkg) => {
        const isSelected = pkg.id === selectedId
        return (
          <div
            key={pkg.id}
            className={cn(
              "border rounded-lg p-4 cursor-pointer transition-colors",
              isSelected
                ? "border-primary bg-primary/5"
                : "border-border hover:border-muted-foreground/40"
            )}
            onClick={() => setSelectedId(isSelected ? null : pkg.id)}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">{pkg.name}</span>
              <span className="font-semibold tabular-nums">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                  maximumFractionDigits: 0,
                }).format(pkg.priceUsd)}
              </span>
            </div>
            {isSelected && (
              <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                {pkg.inclusions.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )
      })}
    </div>
  )
}
```

**Price format:** `Intl.NumberFormat` with `style: "currency"`, `maximumFractionDigits: 0` produces "$15,000" — no library needed.

### Pattern 7: "About this Listing" Truncation

**What:** Simple CSS line-clamp with a "Read more" toggle via React state. No ShadCN component needed.

```tsx
"use client"
import { useState } from "react"

export function PropertyAbout({ description }: { description: string }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div>
      <p className={cn("text-muted-foreground", !expanded && "line-clamp-4")}>
        {description}
      </p>
      <button
        className="mt-2 text-sm text-primary hover:underline"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? "Read less" : "Read more"}
      </button>
    </div>
  )
}
```

**Tailwind v4 note:** `line-clamp-4` is a standard Tailwind utility (in v3+ as `@tailwindcss/line-clamp` was merged into core). In Tailwind v4 it remains available as `line-clamp-{n}`.

### Pattern 8: Badge Chips for Categories/Formats

**What:** `Badge` component from ShadCN with `variant="secondary"` or `variant="outline"` renders as compact chip pills. `tags` field on Property model holds the data.

```tsx
import { Badge } from "@/components/ui/badge"

// Brand categories from tags field
<div className="flex flex-wrap gap-2">
  {property.tags.map((tag) => (
    <Badge key={tag} variant="secondary">{tag}</Badge>
  ))}
</div>
```

**Schema note:** The current schema has a single `tags` field (String[]) used for both brand categories and lifestyle tags. There is no separate `brandCategories` or `activationFormats` field. The planner must decide whether to use `tags` for both sections or add schema fields. Recommendation: use `tags` for brand categories and synthesize activation formats from `category`/`subcategory` — this avoids a schema migration.

### Anti-Patterns to Avoid

- **Sync params access:** `const { slug } = params` — this is a hard error in Next.js 16. Must use `const { slug } = await params`.
- **Overflow on sticky parent:** Any ancestor of `.sticky` having `overflow: hidden` or `overflow: auto` breaks stickiness. Do not add scroll containers around the detail page.
- **ChartContainer without min-h:** `ChartContainer` requires an explicit `min-h-[VALUE]` class or the chart collapses to zero height.
- **Creating Offer without Thread:** The schema requires `Offer.threadId`. Creating an offer must first create or find a Thread for the property.
- **Hardcoded chart colors:** Use `var(--color-chart-1)` etc. from the ShadCN chart config system — matches theme colors, not hardcoded hex.
- **`image` without `fill` for unknown-height containers:** For the carousel image slot with a fixed aspect ratio container, use `next/image` with `fill` prop + `object-cover`, not a fixed `width`/`height`.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Image carousel | Custom CSS scroll-snap | ShadCN Carousel (Embla) | Swipe, keyboard nav, loop, API for dots all included |
| Modal overlay | Custom `<div>` with backdrop | ShadCN Dialog (Radix) | Focus trapping, escape key, ARIA attributes, accessible |
| Chip/tag pills | Custom styled `<span>` | ShadCN Badge | Consistent sizing, variants, dark mode |
| Demographic charts | Raw `<canvas>` or SVG | ShadCN Chart (Recharts) | Color token integration, responsive container, tooltips |
| Price formatting | Manual string concatenation | `Intl.NumberFormat` | Locale-correct commas, currency symbol |
| 404 handling | Manual redirect or error UI | Next.js `notFound()` | Returns proper 404 HTTP status, renders `not-found.tsx` |
| Text truncation | JavaScript character slicing | CSS `line-clamp-4` | Pure CSS, handles responsive text reflow |

---

## Common Pitfalls

### Pitfall 1: Sync Params in Next.js 16 (Critical)

**What goes wrong:** `const { slug } = params` throws a runtime error in Next.js 16. In v15 it was a deprecation warning; in v16 synchronous access is fully removed.

**Why it happens:** Next.js 16 release notes explicitly list "Sync `params` access" as removed.

**How to avoid:** Always `const { slug } = await params`. Type the prop as `params: Promise<{ slug: string }>`.

**Warning signs:** TypeScript error "Property 'slug' does not exist on type 'Promise<{ slug: string }>'" — this is the linter catching it correctly.

### Pitfall 2: Sticky Sidebar Broken by Overflow Ancestor

**What goes wrong:** The sticky sidebar scrolls with the page instead of sticking.

**Why it happens:** Any ancestor with `overflow: hidden` or `overflow: auto`/`scroll` between the sticky element and the viewport creates a new scroll context, defeating `position: sticky`.

**How to avoid:** Do not wrap the detail page content in a scrollable container. The SidebarInset's `<main>` in the current layout does not set overflow — keep it that way. Verify no wrapping `div` adds overflow.

**Warning signs:** Sidebar doesn't stick at all; or only sticks for a short portion of scroll.

### Pitfall 3: Grid Items-Start Required for Sticky

**What goes wrong:** Sticky sidebar doesn't stick even with correct CSS.

**Why it happens:** CSS Grid stretches items to fill the row by default (`align-items: stretch`). A stretched item is already at full grid height, so `sticky` has no room to move.

**How to avoid:** Add `items-start` to the grid container so both columns are sized to content, not the tallest column.

**Warning signs:** Sidebar sticks but then stops scrolling partway down; or doesn't stick at all in a grid context.

### Pitfall 4: ChartContainer Height Collapse

**What goes wrong:** Charts render as zero-height invisible elements.

**Why it happens:** Recharts charts use percentage-based heights by default. Without an explicit height on the container, they compute to 0.

**How to avoid:** Always apply `className="min-h-[200px] w-full"` (or appropriate value) to `ChartContainer`.

**Warning signs:** No visible chart in the browser; inspect shows element with height 0.

### Pitfall 5: Offer Submit Creates Orphaned Data

**What goes wrong:** Offer is created but has no Thread, violating the FK constraint. Or offer is created without linking to the property.

**Why it happens:** The schema has `Offer.threadId` (required). An offer cannot exist without a thread.

**How to avoid:** The "Make an Offer" server action must: (1) find or create a Thread for this property, (2) create the Offer linked to that thread. Simple approach: always create a new thread when an offer is submitted.

**Warning signs:** Prisma FK constraint error on offer creation.

### Pitfall 6: Image Carousel with Cropped Images

**What goes wrong:** Images are cropped at top/bottom or appear as oversized banners.

**Why it happens:** `next/image` without proper container aspect ratio stretches/clips images. Using `fill` without a positioned container also fails.

**How to avoid:** Wrap the `<Image fill>` in a `relative` container with a fixed aspect ratio class (`aspect-[4/3]` or similar). Set `object-contain` rather than `object-cover` to avoid any cropping.

**Warning signs:** Tops or bottoms of landscape photos cut off; tall portrait images looking stretched.

---

## Code Examples

### Dynamic Route Page (Next.js 16)

```typescript
// Source: https://nextjs.org/docs/app/api-reference/file-conventions/dynamic-routes
// app/(app)/properties/[slug]/page.tsx

import { notFound } from "next/navigation"
import { getPropertyBySlug } from "@/lib/data"

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const property = await getPropertyBySlug(slug)

  if (!property) {
    notFound()
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero: 60/40 */}
      <div className="grid grid-cols-5 gap-8 items-start">
        <div className="col-span-3">
          {/* PropertyHero carousel */}
        </div>
        <div className="col-span-2 sticky top-20">
          {/* OfferSidebar */}
        </div>
      </div>
      {/* Scrolling content below hero */}
      <div className="mt-8 space-y-12">
        {/* PropertyMeta, PropertyAbout, PropertyTiers, PropertyDemographics, chips */}
      </div>
    </div>
  )
}
```

### Price Formatting

```typescript
// No library — browser/Node native Intl
function formatPrice(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(cents)
  // Output: "$15,000", "$125,000"
}
```

### Server Action for Offer Creation

```typescript
// Source: Next.js 16 App Router — Server Actions pattern
"use server"

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function createOffer(propertyId: string, amount: number, terms: string) {
  // Create thread first (required by FK)
  const thread = await prisma.thread.create({
    data: {
      subject: `Offer — ${new Date().toLocaleDateString()}`,
      propertyId,
      messages: {
        create: {
          sender: "advertiser",
          isAI: false,
          content: `Initial offer: $${amount.toLocaleString()}. Terms: ${terms}`,
        },
      },
    },
  })

  const offer = await prisma.offer.create({
    data: {
      threadId: thread.id,
      amount,
      terms,
      status: "pending",
    },
  })

  return offer
}
```

### Demographic String Parsers

```typescript
// Parse "62% male, 38% female"
function parseGender(raw: string) {
  const m = raw.match(/(\d+)%\s*male/)
  const f = raw.match(/(\d+)%\s*female/)
  return {
    male: m ? parseInt(m[1]) : 50,
    female: f ? parseInt(f[1]) : 50,
  }
}

// Parse "18–34" or "18-34"
function parseAgeRange(raw: string) {
  const parts = raw.split(/[–-]/)
  return { min: parseInt(parts[0]), max: parseInt(parts[1]) }
}

// Map income string to scale value 1-4
const INCOME_SCALE: Record<string, number> = {
  "mass-market": 1,
  "premium": 2,
  "affluent": 3,
  "ultra-high-net-worth": 4,
}
```

### `generateStaticParams` with Prisma

```typescript
// Source: https://nextjs.org/docs/app/api-reference/functions/generate-static-params
// With Neon Postgres + PrismaNeon adapter, this runs at build time
// If build-time DB unavailable, return [] to make pages fully dynamic

export async function generateStaticParams() {
  try {
    const properties = await getAllProperties()
    return properties.map((p) => ({ slug: p.slug }))
  } catch {
    return []
  }
}
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Sync `params` access | `await params` required | Next.js 16 (Oct 2025) — sync removed entirely | Hard error if not updated; was a warning in v15 |
| `@radix-ui/react-dialog` etc. | `radix-ui` unified package | ShadCN Feb 2026 changelog | Already handled — project has `radix-ui: ^1.4.3` |
| `experimental.ppr` | `cacheComponents` config | Next.js 16 | Not needed for this phase |
| Embla Carousel manual install | `npx shadcn add carousel` installs Embla automatically | ShadCN current | Just run the add command — no separate npm install needed |
| Chart library separate install | `npx shadcn add chart` installs Recharts automatically | ShadCN current | Just run the add command |

**Deprecated/outdated:**
- Sync `params`: Fully removed in Next.js 16 — must use async
- `images.domains` config: Use `images.remotePatterns` (already done in this project's next.config.ts)
- `next lint` command: Removed in Next.js 16 — use ESLint directly (doesn't affect this phase)

---

## Open Questions

1. **`generateStaticParams` vs. fully dynamic**
   - What we know: Neon Postgres with PrismaNeon adapter is available at build time if env vars are present
   - What's unclear: Whether Neon DB will be reachable during Vercel/CI build steps; `generateStaticParams` with DB call will fail if not
   - Recommendation: Wrap in try/catch returning `[]` on error — pages fall back to dynamic rendering without breaking the build

2. **Single image per property in schema**
   - What we know: Schema has `imageUrl: String` (single URL, not an array). The carousel design requires multiple images.
   - What's unclear: Whether Phase 3 will add a new `images` array field to the schema, or use the single `imageUrl` with a single-slide carousel
   - Recommendation: Build the carousel to accept `string[]`; for now pass `[property.imageUrl]` as a single-element array. Schema can be extended later without changing component interface.

3. **"Schedule Call" behavior**
   - What we know: Context says Claude's discretion; no external calendar API planned
   - Recommendation: Render as a `<Button variant="outline">` that shows a toast/alert saying "Schedule a call by messaging directly" — placeholder behavior

4. **Offer creation: new Thread or find existing?**
   - What we know: Each property can have multiple threads; no "current advertiser" session exists
   - Recommendation: Always create a new thread on offer submission (simplest approach for now — Phase 5 will add proper messaging context)

5. **Tags vs. Brand Categories vs. Activation Formats**
   - What we know: Schema has `tags: String[]` only. No separate brand category or activation format fields exist.
   - What's unclear: Whether DETAIL-10 and DETAIL-11 should use `tags` or require new schema fields
   - Recommendation: Use `tags` for "Ideal Brand Categories". For "Activation Formats," derive from `category` and `subcategory` + `packages[].name` — avoid schema migration in this phase. Add `activationFormats: String[]` field to Property schema if the planner judges this necessary for correctness; the migration is small.

---

## Sources

### Primary (HIGH confidence)

- Next.js official docs — https://nextjs.org/docs/app/api-reference/file-conventions/dynamic-routes — params Promise pattern, Next.js 16 breaking changes
- Next.js 16 blog post — https://nextjs.org/blog/next-16 — confirmed sync params removal, React 19.2.3 used
- ShadCN Carousel docs — https://ui.shadcn.com/docs/components/carousel — setApi, dot implementation, Embla dependency
- ShadCN Chart docs — https://ui.shadcn.com/docs/components/chart — ChartContainer, Recharts dependency, color config
- ShadCN Dialog docs — https://ui.shadcn.com/docs/components/dialog — installation, modal form pattern
- ShadCN Badge docs — https://ui.shadcn.com/docs/components/badge — variants, chip usage
- ShadCN Tabs docs — https://ui.shadcn.com/docs/components/tabs — installation command
- Installed package.json in /Users/vtx/anv/package.json — next: 16.1.6, react: 19.2.3 confirmed
- Prisma schema at /Users/vtx/anv/prisma/schema.prisma — confirmed fields available
- Seed data at /Users/vtx/anv/prisma/seed.ts — confirmed demographic string formats

### Secondary (MEDIUM confidence)

- ShadCN Feb 2026 changelog (WebFetch confirmed) — unified radix-ui package behavior; project already has this
- WebSearch results on sticky sidebar pitfalls — cross-verified with official Tailwind CSS docs

### Tertiary (LOW confidence)

- WebSearch on Recharts horizontal stacked bar for gender split — pattern verified against Recharts docs structure but not directly fetched from recharts.github.io

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — package.json inspected, installed versions confirmed
- Architecture: HIGH — official Next.js 16 docs fetched, patterns verified
- Pitfalls: HIGH — Next.js 16 breaking changes confirmed via official blog; sticky pitfalls from official Tailwind docs
- Chart patterns: MEDIUM — ShadCN Chart docs fetched, specific horizontal stacked bar pattern based on Recharts API knowledge (recharts not yet installed, but ShadCN chart wrapper pattern is verified)
- Demographic data parsing: HIGH — seed.ts strings inspected directly, format is deterministic

**Research date:** 2026-02-21
**Valid until:** 2026-03-21 (30 days — Next.js 16 and ShadCN are active projects but stable)
