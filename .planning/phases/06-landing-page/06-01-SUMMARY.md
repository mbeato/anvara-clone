---
phase: 06-landing-page
plan: 01
subsystem: landing
tags: [routing, motion, animation, components, css]
dependencies:
  requires: []
  provides:
    - Landing page route at / outside (app) shell
    - SectionReveal scroll-triggered animation component
    - LandingPropertyCard compact image-heavy card component
    - Marquee CSS animation utilities
    - motion package (Framer Motion v12)
    - ShadCN accordion component
  affects:
    - 06-02: Hero section uses SectionReveal, LandingPropertyCard, animate-marquee
    - 06-03: All sections use SectionReveal for scroll-triggered reveals
    - 06-04: FAQ section uses accordion component
    - 06-05: Assembly imports all shared components from this plan
tech-stack:
  added:
    - motion@12.34.3 (Framer Motion v12, React 19 compatible)
    - "@radix-ui/react-accordion (via shadcn accordion)"
  patterns:
    - Server Component route at app root (no (app) shell)
    - Client-side motion whileInView for scroll animations
    - Tailwind v4 @theme inline for custom animation variables
key-files:
  created:
    - app/page.tsx
    - app/_components/landing/section-reveal.tsx
    - app/_components/landing/landing-property-card.tsx
    - components/ui/accordion.tsx
  modified:
    - app/globals.css
    - package.json
    - package-lock.json
  deleted:
    - app/(app)/page.tsx
key-decisions:
  - "Delete app/(app)/page.tsx to remove route conflict — landing page must render outside (app) shell"
  - "viewport.once=true on SectionReveal — animate on first entry only for premium non-distracting feel"
  - "viewport.amount=0.15 — trigger reveal when 15% visible, catches large sections early"
  - "marquee translateX(0) to translateX(-50%) — works by duplicating content for seamless loop"
  - "40s duration for marquee — smooth non-rushed feel for 12 property cards"
metrics:
  duration: ~1 minute
  completed: "2026-02-21"
---

# Phase 6 Plan 01: Landing Page Foundation Summary

**One-liner:** Motion package installed, landing route established at `/` outside the app shell, with SectionReveal and LandingPropertyCard shared components and CSS marquee animation utilities ready for subsequent landing page plans.

## Accomplishments

- Installed `motion@12.34.3` (Framer Motion v12, React 19 compatible)
- Installed ShadCN accordion component (needed for FAQ section in plan 04)
- Deleted `app/(app)/page.tsx` to eliminate route conflict at `/`
- Created `app/page.tsx` as a Server Component outside the (app) shell — no sidebar, ThemeProvider only
- Confirmed data fetching works via `getAllProperties()` in the new route
- Created `app/_components/landing/section-reveal.tsx` with `motion.div` whileInView fade-up animation
- Created `app/_components/landing/landing-property-card.tsx` — 280x180px image-heavy card with gradient overlay and hover scale
- Added `--animate-marquee` (40s) and `--animate-marquee-slow` (60s) CSS animation variables to `@theme inline`
- Added `@keyframes marquee` (translateX 0 to -50%) for seamless continuous scrolling carousels

## Task Commits

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Install dependencies and set up routing | bbe7b4f | app/page.tsx, app/(app)/page.tsx (deleted), package.json, components/ui/accordion.tsx |
| 2 | Create SectionReveal and LandingPropertyCard shared components | 72db379 | app/_components/landing/section-reveal.tsx, app/_components/landing/landing-property-card.tsx |
| 3 | Add marquee and fade-up CSS keyframes to globals.css | ea19f03 | app/globals.css |

## Files

**Created:**
- `app/page.tsx` — Landing page route, Server Component, outside (app) shell
- `app/_components/landing/section-reveal.tsx` — Scroll-triggered reveal wrapper
- `app/_components/landing/landing-property-card.tsx` — Compact property card for landing carousels
- `components/ui/accordion.tsx` — ShadCN accordion (for FAQ section in 06-04)

**Modified:**
- `app/globals.css` — Added marquee animation custom properties and @keyframes
- `package.json` — Added motion@12, accordion dependencies

**Deleted:**
- `app/(app)/page.tsx` — Was serving `/` inside the app shell, removed to prevent route conflict

## Decisions Made

| Decision | Rationale |
|----------|-----------|
| Delete app/(app)/page.tsx | Landing page must render at `/` without sidebar; old page inside (app) group would conflict |
| viewport.once=true on SectionReveal | Premium UX — animate on first entry only, not every scroll-back |
| viewport.amount=0.15 | Trigger reveal when 15% visible — catches large sections before fully in view |
| 40s marquee duration | Smooth, non-rushed feel for 12 property cards; slow variant (60s) available |
| translateX(-50%) for marquee | Requires duplicated content — first set scrolls out exactly as duplicate begins |
| Landing-specific card vs browse PropertyCard | Image-heavy with overlay text, 280x180px landscape ratio matches CONTEXT.md and Anvara screenshots |

## Deviations from Plan

None — plan executed exactly as written.

## Next Phase Readiness

**Plan 06-02 (Hero Section) can proceed:**
- `SectionReveal` available at `app/_components/landing/section-reveal.tsx`
- `LandingPropertyCard` available at `app/_components/landing/landing-property-card.tsx`
- `animate-marquee` CSS class available via Tailwind v4 `@theme inline`
- `motion` package installed and importable from `motion/react`
- Landing route exists at `app/page.tsx` ready for section assembly

## Self-Check: PASSED
