---
phase: 01-foundation
plan: 02
subsystem: database
tags: [prisma, neon, postgres, prisma-v7, neon-adapter, serverless]

# Dependency graph
requires:
  - phase: 01-01
    provides: Next.js 16 scaffold with TypeScript, Tailwind v4, ShadCN — project structure this plan adds files into
provides:
  - Prisma schema with Property, Package, Thread, Message, Offer models
  - prisma.config.ts wiring Prisma v7 to Neon via DIRECT_URL
  - lib/prisma.ts singleton using PrismaNeon adapter and DATABASE_URL
  - prisma/generated/ Prisma client and types (generated, not committed)
  - Tables created in Neon Postgres via db push
affects:
  - 01-03 (seed script imports lib/prisma.ts and uses schema models)
  - 01-04 (query helpers import lib/prisma.ts)
  - Phase 3 (property detail queries against these models)
  - Phase 4 (browse queries against Property and Package)
  - Phase 5 (messaging queries against Thread, Message, Offer)

# Tech tracking
tech-stack:
  added:
    - prisma@7.4.1
    - "@prisma/client"
    - "@prisma/adapter-neon"
    - "@neondatabase/serverless"
    - dotenv
    - tsx (dev dependency for seed script)
    - Neon Postgres (external service)
  patterns:
    - Prisma v7 config-file pattern (prisma.config.ts, no url in datasource block)
    - PrismaNeon adapter singleton via globalThis (dev hot-reload safe)
    - DIRECT_URL for migrations/push, DATABASE_URL (pooled) for runtime queries

key-files:
  created:
    - prisma/schema.prisma
    - prisma.config.ts
    - lib/prisma.ts
    - .env.local
  modified:
    - package.json (added prisma, @prisma/client, @prisma/adapter-neon, @neondatabase/serverless, dotenv, tsx)
    - .gitignore (added prisma/generated)

key-decisions:
  - "Prisma v7 config-file pattern: datasource block has no url field; URL is in prisma.config.ts via env()"
  - "DIRECT_URL for prisma.config.ts (migrations/push), DATABASE_URL (pooled) for lib/prisma.ts runtime"
  - "prisma/generated committed to .gitignore — generated artifacts, not source"
  - "PrismaNeon adapter over standard PrismaClient — required for Neon serverless HTTP driver compatibility"

patterns-established:
  - "Prisma v7 pattern: schema in prisma/schema.prisma, config in prisma.config.ts at root, output in prisma/generated"
  - "Singleton via globalThis.prisma guard prevents multiple client instances during Next.js dev HMR"
  - "dotenv/config import at top of prisma.ts and prisma.config.ts for local .env.local loading"

# Metrics
duration: 5min
completed: 2026-02-21
---

# Phase 1 Plan 02: Prisma Schema and Neon Setup Summary

**Prisma v7 schema with Property, Package, Thread, Message, and Offer models wired to Neon Postgres via PrismaNeon adapter singleton — tables created and verified with db push**

## Performance

- **Duration:** ~5 min (including user Neon provisioning checkpoint)
- **Started:** 2026-02-21T05:53:01Z
- **Completed:** 2026-02-21T05:58:01Z
- **Tasks:** 3 (2 auto + 1 human-action checkpoint)
- **Files modified:** 6

## Accomplishments

- Defined 5-model Prisma schema: Property (12 fields), Package, Thread, Message, Offer — all with cascade deletes and proper relations
- Configured Prisma v7 config-file pattern (prisma.config.ts) using Neon datasource with DIRECT_URL for push/migrations
- Created PrismaNeon adapter singleton in lib/prisma.ts with globalThis guard for Next.js dev HMR safety
- Tables created in Neon Postgres (ep-dry-union-ainef6sq) via `npx prisma db push` — schema in sync confirmed
- Dev server starts clean (200 OK) with no regressions after adding Prisma dependencies

## Task Commits

Each task was committed atomically:

1. **Task 1: Install Prisma deps, create schema + config, generate client** - `28ac87c` (feat)
2. **Task 2: Create Prisma Client singleton with Neon adapter** - `8005dd2` (feat)
3. **Task 3: User sets up Neon database** - checkpoint (human-action — no commit; user provisioned Neon and ran db push)

**Plan metadata:** _(this commit)_ (docs: complete plan)

## Files Created/Modified

- `prisma/schema.prisma` - Defines Property, Package, Thread, Message, Offer models with relations and cascade deletes
- `prisma.config.ts` - Prisma v7 config file: schema path, migrations path, seed command, Neon datasource via DIRECT_URL
- `lib/prisma.ts` - PrismaNeon adapter singleton using DATABASE_URL (pooled), globalThis HMR guard
- `.env.local` - DATABASE_URL (pooled) and DIRECT_URL (direct) for Neon connection — not committed
- `package.json` - Added prisma, @prisma/client, @prisma/adapter-neon, @neondatabase/serverless, dotenv, tsx
- `.gitignore` - Added `prisma/generated` (generated artifacts excluded from repo)
- `prisma/generated/` - Generated Prisma client and types (created by `npx prisma generate`, gitignored)

## Decisions Made

- **Prisma v7 config-file pattern:** datasource block in schema.prisma has NO `url` field — the URL is sourced entirely from `prisma.config.ts` via `env("DIRECT_URL")`. This is the Prisma v7 recommended pattern for config-driven datasource.
- **DIRECT_URL vs DATABASE_URL split:** `prisma.config.ts` uses DIRECT_URL (non-pooled) because `db push` and migrations require a direct connection; `lib/prisma.ts` uses DATABASE_URL (pooled Neon connection) for runtime query efficiency.
- **PrismaNeon adapter required:** Standard `@prisma/client` alone won't work with Neon's serverless HTTP driver in edge/serverless contexts. The `@prisma/adapter-neon` adapter is the correct approach for Neon + Next.js.
- **prisma/generated gitignored:** Generated client code is not source and should not be committed. `prisma generate` is fast and runs automatically on install.

## Deviations from Plan

None — plan executed exactly as written. Task 3 was a planned human-action checkpoint; user provisioned Neon successfully and `npx prisma db push` confirmed tables in sync.

## Issues Encountered

None. `npx prisma generate` and `npx prisma db push` both succeeded after user provided Neon credentials. Dev server started without errors.

## User Setup Required

The user completed the following external service configuration as part of Task 3 (planned checkpoint):

- Created a Neon project (free tier) at neon.com
- Copied pooled connection string → `DATABASE_URL` in `.env.local`
- Copied direct connection string → `DIRECT_URL` in `.env.local`
- Ran `npx prisma generate` (created prisma/generated/)
- Ran `npx prisma db push` (created tables in Neon — confirmed "already in sync" on second run)

## Next Phase Readiness

- Data layer is complete: schema defined, tables created, singleton ready
- 01-03 (seed script) can import `lib/prisma.ts` and use all 5 models immediately
- 01-04 (query helpers) builds directly on top of this
- Blocker from STATE.md: "Reconcile Property type definition between STACK.md and ARCHITECTURE.md" — the schema.prisma definition (with `availability: string` field included) should be used as the canonical source for all TypeScript types going forward

---
*Phase: 01-foundation*
*Completed: 2026-02-21*

## Self-Check: PASSED
