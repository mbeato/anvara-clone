# Phase 7: Polish and Deploy — Research

**Researched:** 2026-02-23
**Domain:** Mobile responsiveness, build cleanup, Vercel deployment with Neon Postgres
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Mobile Responsive Strategy**
- Landing page is the highest priority for mobile polish — it's the public-facing page founders will share
- All app pages (browse, detail, messaging, analytics, deals, campaigns) should feel polished at mobile — intentionally designed, not just functional
- App sidebar collapses to hamburger menu on mobile (drawer/sheet overlay)
- Target breakpoint: 375px only — no tablet pass needed
- Desktop (1280px) already works — this phase is mobile-focused

**Deploy & URL Setup**
- Target URL: anvara-prototype-mbeato.vercel.app
- Database: Vercel Postgres (Neon) — use Vercel's built-in Postgres integration
- Deploy method: GitHub integration — connect existing GitHub repo to Vercel for auto-deploys on push to main
- Repo is already on GitHub — just needs Vercel project linked
- Environment variables: OpenAI API key + Postgres connection string set in Vercel dashboard
- `noindex` meta tag to prevent search engine indexing

**Console & Build Cleanup**
- Zero errors AND zero warnings in browser DevTools console — clean slate
- Fix only production-visible warnings — dev-only Next.js/React warnings can be ignored
- TypeScript build: zero errors AND zero warnings in `npm run build` output
- Full page audit needed — no known specific issues, Claude should check all pages
- Hydration mismatches: fix only if they appear in production build

**Founder Handoff**
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

### Deferred Ideas (OUT OF SCOPE)
None listed.
</user_constraints>

---

## Summary

Phase 7 covers three parallel tracks: (1) mobile responsiveness pass, (2) build and console cleanup, and (3) Vercel deployment. Researching the codebase directly reveals exactly which components need mobile fixes and what deployment steps are required.

The build currently passes cleanly (`npm run build` exits with zero errors and zero warnings locally). The main work is mobile CSS fixes. The most critical mobile issues are in the property detail page (`grid-cols-5` with no mobile override) and the messaging client (fixed `w-80` thread list). The landing page already has responsive work but some complex sections (hero card carousel, anvara intelligence mockup) will need visual audit.

For deployment: the repo is at `github.com/mbeato/anv`. Vercel auto-detects Next.js and needs only two environment variables set in the dashboard: `DATABASE_URL` and `OPENAI_API_KEY`. A `postinstall` script must be added to `package.json` to run `prisma generate` — without it, the deployed build will fail because Prisma's generated client is not committed to git. The `noindex` robots meta tag is already set in `app/layout.tsx`.

**Primary recommendation:** Fix mobile layouts first (bottom-up: fix components before pages), add `postinstall` to `package.json`, then deploy to Vercel — in that order, so the final push deploys a polished build.

---

## Standard Stack

No new libraries needed. All fixes use existing stack.

### Core (already installed)
| Library | Version | Purpose | Notes |
|---------|---------|---------|-------|
| Tailwind CSS v4 | ^4 | Responsive utilities | Use `sm:`, `md:`, `lg:` breakpoints |
| ShadCN Sidebar | via `components/ui/sidebar.tsx` | Mobile drawer sidebar | Already handles `isMobile` via `useIsMobile` hook at 768px |
| ShadCN Sheet | via `components/ui/sheet.tsx` | Sidebar mobile overlay | Auto-used by sidebar component |
| Next.js Metadata API | 16.1.6 | `noindex` meta tag | Already set in `app/layout.tsx` |
| Prisma + @prisma/adapter-neon | ^7.4.1 | Database ORM | Needs `postinstall` script for Vercel |

### No New Installation Required
All responsive fixes are CSS-only. Deployment requires only script changes and Vercel dashboard configuration.

---

## Architecture Patterns

### App Structure (confirmed from codebase)

```
app/
├── layout.tsx              # Root layout — robots noindex ALREADY SET here
├── page.tsx                # Landing page
├── (app)/                  # Authenticated app shell
│   ├── layout.tsx          # SidebarProvider + AppSidebar + HeaderBar
│   ├── ai/                 # AI chat
│   ├── campaigns/          # Campaigns table
│   ├── dashboard/          # Analytics charts
│   ├── deals/              # Kanban pipeline
│   ├── listings/           # Browse + property detail
│   ├── messages/           # Messaging client
│   └── settings/           # Settings
└── (public)/               # Public listing pages (no auth shell)
    └── p/[slug]/
```

### Pattern 1: ShadCN Sidebar Mobile Behavior (Already Working)

The sidebar already handles mobile via `useIsMobile()` hook (breakpoint: 768px). On mobile it renders as a `Sheet` overlay. The `SidebarTrigger` in `HeaderBar` toggles it. **This is already working** — no sidebar code changes needed.

```typescript
// Source: components/ui/sidebar.tsx (confirmed)
// At 768px and below, sidebar renders as Sheet (mobile drawer)
if (isMobile) {
  return (
    <Sheet open={openMobile} onOpenChange={setOpenMobile}>
      <SheetContent side="left" data-mobile="true">
        {children}
      </SheetContent>
    </Sheet>
  )
}
```

### Pattern 2: Tailwind v4 Responsive Breakpoints

Tailwind v4 uses the same mobile-first breakpoint system. Breakpoints:
- `sm:` = 640px+
- `md:` = 768px+
- `lg:` = 1024px+

At 375px (target), NO prefix applies. All base (unprefixed) classes render at 375px. To fix mobile, add base classes and use `lg:` or `md:` to restore the desktop layout.

**Standard fix pattern for two-column layouts:**
```html
<!-- Before: always 5 columns, broken at 375px -->
<div class="grid grid-cols-5 gap-8">

<!-- After: single column on mobile, 5-column on lg+ -->
<div class="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
  <div class="lg:col-span-3"> ... </div>
  <div class="lg:col-span-2 lg:sticky lg:top-20"> ... </div>
</div>
```

### Pattern 3: Messaging Mobile — Tab/Panel Switch

The messaging client uses a fixed `w-80` left panel side-by-side with the conversation. At 375px, both panels can't fit. Standard mobile pattern: show thread list OR conversation, not both.

```typescript
// Mobile pattern: single panel with back navigation
// Add state: type MobileView = "threads" | "conversation"
// On mobile (useIsMobile), show only the active panel
// Show back button in conversation header to return to thread list
```

### Pattern 4: noindex Meta Tag (Already Implemented)

The `app/layout.tsx` already exports:
```typescript
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
}
```
This generates `<meta name="robots" content="noindex,nofollow" />` on all pages. **No action needed.**

### Pattern 5: Vercel Deployment with Prisma + Neon

The critical step missing is `prisma generate` in `postinstall`. Without it, Vercel's build caches node_modules and never regenerates the Prisma client, causing import errors.

```json
// package.json — add this script
{
  "scripts": {
    "postinstall": "prisma generate",
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  }
}
```

**Environment variables required in Vercel dashboard:**
- `DATABASE_URL` — pooled Neon connection string (same value as local `.env.local`)
- `OPENAI_API_KEY` — OpenAI API key

Note: `DIRECT_URL` is only used by Prisma CLI tooling (migrate, db push). It is NOT needed in the Vercel production environment since migrations are not run during the build. The `seed.ts` also uses `DIRECT_URL` but seeding is a manual step, not a build step.

---

## Specific Mobile Issues Found (Codebase Audit)

### CRITICAL — Will Break Layout at 375px

**1. Property Detail Page** (`app/(app)/listings/[slug]/page.tsx` line 25)
```
grid grid-cols-5 gap-8
col-span-3 (left: content)
col-span-2 sticky top-20 mt-20 (right: offer sidebar)
```
Fix: `grid-cols-1 lg:grid-cols-5`, remove sticky/mt-20 on mobile.

**2. Property Detail Loading** (`app/(app)/listings/[slug]/loading.tsx` line 6)
Same `grid grid-cols-5` issue — same fix needed.

**3. Messaging Client** (`components/messaging/messaging-client.tsx` line 76)
```
w-80 border-r flex flex-col overflow-hidden shrink-0
```
Fixed-width 320px thread list at all sizes. At 375px, thread list leaves only 55px for conversation — unusable.
Fix: On mobile, show only the active panel. Use `useIsMobile()` hook.

**4. Header Bar Search** (`components/header-bar.tsx` line 89)
```
<div className="flex max-w-xs flex-1 items-center gap-2">
```
At 375px with sidebar trigger + breadcrumb + search + icons, the header is extremely crowded.
Fix: Hide search input on mobile (`hidden sm:flex`), or collapse to icon-only.

### MODERATE — May Look Cramped But Won't Break

**5. Dashboard Recent Activity Table** (`app/(app)/dashboard/_components/recent-activity-table.tsx`)
Table has no `overflow-x-auto` wrapper. At 375px, 4-column table will overflow.
Fix: Wrap in `<div className="overflow-x-auto">`.

**6. Hero Card Carousel** (`app/_components/landing/hero-section.tsx` line 202)
```
<div className="relative h-[220px] overflow-hidden">
```
Cards are `w-[320px]` each. Horizontal scroll carousel should work, but visual audit needed at 375px.

**7. Landing Hero Type Prompt Row** (`app/_components/landing/hero-section.tsx` line 189)
```
<p className="text-sm sm:text-base font-medium select-none whitespace-nowrap">
```
`whitespace-nowrap` on a "Reach [typed text] with Anvara" line — may overflow at 375px with long typed text.

**8. Campaigns Table** (`app/(app)/campaigns/_components/campaigns-table.tsx`)
Has `overflow-x-auto` wrapper already — this is fine.

### LOW — Likely Fine But Worth Visual Check

**9. AnvaraIntelligence section** — Uses `flex-col lg:flex-row`, collapses to vertical on mobile. The mockup panels have `max-w-[260px]` and `max-w-[240px]` but are inside `flex-col` so should stack fine.

**10. AZ-Execution section** — Uses `grid grid-cols-1 lg:grid-cols-2` — fine on mobile.

**11. Browse page** — Uses `grid-cols-2 md:grid-cols-3 lg:grid-cols-5` — 2 columns at 375px is fine.

**12. Deals pipeline** — Uses `grid-cols-1 md:grid-cols-2 lg:grid-cols-4` — single column at 375px is fine.

**13. Dashboard KPIs** — `grid-cols-2 lg:grid-cols-4` — 2 columns at 375px is fine.

**14. Public listing page** — Uses `grid-cols-1 lg:grid-cols-5` — already correctly responsive.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Mobile sidebar drawer | Custom slide-out | ShadCN Sidebar (already works) | Already implemented via `useIsMobile()` |
| Mobile panel switching in messaging | Complex routing | `useIsMobile()` hook + conditional render | One `isMobile` check, show/hide divs |
| Prisma client generation on deploy | Custom postinstall | `"postinstall": "prisma generate"` | Standard Prisma Vercel pattern |
| Robots/noindex | Custom middleware | Next.js Metadata API | Already in `app/layout.tsx` |

**Key insight:** All hard problems are already solved by the existing stack. Mobile is CSS fixes only. Sidebar is already working. Noindex is already set. The deployment steps are mechanical.

---

## Common Pitfalls

### Pitfall 1: Prisma Client Missing on Vercel
**What goes wrong:** App deploys successfully but immediately crashes with "Cannot find module ./generated/client" or "PrismaClient is unable to be run in this browser environment".
**Why it happens:** Vercel caches `node_modules` across deploys. The `postinstall` hook only runs on a fresh install. Without an explicit `prisma generate` step, the generated client becomes stale or missing.
**How to avoid:** Add `"postinstall": "prisma generate"` to `package.json` scripts. Vercel runs `npm install` which triggers `postinstall` on every deploy.
**Warning signs:** Build succeeds but runtime returns 500 errors on any database-touching page.

### Pitfall 2: Wrong Environment Variable Name
**What goes wrong:** App builds but database queries fail in production.
**Why it happens:** `lib/prisma.ts` reads `process.env.DATABASE_URL`. The Vercel dashboard must have a variable named exactly `DATABASE_URL`. Typos (`DATABSE_URL`, `DATABASE_URL_POOLED`) silently result in `undefined`.
**How to avoid:** Copy the exact variable name from `lib/prisma.ts`. Set scope to "Production, Preview, Development" in Vercel dashboard.
**Warning signs:** Pages with database queries return errors; static pages work fine.

### Pitfall 3: DIRECT_URL vs DATABASE_URL Confusion
**What goes wrong:** Developer adds `DIRECT_URL` thinking it's required for production.
**Why it happens:** Neon uses two URLs — pooled (`DATABASE_URL`) for app connections, direct (`DIRECT_URL`) for Prisma CLI migrations. `DIRECT_URL` is only needed locally for running `prisma db push` / `prisma migrate`.
**How to avoid:** Only `DATABASE_URL` is needed in Vercel. `DIRECT_URL` stays in local `.env.local` only.

### Pitfall 4: Horizontal Scroll on Mobile
**What goes wrong:** Page has no visible broken layout, but scrolling sideways reveals clipped content — fails the "no horizontal scroll" success criterion.
**Why it happens:** Fixed-width elements (`w-80`, `w-[320px]`) wider than 375px, or tables without `overflow-x-auto` wrappers, push the page body wider than the viewport.
**How to avoid:** Test at 375px with browser DevTools. Add `overflow-x-hidden` to the body, or wrap tables in `overflow-x-auto`. Replace fixed `w-80` on messaging thread list with responsive logic.

### Pitfall 5: Sticky Sidebar Breaking on Mobile
**What goes wrong:** `col-span-2 sticky top-20 mt-20` on property detail sidebar looks broken — floats in the middle of content or overlaps on mobile.
**Why it happens:** `sticky` with `top-20` only makes sense in a two-column layout. When columns collapse to `grid-cols-1`, the sidebar renders in normal flow AFTER the main content but with `mt-20` creating unwanted space.
**How to avoid:** Remove `sticky`, `top-20`, and `mt-20` from the sidebar wrapper at mobile. Apply them only at `lg:`.

### Pitfall 6: Postinstall Runs `prisma generate` But Schema Path Is Wrong
**What goes wrong:** `prisma generate` succeeds locally but fails on Vercel because the schema is not at the default `prisma/schema.prisma` path.
**Why it happens:** The project schema is at the default location `prisma/schema.prisma` — confirmed. No custom path needed.
**How to avoid:** N/A — this project uses the default schema path.

---

## Code Examples

### Responsive Property Detail Grid
```typescript
// Source: codebase audit of app/(app)/listings/[slug]/page.tsx
// Fix: grid-cols-1 base, lg:grid-cols-5 restores desktop

<div className="max-w-6xl mx-auto px-4 py-6">
  <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 items-start">
    {/* Left column — full width mobile, 60% desktop */}
    <div className="lg:col-span-3">
      ...content...
    </div>

    {/* Right column — full width mobile, 40% desktop sticky */}
    <div className="lg:col-span-2 lg:sticky lg:top-20">
      <OfferSidebar ... />
    </div>
  </div>
</div>
```

### Mobile Messaging Panel Switch
```typescript
// Source: codebase pattern using existing useIsMobile hook
import { useIsMobile } from "@/hooks/use-mobile"

export function MessagingClient(...) {
  const isMobile = useIsMobile()
  const [mobileView, setMobileView] = useState<"threads" | "conversation">("threads")

  function selectThread(threadId: string) {
    setComposing(false)
    router.push(`/messages?thread=${threadId}`)
    if (isMobile) setMobileView("conversation") // switch panel on mobile
  }

  return (
    <div className="-m-4 flex h-[calc(100vh-3.5rem)] overflow-hidden border-t">
      {/* Thread list: always visible on desktop, only on mobile when mobileView === "threads" */}
      <div className={`
        ${isMobile ? (mobileView === "threads" ? "flex" : "hidden") : "flex"}
        w-full sm:w-80 border-r flex-col overflow-hidden shrink-0
      `}>
        <ThreadList ... />
      </div>

      {/* Conversation: always visible on desktop, only on mobile when mobileView === "conversation" */}
      <div className={`
        ${isMobile ? (mobileView === "conversation" ? "flex" : "hidden") : "flex"}
        flex-1 flex-col overflow-hidden
      `}>
        {/* Back button on mobile */}
        {isMobile && (
          <button onClick={() => setMobileView("threads")} className="...">
            ← Back
          </button>
        )}
        ...conversation...
      </div>
    </div>
  )
}
```

### Header Bar Mobile — Hide Search
```typescript
// Source: codebase audit of components/header-bar.tsx
// Fix: hide search bar on mobile to prevent cramped header

{/* Center: Search bar — hidden on mobile */}
<div className="hidden sm:flex max-w-xs flex-1 items-center gap-2">
  <div className="relative w-full">
    <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
    <Input ... />
  </div>
</div>
```

### Postinstall Script for Vercel (package.json)
```json
{
  "scripts": {
    "postinstall": "prisma generate",
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  }
}
```

### Table with Overflow Wrapper
```typescript
// Source: codebase audit — recent-activity-table.tsx is missing this
<CardContent>
  <div className="overflow-x-auto">
    <table className="w-full text-sm">
      ...
    </table>
  </div>
</CardContent>
```

---

## Vercel Deployment Steps (Confirmed Sequence)

### Pre-deploy Checklist (local)
1. `npm run build` passes with zero errors and zero warnings
2. `postinstall: "prisma generate"` added to `package.json`
3. All mobile fixes committed to `main` branch

### Vercel Project Setup (one-time, manual)
1. Go to vercel.com → New Project
2. Import from GitHub: `mbeato/anv`
3. Framework auto-detected as Next.js — no overrides needed
4. Add environment variables:
   - `DATABASE_URL` = pooled Neon connection string from local `.env.local`
   - `OPENAI_API_KEY` = OpenAI key from local `.env.local`
5. Set project name to `anvara-prototype-mbeato` (determines subdomain)
6. Deploy

### Post-deploy Verification
1. Visit `https://anvara-prototype-mbeato.vercel.app` — landing page loads
2. Navigate to `/listings` — browse page loads data
3. Navigate to `/ai` — send a test message — AI responds (OpenAI working)
4. Check page source for `<meta name="robots" content="noindex">` — present
5. Check DevTools console — zero errors

### Database: No Migration Needed
The database is already provisioned at Neon with schema applied. The `DATABASE_URL` in `.env.local` points to the existing live database. Vercel will use the same database — no `prisma migrate deploy` or `prisma db push` needed for the deploy.

---

## README Structure (Claude's Discretion)

**Recommended structure** for the founder handoff README:

```markdown
# Anvara Prototype

[1-2 sentence elevator pitch]

## Live Demo
[URL]

## What's Built

### AI Features
- ...

### UX Polish
- ...

### Feature Breadth
- ...

## Tech Stack
[Table]

## Architecture
[Brief description of App Router structure, Server Components, etc.]

## Local Setup
[Step-by-step with all commands]

## .planning/
[Brief note on what the planning directory contains and why it's there]
```

**Tone:** Professional but warm. Written for a founder/stakeholder audience, not engineers. Lead with the value and impressiveness, not the code.

---

## State of the Art

| Old Approach | Current Approach | Impact for This Phase |
|---|---|---|
| `tailwindcss-animate` | `tw-animate-css` (already used) | No change needed — already migrated |
| Page Router metadata | App Router `export const metadata` | Already used — noindex already set |
| `vercel-build` script | `postinstall: prisma generate` | Use postinstall — runs on every `npm install` |
| `@neondatabase/serverless` raw | `@prisma/adapter-neon` | Already set up in `lib/prisma.ts` |

---

## Open Questions

1. **Vercel project name availability**
   - What we know: Target URL is `anvara-prototype-mbeato.vercel.app`
   - What's unclear: Whether the name `anvara-prototype-mbeato` is available on Vercel
   - Recommendation: If unavailable, use `anvara-demo-mbeato` per the phase context alternative

2. **Hero card carousel at 375px**
   - What we know: Cards are `w-[320px]` in a scrollable container with `overflow-hidden`
   - What's unclear: Whether the "Reach X with Anvara" prompt bar overflows at 375px with longest typed text
   - Recommendation: Visual audit at 375px during the mobile pass; fix if overflow detected

3. **AnvaraIntelligence mockup at 375px**
   - What we know: The section uses `flex-col lg:flex-row` so it stacks. Inner mockup elements use `max-w-[260px]`
   - What's unclear: Whether the stacked mockup visuals look intentional vs broken on mobile
   - Recommendation: Visual audit; may need to hide complex mockup visuals on mobile and show simplified version

---

## Sources

### Primary (HIGH confidence)
- Codebase direct inspection (`/Users/vtx/anv`) — all component and page files read directly
- `app/layout.tsx` — noindex already set, confirmed
- `lib/prisma.ts` — DATABASE_URL usage confirmed
- `package.json` — no postinstall script, prisma in devDependencies confirmed
- `hooks/use-mobile.ts` — 768px mobile breakpoint confirmed
- `components/ui/sidebar.tsx` — mobile Sheet behavior confirmed
- `npm run build` output — currently zero errors/warnings confirmed

### Secondary (MEDIUM confidence)
- Neon docs (https://neon.com/docs/guides/prisma) — DATABASE_URL pooled vs DIRECT_URL direct confirmed
- Prisma Vercel docs (https://www.prisma.io/docs/orm/prisma-client/deployment/serverless/deploy-to-vercel) — postinstall script pattern confirmed

### Tertiary (LOW confidence)
- WebSearch: Vercel Next.js Prisma deploy 2025 — postinstall pattern corroborated by multiple sources

---

## Metadata

**Confidence breakdown:**
- Mobile layout issues: HIGH — read source files directly, identified specific lines
- Sidebar mobile behavior: HIGH — read sidebar.tsx and use-mobile hook directly
- Build status: HIGH — ran `npm run build` locally, confirmed clean
- Vercel deployment steps: MEDIUM — standard pattern confirmed by Prisma docs + Vercel docs
- Postinstall requirement: HIGH — confirmed missing from package.json, confirmed required by Prisma docs

**Research date:** 2026-02-23
**Valid until:** 2026-03-23 (stable stack — 30 days)
