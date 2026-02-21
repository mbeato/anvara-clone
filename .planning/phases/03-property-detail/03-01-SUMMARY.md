---
phase: 03-property-detail
plan: 01
subsystem: property-detail
tags: [next.js, dynamic-route, carousel, embla, shadcn, carousel, badge, async-params, sticky-layout, line-clamp]

requires:
  - phase: 02-layout-shell
    provides: SidebarInset shell layout with header and footer
  - phase: 01-foundation
    provides: Prisma data layer with getPropertyBySlug, seeded properties

provides:
  - Property detail page route at /properties/[slug] with Next.js 16 async params
  - PropertyHero carousel with Embla, dot indicators, navigation arrows
  - PropertyMeta row with name, category badge, location, availability
  - PropertyAbout truncated description with Read more/less toggle
  - 60/40 grid layout skeleton ready for sticky sidebar (Plan 03-02)
  - Loading skeleton mirroring the grid layout

affects: [03-02 (OfferSidebar into right column), 03-03 (tiers/demographics below PropertyAbout)]

tech-stack:
  added: [embla-carousel-react, ShadCN Carousel, ShadCN Badge]
  patterns: [Next.js 16 async params pattern, 60/40 CSS Grid with items-start for sticky, ShadCN Carousel setApi dot tracking, CSS line-clamp-4 Read more toggle]

key-files:
  created:
    - app/(app)/properties/[slug]/page.tsx
    - app/(app)/properties/[slug]/loading.tsx
    - components/property-detail/property-hero.tsx
    - components/property-detail/property-meta.tsx
    - components/property-detail/property-about.tsx
    - components/ui/carousel.tsx
    - components/ui/badge.tsx
  modified:
    - package.json (embla-carousel-react added)
    - package-lock.json

key-decisions:
  - "object-contain (not object-cover) on carousel images — no cropping per user constraint"
  - "Dot indicators hidden when single image (count > 1 guard) — avoids single dot confusion"
  - "generateStaticParams returns [] as safe fallback — Neon DB may not be reachable at build time"
  - "PropertyMeta is a server component — no client state needed for static metadata display"
  - "PropertyAbout positioned above tiers as locked user decision from CONTEXT.md"

duration: 2min
completed: 2026-02-21
---

# Phase 3 Plan 01: Property Detail Route and Top-Half Components Summary

**Property detail page route with Next.js 16 async params, ShadCN Carousel hero, metadata row, and Read more/less about section in a 60/40 sticky-ready grid layout.**

## Performance
- **Duration:** 2 minutes
- **Started:** 2026-02-21T08:12:59Z
- **Completed:** 2026-02-21T08:14:38Z
- **Tasks:** 2
- **Files modified:** 9 (7 created, 2 modified)

## Accomplishments
- Installed ShadCN Carousel (Embla) and Badge components via `npx shadcn@latest add carousel badge`
- Created `/properties/[slug]` dynamic route as async Server Component with `await params` (Next.js 16 mandatory pattern)
- `notFound()` renders 404 for any unknown slug
- 60/40 CSS grid (`grid-cols-5`, `col-span-3`/`col-span-2`) with `items-start` enabling sticky sidebar in Plan 03-02
- `generateStaticParams` returns `[]` as safe fallback — avoids build failures when Neon DB unreachable
- Loading skeleton (`loading.tsx`) mirrors the 60/40 grid with Skeleton blocks for hero, meta, about, and sidebar
- `PropertyHero`: client component using ShadCN Carousel `setApi` to track active slide; dot indicators (wider/primary active, narrow/muted inactive); hidden when only one image; `object-contain` + `bg-muted` for letterboxed display without cropping
- `PropertyMeta`: server component rendering property `name` as `<h1>`, `category` as `Badge variant="secondary"`, `location` with MapPin icon, `availability` with Calendar icon
- `PropertyAbout`: client component with `line-clamp-4` truncation toggled by React state; "Read more"/"Read less" button

## Task Commits
1. **Task 1** — `ce34299` (feat) — ShadCN components, page route, loading skeleton
2. **Task 2** — `5e13c27` (feat) — PropertyHero, PropertyMeta, PropertyAbout components

## Files Created/Modified
- `app/(app)/properties/[slug]/page.tsx` — Async server component, 60/40 grid, imports all three components, sidebar placeholder
- `app/(app)/properties/[slug]/loading.tsx` — Skeleton loading state with mirrored 60/40 grid layout
- `components/property-detail/property-hero.tsx` — ShadCN Carousel with Embla, setApi dot tracking, object-contain images
- `components/property-detail/property-meta.tsx` — Name h1, category Badge, MapPin location, Calendar availability
- `components/property-detail/property-about.tsx` — line-clamp-4 truncation with Read more/less state toggle
- `components/ui/carousel.tsx` — ShadCN Carousel primitive (Embla-backed)
- `components/ui/badge.tsx` — ShadCN Badge with variant system
- `package.json` / `package-lock.json` — embla-carousel-react added as dependency

## Decisions Made
- **object-contain on carousel images:** User constraint specifies no cropping tops/bottoms. `object-contain` with `bg-muted` container provides letterboxing without distortion.
- **Dot indicators with count > 1 guard:** Single-image properties (all current seed data) show no dots — avoids a lone dot that implies navigation when none exists. Future-proofed for multi-image schema extension.
- **generateStaticParams returns []:** Wrapping in try/catch would also work but empty array is simpler and equally safe — pages render dynamically at request time.
- **PropertyMeta as server component:** No client state required; location and availability are static strings from the database.
- **PropertyAbout above tiers:** Locked decision from CONTEXT.md — users read about the property before seeing pricing.

## Deviations from Plan
None — plan executed exactly as written.

## Issues Encountered
None.

## Next Phase Readiness
Plan 03-02 (OfferSidebar) can proceed immediately:
- The `col-span-2 sticky top-20` placeholder div in `page.tsx` is ready to receive `<OfferSidebar>`
- `items-start` is set on the grid container — sticky will function correctly once sidebar is rendered
- The `property` object with all fields (packages, priceFrom, etc.) is already fetched and available in page.tsx
- Plans 03-03 (tiers, demographics, chips) can be inserted inside the left column's `space-y-8` div below `<PropertyAbout>`

## Self-Check: PASSED
