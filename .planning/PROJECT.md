# Anvara Frontend Prototype

## What This Is

A polished prototype of Anvara's sponsorship marketplace, built as an interview follow-up demo for founders Nick and Andrei. Demonstrates product thinking, UX improvements, and initiative. Includes a real data layer (Prisma + Postgres) and AI-simulated messaging to showcase deal flow. Deployed on an unlisted Vercel URL for two people to review.

## Core Value

An advertiser can browse sponsorship properties, discover relevant opportunities, understand pricing, and initiate deal conversations — with a UX that feels better than the current Anvara site. Both sides of the marketplace (advertiser and property) are explorable via role selection.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Landing page — full clone with all sections (hero, how it works, featured properties, social proof)
- [ ] Property browse/discovery page with filtering (category, region, price range)
- [ ] Skeleton loading states (simulated via setTimeout)
- [ ] "Recommended for you" section on browse page (always visible)
- [ ] Audience fit badge on property cards ("Great Match" / "85% fit")
- [ ] Property detail page with hero, key metrics, audience demographics, pricing tiers
- [ ] "Request Quote" CTA on detail page (mock modal)
- [ ] Fix $0 pricing display — show price ranges or "Request Quote"
- [ ] Messaging inbox with pre-seeded conversation threads (advertiser perspective)
- [ ] AI-simulated responses from property side via o3-mini (labeled as AI in UI)
- [ ] "Make an Offer" action in messaging thread (simple form: amount, terms)
- [ ] Prisma + Postgres data layer with seed data
- [ ] Proper empty/loading/error states throughout
- [ ] Mobile-responsive layout
- [ ] Clean composable filtering UX
- [ ] Data inspired by real Anvara listings
- [ ] Footer: "Prototype by Max Beato"
- [ ] Deploy to unlisted Vercel URL

### Out of Scope

- Real authentication (OAuth, sessions, passwords) — role selection is enough
- Admin panel — not relevant to demo
- Payment processing — not in scope
- Real-time WebSocket updates — polling or refresh is fine
- Email notifications — demo only
- Multi-tenant data isolation — single demo instance
- Search indexing / full-text search — filters are sufficient

## Context

- **What Anvara is:** A marketplace connecting brands/advertisers (Delta, Kalshi, DHL) with sponsorship properties (LAFC, NY Jets, Art Basel, Coachella). Their thesis is making 30 small $5K sponsorship deals as easy to manage as one $500K deal.
- **Audience:** Two founders evaluating a prospective hire's product thinking and initiative
- **Current site issues identified:** Loading flash on tab clicks, $0 pricing display, desktop-focused layout, no personalization signals
- **Landing page approach:** Full clone of all sections from their current site — faithful to messaging
- **Browse/detail approach:** Take creative liberties — this is where UX improvements shine
- **Data approach:** Prisma + Postgres with seed data inspired by real Anvara listings
- **Messaging:** Pre-seeded threads + AI responses (o3-mini). Always advertiser perspective — AI simulates property side. "Make an Offer" action in threads.
- **Personalization:** "Recommended for you" always visible on browse page, audience fit badges on cards

## Constraints

- **Tech stack**: Next.js 16, React 19, TypeScript, Tailwind CSS v4, ShadCN UI, Prisma, Vercel Postgres
- **AI**: OpenAI o3-mini for simulated messaging responses
- **Deployment**: Vercel (unlisted URL like anvara-demo-mbeato.vercel.app)
- **Timeline**: Extended from original "few hours" to accommodate backend + messaging
- **Assets**: Use public assets/images from anvara.com where available

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Add Prisma + Postgres | Real data layer shows engineering depth alongside UX polish | — Pending |
| Advertiser-only perspective | Simpler demo flow, AI plays the property side in messaging | — Pending |
| AI-simulated messaging via o3-mini | Interactive deal flow demo; labeled as AI so expectations are set | — Pending |
| "Make an Offer" in messaging | Demonstrates understanding of deal mechanics in sponsorship marketplace | — Pending |
| Full landing page clone | All sections from their site, faithful to their content/messaging | — Pending |
| Creative liberties on browse/detail | Improvements over their current UX — the value-add pages | — Pending |
| Data inspired by real listings | Shows understanding of their data model without literal scraping | — Pending |

---
*Last updated: 2026-02-20 after initialization*
