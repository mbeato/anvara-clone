---
phase: 03-property-detail
plan: 02
subsystem: property-detail
tags: [shadcn-dialog, pricing-tiers, offer-sidebar, make-offer-modal, build-offer-form, lucide-icons, sticky-sidebar, client-components]

requires:
  - phase: 03-01
    provides: 60/40 grid layout with sticky-ready sidebar placeholder and property data including packages

provides:
  - PropertyTiers: vertical click-to-expand tier list sorted ascending by price with brand-accent selected border
  - BuildOfferForm: custom offer builder with budget input, deliverables checkboxes, notes textarea
  - OfferSidebar: sticky card with formatted minimum spend, three CTAs, Separator dividers, and two trust badges
  - MakeOfferDialog: Dialog modal with amount + terms fields and success feedback state
  - page.tsx updated: OfferSidebar in right column, PropertyTiers and BuildOfferForm in left column below PropertyAbout

affects:
  - 03-03 (demographics, tags, categories — insert below BuildOfferForm in left column)
  - Phase 5 (wire Server Action into MakeOfferDialog for real offer creation with Thread FK constraint)

tech-stack:
  added: [ShadCN Dialog (radix-ui Dialog primitive)]
  patterns:
    - ShadCN Dialog with DialogTrigger asChild pattern
    - Intl.NumberFormat for currency formatting (shared pattern across tiers and sidebar)
    - Contact for pricing fallback when priceUsd === 0
    - id="build-offer" scroll anchor linked from sidebar teaser
    - setTimeout-based success state resets after 1.5s (Phase 3 visual-only offer submission)

key-files:
  created:
    - components/ui/dialog.tsx
    - components/property-detail/property-tiers.tsx
    - components/property-detail/build-offer-form.tsx
    - components/property-detail/offer-sidebar.tsx
    - components/property-detail/make-offer-dialog.tsx
  modified:
    - app/(app)/properties/[slug]/page.tsx

key-decisions:
  - "MakeOfferDialog submission is visual-only in Phase 3 — success state shown via local React state, Server Action deferred to Phase 5 when Thread FK constraint can be handled"
  - "OfferSidebar trust badges use ShieldCheck and Lock from lucide-react — consistent with icon library already in use"
  - "Build your own offer teaser in sidebar scrolls to id=build-offer anchor in left column"
  - "PropertyTiers sorts packages ascending so cheapest tier appears at top — easier for budget-conscious advertisers to scan"

duration: 2min
completed: 2026-02-21
---

# Phase 3 Plan 02: Pricing Tiers, Offer Sidebar, and Make an Offer Modal Summary

**Vertical click-to-expand tier pricing with brand-accent selection, sticky offer sidebar with three CTAs and trust badges, and a ShadCN Dialog Make an Offer modal — wired into the 60/40 property detail grid.**

## Performance
- **Duration:** ~2 minutes (106 seconds)
- **Started:** 2026-02-21T08:18:07Z
- **Completed:** 2026-02-21T08:19:53Z
- **Tasks:** 2
- **Files modified:** 6 (5 created, 1 modified)

## Accomplishments
- Installed ShadCN Dialog (radix-ui Dialog primitive) via `npx shadcn@latest add dialog`
- `PropertyTiers`: client component sorting packages ascending by `priceUsd`, click-to-expand individual tier inclusions with `Check` icons in `text-primary`, `border-primary bg-primary/5` on selected tier, "Contact for pricing" fallback when `priceUsd === 0`, `maxSponsors` muted count below inclusions
- `BuildOfferForm`: client component with `<Input type="number">` for budget, checkboxes for 5 standard deliverables with `accent-primary`, resizable textarea for notes, helper text pointing to Make an Offer
- `MakeOfferDialog`: `Dialog` with `DialogTrigger asChild` wrapping green button, amount + terms form fields, `setTimeout(1500)` success state that closes dialog, actual Server Action deferred to Phase 5
- `OfferSidebar`: sticky card with `Intl.NumberFormat` formatted `priceFrom`, package count, `MakeOfferDialog` as primary CTA, Message (outline) and Schedule Call (ghost) placeholder buttons with `MessageSquare`/`Phone` icons, `Separator` dividers, `ShieldCheck`/`Lock` trust badges, scroll anchor teaser linking to `#build-offer`
- `page.tsx` updated: OfferSidebar replaces placeholder in `col-span-2 sticky top-20`; PropertyTiers and BuildOfferForm (with `id="build-offer"` wrapper) added in left column below PropertyAbout
- `npm run build` passes zero errors

## Task Commits
1. **Task 1** — `909ec3b` (feat) — ShadCN Dialog, PropertyTiers, BuildOfferForm
2. **Task 2** — `d9b0dc2` (feat) — MakeOfferDialog, OfferSidebar, page.tsx wiring

## Files Created/Modified
- `components/ui/dialog.tsx` — ShadCN Dialog primitives (Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, etc.)
- `components/property-detail/property-tiers.tsx` — Click-to-expand vertical tier list sorted by price
- `components/property-detail/build-offer-form.tsx` — Budget, deliverables, and notes custom offer form
- `components/property-detail/offer-sidebar.tsx` — Sticky sidebar card with CTAs and trust badges
- `components/property-detail/make-offer-dialog.tsx` — Modal dialog with amount + terms form
- `app/(app)/properties/[slug]/page.tsx` — Imports and renders all new components in correct positions

## Decisions Made
- **MakeOfferDialog visual-only in Phase 3:** The Offer model requires a `threadId` FK (Thread must be created first). Rather than create a stub Thread just to store the offer, Phase 3 shows success feedback locally and defers real persistence to Phase 5 (messaging + offers).
- **PropertyTiers ascending sort:** Cheapest tier first — mirrors standard SaaS pricing tables where users scan from the least-commitment option upward.
- **Contact for pricing fallback:** If `priceUsd === 0`, render "Contact for pricing" string rather than "$0" — a valid business case for unpublished or negotiable rates.
- **Scroll anchor pattern:** Sidebar teaser links to `id="build-offer"` wrapping div in left column — avoids JavaScript smooth-scroll complexity while providing functional UX.

## Deviations from Plan
None — plan executed exactly as written.

## Issues Encountered
None.

## Next Phase Readiness
Plan 03-03 (demographics, audience stats, tags, category chips) can proceed immediately:
- Insert below `<BuildOfferForm>` in the `space-y-8` div in the left column
- The `property` object in `page.tsx` already includes `audienceTotalReach`, `audienceAgeRange`, `audienceGender`, `audienceIncome`, `tags`, `category`, `subcategory` — all data is available
- No additional ShadCN installs required for 03-03

## Self-Check: PASSED
