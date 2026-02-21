# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-02-21)

**Core value:** An advertiser can browse sponsorship properties, discover relevant opportunities, understand pricing, and initiate deal conversations — with a UX that feels better than the current Anvara site
**Current focus:** Phase 1 — Foundation

## Current Position

Phase: 1 of 7 (Foundation)
Plan: 3 of 4 in current phase
Status: In progress
Last activity: 2026-02-21 — Completed 01-03-PLAN.md (Database seed with 12 properties and realistic marketplace data)

Progress: [███░░░░░░░] 11% (3/28 plans)

## Performance Metrics

**Velocity:**
- Total plans completed: 3
- Average duration: 4 minutes
- Total execution time: ~0.2 hours

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| Phase 1 (Foundation) | 3/4 | 12 min | 4 min |

**Recent Trend:**
- Last 5 plans: 01-01 (3 min), 01-02 (5 min), 01-03 (4 min)
- Trend: Stable

*Updated after each plan completion*

## Accumulated Context

### Decisions

Decisions are logged in PROJECT.md Key Decisions table.
Recent decisions affecting current work:

- [Init]: Add Prisma + Postgres — real data layer shows engineering depth
- [Init]: Advertiser-only perspective — AI plays property side in messaging via o3-mini
- [Init]: Full landing page clone — faithful to Anvara content/messaging
- [Init]: Creative liberties on browse/detail — the value-add pages where UX improvements shine
- [01-01]: Scaffold to /tmp then rsync — create-next-app refuses directories with existing files
- [01-01]: ShadCN new-york style, neutral color — appropriate neutral base for B2B sponsorship marketplace
- [01-02]: Prisma v7 config-file pattern — datasource has no url field; URL lives in prisma.config.ts
- [01-02]: DIRECT_URL for prisma.config.ts (push/migrations), DATABASE_URL (pooled) for lib/prisma.ts runtime
- [01-02]: PrismaNeon adapter required — standard PrismaClient alone incompatible with Neon serverless HTTP driver
- [01-02]: prisma/generated gitignored — generated artifacts not committed; prisma generate runs on install
- [01-03]: DIRECT_URL in seed script (not DATABASE_URL) — seed runs as CLI operation, needs direct non-pooled connection
- [01-03]: isAI: true on all property-side seed messages — matches production intent where AI responds on behalf of properties
- [01-03]: 12 properties seeded (not minimum 10) — covers all 5 categories with adequate depth for demo

### Pending Todos

None.

### Blockers/Concerns

- [Phase 1]: **RESOLVED** — Reconcile Property type definition: schema.prisma is now canonical source (includes `availability: String` field)
- [Phase 1]: **RESOLVED** — Pick one image host (Picsum recommended) before writing seed data — added to `next.config.ts` `remotePatterns` in 01-01
- [Phase 3]: Next.js 15+ dynamic route `params` is a Promise — must `await params` before accessing `id`; add `generateStaticParams`

## Session Continuity

Last session: 2026-02-21 06:05 UTC
Stopped at: Completed 01-03-PLAN.md — Database seed with 12 properties, 31 packages, 5 threads, 14 messages, 2 offers
Resume file: None
