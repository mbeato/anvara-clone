---
phase: 02-layout-shell
plan: 02
subsystem: ui
tags: [nextjs, shadcn, header, breadcrumb, footer, dark-mode, avatar, notifications, next-themes, tailwind]

# Dependency graph
requires:
  - phase: 02-01
    provides: ThemeProvider, ModeToggle, AppSidebar, SidebarProvider, app/(app) route group

provides:
  - HeaderBar component with dynamic breadcrumb, search, notifications, mode toggle, demo user
  - SiteFooter component with attribution and tech stack
  - Integrated shell layout (sidebar + header + content + footer)
  - next.config.ts image hostnames for picsum.photos and anvara.com domains

affects:
  - 03-browse-page
  - 04-property-detail
  - all future (app) pages (inherit header + footer automatically)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Dynamic breadcrumb from usePathname with segment label map
    - Notification badge using absolute-positioned span over icon button
    - Footer inside SidebarInset to scroll with content (not sticky)
    - Avatar with remote image + fallback initials pattern

key-files:
  created:
    - components/header-bar.tsx
    - components/site-footer.tsx
  modified:
    - app/(app)/layout.tsx
    - next.config.ts

key-decisions:
  - "Breadcrumb reads usePathname() client-side, maps segments to human labels via SEGMENT_LABELS lookup"
  - "Search bar is visual-only (no filtering) for Phase 2 — functional search deferred"
  - "Notification badge uses bg-destructive with absolute positioning over Bell icon"
  - "Demo user avatar from picsum.photos/seed/demo-user, fallback initials 'DA'"
  - "Footer inside SidebarInset (not outside) so it scrolls with content, not stuck below sidebar"
  - "Three anvara.com remotePatterns added: images.anvara.com, www.anvara.com, anvara.com"

patterns-established:
  - "Client Component header: usePathname for breadcrumb, all interactivity client-side"
  - "Shell layout order: SidebarTrigger > HeaderBar > main > SiteFooter inside SidebarInset"
  - "Avatar pattern: AvatarImage src + AvatarFallback initials for graceful image failure"

# Metrics
duration: 2min
completed: 2026-02-21
---

# Phase 2 Plan 02: Header Bar and Footer Shell Summary

**HeaderBar with dynamic breadcrumb, notification badge, ModeToggle, and demo user avatar — plus attribution footer — fully wired into the app shell layout**

## Performance

- **Duration:** 2 min
- **Started:** 2026-02-21T07:12:27Z
- **Completed:** 2026-02-21T07:13:46Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments
- HeaderBar client component with pathname-driven breadcrumb, centered search, bell+badge, ModeToggle, and Demo Advertiser avatar
- SiteFooter with "Prototype by Max Beato" attribution, Next.js/Prisma/Vercel tech stack, LinkedIn + GitHub links
- Shell layout updated: HeaderBar above main, SiteFooter below main, both inside SidebarInset
- next.config.ts image hostnames extended to cover picsum.photos and all anvara.com variants

## Task Commits

Each task was committed atomically:

1. **Task 1: Build header bar component** - `48459c1` (feat)
2. **Task 2: Build footer, wire header+footer into shell layout, configure image hostnames** - `1fe9754` (feat)

**Plan metadata:** _(docs commit follows)_

## Files Created/Modified
- `components/header-bar.tsx` - Client Component: breadcrumb, search, notifications, ModeToggle, user avatar
- `components/site-footer.tsx` - Attribution footer with tech stack and social links
- `app/(app)/layout.tsx` - Updated shell: HeaderBar + main + SiteFooter inside SidebarInset
- `next.config.ts` - Added remotePatterns for images.anvara.com, www.anvara.com, anvara.com

## Decisions Made
- Breadcrumb segment labels use a lookup map (SEGMENT_LABELS); unmapped segments get title-case fallback
- Search input is visual-only for Phase 2 — no filtering logic attached yet
- Notification badge (number "3") is purely decorative/static
- Footer is non-sticky: lives inside SidebarInset, scrolls with page content
- LinkedIn/GitHub links use placeholder username `maxbeato` — update when real URLs are known

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- Complete layout shell now in place: every (app) page renders with sidebar, header, and footer
- Breadcrumb auto-updates based on route — ready for Phase 3 browse/detail pages
- Dark mode toggle end-to-end functional; no hydration flash
- Image hostnames configured for Phase 3+ property images from Anvara domains

---
*Phase: 02-layout-shell*
*Completed: 2026-02-21*

## Self-Check: PASSED
