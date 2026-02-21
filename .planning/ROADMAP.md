# Roadmap: Anvara Frontend Prototype

## Overview

Build a polished Anvara sponsorship marketplace prototype from data layer through deployed product. The build order front-loads the data contract and the most complex UI page (detail), then layers in browse, messaging, and the static landing page, finishing with mobile polish and Vercel deploy. Every phase delivers a coherent, independently verifiable capability.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Foundation** - Next.js project scaffolded, Prisma schema defined, seed data created, data query helpers ready
- [ ] **Phase 2: Layout Shell** - Root layout, navigation sidebar, footer, fonts, and metadata in place — every page renders in real context
- [ ] **Phase 3: Property Detail** - Full detail page with hero, tiers, demographics, offer sidebar, documents, and trust badges
- [ ] **Phase 4: Browse and Discovery** - Full browse page with category carousel, tab bar, card grid, filters, skeletons, and "Recommended for You"
- [ ] **Phase 5: Messaging** - Advertiser inbox with pre-seeded threads, AI-simulated property responses, and "Make an Offer" form
- [ ] **Phase 6: Landing Page** - Full Anvara landing page clone with hero, how it works, featured properties, and social proof
- [ ] **Phase 7: Polish and Deploy** - Mobile responsiveness, error/loading states, build verification, and Vercel deploy

## Phase Details

### Phase 1: Foundation
**Goal**: The project runs locally with real data — Prisma schema defined, Postgres connected, seed data loaded, and TypeScript query helpers available for every subsequent component
**Depends on**: Nothing (first phase)
**Requirements**: DATA-01, DATA-02, DATA-03, DATA-04, UX-05, UX-07
**Success Criteria** (what must be TRUE):
  1. `npm run dev` starts without errors and displays a working Next.js page
  2. `npx prisma db seed` runs without errors and populates Property, Message, Thread, and Offer records
  3. `getProperty(id)`, `getAllProperties()`, and `getThreads()` return typed data in a test route or console log
  4. Browser tab shows "Anvara | Sponsorship Marketplace" title with Anvara favicon (not Next.js default)
  5. Fonts load via `next/font` — no flash of unstyled text on page load
**Plans**: 4 plans in 4 waves (sequential — each plan depends on the previous)

Plans:
- [ ] 01-01-PLAN.md — Scaffold Next.js with TypeScript, Tailwind v4, ShadCN, Picsum image config
- [ ] 01-02-PLAN.md — Prisma schema (Property, Package, Thread, Message, Offer) + Neon Postgres + Client singleton
- [ ] 01-03-PLAN.md — Seed script with 10-14 properties, packages, threads, messages, and offers
- [ ] 01-04-PLAN.md — Query helpers (getProperty, getAllProperties, getThreads, filterProperties) + metadata + favicon + Inter font

### Phase 2: Layout Shell
**Goal**: Every page renders inside a shared layout that matches Anvara's visual identity — left sidebar navigation, consistent header, and footer attribution
**Depends on**: Phase 1
**Requirements**: BROWSE-02, UX-04
**Success Criteria** (what must be TRUE):
  1. Left sidebar displays with icon-based menu items matching the current Anvara layout (Marketplace, Campaigns, etc.)
  2. Footer displays "Prototype by Max Beato" on every page
  3. `next.config.ts` has `images.remotePatterns` configured so no image hostname errors occur on Vercel
**Plans**: TBD

Plans:
- [ ] 02-01: Root layout (`app/layout.tsx`), left sidebar nav with icon menu, top header bar
- [ ] 02-02: Footer component with attribution, `next.config.ts` image hostname config

### Phase 3: Property Detail
**Goal**: An advertiser can navigate to a property detail page and see all the information needed to make a sponsorship decision — hero, tier pricing, audience demographics, activation formats, and a working offer sidebar
**Depends on**: Phase 2
**Requirements**: DETAIL-01, DETAIL-02, DETAIL-03, DETAIL-04, DETAIL-05, DETAIL-06, DETAIL-07, DETAIL-08, DETAIL-09, DETAIL-10, DETAIL-11, DETAIL-12
**Success Criteria** (what must be TRUE):
  1. Detail page loads for any seeded property ID and displays hero image, title, event type, date, and tier count
  2. Pricing tier tabs are clickable — selecting a tier shows its included bullet list and price; no tier ever shows "$0"
  3. Right sidebar displays "Make an Offer" button, "Schedule Call" button, and minimum spend — all visible without scrolling on desktop
  4. "Build your own offer" section renders with a custom proposal input below the tier selector
  5. Audience demographics section displays gender split, age range, HHI, and lifestyle categories from seed data
**Plans**: TBD

Plans:
- [ ] 03-01: Property detail page route (`app/properties/[id]/page.tsx`) with `generateStaticParams`, hero section, document carousel
- [ ] 03-02: Tiered pricing section with tab selector, tier bullet lists, trust badges, "Build your own offer" input
- [ ] 03-03: Right sidebar with "Make an Offer" CTA, "Schedule Call" button, minimum spend; audience demographics, ideal brand categories, activation formats, documents section

### Phase 4: Browse and Discovery
**Goal**: An advertiser can browse all sponsorship properties, filter by category, region, and price, see skeleton loading states, and spot personalized recommendations — this is the core discovery experience
**Depends on**: Phase 3
**Requirements**: BROWSE-01, BROWSE-03, BROWSE-04, BROWSE-05, BROWSE-06, BROWSE-07, BROWSE-08, BROWSE-09, BROWSE-10, BROWSE-11, BROWSE-12, BROWSE-13, BROWSE-14, UX-02, UX-03
**Success Criteria** (what must be TRUE):
  1. Browse page displays a card grid of sponsorship properties — each card shows image, name, category, price range (never "$0"), and audience fit badge
  2. Auto-scrolling category carousel appears at the top of the page with image cards (Jazz Festivals, Food Festivals, Action Sports, etc.)
  3. Category tab bar is clickable — selecting a tab filters visible cards to that category, with up to 8 results shown
  4. Active filters display as removable chips above the grid; clearing a chip removes that filter
  5. Skeleton loading cards appear for 200–400ms on initial page load before real cards render
  6. "Recommended for you" strip is always visible on the browse page with mock-personalized property cards
  7. Empty state (icon + message + reset link) appears when filters produce zero results
**Plans**: TBD

Plans:
- [ ] 04-01: Browse page route, `BrowseClient` Client Component with filter `useState`, category tab bar with icons
- [ ] 04-02: Auto-scrolling category carousel with image cards
- [ ] 04-03: `PropertyCard` component with image, name, category, price range display, audience fit badge
- [ ] 04-04: `FilterPanel` (region dropdown, price range slider), active filter chips, empty state, skeleton loading grid
- [ ] 04-05: "Recommended for you" strip with hardcoded featured items and personalization label

### Phase 5: Messaging
**Goal**: An advertiser can open their inbox, read pre-seeded conversations with properties, send messages that receive AI-simulated responses, and submit a structured "Make an Offer" form
**Depends on**: Phase 2
**Requirements**: MSG-01, MSG-02, MSG-03, MSG-04, MSG-05, MSG-06, MSG-07, MSG-08
**Success Criteria** (what must be TRUE):
  1. Messaging inbox displays a list of pre-seeded conversation threads — not an empty inbox on first load
  2. Clicking a thread opens the conversation history with messages from both the advertiser and property side
  3. Advertiser can type and send a new message; a reply from the property (labeled "AI-simulated") appears within a few seconds
  4. "Make an Offer" button in a thread opens a form with amount and terms fields; submitting renders the offer as a structured message in the thread
**Plans**: TBD

Plans:
- [ ] 05-01: Messaging route (`app/messages/page.tsx`), inbox list of threads from database
- [ ] 05-02: Thread detail view with message history, send message form, AI response via o3-mini API route
- [ ] 05-03: "Make an Offer" modal form (amount, terms), offer submission stores to DB and renders as structured message

### Phase 6: Landing Page
**Goal**: The landing page faithfully reproduces Anvara's current site content and messaging, giving founders a recognizable starting point that demonstrates UX polish on a page they know
**Depends on**: Phase 4
**Requirements**: LAND-01, LAND-02, LAND-03, LAND-04, LAND-05
**Success Criteria** (what must be TRUE):
  1. Hero section displays headline, value prop text, and a primary CTA button that navigates to the browse page
  2. "How it works" section explains the marketplace flow in the same three-step structure as the current Anvara site
  3. Featured properties section shows real seeded property cards (reusing `PropertyCard`) that link to detail pages
  4. Social proof section is present with brand logos, stats, or testimonials faithful to Anvara's current messaging
**Plans**: TBD

Plans:
- [ ] 06-01: Landing page route (`app/page.tsx`), hero section, "How it works" section
- [ ] 06-02: Featured properties section (reuses `PropertyCard`), social proof section with brand logos/stats

### Phase 7: Polish and Deploy
**Goal**: The prototype passes a mobile check, has no console errors, builds cleanly locally, and is live on an unlisted Vercel URL ready for the founders to click
**Depends on**: Phases 1-6
**Requirements**: UX-01, UX-06, DEPLOY-01, DEPLOY-02, DEPLOY-03, DEPLOY-04, DEPLOY-05
**Success Criteria** (what must be TRUE):
  1. All pages render correctly at 375px (mobile) and 1280px (desktop) without horizontal scroll or broken layouts
  2. Browser DevTools console shows zero errors on any page
  3. `npm run build` completes locally without TypeScript or build errors before deploying
  4. App is live at an unlisted Vercel URL (e.g., anvara-demo-mbeato.vercel.app) with `noindex` preventing search engine indexing
  5. OpenAI API key and Vercel Postgres connection string are set as Vercel environment variables — AI messaging works on the deployed URL
**Plans**: TBD

Plans:
- [ ] 07-01: Mobile responsive pass — test and fix all pages at 375px
- [ ] 07-02: Console error audit, `npm run build` verification, `noindex` meta tag
- [ ] 07-03: Vercel deploy — provision Postgres, set environment variables, push and verify live URL

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5 → 6 → 7

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation | 0/4 | Not started | - |
| 2. Layout Shell | 0/2 | Not started | - |
| 3. Property Detail | 0/3 | Not started | - |
| 4. Browse and Discovery | 0/5 | Not started | - |
| 5. Messaging | 0/3 | Not started | - |
| 6. Landing Page | 0/2 | Not started | - |
| 7. Polish and Deploy | 0/3 | Not started | - |
