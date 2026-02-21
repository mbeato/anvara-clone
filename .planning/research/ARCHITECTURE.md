# Architecture Research

**Domain:** Sponsorship marketplace frontend prototype (Anvara)
**Researched:** 2026-02-20
**Confidence:** HIGH — sourced from official Next.js documentation (v16.1.6, last updated 2026-02-20)

---

## File Structure

The recommended layout for this prototype. Three pages, ShadCN UI, TypeScript mock data, Vercel deployment. Keep it flat and fast to build — no premature abstraction.

```
anv/
├── app/
│   ├── layout.tsx                    # Root layout: HTML shell, Nav, font loading
│   ├── page.tsx                      # Landing page (route: /)
│   ├── browse/
│   │   └── page.tsx                  # Browse/discovery page (route: /browse)
│   └── properties/
│       └── [id]/
│           └── page.tsx              # Property detail page (route: /properties/[id])
│
├── components/
│   ├── ui/                           # ShadCN primitives (auto-generated, don't edit)
│   │   ├── button.tsx
│   │   ├── badge.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   ├── slider.tsx
│   │   └── ...
│   ├── layout/
│   │   ├── nav.tsx                   # Site navigation (Server Component)
│   │   └── footer.tsx                # Site footer (Server Component)
│   ├── landing/
│   │   ├── hero.tsx                  # Hero section
│   │   ├── how-it-works.tsx          # Steps/features section
│   │   ├── featured-properties.tsx   # Spotlight cards
│   │   └── cta.tsx                   # Call-to-action section
│   ├── browse/
│   │   ├── filter-panel.tsx          # Filter sidebar (Client Component — state)
│   │   ├── property-grid.tsx         # Grid of PropertyCard components
│   │   ├── property-card.tsx         # Single listing card
│   │   └── browse-client.tsx         # Client boundary: wires filters → grid
│   └── property/
│       ├── property-header.tsx       # Name, category, hero image
│       ├── property-stats.tsx        # Audience size, demographics
│       ├── property-packages.tsx     # Sponsorship tier cards
│       └── property-contact.tsx      # CTA / contact form stub
│
├── lib/
│   └── data/
│       ├── types.ts                  # TypeScript interfaces (Property, Package, etc.)
│       ├── properties.ts             # Mock property array
│       ├── categories.ts             # Filter option constants
│       └── index.ts                  # Re-exports + query helpers (getProperty, filterProperties)
│
├── public/
│   └── images/                       # Static placeholder images
│
├── components.json                   # ShadCN configuration
├── tailwind.config.ts
├── tsconfig.json
└── next.config.ts
```

**Key decisions:**

- `components/ui/` is the ShadCN output directory — treat it as a dependency, not source code.
- Feature-grouped component folders (`landing/`, `browse/`, `property/`) map directly to pages. This makes the build order obvious and avoids a sprawling flat list.
- `lib/data/` is the entire mock data layer. No API routes needed. Pages import directly from here.
- The `src/` wrapper is omitted — unnecessary complexity for a prototype.

---

## Component Architecture

### Composition hierarchy per page

#### Root Layout (`app/layout.tsx`)
```
RootLayout (Server Component)
└── Nav (Server Component)
└── {children}
└── Footer (Server Component)
```

#### Landing Page (`app/page.tsx`)
```
LandingPage (Server Component — async, reads from lib/data)
├── Hero
├── HowItWorks
├── FeaturedProperties
│   └── PropertyCard (×3, static)
└── CTA
```

#### Browse Page (`app/browse/page.tsx`)
```
BrowsePage (Server Component — reads initial data, passes to client)
└── BrowseClient (Client Component — 'use client', owns filter state)
    ├── FilterPanel (Client Component — interactive dropdowns, sliders)
    └── PropertyGrid (Client Component — receives filtered results)
        └── PropertyCard (×N)
```

#### Property Detail Page (`app/properties/[id]/page.tsx`)
```
PropertyDetailPage (Server Component — async, params.id → getProperty(id))
├── PropertyHeader
├── PropertyStats
├── PropertyPackages
│   └── PackageTierCard (×N)
└── PropertyContact (Client Component only if form has state)
```

### Server vs Client component split

| Component | Type | Reason |
|---|---|---|
| `app/layout.tsx` | Server | No interactivity, no browser APIs |
| `app/page.tsx` | Server | Static data read, no state |
| `app/browse/page.tsx` | Server | Fetches initial data, passes to client |
| `BrowseClient` | Client | Owns `useState` for active filters |
| `FilterPanel` | Client | `onChange` handlers, controlled inputs |
| `PropertyGrid` | Client | Re-renders on filter change |
| `PropertyCard` | Server (or Client) | Stateless; make Client only if onClick needed |
| `app/properties/[id]/page.tsx` | Server | Static lookup, no state |
| `PropertyContact` | Client | Form `onChange`/`onSubmit` handlers |
| All other display components | Server | No state, no events |

**Rule of thumb for this prototype:** Push interactivity to leaf components. Keep `BrowseClient` as a thin coordination layer — it holds filter state and passes derived data down.

### ShadCN UI integration

ShadCN components are Client Components (they contain event handlers and state). They can be imported into any component — Server or Client — without wrapping, because they ship with `"use client"` internally.

Do not add `"use client"` to a page just to use a ShadCN `<Button>`. Import the button into an already-client component or into a server component that renders it as static HTML.

---

## Data Layer

### Type definitions (`lib/data/types.ts`)

```typescript
export interface Property {
  id: string
  name: string
  slug: string
  category: PropertyCategory
  description: string
  imageUrl: string
  audienceSize: number
  demographics: {
    ageRange: string
    primaryGender: string
    location: string
  }
  tags: string[]
  packages: SponsorshipPackage[]
  featured: boolean
}

export interface SponsorshipPackage {
  id: string
  name: string        // e.g. "Title Sponsor", "Supporting Sponsor"
  price: number
  deliverables: string[]
  availability: number  // spots remaining
}

export type PropertyCategory =
  | 'podcast'
  | 'newsletter'
  | 'event'
  | 'youtube'
  | 'community'

export interface FilterState {
  category: PropertyCategory | 'all'
  audienceMin: number
  audienceMax: number
  tags: string[]
}
```

### Mock data (`lib/data/properties.ts`)

```typescript
import { Property } from './types'

export const PROPERTIES: Property[] = [
  {
    id: 'prop-001',
    name: 'The Indie Hackers Podcast',
    slug: 'indie-hackers-podcast',
    category: 'podcast',
    description: '...',
    imageUrl: '/images/indie-hackers.jpg',
    audienceSize: 85000,
    demographics: {
      ageRange: '25-44',
      primaryGender: 'male',
      location: 'US/EU'
    },
    tags: ['startups', 'bootstrapping', 'saas'],
    packages: [...],
    featured: true
  },
  // 8-12 total properties for useful browse/filter demo
]
```

### Query helpers (`lib/data/index.ts`)

```typescript
import { PROPERTIES } from './properties'
import { FilterState } from './types'

export const getAllProperties = () => PROPERTIES

export const getFeaturedProperties = () =>
  PROPERTIES.filter(p => p.featured)

export const getProperty = (id: string) =>
  PROPERTIES.find(p => p.id === id) ?? null

export const filterProperties = (filters: FilterState) => {
  return PROPERTIES.filter(p => {
    if (filters.category !== 'all' && p.category !== filters.category) return false
    if (p.audienceSize < filters.audienceMin) return false
    if (p.audienceSize > filters.audienceMax) return false
    if (filters.tags.length > 0 && !filters.tags.some(t => p.tags.includes(t))) return false
    return true
  })
}

export * from './types'
export * from './categories'
```

### Data flow per page

**Landing page:**
```
lib/data/index.ts → getFeaturedProperties()
  → LandingPage (Server Component)
    → FeaturedProperties receives array as prop
      → PropertyCard receives single Property as prop
```

**Browse page:**
```
lib/data/index.ts → getAllProperties()
  → BrowsePage (Server Component) passes full array to →
    → BrowseClient (Client Component) holds FilterState in useState
      → filterProperties(filterState) called inline on each render
        → PropertyGrid receives filtered Property[] as prop
          → PropertyCard receives single Property as prop
```

**Property detail page:**
```
params.id (URL param)
  → PropertyDetailPage (Server Component) calls getProperty(id)
    → Property object passed as props to child display components
```

**No API routes. No `fetch()`. No loading states.** Data is synchronous TypeScript module imports. This is the right call for a hardcoded prototype — eliminates an entire class of complexity.

---

## Routing

Next.js App Router routes for this prototype:

| Route | File | Notes |
|---|---|---|
| `/` | `app/page.tsx` | Landing page |
| `/browse` | `app/browse/page.tsx` | Discovery + filtering |
| `/properties/[id]` | `app/properties/[id]/page.tsx` | Dynamic detail page |

### Root layout (`app/layout.tsx`)

Wraps all three routes. Contains:
- `<html>` and `<body>` tags
- Font loading (next/font)
- `<Nav />` — consistent across all pages
- `<Footer />` — consistent across all pages
- `<main>{children}</main>`

No nested layouts needed for a 3-page prototype. One root layout is sufficient.

### Dynamic route (`/properties/[id]`)

Access `params.id` in the page component:

```typescript
// app/properties/[id]/page.tsx
export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const property = getProperty(id)
  if (!property) notFound()
  return <PropertyDetail property={property} />
}
```

Note: `params` is now a Promise in Next.js 15+ (the docs confirm this as of 2026-02-20). Await it before accessing `id`.

### Optional: `generateStaticParams`

Since all properties are hardcoded, you can statically generate all detail pages at build time:

```typescript
export function generateStaticParams() {
  return PROPERTIES.map(p => ({ id: p.id }))
}
```

This makes the Vercel deployment instant — no server needed. Recommended.

---

## Build Order

Build in this order to maximize momentum and catch structural issues early.

### Phase 1: Foundation (30 min)

**What:** Scaffold, install, configure.

1. `npx create-next-app@latest` with TypeScript, Tailwind, App Router
2. `npx shadcn@latest init` — configure components.json
3. Add ShadCN components you know you need: `button`, `card`, `badge`, `input`, `select`
4. Write `lib/data/types.ts` — define TypeScript interfaces first
5. Write 3-4 mock properties in `lib/data/properties.ts`
6. Write `lib/data/index.ts` with query helpers

**Why first:** Types and mock data are the contract everything else is built on. Defining them first prevents refactoring component props later. Scaffolding early means you can `npm run dev` immediately and see live changes.

### Phase 2: Root Layout + Nav (20 min)

**What:** `app/layout.tsx`, `components/layout/nav.tsx`, `components/layout/footer.tsx`

**Why second:** Every page needs this shell. Building it now means pages render in context from the first render. Nav also forces you to decide on your color palette and typography scale — decisions that cascade to all subsequent components.

### Phase 3: Property Detail Page (45 min)

**What:** `app/properties/[id]/page.tsx` and all child components.

**Why third, not last:** This page has the most content and the most complex data shape (nested packages). Building it before the browse page means:
- You validate that your `Property` type is expressive enough
- You have real cards/layouts to reference when building the browse grid
- If the type needs adjustment, you fix it before PropertyCard is used in two places

Build order within phase:
1. `PropertyHeader` — hero image + name
2. `PropertyStats` — audience numbers, demographics
3. `PropertyPackages` — tier cards (most likely to need ShadCN Card customization)
4. `PropertyContact` — CTA stub

### Phase 4: Browse Page (45 min)

**What:** `app/browse/page.tsx`, `BrowseClient`, `FilterPanel`, `PropertyGrid`, `PropertyCard`

**Why fourth:** By now PropertyCard composition is already solved from Phase 3. Browse is mainly about wiring the filter state — the Client Component boundary.

Build order within phase:
1. `PropertyCard` — reuse patterns from PropertyDetail components
2. `PropertyGrid` — simple grid layout of cards, no filter logic yet
3. Static browse page with all properties showing (no filter)
4. `FilterPanel` — add filter controls
5. `BrowseClient` — connect FilterPanel state to PropertyGrid via `filterProperties()`

### Phase 5: Landing Page (30 min)

**Why last:** Landing page is almost entirely static and mostly marketing copy. It's the simplest to build and the easiest to iterate. Saving it for last means you have a working app in Phases 1-4 and can focus landing polish on what actually looks good.

Build order within phase:
1. `Hero` — headline, subheadline, CTA button
2. `FeaturedProperties` — reuse PropertyCard from Phase 4
3. `HowItWorks` — three-step explainer
4. `CTA` — bottom conversion section

### Phase 6: Polish + Deploy (20 min)

1. Responsive layout check (mobile nav, grid breakpoints)
2. Vercel deploy: `vercel --prod`
3. Verify dynamic routes resolve on Vercel

### Total estimated time: ~3 hours

---

## Anti-Patterns to Avoid

**Do not add `"use client"` to page files.** Pages should be Server Components. Push client boundaries to specific interactive components (`BrowseClient`, `FilterPanel`, `PropertyContact`). Adding `"use client"` to a page sends the entire subtree to the client, inflating bundle size unnecessarily.

**Do not create API routes for mock data.** `/app/api/properties/route.ts` returning JSON is extra work with no benefit when data is static TypeScript. Import from `lib/data` directly in Server Components.

**Do not store filter state in URL query params for the prototype.** It's a better pattern long-term, but adds complexity (useRouter, useSearchParams) that slows down the build. Use `useState` in `BrowseClient` — it's a prototype.

**Do not colocate component files inside `app/` route directories** unless they are private `_components` folders. Keep components in the top-level `components/` directory for clarity and reusability across routes.

---

## Sources

- Next.js Project Structure (official docs, v16.1.6, 2026-02-20): https://nextjs.org/docs/app/getting-started/project-structure
- Next.js Data Fetching Patterns (official docs, v16.1.6, 2026-02-20): https://nextjs.org/docs/app/building-your-application/data-fetching/patterns
- Next.js Server and Client Components (official docs, v16.1.6, 2026-02-20): https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns
