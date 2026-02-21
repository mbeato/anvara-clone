# Phase 6: Landing Page - Context

**Gathered:** 2026-02-21
**Status:** Ready for planning

<domain>
## Phase Boundary

Full replication of Anvara's current landing page (anvara.com) with all 12 sections, smooth animations, and real data integration. This is a faithful clone that demonstrates execution ability — the prototype IS the pitch. No "hire me" framing beyond the existing footer attribution.

Reference screenshots: `screenshots/Landing1.png` through `screenshots/Landing11.png`

</domain>

<decisions>
## Implementation Decisions

### Hero Section
- Video background with 2-3 short action sports clips that crossfade on loop
- Headline: adapted copy matching Anvara's positioning ("Connect Your Brand to Culture at Scale")
- Single blue CTA button "Try Anvara Free" — links to /browse (no mock login page)
- Dark overlay on video for text readability
- Bottom of hero: scrolling property cards (all 12 seeded properties, jump-snap every 3 seconds)
- Landing-specific compact card variant (image-heavy with overlay text, not the browse page PropertyCard)
- Property cards link to existing detail pages (/properties/[id])

### Section Structure (12 sections, top to bottom)
1. **Hero** — Video bg, headline, CTA, scrolling property cards
2. **Brand logos bar** — micro1, Legendz, Delta, gopuff (match Anvara exactly)
3. **"What is Anvara"** — Rotating text ("Music Event", "Food Festival", etc.), 3D token illustrations approximated with CSS 3D transforms/shadows (whatever looks smoothest)
4. **Access the Whole Market** — Property list, "Check the Market" CTA
5. **A-Z Execution** — Before/After UI mockup recreation, "Make a Deal" CTA
6. **Analytics / Performance Reporting** — Metrics visualization (125.2M Impressions, 144 Mentions, 4.0x ROI), "Measure Success" CTA
7. **Anvara Intelligence** — AI matching flow diagram recreation, prompt form UI, "Try Anvara Intelligence" CTA
8. **For Brands / For Rightsholders** — Two-column logo grids with real SVG logos, CTAs for each
9. **Testimonial** — Exact GoPuff quote: "It's like having a full-service agency available 24/7 that responds instantly and isn't biased—but 100x smarter." — Edan Mayron, GoPuff
10. **FAQ** — 6 accordion items matching Anvara's questions (What is Anvara?, How does payment work?, What types of opportunities?, Can agencies use Anvara?, Is there support?, Is Anvara available internationally?)
11. **Final CTA** — Blue banner, "Skip the Decks, Seal the deal", smooth continuous-scroll property cards (all 12 properties)
12. **Footer** — Links, newsletter input, large "anvara" watermark text

### Animations
- Independent component animations matching Anvara (rotating text, auto-scrolling carousels, etc.)
- PLUS scroll-triggered section reveals (fade up + slight translate on viewport enter) — upgrade over current Anvara
- Smoothness is critical — janky animations are worse than no animations

### Value Prop Section Mockups
- Recreate the UI mockup illustrations (Before/After deal flow, metrics chart, AI matching diagram) with custom styling
- Not screenshots or images of Anvara's mockups — build them as actual UI components

### Property Cards
- All 12 seeded properties used in both carousel locations
- Hero: jump-snap scroll every 3 seconds (shows ~3 cards at a time)
- Final blue CTA: smooth continuous scroll (marquee-style)
- Landing-specific compact card component (separate from browse PropertyCard)
- All cards link to /properties/[id] detail pages

### Brand/Rightsholder Logos
- Source SVG logos from public sources (clearbit, simple-icons, etc.)
- Match Anvara's exact brand list: gopuff, Coca-Cola, Snapchat, McDonald's, Mastercard, Kalshi, Brex, TikTok, Ally, LEGO
- Match Anvara's exact rightsholder list: LAFC, Serie A, SXSW, We Belong Here, ATP Tour, and others from screenshots
- Grayscale treatment to match Anvara's styling

### Claude's Discretion
- Exact video clip sources for hero background (free stock action sports footage)
- CSS 3D token approach vs flat illustrations for "What is Anvara" section (whichever looks smoothest)
- Scroll animation timing and easing curves
- Exact FAQ answer content (match Anvara's tone)
- Animation library choice (Framer Motion, CSS animations, or intersection observer — whatever produces smoothest result)
- Responsive breakpoints for all sections

</decisions>

<specifics>
## Specific Ideas

- The landing page exists outside the app shell (no sidebar) — it's the public-facing entry point
- All CTAs that reference "Try Anvara Free", "Get Started", etc. should route to /browse since there's no auth/login
- Hero video clips should be action sports / events / culture — matches Anvara's brand positioning
- The page should feel premium and fast — animations must be smooth, not flashy
- This is a take-home assignment context: user had first interview, proactively building before second round is scheduled. Execution quality and faithfulness matter more than creativity here.

</specifics>

<deferred>
## Deferred Ideas

- Public property listing pages (separate from authenticated detail pages) — out of scope, link to existing detail pages instead
- Mock login/signup flow — not needed for prototype
- Newsletter form functionality — visual only

</deferred>

---

*Phase: 06-landing-page*
*Context gathered: 2026-02-21*
