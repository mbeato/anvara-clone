# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-02-21)

**Core value:** An advertiser can browse sponsorship properties, discover relevant opportunities, understand pricing, and initiate deal conversations — with a UX that feels better than the current Anvara site
**Current focus:** Phase 7 (Polish and Deploy) — IN PROGRESS

## Current Position

Phase: 7 (Polish and Deploy)
Plan: 3 of N in phase — In progress
Status: In progress
Last activity: 2026-02-23 — Completed 07-03-PLAN.md (build cleanup — postinstall script, clean build verification, noindex confirmed)

Progress: [████████████████████████████████████░] (07-03 complete, more plans TBD)

## Performance Metrics

**Velocity:**
- Total plans completed: 37 (including Phase 7 Plans 01-02)
- Average duration: ~2.3 minutes
- Total execution time: ~1.1 hours

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| Phase 1 (Foundation) | 4/4 COMPLETE | 16 min | 4 min |
| Phase 2 (Layout Shell) | 2/2 COMPLETE | 14 min | 7 min |
| Phase 3 (Property Detail) | 3/3 COMPLETE | 7 min | 2.3 min |
| Phase 4 (Browse/Discovery) | 4/4 COMPLETE | 9 min | 2.3 min |
| Phase 5 (Messaging) | 3/3 COMPLETE | 7 min | 2.3 min |
| Phase 5.1 (Coding Standards) | 2/2 COMPLETE | 3 min | 1.5 min |
| Phase 6 (Landing Page) | 5/5 COMPLETE | 9 min | 1.8 min |
| Phase 6.1 (Advertiser Analytics Dashboard) | 2/2 COMPLETE | 4 min | 2 min |
| Phase 6.2 (Public Listing Page) | 2/2 COMPLETE | 4 min | 2 min |
| Phase 6.3 (AI Chat) | 2/2 COMPLETE | 4 min | 2 min |
| Phase 6.4 (Stub Pages and Tour) | 3/3 COMPLETE | ~7 min | 2.3 min |
| Phase 6.5 (Accessibility and Animation Hardening) | 2/2 COMPLETE | ~6.5 min | 3.25 min |
| Phase 6.6 (Server Component Performance Optimization) | 1/1 COMPLETE | ~1 min | 1 min |
| Phase 7 (Polish and Deploy) | 3/N IN PROGRESS | ~5 min | 1.7 min |

**Recent Trend:**
- Last 5 plans: 06.5-02 (5 min), 06.6-01 (1 min), 07-01 (2 min), 07-02 (2 min), 07-03 (1 min)
- Trend: Fast — consistently ~1-3 min/plan

*Updated after each plan completion*

## Accumulated Context

### Decisions

Decisions are logged in PROJECT.md Key Decisions table.
Recent decisions affecting current work:

- [07-03]: postinstall script added before dev in scripts — follows npm lifecycle conventions; ensures Prisma client generation on Vercel
- [07-03]: noindex confirmed in app/layout.tsx — not accidentally removed during 07-01/07-02 mobile responsive refactors
- [07-01]: Show only first hero card on mobile (hidden sm:block on cards 2+) — single centered card is cleaner than horizontal scroll at 375px
- [07-01]: WhatIsAnvara tokens w-[72px] base — 5 tokens at 92px with -ml-3 = 436px overflows; 72px with -ml-4 = 296px fits 343px available
- [07-01]: HexCell w-[88px] sm:w-[110px] — 4-cell hex row at 110px = 416px overflows; at 88px = 328px fits 343px
- [07-01]: FinalCTA VerticalScroll overflow-hidden clips w-[320px] cards in narrow columns — no page scroll, intentional clipping
- [07-02]: Property detail right column lg:sticky lg:top-20 only — sticky in single-column layout causes scroll issues; removed on mobile
- [07-02]: Messaging panel switching via JS state (useIsMobile + mobileView) — CSS-only can't handle back navigation or compose-to-threads flow
- [07-02]: ModeToggle hidden sm:flex on mobile — header row at capacity at 375px; ModeToggle is non-critical
- [07-02]: overflow-x-auto on wrapper div inside CardContent — table scrolls, Card frame stays intact
- [06.5-02]: SheetClose asChild on every nav link — closes drawer on tap with no extra open-state or onClick handler
- [06.5-02]: prefersReduced === true (strict equality) for useReducedMotion — null means SSR/undetermined, animate normally to avoid flash of visible content
- [06.5-02]: Badge transitionDelay values updated from 1.2s/1.35s/1.5s to 0.5s/0.65s/0.8s — stay coherent with new 0.5s SVG draw duration
- [06.5-01]: AnimatePresence stays in motion/react (not motion/react-m) — it is an orchestrator, not a motion component; no code-split benefit
- [06.5-01]: LazyMotion strict mode enabled — catches any remaining motion.div usage at dev-time
- [06.5-01]: LandingProviders is the sole client boundary for landing page Motion context — keeps page.tsx as async Server Component
- [06.5-01]: 0.01ms (not 0ms) for prefers-reduced-motion CSS — avoids edge cases with transitionend event listeners
- [06.4-03]: STAGES array typed with MockDeal["stage"] key — compile-time guarantee stage keys match union type
- [06.4-03]: border-l-2 + per-stage color class on each Card — visually differentiates stages without extra wrapper elements
- [06.4-02]: footerItems split into footerLinkItems + manual Show Me Around button — keeps array-mapped items uniform while handling special onClick case
- [06.4-02]: TourModal rendered outside <Sidebar> as fragment sibling — prevents z-index clipping from sidebar's positioning context
- [06.4-02]: handleClose calls both onOpenChange(false) and setStep(0) — ensures all close paths (X, overlay, Escape, Get Started) reset step
- [06.4-02]: Personalize page non-async Server Component — no Prisma schema for user prefs, static display correct for prototype
- [06.4-01]: HTML table + Tailwind for CampaignsTable — table.tsx not in components/ui/, avoided adding shadcn dependency mid-phase
- [06.4-01]: getCampaignStats() derives from getMockCampaigns() inline — single source of truth for campaign data
- [06.3-02]: UserMessage/AIMessage are pure presentational (no use client) — imported by AIChatClient client boundary
- [06.3-02]: recommendedSlugs stripped before API POST — only role+content sent, prior recommendations not re-sent as context
- [06.3-01]: Properties fetched twice (page.tsx + /api/ai-chat route) — acceptable double-fetch for seeded prototype
- [06.6-01]: deals-pipeline.tsx and campaigns-table.tsx are pure JSX renderers of serializable props — correct to be Server Components with no use client
- [06.6-01]: empty-state.tsx and active-filter-chips.tsx retain use client — they accept function props from browse-client.tsx Client Component; functions are not serializable across the Server/Client boundary
- [06.1-01]: iconName strings in analytics return (not LucideIcon) — serializable across server/client boundary

### Roadmap Evolution

- Phase 5.1 inserted after Phase 5: Enforce Coding Standards (URGENT)
- Phase 6.1 inserted after Phase 6: Advertiser Analytics Dashboard (URGENT)
- Phase 6.2 inserted after Phase 6.1: Public Listing Page (URGENT)
- Phase 6.3 inserted after Phase 6.2: AI Chat with Listing Recommendations (URGENT)
- Phase 6.4 inserted after Phase 6.3: Stub Pages and Platform Tour (URGENT)
- Phase 6.5 inserted after Phase 6.4: Accessibility and Animation Hardening (URGENT) — prefers-reduced-motion, mobile hamburger, LazyMotion, animation timing
- Phase 6.6 inserted after Phase 6.5: Server Component Performance Optimization (URGENT) — eliminate client useEffect data fetching, enforce Server Component patterns

### Pending Todos

None.

### Blockers/Concerns

None.

## Session Continuity

Last session: 2026-02-23T19:15:31Z
Stopped at: Completed 07-03-PLAN.md — build cleanup complete (postinstall, clean build, noindex confirmed)
Resume file: None
