---
phase: 01-foundation
plan: 01
subsystem: project-scaffold
tags: [next.js, typescript, tailwind-v4, shadcn, setup]

dependency-graph:
  requires: []
  provides:
    - runnable Next.js 16 App Router project
    - TypeScript strict mode configuration
    - Tailwind v4 CSS-first setup
    - ShadCN UI initialized and ready for component installation
    - Picsum image host configured
  affects:
    - 01-02 (landing page clone builds on this scaffold)
    - 01-03 (data layer adds Prisma to this project)
    - 01-04 (browse page uses ShadCN components installed here)
    - all subsequent phases

tech-stack:
  added:
    - next@16.1.6
    - react@19.2.3
    - react-dom@19.2.3
    - tailwindcss@^4
    - "@tailwindcss/postcss@^4"
    - typescript@^5
    - shadcn@^3.8.5
    - clsx@^2.1.1
    - tailwind-merge@^3.5.0
    - class-variance-authority@^0.7.1
    - lucide-react@^0.575.0
    - radix-ui@^1.4.3
    - tw-animate-css@^1.4.0
  patterns:
    - Next.js App Router (app/ directory, no src/)
    - Tailwind v4 CSS-first imports (@import "tailwindcss")
    - ShadCN new-york style with neutral theme and CSS variables

key-files:
  created:
    - package.json
    - tsconfig.json
    - next.config.ts
    - postcss.config.mjs
    - app/layout.tsx
    - app/page.tsx
    - app/globals.css
    - .gitignore
    - components.json
    - lib/utils.ts
  modified: []

decisions:
  - choice: Scaffold to temp dir then rsync
    reason: create-next-app refuses directories with existing files (.planning, .claude, screenshots)
    impact: All scaffold files copied cleanly; existing planning artifacts preserved

metrics:
  duration: 3 minutes
  completed: 2026-02-21
---

# Phase 1 Plan 1: Next.js Scaffold with Tailwind v4 and ShadCN Summary

**One-liner:** Next.js 16 App Router project with Tailwind v4 CSS-first config, ShadCN neutral theme, and Picsum image host ready for `npx shadcn add` component installation.

## Performance

- Dev server cold start: ~1800ms (Turbopack)
- TypeScript compile: clean, zero errors
- ShadCN init: successful, created components.json + lib/utils.ts

## Accomplishments

1. Scaffolded Next.js 16.1.6 with App Router, TypeScript strict mode, and Turbopack
2. Verified Tailwind v4 CSS-first pattern: `@import "tailwindcss"` in globals.css, `@tailwindcss/postcss` in postcss.config.mjs
3. Added Picsum image host to `next.config.ts` remotePatterns (resolves Phase 1 blocker from STATE.md)
4. Replaced default page.tsx with minimal Anvara placeholder (`<h1>Anvara</h1>`)
5. Initialized ShadCN 3.8.5 with new-york style, neutral base color, CSS variables enabled
6. `lib/utils.ts` created with `cn()` utility (clsx + tailwind-merge)
7. ShadCN CSS design tokens injected into app/globals.css

## Task Commits

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Create Next.js project with Tailwind v4 + Picsum | 128925f | package.json, tsconfig.json, next.config.ts, postcss.config.mjs, app/, .gitignore, public/ |
| 2 | Initialize ShadCN UI | 2aacd27 | components.json, lib/utils.ts, app/globals.css, package.json, package-lock.json |

## Files Created

- `/Users/vtx/anv/package.json` — project dependencies and scripts (name: anv)
- `/Users/vtx/anv/tsconfig.json` — TypeScript strict mode config
- `/Users/vtx/anv/next.config.ts` — Next.js config with Picsum remotePatterns
- `/Users/vtx/anv/postcss.config.mjs` — Tailwind v4 PostCSS plugin config
- `/Users/vtx/anv/app/layout.tsx` — Root layout shell
- `/Users/vtx/anv/app/page.tsx` — Minimal Anvara placeholder home page
- `/Users/vtx/anv/app/globals.css` — Tailwind v4 import + ShadCN CSS variables
- `/Users/vtx/anv/.gitignore` — Includes .env*, node_modules, .next/
- `/Users/vtx/anv/components.json` — ShadCN config (new-york style, neutral, CSS vars)
- `/Users/vtx/anv/lib/utils.ts` — cn() utility function

## Decisions Made

| Decision | Rationale |
|----------|-----------|
| Scaffold to /tmp then rsync to project root | create-next-app refuses directories with existing files; rsync preserves existing .planning and .claude artifacts |
| ShadCN new-york style, neutral color | Default shadcn init selection; appropriate neutral base for a B2B sponsorship marketplace |
| Kept .gitignore `.env*` pattern | Covers .env.local and all env variants; more secure than just .env.local |

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] create-next-app refused existing directory**

- **Found during:** Task 1
- **Issue:** `create-next-app` exits with error when target directory contains `.claude/`, `.planning/`, `screenshots/`
- **Fix:** Scaffolded to `/tmp/anv-scaffold`, then `rsync`'d all files to project root excluding `.git`
- **Files modified:** All scaffold files
- **Commit:** 128925f

## Issues

None — both tasks completed cleanly, all verification checks passed.

## Next Phase Readiness

- [x] `npm run dev` starts on localhost:3000
- [x] TypeScript strict mode enabled, zero compile errors
- [x] Tailwind v4 CSS-first pattern in place
- [x] ShadCN ready for `npx shadcn add [component]`
- [x] Picsum configured in remotePatterns
- [x] Phase 1 blocker resolved: image host picked and configured

Ready for 01-02 (landing page clone) and 01-03 (Prisma + Postgres data layer).

## Self-Check: PASSED
