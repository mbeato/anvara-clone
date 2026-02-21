# Phase 1: Foundation - Research

**Researched:** 2026-02-21
**Domain:** Next.js 16 project init, Prisma v7 + Neon Postgres, seed scripts, next/font, metadata/favicon
**Confidence:** HIGH

---

## Summary

Phase 1 establishes the project's runnable skeleton: Next.js scaffolded, Prisma schema defined, Neon Postgres connected, seed data loaded, and TypeScript query helpers ready. This research covers all four plans (01-01 through 01-04) in depth.

The single most important finding: **Vercel Postgres was discontinued in December 2024 and migrated to Neon.** The requirement `DATA-04: Vercel Postgres configured for deployment` maps directly to Neon via the Vercel Marketplace — it's the same underlying service, just provisioned differently. This changes no project behavior but changes the setup steps.

The second critical finding: **Prisma v7.4.1 (current) has breaking changes from v6.** The `prisma-client-js` provider is deprecated in favor of `prisma-client`. Database URL configuration moves from `schema.prisma` into `prisma.config.ts`. Driver adapters are required (not optional). Seed configuration also moves to `prisma.config.ts`. Code examples that assume v5/v6 patterns will not work.

The standard approach for this phase is: `create-next-app` → `shadcn init` → `prisma init` → define schema → configure Neon connection via `prisma.config.ts` → write seed → write query helpers → set metadata and favicon in App Router.

**Primary recommendation:** Follow Prisma v7 patterns exactly. Do not mix v6 patterns (old `prisma-client-js` generator, `url` in datasource block, `"prisma": { "seed": ... }` in `package.json`) — they either produce deprecation warnings or fail outright at `v7.4.1`.

---

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `next` | `16.1.6` | App framework | Required by project constraints |
| `react` + `react-dom` | `19.2.4` | UI runtime | Required by Next.js 16 |
| `typescript` | `5.9.3` | Type safety | Required by project constraints |
| `tailwindcss` | `4.2.0` | CSS utilities | Required by project constraints; v4 is CSS-first (no `tailwind.config.ts`) |
| `@tailwindcss/postcss` | `4.2.0` | Tailwind v4 Next.js integration | Required; replaces old postcss-tailwind plugin |
| `prisma` | `7.4.1` | ORM CLI + migrations | Required by project constraints (DATA-01 through DATA-04) |
| `@prisma/client` | `7.4.1` | Prisma runtime client | Required alongside `prisma` |
| `@prisma/adapter-neon` | `7.4.1` | Prisma v7 requires a driver adapter; Neon adapter for serverless | Required in Prisma v7 — no adapter = PrismaClient throws |
| `@neondatabase/serverless` | `1.0.2` | Neon's serverless Postgres driver (peer dep of adapter-neon) | Required by `@prisma/adapter-neon` |
| `dotenv` | (any) | Load `.env` in seed script and `prisma.config.ts` | Required — Prisma v7 does NOT auto-load `.env` |
| `tsx` | (latest dev) | TypeScript runner for seed script | Required for `npx prisma db seed` with TypeScript |
| `shadcn` CLI | `3.8.5` | Component scaffolding (init + add) | Required by project constraints; use `shadcn`, not deprecated `shadcn-ui` |
| `lucide-react` | `0.575.0` | Icons (default shadcn dependency) | Installed automatically by shadcn |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `@types/react` | `19.2.14` | React 19 TypeScript types | Required dev dep; must be `^19` (React 19 changed children prop) |
| `@types/node` | `25.3.0` | Node TypeScript types | Required for Next.js server-side TypeScript |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| `@prisma/adapter-neon` | `@prisma/adapter-pg` | `adapter-pg` works for standard Postgres; `adapter-neon` is optimized for Neon's serverless connection pooling. Both are v7.4.1. Use `adapter-neon` since the database is Neon. |
| Neon via Vercel Marketplace | Neon direct (neon.com dashboard) | Both provision the same Neon database. Vercel Marketplace injects env vars automatically into Vercel project settings, which saves one manual step at deploy time. |
| `prisma.config.ts` seed path | `package.json` `"prisma": { "seed": ... }` | In Prisma v7, the official docs show `prisma.config.ts` as the primary approach. The `package.json` approach may still work (it was the v6 standard) but is not documented for v7. Use `prisma.config.ts` to be safe. |

**Installation:**
```bash
# Prisma
npm install prisma @prisma/client @prisma/adapter-neon @neondatabase/serverless dotenv
npm install -D tsx

# shadcn init happens via CLI (copies files, does not add npm deps beyond what it needs)
npx shadcn@latest init
```

---

## Architecture Patterns

### Recommended Project Structure

```
anv/
├── app/
│   ├── layout.tsx           # Root layout: metadata, fonts, html/body shell
│   └── page.tsx             # Placeholder page (minimal for Phase 1)
├── lib/
│   ├── prisma.ts            # Prisma Client singleton (global pattern)
│   └── data/
│       ├── types.ts         # TypeScript interfaces (Property, Thread, Message, Offer)
│       └── index.ts         # Query helpers: getProperty, getAllProperties, getThreads
├── prisma/
│   ├── schema.prisma        # Prisma data models
│   ├── seed.ts              # Seed script (run via npx prisma db seed)
│   └── generated/           # Prisma-generated client (output of prisma generate)
├── public/
│   └── favicon.ico          # Placed in public/ OR as app/favicon.ico (App Router convention)
├── prisma.config.ts         # Prisma v7 config: datasource url, seed command
├── .env.local               # DATABASE_URL (pooled), DIRECT_URL (direct)
├── components.json          # shadcn configuration
├── next.config.ts           # image remotePatterns (Picsum), etc.
└── tsconfig.json
```

**Key structure decisions:**
- `prisma/generated/` is the Prisma v7 output path (specified in generator `output` field). Import from here, not from `@prisma/client` directly.
- `lib/prisma.ts` is the singleton file — import `prisma` from here throughout the app.
- `lib/data/` holds TypeScript query helper wrappers over Prisma Client calls. These are the helpers the success criteria test: `getProperty(id)`, `getAllProperties()`, `getThreads()`.
- `app/favicon.ico` placed in `/app` root — Next.js App Router auto-detects this convention and injects the correct `<link rel="icon">` without any `metadata.icons` config needed.

### Pattern 1: Prisma v7 Schema Configuration

**What:** Prisma v7 moved database URL out of `schema.prisma` and into `prisma.config.ts`. The generator provider changed from `prisma-client-js` to `prisma-client`. An explicit `output` path is required.

**When to use:** Always — this is the v7 standard. Do not use the v6 pattern.

**Example:**
```prisma
// prisma/schema.prisma
// Source: Prisma v7 official docs (prisma.io/docs/ai/prompts/prisma-7)

generator client {
  provider = "prisma-client"
  output   = "./generated"
}

datasource db {
  provider = "postgresql"
  // No url here in v7 — moved to prisma.config.ts
}

model Property {
  id              String    @id @default(cuid())
  slug            String    @unique
  name            String
  tagline         String
  category        String
  subcategory     String?
  location        String
  region          String
  imageUrl        String
  description     String
  audienceTotalReach Int
  audienceAgeRange   String
  audienceGender     String
  audienceIncome     String
  priceFrom       Int
  availability    String
  featured        Boolean   @default(false)
  tags            String[]
  createdAt       DateTime  @default(now())
  packages        Package[]
  threads         Thread[]
}

model Package {
  id           String   @id @default(cuid())
  name         String
  priceUsd     Int
  inclusions   String[]
  maxSponsors  Int
  property     Property @relation(fields: [propertyId], references: [id], onDelete: Cascade)
  propertyId   String
}

model Thread {
  id         String    @id @default(cuid())
  subject    String
  createdAt  DateTime  @default(now())
  property   Property  @relation(fields: [propertyId], references: [id], onDelete: Cascade)
  propertyId String
  messages   Message[]
  offers     Offer[]
}

model Message {
  id        String   @id @default(cuid())
  content   String
  sender    String   // "advertiser" | "property"
  isAI      Boolean  @default(false)
  createdAt DateTime @default(now())
  thread    Thread   @relation(fields: [threadId], references: [id], onDelete: Cascade)
  threadId  String
}

model Offer {
  id         String   @id @default(cuid())
  amount     Int
  terms      String
  status     String   @default("pending") // "pending" | "accepted" | "declined"
  createdAt  DateTime @default(now())
  thread     Thread   @relation(fields: [threadId], references: [id], onDelete: Cascade)
  threadId   String
}
```

### Pattern 2: Prisma v7 Config File

**What:** `prisma.config.ts` replaces the `url` in `schema.prisma` and the `"prisma": { "seed": ... }` in `package.json`.

**When to use:** Required for Prisma v7.

```typescript
// prisma.config.ts (project root)
// Source: Prisma v7 docs + Neon guide (neon.com/docs/guides/prisma)

import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    url: env("DIRECT_URL"),  // Direct (non-pooled) URL for CLI operations
  },
});
```

**Why `DIRECT_URL` in prisma.config.ts:** Prisma CLI operations (migrate, generate, db seed) need a direct connection to bypass Neon's connection pooler. The application runtime uses the pooled `DATABASE_URL`.

### Pattern 3: Prisma Client Singleton (Next.js)

**What:** Prevent multiple Prisma Client instances during Next.js hot reloading in development. Required for Prisma v7 with Neon adapter.

**When to use:** Always — in any Next.js + Prisma project.

```typescript
// lib/prisma.ts
// Source: Prisma docs (prisma.io/docs/orm/prisma-client/setup-and-configuration/instantiation)
//         Neon docs (neon.com/docs/guides/prisma)

import "dotenv/config";
import { PrismaClient } from "../prisma/generated/client.js";
import { PrismaNeon } from "@prisma/adapter-neon";

const prismaClientSingleton = () => {
  const adapter = new PrismaNeon({
    connectionString: process.env.DATABASE_URL!,
  });
  return new PrismaClient({ adapter });
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;
```

**Note on import path:** With Prisma v7's `output = "./generated"` in schema.prisma, the generated client is at `prisma/generated/`. The import path from `lib/prisma.ts` is `../prisma/generated/client.js`. The `.js` extension is required because Prisma v7 generates ESM-compatible output.

### Pattern 4: Query Helpers

**What:** Typed wrapper functions over Prisma Client — what the success criteria tests.

**When to use:** Phase 1 only needs basic implementations. Filtering helpers (filterProperties) can be TypeScript-side (not database-side) for simplicity in Phase 1 since all properties fit in memory.

```typescript
// lib/data/index.ts

import prisma from "../prisma";

export async function getProperty(id: string) {
  return prisma.property.findUnique({
    where: { id },
    include: { packages: true },
  });
}

export async function getAllProperties() {
  return prisma.property.findMany({
    include: { packages: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function getThreads() {
  return prisma.thread.findMany({
    include: {
      messages: { orderBy: { createdAt: "asc" } },
      property: true,
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function filterProperties(filters: {
  category?: string;
  region?: string;
  minPrice?: number;
  maxPrice?: number;
}) {
  return prisma.property.findMany({
    where: {
      ...(filters.category && { category: filters.category }),
      ...(filters.region && { region: filters.region }),
      ...(filters.minPrice && { priceFrom: { gte: filters.minPrice } }),
      ...(filters.maxPrice && { priceFrom: { lte: filters.maxPrice } }),
    },
    include: { packages: true },
  });
}
```

### Pattern 5: Seed Script

**What:** `prisma/seed.ts` populates the database with realistic data. Run via `npx prisma db seed`.

**When to use:** Run once after `prisma migrate dev`. In Prisma v7, NOT run automatically during migrations.

```typescript
// prisma/seed.ts
// Source: Prisma seeding docs (prisma.io/docs/orm/prisma-migrate/workflows/seeding)

import "dotenv/config";
import { PrismaClient } from "./generated/client.js";
import { PrismaNeon } from "@prisma/adapter-neon";

const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL!,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  // Clear existing data (idempotent re-run)
  await prisma.message.deleteMany();
  await prisma.offer.deleteMany();
  await prisma.thread.deleteMany();
  await prisma.package.deleteMany();
  await prisma.property.deleteMany();

  // Create properties with packages
  const lafc = await prisma.property.create({
    data: {
      slug: "lafc-sponsorship",
      name: "LAFC — Los Angeles Football Club",
      tagline: "Premium MLS sponsorship in the fastest-growing soccer market",
      category: "sports",
      subcategory: "soccer",
      location: "Los Angeles, CA",
      region: "west",
      imageUrl: "https://picsum.photos/seed/lafc/800/600",
      description: "BMO Stadium hosts 22,000 fans per match...",
      audienceTotalReach: 1200000,
      audienceAgeRange: "18-44",
      audienceGender: "mixed",
      audienceIncome: "premium",
      priceFrom: 75000,
      availability: "Available Q3 2026",
      featured: true,
      tags: ["soccer", "mls", "los-angeles", "stadium", "live-events"],
      packages: {
        create: [
          {
            name: "Official Sponsor",
            priceUsd: 250000,
            inclusions: ["Kit sleeve badge", "Stadium naming rights rotation", "30-sec broadcast spots (20x)", "VIP suite (all home games)"],
            maxSponsors: 1,
          },
          {
            name: "Gold",
            priceUsd: 75000,
            inclusions: ["Pitch-side LED signage", "Digital scoreboard rotation", "8 season tickets"],
            maxSponsors: 4,
          },
        ],
      },
    },
  });

  // ... additional 10-14 properties covering diverse categories, regions, price tiers

  // Seed pre-seeded conversation threads
  await prisma.thread.create({
    data: {
      subject: "Interest in Gold Sponsorship Package",
      propertyId: lafc.id,
      messages: {
        create: [
          {
            content: "Hi, I'm representing Kalshi and we're very interested in your Gold sponsorship package. Can you tell us more about the activation options?",
            sender: "advertiser",
            isAI: false,
          },
          {
            content: "Thanks for reaching out! The Gold package includes pitch-side LED signage visible during all broadcast moments, plus digital scoreboard rotation during halftime. We can also discuss custom activation ideas — many sponsors do fan zone experiences.",
            sender: "property",
            isAI: true,
          },
        ],
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("Seed complete");
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
```

### Pattern 6: next/font + Metadata (layout.tsx)

**What:** Prevent FOUT by loading fonts via `next/font/google`. Set custom title and favicon via metadata export. Favicon via file convention (preferred over metadata.icons).

**When to use:** Phase 1 plan 01-04.

```typescript
// app/layout.tsx
// Source: Next.js 16.1.6 official docs
//   - https://nextjs.org/docs/app/building-your-application/optimizing/fonts
//   - https://nextjs.org/docs/app/api-reference/functions/generate-metadata

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",  // Prevents invisible text during font load
});

export const metadata: Metadata = {
  title: "Anvara | Sponsorship Marketplace",
  description: "Connect your brand with premium sponsorship opportunities — sports, music, arts, and more.",
  robots: {
    index: false,       // noindex — unlisted demo
    follow: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}
```

**Favicon:** Place `favicon.ico` at `app/favicon.ico`. Next.js App Router auto-detects this file and injects `<link rel="icon" href="/favicon.ico" sizes="any" />` without any additional metadata configuration. This is the recommended approach over `metadata.icons`.

### Anti-Patterns to Avoid

- **Using `prisma-client-js` generator:** Deprecated in v7. Always use `provider = "prisma-client"`.
- **Putting `url` in schema.prisma datasource block:** Moved to `prisma.config.ts` in v7. Putting it in the schema block either does nothing or conflicts.
- **Using `@prisma/client` import path directly:** In v7 with custom output, import from the output path (e.g., `../prisma/generated/client.js`), not from `@prisma/client`.
- **Skipping the adapter:** Prisma v7 requires a driver adapter. `new PrismaClient()` without an adapter throws an error.
- **Using `"prisma": { "seed": ... }` in package.json for v7:** The `prisma.config.ts` `migrations.seed` field is the v7 approach.
- **Using `next/font` with a `<link>` tag:** The whole point of `next/font` is to replace external `<link>` tag loading. Using both is redundant and still causes FOUT.
- **Importing Google Fonts via `<link>` in `layout.tsx` head:** Causes FOUT (UX-07 explicitly prohibits this).
- **Using `public/favicon.ico` without also having `app/favicon.ico`:** The Next.js App Router convention looks for `app/favicon.ico` first. If it exists there, it takes precedence. Place it in `app/`.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Prisma Client multi-instance in dev | Your own caching layer | `globalThis` singleton pattern | Next.js hot reloading creates multiple module instances; this is a solved problem with a 10-line pattern |
| Database migrations | Manual SQL files | `npx prisma migrate dev` | Prisma handles migration diffs, rollback tracking, and schema sync automatically |
| TypeScript types for DB models | Manual interfaces | Prisma-generated types from `prisma/generated/` | Types are auto-generated from the schema and always in sync |
| FOUT prevention | CSS font-face with font-display | `next/font/google` | `next/font` self-hosts, preloads, and eliminates FOUT in one API call |
| Favicon injection | `<link>` tag in layout | `app/favicon.ico` file convention | File convention auto-injects the correct `<link>` tag with no code |

**Key insight:** Every boilerplate problem in this phase has a first-class solution in the tools. The only hand-rolled code needed is business-domain code: the schema models, the seed data, and the query helpers.

---

## Common Pitfalls

### Pitfall 1: Vercel Postgres No Longer Exists

**What goes wrong:** Developer follows old tutorials referencing `@vercel/postgres` or the Vercel Storage dashboard showing a "Postgres" option. Neither exists for new projects since December 2024.

**Why it happens:** Requirement DATA-04 says "Vercel Postgres" — this is the product name from before the migration. The underlying service is now Neon.

**How to avoid:** Provision a database via Vercel Marketplace → Neon integration. Vercel injects `DATABASE_URL` and `DATABASE_URL_UNPOOLED` (or similar) automatically into project env vars. Use `DATABASE_URL` as the pooled app connection and `DATABASE_URL_UNPOOLED` (or create your own `DIRECT_URL`) as the direct CLI connection.

**Warning signs:** If you see `@vercel/postgres` in any package.json or import, you're following a pre-2025 tutorial.

---

### Pitfall 2: Prisma v7 Breaking Changes from v6

**What goes wrong:** Developer uses v6 patterns. Either `prisma generate` produces warnings, or `new PrismaClient()` throws at runtime because no adapter is provided.

**Why it happens:** Nearly all tutorials and blog posts predate v7 (released late 2025). Stack Overflow answers, README examples, and LLM training data all use v6 patterns.

**How to avoid:**
1. Generator: `provider = "prisma-client"` (not `"prisma-client-js"`)
2. Datasource: No `url` field in `schema.prisma` — it goes in `prisma.config.ts`
3. Adapter: Always instantiate `PrismaClient({ adapter })` — the adapter is mandatory
4. Import: From `../prisma/generated/client.js`, not from `@prisma/client`
5. Seeding: In `prisma.config.ts` `migrations.seed`, not `package.json`

**Warning signs:** Any time you see `prisma-client-js`, `url = env("DATABASE_URL")` in schema.prisma, or `new PrismaClient()` without an adapter argument.

---

### Pitfall 3: Two Connection URLs for Neon

**What goes wrong:** Developer uses the same connection string for both the app runtime and Prisma CLI operations. CLI operations timeout or fail because connection pooling blocks DDL commands.

**Why it happens:** Neon provides a pooled connection (with `-pooler` in hostname) and a direct connection. The pooler is efficient for application traffic but blocks schema operations.

**How to avoid:** Set two env vars in `.env.local`:
```
DATABASE_URL="postgresql://user:pw@ep-xxx-pooler.region.aws.neon.tech/dbname?sslmode=require"
DIRECT_URL="postgresql://user:pw@ep-xxx.region.aws.neon.tech/dbname?sslmode=require"
```

In `prisma.config.ts`, use `env("DIRECT_URL")` for the datasource url (CLI uses this).
In `lib/prisma.ts`, the adapter uses `process.env.DATABASE_URL` (pooled, for runtime).

**Warning signs:** `npx prisma migrate dev` hangs or errors with connection timeout.

---

### Pitfall 4: Seed Script Import Path

**What goes wrong:** `prisma/seed.ts` imports from `@prisma/client` which resolves to the old empty package, not the v7 generated client. Types are wrong or missing.

**Why it happens:** Prisma v7 moved generated output to a custom path. The `@prisma/client` package is now a thin wrapper that re-exports from the generated path — but only if you've run `prisma generate` and the path is resolved correctly.

**How to avoid:** In `prisma/seed.ts`, import from `"./generated/client.js"` (relative path from `prisma/`).

**Warning signs:** TypeScript errors saying Property model doesn't exist on PrismaClient, or runtime errors about missing module.

---

### Pitfall 5: FOUT if font loaded via `<link>` tag

**What goes wrong:** Developer uses `<link rel="stylesheet" href="https://fonts.googleapis.com/...">` instead of `next/font`. Browser sends a separate request for the font CSS, which delays font rendering and causes a visible flash of unstyled text.

**Why it happens:** Old tutorial habits. `<link>` tag Google Fonts loading is the traditional approach.

**How to avoid:** Only use `next/font/google`. Import the font, call it as a function with `{ subsets: ['latin'] }`, apply `font.className` to `<html>` in `app/layout.tsx`. Never add a Google Fonts `<link>` tag.

**Warning signs:** Network tab shows a request to `fonts.googleapis.com` or `fonts.gstatic.com` on page load.

---

### Pitfall 6: `generateStaticParams` needed for `[id]` route (Phase 3, schema here)

**What goes wrong:** Dynamic route `app/properties/[id]/page.tsx` works in dev but fails Vercel build when `output: 'export'` is set, or produces warnings about missing static params.

**Why it happens:** Next.js needs to know which IDs to pre-render at build time for static export.

**How to avoid:** This is a Phase 3 concern, but the schema must support it: ensure Property records have stable `id` values (cuid is fine). Add `generateStaticParams` in Phase 3 using `getAllProperties()` from Phase 1's query helpers.

**Note:** Also remember — `params` is a Promise in Next.js 15+. Always `const { id } = await params` before using it.

---

## Code Examples

Verified patterns from official sources:

### Environment Variables (.env.local)

```bash
# Source: Neon docs (neon.com/docs/guides/prisma)
# DATABASE_URL: pooled connection (for app runtime)
DATABASE_URL="postgresql://user:password@ep-example-pooler.us-east-1.aws.neon.tech/dbname?sslmode=require"

# DIRECT_URL: non-pooled direct connection (for Prisma CLI: migrate, generate, seed)
DIRECT_URL="postgresql://user:password@ep-example.us-east-1.aws.neon.tech/dbname?sslmode=require"
```

### prisma.config.ts (project root)

```typescript
// Source: Prisma v7 docs (prisma.io/docs/ai/prompts/prisma-7)
import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    url: env("DIRECT_URL"),
  },
});
```

### lib/prisma.ts (Singleton)

```typescript
// Source: Prisma Next.js docs + Neon adapter docs
import "dotenv/config";
import { PrismaClient } from "../prisma/generated/client.js";
import { PrismaNeon } from "@prisma/adapter-neon";

const prismaClientSingleton = () => {
  const adapter = new PrismaNeon({
    connectionString: process.env.DATABASE_URL!,
  });
  return new PrismaClient({ adapter });
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();
export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;
```

### next/font in layout.tsx

```typescript
// Source: Next.js 16.1.6 official docs
// https://nextjs.org/docs/app/building-your-application/optimizing/fonts
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}
```

### Metadata in layout.tsx

```typescript
// Source: Next.js 16.1.6 official docs
// https://nextjs.org/docs/app/api-reference/functions/generate-metadata
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Anvara | Sponsorship Marketplace",
  description: "Connect your brand with premium sponsorship opportunities.",
  robots: { index: false, follow: false },
};
```

### Favicon (file convention)

```
// Source: Next.js 16.1.6 official docs
// https://nextjs.org/docs/app/api-reference/file-conventions/metadata/app-icons
//
// Place at: app/favicon.ico
// Next.js auto-injects: <link rel="icon" href="/favicon.ico" sizes="any" />
// No code required — file presence is sufficient.
```

### Minimal seed with idempotent clear

```typescript
// Source: Prisma seeding docs pattern
// prisma/seed.ts

async function main() {
  // Idempotent: clear in reverse FK order
  await prisma.message.deleteMany();
  await prisma.offer.deleteMany();
  await prisma.thread.deleteMany();
  await prisma.package.deleteMany();
  await prisma.property.deleteMany();

  // Then create fresh records...
}
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `provider = "prisma-client-js"` | `provider = "prisma-client"` | Prisma v7 (late 2025) | Must update generator — old name is deprecated |
| `url = env("DATABASE_URL")` in schema.prisma | `url: env("DATABASE_URL")` in `prisma.config.ts` | Prisma v7 | Schema datasource has no `url` field |
| Optional driver adapters | Driver adapters required | Prisma v7 | `new PrismaClient()` without adapter throws |
| Auto-seed on `prisma migrate dev` | Only `npx prisma db seed` triggers seed | Prisma v7 | Seed must be run explicitly |
| `@vercel/postgres` package | Neon via Vercel Marketplace | December 2024 | Vercel Postgres is discontinued; Neon is the replacement |
| `package.json "prisma": { "seed": ... }` | `prisma.config.ts migrations.seed` | Prisma v7 | Old approach may still work but not documented for v7 |
| Import from `@prisma/client` | Import from `./prisma/generated/client.js` | Prisma v7 | Custom output path requires relative import |
| Next.js `params.id` (direct) | `const { id } = await params` | Next.js 15 | `params` is a Promise — must await |
| Google Fonts `<link>` tag | `next/font/google` | Next.js 13+ | `next/font` eliminates FOUT and external requests |

**Deprecated/outdated:**
- `@vercel/postgres`: Discontinued; use Neon via Vercel Marketplace
- `prisma-client-js` generator: Deprecated in v7; use `prisma-client`
- `url` in `schema.prisma` datasource block: Moved to `prisma.config.ts` in v7
- `shadcn-ui` npm package: Old legacy package; use `shadcn` CLI (`npx shadcn@latest`)

---

## Open Questions

1. **Does `package.json "prisma": { "seed": "..." }` still work in Prisma v7?**
   - What we know: The official v7 docs show `prisma.config.ts` as the documented approach. The package.json approach is v6-standard.
   - What's unclear: Whether Prisma v7 still reads `package.json` as a fallback.
   - Recommendation: Use `prisma.config.ts`. If it fails (e.g., module resolution issues with TypeScript), try the `package.json` fallback with `"prisma": { "seed": "tsx prisma/seed.ts" }`.

2. **Is `driverAdapters` preview feature flag still required in Prisma v7?**
   - What we know: In Prisma v5/v6, using driver adapters required `previewFeatures = ["driverAdapters"]` in the schema generator. Multiple sources indicate Prisma v7 made driver adapters stable and required.
   - What's unclear: Whether any schema flag is still needed.
   - Recommendation: Do NOT add `previewFeatures = ["driverAdapters"]` — v7 made adapters standard. If `prisma generate` fails, check the Prisma v7 release notes.

3. **Neon connection string var names from Vercel Marketplace integration**
   - What we know: Vercel Marketplace Neon integration injects env vars automatically, but the exact variable names may differ from the manual setup (`DATABASE_URL`, `DATABASE_URL_UNPOOLED`, or `DIRECT_URL`).
   - What's unclear: Exact variable names injected by the Vercel × Neon integration.
   - Recommendation: After provisioning Neon via Vercel Marketplace, check the auto-injected variable names in Vercel project settings. Map them to `DATABASE_URL` (pooled) and `DIRECT_URL` (direct) in `prisma.config.ts` and `.env.local`. Do not assume specific names before seeing them.

4. **Property type: `SponsorshipProperty` vs Prisma's generated `Property`**
   - What we know: STACK.md defined a comprehensive TypeScript interface `SponsorshipProperty`. Prisma generates its own `Property` type from the schema. STATE.md says to use STACK.md as base and add `availability: string`.
   - What's unclear: Whether the app should use Prisma's generated types directly or wrap them in a custom interface.
   - Recommendation: Use Prisma's generated types directly throughout the app. They will be more complete and always in sync with the schema. Do not maintain a parallel `SponsorshipProperty` interface — it will drift. The `lib/data/types.ts` file in Phase 1 should re-export from Prisma generated types with any augmentations.

---

## Sources

### Primary (HIGH confidence)

- Next.js 16.1.6 official docs (verified 2026-02-20): Fonts — `https://nextjs.org/docs/app/building-your-application/optimizing/fonts`
- Next.js 16.1.6 official docs (verified 2026-02-20): generateMetadata — `https://nextjs.org/docs/app/api-reference/functions/generate-metadata`
- Next.js 16.1.6 official docs (verified 2026-02-20): App Icons — `https://nextjs.org/docs/app/api-reference/file-conventions/metadata/app-icons`
- Vercel official docs (verified 2026-02-21): Postgres is discontinued, Neon is replacement — `https://vercel.com/docs/storage/vercel-postgres`
- Neon official docs (verified 2026-02-21): Prisma integration — `https://neon.com/docs/guides/prisma`
- Prisma official docs (verified 2026-02-21): v7 migration guide — `https://www.prisma.io/docs/orm/more/upgrade-guides/upgrading-versions/upgrading-to-prisma-7`
- Prisma official docs (verified 2026-02-21): Seeding — `https://www.prisma.io/docs/orm/prisma-migrate/workflows/seeding`
- Prisma official docs (verified 2026-02-21): Next.js Client Singleton — `https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/instantiation`
- npm registry (verified 2026-02-21): `prisma@7.4.1`, `@prisma/adapter-neon@7.4.1`, `@neondatabase/serverless@1.0.2`

### Secondary (MEDIUM confidence)

- Prisma v7 migration AI prompt (official content): `https://www.prisma.io/docs/ai/prompts/prisma-7` — verified schema patterns, adapter requirement, import path change
- WebSearch results cross-referencing Prisma v7 + Neon + Next.js 16 patterns (2026)

### Tertiary (LOW confidence)

- Community blog pattern for `package.json` fallback for Prisma v7 seeding — not confirmed in official docs; treat as hypothesis

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all versions npm-verified; Vercel Postgres → Neon migration confirmed via official Vercel docs
- Prisma v7 patterns: HIGH — confirmed via official Prisma docs and Neon guides; specific breaking changes documented
- Architecture: HIGH — based on official Next.js 16.1.6 docs (current as of research date)
- Seed data volume/shape: MEDIUM — data model is correct; realistic Anvara-inspired content is author's responsibility
- Pitfalls: HIGH — all pitfalls verified with official documentation

**Research date:** 2026-02-21
**Valid until:** 2026-03-21 (30 days — Prisma v7 and Next.js 16 are stable; Neon/Vercel integration patterns are stable)

**Key constraint reiteration (no CONTEXT.md, but from STATE.md + PROJECT.md):**
- Use STACK.md `SponsorshipProperty` as base type; add `availability: string`
- Use Picsum (`picsum.photos`) as image host; add to `next.config.ts` `remotePatterns`
- Next.js 15+: `params` is a Promise — `await params` before accessing `id`
- Vercel Postgres = Neon (DATA-04 is fulfilled by Neon provisioned via Vercel Marketplace)
