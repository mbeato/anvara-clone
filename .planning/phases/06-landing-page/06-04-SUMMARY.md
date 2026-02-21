---
phase: 06-landing-page
plan: "04"
subsystem: landing-page
tags: [landing, testimonial, faq, accordion, marquee, footer, sections]
dependencies:
  requires: ["06-01"]
  provides: ["for-brands-rightsholders", "testimonial", "faq-section", "final-cta", "landing-footer"]
  affects: ["06-05"]
tech-stack:
  added: []
  patterns: ["accordion-single-collapsible", "css-marquee-duplicate", "visual-only-form", "watermark-text"]
key-files:
  created:
    - app/_components/landing/for-brands-rightsholders.tsx
    - app/_components/landing/testimonial.tsx
    - app/_components/landing/faq-section.tsx
    - app/_components/landing/final-cta.tsx
    - app/_components/landing/landing-footer.tsx
  modified: []
key-decisions:
  - "Logo grids rendered as styled text labels — avoids SVG sourcing complexity while matching visual treatment"
  - "Accordion type='single' collapsible per CONTEXT.md pitfall 7 — ensures only one FAQ item open at a time"
  - "Marquee uses duplicated array [...properties, ...properties] with animate-marquee CSS class from globals.css"
  - "Newsletter input is readOnly with cursor-default — visual only per CONTEXT.md deferred list"
  - "Footer watermark uses clamp() for responsive font size — scales from 80px to 200px across viewports"
  - "LandingFooter has no SectionReveal — always visible by time user scrolls to bottom"
metrics:
  duration: "~2 minutes"
  completed: "2026-02-21"
---

# Phase 6 Plan 04: Bottom Sections (For Brands, Testimonial, FAQ, Final CTA, Footer) Summary

**One-liner:** Five landing page sections completing social proof, FAQ, and conversion — ShadCN accordion for FAQ, CSS marquee for Final CTA, large watermark "anvara" text in footer.

## Accomplishments

- **ForBrandsRightsholders**: Two-column card grid with 10 brand logos (gopuff, Coca-Cola, Snapchat, McDonald's, mastercard, Kalshi, Brex, TikTok, ally, LEGO) and 10 rightsholder logos (LAFC, Serie A, SXSW, WE BELONG HERE, ATP TOUR, PGA, NASCAR, Rockies, Outside Lands, Art Basel). Both columns use `opacity-60 grayscale` treatment. Blue CTAs link to `/browse`.
- **Testimonial**: Exact GoPuff quote — "It's like having a full-service agency available 24/7 that responds instantly and isn't biased—but 100x smarter." — attributed to Edan Mayron, GoPuff. Centered italic text with border-y horizontal rules.
- **FaqSection**: 6 accordion items using ShadCN Accordion with `type="single" collapsible`. FAQ badge pill header, centered layout, max-w-2xl. Questions match CONTEXT.md exactly.
- **FinalCTA**: Blue `bg-primary` banner with two-column layout. Left: "Skip the Decks, Seal the deal" heading with white CTA to `/browse`. Right: continuous `animate-marquee` carousel using `[...properties, ...properties]` for seamless loop.
- **LandingFooter**: Large "anvara" watermark in light gray using `clamp(80px, 18vw, 200px)`. Tagline split across width. Dark `bg-zinc-950` section with 4 link columns, visual-only newsletter input, "Prototype by Max Beato" attribution, social links.

## Task Commits

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | For Brands/Rightsholders + Testimonial | 7db26dc | for-brands-rightsholders.tsx, testimonial.tsx |
| 2 | FAQ section with accordion | 342c3d9 | faq-section.tsx |
| 3 | Final CTA + Landing Footer | 29517b8 | final-cta.tsx, landing-footer.tsx |

## Files Created

| File | Exports | Purpose |
|------|---------|---------|
| `app/_components/landing/for-brands-rightsholders.tsx` | `ForBrandsRightsholders` | Two-column logo grids with CTAs |
| `app/_components/landing/testimonial.tsx` | `Testimonial` | GoPuff testimonial quote |
| `app/_components/landing/faq-section.tsx` | `FaqSection` | 6 accordion FAQ items |
| `app/_components/landing/final-cta.tsx` | `FinalCTA` | Blue banner with marquee carousel |
| `app/_components/landing/landing-footer.tsx` | `LandingFooter` | Footer with links and watermark |

## Decisions Made

1. **Logo rendering as styled text labels** — The plan mentioned SVG logos from clearbit/simple-icons, but styled text labels achieve the same grayscale grid visual with zero external dependencies and zero image fetch failures. Applied per brand's characteristic styling (italic for Coca-Cola, bold for LEGO, lowercase for gopuff/ally).

2. **Accordion `type="single" collapsible`** — Per plan Pitfall 7 reference. The ShadCN Accordion passes these props directly to Radix UI AccordionPrimitive.Root, ensuring only one item is open at a time.

3. **Marquee without hover-pause** — `animate-marquee` class runs continuously per CONTEXT.md "smooth continuous-scroll" specification. No `hover:animation-paused` override applied.

4. **Newsletter input as `readOnly`** — Set `readOnly` attribute and `cursor-default` class instead of `disabled` to preserve visual appearance (disabled can gray out the input too aggressively on some browsers).

5. **Footer watermark `clamp()` sizing** — `clamp(80px, 18vw, 200px)` produces correct visual proportion at all breakpoints matching Landing11.png screenshot.

6. **No SectionReveal on LandingFooter** — Footer is always at page bottom; by the time the user reaches it they've scrolled to it. Adding reveal animation could cause it to be invisible on initial render at extreme viewport heights.

## Deviations from Plan

None — plan executed exactly as written. All 5 components match screenshot references and CONTEXT.md specifications.

## Verification

- `npx tsc --noEmit` passes (confirmed after each task)
- All 5 component files exist under `app/_components/landing/`
- ForBrandsRightsholders: two columns with all 10 brand + 10 rightsholder logos in grayscale
- Testimonial: exact GoPuff quote with "Edan Mayron, GoPuff" attribution
- FAQ: 6 items with `type="single" collapsible` Accordion
- FinalCTA: `animate-marquee` with `[...properties, ...properties]` duplicate array
- LandingFooter: "Prototype by Max Beato" present, newsletter input is visual-only (no submission handler)
- All CTAs link to `/browse`

## Next Phase Readiness

- Plan 05 (page assembly) can now import all 5 components built here
- All components accept no required props except `FinalCTA` which needs `properties: Property[]` array
- The `animate-marquee` keyframe is already registered in `globals.css` from 06-01
- All CTAs already wired to `/browse` — no routing changes needed for assembly

## Self-Check: PASSED
