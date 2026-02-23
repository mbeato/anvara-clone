# Phase 7: Polish and Deploy - Context

**Gathered:** 2026-02-23
**Status:** Ready for planning

<domain>
## Phase Boundary

Take the complete prototype through mobile responsiveness fixes, console/build cleanup, Vercel deployment, and README preparation for founder handoff. The prototype should be live at an unlisted Vercel URL with a polished README showcasing the project.

</domain>

<decisions>
## Implementation Decisions

### Mobile Responsive Strategy
- Landing page is the highest priority for mobile polish — it's the public-facing page founders will share
- All app pages (browse, detail, messaging, analytics, deals, campaigns) should feel polished at mobile — intentionally designed, not just functional
- App sidebar collapses to hamburger menu on mobile (drawer/sheet overlay)
- Target breakpoint: 375px only — no tablet pass needed
- Desktop (1280px) already works — this phase is mobile-focused

### Deploy & URL Setup
- Target URL: anvara-prototype-mbeato.vercel.app
- Database: Vercel Postgres (Neon) — use Vercel's built-in Postgres integration
- Deploy method: GitHub integration — connect existing GitHub repo to Vercel for auto-deploys on push to main
- Repo is already on GitHub — just needs Vercel project linked
- Environment variables: OpenAI API key + Postgres connection string set in Vercel dashboard
- `noindex` meta tag to prevent search engine indexing

### Console & Build Cleanup
- Zero errors AND zero warnings in browser DevTools console — clean slate
- Fix only production-visible warnings — dev-only Next.js/React warnings can be ignored
- TypeScript build: zero errors AND zero warnings in `npm run build` output
- Full page audit needed — no known specific issues, Claude should check all pages
- Hydration mismatches: fix only if they appear in production build

### Founder Handoff
- Sharing the full repo (not just the URL)
- README.md updated with: setup instructions, tech stack, architecture overview, and feature highlights
- .planning/ directory stays in repo — shows the structured build process
- README should highlight all three impressiveness vectors equally:
  - AI features (chat recommendations, AI-simulated messaging)
  - UX polish (animations, loading states, responsive design, accessibility)
  - Breadth of features (analytics, deals pipeline, campaigns, tour, public listings)

### Claude's Discretion
- Specific mobile layout adjustments per component (stacking order, font sizes, spacing)
- README structure and tone
- Order of operations for the responsive pass
- Which console warnings to prioritize fixing first

</decisions>

<specifics>
## Specific Ideas

- URL format: anvara-prototype-mbeato.vercel.app (includes builder name)
- Founders will have the full repo — code quality and README matter, not just the live site
- .planning/ directory kept to demonstrate structured build methodology

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 07-polish-and-deploy*
*Context gathered: 2026-02-23*
