# Phase 2: Layout Shell - Context

**Gathered:** 2026-02-21
**Status:** Ready for planning

<domain>
## Phase Boundary

Shared root layout wrapping every page — left sidebar navigation, top header bar, footer attribution, and visual theming. This establishes Anvara's visual identity so all subsequent pages render in real context.

</domain>

<decisions>
## Implementation Decisions

### Sidebar navigation
- Match current Anvara nav items (Marketplace, Campaigns, Messages, Settings, etc.)
- Collapsed by default (icons only) — slim sidebar maximizes content area
- Anvara logo mark at the top of the sidebar, acts as home link
- Active page indicated with highlighted icon + vertical accent bar on left edge
- Expand behavior: Claude's discretion (hover, click, or stays collapsed)

### Header bar
- Left: Page breadcrumb showing current location
- Center: Search bar — basic client-side filter that filters properties by name on browse page
- Right: Hardcoded demo user — static avatar image + name like "Demo Advertiser"
- Bell icon with static mock notification badge (e.g., "3") for realism

### Visual identity
- Inspired by Anvara brand colors but with creative liberties — show what the product COULD look like
- Light/dark mode toggle in the header bar (near user avatar area)
- Default to light mode on first visit
- Dark mode theme follows same brand palette, adapted for dark surfaces

### Footer
- Subtle inline text at bottom of content area (not a distinct bar)
- Scrolls with content (not sticky)
- "Prototype by Max Beato" attribution
- Tech stack mention: Next.js, Prisma, Vercel
- Links: LinkedIn + GitHub

### Claude's Discretion
- Sidebar expand/collapse interaction pattern (hover vs click vs always collapsed)
- Exact Anvara brand color values and their dark mode adaptations
- Header bar height and spacing
- Search bar placeholder text and styling
- Avatar image source for demo user
- Notification badge positioning
- Footer typography and link styling
- Dark mode persistence mechanism (localStorage vs cookie)

</decisions>

<specifics>
## Specific Ideas

- Shell should feel like a polished B2B dashboard (Linear, Notion caliber) — not a generic template
- Sidebar is icon-only by default to maximize content real estate
- Search should actually work as a basic client-side property name filter (not just decorative)
- Footer is understated — small text, not a big footer section

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 02-layout-shell*
*Context gathered: 2026-02-21*
