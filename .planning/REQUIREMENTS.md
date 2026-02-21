# Requirements — Anvara Frontend Prototype

## v1 Requirements

### Landing Page
- [ ] **LAND-01**: Landing page displays hero section with headline, value prop, and primary CTA
- [ ] **LAND-02**: Landing page displays "How it works" section explaining marketplace flow
- [ ] **LAND-03**: Landing page displays featured sponsorship properties linking to browse page
- [ ] **LAND-04**: Landing page displays social proof (brand logos, stats, or testimonials)
- [ ] **LAND-05**: Landing page is faithful to current Anvara site content/messaging

### Browse / Discovery
- [x] **BROWSE-01**: User can view sponsorship properties as a card grid with image, name, category, price range, start date
- [x] **BROWSE-02**: Left sidebar navigation with icon-based menu items (matching their current layout)
- [x] **BROWSE-03**: Auto-scrolling category carousel at top with image cards (Jazz Festivals, Food Festivals, Action Sports, etc.)
- [x] **BROWSE-04**: Category tab bar with icons (All, Music, Art, Sports, Food, Wellness, Fun, Charity, Culture, Business, Fashion, Tech, Outdoor, Film, Networking)
- [x] **BROWSE-05**: User can filter properties by category via tab selection
- [x] **BROWSE-06**: User can filter properties by region/location
- [x] **BROWSE-07**: User can filter properties by price range
- [x] **BROWSE-08**: Active filters display as removable chips above results
- [x] **BROWSE-09**: Skeleton loading states appear during simulated data fetch (setTimeout)
- [x] **BROWSE-10**: "Recommended for you" section is always visible on browse page with mock personalization
- [x] **BROWSE-11**: Audience fit badge appears on property cards ("Great Match" / percentage)
- [x] **BROWSE-12**: Empty state displays when filters return zero results
- [x] **BROWSE-13**: Properties with no set price show price range or "Request Quote" instead of $0
- [x] **BROWSE-14**: Up to 8 properties displayed per category tab

### Property Detail
- [x] **DETAIL-01**: Property detail page displays hero image, title, subtitle, event type tag, date, and tier count
- [ ] **DETAIL-02**: Document/media carousel on right side (case studies, photos) with "View all photos"
- [x] **DETAIL-03**: Tiered pricing section with tab-style tier selector (e.g., Official $75K, Gold $40K, Silver $95K, Bronze)
- [x] **DETAIL-04**: Each tier displays detailed bullet list of what's included
- [x] **DETAIL-05**: Right sidebar with "Make an Offer" button, "Schedule Call" button, and minimum spend display
- [x] **DETAIL-06**: "Build your own offer" section with custom proposal input
- [x] **DETAIL-07**: Trust badges: "Verified Seller" and "Money Secured"
- [x] **DETAIL-08**: "About this listing" section with long-form description
- [x] **DETAIL-09**: Audience demographics section (gender split, age range, HHI, lifestyle categories)
- [x] **DETAIL-10**: "Ideal Brand Categories" section listing best-fit brand types
- [x] **DETAIL-11**: "Activation Formats" section (premium footprints, demos, talent integrations, etc.)
- [ ] **DETAIL-12**: Documents section with downloadable attachments (mock PDFs)

### Messaging (Advertiser Perspective)
- [ ] **MSG-01**: Messaging inbox displays list of conversation threads with properties
- [ ] **MSG-02**: User can view a conversation thread with message history
- [ ] **MSG-03**: User can send a new message in a thread (as the advertiser)
- [ ] **MSG-04**: AI-simulated responses appear from the property side via o3-mini
- [ ] **MSG-05**: AI responses are labeled as "AI-simulated" in the UI
- [ ] **MSG-06**: Pre-seeded conversation threads exist on first load (not empty inbox)
- [ ] **MSG-07**: "Make an Offer" action in thread opens a simple form (amount, terms, send)
- [ ] **MSG-08**: Offer appears as a structured message in the thread after submission

### Data Layer
- [x] **DATA-01**: Prisma schema defines Property, Message, Thread, and Offer models
- [x] **DATA-02**: Seed script populates database with realistic sponsorship property data
- [x] **DATA-03**: Seed script populates pre-seeded conversation threads
- [x] **DATA-04**: Vercel Postgres configured for deployment

### UX Polish
- [ ] **UX-01**: All pages are mobile-responsive (works on phone/tablet)
- [x] **UX-02**: Proper loading states on all data-heavy sections
- [x] **UX-03**: Proper error states with user-friendly messages
- [x] **UX-04**: Footer displays "Prototype by Max Beato" on all pages
- [x] **UX-05**: Custom page title and Anvara-style favicon (not default Next.js)
- [ ] **UX-06**: No console errors visible in DevTools
- [x] **UX-07**: Font loading handled via next/font (no FOUT)

### Deployment
- [ ] **DEPLOY-01**: App deploys to Vercel on unlisted URL
- [ ] **DEPLOY-02**: Vercel Postgres database provisioned and connected
- [ ] **DEPLOY-03**: OpenAI API key configured in Vercel environment variables
- [ ] **DEPLOY-04**: `noindex` meta tag prevents search engine indexing
- [ ] **DEPLOY-05**: `npm run build` passes without errors before deploy

---

## v2 Requirements (Deferred)

- Saved/shortlist properties via localStorage (heart icon on cards)
- Compare properties side-by-side
- Search bar with typeahead
- Real-time message updates (WebSocket/polling)
- Property owner dashboard
- Campaign builder (add multiple properties to a deal package)
- Analytics dashboard for property owners

## Out of Scope

- Real authentication (OAuth, sessions, passwords) — role selection is sufficient
- Admin panel — not relevant to demo
- Payment processing — not in scope
- Email notifications — demo only
- Multi-tenant data isolation — single demo instance
- Full-text search — filters are sufficient
- i18n / multi-language — English only

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| DATA-01 | Phase 1 — Foundation | Complete |
| DATA-02 | Phase 1 — Foundation | Complete |
| DATA-03 | Phase 1 — Foundation | Complete |
| DATA-04 | Phase 1 — Foundation | Complete |
| UX-05 | Phase 1 — Foundation | Complete |
| UX-07 | Phase 1 — Foundation | Complete |
| BROWSE-02 | Phase 2 — Layout Shell | Complete |
| UX-04 | Phase 2 — Layout Shell | Complete |
| DETAIL-01 | Phase 3 — Property Detail | Complete |
| DETAIL-02 | Phase 3 — Property Detail | Pending |
| DETAIL-03 | Phase 3 — Property Detail | Complete |
| DETAIL-04 | Phase 3 — Property Detail | Complete |
| DETAIL-05 | Phase 3 — Property Detail | Complete |
| DETAIL-06 | Phase 3 — Property Detail | Complete |
| DETAIL-07 | Phase 3 — Property Detail | Complete |
| DETAIL-08 | Phase 3 — Property Detail | Complete |
| DETAIL-09 | Phase 3 — Property Detail | Complete |
| DETAIL-10 | Phase 3 — Property Detail | Complete |
| DETAIL-11 | Phase 3 — Property Detail | Complete |
| DETAIL-12 | Phase 3 — Property Detail | Pending |
| BROWSE-01 | Phase 4 — Browse and Discovery | Complete |
| BROWSE-03 | Phase 4 — Browse and Discovery | Complete |
| BROWSE-04 | Phase 4 — Browse and Discovery | Complete |
| BROWSE-05 | Phase 4 — Browse and Discovery | Complete |
| BROWSE-06 | Phase 4 — Browse and Discovery | Complete |
| BROWSE-07 | Phase 4 — Browse and Discovery | Complete |
| BROWSE-08 | Phase 4 — Browse and Discovery | Complete |
| BROWSE-09 | Phase 4 — Browse and Discovery | Complete |
| BROWSE-10 | Phase 4 — Browse and Discovery | Complete |
| BROWSE-11 | Phase 4 — Browse and Discovery | Complete |
| BROWSE-12 | Phase 4 — Browse and Discovery | Complete |
| BROWSE-13 | Phase 4 — Browse and Discovery | Complete |
| BROWSE-14 | Phase 4 — Browse and Discovery | Complete |
| UX-02 | Phase 4 — Browse and Discovery | Complete |
| UX-03 | Phase 4 — Browse and Discovery | Complete |
| MSG-01 | Phase 5 — Messaging | Pending |
| MSG-02 | Phase 5 — Messaging | Pending |
| MSG-03 | Phase 5 — Messaging | Pending |
| MSG-04 | Phase 5 — Messaging | Pending |
| MSG-05 | Phase 5 — Messaging | Pending |
| MSG-06 | Phase 5 — Messaging | Pending |
| MSG-07 | Phase 5 — Messaging | Pending |
| MSG-08 | Phase 5 — Messaging | Pending |
| LAND-01 | Phase 6 — Landing Page | Pending |
| LAND-02 | Phase 6 — Landing Page | Pending |
| LAND-03 | Phase 6 — Landing Page | Pending |
| LAND-04 | Phase 6 — Landing Page | Pending |
| LAND-05 | Phase 6 — Landing Page | Pending |
| UX-01 | Phase 7 — Polish and Deploy | Pending |
| UX-06 | Phase 7 — Polish and Deploy | Pending |
| DEPLOY-01 | Phase 7 — Polish and Deploy | Pending |
| DEPLOY-02 | Phase 7 — Polish and Deploy | Pending |
| DEPLOY-03 | Phase 7 — Polish and Deploy | Pending |
| DEPLOY-04 | Phase 7 — Polish and Deploy | Pending |
| DEPLOY-05 | Phase 7 — Polish and Deploy | Pending |

---
*Last updated: 2026-02-21 after roadmap creation — traceability complete (55/55 requirements mapped)*
