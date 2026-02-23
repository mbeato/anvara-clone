---
phase: 07-polish-and-deploy
plan: 01
subsystem: ui
tags: [tailwind, responsive, mobile, landing-page, next-js]

# Dependency graph
requires:
  - phase: 06-landing-page
    provides: all landing section components
  - phase: 06.5-accessibility-animation
    provides: LazyMotion setup, animation patterns, section-reveal
provides:
  - Landing page renders at 375px with no horizontal scroll
  - Hero typewriter and card carousel are mobile-safe
  - All landing sections use px-4 base padding with lg:px-8 desktop
  - FinalCTA stacks correctly on mobile with reduced scroll column height
  - WhatIsAnvara liquid glass tokens sized for 375px viewport
affects: [07-polish-and-deploy]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Mobile-first Tailwind breakpoints: base (375px) then sm: / lg: overrides"
    - "whitespace-normal sm:whitespace-nowrap for typewriter spans to prevent overflow"
    - "hidden sm:block to show only first card on mobile carousel"
    - "Responsive padding: px-4 lg:px-8 on all landing section containers"

key-files:
  created: []
  modified:
    - app/_components/landing/hero-section.tsx
    - app/_components/landing/final-cta.tsx
    - app/_components/landing/anvara-intelligence.tsx
    - app/_components/landing/what-is-anvara.tsx
    - app/_components/landing/for-brands-rightsholders.tsx

key-decisions:
  - "Show only first property card on mobile hero (hidden sm:block on cards 2+) — single centered card is cleaner than horizontal scroll"
  - "Reduce WhatIsAnvara tokens to w-[72px] base — 5 tokens at 72px with -ml-4 overlap = 296px, fits within 343px available at 375px"
  - "Scale HexCell to w-[88px] sm:w-[110px] — 4-cell row at 88px with -space-x-2 = 328px, fits 343px"
  - "FinalCTA scroll columns h-[320px] lg:h-[480px] — reduces excessive height on mobile"

patterns-established:
  - "Pattern: All landing sections px-4 lg:px-8 — consistent horizontal breathing room"
  - "Pattern: whitespace-normal sm:whitespace-nowrap — safe typewriter text on mobile"

# Metrics
duration: 2min
completed: 2026-02-23
---

# Phase 7 Plan 01: Landing Page Mobile Responsive Summary

**Hero typewriter overflow fixed, single card on mobile, hex grid and liquid glass tokens sized for 375px, all sections use px-4 base padding with no horizontal scroll**

## Performance

- **Duration:** 2 min
- **Started:** 2026-02-23T19:10:12Z
- **Completed:** 2026-02-23T19:12:36Z
- **Tasks:** 2
- **Files modified:** 5

## Accomplishments

- Hero section: h1 `text-3xl` base, typewriter wraps on mobile, only first card shows at mobile (hidden sm:block on cards 2+), brand logos marquee expands to `w-full` on mobile
- FinalCTA: reduced scroll column height to `h-[320px] lg:h-[480px]`, padding `px-4 lg:px-8`, heading `text-3xl sm:text-4xl`
- AnvaraIntelligence: AnimatedFlow padding `p-4 lg:p-8`, section already used `px-4`
- WhatIsAnvara: typewriter span `whitespace-normal sm:whitespace-nowrap`, tokens scaled to `w-[72px] sm:w-[92px] md:w-[112px]` — 5-token row fits 375px
- ForBrandsRightsholders: card panels `p-4 lg:p-8`, HexCell scaled `w-[88px] sm:w-[110px]` — 4-cell hex row fits 375px

## Task Commits

Each task was committed atomically:

1. **Task 1: Fix hero section mobile layout** - `899a471` (feat)
2. **Task 2: Fix remaining landing sections for mobile** - `216aad8` (feat)

**Plan metadata:** TBD (docs: complete plan)

## Files Created/Modified

- `app/_components/landing/hero-section.tsx` - h1 size, typewriter whitespace, single card mobile, marquee width
- `app/_components/landing/final-cta.tsx` - scroll height, padding, h2 size
- `app/_components/landing/anvara-intelligence.tsx` - AnimatedFlow padding responsive
- `app/_components/landing/what-is-anvara.tsx` - typewriter whitespace, token size for mobile fit
- `app/_components/landing/for-brands-rightsholders.tsx` - card padding, HexCell responsive size

## Decisions Made

- **Single card on mobile hero:** Show only the first property card at mobile (`hidden sm:block` on cards 2+). A single focused card is cleaner than horizontal scroll or tiny cards.
- **WhatIsAnvara tokens at w-[72px]:** Five tokens at 92px with -ml-3 overlap = 436px which overflows 343px. Scaling to 72px with -ml-4 = 296px fits with room. Desktop still uses sm:w-[92px] md:w-[112px].
- **HexCell at w-[88px] base:** Four-cell hex row at 110px = 416px overflows. At 88px with -space-x-2 = 328px, fits 343px available width.
- **FinalCTA VerticalScroll overflow-hidden:** Cards are w-[320px] inside flex-1 columns (~166px each) — the section's overflow-hidden clips them cleanly, no page-level overflow.

## Deviations from Plan

None — plan executed exactly as written. All fixes listed in the plan were applied. No additional work discovered.

## Issues Encountered

None.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- Landing page mobile layout hardened — all sections render at 375px with no horizontal scroll
- Hero, WhatIsAnvara, FinalCTA, ForBrandsRightsholders, AnvaraIntelligence all verified for mobile
- AccessMarket and PerformanceReporting already had correct mobile layout (`px-4`, `grid-cols-1 lg:grid-cols-2`)
- Ready for next phase-07 plan (app pages mobile, or deployment prep)

---
*Phase: 07-polish-and-deploy*
*Completed: 2026-02-23*

## Self-Check: PASSED
