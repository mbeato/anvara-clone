# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-02-21)

**Core value:** An advertiser can browse sponsorship properties, discover relevant opportunities, understand pricing, and initiate deal conversations — with a UX that feels better than the current Anvara site
**Current focus:** Phase 5 (Messaging) — plan 1/N complete

## Current Position

Phase: 5 of 7 (Messaging) — In progress
Plan: 1 of ? in phase — COMPLETE
Status: 05-01 complete — messaging inbox foundation established
Last activity: 2026-02-21 — Completed 05-01-PLAN.md (Messaging Inbox Foundation)

Progress: [██████████████░] 50% (14/28 plans)

## Performance Metrics

**Velocity:**
- Total plans completed: 14
- Average duration: ~2.7 minutes
- Total execution time: ~0.63 hours

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| Phase 1 (Foundation) | 4/4 COMPLETE | 16 min | 4 min |
| Phase 2 (Layout Shell) | 2/2 COMPLETE | 14 min | 7 min |
| Phase 3 (Property Detail) | 3/3 COMPLETE | 7 min | 2.3 min |
| Phase 4 (Browse/Discovery) | 4/4 COMPLETE | 9 min | 2.3 min |
| Phase 5 (Messaging) | 1/? in progress | 2 min | 2 min |

**Recent Trend:**
- Last 5 plans: 04-02 (2 min), 04-03 (1 min), 04-04 (4 min), 05-01 (2 min)
- Trend: Fast — consistently ~2-4 min/plan

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
- [03-02]: PropertyTiers sorts ascending by priceUsd — cheapest tier first matches standard SaaS pricing scan pattern
- [03-02]: Contact for pricing fallback when priceUsd === 0 — valid business case for negotiable rates
- [03-03]: ChartContainer h-10 className override required — default aspect-video collapses chart in grid cells
- [03-03]: createOffer creates Thread first (FK constraint), initial Message inline in thread.create, Offer last
- [03-03]: FORMAT_MAP subcategory-first lookup — allows future per-subcategory format lists without changing category defaults
- [03-03]: MakeOfferDialog wired to real createOffer server action in 03-03 (not deferred to Phase 5 as originally planned in 03-02)
- [04-01]: embla-carousel-autoplay@8 (not @9) — v9 removed stopOnMouseEnter/stopOnInteraction needed by 04-02
- [04-01]: PropertyCard uses object-cover — Phase 4 context allows cropping for grid uniformity (differs from Phase 3 object-contain)
- [04-01]: Intl.NumberFormat singleton outside component — avoids recreating formatter on every render
- [04-01]: data-has-filters attribute on browse grid div — consumed by recommendations strip in 04-04
- [04-02]: useRef for Autoplay plugin instance — prevents recreation on re-render, maintains stable autoplay state
- [04-02]: button element for carousel cards (not div) — semantic HTML for clickable interactive elements
- [04-02]: TAB_CATEGORIES capped at 5 seeded categories — avoids empty grid results from unsupported slugs
- [04-02]: BrowseClient pattern: Server Component fetches, Client Component owns layout + URL filter state
- [04-03]: Sentinel 'all' for Radix Select items — empty string disallowed as item value; map to undefined in handler
- [04-03]: onValueCommit not onValueChange on Slider — prevents URL spam on every drag pixel
- [04-03]: maxPrice chip/param suppressed at 150k ceiling — omit no-op filter display and URL entry
- [04-03]: Event type dropdown shares category URL param with CategoryTabRow — stays in sync automatically
- [04-04]: scrollbar-hide added to globals.css (not Tailwind plugin) — Tailwind v4 lacks native scrollbar utility; globals.css is the correct extension point
- [04-04]: Recommendations computed in BrowseClient via useMemo — allProperties already fetched server-side, no extra DB call needed
- [04-04]: allProperties fetched once in page.tsx — reused for display (no-filter) and passed to BrowseClient for recommendations
- [05-01]: -m-4 escape pattern for full-height messaging panel — app layout's p-4 cancelled with -m-4; h-[calc(100vh-3.5rem)] fills after h-14 header
- [05-01]: property: { include: { packages: true } } in getThreads/getThread — packages needed for AI prompts (05-02) and offer form tier selection (05-03)
- [05-01]: Demo unread state (first 2 threads) — real per-message read receipts deferred; bold + dot indicator on first 2 as demo
- [05-01]: Awaited return type pattern — type Thread = Awaited<ReturnType<typeof getThreads>>[number] extracts Prisma type from server function

### Pending Todos

None.

### Blockers/Concerns

None. 05-01 complete. 05-02 (ConversationView + AI responses) is next.

## Session Continuity

Last session: 2026-02-21 18:30 UTC
Stopped at: Completed 05-01-PLAN.md — Messaging Inbox Foundation (Phase 5 in progress)
Resume file: None
