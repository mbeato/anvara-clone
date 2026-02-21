---
phase: 06-landing-page
plan: 02
subsystem: ui
tags: [react, nextjs, embla-carousel, framer-motion, landing-page, tailwind]

# Dependency graph
requires:
  - phase: 06-01
    provides: LandingPropertyCard, SectionReveal, marquee CSS, landing route

provides:
  - HeroSection with video background, gradient fallback, headline, CTA, and Embla snap carousel
  - BrandLogosBar with micro1/LEGENDZ/Delta/gopuff in grayscale
  - WhatIsAnvara with rotating event-type text and 3D CSS token illustrations
  - AccessMarket with property list and Check the Market CTA

affects:
  - 06-03 (A-Z Execution section — builds next section of landing page)
  - 06-05 (page.tsx assembly — imports all four components built here)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "useRef for Autoplay plugin instance — prevents recreation on re-render (matches 04-02 pattern)"
    - "useState + setInterval with cleanup for rotating text animation"
    - "CSS perspective transform for 3D token card effect without external library"
    - "Video background with gradient fallback — graceful degradation when video file absent"

key-files:
  created:
    - app/_components/landing/hero-section.tsx
    - app/_components/landing/brand-logos-bar.tsx
    - app/_components/landing/what-is-anvara.tsx
    - app/_components/landing/access-market.tsx
  modified: []

key-decisions:
  - "Video element overlaid on gradient fallback — always looks good without /public/videos/hero.mp4"
  - "useRef pattern for Autoplay (delay: 3000, stopOnMouseEnter: true, stopOnInteraction: false) — matches 04-02 decision"
  - "BrandLogosBar is a Server Component — no state needed for static logo display"
  - "Rotating text uses opacity transition (not transform) for smooth word swap on same line"
  - "3D token cards use CSS perspective transform — no animation library dependency"
  - "VIEW_COUNTS array for demo view badges in AccessMarket — matches screenshot visual"

patterns-established:
  - "Pattern 1: Server Components for static sections (BrandLogosBar), Client Components only when interactive state required"
  - "Pattern 2: Autoplay carousel with useRef — same pattern as category-carousel.tsx in Phase 4"

# Metrics
duration: 2min
completed: 2026-02-21
---

# Phase 6 Plan 02: Hero Sections Summary

**Four landing page sections built: hero with Embla snap carousel + video bg fallback, brand logos bar, rotating-text What is Anvara, and Access the Market property list — all CTAs route to /browse**

## Performance

- **Duration:** 2 min
- **Started:** 2026-02-21T21:09:22Z
- **Completed:** 2026-02-21T21:11:03Z
- **Tasks:** 2/2
- **Files modified:** 4 created

## Accomplishments

- Hero section with full-viewport dark gradient/video background, bold headline, "Try Anvara Free" CTA, and Embla auto-advancing property card carousel
- Brand logos bar displaying micro1, L'EGENDZ, Delta (with triangle SVG), gopuff in grayscale treatment
- WhatIsAnvara with rotating event-type words cycling every 2.5s with opacity fade transition and CSS 3D token card illustrations
- AccessMarket with two-column layout showing property list with thumbnails, view count badges, and three /browse CTAs

## Task Commits

Each task was committed atomically:

1. **Task 1: Hero section with video background, headline, CTA, and snap carousel** - `f48ca42` (feat)
2. **Task 2: Brand Logos Bar, What is Anvara, and Access the Whole Market sections** - `b30d1f5` (feat)

**Plan metadata:** TBD (docs: complete plan)

## Files Created/Modified

- `app/_components/landing/hero-section.tsx` - Full-viewport hero with gradient bg, video overlay, headline, CTA, Embla carousel with Autoplay
- `app/_components/landing/brand-logos-bar.tsx` - Server component with 4 brand logos in grayscale (SectionReveal wrapped)
- `app/_components/landing/what-is-anvara.tsx` - Client component with rotating words, setInterval cleanup, CSS 3D token cards
- `app/_components/landing/access-market.tsx` - Property list with thumbnail/name/badge, three CTA buttons all linking /browse

## Decisions Made

- **Video with gradient fallback:** Video element overlaid on `bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900` — hero always looks polished even without `/public/videos/hero.mp4` file present. Video source placeholder points to `/videos/hero.mp4`.
- **BrandLogosBar as Server Component:** Static logo display needs no interactivity, avoiding unnecessary client boundary.
- **Rotating text opacity transition:** Simple `opacity` CSS transition on the word span provides smooth fade without mounting/unmounting elements (avoids layout shift).
- **CSS perspective for 3D tokens:** `perspective(800px) rotateY(±15deg)` on token cards matches the screenshot's 3D effect without adding an animation library.
- **VIEW_COUNTS array for demo badges:** Hardcoded view counts (`4.4k`, `3.1k`, etc.) replicate the screenshot's "X views today" metric badges for demo realism.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required. Note: to enable hero video background, place a video file at `/public/videos/hero.mp4`. Free action sports stock footage available at pexels.com.

## Next Phase Readiness

- All four top sections are complete and compile cleanly (`npx tsc --noEmit` passes)
- Ready for 06-03 (A-Z Execution section) to build next landing section
- Ready for 06-05 to assemble page.tsx with imports of all section components
- Consistent HeroSectionProps / AccessMarketProps interfaces accept the same `properties` array shape from `getAllProperties()`

---
*Phase: 06-landing-page*
*Completed: 2026-02-21*
