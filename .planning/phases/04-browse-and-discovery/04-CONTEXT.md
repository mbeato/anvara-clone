# Phase 4: Browse and Discovery - Context

**Gathered:** 2026-02-21
**Status:** Ready for planning

<domain>
## Phase Boundary

Browse page where advertisers discover sponsorship properties through a card grid, category carousel, tab filtering, region/price/event-type filters, skeleton loading states, and a "Recommended for you" strip. Search functionality, messaging, and offer creation are separate phases.

</domain>

<decisions>
## Implementation Decisions

### Card grid & layout
- 5 cards per row on desktop (matches current Anvara grid density)
- Each card shows: image, name, description, price range, and start date
- Subtle lift + shadow on hover interaction
- Card images use fixed aspect ratio with object-cover (cropping acceptable for grid uniformity)

### Category carousel & tabs
- Hero image carousel at top with category images
- Compact text-only category label row below carousel (no icons) for quick navigation
- Auto-scroll with pause on hover
- Selecting a category tab filters the card grid (not scroll-to-section)
- Goal: feel less cluttered than current dots-heavy carousel

### Filtering & empty states
- Horizontal filter bar above the card grid (not sidebar)
- Three filter types: region dropdown, price range, event type
- Active filters display as removable chips styled to echo Anvara's existing category labels — maintain platform familiarity
- Empty state: icon + "No properties match" message + clear filters button
- Category tabs also act as a filter (decided above)

### Recommendations strip
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

</decisions>

<specifics>
## Specific Ideas

- User wants to reduce clutter from the current Anvara carousel (too many dots, takes forever to scroll)
- Active filter chips should reuse/echo the existing Anvara category label styling for platform consistency
- Card grid density of 5 per row is a deliberate match to the current platform — user likes this density

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 04-browse-and-discovery*
*Context gathered: 2026-02-21*
