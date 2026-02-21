---
phase: 01-foundation
plan: 03
subsystem: database
tags: [prisma, seed, neon, postgres, sponsorship, marketplace-data]

# Dependency graph
requires:
  - phase: 01-02
    provides: Prisma schema with Property, Package, Thread, Message, Offer models, PrismaNeon adapter singleton, tables in Neon Postgres

provides:
  - prisma/seed.ts — comprehensive seed populating 12 properties, 31 packages, 5 threads, 14 messages, 2 offers
  - Realistic Anvara-inspired marketplace data spanning 5 property categories and 5 US regions
  - Idempotent seed (deleteMany before creates) suitable for CI/dev resets

affects:
  - 01-04 (query helpers will target these seeded models/data)
  - Phase 3 (property detail pages render data from this seed)
  - Phase 4 (browse page filters across the seeded categories, regions, price tiers)
  - Phase 5 (messaging inbox shows the seeded threads/conversations)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Seed uses DIRECT_URL (not DATABASE_URL) — CLI operations need direct non-pooled connection"
    - "Seed uses config({ path: '.env.local' }) — consistent with dotenv pattern from 01-02"
    - "Import from ./generated/client.js (relative from prisma/) — Prisma v7 generated output location"
    - "deleteMany in reverse FK order before creates ensures full idempotency"

key-files:
  created:
    - prisma/seed.ts
  modified: []

key-decisions:
  - "DIRECT_URL over DATABASE_URL for seed script — seed runs as CLI tool, needs direct (non-pooled) Neon connection"
  - "12 properties chosen over minimum 10 — covers all 5 categories (sports, music, arts, food, lifestyle) with adequate depth"
  - "2 pending offers created — one on X Games (simple negotiation) and one on Coachella (complex structured proposal)"
  - "Picsum seeds use property slug for uniqueness and reproducibility (same image on each run)"

patterns-established:
  - "Seed file imports from ./generated/client.js with .js extension — required for ESM resolution in Prisma v7"
  - "Idempotent seed pattern: deleteMany all tables (reverse FK order) then recreate — safe to run any number of times"
  - "isAI: true on all property-side messages — property responses are AI-generated in production"

# Metrics
duration: 4min
completed: 2026-02-21
---

# Phase 1 Plan 03: Database Seed Script Summary

**12 sponsorship properties with 31 packages, 5 threaded conversations, and 2 pending offers — Anvara-inspired marketplace data across sports, music, arts, food, and lifestyle with full idempotency**

## Performance

- **Duration:** ~4 min
- **Started:** 2026-02-21T06:01:03Z
- **Completed:** 2026-02-21T06:05:14Z
- **Tasks:** 1
- **Files modified:** 1

## Accomplishments

- Created `prisma/seed.ts` with 943 lines of realistic sponsorship marketplace data
- 12 properties across 5 categories and 5 US regions: LAFC, NY Jets, Miami Open, Austin FC (sports); Coachella, Rolling Loud, Jazz at Lincoln Center (music); Art Basel Miami, Tribeca Film Festival (arts); NYC Wine & Food Festival, Taste of Chicago (food); X Games Aspen (lifestyle)
- 31 packages with tiered pricing from $12,000 to $500,000 — no $0 prices, each tier 2–5x step-up
- 5 conversation threads with 14 realistic brand-to-property messages covering negotiation, inquiry, and activation details
- 2 offers with detailed terms: X Games Fan Zone ($33K, early-commitment discount) and Coachella Experiential ($550K, enhanced footprint)
- Full idempotency confirmed: running twice produces identical record counts (deleteMany in reverse FK order before all creates)
- All images use Picsum with property slug as seed (`https://picsum.photos/seed/{slug}/800/600`) for reproducibility

## Task Commits

Each task was committed atomically:

1. **Task 1: Create seed script with diverse sponsorship properties** - `13b22db` (feat)

**Plan metadata:** _(this commit)_

## Files Created/Modified

- `prisma/seed.ts` - 943-line seed covering all 5 schema models with realistic Anvara-inspired marketplace data, idempotent deleteMany pattern, DIRECT_URL connection

## Decisions Made

- **DIRECT_URL over DATABASE_URL:** Seed script runs as a CLI operation outside Next.js runtime, so it needs the direct (non-pooled) Neon connection string — consistent with how `prisma.config.ts` uses it for `db push`.
- **12 properties over minimum 10:** Adding 2 extra properties (Tribeca and Taste of Chicago) gives better category depth, particularly for the arts and food categories which would otherwise feel thin.
- **2 pending offers:** Both are on high-value properties (Coachella at $550K, X Games at $33K) — gives inbox demo data at opposite ends of the deal size spectrum.
- **isAI: true on property messages:** All property-side responses mark `isAI: true` to match the production intent where an o3-mini model responds on behalf of properties.

## Deviations from Plan

None — plan executed exactly as written.

## Issues Encountered

The verification command in the plan (`npx tsx -e "..."`) failed because inline `-e` evaluation with tsx doesn't support top-level await in ESM format. Created a temporary `prisma/verify-seed.ts` file, ran it via `npx tsx prisma/verify-seed.ts`, confirmed counts, then deleted the file. This was a verification tooling issue only — the seed script itself ran perfectly on first attempt.

## User Setup Required

None — no external service configuration required. Seed runs against the existing Neon database configured in 01-02.

## Next Phase Readiness

- Database fully populated: 12 properties, 31 packages, 5 threads, 14 messages, 2 offers
- 01-04 (query helpers) can now write and test real queries against live data
- Browse page will show 12 real listings across 5 filterable categories
- Detail page will render realistic package tiers with accurate pricing
- Messaging inbox will show 5 active conversations with realistic negotiation content
- No blockers for 01-04

---
*Phase: 01-foundation*
*Completed: 2026-02-21*

## Self-Check: PASSED
