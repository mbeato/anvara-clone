# Phase 02: Layout Shell - Research

**Researched:** 2026-02-21
**Domain:** Next.js App Router shell layout — ShadCN Sidebar, dark mode, breadcrumbs, header, footer
**Confidence:** HIGH

---

<user_constraints>

## User Constraints (from CONTEXT.md)

### Locked Decisions

**Sidebar navigation**
- Match current Anvara nav items (Marketplace, Campaigns, Messages, Settings, etc.)
- Collapsed by default (icons only) — slim sidebar maximizes content area
- Anvara logo mark at the top of the sidebar, acts as home link
- Active page indicated with highlighted icon + vertical accent bar on left edge
- Expand behavior: Claude's discretion (hover, click, or stays collapsed)

**Header bar**
- Left: Page breadcrumb showing current location
- Center: Search bar — basic client-side filter that filters properties by name on browse page
- Right: Hardcoded demo user — static avatar image + name like "Demo Advertiser"
- Bell icon with static mock notification badge (e.g., "3") for realism

**Visual identity**
- Inspired by Anvara brand colors but with creative liberties — show what the product COULD look like
- Light/dark mode toggle in the header bar (near user avatar area)
- Default to light mode on first visit
- Dark mode theme follows same brand palette, adapted for dark surfaces

**Footer**
- Subtle inline text at bottom of content area (not a distinct bar)
- Scrolls with content (not sticky)
- "Prototype by Max Beato" attribution
- Tech stack mention: Next.js, Prisma, Vercel
- Links: LinkedIn + GitHub

### Claude's Discretion

- Sidebar expand/collapse interaction pattern (hover vs click vs always collapsed)
- Exact Anvara brand color values and their dark mode adaptations
- Header bar height and spacing
- Search bar placeholder text and styling
- Avatar image source for demo user
- Notification badge positioning
- Footer typography and link styling
- Dark mode persistence mechanism (localStorage vs cookie)

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope

</user_constraints>

---

## Summary

This phase builds the root layout shell that every subsequent page renders inside. The work covers three interconnected concerns: (1) the icon-collapsed left sidebar using ShadCN's `sidebar` component with `collapsible="icon"`, (2) the header bar with breadcrumbs, search, and user area, and (3) a dark mode system wired through `next-themes`.

The standard approach for this exact stack (Next.js App Router + Tailwind v4 + ShadCN) is well-established: `next-themes` as the `ThemeProvider` with `attribute="class"`, the existing `@custom-variant dark` in `globals.css` already aligned for class-based toggling, and ShadCN's sidebar block (`sidebar-07`) as the structural foundation. All three tools are already in `package.json` or trivially installable with one npm command.

The most important architectural decision is where `SidebarProvider` lives. It must wrap all app routes and must be a Client Component boundary, meaning it belongs in a dedicated `app/(app)/layout.tsx` — NOT in the root `app/layout.tsx` which serves SSR metadata and font setup. This nested layout pattern keeps the root clean and lets the shell apply only to authenticated/dashboard routes.

**Primary recommendation:** Install `next-themes`, add sidebar/breadcrumb/avatar ShadCN components via CLI, then build from the `sidebar-07` block pattern with `defaultOpen={false}` and `collapsible="icon"`.

---

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `next-themes` | 0.4.6 | Dark mode ThemeProvider, localStorage persistence | Official ShadCN recommendation; no-flash SSR; 2346 npm dependents |
| `shadcn sidebar` | bundled with shadcn 3.x | Collapsible sidebar primitive, `SidebarProvider` context | Built into the stack; handles mobile sheet, tooltip, cookie state |
| `lucide-react` | 0.575.0 (already installed) | Icons for nav items, bell, search, toggle | Already in `package.json`; ShadCN's official icon library |
| `next/navigation` `usePathname` | Next.js 16.1.6 | Active route detection for sidebar highlights | Framework built-in, no install needed |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `shadcn breadcrumb` | bundled | Header breadcrumb component | Added via `npx shadcn add breadcrumb` |
| `shadcn avatar` | bundled | Demo user avatar in header | Added via `npx shadcn add avatar` |
| `shadcn separator` | bundled | Visual dividers in header and sidebar | Added alongside breadcrumb |
| `shadcn dropdown-menu` | bundled | User menu dropdown (future extensibility) | Added via CLI with sidebar-07 |
| `shadcn tooltip` | bundled | Tooltips on icon-only sidebar items | Required by sidebar component |
| `shadcn sheet` | bundled | Mobile sidebar drawer | Required by sidebar component |
| `shadcn skeleton` | bundled | Loading states in sidebar | Required by sidebar component |
| `shadcn collapsible` | bundled | Collapsible nav groups | Required by sidebar-07 block |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| `next-themes` | Manual localStorage + `useEffect` | next-themes handles SSR no-flash injection automatically; manual approach always flashes on refresh |
| ShadCN sidebar | Custom CSS sidebar | ShadCN sidebar already ships with `--sidebar-*` CSS vars wired into `globals.css` (confirmed present); re-implementing is wasted effort |
| `collapsible="icon"` (click to toggle) | Hover expand | Click is more accessible, standard in B2B tools (Linear, Notion), avoids accidental expansion |

### Installation

```bash
npm install next-themes
npx shadcn add sidebar breadcrumb separator avatar dropdown-menu tooltip sheet skeleton collapsible
```

Note: `sidebar-07` block can be scaffolded for reference but should be adapted rather than adopted wholesale:
```bash
npx shadcn add sidebar-07
```

---

## Architecture Patterns

### Recommended Project Structure

```
app/
├── layout.tsx              # Root layout: html/body, Inter font, ThemeProvider, metadata
├── globals.css             # Already exists — Tailwind v4, ShadCN vars, dark variant
├── (app)/                  # Route group: all dashboard pages
│   ├── layout.tsx          # App shell layout: SidebarProvider + AppSidebar + SidebarInset
│   └── page.tsx            # Redirect or dashboard home (replace current app/page.tsx)
components/
├── theme-provider.tsx      # Client wrapper around next-themes ThemeProvider
├── app-sidebar.tsx         # AppSidebar component (uses useSidebar, usePathname)
├── sidebar-nav.tsx         # Nav item data + rendering (Marketplace, Campaigns, etc.)
├── header-bar.tsx          # Header with breadcrumb, search, user area
├── mode-toggle.tsx         # Light/dark toggle button (mounted check for hydration)
└── ui/                     # ShadCN primitives added by CLI
```

The route group `(app)/` is a folder naming convention in Next.js App Router. The parentheses exclude it from the URL path, so `app/(app)/page.tsx` serves `/` and `app/(app)/browse/page.tsx` serves `/browse`.

### Pattern 1: Root Layout with ThemeProvider

The `app/layout.tsx` stays minimal — it provides font, metadata, and the ThemeProvider. `suppressHydrationWarning` on `<html>` is required.

```typescript
// app/layout.tsx
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], display: "swap" })

export const metadata: Metadata = { ... }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

Source: ShadCN dark mode docs (https://ui.shadcn.com/docs/dark-mode/next), next-themes GitHub

### Pattern 2: App Shell Layout (Nested)

The `app/(app)/layout.tsx` is the shell. `SidebarProvider` and `SidebarInset` must both live here.

```typescript
// app/(app)/layout.tsx
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { HeaderBar } from "@/components/header-bar"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <SidebarInset>
        <HeaderBar />
        <main className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {children}
        </main>
        <footer className="px-4 py-6 text-xs text-muted-foreground">
          Prototype by Max Beato · Built with Next.js, Prisma, Vercel ·{" "}
          <a href="https://linkedin.com/in/..." className="underline underline-offset-2">LinkedIn</a>{" "}
          <a href="https://github.com/..." className="underline underline-offset-2">GitHub</a>
        </footer>
      </SidebarInset>
    </SidebarProvider>
  )
}
```

### Pattern 3: Sidebar with collapsible="icon" and defaultOpen={false}

```typescript
// components/app-sidebar.tsx
"use client"

import { usePathname } from "next/navigation"
import { Store, Megaphone, MessageSquare, Settings, LayoutDashboard } from "lucide-react"
import {
  Sidebar, SidebarContent, SidebarHeader, SidebarMenu,
  SidebarMenuItem, SidebarMenuButton, SidebarRail,
} from "@/components/ui/sidebar"

const navItems = [
  { title: "Marketplace",  href: "/browse",    icon: Store },
  { title: "Campaigns",    href: "/campaigns", icon: Megaphone },
  { title: "Messages",     href: "/messages",  icon: MessageSquare },
  { title: "Settings",     href: "/settings",  icon: Settings },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        {/* Logo — acts as home link */}
        <a href="/" className="flex items-center justify-center p-2">
          <img src="/icon.svg" alt="Anvara" className="h-6 w-6" />
        </a>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href || pathname.startsWith(item.href + "/")}
                tooltip={item.title}
              >
                <a href={item.href}>
                  <item.icon />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
```

Source: ShadCN sidebar component source (via `npx shadcn view sidebar`), sidebar-07 block

### Pattern 4: ThemeProvider Client Wrapper

```typescript
// components/theme-provider.tsx
"use client"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ComponentProps } from "react"

export function ThemeProvider({ children, ...props }: ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
```

### Pattern 5: ModeToggle (hydration-safe)

```typescript
// components/mode-toggle.tsx
"use client"
import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ModeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  useEffect(() => setMounted(true), [])
  if (!mounted) return <div className="size-9" /> // stable SSR placeholder

  return (
    <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </Button>
  )
}
```

Source: next-themes GitHub README pattern

### Pattern 6: Breadcrumb from pathname

```typescript
// Inside HeaderBar (client component)
"use client"
import { usePathname } from "next/navigation"
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink,
  BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

const LABELS: Record<string, string> = {
  browse: "Marketplace",
  campaigns: "Campaigns",
  messages: "Messages",
  settings: "Settings",
}

export function HeaderBar() {
  const pathname = usePathname()
  const segments = pathname.split("/").filter(Boolean)
  // Map first segment to label, subsequent segments as sub-pages
  ...
}
```

### Anti-Patterns to Avoid

- **`SidebarProvider` in `app/layout.tsx`:** It requires `"use client"` which would make the root layout a client component, blocking RSC data fetching at the root level. Use the `(app)/layout.tsx` route group.
- **Rendering `useTheme` output on the server without mounted check:** Causes React hydration mismatch errors. Always gate theme-dependent JSX behind `if (!mounted) return placeholder`.
- **Setting `defaultTheme="system"` when "default to light mode" is required:** Use `defaultTheme="light"` explicitly. System default would respect OS dark mode, overriding the user decision.
- **Using `attribute="data-theme"` with existing `@custom-variant dark (&:is(.dark *))`:** The existing `globals.css` uses the `.dark` class selector. `next-themes` must be configured with `attribute="class"` to match — otherwise dark styles never apply.
- **Hardcoding active state:** Always derive from `usePathname()`, never a hardcoded prop, so navigation works without additional code in each page.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Dark mode with no flash | `useEffect` + localStorage + class toggle | `next-themes` ThemeProvider | next-themes injects a blocking `<script>` before paint to prevent flash; manual approaches always flash on hard refresh |
| Icon-only collapsed sidebar | Custom CSS sidebar with width transitions | ShadCN `sidebar` with `collapsible="icon"` | The component handles the `--sidebar-width-icon` CSS variable, mobile Sheet fallback, keyboard shortcut (⌘B), and cookie persistence automatically |
| Tooltip on collapsed nav items | Custom tooltip component | ShadCN `SidebarMenuButton` `tooltip` prop | `SidebarMenuButton` already integrates `TooltipProvider` and auto-hides when sidebar is expanded |
| Active link detection | Manually tracking current route in state | `usePathname()` from `next/navigation` | Framework primitive, updates on every route change, no state management needed |
| Notification badge | Custom badge element | ShadCN `Badge` or inline `<span>` | Simple enough for inline, but don't use a custom absolute positioning solution that breaks on font size changes |

**Key insight:** Every custom solution in this domain has a hidden edge case (mobile, SSR, keyboard navigation, animation timing). The ShadCN sidebar component exists precisely because these cases compound.

---

## Common Pitfalls

### Pitfall 1: Dark Mode Flash on Hard Refresh

**What goes wrong:** The page renders in light mode for 100-300ms, then snaps to dark mode when JavaScript loads.
**Why it happens:** CSS classes on `<html>` are set by JavaScript after hydration, but the initial HTML is rendered without them.
**How to avoid:** Use `next-themes` ThemeProvider. It injects a blocking inline `<script>` into `<head>` that sets the class synchronously before the browser paints.
**Warning signs:** If you see a white flash when reloading in dark mode, the ThemeProvider is not wrapping the root correctly or `attribute="class"` is missing.

### Pitfall 2: Tailwind v4 Dark Variant Mismatch

**What goes wrong:** Dark mode Tailwind classes (`dark:bg-card`, etc.) never apply even when `.dark` is on `<html>`.
**Why it happens:** Tailwind v4 removed `darkMode: "class"` from JS config. The CSS-first equivalent `@custom-variant dark` must match the actual selector applied by next-themes.
**How to avoid:** The existing `globals.css` has `@custom-variant dark (&:is(.dark *))` which matches `attribute="class"` in ThemeProvider. These must stay aligned.
**Warning signs:** `dark:*` classes have no effect despite `.dark` being on `<html>`.

### Pitfall 3: SidebarProvider Placed in Root Layout

**What goes wrong:** The root layout becomes a Client Component, breaking server-side data fetching for all nested pages.
**Why it happens:** `SidebarProvider` uses `useState` and `useEffect`, requiring `"use client"`.
**How to avoid:** Place `SidebarProvider` in `app/(app)/layout.tsx`, not `app/layout.tsx`. The route group `(app)` wraps all dashboard routes without affecting the URL.
**Warning signs:** Build error "You're importing a component that needs `useState`. This component only works in a Client Component."

### Pitfall 4: Hydration Mismatch in Theme Toggle

**What goes wrong:** React throws a hydration error — the server renders one icon (Sun), client renders another (Moon).
**Why it happens:** `useTheme()` returns `undefined` on the server, so the theme-conditional render produces different output.
**How to avoid:** Use the `mounted` pattern: render a placeholder `<div className="size-9" />` until `useEffect` fires.
**Warning signs:** Console error: "Hydration failed because the initial UI does not match what was rendered on the server."

### Pitfall 5: Active Nav Highlight Not Updating on Navigation

**What goes wrong:** Clicking sidebar links changes the URL but the active highlight stays on the old item.
**Why it happens:** The sidebar is a Client Component that doesn't re-evaluate `isActive` on navigation.
**How to avoid:** `usePathname()` from `next/navigation` re-renders when the route changes — use it as the source of truth for `isActive` rather than any static prop.
**Warning signs:** After clicking "Campaigns" the sidebar still shows "Marketplace" highlighted.

### Pitfall 6: Sidebar Cookie vs. defaultOpen Conflict

**What goes wrong:** Sidebar starts expanded even when `defaultOpen={false}` is set.
**Why it happens:** ShadCN's sidebar component automatically saves state to a cookie (`sidebar_state`). If the user ever expanded the sidebar, the cookie overrides `defaultOpen`.
**How to avoid:** For a prototype where "collapsed by default" is a hard requirement, either (a) clear the cookie on load, or (b) read the cookie server-side and pass it to `SidebarProvider` as a controlled `open` prop. The simpler option for this phase: accept the cookie behavior as a feature — once the user collapses it, the state persists correctly.
**Warning signs:** Sidebar renders expanded on first load despite `defaultOpen={false}`.

---

## Code Examples

### ShadCN Sidebar Install Command (verified)

```bash
# Source: npx shadcn view sidebar (confirmed output)
npx shadcn add sidebar
# Installs: sidebar.tsx, use-mobile.tsx hook, button, separator, sheet, tooltip, input, skeleton
```

### Sidebar with collapsible="icon" (from sidebar-07 block)

```typescript
// Source: npx shadcn view sidebar-07
<Sidebar collapsible="icon" {...props}>
  <SidebarHeader>...</SidebarHeader>
  <SidebarContent>
    <NavMain items={data.navMain} />
  </SidebarContent>
  <SidebarFooter>...</SidebarFooter>
  <SidebarRail />
</Sidebar>
```

### SidebarMenuButton with tooltip (from sidebar component source)

```typescript
// Source: npx shadcn view sidebar (sidebar.tsx source)
// The tooltip prop is built-in to SidebarMenuButton
// It auto-hides when state !== "collapsed" || isMobile
<SidebarMenuButton
  asChild
  isActive={pathname === item.href}
  tooltip={item.title}        // string or TooltipContent props
>
  <a href={item.href}>
    <item.icon />
    <span>{item.title}</span>
  </a>
</SidebarMenuButton>
```

### Active state styling (from sidebar component source)

```typescript
// Source: sidebarMenuButtonVariants in sidebar.tsx
// data-[active=true] applies:
//   bg-sidebar-accent, font-medium, text-sidebar-accent-foreground
// The isActive prop sets data-active={isActive} on the button element
// For vertical accent bar on left edge, add custom className:
<SidebarMenuButton
  isActive={isActive}
  className="relative data-[active=true]:before:absolute data-[active=true]:before:left-0 data-[active=true]:before:inset-y-1 data-[active=true]:before:w-[2px] data-[active=true]:before:bg-primary data-[active=true]:before:rounded-full"
>
```

### next-themes ThemeProvider (verified against official docs)

```typescript
// Source: https://ui.shadcn.com/docs/dark-mode/next
<ThemeProvider
  attribute="class"
  defaultTheme="light"       // user decision: default to light
  disableTransitionOnChange  // prevents flash during switch
>
  {children}
</ThemeProvider>
```

### Anvara Brand Colors (research from anvara.com)

Primary accent blue: `#2346f9` / `#2378f9`
Secondary accent purple: `#673ae4`
Dark background: `#0a0a0a`
Dark text: `#1b1b1c`
Light background: `#f7f7f7` / `#fafafa`

Recommended OKLCH translations for CSS vars:
- Primary: `oklch(0.45 0.27 264)` (deep blue, close to `#2346f9`)
- Sidebar in dark: `oklch(0.16 0 0)` (near `#1b1b1c`)
- Keep neutral grays from existing ShadCN `globals.css` as base, override `--primary` with brand blue

### Demo user avatar via picsum.photos (already in next.config.ts allowlist)

```typescript
// next.config.ts already permits: { protocol: "https", hostname: "picsum.photos" }
const DEMO_USER = {
  name: "Demo Advertiser",
  avatar: "https://picsum.photos/seed/demo/40/40",  // deterministic seed
}
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `tailwind.config.js` `darkMode: "class"` | `@custom-variant dark (&:is(.dark *))` in CSS | Tailwind v4 (stable Feb 2025) | Config file gone; CSS-first; already set in this project |
| Next.js `_app.tsx` layout wrapping | App Router nested layouts with `(route-group)/layout.tsx` | Next.js 13 (stable) | Shell layout is a server component wrapping client providers |
| Custom sidebar CSS with width transition | ShadCN `sidebar` with `collapsible="icon"` | ShadCN Nov 2024 | Handles mobile, tooltips, cookies, keyboard shortcut automatically |
| `useRouter().pathname` | `usePathname()` from `next/navigation` | Next.js 13 | `useRouter` deprecated for this use case in App Router |

**Deprecated/outdated:**
- `pages/_app.tsx` layout: Do not use — this is an App Router project.
- `tailwind.config.js` darkMode config: Does not exist in v4.
- `next/router` for pathname: Use `next/navigation`.

---

## Open Questions

1. **Active nav accent bar styling**
   - What we know: ShadCN's `isActive` prop applies `bg-sidebar-accent` background. The design calls for a "vertical accent bar on left edge" in addition to or instead of the background highlight.
   - What's unclear: Whether the custom `before:` pseudo-element approach conflicts with ShadCN's collapsible icon width (`group-data-[collapsible=icon]:size-8!`).
   - Recommendation: Implement with `before:` pseudo via `className` override. Test in both expanded and collapsed states. The `size-8!` override applies to padding/size, not pseudo-elements.

2. **Sidebar expand interaction: hover vs click**
   - What we know: ShadCN's default is click-to-toggle via `SidebarTrigger` or `SidebarRail`. Hover expand is not built in — it requires `onMouseEnter`/`onMouseLeave` on the `SidebarProvider`.
   - Recommendation: Use **click to toggle** via the built-in `SidebarRail` component. This is the Linear/Notion standard, accessible, and requires zero custom code. The `SidebarRail` renders a thin clickable rail on the sidebar edge.

3. **Search bar scope in header**
   - What we know: The search should "filter properties by name on browse page." This requires state that bridges the header and the browse page content.
   - What's unclear: Whether to use URL search params (`/browse?q=...`) or in-memory state via a React context.
   - Recommendation: URL search params. The header's search input updates `?q=` via `useRouter().push()`, and the browse page reads it with `useSearchParams()`. This makes the filtered state bookmarkable and shareable. Implement this in Phase 3 when the browse page exists; for Phase 2, just build the search input UI as a static element.

---

## Sources

### Primary (HIGH confidence)

- `npx shadcn view sidebar` — full sidebar.tsx source, confirmed component API and CSS variable integration
- `npx shadcn view sidebar-07` — full block source including nav-main.tsx, app-sidebar.tsx, page.tsx patterns
- `https://ui.shadcn.com/docs/dark-mode/next` — ShadCN official dark mode setup for Next.js
- `https://nextjs.org/docs/app/api-reference/functions/use-pathname` — usePathname official docs, version 16.1.6 (matches installed version)
- `https://tailwindcss.com/docs/dark-mode` — Tailwind v4 `@custom-variant` dark mode configuration
- `/Users/vtx/anv/app/globals.css` — confirmed `@custom-variant dark (&:is(.dark *))` already present
- `/Users/vtx/anv/package.json` — confirmed installed versions: next 16.1.6, lucide-react 0.575.0, shadcn 3.8.5

### Secondary (MEDIUM confidence)

- `https://iifx.dev/en/articles/456423217/solved-enabling-class-based-dark-mode-with-next-15-next-themes-and-tailwind-4` — verified working pattern for next-themes + Tailwind v4 `attribute="class"` alignment
- `https://github.com/pacocoursey/next-themes` — ThemeProvider API, suppressHydrationWarning requirement, mounted pattern
- `https://www.anvara.com/` — brand color palette extracted: `#2346f9` primary blue, `#673ae4` secondary purple

### Tertiary (LOW confidence)

- WebSearch result: next-themes version 0.4.6 as latest — not directly verified against npm registry, treat as approximate

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all libraries verified against installed `package.json` and official docs
- Architecture patterns: HIGH — verified against Next.js 16.1.6 docs and ShadCN component source
- Pitfalls: HIGH — cross-referenced against official docs and known Tailwind v4 breaking changes
- Brand colors: MEDIUM — extracted from live anvara.com CSS, but prototype has creative latitude

**Research date:** 2026-02-21
**Valid until:** 2026-03-23 (30 days — stable libraries, unlikely to change)
