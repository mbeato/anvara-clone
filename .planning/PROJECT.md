# Anvara Frontend Prototype

## What This Is

A polished frontend prototype of Anvara's sponsorship marketplace, built as an interview follow-up demo for founders Nick and Andrei. Demonstrates product thinking, UX improvements, and initiative — not a working backend. Deployed on an unlisted Vercel URL for two people to review.

## Core Value

An advertiser can browse sponsorship properties, discover relevant opportunities, and understand pricing — with a UX that feels better than the current Anvara site.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Landing page with original interpretation of Anvara's content/messaging
- [ ] Property browse/discovery page with filtering (venue type, location, audience size, price range)
- [ ] Skeleton loading states (simulated) instead of loading flash
- [ ] "Recommended for you" section on browse page (always visible, mock personalization)
- [ ] Property detail page with key metrics, audience data, pricing tiers
- [ ] "Request Quote" CTA on detail page (mock modal, doesn't send)
- [ ] Fix $0 pricing display — show "Request Quote" instead
- [ ] Proper empty/loading/error states throughout
- [ ] Mobile-responsive layout (their current site is desktop-focused)
- [ ] Clean composable filtering UX
- [ ] Mock data inspired by real Anvara listings (properties, venues, events)
- [ ] Footer: "Prototype by Max Beato"
- [ ] Deploy to unlisted Vercel URL

### Out of Scope

- Backend/database (Prisma, Postgres) — mock data only, no visual impact
- Authentication — no real demo value for 2-person audience
- Property owner/venue side — prototype is advertiser-facing only
- Real API integrations — hardcoded data layer
- Admin panel — not relevant to demo
- Payment processing — not in scope
- Real-time features — unnecessary for demo

## Context

- **What Anvara is:** A marketplace connecting brands/advertisers (Delta, Kalshi, DHL) with sponsorship properties (LAFC, NY Jets, Art Basel, Coachella). Their thesis is making 30 small $5K sponsorship deals as easy to manage as one $500K deal.
- **Audience:** Two founders evaluating a prospective hire's product thinking and initiative
- **Current site issues identified:** Loading flash on tab clicks, $0 pricing display, desktop-focused layout, no personalization signals
- **Landing page approach:** Original interpretation of their content — same messaging, improved layout. Shows product judgment, not just copying ability.
- **Mock data approach:** Inspired by real Anvara listings — real categories/structure, mix of real and fictional property names/images
- **Personalization:** "Recommended for you" always visible on browse page with mock matching logic
- **Time budget:** Few hours. Better to nail 3 screens than half-finish 10.

## Constraints

- **Tech stack**: Next.js, React, TypeScript, Tailwind CSS, ShadCN UI — chosen for speed and polish
- **Deployment**: Vercel (unlisted URL like anvara-demo-mbeato.vercel.app)
- **Timeline**: Few hours max — scope ruthlessly
- **No backend**: All data hardcoded in TypeScript files
- **Assets**: Use public assets/images from anvara.com where available

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Skip Postgres/Prisma entirely | No visual impact, founders see UI not database | — Pending |
| Skip authentication | Only 2 viewers, no real demo value for auth | — Pending |
| Original landing page interpretation over pixel-perfect clone | Shows product judgment vs copying ability | — Pending |
| Advertiser-facing only | Keeps scope tight, one clear user journey | — Pending |
| Mock data inspired by real listings | Shows understanding of their data model without literal scraping | — Pending |
| Simulated loading states via setTimeout | Demonstrates awareness of UX patterns even without real fetches | — Pending |

---
*Last updated: 2026-02-20 after initialization*
