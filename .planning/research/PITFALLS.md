# Pitfalls Research

**Domain:** Frontend prototype / demo for sponsorship marketplace
**Researched:** 2026-02-20
**Context:** Next.js, ShadCN UI, mock data, Vercel deploy. Few-hour time budget. Audience is two founders.
**Confidence:** HIGH (prototype pitfalls are well-established; no WebSearch available, drawing on HIGH-confidence training knowledge about Next.js, ShadCN, Vercel, and demo UX patterns)

---

## Time Sinks

Things that consume hours without producing visible impact for a 2-person founder audience.

### 1. Perfecting Mock Data Structure

**What happens:** You spend 45+ minutes crafting a perfectly typed, normalized mock data schema with interfaces for every nested field — then realize the founders see a card with a name, image, and price.

**Warning signs:**
- You're writing a `types/` directory before building a single page
- You're debating whether a property should have `pricing: PricingTier[]` vs `pricingTiers: Tier[]`
- You're adding edge cases to data that won't be rendered

**Prevention:**
- Build the UI first, derive the data shape from what you actually render
- Flat objects are fine for prototypes: `{ id, name, image, price, location, category, audienceSize }`
- 8–12 mock properties is sufficient. 3–4 is too few (looks sparse), 30+ is unnecessary

**Build phase affected:** Data layer setup

---

### 2. Over-Engineering the Filter System

**What happens:** You build a composable, URL-synced, reducer-based filter architecture. This takes 2+ hours and looks identical to a simple `useState` version.

**Warning signs:**
- You're reaching for `useReducer` for filter state
- You're syncing filters to query params before a single filter works
- You're abstracting a `FilterProvider` before you have filter UI

**Prevention:**
- Start with `useState` holding a flat filter object: `{ venueType, location, priceRange, audienceSize }`
- Derive filtered results inline with `.filter()` — no memoization needed for 12 items
- Add URL sync only if it feels broken without it (it won't)

**Build phase affected:** Browse/discovery page

---

### 3. Custom Component Building When ShadCN Has It

**What happens:** You build a custom `RangeSlider`, `MultiSelect`, or `Badge` from scratch, burning 30–60 minutes, when ShadCN/Radix has these ready.

**Warning signs:**
- You're writing `onMouseDown` event handlers
- You're reaching for a new npm package for UI primitives
- You're styling a `<input type="range">` manually

**Prevention:**
- Before building any UI element, check ShadCN component list: Slider, Select, Badge, Sheet, Dialog, Skeleton — all exist
- The ShadCN CLI (`npx shadcn@latest add slider`) takes 10 seconds
- Accept ShadCN defaults first; customize only if it actively looks wrong

**Build phase affected:** Filter UI, modal, any interactive component

---

### 4. Image and Asset Sourcing

**What happens:** You spend 30+ minutes finding, resizing, optimizing, and properly attributing images for mock property listings. Or you use placeholder.co and it looks unfinished.

**Warning signs:**
- You're on Unsplash searching "sports stadium aerial"
- You're resizing images in Figma before using them
- You have more than 3 browser tabs open looking for venue photos

**Prevention:**
- Use a single, consistent image source: Unsplash Source API (`https://source.unsplash.com/800x600/?stadium`) or Picsum (`https://picsum.photos/seed/[id]/800/600`)
- Set image dimensions consistently so layout never breaks
- Use Next.js `<Image>` with a fixed `width` and `height` — prevents layout shift, no optimization work needed
- Never use `placeholder.co` — the placeholder text renders in the final demo

**Build phase affected:** Property cards, detail page hero

---

### 5. Typography and Color Micro-Optimization

**What happens:** You spend 40 minutes adjusting font weights, line heights, and color shades, producing changes that are invisible at normal viewing distance.

**Warning signs:**
- You're comparing `gray-700` vs `gray-800` in side-by-side tabs
- You're on the Tailwind color palette page more than twice
- You're adjusting `tracking-tight` on a heading

**Prevention:**
- Set a type scale once at the start (h1, h2, body, caption classes) and do not revisit
- Use Tailwind's defaults — they are already calibrated for readability
- The founders will notice if the layout is broken or a CTA is missing; they will not notice `font-medium` vs `font-semibold`

**Build phase affected:** All pages, especially landing

---

### 6. Responsive Breakpoint Perfection

**What happens:** You spend an hour making every breakpoint pixel-perfect. Mobile, tablet, desktop all look flawless. But you built three screens total instead of five.

**Warning signs:**
- You're resizing the browser window more than building
- You're adding `sm:`, `md:`, `lg:`, `xl:` variants to every element
- You're testing on a simulated iPhone SE

**Prevention:**
- Build desktop layout first, completely
- Then add one pass of `sm:` / `md:` classes for mobile
- The brief says their current site is desktop-focused — showing *any* mobile consideration is a win; perfection is not needed
- Test at 375px and 1280px. Those two breakpoints cover it.

**Build phase affected:** All pages, last-pass polish

---

## Polish Killers

Things that make a demo feel unfinished even if the code is solid.

### 1. Inconsistent Spacing

**What it looks like:** Some cards have `p-4`, others have `p-6`. Sections have random gaps — `gap-4` here, `gap-8` there, `mb-12` somewhere else. The page feels visually noisy.

**Warning signs:**
- You're setting padding/margin values ad hoc as you build
- Different pages feel like they were built by different people
- Cards in the same grid have different internal padding

**Prevention:**
- Define spacing tokens at the start: section padding = `py-16`, card padding = `p-6`, component gap = `gap-4`
- Never use odd spacing values (`p-5`, `p-7`, `p-9`) — stick to the standard Tailwind scale
- Run a visual pass at the end: look at every page at full zoom and check that vertical rhythm feels consistent

**Affects:** All pages — most visible on browse/landing

---

### 2. $0 Price Display and Placeholder Text

**What it looks like:** A property card shows "Price: $0" or "Description coming soon" or "Lorem ipsum" or an empty field that renders as nothing.

**Warning signs:**
- Mock data has any field set to `null`, `""`, `0`, or `undefined` that feeds directly to UI
- You haven't tested what renders when a value is missing

**Prevention:**
- Audit every rendered data field: what shows if value is `0`, `null`, or `""`?
- The PROJECT.md already flags `$0` — apply the same logic to all price/metric fields
- For any numeric field that might be zero: `price === 0 ? "Request Quote" : formatPrice(price)`
- Search your mock data for `0`, `null`, `""`, `"TBD"` before deploy

**Affects:** Property cards, detail page — directly contradicts the demo's stated UX improvement goal

---

### 3. Missing or Jarring Loading States

**What it looks like:** Click a tab or navigate to the detail page and content pops in instantly with a flash, or the page goes blank for a moment. Even with mock data, abrupt content appearance reads as "unfinished."

**Warning signs:**
- You're using `useEffect` + `useState(false)` without a skeleton
- Page transitions have no visual continuity
- The "fix loading flash" requirement from PROJECT.md isn't addressed on every page

**Prevention:**
- Use ShadCN `Skeleton` component — it requires zero configuration
- Add a `useEffect` with `setTimeout(200–400ms)` to simulate a loading state on every data-heavy section
- Pattern: `isLoading ? <SkeletonCard /> : <PropertyCard />`
- This is already in scope (PROJECT.md requirement) — do not skip it under time pressure

**Affects:** Browse page, detail page — one of the core stated improvements

---

### 4. Broken or Empty States

**What it looks like:** Apply a filter that matches zero properties — the page goes blank. Or the "Recommended for you" section renders nothing because the mock logic returns an empty array.

**Warning signs:**
- You've tested filters only with results that match
- You haven't added an `EmptyState` component
- The "Recommended for you" section assumes data will always exist

**Prevention:**
- Every list/grid needs three states: loading, empty, populated
- Empty state: at minimum an icon, a heading ("No properties match your filters"), and a reset action
- For "Recommended for you": hardcode at least 3 items that always show — never let it render empty in the demo
- Test each filter combination that could plausibly yield zero results

**Affects:** Browse page, recommended section

---

### 5. CTA That Goes Nowhere Without Explanation

**What it looks like:** Founder clicks "Request Quote." Nothing happens. Or a modal opens with no content. Silence reads as broken, not intentional.

**Warning signs:**
- The modal/CTA was the last thing built and ran out of time
- The button is there but has no `onClick`
- The modal opens to an empty `<div>`

**Prevention:**
- The "Request Quote" modal needs: a heading, a 2–3 field form (name, company, message), a Submit button
- On submit, show a success state ("Your request has been sent. The property owner will follow up within 24 hours.")
- The form does not need to send anything — the success state is the point
- Never ship a button that does nothing without a visible, intentional reason

**Affects:** Property detail page — the primary conversion action

---

### 6. Font Loading Flash (FOUT)

**What it looks like:** On first load, the page renders in system font, then jumps to the brand font. This is jarring and makes the demo feel low-effort.

**Warning signs:**
- You're importing Google Fonts via a `<link>` tag in `layout.tsx`
- You haven't used Next.js `next/font`

**Prevention:**
- Always use `next/font/google` — it eliminates FOUT by inlining font CSS and preloading
- Example: `import { Inter } from 'next/font/google'; const inter = Inter({ subsets: ['latin'] })`
- Apply the font variable to `<html>` in `layout.tsx` via `className={inter.className}`
- This takes 5 minutes and eliminates one of the most visible "unfinished" signals

**Affects:** All pages — visible on every first load

---

### 7. Tab Title and Favicon Left as Default

**What it looks like:** The browser tab says "Create Next App" with the Next.js favicon. For a demo sent to founders, this reads as copy-paste code.

**Warning signs:**
- You haven't updated `layout.tsx` metadata
- The favicon is the Next.js default triangle

**Prevention:**
- Update `metadata` in `layout.tsx`: `title: "Anvara | Sponsorship Marketplace"`, `description: "..."`
- Add a simple favicon — even a plain colored square SVG is better than the default
- Takes 5 minutes. Zero-effort signal of care.

**Affects:** First impression on every page load

---

### 8. Console Errors and Warnings Visible

**What it looks like:** Founder or tech-savvy reviewer opens DevTools and sees a wall of React key warnings, hydration errors, or missing prop types.

**Warning signs:**
- You haven't checked the browser console since initial setup
- List items don't have `key` props
- You're mixing server/client component patterns incorrectly

**Prevention:**
- Open DevTools console before every deploy; resolve all errors, resolve common warnings
- Every `.map()` rendering a list element needs a stable `key` prop (use the data ID, never array index)
- If using Next.js App Router: be intentional about `'use client'` — don't add it everywhere, do add it wherever you use hooks or event handlers

**Affects:** All pages — TypeScript/ESLint catches most of these if configured

---

## Scope Creep Risks

Where prototypes tend to expand beyond their time budget.

### 1. Adding a Fourth Page

**What happens:** Landing, Browse, and Detail are the three necessary screens. Then you think: "A favorites/saved page would be cool" or "An onboarding flow would show product thinking." Each extra page costs 30–60 minutes minimum and dilutes polish on the core three.

**Prevention:**
- Hard cap: three screens. If you finish early, polish the three screens, not add a fourth.
- A polished three-screen demo is better than five half-finished screens
- If you want to show "product thinking" for additional surfaces, add a note in the demo footer or a simple roadmap section on the landing page — text is free

---

### 2. Real Filtering Logic Getting Complex

**What happens:** You add a price range slider, then realize you need to handle "Request Quote" items, then add audience size as a multi-select, then add sorting, then add a "clear all" that needs to reset each filter independently. What was one component becomes a system.

**Prevention:**
- Decide filter scope before building: 3 filters maximum for the demo
- Suggested: Venue Type (dropdown), Location (dropdown), Price Range (slider or radio)
- Audience Size can be a card display field without being a filter
- "Sort by" can be a stretch goal, not a baseline requirement

---

### 3. Animation and Transition Polish

**What happens:** You add a page transition, then a card hover animation, then a filter panel slide-in, then a modal fade. Each feels necessary. Together they take 90 minutes.

**Prevention:**
- Tailwind `transition-colors`, `hover:shadow-md` on cards: yes, 2 minutes total
- Framer Motion page transitions: no — not worth the setup time in a few-hour budget
- ShadCN components include their own transitions (Dialog, Sheet, DropdownMenu) — use those, don't add more
- One hover effect on cards, one transition on the modal. Stop there.

---

### 4. Personalization Logic Getting Real

**What happens:** "Recommended for you" starts as 3 hardcoded items. Then you think: "Let me make it actually filter by category preference." Then you need a preference store. Then you need to persist it. Two hours later you have a fake recommendation engine with no visible improvement.

**Prevention:**
- "Recommended for you" = always 3–4 hardcoded premium/featured properties
- Add a visible label: "Based on your interest in sports sponsorships" — this is sufficient to show personalization thinking
- Do not build dynamic recommendation logic. The concept communicates without the implementation.

---

### 5. TypeScript Strictness Rabbit Hole

**What happens:** TypeScript flags a type on your mock data. You fix it. Then you need to properly type `children` props, then a generic helper, then you realize your filter function isn't narrowing correctly. An hour is gone.

**Prevention:**
- Use `// @ts-ignore` or `as SomeType` casts liberally for prototype code — this is acceptable
- Do not spend more than 5 minutes on any single TypeScript error in a prototype
- TypeScript errors that don't affect runtime behavior are invisible to the founders
- If the ESLint config is blocking your build, loosen it temporarily (comments in `eslint.config.js`)

---

## Deploy Gotchas

Vercel-specific issues to watch for with Next.js App Router.

### 1. Environment Variables Not Set

**What happens:** Local works perfectly. Vercel deploy shows errors or blank data because an env var that you're reading in code doesn't exist in the Vercel project settings.

**Warning signs:**
- Any `process.env.NEXT_PUBLIC_*` usage in your code
- Error messages on the deployed URL that don't appear locally

**Prevention:**
- For a mock data prototype, you likely need zero environment variables — avoid them entirely
- If you do use any (e.g., an analytics token, a feature flag), add them in Vercel project settings under "Environment Variables" before the first deploy
- `NEXT_PUBLIC_` prefix is required for client-side access; plain `PROCESS_ENV_` variables are server-only

---

### 2. `next/image` Hostname Not Whitelisted

**What happens:** You use external image URLs (Unsplash, Anvara's CDN, etc.) with Next.js `<Image>`. Deploy works locally but images are broken on Vercel with a "hostname not configured" error.

**Warning signs:**
- Any `<Image src="https://external.com/..." />` usage
- Error: "Invalid src prop... hostname ... not configured under images in your next.config.js"

**Prevention:**
- Add `images.remotePatterns` to `next.config.ts` before the first deploy:
```typescript
images: {
  remotePatterns: [
    { protocol: 'https', hostname: 'images.unsplash.com' },
    { protocol: 'https', hostname: 'picsum.photos' },
    { protocol: 'https', hostname: 'anvara.com' },
  ]
}
```
- Do this on day one, not after your first failed deploy

---

### 3. Server Component / Client Component Boundary Errors

**What happens:** You use `useState` or `useEffect` in a file that Next.js treats as a Server Component. Build fails with "You're importing a component that needs `useState`. It only works in a Client Component."

**Warning signs:**
- Build fails with "X only works in a Client Component" error
- You're adding hooks to files inside the `app/` directory without `'use client'`

**Prevention:**
- Rule of thumb: any component that uses React hooks, event handlers, or browser APIs needs `'use client'` at the top
- Static content, layouts, and data display components can remain Server Components
- When in doubt for a prototype, add `'use client'` — the performance difference is irrelevant for a 2-person demo

---

### 4. Build Passes Locally, Fails on Vercel

**What happens:** `npm run dev` works. `npm run build` locally works. Vercel build fails with a TypeScript or ESLint error that only surfaces in production build mode.

**Warning signs:**
- You've never run `npm run build` locally
- There are TypeScript errors you've been suppressing with `// @ts-ignore` that aren't consistent

**Prevention:**
- Run `npm run build` locally before every Vercel push — this catches 90% of deploy failures
- Vercel uses `next build` which is stricter than `next dev`
- Common failure modes: unused imports flagged as errors, type errors in route params, missing `generateStaticParams` for dynamic routes

---

### 5. Dynamic Routes Requiring `generateStaticParams`

**What happens:** You build a `/properties/[id]` detail page. Works in dev. On Vercel with static export or SSG settings, the build fails because Next.js doesn't know which IDs to pre-render.

**Warning signs:**
- You have `[id]` or `[slug]` in your route folder
- You're using `export const dynamic = 'force-static'` or similar

**Prevention:**
- For a prototype, use `export const dynamic = 'force-dynamic'` on dynamic route pages — this skips static generation entirely
- Or add `generateStaticParams` with your mock data IDs — simple for a small static dataset:
```typescript
export async function generateStaticParams() {
  return mockProperties.map((p) => ({ id: p.id }))
}
```
- The simplest option: keep it dynamic, don't force static

---

### 6. Vercel URL Not Unlisted

**What happens:** You deploy to Vercel. The URL is discoverable via Vercel's deployment dashboard or search indexing. For a targeted demo, the founders should receive the specific link — but if you haven't set it up as "unlisted," it could surface in unexpected ways.

**Prevention:**
- Vercel doesn't offer true "unlisted" URLs by default — all deployments are publicly accessible if you know the URL
- The URL itself is effectively unlisted (random hash or custom subdomain) — it won't be indexed unless you add a sitemap
- To prevent search indexing: add `robots.txt` with `Disallow: /` or set `<meta name="robots" content="noindex">` in layout metadata
- This is a minor concern for a 2-person audience but takes 2 minutes to address

---

## Prevention Checklist

Quick checks to run before sharing the demo URL.

### Before First Commit
- [ ] `next.config.ts` has `images.remotePatterns` for all external image hosts
- [ ] `layout.tsx` metadata updated: title, description (not "Create Next App")
- [ ] Font loaded via `next/font/google`, not a `<link>` tag
- [ ] Favicon replaced with a simple branded one

### Before Each Build Push
- [ ] Run `npm run build` locally and confirm zero errors
- [ ] Check browser console — zero errors, no React key warnings
- [ ] Every `.map()` rendering UI elements has a `key` prop using data IDs
- [ ] No list or grid renders empty without an empty state component

### Mock Data Audit
- [ ] Every price field: if `0`, renders "Request Quote" not "$0"
- [ ] Every text field: no `null`, `""`, `"TBD"`, or placeholder text renders
- [ ] "Recommended for you" always has at least 3 items (hardcoded if needed)
- [ ] Filter combinations that yield 0 results show an empty state, not a blank page

### UX Polish Pass
- [ ] Spacing is consistent across all pages (same card padding, same section padding)
- [ ] "Request Quote" modal has content and a success state
- [ ] Loading skeletons present on browse page and detail page
- [ ] Mobile layout tested at 375px width (browser DevTools)

### Pre-Send Final Check
- [ ] Browse the deployed URL (not localhost) end-to-end as a founder would
- [ ] Click every button, every filter, every card, every CTA
- [ ] Confirm the footer says "Prototype by Max Beato"
- [ ] Add `<meta name="robots" content="noindex">` to prevent search indexing

---

## Sources

**Confidence:** HIGH for Next.js App Router, ShadCN, and Vercel deployment patterns — these reflect well-established, stable behaviors in the ecosystem. Prototype UX pitfalls reflect high-consensus community patterns.

**Note:** WebSearch was unavailable during this research session. All findings drawn from training knowledge through August 2025. Next.js and Vercel deployment behaviors are stable and well-documented; no significant gaps expected from the knowledge cutoff for this use case.

**Authoritative references (to verify if needed):**
- Next.js App Router docs: https://nextjs.org/docs/app
- ShadCN component list: https://ui.shadcn.com/docs/components
- Vercel Next.js deployment guide: https://vercel.com/docs/frameworks/nextjs
- next/font documentation: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
