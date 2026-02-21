# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-02-21)

**Core value:** An advertiser can browse sponsorship properties, discover relevant opportunities, understand pricing, and initiate deal conversations — with a UX that feels better than the current Anvara site
**Current focus:** Phase 3 — Property Detail (in progress)

## Current Position

Phase: 3 of 7 (Property Detail)
Plan: 2 of 3 in current phase
Status: In progress — Plan 03-02 complete, ready for 03-03 (demographics, tags, categories)
Last activity: 2026-02-21 — Completed 03-02-PLAN.md (PropertyTiers, BuildOfferForm, OfferSidebar, MakeOfferDialog)

Progress: [████████░░] 29% (8/28 plans)

## Performance Metrics

**Velocity:**
- Total plans completed: 8
- Average duration: ~3.6 minutes
- Total execution time: ~0.47 hours

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| Phase 1 (Foundation) | 4/4 COMPLETE | 16 min | 4 min |
| Phase 2 (Layout Shell) | 2/2 COMPLETE | 14 min | 7 min |
| Phase 3 (Property Detail) | 2/3 in progress | 4 min | 2 min |

**Recent Trend:**
- Last 5 plans: 01-04 (4 min), 02-01 (12 min), 02-02 (2 min), 03-01 (2 min), 03-02 (2 min)
- Trend: Fast — Phase 3 running at 2 min/plan consistently

*Updated after each plan completion*

## Accumulated Context

### Decisions

Decisions are logged in PROJECT.md Key Decisions table.
Recent decisions affecting current work:

- [Init]: Add Prisma + Postgres — real data layer shows engineering depth
- [Init]: Advertiser-only perspective — AI plays property side in messaging via o3-mini
- [Init]: Full landing page clone — faithful to Anvara content/messaging
- [Init]: Creative liberties on browse/detail — the value-add pages where UX improvements shine
- [01-01]: Scaffold to /tmp then rsync — create-next-app refuses directories with existing files
- [01-01]: ShadCN new-york style, neutral color — appropriate neutral base for B2B sponsorship marketplace
- [01-02]: Prisma v7 config-file pattern — datasource has no url field; URL lives in prisma.config.ts
- [01-02]: DIRECT_URL for prisma.config.ts (push/migrations), DATABASE_URL (pooled) for lib/prisma.ts runtime
- [01-02]: PrismaNeon adapter required — standard PrismaClient alone incompatible with Neon serverless HTTP driver
- [01-02]: prisma/generated gitignored — generated artifacts not committed; prisma generate runs on install
- [01-03]: DIRECT_URL in seed script (not DATABASE_URL) — seed runs as CLI operation, needs direct non-pooled connection
- [01-03]: isAI: true on all property-side seed messages — matches production intent where AI responds on behalf of properties
- [01-03]: 12 properties seeded (not minimum 10) — covers all 5 categories with adequate depth for demo
- [01-04]: Use Prisma return types directly — no parallel TypeScript interfaces needed
- [01-04]: SVG favicon via app/icon.svg — Next.js App Router auto-detects, vector scales to all sizes
- [01-04]: Query helpers import from lib/data (not lib/prisma) — single data access layer entry point
- [02-01]: ThemeProvider attribute=class must match @custom-variant dark (&:is(.dark *)) in globals.css
- [02-01]: suppressHydrationWarning on <html> required by next-themes (class injected before React hydrates)
- [02-01]: SidebarProvider defaultOpen=false — icon-only collapsed default
- [02-01]: Anvara brand blue --primary oklch(0.45 0.27 264) light / oklch(0.55 0.25 264) dark — hue 264 indigo-blue
- [02-01]: (app) route group separates shell layout from root — all app pages inherit sidebar + theme automatically
- [02-01]: Active sidebar state via data-[active=true]:before: pseudo-element — vertical accent bar left edge
- [02-02]: Breadcrumb reads usePathname() client-side, maps segments to human labels via SEGMENT_LABELS lookup
- [02-02]: Search bar is visual-only for Phase 2 — functional search deferred to later phase
- [02-02]: Footer inside SidebarInset so it scrolls with content (not stuck below sidebar)
- [02-02]: Three anvara.com remotePatterns added: images.anvara.com, www.anvara.com, anvara.com
- [03-01]: object-contain (not object-cover) on carousel images — no cropping per user constraint
- [03-01]: Dot indicators hidden when single image (count > 1 guard) — avoids lone dot confusion
- [03-01]: generateStaticParams returns [] — Neon DB may not be reachable at build time; pages render dynamically
- [03-01]: PropertyAbout positioned above tiers — locked user decision from CONTEXT.md
- [03-02]: MakeOfferDialog visual-only in Phase 3 — offer creation deferred to Phase 5 (Thread FK constraint)
- [03-02]: PropertyTiers sorts ascending by priceUsd — cheapest tier first matches standard SaaS pricing scan pattern
- [03-02]: Contact for pricing fallback when priceUsd === 0 — valid business case for negotiable rates

### Pending Todos

None.

### Blockers/Concerns

- [03-03]: No new ShadCN installs required — all components for demographics, tags, and audience stats can use existing primitives
- [Phase 5]: MakeOfferDialog Server Action must create Thread first before Offer (FK constraint: Offer.threadId required)

## Session Continuity

Last session: 2026-02-21 08:20 UTC
Stopped at: Completed 03-02-PLAN.md — PropertyTiers, BuildOfferForm, OfferSidebar, MakeOfferDialog wired into page
Resume file: None
