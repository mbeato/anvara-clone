# Phase 6: Landing Page - Research

**Researched:** 2026-02-21
**Domain:** Next.js landing page, animations, video background, carousels, SVG logos
**Confidence:** HIGH (core stack), MEDIUM (animation library choice), HIGH (routing pattern)

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

#### Hero Section
- Video background with 2-3 short action sports clips that crossfade on loop
- Headline: adapted copy matching Anvara's positioning ("Connect Your Brand to Culture at Scale")
- Single blue CTA button "Try Anvara Free" — links to /browse (no mock login page)
- Dark overlay on video for text readability
- Bottom of hero: scrolling property cards (all 12 seeded properties, jump-snap every 3 seconds)
- Landing-specific compact card variant (image-heavy with overlay text, not the browse page PropertyCard)
- Property cards link to existing detail pages (/properties/[id])

#### Section Structure (12 sections, top to bottom)
1. Hero — Video bg, headline, CTA, scrolling property cards
2. Brand logos bar — micro1, Legendz, Delta, gopuff (match Anvara exactly)
3. "What is Anvara" — Rotating text ("Music Event", "Food Festival", etc.), 3D token illustrations approximated with CSS 3D transforms/shadows
4. Access the Whole Market — Property list, "Check the Market" CTA
5. A-Z Execution — Before/After UI mockup recreation, "Make a Deal" CTA
6. Analytics / Performance Reporting — Metrics visualization (125.2M Impressions, 144 Mentions, 4.0x ROI), "Measure Success" CTA
7. Anvara Intelligence — AI matching flow diagram recreation, prompt form UI, "Try Anvara Intelligence" CTA
8. For Brands / For Rightsholders — Two-column logo grids with real SVG logos, CTAs for each
9. Testimonial — Exact GoPuff quote and attribution
10. FAQ — 6 accordion items
11. Final CTA — Blue banner, smooth continuous-scroll property cards (marquee-style)
12. Footer — Links, newsletter input, large "anvara" watermark text

#### Animations
- Independent component animations matching Anvara (rotating text, auto-scrolling carousels, etc.)
- PLUS scroll-triggered section reveals (fade up + slight translate on viewport enter) — upgrade over current Anvara
- Smoothness is critical — janky animations are worse than no animations

#### Value Prop Section Mockups
- Recreate the UI mockup illustrations as actual UI components (not screenshots)

#### Property Cards
- All 12 seeded properties used in both carousel locations
- Hero: jump-snap scroll every 3 seconds (shows ~3 cards at a time)
- Final blue CTA: smooth continuous scroll (marquee-style)
- Landing-specific compact card component (separate from browse PropertyCard)
- All cards link to /properties/[id] detail pages

#### Brand/Rightsholder Logos
- Source SVG logos from public sources (clearbit, simple-icons, etc.)
- Match Anvara's exact brand list: gopuff, Coca-Cola, Snapchat, McDonald's, Mastercard, Kalshi, Brex, TikTok, Ally, LEGO
- Match Anvara's exact rightsholder list: LAFC, Serie A, SXSW, We Belong Here, ATP Tour, and others from screenshots
- Grayscale treatment to match Anvara's styling

#### Other Locked
- The landing page exists outside the app shell (no sidebar) — public-facing entry point
- All CTAs that reference "Try Anvara Free", "Get Started", etc. should route to /browse

### Claude's Discretion
- Exact video clip sources for hero background (free stock action sports footage)
- CSS 3D token approach vs flat illustrations for "What is Anvara" section (whichever looks smoothest)
- Scroll animation timing and easing curves
- Exact FAQ answer content (match Anvara's tone)
- Animation library choice (Framer Motion, CSS animations, or intersection observer — whatever produces smoothest result)
- Responsive breakpoints for all sections

### Deferred Ideas (OUT OF SCOPE)
- Public property listing pages (separate from authenticated detail pages)
- Mock login/signup flow
- Newsletter form functionality (visual only)
</user_constraints>

---

## Summary

This phase builds a full-fidelity landing page clone with 12 sections, video background hero, carousels, scroll animations, and custom UI mockup illustrations. The core technical challenges are: (1) routing the `/` page outside the `(app)` shell without breaking nested routes, (2) the two carousel behaviors (jump-snap in hero, marquee in footer CTA), (3) scroll-triggered animations without janky performance, and (4) sourcing and rendering SVG brand logos in grayscale.

The project already has `embla-carousel-react` v8 and `embla-carousel-autoplay` v8 installed — use these for the hero snap carousel. The marquee (continuous scroll) in the final CTA section is best done with pure CSS keyframe animation (no JS), which is both performant and reliable. For scroll-triggered section reveals, the `motion` package (v12, compatible with React 19) provides the simplest API via `whileInView` on client wrapper components. The CSS-only intersection observer approach is an alternative that avoids adding a dependency.

The routing change is straightforward: delete `app/(app)/page.tsx` and create `app/page.tsx` (which inherits only `app/layout.tsx`, not the `(app)` shell layout). All other routes under `app/(app)/` are unaffected.

**Primary recommendation:** Use `motion` (framer-motion v12) for scroll-triggered section reveals — it's React 19 compatible, has a clean `whileInView` API, and the bundle cost is justified by the complexity of 12 animated sections.

---

## Standard Stack

### Core (Already Installed — No New Dependencies Needed)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| embla-carousel-react | 8.6.0 | Hero snap carousel | Already installed, Autoplay v8 supports stopOnMouseEnter |
| embla-carousel-autoplay | 8.6.0 | 3s snap interval | Already installed, delay:3000 option |
| tailwindcss | v4 | CSS animations, marquee keyframes | Already installed, @theme @keyframes pattern |
| tw-animate-css | installed | Base animation utilities | Already installed |

### Supporting (New Dependency Required)

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| motion | ^12.34.3 | Scroll-triggered section reveals | whileInView prop, React 19 compatible |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| motion | CSS + IntersectionObserver hook | No new dependency, but more boilerplate per section; motion is cleaner for 12 sections |
| motion | AOS (Animate on Scroll) | AOS is jQuery-era; not React-idiomatic |
| embla for marquee | CSS keyframes | CSS keyframes are better for continuous scroll — no JS needed |
| simple-icons npm | Inline SVG strings | Inline SVGs are simpler, no extra package needed for a fixed list |

**Installation:**
```bash
npm install motion
```

---

## Architecture Patterns

### Recommended File Structure

```
app/
├── layout.tsx                    # Root layout (already exists, no sidebar)
├── page.tsx                      # NEW: Landing page at / (replaces (app)/page.tsx)
├── (app)/
│   ├── layout.tsx                # App shell with sidebar (unchanged)
│   ├── page.tsx                  # DELETE THIS: move content to app/page.tsx
│   ├── browse/
│   ├── messages/
│   └── properties/

app/
# Landing page sections as collocated components:
├── _components/
│   ├── landing/
│   │   ├── hero-section.tsx          # Video bg + headline + CTA + snap carousel
│   │   ├── brand-logos-bar.tsx       # micro1, Legendz, Delta, gopuff
│   │   ├── what-is-anvara.tsx        # Rotating text + 3D token illustrations
│   │   ├── access-market.tsx         # Property list + CTA
│   │   ├── az-execution.tsx          # Before/After mockup
│   │   ├── performance-reporting.tsx # Metrics visualization
│   │   ├── anvara-intelligence.tsx   # AI flow diagram + prompt form
│   │   ├── for-brands-rightsholders.tsx # Two-column logo grids
│   │   ├── testimonial.tsx           # GoPuff quote
│   │   ├── faq-section.tsx           # 6 accordion items
│   │   ├── final-cta.tsx             # Blue banner + marquee carousel
│   │   ├── landing-footer.tsx        # Footer with watermark
│   │   ├── landing-property-card.tsx # Compact card for carousels
│   │   └── section-reveal.tsx        # Scroll-trigger wrapper component
```

**Note:** Place section components at `app/_components/landing/` (collocated with page.tsx) rather than `components/` since these are page-specific.

### Pattern 1: Landing Route Outside (app) Shell

**What:** The `/` route must render without the sidebar/header shell. Currently `app/(app)/page.tsx` serves `/` via the (app) route group layout. Move it to `app/page.tsx` which only inherits `app/layout.tsx` (the root layout with ThemeProvider but no sidebar).

**How to implement:**
1. Delete `app/(app)/page.tsx`
2. Create `app/page.tsx` as a Server Component
3. No `layout.tsx` needed at `app/` level — `app/layout.tsx` already exists (root layout with html/body)

```typescript
// app/page.tsx — Server Component, outside (app) shell
import { getAllProperties } from "@/lib/data";
import { HeroSection } from "./_components/landing/hero-section";
// ...other section imports

export default async function LandingPage() {
  const properties = await getAllProperties();
  return (
    <main>
      <HeroSection properties={properties} />
      {/* ... remaining sections */}
    </main>
  );
}
```

**Routing verification:** `app/(app)/browse/page.tsx` → `/browse` (unchanged). `app/(app)/messages/page.tsx` → `/messages` (unchanged). `app/page.tsx` → `/` (new, no shell).

### Pattern 2: Hero Snap Carousel (Embla + Autoplay v8)

**What:** Jump-snap carousel showing ~3 property cards at a time, advancing every 3 seconds.

```typescript
// Source: embla-carousel.com + existing project usage in category-carousel.tsx
"use client";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

export function HeroPropertyCarousel({ properties }: { properties: Property[] }) {
  const plugin = useRef(
    Autoplay({
      delay: 3000,
      stopOnMouseEnter: true,    // v8 option — pauses on hover
      stopOnInteraction: false   // v8 option — resumes after hover
    })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      opts={{ loop: true, align: "start" }}
    >
      <CarouselContent>
        {properties.map((property) => (
          <CarouselItem key={property.id} className="basis-1/3">
            <LandingPropertyCard property={property} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
```

**CRITICAL:** `stopOnMouseEnter` and `stopOnInteraction` are **v8-only options** — they were removed in v9. The project uses v8 (8.6.0) so these work. Do NOT upgrade to v9.

### Pattern 3: Marquee Continuous Scroll (CSS Keyframes Only)

**What:** Final CTA section needs seamless infinite horizontal scroll of all 12 property cards.

```css
/* In app/globals.css or @theme block */
@theme {
  --animate-marquee: marquee 30s linear infinite;

  @keyframes marquee {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }
}
```

```typescript
// Duplicate the cards array to create seamless loop
export function MarqueeCarousel({ properties }: { properties: Property[] }) {
  const doubled = [...properties, ...properties]; // duplicate for seamless loop
  return (
    <div className="overflow-hidden">
      <div className="flex animate-marquee gap-4 w-max">
        {doubled.map((property, i) => (
          <LandingPropertyCard key={`${property.id}-${i}`} property={property} />
        ))}
      </div>
    </div>
  );
}
```

**Why CSS not JS:** No requestAnimationFrame loop, no resize observers, GPU-composited transform. The `-50%` trick works because the content is duplicated — when the first set scrolls out, the duplicate is seamlessly in position.

### Pattern 4: Scroll-Triggered Section Reveals (motion whileInView)

**What:** Each section fades up + translates when entering viewport. Reusable wrapper component.

```typescript
// app/_components/landing/section-reveal.tsx
"use client";
import { motion } from "motion/react";

interface SectionRevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export function SectionReveal({ children, delay = 0, className }: SectionRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

**Import path:** `from "motion/react"` (the modern import — `framer-motion` and `motion` are the same package at v12).

**viewport.once: true** — animates on first entry only, not on scroll back up. This matches premium site feel.

**viewport.amount: 0.15** — triggers when 15% of element is in view, catches large sections.

### Pattern 5: Video Background Hero

**What:** HTML5 `<video>` with autoplay, muted, loop, playsInline. Dark overlay for readability.

```typescript
// hero-section.tsx — video background pattern
export function HeroSection({ properties }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        poster="/hero-poster.jpg" // static fallback
      >
        <source src="/videos/hero-clip1.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
        {/* headline, CTA, carousel */}
      </div>
    </section>
  );
}
```

**Video source recommendation:** Download 2-3 clips from Pexels (pexels.com/search/videos/sport/) or Coverr (coverr.co/stock-video-footage/sport). Target 720p, under 5MB each, 5-8 seconds. Store in `/public/videos/`. No Mux or external CDN needed for a prototype.

**Crossfade between clips:** Simplest approach — use a single `<video>` looping one clip. For crossfade between multiple clips, use two `<video>` elements and CSS opacity transition on a timer (`setInterval`). See Pattern 7 below.

### Pattern 6: Rotating Text (CSS Animation)

**What:** "Anvara is the marketplace for [Music Event | Food Festival | Sports] sponsorships" — the bracketed word cycles.

```typescript
// CSS-only approach using @keyframes in @theme
// globals.css addition:
// @keyframes word-rotate { 0%,20% { opacity:1 } 25%,100% { opacity:0 } }

"use client";
const WORDS = ["Music Event", "Food Festival", "Sports", "Music Festival", "Tech Conference"];

export function RotatingText() {
  // useEffect with setInterval toggling activeIndex state is cleaner than pure CSS for 5+ words
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const id = setInterval(() => setIndex(i => (i + 1) % WORDS.length), 2500);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="text-primary transition-opacity duration-300">
      {WORDS[index]}
    </span>
  );
}
```

### Pattern 7: Video Crossfade (Claude's Discretion)

If implementing multiple video clips with crossfade:

```typescript
"use client";
const CLIPS = ["/videos/clip1.mp4", "/videos/clip2.mp4", "/videos/clip3.mp4"];

export function VideoCrossfade() {
  const [active, setActive] = React.useState(0);

  React.useEffect(() => {
    const id = setInterval(() => {
      setActive(i => (i + 1) % CLIPS.length);
    }, 6000); // switch every 6 seconds
    return () => clearInterval(id);
  }, []);

  return (
    <div className="absolute inset-0">
      {CLIPS.map((src, i) => (
        <video
          key={src}
          src={src}
          autoPlay muted loop playsInline
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
}
```

**Recommendation:** If video files are not readily available during planning, start with a single looping clip and add crossfade as enhancement.

### Pattern 8: Grayscale SVG Logos

**What:** Brand/rightsholder logos rendered in grayscale.

**Approach:** Inline SVG strings sourced from `simpleicons.org` (click a brand → copy SVG). For sports orgs not in simple-icons (LAFC, ATP Tour, Serie A, SXSW), use `brandfetch.com` or `seeklogo.com` for SVG download.

```typescript
// Store as string constants, render via dangerouslySetInnerHTML or as React SVG components
// Apply grayscale via CSS filter
<div
  className="w-24 h-12 flex items-center justify-center opacity-60 grayscale hover:grayscale-0 transition-all"
  dangerouslySetInnerHTML={{ __html: GOPUFF_SVG }}
/>
```

**Tailwind grayscale class:** `grayscale` applies `filter: grayscale(100%)`. Available in Tailwind v4.

**Simple-icons brands confirmed available:** gopuff, Coca-Cola (cocacola), Snapchat, McDonald's (mcdonalds), Mastercard, TikTok, LEGO, Ally. Kalshi and Brex may need manual SVG sourcing.

**Sports orgs:** LAFC, ATP Tour, Serie A, SXSW, We Belong Here — these are NOT in simple-icons. Source from brandfetch.com or seeklogo.com. Store as inline SVG in a `logos.ts` constants file.

### Pattern 9: FAQ Accordion

**What:** 6 accordion items using existing ShadCN `Collapsible` component.

```typescript
"use client";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

const FAQ_ITEMS = [
  { q: "What is Anvara?", a: "Anvara is a marketplace that connects brands and rights holders to buy and sell sponsorships, events, and real-world media opportunities." },
  { q: "How does payment work?", a: "..." },
  // ... 6 items total
];

export function FaqSection() {
  return (
    <div className="space-y-0 divide-y divide-border">
      {FAQ_ITEMS.map((item, i) => (
        <FaqItem key={i} {...item} />
      ))}
    </div>
  );
}
```

**Note:** ShadCN Accordion component was not installed (components/ui/ doesn't have accordion.tsx). Use the existing `Collapsible` primitive from radix-ui, which IS installed. Alternatively, add ShadCN accordion: `npx shadcn add accordion`.

### Pattern 10: Metrics Visualization (Performance Reporting Section)

**What:** From screenshot (Landing5.png): Lollapalooza 2025 card with three colored metric bubbles (125.2M Impressions in blue, 144 Mentions in red, 4.0x ROI in green) connected by curved lines.

```typescript
// Build as pure JSX/CSS — no chart library needed
// Three absolutely-positioned pill badges with colored SVG curve lines
export function MetricsVisualization() {
  return (
    <div className="relative bg-white rounded-2xl p-8 shadow-lg w-[400px] h-[280px]">
      {/* Property header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-400 to-pink-500" />
        <div>
          <p className="font-semibold text-sm">lollapalooza 2025</p>
          <p className="text-xs text-muted-foreground">Chicago, IL</p>
        </div>
      </div>

      {/* Metric bubbles */}
      <div className="absolute top-16 right-4">
        <span className="bg-blue-500 text-white text-xs px-3 py-1.5 rounded-full font-semibold">
          ◎ 125.2M Impressions
        </span>
      </div>
      {/* ... red and green bubbles */}

      {/* Curved SVG lines connecting card to bubbles */}
      <svg className="absolute inset-0 w-full h-full" style={{ overflow: 'visible' }}>
        <path d="M 80 80 C 150 80, 200 50, 350 60" stroke="#3B82F6" strokeWidth="2" fill="none" />
        {/* ... other paths */}
      </svg>
    </div>
  );
}
```

**recharts is already installed** — but for this visualization, pure SVG/CSS is cleaner and more faithful to the design than a chart library.

### Anti-Patterns to Avoid

- **Using the (app) layout for landing:** Do NOT add a `layout.tsx` inside `app/` at root level thinking it will override. The existing `app/layout.tsx` IS the root layout. Just move page.tsx.
- **useEffect-based scroll listeners for reveals:** Use IntersectionObserver (via motion's whileInView) — not window scroll events. Scroll events fire on main thread and cause jank.
- **CSS transition on `width` for text rotation:** Animating width causes layout recalculation (jank). Use `opacity` transitions or `transform` only.
- **Importing motion in Server Components:** `motion` components must be wrapped in `"use client"`. Use the `SectionReveal` client wrapper pattern to keep section data-fetching in Server Components.
- **Large video files in /public/:** Target 720p H.264 MP4, under 5MB per clip. Use HandBrake or ffmpeg to compress if needed.
- **autoplay v9 with old options:** `stopOnMouseEnter` and `stopOnInteraction` do NOT exist in v9. The project is on v8 — do not upgrade.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Carousel snap | Custom scroll + setInterval | embla + Autoplay v8 | Touch, keyboard, SSR edge cases |
| Marquee | JS-driven animation loop | CSS @keyframes translateX | GPU-composited, no JS overhead |
| Accordion FAQ | Custom show/hide toggle | ShadCN Collapsible (already installed) | Already present in codebase |
| Scroll reveals | window.addEventListener('scroll') | motion whileInView | Main-thread jank vs. IntersectionObserver |
| Video crossfade | Canvas API | Two `<video>` + opacity CSS transition | Much simpler, same visual result |
| SVG grayscale | Canvas pixel manipulation | CSS `filter: grayscale(1)` | One class |

**Key insight:** The marquee and snap carousel look similar but need different implementations. Embla for snap (needs slide boundaries), CSS keyframes for marquee (needs continuous linear motion). Using Embla for the marquee creates jarring loop restarts.

---

## Common Pitfalls

### Pitfall 1: Route Conflict at `/`

**What goes wrong:** After creating `app/page.tsx`, the old `app/(app)/page.tsx` still exists and both claim the `/` route → Next.js build error "conflicting paths."
**Why it happens:** Route groups don't change the URL path. Both files resolve to `/`.
**How to avoid:** Delete `app/(app)/page.tsx` before creating `app/page.tsx`. Do this atomically.
**Warning signs:** Next.js build output mentions "conflicting page paths" or dev server 500s on `/`.

### Pitfall 2: Missing `"use client"` on motion Components

**What goes wrong:** `motion.div` used in a Server Component → error "You're importing a component that needs useState" or similar RSC boundary error.
**Why it happens:** motion uses React hooks internally.
**How to avoid:** All motion usage goes in `SectionReveal` client wrapper. Server Components pass data as props to client section components.
**Warning signs:** Build error mentioning `useState`/`useEffect` in Server Components.

### Pitfall 3: Video Autoplay Blocked by Browser

**What goes wrong:** Video doesn't play on page load.
**Why it happens:** Browsers block autoplay with sound. Without `muted`, video won't autoplay.
**How to avoid:** Always include `autoPlay muted loop playsInline` — all four attributes. In React, `autoPlay` (camelCase) maps to the `autoplay` HTML attribute.
**Warning signs:** Video shows poster image but doesn't play.

### Pitfall 4: Embla Carousel SSR Flash

**What goes wrong:** Carousel renders full list of items on server then collapses/repositions client-side — visible layout shift.
**Why it happens:** Embla initializes on mount and hides non-visible slides.
**How to avoid:** Wrap carousel in `"use client"`. Existing `category-carousel.tsx` already does this correctly — follow the same pattern.

### Pitfall 5: Marquee Gap at Loop Point

**What goes wrong:** Visible "jump" when marquee resets.
**Why it happens:** Content width doesn't align with `translateX(-50%)` exactly, or gap between items isn't consistent.
**How to avoid:** Duplicate the entire array (`[...props, ...props]`), ensure gap is applied consistently inside the flex container, and the keyframe animates exactly `-50%`.

### Pitfall 6: next.config.ts Missing Video Domains

**What goes wrong:** If using externally hosted videos (e.g., Cloudflare R2), Next.js Image/Video component may block them.
**Why it happens:** `remotePatterns` is configured.
**How to avoid:** Store videos in `/public/videos/` — no remotePatterns needed for local assets. Already confirmed: picsum.photos, anvara.com patterns exist.

### Pitfall 7: Accordion Not Using Shared Open State

**What goes wrong:** Multiple accordion items open simultaneously, looking messy.
**Why it happens:** ShadCN `Collapsible` is uncontrolled by default — each instance manages its own open state.
**How to avoid:** Track `openIndex` state in parent `FaqSection` and pass controlled `open`/`onOpenChange` to each `Collapsible`. Only one open at a time.

---

## Code Examples

### Custom Tailwind v4 Animation (globals.css)

```css
/* Source: tailwindcss.com/docs/animation — verified */
@theme {
  --animate-marquee: marquee 30s linear infinite;
  --animate-fade-up: fade-up 0.6s ease-out forwards;

  @keyframes marquee {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }

  @keyframes fade-up {
    from { opacity: 0; transform: translateY(2rem); }
    to { opacity: 1; transform: translateY(0); }
  }
}
```

Usage in JSX: `className="animate-marquee"` and `className="animate-fade-up"`.

### motion Install and Import

```bash
npm install motion
```

```typescript
// Source: motion.dev — verified package is framer-motion v12 rebranded
import { motion } from "motion/react";  // modern import path
// OR (legacy, still works):
import { motion } from "framer-motion";
```

Both imports work identically — `motion` and `framer-motion` are the same package at v12. Use `motion/react` for the modern path.

### SectionReveal Component

```typescript
"use client";
import { motion } from "motion/react";

export function SectionReveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

### next.config.ts Update for Videos

No change needed — videos in `/public/videos/` are served as static assets without remotePatterns.

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `<marquee>` HTML element | CSS translateX keyframes | Deprecated ~2014 | Performance, control |
| Framer Motion + separate IntersectionObserver | motion whileInView (built-in IO) | Framer Motion v6 (~2021) | Simpler API |
| framer-motion package | motion package | 2024 rebranding | Same code, new name |
| Embla autoplay stopOnMouseEnter/stopOnInteraction | defaultInteraction option | v9 (2024) | **Breaking change** — v8 still uses old options |
| tailwind.config.js extend.keyframes | @theme @keyframes in CSS | Tailwind v4 (2025) | Config-free, CSS-first |

**Deprecated/outdated:**
- `embla-carousel-autoplay` v9 `stopOnMouseEnter` option: removed. Project is on v8 — do not upgrade.
- `tailwind.config.js` for keyframes: Tailwind v4 uses `@theme` block in CSS instead.

---

## Open Questions

1. **Video file availability**
   - What we know: Free clips available at pexels.com and coverr.co without attribution
   - What's unclear: Implementer must manually download and place 2-3 MP4 clips in `/public/videos/`
   - Recommendation: Plan should include a step for video sourcing. Plan can specify URLs to download from Pexels (e.g., search "sports action" → filter by duration <10s).

2. **Logo availability for non-simple-icons brands (LAFC, SXSW, ATP Tour, Serie A, We Belong Here)**
   - What we know: These are not in simple-icons; seeklogo.com and brandfetch.com have them
   - What's unclear: SVG quality and licensing on third-party sites
   - Recommendation: Store logos as inline SVG string constants in `lib/logos.ts`. Use `dangerouslySetInnerHTML` or convert to React components. Grayscale via `filter: grayscale(1)` neutralizes any license concern around color reproduction.

3. **ShadCN Accordion vs Collapsible for FAQ**
   - What we know: `Collapsible` is installed; `Accordion` is not
   - What's unclear: Whether to add `Accordion` (cleaner API) or build from `Collapsible`
   - Recommendation: Run `npx shadcn add accordion` — it uses the same Radix primitive and provides accordion exclusivity (one open at a time) out of the box. Simpler than wiring Collapsible manually.

---

## Sources

### Primary (HIGH confidence)
- Next.js 16.1.6 docs (`nextjs.org/docs/app/api-reference/file-conventions/route-groups`) — route group routing behavior verified
- Next.js 16.1.6 docs (`nextjs.org/docs/app/getting-started/layouts-and-pages`) — layout inheritance verified
- npm registry (`npm show motion version peerDependencies`) — motion v12.34.3, React 19 compatible confirmed
- Tailwind CSS docs (`tailwindcss.com/docs/animation`) — @theme @keyframes syntax verified
- Embla Carousel docs (`embla-carousel.com/plugins/autoplay/`) — v8 options confirmed
- Project source: `package.json` — embla-carousel-autoplay@8.6.0 confirmed

### Secondary (MEDIUM confidence)
- WebSearch + GitHub Discussion (`davidjerleke/embla-carousel #1080`) — v8 `stopOnMouseEnter`/`stopOnInteraction` confirmed; v9 removal confirmed
- WebSearch + motion.dev — whileInView API, viewport options, import path
- WebSearch + tailwindcss.com — Tailwind v4 animation patterns

### Tertiary (LOW confidence)
- WebSearch: Pexels, Coverr as free sports video sources — confirmed royalty-free but specific clip quality not verified
- WebSearch: simple-icons brand list — gopuff, Coca-Cola, Snapchat, McDonald's, Mastercard, TikTok, LEGO, Ally confirmed; Kalshi, Brex, LAFC, ATP Tour status uncertain

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all installed packages verified from package.json; motion version verified from npm registry
- Architecture patterns: HIGH — routing verified from Next.js official docs; carousel patterns follow existing project usage
- Animation choices: MEDIUM — motion whileInView verified as valid API; easing curves are Claude's discretion
- Pitfalls: HIGH — v8/v9 embla breaking change verified from GitHub discussion; routing conflict is deterministic Next.js behavior
- Logo sourcing: LOW — brand availability on third-party sites not fully verified

**Research date:** 2026-02-21
**Valid until:** 2026-03-21 (motion API stable, embla v8 API stable — no imminent breaking changes expected)
