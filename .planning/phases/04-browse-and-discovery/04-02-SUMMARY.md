---
phase: 04-browse-and-discovery
plan: 02
subsystem: ui
tags: [embla-carousel, autoplay, category-carousel, browse, filter, url-params, next-navigation]

# Dependency graph
requires:
  - phase: 04-01
    provides: Browse page foundation, PropertyCard component, embla-carousel-autoplay@8 installed
provides:
  - Auto-scrolling category image carousel with Embla autoplay (3s, hover-pause)
  - Compact text-only category tab row (All + 5 categories, pill style)
  - BrowseClient shell orchestrating carousel, tabs, filter state via URL params
  - router.replace pattern for filter updates without scroll
affects:
  - 04-03 (FilterBar wired into BrowseClient placeholder)
  - 04-04 (RecommendationsStrip wired into BrowseClient placeholder)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Client shell pattern: Server Component fetches data, Client Component owns all interactivity"
    - "URL-first filter state: router.replace with URLSearchParams preserves all filters across navigation"
    - "useRef for Embla plugin: prevents plugin recreation on re-render"

key-files:
  created:
    - app/(app)/browse/_components/category-carousel.tsx
    - app/(app)/browse/_components/category-tab-row.tsx
    - app/(app)/browse/_components/browse-client.tsx
  modified:
    - app/(app)/browse/page.tsx

key-decisions:
  - "useRef for Autoplay plugin — prevents plugin recreation on every render, maintains autoplay state"
  - "button element for carousel cards — semantic interactivity vs clickable div"
  - "clearFilters() link inline in property count — avoids dedicated reset button, reduces clutter"
  - "TAB_CATEGORIES limited to 6 (All + 5 seeded) — matches actual seed data, avoids empty results"

patterns-established:
  - "BrowseClient shell: server fetches, client owns layout and URL filter state"
  - "updateFilter(key, value): builds URLSearchParams from currentFilters, router.replace for SPA navigation"

# Metrics
duration: 2min
completed: 2026-02-21
---

# Phase 4 Plan 02: Category Carousel and Tab Row Summary

**Embla autoplay carousel with 8 category image cards, compact pill tab row, and BrowseClient URL-filter shell wiring carousel + tabs into browse page**

## Performance

- **Duration:** ~2 min
- **Started:** 2026-02-21T10:23:58Z
- **Completed:** 2026-02-21T10:25:18Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments

- CategoryCarousel: 8 category cards with picsum.photos seed images, Embla Autoplay at 3s delay, pauses on hover (stopOnMouseEnter), loop=true, no arrows or dots for clean design
- CategoryTabRow: text-only pill buttons for All + 5 seeded categories, active state uses primary brand blue, horizontal scroll with scrollbar-hide
- BrowseClient: orchestrates carousel + tabs, manages filter state via URL params using router.replace, preserves all existing filters when changing one, clearFilters() resets all
- page.tsx: refactored from inline layout to clean Server Component that fetches and delegates to BrowseClient

## Task Commits

Each task was committed atomically:

1. **Task 1: Create CategoryCarousel with Embla autoplay** - `00694b7` (feat)
2. **Task 2: Create CategoryTabRow, BrowseClient shell, wire page.tsx** - `ceac970` (feat)

**Plan metadata:** (docs commit pending)

## Files Created/Modified

- `app/(app)/browse/_components/category-carousel.tsx` - Auto-scrolling Embla carousel with 8 category image cards, gradient overlay labels, onCategoryClick prop
- `app/(app)/browse/_components/category-tab-row.tsx` - Text-only pill tab navigation row, activeCategory prop drives active state
- `app/(app)/browse/_components/browse-client.tsx` - Client shell orchestrating carousel + tabs + grid, updateFilter/clearFilters via router.replace
- `app/(app)/browse/page.tsx` - Server Component simplified: fetches data, passes to BrowseClient

## Decisions Made

- `useRef` for Autoplay plugin instance — prevents recreation on re-render, maintains stable autoplay state through component lifecycle
- `button` element for carousel cards (not `div`) — semantic HTML for clickable interactive elements
- Inline clear filters link in property count label — avoids separate button, cleaner layout
- TAB_CATEGORIES capped at 5 seeded categories (sports, music, arts, food, lifestyle) + All — avoids empty grid results from unsupported category slugs

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None - picsum.photos was already in next.config.ts remotePatterns from Phase 1. embla-carousel-autoplay@8 already installed from 04-01. All TypeScript checks passed clean.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- BrowseClient has placeholder comment `{/* FilterBar — wired in Plan 04-03 */}` at correct insertion point
- BrowseClient has placeholder comment `{/* RecommendationsStrip — wired in Plan 04-04 */}` at correct insertion point
- `currentFilters` prop already threaded through to support FilterBar in 04-03
- `data-has-filters` attribute on grid div ready for RecommendationsStrip in 04-04
- Ready for 04-03 (FilterBar: price range slider, region select, sort order)

---
*Phase: 04-browse-and-discovery*
*Completed: 2026-02-21*

## Self-Check: PASSED
