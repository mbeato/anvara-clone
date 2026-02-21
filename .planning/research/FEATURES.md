# Features Research

**Domain:** Sponsorship marketplace — advertiser-facing browse/discovery
**Project:** Anvara Frontend Prototype
**Researched:** 2026-02-20
**Confidence:** MEDIUM — based on training-data knowledge of comparable platforms (SponsorPitch, OpenSponsorship, SponsorMyEvent, Hookit, Zoomph, Sportfive) plus adjacent marketplace patterns (Airbnb, Faire, G2). Web verification unavailable this session. Core browse-UX patterns are stable and well-established.

---

## Table Stakes (Must Have)

Features that make the prototype feel like a real product. Missing any of these and it reads as unfinished.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Property card grid | Primary browse surface — every marketplace has it | Low | Cards with image, name, category, location, audience size, price signal |
| Filter sidebar / filter bar | Can't browse without narrowing — absolute table stakes | Low-Med | Venue type, location, audience size, price range at minimum |
| Search bar | Users expect to search by name/keyword | Low | Can be cosmetic/non-functional with placeholder state in prototype |
| Property detail page | Cards lead somewhere; no detail = dead end | Med | Hero image, key metrics, audience data, pricing tiers, CTA |
| Pricing display (non-zero) | $0 is broken; "Request Quote" or range is the fix | Low | This is a direct identified pain point — fix it |
| Loading states (skeleton) | No loading flash = the bar Anvara doesn't clear currently | Low | Simulated via setTimeout; skeleton cards not spinners |
| Empty state | What happens when filters return nothing | Low | Simple illustration + "clear filters" link |
| Category/type tags on cards | Helps scanners identify property type instantly | Low | Sports, Festival, Venue, Arts, etc. |
| Mobile-responsive layout | Anvara is desktop-only — this is the explicit differentiator | Med | Tailwind responsive classes; test at 375px |
| Clear CTA on detail page | "Request Quote" — shows the conversion path | Low | Mock modal OK; doesn't need to send |

---

## Differentiators (Impress Founders)

Features that show product thinking beyond the current Anvara site. These signal that the builder understands the *user's job* (find the right sponsorship), not just the UI surface.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| "Recommended for You" section | Signals personalization thinking; marketplace-native pattern | Low | Always-visible strip above the full grid; mock matching on category/audience size. Appears even without real user data — sets the expectation |
| Audience fit score / match % | Tells the advertiser at a glance how relevant a property is to their stated goals | Low | Mock % badge on cards; "87% audience match" — no real logic needed, just the UI signal |
| Price range instead of exact price | Correct UX for RFQ-model marketplaces; eliminates $0 problem entirely | Low | "$5K–$25K" or "From $10K" — maps to how sponsorship is actually sold |
| Saved / shortlist | Advertisers browse across sessions; shortlisting is expected on serious platforms | Low | Heart icon on card, persisted to localStorage; no backend needed |
| Audience demographic preview on cards | Reduces clicks; surface top 2 audience signals (age range, gender split) inline | Low | Tiny stat pills on the card; pulls from mock data |
| Compare view (2–3 properties) | Rare on sponsorship platforms but natural for a considered purchase | Med | Checkbox select + slide-up compare tray; high demo impact, moderate build cost |
| "Recently viewed" strip | Standard e-commerce pattern missing from most sponsorship tools | Low | LocalStorage; shows awareness of browse session behavior |
| Filter active state / applied chip summary | Shows which filters are active; one-click clear per filter | Low | "Venue type: Festival x" chips under filter bar |
| Category landing browse (pre-filtered views) | Sports / Festivals / Venues nav that pre-sets filters — reduces friction for goal-oriented visitors | Low | Can be nav links that set URL params; landing page CTA targets one |
| Availability signal | "Available Q3 2026" or "Booking now" on cards | Low | Mock data field; tells advertisers when they can act |

---

## Anti-Features (Skip These)

Things that look useful but add complexity with no demo impact for a 2-person audience reviewing for 20 minutes.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| Authentication / login flow | Zero demo value; founders are the only viewers; adds 1–2 hours of work | Start on browse page directly; or a fake "logged in as Acme Brands" state in the nav |
| Property owner / listing creation | Out of scope by definition; prototype is advertiser-facing only | Focus all energy on the buyer side |
| Real search with indexing | Full-text search is backend work; demo value is the UI, not the algorithm | Cosmetic search bar with placeholder, or simple JS filter on mock data array |
| Map view | Visually appealing but expensive to implement well (Mapbox tokens, clustering, responsive map); distracts from the browse flow | Show location as text on cards; mention "Map view coming" if needed |
| Pagination / infinite scroll with real data | Mock data set is small; fake pagination adds code complexity for no perceived value | Show all 12–20 mock cards; no pagination needed |
| Messaging / inbox | Full feature requiring backend; not the demo's point | "Request Quote" modal is sufficient to show the conversion path |
| Analytics dashboard | This is the property owner side, not the advertiser side | Not in scope |
| Notification system | Requires state management depth that doesn't photograph well | Static nav avatar is enough |
| Multi-currency / locale | No internalization complexity needed for a US-market prototype | Hardcode USD |
| Property review / ratings | Valuable in a real product; no mock data to support it convincingly | Omit entirely or show as "coming soon" if there's space |

---

## Feature Dependencies

What depends on what — build order matters.

```
Mock data schema
  └── Property card grid              (cards need data shape defined first)
        └── Filter sidebar            (filters act on the same data)
              └── Filter active chips (chips reflect filter state)
        └── "Recommended for You"     (needs same card component, different data slice)
        └── Saved / shortlist         (needs card component + localStorage)
        └── Recently viewed           (needs card component + localStorage)
  └── Property detail page            (needs same data schema, more fields)
        └── Request Quote CTA         (needs detail page to exist)
        └── Audience demographic      (same data, displayed differently)

Skeleton loading states
  └── Applied to: card grid, detail page, recommendations strip
  └── Requires: data loading simulation (setTimeout) to be wired up first

Mobile layout
  └── Applied to: every component — do this via Tailwind from the start, not as a retrofit
```

Key principle: Define the mock data schema before building any UI. Every feature depends on it. A property object needs at minimum: `id`, `name`, `category`, `location`, `audienceSize`, `priceRange`, `availability`, `imageUrl`, `audienceDemographics`, `description`, `pricingTiers[]`.

---

## MVP Recommendation

For a few-hour prototype targeting two founders, prioritize in this order:

**Must ship:**
1. Mock data schema (10 min — everything else depends on it)
2. Property card grid with real image, name, category, location, price range, audience size
3. Filter sidebar (venue type, location, audience size, price range) with active chips
4. "Recommended for You" strip above the grid (same card component, different data slice)
5. Skeleton loading states on the grid
6. Property detail page with metrics, audience data, pricing tiers, Request Quote modal
7. Mobile-responsive layout (baked in from the start via Tailwind)

**Ship if time allows:**
- Saved / shortlist (localStorage, low effort, high perceived sophistication)
- Audience fit score / match % badge on cards (purely cosmetic, takes 20 min)
- Recently viewed strip

**Defer:**
- Compare view: High demo impact but medium complexity; only build if the first 7 are solid
- Category landing pages: Nice but not critical if filter sidebar is good
- Map view: Skip entirely

---

## Sources

**Confidence note:** WebSearch and WebFetch were unavailable for this session. Findings are based on training-data knowledge (cutoff August 2025) of the following platforms and patterns:

- Comparable platforms surveyed conceptually: SponsorPitch, OpenSponsorship, SponsorMyEvent, Hookit, Zoomph, Sportfive/TEAM Marketing
- Adjacent marketplace patterns: Airbnb browse/filter, Faire (B2B wholesale marketplace), G2 (software discovery), Upwork (service marketplace)
- Identified current Anvara site issues (from PROJECT.md): loading flash, $0 pricing, desktop-only, no personalization

**Confidence by area:**
| Area | Level | Reason |
|------|-------|--------|
| Table stakes | HIGH | Browse/filter/card/detail/CTA is universal across marketplace category; stable pattern |
| Differentiators | MEDIUM | Personalization signals and fit scores are directionally correct but specific implementation varies by platform |
| Anti-features | HIGH | Auth, map view, messaging, pagination complexity — well-established scope traps for prototype demos |
| Dependencies / build order | HIGH | Standard data-first component dependency graph; not domain-specific |
