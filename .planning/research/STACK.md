# Stack Research

**Project:** Anvara — Sponsorship Marketplace Frontend Prototype
**Researched:** 2026-02-20
**Mode:** Ecosystem — Prototype stack, not production

---

## Recommended Stack

### Core Framework

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Next.js | `16.1.6` | App framework | Stack is decided. App Router is now the default; Pages Router is legacy. v16 is current stable as of Feb 2026. |
| React | `19.2.4` | UI runtime | Next.js 16 requires React 19. Server Components, use() hook, and improved Suspense are stable. |
| TypeScript | `5.9.3` | Type safety | No negotiation for a TypeScript project. Enables typed mock data, component props, and IDE autocomplete which speeds prototype work. |

### Styling

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Tailwind CSS | `4.2.0` | Utility CSS | Stack is decided. v4 is now stable, CSS-first config (no `tailwind.config.js`). Use `@tailwindcss/postcss` plugin with Next.js. |
| `@tailwindcss/postcss` | `4.2.0` | Tailwind v4 Next.js integration | Required for Tailwind v4 in Next.js. Replaces the old PostCSS plugin pattern. |

**Tailwind v4 note:** Config is now in CSS via `@import "tailwindcss"` in your global CSS file. No `tailwind.config.ts` needed for prototype use. If you need custom tokens, they go in `@theme {}` blocks in CSS.

### ShadCN UI

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| `shadcn` CLI | `3.8.5` | Component scaffolding | The CLI copies component source into `components/ui/`. No runtime package dependency — components live in your codebase. |
| `class-variance-authority` | `0.7.1` | Variant-based class generation | Required by shadcn components for managing conditional class patterns (e.g., button variants). |
| `clsx` | `2.1.1` | Conditional class merging | Used in shadcn's `cn()` utility for combining class names. |
| `tailwind-merge` | `3.5.0` | Tailwind class conflict resolution | Used in shadcn's `cn()` utility to resolve conflicting Tailwind classes. |
| `lucide-react` | `0.575.0` | Icons | Default icon library for shadcn. 1000+ icons, tree-shakable, consistent stroke style. |

**Radix UI (transitive):** shadcn components pull in `@radix-ui/*` packages automatically when you add components. You do not install these manually. Key ones for marketplace UI:
- `@radix-ui/react-dialog` `1.1.15` — Modal/drawer patterns
- `@radix-ui/react-select` `2.2.6` — Filter dropdowns
- `@radix-ui/react-slider` — Price/metric range filters
- `@radix-ui/react-checkbox` — Multi-select filter checkboxes

### Supporting Libraries

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `next-themes` | `0.4.6` | Dark/light mode | If you want a theme toggle. Trivial to add with shadcn's ThemeProvider pattern. Skip if prototype stays light-mode only. |
| `sonner` | `2.0.7` | Toast notifications | Best-in-class toast library. Use for "Added to comparison", "Inquiry sent" feedback. shadcn has a Sonner wrapper component. |
| `@types/react` | `19.2.14` | React TypeScript types | Required dev dependency for React 19 TypeScript projects. |
| `@types/node` | `25.3.0` | Node TypeScript types | Required for Next.js path aliases and server-side TypeScript. |

### Type Resolution Note for `@types`

Install `@types/react@^19` explicitly. React 19 changed the children prop signature — old `@types/react@18` will produce type errors in React 19 projects.

---

## ShadCN Components

These are the specific components to add via `npx shadcn@latest add [component]` for a sponsorship marketplace UI.

### Card Layout (Marketplace Listings)

**`card`** — The primary building block for property listing cards.

```tsx
// Sponsor property card pattern
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

function PropertyCard({ property }: { property: SponsorshipProperty }) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="aspect-video bg-muted relative">
        {/* Logo/image placeholder */}
        <img src={property.imageUrl} alt={property.name} className="object-cover w-full h-full" />
      </div>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base">{property.name}</CardTitle>
          <Badge variant="secondary">{property.category}</Badge>
        </div>
        <CardDescription>{property.tagline}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>{property.audience.toLocaleString()} reach</span>
          <span>{property.location}</span>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between pt-2 border-t">
        <span className="font-semibold">${property.priceFrom.toLocaleString()}<span className="text-xs text-muted-foreground font-normal">/event</span></span>
        <Button size="sm">View Details</Button>
      </CardFooter>
    </Card>
  )
}
```

### Filtering UI

**`select`** — Single-value dropdowns for category, region, sport/type filters.

**`checkbox`** — Multi-select filter groups (e.g., select multiple categories).

**`slider`** — Budget range filter. Use Radix Slider via `npx shadcn@latest add slider`.

**`badge`** — Tag/category labels on cards and active filter pills.

**`separator`** — Visual divider in filter sidebars.

**`sheet`** — Mobile filter drawer. Replaces a sidebar on small viewports.

```tsx
// Filter sidebar pattern (desktop)
// Sheet variant (mobile)
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

function MobileFilterDrawer({ children }: { children: React.ReactNode }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm">
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80">
        <SheetHeader>
          <SheetTitle>Filter Properties</SheetTitle>
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  )
}
```

**`command`** (cmdk-based) — Searchable select/combobox. Use for the main search bar with type-ahead over property names.

### Detail / Modal Views

**`dialog`** — Property detail modal overlay. Avoids a full page navigation for prototype speed.

**`tabs`** — Detail view sections (Overview / Audience / Packages / Contact).

**`table`** — Sponsorship package tier comparison table.

**`scroll-area`** — Scrollable content within constrained-height containers (filter lists, modals).

### Navigation & Layout

**`navigation-menu`** — Top nav with Brands / Properties / How It Works links.

**`button`** — Used everywhere. Key variants: `default`, `outline`, `ghost`, `secondary`.

**`input`** — Search field, contact form inputs.

**`avatar`** — Brand/property logo display in compact contexts.

**`skeleton`** — Loading state placeholder for cards. Fake async realism in prototypes.

### Feedback

**`sonner`** (toast) — "Request sent", "Saved to shortlist" feedback. Add via `npx shadcn@latest add sonner`.

**`tooltip`** — Explain metrics or restricted features on hover.

### Component Install Command

```bash
npx shadcn@latest add card badge button select checkbox slider sheet command dialog tabs table scroll-area navigation-menu input avatar skeleton sonner tooltip separator
```

---

## Mock Data Patterns

### File Structure

```
src/
  lib/
    data/
      properties.ts      # Sponsorship property listings
      brands.ts          # Brand/sponsor profiles
      categories.ts      # Category taxonomy
      packages.ts        # Sponsorship package tiers
    types.ts             # All TypeScript interfaces
```

### Type Definitions First

Define types before data. This forces you to think about the data shape and gives you IDE autocomplete when authoring mock records.

```typescript
// src/lib/types.ts

export type Category =
  | "sports"
  | "music"
  | "esports"
  | "arts"
  | "community"
  | "education"

export type AudienceDemographic = {
  ageRange: string       // "18-34"
  primaryGender: "M" | "F" | "mixed"
  incomeLevel: "budget" | "mid" | "premium"
  interests: string[]
}

export type SponsorshipPackage = {
  id: string
  name: string           // "Gold", "Silver", "Bronze"
  priceUsd: number
  inclusions: string[]
  maxSponsors: number
}

export type SponsorshipProperty = {
  id: string
  slug: string
  name: string
  tagline: string
  category: Category
  subcategory: string
  location: string
  region: "northeast" | "southeast" | "midwest" | "west" | "international"
  imageUrl: string
  logoUrl: string
  description: string
  audience: {
    totalReach: number
    demographics: AudienceDemographic
  }
  packages: SponsorshipPackage[]
  priceFrom: number      // Derived from cheapest package — useful for sort/filter
  rating: number         // 1-5, mock
  reviewCount: number
  featured: boolean
  tags: string[]
  createdAt: string      // ISO date string
}
```

### Data File Pattern

Use `as const satisfies` for type safety without losing literal types:

```typescript
// src/lib/data/properties.ts
import type { SponsorshipProperty } from "@/lib/types"

export const PROPERTIES: SponsorshipProperty[] = [
  {
    id: "prop_001",
    slug: "eastern-conference-basketball",
    name: "Eastern Conference Basketball",
    tagline: "Premium mid-market NBA affiliate sponsorship",
    category: "sports",
    subcategory: "basketball",
    location: "Charlotte, NC",
    region: "southeast",
    imageUrl: "/images/properties/basketball-arena.jpg",
    logoUrl: "/images/logos/ec-basketball.svg",
    description:
      "12,000-seat arena hosting 40+ games per season. Primary demographic: 25-44 male, household income $75K+.",
    audience: {
      totalReach: 480000,
      demographics: {
        ageRange: "25-44",
        primaryGender: "M",
        incomeLevel: "premium",
        interests: ["sports", "fitness", "beer", "automotive"],
      },
    },
    packages: [
      {
        id: "pkg_001_gold",
        name: "Gold",
        priceUsd: 150000,
        inclusions: [
          "Courtside signage",
          "30-second in-game ad spots (10x)",
          "Branded halftime activation",
          "VIP suite access (20 games)",
        ],
        maxSponsors: 2,
      },
      {
        id: "pkg_001_silver",
        name: "Silver",
        priceUsd: 60000,
        inclusions: [
          "Concourse banner (2x)",
          "Digital scoreboard rotation",
          "4 season tickets per game",
        ],
        maxSponsors: 5,
      },
    ],
    priceFrom: 60000,
    rating: 4.8,
    reviewCount: 23,
    featured: true,
    tags: ["basketball", "arena", "regional", "live-events"],
    createdAt: "2025-09-01",
  },
  // ... 9-14 more records covering diverse categories and price ranges
]
```

### Filter/Sort Utilities

Co-locate filter logic with data files so the prototype feels real:

```typescript
// src/lib/data/properties.ts (continued)

export type PropertyFilters = {
  category?: Category
  region?: string
  minPrice?: number
  maxPrice?: number
  search?: string
  featured?: boolean
}

export function filterProperties(
  properties: SponsorshipProperty[],
  filters: PropertyFilters
): SponsorshipProperty[] {
  return properties.filter((p) => {
    if (filters.category && p.category !== filters.category) return false
    if (filters.region && p.region !== filters.region) return false
    if (filters.minPrice && p.priceFrom < filters.minPrice) return false
    if (filters.maxPrice && p.priceFrom > filters.maxPrice) return false
    if (filters.featured && !p.featured) return false
    if (filters.search) {
      const q = filters.search.toLowerCase()
      return (
        p.name.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.tags.some((t) => t.includes(q))
      )
    }
    return true
  })
}

export type SortOption = "price-asc" | "price-desc" | "rating" | "featured"

export function sortProperties(
  properties: SponsorshipProperty[],
  sort: SortOption
): SponsorshipProperty[] {
  return [...properties].sort((a, b) => {
    switch (sort) {
      case "price-asc": return a.priceFrom - b.priceFrom
      case "price-desc": return b.priceFrom - a.priceFrom
      case "rating": return b.rating - a.rating
      case "featured": return Number(b.featured) - Number(a.featured)
    }
  })
}
```

### URL State for Filters

Use Next.js `useSearchParams` and `useRouter` to persist filter state in the URL. This makes prototype demos feel production-quality (shareable, back-button works) with minimal complexity:

```typescript
// Pattern: read filters from URL, write on change
"use client"
import { useSearchParams, useRouter, usePathname } from "next/navigation"

function useFilters() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const filters: PropertyFilters = {
    category: (searchParams.get("category") as Category) || undefined,
    region: searchParams.get("region") || undefined,
    search: searchParams.get("q") || undefined,
  }

  function setFilter(key: string, value: string | null) {
    const params = new URLSearchParams(searchParams.toString())
    if (value) params.set(key, value)
    else params.delete(key)
    router.push(`${pathname}?${params.toString()}`)
  }

  return { filters, setFilter }
}
```

### Mock Data Volume

For a prototype demo: **12-16 property records** is the sweet spot.
- Enough to demonstrate filtering (filtering to 3-4 results feels real)
- Few enough to author by hand without fatigue
- Cover at minimum: 4 categories, 3 price tiers, 2-3 regions, 2-3 featured

---

## What to Skip

| Thing | Why to Skip | Prototype Alternative |
|-------|------------|----------------------|
| **Prisma / any database** | Zero backend. Mock data in `.ts` files is the entire data layer. | `src/lib/data/*.ts` files |
| **NextAuth / authentication** | No user accounts needed to demo marketplace browsing. | Hardcode a "logged in" brand profile if needed |
| **React Query / TanStack Query** | No async data fetching — data is synchronous imports. Adds setup overhead for zero benefit. | Direct import of data arrays |
| **Zustand / Redux** | Filter state fits in URL params + local `useState`. A global store is overkill for one screen's state. | `useSearchParams` + `useState` |
| **Storybook** | Component documentation tooling. Prototype is demo-first, not component-library-first. | Just build the pages |
| **Playwright / Cypress** | E2E testing. Prototype timeline is hours, not weeks. | Manual QA |
| **`framer-motion`** | Heavy animation library (v12, 12MB). Adds significant bundle weight. | Tailwind `transition-*` and `animate-*` classes cover 90% of prototype needs. Add only if you need complex gesture animations. |
| **`@tanstack/react-table`** | Complex headless table primitive. Only add if you need a full sortable/filterable data table view. | shadcn `table` component + manual sort |
| **Internationalization (i18n)** | Adds file structure overhead. Prototype is English-only. | Hardcoded strings |
| **`eslint-plugin-*` beyond Next.js defaults** | Linting config bikeshedding. Next.js ships ESLint config out of the box. | Accept `next/core-web-vitals` defaults |
| **Tailwind v4 `@tailwindcss/vite`** | Only relevant for Vite-based projects. Next.js uses PostCSS. Use `@tailwindcss/postcss` instead. | `@tailwindcss/postcss` |
| **`shadcn-ui` (old package)** | The old `shadcn-ui` npm package is deprecated. Use `shadcn` CLI (`npx shadcn@latest`). | `shadcn` |

---

## Confidence Levels

| Recommendation | Confidence | Basis | Notes |
|---------------|------------|-------|-------|
| Next.js `16.1.6` | HIGH | Verified via `npm view next version` | Current as of 2026-02-20 |
| React `19.2.4` | HIGH | Verified via `npm view react version` | Current stable |
| TypeScript `5.9.3` | HIGH | Verified via `npm view typescript version` | Current stable |
| Tailwind CSS `4.2.0` | HIGH | Verified via `npm view tailwindcss version` | v4 is stable, CSS-first config |
| `@tailwindcss/postcss` for Next.js | HIGH | Verified via npm; v4 ships separate PostCSS plugin | v3 approach (`tailwind.config.ts`) is deprecated for v4 |
| `shadcn` CLI `3.8.5` | HIGH | Verified via npm; `shadcn-ui` package is `0.9.5` (legacy) | Use `shadcn`, not `shadcn-ui` |
| `lucide-react 0.575.0` | HIGH | Verified via npm | Default shadcn icon lib |
| `tailwind-merge 3.5.0` | HIGH | Verified via npm | shadcn CLI pulls `^3.0.1` in its own deps |
| URL state for filters | HIGH | Established Next.js App Router pattern | No external library needed |
| shadcn component selection | MEDIUM | Based on component use cases; shadcn doesn't version individual components | Components are copied source — no version drift risk |
| Mock data volume (12-16 records) | MEDIUM | Experience-based heuristic | Adjust based on how many filter dimensions you need to demonstrate |
| Skip framer-motion | MEDIUM | Bundle size concern is well-established; specific v12 size from npm info | Tailwind animations sufficient for card hover/transitions |
| `next-themes` `0.4.6` | HIGH | Verified via npm | Optional — only if dark mode is in scope |
| `sonner` `2.0.7` | HIGH | Verified via npm | Best-in-class toast; shadcn wraps it |

---

## Installation Reference

```bash
# 1. Bootstrap Next.js project
npx create-next-app@latest anvara \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*"

# 2. Initialize shadcn (select "New York" style, "zinc" base color)
npx shadcn@latest init

# 3. Add all marketplace UI components in one shot
npx shadcn@latest add card badge button select checkbox slider sheet command dialog tabs table scroll-area navigation-menu input avatar skeleton sonner tooltip separator

# 4. Add optional deps if using dark mode
npm install next-themes

# No other npm installs needed — mock data is .ts files, no ORM, no DB
```

**Note on `create-next-app` and Tailwind v4:** As of Next.js 16, `create-next-app --tailwind` scaffolds with Tailwind v4 and `@tailwindcss/postcss` automatically. No manual Tailwind setup needed.

---

## Sources

| Claim | Source | Method |
|-------|--------|--------|
| Next.js version | npm registry | `npm view next version` → `16.1.6` |
| React version | npm registry | `npm view react version` → `19.2.4` |
| TypeScript version | npm registry | `npm view typescript version` → `5.9.3` |
| Tailwind CSS v4 version | npm registry | `npm view tailwindcss version` → `4.2.0` |
| shadcn CLI version | npm registry | `npm view shadcn version` → `3.8.5` |
| shadcn dependency list | npm registry | `npm view shadcn dependencies` |
| lucide-react version | npm registry | `npm view lucide-react version` → `0.575.0` |
| tailwind-merge version | npm registry | `npm view tailwind-merge version` → `3.5.0` |
| sonner version | npm registry | `npm view sonner version` → `2.0.7` |
| next-themes version | npm registry | `npm view next-themes version` → `0.4.6` |
| @types/react version | npm registry | `npm view @types/react version` → `19.2.14` |
