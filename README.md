# Anvara Prototype

A fully functional prototype of Anvara's sponsorship marketplace — built to demonstrate product thinking, engineering depth, and UX improvements. Browse properties, get AI-powered recommendations, simulate deals, and explore analytics.

**[Live Demo](https://anvara-prototype-mbeato.vercel.app)**

---

## What's Built

### AI Features
- AI-powered chat that recommends relevant sponsorship properties based on user intent
- AI-simulated messaging — property side responses feel natural and contextual (powered by OpenAI o3-mini)
- Smart recommendations on browse page with audience fit scoring

### UX Polish
- Animated landing page with video backgrounds, typewriter effect, and parallax scrolling
- Skeleton loading states on every data-fetching route
- `prefers-reduced-motion` support throughout — no animations for users who prefer reduced motion
- LazyMotion bundle optimization (34kb down to 4.6kb)
- Mobile-responsive design tested at 375px
- Dark/light mode with persistent theme

### Feature Breadth
- Full landing page faithful to Anvara's current site messaging
- Property browse with category filters, price range slider, region dropdown, and active filter chips
- Detailed property pages with tier pricing, audience demographics, and activation formats
- Advertiser analytics dashboard with trend charts, bar charts, and KPI cards
- Deals pipeline with stage-grouped Kanban view
- Campaigns table with mock data
- Multi-step "Show Me Around" platform tour
- Public listing pages with gated content and login prompt
- Messaging inbox with pre-seeded conversations and "Make an Offer" flow

---

## Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 16 | App Router, Server Components, Server Actions |
| React 19 | Concurrent features, useActionState |
| TypeScript | Full type safety, strict mode |
| Tailwind CSS v4 | Utility-first styling |
| ShadCN UI | Component library |
| Prisma + Neon Postgres | Database ORM with serverless adapter |
| OpenAI (o3-mini) | AI chat and simulated messaging |
| Motion (Framer Motion) | Animations with LazyMotion |
| Recharts | Analytics visualizations |
| Vercel | Deployment with serverless functions |

---

## Architecture

- App Router with route groups: `(app)` for authenticated views, `(public)` for public pages
- Server Components by default — `'use client'` only on interactive leaf components
- Prisma with Neon serverless adapter for database access
- Server Actions for mutations (message sending, offer creation)
- AI SDK for streaming OpenAI responses

---

## Local Setup

```bash
git clone https://github.com/mbeato/anv.git
cd anv
npm install
```

Create `.env.local`:

```
DATABASE_URL="your-neon-pooled-connection-string"
DIRECT_URL="your-neon-direct-connection-string"
OPENAI_API_KEY="your-openai-api-key"
```

```bash
npx prisma db push
npx prisma db seed
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## About the `.planning/` Directory

This repository includes a `.planning/` directory that documents the structured build process — from project definition through 7 phases of iterative development. It's kept in the repo intentionally to demonstrate the planning methodology used to build this prototype.
