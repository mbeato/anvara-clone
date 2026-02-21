# Phase 3: Property Detail - Context

**Gathered:** 2026-02-21
**Status:** Ready for planning

<domain>
## Phase Boundary

Full property detail page where an advertiser sees everything needed to make a sponsorship decision — hero images, about section, tier pricing, audience demographics, brand categories, activation formats, and a working offer sidebar. Documents section deferred. Creating/submitting offers handled in Phase 5 (Messaging).

</domain>

<decisions>
## Implementation Decisions

### Page layout & hero section
- 60/40 split at top: left side is a single image with carousel (dots/arrows to cycle), right side is sticky offer sidebar
- Images must be properly contained — no cropping tops/bottoms, no oversized full-width banners
- Property metadata below the image carousel: name, category badge, date range, location
- The sidebar sticks as user scrolls down through the rest of the page (like Airbnb booking widget)

### Page flow (top to bottom)
1. Hero row: Image carousel (60%) + Sticky sidebar (40%)
2. Property name + metadata (category, date, location)
3. About this Listing (truncated with "Read more" expand)
4. Tiers section (vertical layout)
5. Audience demographics (visual charts)
6. Ideal Brand Categories (chips/tags)
7. Activation Formats (chips/tags)

### Offer sidebar (sticky, right side)
- Top: Minimum spend / starting price
- Primary CTA: "Make an Offer" button (green, prominent) — opens modal form overlay
- Secondary: "Message" button
- Tertiary: "Schedule Call" button
- Trust badges: "Verified Seller" and "Money Secured" — both kept, below CTAs
- "Build your own offer" section at bottom of sidebar

### Pricing tier display
- Vertical layout with ascending prices (cheapest at top, most expensive at bottom)
- Clickable rows — selecting a tier expands its description/bullet list on the right side
- Selected tier highlighted with Anvara brand-colored border/accent, others stay muted
- Prices formatted as full dollar amounts with commas: $15,000 (never $0, never abbreviated)
- "Build your own offer" below tiers: structured form with fields for budget, desired deliverables (checkboxes), and notes

### About this Listing
- Positioned ABOVE tiers — users should understand the property before seeing pricing
- Truncated to 3-4 lines with "Read more" to expand full description
- Can revisit truncation decision if it looks bad in practice

### Audience demographics
- Visual charts + numbers, not plain text lists
- Gender as a split bar chart
- Age as a distribution chart
- HHI as a range indicator
- Lifestyle categories visualized (not just bullets)

### Brand categories & activation formats
- Both displayed as chip/tag pills in flowing rows
- Compact, scannable, visually distinct from body text

### Make an Offer CTA behavior
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

</decisions>

<specifics>
## Specific Ideas

- Current Anvara site uses too much vertical space for images — user has to scroll 2 full screens before seeing tier info. Fix this by making images compact (single carousel, not gallery grid)
- Keep sidebar CTA ordering faithful to current Anvara: price → Make Offer → Message → Schedule Call
- Tier layout is a deliberate departure from current site's horizontal tabs — vertical with ascending prices is the UX improvement
- About section moved above tiers is a deliberate departure — property context before pricing
- Reference screenshots in `/screenshots/Listing1-4.png` for current Anvara detail page layout

</specifics>

<deferred>
## Deferred Ideas

- Documents section (PDF links) — can add in Phase 7 Polish if needed
- Actual offer submission/storage — Phase 5 (Messaging) handles the backend

</deferred>

---

*Phase: 03-property-detail*
*Context gathered: 2026-02-21*
