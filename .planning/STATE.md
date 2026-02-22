# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-02-21)

**Core value:** An advertiser can browse sponsorship properties, discover relevant opportunities, understand pricing, and initiate deal conversations — with a UX that feels better than the current Anvara site
**Current focus:** Phase 5.1 (Enforce Coding Standards) — Executing

## Current Position

Phase: 5.1 of 7 (Enforce Coding Standards) — In progress
Plan: 1 of 2 in phase — COMPLETE
Status: 05.1-01 complete — browse-client, az-execution, for-brands, faq-section, recommendations-strip, messages/page cleaned
Last activity: 2026-02-22 — Completed 05.1-01-PLAN.md (Cleanup Pass 1)

Progress: [████████████████████░] 71% (20/28 plans)

## Performance Metrics

**Velocity:**
- Total plans completed: 16
- Average duration: ~2.5 minutes
- Total execution time: ~0.67 hours

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| Phase 1 (Foundation) | 4/4 COMPLETE | 16 min | 4 min |
| Phase 2 (Layout Shell) | 2/2 COMPLETE | 14 min | 7 min |
| Phase 3 (Property Detail) | 3/3 COMPLETE | 7 min | 2.3 min |
| Phase 4 (Browse/Discovery) | 4/4 COMPLETE | 9 min | 2.3 min |
| Phase 5 (Messaging) | 3/3 COMPLETE | 7 min | 2.3 min |

**Recent Trend:**
- Last 5 plans: 06-01 (1 min), 06-02 (2 min), 06-03 (2 min), 06-04 (2 min)
- Trend: Fast — consistently ~1-3 min/plan

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
- [05-02]: key prop on ConversationView — key={activeThread.id} resets all state (messages, typing, error, banner) when switching threads
- [05-02]: Local state update on AI response — setMessages replaces temp-prefixed optimistic messages, appends AI reply; onThreadUpdate propagates to thread list
- [05-02]: Retry button for AI failures — calls /api/chat again with same threadId; error handling path is fully functional without OPENAI_API_KEY
- [05-02]: OPENAI_API_KEY not in .env.local — AI responses return 500; inline error + retry handles this gracefully; key must be added for live AI responses
- [05-03]: isOfferMessage helper exported from MessageBubble — clean detection of [OFFER]-prefixed content; MessageBubble returns null so parent renders OfferCard
- [05-03]: Offer card matching by timestamp proximity — findMatchingOffer within 5s of message createdAt; avoids FK on Message model or passing offerId through content
- [05-03]: Local offer state tracked separately from messages — setOffers appends immediately for correct status badge without server revalidation round-trip
- [05-03]: isSubmittingOffer disables message input — prevents concurrent sends during offer submission flow
- [06-01]: Delete app/(app)/page.tsx to remove route conflict — landing page must render outside (app) shell
- [06-01]: viewport.once=true on SectionReveal — animate on first entry only for premium non-distracting feel
- [06-01]: marquee translateX(0) to translateX(-50%) — requires duplicated content for seamless loop
- [06-01]: 40s marquee duration — smooth non-rushed feel for 12 property cards
- [06-02]: Video with gradient fallback — hero always looks polished without /public/videos/hero.mp4
- [06-02]: BrandLogosBar as Server Component — static logo display needs no client boundary
- [06-02]: Rotating text opacity transition — fade without layout shift, same line word swap
- [06-02]: CSS perspective for 3D tokens — no animation library dependency needed
- [06-02]: VIEW_COUNTS array for demo badges — replicates screenshot's view count metric badges
- [06-03]: Fixed SVG viewBox (400x320) over percentage coords — bezier paths predictable at fixed coordinate space
- [06-03]: Inner SectionReveal delay=0.15 on AI flow diagram — stagger text→diagram for premium feel
- [06-03]: Fixed 320px container height for MetricsVisualization — deterministic badge absolute positioning
- [06-04]: Logo grids as styled text labels — avoids SVG sourcing complexity while matching grayscale grid visual
- [06-04]: Newsletter input as readOnly — visual-only without disabled attribute graying out the input
- [06-04]: Footer watermark uses clamp(80px, 18vw, 200px) — responsive font size matching Landing11.png screenshot
- [06-04]: No SectionReveal on LandingFooter — footer always visible by time user scrolls to bottom

### Roadmap Evolution

- Phase 5.1 inserted after Phase 5: Enforce Coding Standards (URGENT) — Refactor existing codebase to eliminate unnecessary useEffect hooks, enforce type imports, remove any types, move data fetching to Server Components, add loading/error boundaries, align with React 19 patterns

### Pending Todos

None.

### Blockers/Concerns

None. Phase 6 plan 04 complete. Plan 05 (Page Assembly) ready to begin — all 12 section components now exist. Phase 5.1 (Coding Standards) inserted as urgent work before Phase 6 completion.

## Session Continuity

Last session: 2026-02-22T05:54:16Z
Stopped at: Completed 05.1-01-PLAN.md (Cleanup Pass 1)
Resume file: None
