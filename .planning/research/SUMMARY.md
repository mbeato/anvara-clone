# Project Research Summary

**Project:** Anvara — Sponsorship Marketplace Frontend Prototype
**Domain:** B2B marketplace frontend, advertiser-facing browse/discovery
**Researched:** 2026-02-20
**Confidence:** HIGH

## Executive Summary

Anvara is a frontend-only sponsorship marketplace prototype — a few-hour build targeting two founders. The pattern is well-understood: catalog-browse-detail UX, identical in structure to Airbnb, Faire, and G2. The recommended approach is Next.js 16 App Router, TypeScript, Tailwind v4, and ShadCN UI, with all data backed by static TypeScript mock objects. No database, no API routes, no authentication. Every technology choice is npm-verified as of 2026-02-20. The entire prototype can be built and deployed to Vercel in approximately 3 hours.

The product's job is to demonstrate three things the current Anvara site explicitly lacks: mobile responsiveness, proper pricing display (not $0), and skeleton loading states. Beyond those baseline fixes, the highest-impact differentiators — "Recommended for You" strip, audience demographic pills, saved/shortlist via localStorage, audience fit score badge — can all be built using the same data model and component primitives as the core browse flow, adding minimal time.

The primary risk is not technical — it is scope. The most common failure modes for a few-hour build are: over-engineering filter state before a single filter works, perfecting mock data types before touching the UI, and adding a fourth page when polish on three is more valuable. Every architectural decision favors build speed: `useState` for filters (not URL params), no API routes, `'use client'` only at leaf interactive components. Three pages. Hard cap.

---

## Key Findings

### Recommended Stack

All versions npm-verified on 2026-02-20. The stack is decided — no negotiation needed.

**Core technologies:**
- **Next.js 16.1.6** — App Router (default); Pages Router is legacy; `params` is a Promise in Next.js 15+, must be awaited
- **React 19.2.4** — Required by Next.js 16; Server Components, `use()` hook, and Suspense are stable
- **TypeScript 5.9.3** — Non-negotiable; typed mock data prevents runtime errors on demo day; use `@types/react@^19` (React 19 changed the children prop signature)
- **Tailwind CSS 4.2.0** — v4 stable, CSS-first config via `@import "tailwindcss"` and `@theme {}`; no `tailwind.config.ts`; use `@tailwindcss/postcss` with Next.js (not the v3 PostCSS plugin)
- **ShadCN CLI 3.8.5** — Components are copied source, not a runtime dep; use `npx shadcn@latest`, not the deprecated `shadcn-ui` package
- **lucide-react 0.575.0** — Default ShadCN icon library; tree-shakable; 1000+ icons
- **sonner 2.0.7** — Toast notifications; ShadCN has a wrapper component; use for "Saved to shortlist" feedback

**Key ShadCN components to install in one command:**
```bash
npx shadcn@latest add card badge button select checkbox slider sheet command dialog tabs table scroll-area navigation-menu input avatar skeleton sonner tooltip separator
```

**Skip entirely:** Prisma, NextAuth, React Query, Zustand, Storybook, Playwright, framer-motion, i18n, @tanstack/react-table, `shadcn-ui` (deprecated package).

See `/Users/vtx/anv/.planning/research/STACK.md` for full version table, mock data type definitions, filter/sort utility patterns, and URL state pattern.

### Expected Features

**Must have (table stakes) — demo reads as unfinished without these:**
- Property card grid: image, name, category, location, audience size, price range
- Filter sidebar: venue type, location, price range (max 3 filters per PITFALLS.md; audience size as display-only on cards)
- Active filter chips showing applied filters with one-click clear per filter
- Search bar (cosmetic or simple JS `.filter()` over mock array; no backend needed)
- Property detail page: hero image, metrics, audience demographics, pricing tiers, CTA
- Non-zero price display: "From $10K" or "$5K–$25K" — never "$0" (explicit current Anvara bug)
- Skeleton loading states on card grid and detail page (explicit current Anvara bug)
- Empty state when filters return zero results (icon + "No properties match" + reset link)
- Mobile-responsive layout at 375px (explicit current Anvara limitation)
- "Request Quote" modal with form (name, company, message) and success state — not a dead button

**Should have (differentiators — most under 30 min each):**
- "Recommended for You" strip above the browse grid: hardcode 3–4 featured items + label "Based on your interest in sports sponsorships"; never let it render empty in the demo
- Audience demographic pills on cards: age range, gender split — pulls from mock data, zero extra logic
- Audience fit score badge on cards: "87% match" — purely cosmetic, takes 20 minutes
- Saved / shortlist via localStorage: heart icon on card; high perceived sophistication for minimal effort
- Availability signal on cards: "Booking now" or "Available Q3 2026" — single mock data field

**Ship if time allows:**
- Recently viewed strip (localStorage, reuses PropertyCard)
- Compare view (checkbox select + slide-up tray) — highest demo impact, medium complexity; only if core is solid

**Defer or skip entirely:**
- Authentication, map view, messaging, pagination, multi-currency, property reviews, analytics dashboard, onboarding flow, fourth page of any kind

See `/Users/vtx/anv/.planning/research/FEATURES.md` for full feature dependency graph, anti-features rationale, and MVP priority ordering.

### Architecture Approach

Three routes, feature-grouped component folders, static TypeScript data layer, no API routes. Pages are Server Components by default. The single meaningful Client Component boundary is `BrowseClient` on the browse page — it holds `useState` for filter state and passes derived filtered results to `PropertyGrid`. All data is synchronous TypeScript module imports; no `fetch()`, no loading states from async, no API routes.

**File structure:**
```
app/
  layout.tsx                 # Root layout, Nav, font loading, metadata
  page.tsx                   # Landing page (/)
  browse/page.tsx            # Browse/discovery (/browse)
  properties/[id]/page.tsx   # Property detail (/properties/[id])
components/
  ui/                        # ShadCN primitives (treat as dependency, do not edit)
  layout/                    # Nav, Footer (Server Components)
  landing/                   # Hero, HowItWorks, FeaturedProperties, CTA
  browse/                    # FilterPanel, PropertyGrid, PropertyCard, BrowseClient
  property/                  # PropertyHeader, PropertyStats, PropertyPackages, PropertyContact
lib/data/
  types.ts                   # TypeScript interfaces (Property, SponsorshipPackage, FilterState)
  properties.ts              # Mock data array + filterProperties() + sortProperties()
  categories.ts              # Filter option constants
  index.ts                   # Re-exports + query helpers (getProperty, getFeaturedProperties)
```

**Major components and responsibilities:**
1. `lib/data/` — Entire data layer; synchronous imports only; `getProperty()`, `filterProperties()`, `getFeaturedProperties()`
2. `BrowseClient` — The only Client Component of significance; owns filter `useState`; wires FilterPanel to PropertyGrid
3. `PropertyCard` — Reused on landing (static) and browse (filtered); define once, reference everywhere
4. `app/properties/[id]/page.tsx` — Dynamic Server Component; `await params` before accessing `id`; add `generateStaticParams` for instant Vercel static build

**Server vs Client rules:**
- Pages stay Server Components — do not add `'use client'` to page files
- Add `'use client'` only to: `BrowseClient`, `FilterPanel`, `PropertyContact`
- ShadCN components have `'use client'` internally — import them freely into Server Components
- When in doubt for a prototype, `'use client'` on a component is safe; the performance cost is irrelevant for a 2-person demo

See `/Users/vtx/anv/.planning/research/ARCHITECTURE.md` for full component hierarchy, data flow diagrams, build phase breakdown, and anti-patterns.

### Critical Pitfalls

1. **Over-engineering filter state** — Use `useState` with a flat object (`{ category, region, priceMin, priceMax }`), derive filtered results with inline `.filter()`. No `useReducer`, no URL params, no `FilterProvider`. 12–16 items need no memoization. This costs 2+ hours and looks identical to the simple version.

2. **$0 / null / empty data reaching the UI** — Audit every rendered field before deploy. Use price ranges in mock data, not exact figures. `price === 0 ? "Request Quote" : formatPrice(price)`. Search mock data for `0`, `null`, `""`, `"TBD"` before pushing to Vercel. This is explicitly flagged as a current Anvara bug.

3. **Missing skeleton loading states** — The PROJECT.md explicitly flags loading flash as a current problem. Use ShadCN `Skeleton` with `useEffect + setTimeout(200–400ms)` simulation on the card grid and detail page. Non-negotiable.

4. **CTA button that does nothing** — "Request Quote" modal needs a heading, form fields (name, company, message), Submit button, and success state. A button with no `onClick` reads as broken. Never ship it.

5. **`next/image` hostname not configured** — Add `images.remotePatterns` to `next.config.ts` on day one for all external image hosts (Unsplash, Picsum). Works in dev, silently breaks on Vercel.

6. **Build passes locally, fails on Vercel** — Run `npm run build` locally before every Vercel push. Common failures: TypeScript errors in route params, unresolved imports, missing `generateStaticParams` for `[id]` routes.

7. **Default browser tab title** — Update `metadata` in `layout.tsx` (`title: "Anvara | Sponsorship Marketplace"`). Five minutes. Visible immediately to anyone who opens the link.

See `/Users/vtx/anv/.planning/research/PITFALLS.md` for full time-sink list, polish-killer list, scope-creep risks, and the pre-send checklist.

---

## Implications for Roadmap

Based on combined research, a 6-phase build order totaling approximately 3 hours. This order is strongly recommended — it front-loads the data contract (everything depends on it), builds the detail page before browse (validates type expressiveness at the most complex data shape before it is used in two places), and leaves the static landing page for last.

### Phase 1: Foundation and Data Layer (30 min)

**Rationale:** TypeScript interfaces and mock data are the contract for every other component. Define them first to prevent prop refactoring later. Running `npm run dev` from minute one enables live feedback through all subsequent phases.
**Delivers:** Working Next.js project, ShadCN initialized with all components installed, `lib/data/types.ts` with `Property` / `SponsorshipPackage` / `FilterState` interfaces, 12–16 mock property records, query helpers in `lib/data/index.ts`
**Addresses:** Data model that supports filtering (category, region, price range), availability signal field, audience demographics
**Avoids:** 45+ min schema perfectionism; build types from what the UI actually renders; flat objects are fine; timebox to 30 min

**Data shape note:** Reconcile the two type definitions across research files — STACK.md's `SponsorshipProperty` type is more complete for filtering (includes `region`, `priceFrom`, `rating`, `featured`). Use it as the base. Add `availability: string` (FEATURES.md requirement not in either type).

### Phase 2: Root Layout and Navigation Shell (20 min)

**Rationale:** Every page renders inside the root layout. Building it second means all subsequent page work renders in real context with correct typography, nav, and favicon from the first render. Also forces early decisions on color palette — these cascade.
**Delivers:** `app/layout.tsx`, `components/layout/nav.tsx`, `components/layout/footer.tsx`, `next/font/google` integration, updated `metadata` (title, description), replaced favicon, `images.remotePatterns` in `next.config.ts`
**Avoids:** Font loading flash (FOUT) by using `next/font`, not a `<link>` tag; "Create Next App" default tab title on demo day; Vercel image hostname errors from missing `remotePatterns`

### Phase 3: Property Detail Page (45 min)

**Rationale:** This page has the most complex data shape (nested `SponsorshipPackage[]`, audience demographics). Building it before browse validates that the `Property` type is expressive enough before `PropertyCard` is used in two places. If the type needs a field, fix it once here.
**Delivers:** `app/properties/[id]/page.tsx` (awaits `params`), `PropertyHeader`, `PropertyStats`, `PropertyPackages` (package tier cards), `PropertyContact` (Client Component with Request Quote modal — form + success state), `generateStaticParams`
**Addresses:** Table stakes: detail page, non-zero pricing, working CTA modal
**Avoids:** Dead CTA (non-negotiable), `$0` display, Vercel build failure from missing `generateStaticParams` on dynamic route

### Phase 4: Browse and Discovery Page (45 min)

**Rationale:** `PropertyCard` composition patterns are solved in Phase 3. Browse is primarily about the `BrowseClient` Client Component boundary — the architectural challenge of the entire prototype. Reuse card patterns from Phase 3; do not redesign them.
**Delivers:** `app/browse/page.tsx`, `BrowseClient` (Client Component with `useState` filter object), `FilterPanel` (max 3 filter controls: category dropdown, region dropdown, price range slider), `PropertyGrid`, `PropertyCard`, active filter chips, skeleton loading states, empty state, "Recommended for You" strip (3–4 hardcoded featured items with descriptive label)
**Addresses:** Table stakes: card grid, filter sidebar, filter chips, skeleton loading (PROJECT.md fix), empty state, personalization signal (differentiator)
**Avoids:** URL-synced filter state (over-engineering for zero visible benefit), more than 3 filter dimensions (scope creep), blank page on zero filter results

### Phase 5: Landing Page (30 min)

**Rationale:** Landing is almost entirely static marketing copy. No new component patterns needed. Saving it last means a fully functional app exists in Phases 1–4 and landing polish can focus on what actually looks good rather than being built under the pressure of broken underlying pages.
**Delivers:** `app/page.tsx`, `Hero` (headline, subheadline, CTA to `/browse`), `FeaturedProperties` (reuses `PropertyCard`), `HowItWorks` (three-step explainer), `CTA` (bottom conversion section)
**Avoids:** Building landing first and running out of time for the functional browse/detail pages

### Phase 6: Differentiators, Polish, and Deploy (20 min)

**Rationale:** Core product is working. Layer on product-thinking signals, do the mobile pass, run `npm run build` locally, and deploy.
**Delivers:** Audience fit score badge (cosmetic "87% match" label), availability signal on cards, mobile responsive check at 375px and 1280px, `npm run build` local verification, Vercel deploy, `noindex` meta tag
**Addresses:** Differentiators (personalization signal, demographic pills, mobile layout — all PROJECT.md improvements)
**Avoids:** framer-motion animations, a fourth page, real recommendation logic, responsive breakpoint perfectionism (test at two widths, stop)

**Stretch goals (only if Phases 1–6 are solid):**
- Saved/shortlist via localStorage (heart icon on card)
- Recently viewed strip (reuses PropertyCard)
- Compare tray — highest demo impact, medium complexity

**Total estimated time: ~3 hours**

### Phase Ordering Rationale

- Data layer before all UI: every component prop type derives from `Property` and `SponsorshipPackage`
- Detail page before browse: validates type expressiveness at the most data-rich component before `PropertyCard` is used in two places
- Browse before landing: landing reuses `PropertyCard`; avoids building the component twice with slightly different data
- Differentiators and deploy as a dedicated final phase: prevents scope bleed into core build phases; ensures deploy-day surprises are caught locally first

### Research Flags

Phases with standard, well-documented patterns — skip additional research:
- **Phase 1:** `create-next-app` + `npx shadcn@latest init` is a one-command workflow; official docs comprehensive
- **Phase 2:** Root layout, `next/font/google`, metadata — official Next.js docs cover everything
- **Phase 4:** `useState` filter pattern is established; ShadCN Skeleton is drop-in; empty state is a standard component
- **Phase 5:** Static marketing page; no novel patterns
- **Phase 6:** Vercel deploy is `vercel --prod`; localStorage patterns are trivial

Phases that warrant a quick reference check during build:
- **Phase 3:** Dynamic route `params` as Promise (Next.js 15+ change) — re-read the relevant section in ARCHITECTURE.md before building; `generateStaticParams` pattern is documented there
- **Phase 6:** Confirm external image hosts in mock data match `remotePatterns` before first Vercel push; verify `npm run build` passes locally before deploying

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | All versions npm-verified on 2026-02-20; Tailwind v4 CSS-first config confirmed stable; `shadcn` vs `shadcn-ui` distinction verified |
| Features | MEDIUM | Table stakes and anti-features are HIGH (universal marketplace patterns); differentiator prioritization is MEDIUM (based on comparable platform analysis, no live Anvara user research) |
| Architecture | HIGH | Sourced from official Next.js 16.1.6 docs (verified 2026-02-20); Server/Client split, data flow, and `params` Promise behavior are canonical and documented |
| Pitfalls | HIGH | Next.js App Router, ShadCN, and Vercel deployment patterns are well-established and stable; prototype scope pitfalls reflect high-consensus community patterns |

**Overall confidence:** HIGH

### Gaps to Address

- **Type definition inconsistency:** STACK.md and ARCHITECTURE.md define slightly different `Property` interfaces. STACK.md's `SponsorshipProperty` is more complete for filtering (includes `region`, `priceFrom`, `featured`, `rating`). Use STACK.md as the base and add `availability: string` before Phase 1 ends.
- **Image sourcing:** Both Unsplash Source API and Picsum are mentioned. Pick one before writing mock data. Picsum (`https://picsum.photos/seed/[id]/800/600`) offers consistent seeds, which is more reliable for a static prototype. Add the hostname to `next.config.ts` `remotePatterns` in Phase 2.
- **Filter count tension:** PITFALLS.md recommends max 3 filters for scope reasons; FEATURES.md lists 4 (venue type, location, audience size, price range). Resolution: use category, region, and price range as the 3 filter controls; show audience size as a display-only field on cards, not a filter.

---

## Sources

### Primary (HIGH confidence)
- npm registry (live queries, 2026-02-20) — all package versions in STACK.md
- Next.js official docs v16.1.6 (2026-02-20) — project structure, Server/Client composition, dynamic routes, `params` as Promise, `generateStaticParams`, `next/font`
- ShadCN official docs — component list, CLI usage, component patterns

### Secondary (MEDIUM confidence)
- Training knowledge of SponsorPitch, OpenSponsorship, SponsorMyEvent, Hookit, Zoomph — feature table stakes and differentiators for sponsorship marketplace UX
- Training knowledge of Airbnb, Faire, G2, Upwork — adjacent marketplace browse/filter patterns
- Community consensus on prototype scope management and demo anti-patterns

### Tertiary
- PROJECT.md (provided context) — identified current Anvara pain points: loading flash, $0 pricing, desktop-only layout, no personalization

---

*Research completed: 2026-02-20*
*Ready for roadmap: yes*
