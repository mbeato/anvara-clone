# Phase 5: Messaging - Research

**Researched:** 2026-02-21
**Domain:** Next.js 16 App Router, Vercel AI SDK, OpenAI o3-mini, Prisma messaging queries, React useOptimistic
**Confidence:** HIGH (core stack verified via official docs; AI SDK patterns verified via ai-sdk.dev; Next.js patterns from nextjs.org version 16.1.6 docs)

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Inbox layout**
- Two-panel split — thread list on left, active conversation on right (Gmail/Slack style)
- Thread previews show: property image thumbnail, property name, last message snippet, timestamp, and offer status badge if active
- Unread threads indicated by bold text + colored dot badge
- Threads sorted by most recent message first

**Conversation view**
- Chat bubbles — advertiser messages on right (blue), property messages on left (gray), iMessage/WhatsApp style
- Small timestamp below each bubble (e.g., "2:34 PM")
- Conversation header shows property name + category + clickable link to property detail page
- Message input pinned to bottom of conversation panel — always visible, conversation scrolls above

**AI response behavior**
- Typing indicator animation + 2-4 second delay before AI response appears
- One-time banner at top of conversation: "Responses are AI-simulated for demo purposes" — no per-message badges
- Professional and knowledgeable tone — sounds like a real sponsorship sales rep who knows the property details
- On API failure: show error message inline in thread ("Couldn't generate response. Try again.")

**Offer form design**
- Inline expansion within the thread — no modal overlay, feels native to the chat flow
- Fields: dollar amount, tier selection (from property's tiers), optional message to property
- Submitted offer renders as a structured card in thread with amount, tier name, and status badge (Pending/Accepted/Declined)
- AI responds specifically to offers — acknowledges the offer referencing the tier and amount

### Claude's Discretion
- Exact bubble colors and spacing
- Typing indicator animation style
- Thread list empty state (if needed)
- How the inline offer form animates open/closed
- Error state styling

### Deferred Ideas (OUT OF SCOPE)
None — discussion stayed within phase scope
</user_constraints>

---

## Summary

Phase 5 builds the messaging inbox — a two-panel split UI where the advertiser reads pre-seeded thread conversations, sends messages that get AI-simulated responses via o3-mini, and can submit inline "Make an Offer" forms within a thread.

The technical domain spans three distinct concerns: (1) the inbox/conversation UI built with React client components using URL search params for thread selection and `useOptimistic` for immediate message display; (2) a Next.js App Router API route that calls the Vercel AI SDK's `generateText` with o3-mini to produce AI replies and persists them via Prisma; (3) the inline offer form, which reuses the data model already established in Phase 3 (`createOffer` server action + Thread/Offer schema) but renders as an expandable inline panel instead of a modal.

The critical new dependency is the Vercel AI SDK (`ai` + `@ai-sdk/openai`). No other new libraries are needed — the project already has Prisma, shadcn/ui components (Badge, Input, Button, Skeleton, Card), Tailwind CSS v4, and the `getThreads`/`getThread` data functions in `lib/data/index.ts`. The Phase 3 `createOffer` server action already exists in `app/actions/offer.ts` and creates a Thread+Message+Offer atomically — the messaging phase must NOT recreate this logic, only extend it with a new sendMessage server action.

**Primary recommendation:** Install `ai` and `@ai-sdk/openai`, create `app/api/chat/route.ts` for AI generation, build a single client-component `MessagingClient` that manages thread selection via `useSearchParams`/`router.push`, and use `useOptimistic` for instant message display while the API route runs.

---

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `ai` (Vercel AI SDK) | latest (5.x as of 2026) | generateText, streamText for AI responses | Official Vercel/Next.js AI library; direct OpenAI integration |
| `@ai-sdk/openai` | >=1.1.9 required for o3-mini | OpenAI provider for AI SDK | Official provider; required for o3-mini model ID |
| `prisma` / `@prisma/client` | 7.4.1 (already installed) | Thread, Message, Offer CRUD | Already in project |
| `@prisma/adapter-neon` | 7.4.1 (already installed) | Neon serverless HTTP driver | Already in project — required pattern |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `next/navigation` (useSearchParams, useRouter) | 16.1.6 (already) | Thread selection via URL query params | Thread switching in two-panel layout |
| React `useOptimistic` | React 19 (already installed) | Show advertiser message immediately before server confirms | Message send UX |
| `lucide-react` | already installed | Send icon, chevron icons, status icons | Button icons |
| shadcn Badge, Input, Button, Card, Skeleton | already installed | Thread list, message input, offer card, loading states | All UI |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Vercel AI SDK `generateText` | Raw `fetch` to OpenAI API | SDK handles retry, error normalization, timeout; raw fetch is more fragile |
| URL searchParams for thread selection | React state (`useState`) | URL approach is bookmarkable, survives refresh, no prop-drilling; state loses selection on refresh |
| `useOptimistic` | Local `useState` for messages | `useOptimistic` auto-reverts on failure; state approach requires manual rollback |

**Installation:**
```bash
npm install ai @ai-sdk/openai
```

---

## Architecture Patterns

### Recommended Project Structure

```
app/
├── (app)/
│   └── messages/
│       ├── page.tsx                  # RSC — fetches all threads, renders MessagingClient
│       └── loading.tsx               # Skeleton for the two-panel layout
├── api/
│   └── chat/
│       └── route.ts                  # POST handler — calls generateText(o3-mini), saves AI message to DB
app/
└── actions/
    ├── offer.ts                       # ALREADY EXISTS — createOffer (Thread+Message+Offer)
    └── message.ts                     # NEW — sendMessage server action (saves advertiser message)
components/
└── messaging/
    ├── messaging-client.tsx           # "use client" — two-panel orchestrator, thread selection
    ├── thread-list.tsx                # Thread list panel (left)
    ├── thread-list-item.tsx           # Individual thread preview row
    ├── conversation-view.tsx          # Right panel — messages + input
    ├── message-bubble.tsx             # Single chat bubble (left/right variant)
    ├── typing-indicator.tsx           # Three-dot bounce animation
    ├── offer-card.tsx                 # Structured offer card rendered in thread
    └── inline-offer-form.tsx          # Expandable inline offer form
lib/
└── data/
    └── index.ts                       # ALREADY HAS getThreads() and getThread()
```

### Pattern 1: RSC Page + Client Orchestrator

The page is a React Server Component that fetches all threads and passes them to a `"use client"` MessagingClient. This is the same pattern as `browse/page.tsx` → `BrowseClient`.

```typescript
// app/(app)/messages/page.tsx
import { getThreads } from "@/lib/data"
import { MessagingClient } from "@/components/messaging/messaging-client"

export default async function MessagesPage({
  searchParams,
}: {
  searchParams: Promise<{ thread?: string }>
}) {
  const params = await searchParams
  const threads = await getThreads()
  return <MessagingClient threads={threads} initialThreadId={params.thread} />
}
```

**Why:** Threads are loaded server-side (no loading spinner for initial list). Client component handles interactivity (thread selection, message sending, AI trigger).

### Pattern 2: Thread Selection via URL Search Params

```typescript
// components/messaging/messaging-client.tsx
"use client"
import { useSearchParams, useRouter } from "next/navigation"

export function MessagingClient({ threads, initialThreadId }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const activeThreadId = searchParams.get("thread") ?? initialThreadId ?? threads[0]?.id

  function selectThread(threadId: string) {
    const params = new URLSearchParams()
    params.set("thread", threadId)
    router.push(`/messages?${params.toString()}`)
  }

  // ...
}
```

**Why:** Matches the existing `BrowseClient` pattern that uses `router.push` with URLSearchParams. Thread selection survives page refresh. No Suspense boundary issues in Next.js 16 since the page is dynamic.

### Pattern 3: useOptimistic for Message Send

```typescript
"use client"
import { useOptimistic, startTransition } from "react"

// In ConversationView:
const [optimisticMessages, addOptimisticMessage] = useOptimistic(
  messages,
  (currentMessages, newMessage) => [...currentMessages, newMessage]
)

async function handleSend(content: string) {
  const tempMsg = {
    id: `temp-${Date.now()}`,
    content,
    sender: "advertiser",
    isAI: false,
    createdAt: new Date(),
    threadId,
  }
  startTransition(async () => {
    addOptimisticMessage(tempMsg)
    await sendMessage(threadId, content)    // server action — saves to DB
    // then trigger AI response via fetch to /api/chat
  })
}
```

**Why:** React 19's `useOptimistic` is already available (React 19.2.3 installed). Message appears instantly; auto-reverts if `sendMessage` fails.

### Pattern 4: AI Response via API Route

The AI response flow is a two-step process:
1. `sendMessage` server action saves the advertiser message to DB
2. Client then calls `POST /api/chat` with thread context to get AI reply
3. Route handler saves the AI reply to DB and returns it

```typescript
// app/api/chat/route.ts
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import prisma from "@/lib/prisma"

export const maxDuration = 60  // o3-mini can take time

export async function POST(req: Request) {
  const { threadId, propertyContext } = await req.json()

  // Fetch full thread with messages for context
  const thread = await prisma.thread.findUnique({
    where: { id: threadId },
    include: {
      messages: { orderBy: { createdAt: "asc" } },
      property: { include: { packages: true } },
    },
  })

  if (!thread) return Response.json({ error: "Thread not found" }, { status: 404 })

  // Build messages array for o3-mini
  const aiMessages = thread.messages.map((m) => ({
    role: m.sender === "advertiser" ? "user" : "assistant",
    content: m.content,
  }))

  const { text } = await generateText({
    model: openai("o3-mini"),
    system: buildSystemPrompt(thread.property),
    messages: aiMessages,
  })

  // Save AI reply to DB
  const aiMessage = await prisma.message.create({
    data: {
      threadId,
      content: text,
      sender: "property",
      isAI: true,
    },
  })

  return Response.json({ message: aiMessage })
}
```

**Why:** `generateText` (not `streamText`) because the design shows a typing indicator for 2-4 seconds then full message appears — no partial streaming needed. The client shows the indicator, awaits the full response, then renders it.

### Pattern 5: Typing Indicator Animation

Three-dot bounce using Tailwind's built-in `animate-bounce` with staggered delays:

```tsx
// components/messaging/typing-indicator.tsx
export function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:-0.3s]" />
      <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:-0.15s]" />
      <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" />
    </div>
  )
}
```

**Why:** Pure Tailwind, no external library. Uses arbitrary animation-delay values (Tailwind v4 supports bracket notation). Matches iMessage/WhatsApp aesthetic.

### Pattern 6: Inline Offer Form

The Phase 3 `createOffer` server action already exists at `app/actions/offer.ts`. For Phase 5, the inline offer form calls this same action but must pass a `packageId` (tier selection) instead of free-text `terms`. The existing action signature is `createOffer(propertyId, amount, terms)` — the messaging phase reuses this with the tier name included in `terms`, OR extends it minimally.

The inline form expands in-thread via conditional rendering (boolean state), NOT a modal:

```tsx
// In ConversationView — "Make an Offer" button toggles form
{showOfferForm && (
  <div className="border rounded-lg p-4 my-3 bg-muted/30">
    <InlineOfferForm
      propertyId={property.id}
      packages={property.packages}
      onSubmit={handleOfferSubmit}
      onCancel={() => setShowOfferForm(false)}
    />
  </div>
)}
```

### Anti-Patterns to Avoid

- **Calling Prisma directly in a client component:** All DB access must go through server actions or API route handlers.
- **Streaming o3-mini response without the typing indicator delay:** The UI calls for a deliberate 2-4 second delay showing the indicator, then full response. Don't use `streamText` and render chunks — use `generateText` and show the indicator while awaiting.
- **Calling the OpenAI API via server action instead of API route:** Server actions don't support returning streaming data and are sequentialized. Use the API route for the AI call.
- **Defining `useSearchParams` in a page-level RSC:** `useSearchParams` is client-only. The page RSC reads `searchParams` prop; the client component uses `useSearchParams`.
- **Re-seeding threads on every page load:** Threads are seeded once via `prisma db seed`. The page just queries existing threads.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| OpenAI API call with retries | Custom fetch + retry logic | `generateText` from `ai` SDK | SDK handles auth, retries, error normalization, timeout, model-specific quirks |
| Optimistic message display | Manual useState + rollback | `useOptimistic` from React 19 | Built-in revert on failure; works with startTransition |
| Thread data queries | Custom SQL | `getThreads()`/`getThread()` already in `lib/data/index.ts` | Already built with correct includes |
| Typing indicator animation | Custom CSS keyframes | Tailwind `animate-bounce` + delay | Zero additional code |
| Offer creation | New DB logic | `createOffer` in `app/actions/offer.ts` | Already exists from Phase 3 |

**Key insight:** The data layer (Prisma schema, seed, queries, `createOffer`) and UI primitives (Badge, Input, Button, Skeleton, Card) are all already in place. Phase 5's new code is primarily UI composition and the AI API route.

---

## Common Pitfalls

### Pitfall 1: o3-mini Requires AI SDK >= 1.1.9 for @ai-sdk/openai

**What goes wrong:** Using an older version of `@ai-sdk/openai` with model ID `"o3-mini"` throws a model-not-found error.
**Why it happens:** o3-mini support was added in @ai-sdk/openai 1.1.9.
**How to avoid:** `npm install @ai-sdk/openai` installs latest which is >=1.1.9. Verify with `npm ls @ai-sdk/openai`.
**Warning signs:** 404 or model validation error from OpenAI API.

### Pitfall 2: maxDuration on API Route

**What goes wrong:** Next.js default function timeout (10s on Vercel free tier) terminates the o3-mini call before it completes.
**Why it happens:** o3-mini does internal reasoning that can take 10-30 seconds.
**How to avoid:** Export `export const maxDuration = 60` at the top of `app/api/chat/route.ts`.
**Warning signs:** Route returns 504 or times out with no response.

### Pitfall 3: useSearchParams Requires Suspense in Static Pages

**What goes wrong:** Build fails with "useSearchParams() requires a Suspense boundary" when a client component using `useSearchParams` is in a statically generated page.
**Why it happens:** Next.js tries to pre-render the page but can't because search params are dynamic.
**How to avoid:** The messages page should be fully dynamic (no `generateStaticParams`). Also wrap `MessagingClient` in `<Suspense>` as a safety measure.
**Warning signs:** `next build` fails or shows a build error about Suspense.

### Pitfall 4: Thread FK Constraint for New Offer From Messages Page

**What goes wrong:** If "Make an Offer" in a thread creates a NEW offer without an existing thread, the FK constraint fails.
**Why it happens:** `Offer` requires `threadId`. The existing `createOffer` creates thread+message+offer atomically — but in the messaging context, the thread already exists.
**How to avoid:** In the messaging context, `createOffer` needs a variant that takes an existing `threadId`. Create a `createOfferInThread(threadId, amount, packageId, message)` action, OR extend `createOffer` to accept optional `existingThreadId`. Do NOT call the existing `createOffer(propertyId, amount, terms)` from a conversation view — it would create a duplicate thread.
**Warning signs:** Duplicate threads appearing in the inbox after submitting an offer.

### Pitfall 5: AI Message History Context

**What goes wrong:** AI gives generic responses not referencing the property/conversation history.
**Why it happens:** Passing only the latest message to o3-mini without prior context.
**How to avoid:** Pass the full message history from the thread as a `messages` array to `generateText`. Build a system prompt that includes the property name, category, packages/tiers with prices, so the AI "knows" the property details.
**Warning signs:** AI responds generically without mentioning property-specific details like tier names or prices.

### Pitfall 6: Offer Card Must Be Distinguished From Regular Messages

**What goes wrong:** Submitted offers look like plain messages and users can't distinguish them.
**Why it happens:** Rendering offer submission as a content string rather than a structured component.
**How to avoid:** After an offer is submitted and the AI response is saved, the conversation view should render `<OfferCard>` for messages where an offer exists in the same thread at a matching timestamp range, OR the `sendMessage` flow attaches offer metadata to distinguish it visually.
**Warning signs:** Users can't see the offer status badge (Pending/Accepted/Declined).

### Pitfall 7: The Existing Seed Already Has Threads — Don't Re-Seed in Phase 5

**What goes wrong:** Adding a seeding step to Phase 5 that duplicates or overwrites the Phase 1/3 seed data.
**Why it happens:** Misreading the requirement as "seed messaging data in Phase 5."
**How to avoid:** The seed in `prisma/seed.ts` already creates 5 threads with full message histories (LAFC, Coachella, Art Basel, Taste of Chicago, X Games). Phase 5 only needs to READ this data. If threads appear empty, the fix is to run `prisma db seed`, not to add new seeding code.
**Warning signs:** Running the Phase 5 task produces duplicate threads or wipes existing conversations.

---

## Code Examples

Verified patterns from official sources:

### AI SDK generateText with o3-mini

```typescript
// Source: https://ai-sdk.dev/docs/guides/o3 + https://ai-sdk.dev/providers/ai-sdk-providers/openai
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export const maxDuration = 60

export async function POST(req: Request) {
  const { messages, systemPrompt } = await req.json()

  const { text } = await generateText({
    model: openai("o3-mini"),
    system: systemPrompt,
    messages,
    // Optional: control reasoning effort
    // providerOptions: { openai: { reasoningEffort: "low" } }
  })

  return Response.json({ text })
}
```

### sendMessage Server Action

```typescript
// app/actions/message.ts
"use server"
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function sendMessage(
  threadId: string,
  content: string
): Promise<{ success: true; messageId: string } | { success: false; error: string }> {
  try {
    const message = await prisma.message.create({
      data: {
        threadId,
        content,
        sender: "advertiser",
        isAI: false,
      },
    })
    revalidatePath("/messages")
    return { success: true, messageId: message.id }
  } catch (err) {
    console.error("[sendMessage] Failed:", err)
    return { success: false, error: "Failed to send message" }
  }
}
```

### Two-Panel Layout with Tailwind

```tsx
// Two-panel split: fixed height, left scrollable list, right scrollable conversation
<div className="flex h-[calc(100vh-4rem)] overflow-hidden">
  {/* Thread list — fixed width left panel */}
  <div className="w-80 border-r flex flex-col overflow-hidden">
    <div className="p-4 border-b font-semibold text-sm">Messages</div>
    <div className="flex-1 overflow-y-auto">
      {threads.map(thread => <ThreadListItem key={thread.id} ... />)}
    </div>
  </div>

  {/* Conversation panel — fills remaining width */}
  <div className="flex-1 flex flex-col overflow-hidden">
    {/* Header */}
    <div className="p-4 border-b flex items-center gap-3">...</div>
    {/* Messages — scrollable */}
    <div className="flex-1 overflow-y-auto p-4 space-y-3">
      {messages.map(msg => <MessageBubble key={msg.id} ... />)}
    </div>
    {/* Input pinned to bottom */}
    <div className="p-4 border-t">
      <MessageInput onSend={handleSend} />
    </div>
  </div>
</div>
```

### Message Bubble (left/right)

```tsx
// Source: iMessage/WhatsApp pattern, standard for chat UIs
function MessageBubble({ message }: { message: Message }) {
  const isAdvertiser = message.sender === "advertiser"
  return (
    <div className={cn("flex", isAdvertiser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[70%] rounded-2xl px-4 py-2 text-sm",
          isAdvertiser
            ? "bg-blue-600 text-white rounded-br-sm"
            : "bg-muted text-foreground rounded-bl-sm"
        )}
      >
        <p>{message.content}</p>
        <span className={cn(
          "text-[10px] mt-1 block",
          isAdvertiser ? "text-blue-100 text-right" : "text-muted-foreground"
        )}>
          {format(new Date(message.createdAt), "h:mm a")}
        </span>
      </div>
    </div>
  )
}
```

### createOfferInThread Server Action (new variant for messaging context)

```typescript
// app/actions/offer.ts — add alongside existing createOffer
"use server"
import prisma from "@/lib/prisma"

export async function createOfferInThread(
  threadId: string,
  amount: number,
  packageId: string,
  packageName: string,
  optionalNote?: string
): Promise<{ success: true; offerId: string } | { success: false; error: string }> {
  try {
    // Add a message describing the offer
    await prisma.message.create({
      data: {
        threadId,
        sender: "advertiser",
        isAI: false,
        content: `[OFFER] $${amount.toLocaleString()} — ${packageName}${optionalNote ? `. Note: ${optionalNote}` : ""}`,
      },
    })

    const offer = await prisma.offer.create({
      data: {
        threadId,
        amount,
        terms: packageName + (optionalNote ? ` — ${optionalNote}` : ""),
        status: "pending",
      },
    })

    return { success: true, offerId: offer.id }
  } catch (err) {
    console.error("[createOfferInThread] Failed:", err)
    return { success: false, error: "Failed to create offer" }
  }
}
```

### AI System Prompt Builder

```typescript
function buildSystemPrompt(property: Property & { packages: Package[] }): string {
  const tiers = property.packages
    .map(p => `- ${p.name}: $${p.priceUsd.toLocaleString()} (${p.inclusions.slice(0, 2).join(", ")})`)
    .join("\n")

  return `You are a sponsorship sales representative for ${property.name}, a ${property.category} property.

Property details:
- Location: ${property.location}
- Audience: ${property.audienceTotalReach.toLocaleString()} total reach, ${property.audienceAgeRange}, ${property.audienceGender}
- Description: ${property.description.slice(0, 500)}

Available sponsorship tiers:
${tiers}

Respond professionally as a knowledgeable sales rep. Be helpful, specific, and reference actual property details and tier names when relevant. Keep responses concise (2-4 short paragraphs max).`
}
```

---

## Data Schema Reference

Already deployed in the database from Phase 1 seed:

```
Thread {
  id, subject, createdAt
  propertyId → Property
  messages[]  → Message[]
  offers[]    → Offer[]
}

Message {
  id, content, sender ("advertiser"|"property"), isAI, createdAt
  threadId → Thread
}

Offer {
  id, amount (Int), terms (String), status ("pending"|"accepted"|"declined"), createdAt
  threadId → Thread
}

Property {
  id, slug, name, category, subcategory, imageUrl, ...
  packages[] → Package[]
}

Package {
  id, name, priceUsd, inclusions[], maxSponsors
  propertyId → Property
}
```

The `getThreads()` query in `lib/data/index.ts` already fetches threads with messages, offers, and property included. No schema migrations needed for Phase 5.

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `fetch` to OpenAI API directly | Vercel AI SDK `generateText`/`streamText` | AI SDK 4+ (2024) | Handles model specifics, errors, timeouts |
| Page Router API routes (`pages/api/`) | App Router route handlers (`app/api/`) | Next.js 13 | Cleaner, supports streaming, co-located |
| `useState` for optimistic UI | `useOptimistic` React hook | React 19 (2024) | Auto-reverts on failure, works with transitions |
| Server-side props for initial data | RSC with direct async/await | Next.js 13+ | No API roundtrip for server data |

**Deprecated/outdated:**
- `StreamingTextResponse` from older AI SDK versions: replaced by `result.toDataStreamResponse()` or `Response.json()` in SDK 5
- `pages/api/` API routes: not used in this project (App Router only)

---

## Open Questions

1. **`date-fns` for timestamp formatting**
   - What we know: The code example above uses `format(new Date(message.createdAt), "h:mm a")` which requires `date-fns`
   - What's unclear: Whether `date-fns` is installed (not in package.json — it's not)
   - Recommendation: Either install `date-fns` (`npm install date-fns`) or use native `Intl.DateTimeFormat` / `toLocaleTimeString()`. Prefer native to avoid a new dependency: `new Date(msg.createdAt).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })`

2. **Offer detection in thread rendering**
   - What we know: Offers are stored separately from messages. The thread has both `messages[]` and `offers[]` arrays.
   - What's unclear: How to interleave offer cards with messages in the right chronological position.
   - Recommendation: When rendering the conversation, check if an offer was created near a message by comparing `offer.createdAt` to the message timestamp. OR: use the message content sentinel `[OFFER]` prefix (from `createOfferInThread`) to detect offer messages and render them as `<OfferCard>` instead of `<MessageBubble>`.

3. **OPENAI_API_KEY environment variable**
   - What we know: Vercel AI SDK reads `OPENAI_API_KEY` from environment automatically.
   - What's unclear: Whether the key is already in `.env.local`.
   - Recommendation: The plan task for the API route should include a verification step to confirm `OPENAI_API_KEY` is set; if not, document where to add it.

---

## Sources

### Primary (HIGH confidence)

- `https://ai-sdk.dev/docs/guides/o3` — o3-mini model ID, installation requirements, maxDuration, reasoningEffort
- `https://ai-sdk.dev/providers/ai-sdk-providers/openai` — OpenAI provider API, model types, setup
- `https://ai-sdk.dev/docs/ai-sdk-core/generating-text` — generateText API, system prompt, messages array
- `https://nextjs.org/docs/app/api-reference/file-conventions/route` (v16.1.6) — Route handler POST pattern, maxDuration, streaming
- `https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations` (v16.1.6) — Server actions, revalidatePath, useOptimistic integration
- `https://react.dev/reference/react/useOptimistic` — useOptimistic API, reducer pattern, startTransition requirement
- Codebase inspection: `prisma/schema.prisma`, `lib/data/index.ts`, `app/actions/offer.ts`, `prisma/seed.ts`

### Secondary (MEDIUM confidence)

- `https://tailwindflex.com/@anonymous/loading-dots` — three-dot animate-bounce pattern with staggered delays (verified against Tailwind docs)
- `https://ai-sdk.dev/docs/getting-started/nextjs-app-router` — Install command `npm install ai @ai-sdk/react` (note: `@ai-sdk/react` optional for this use case; only `ai` + `@ai-sdk/openai` required)

### Tertiary (LOW confidence)

- WebSearch results about useSearchParams Suspense boundary requirement — consistent across multiple sources but not directly verified against v16.1.6 docs

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — Vercel AI SDK verified via official ai-sdk.dev docs; existing libraries verified from package.json
- Architecture: HIGH — RSC+client pattern verified from existing codebase (browse page); route handler pattern from Next.js 16.1.6 docs
- AI API route: HIGH — generateText with o3-mini verified from ai-sdk.dev/docs/guides/o3
- Pitfalls: HIGH for FK constraint and seeding (from codebase inspection); MEDIUM for maxDuration (from official docs mention); MEDIUM for Suspense (multiple sources, not directly checked v16 docs)
- Code examples: HIGH for Tailwind layout patterns; MEDIUM for AI system prompt (pattern, not verified against actual o3-mini output)

**Research date:** 2026-02-21
**Valid until:** 2026-03-21 (30 days — AI SDK and Next.js are relatively stable; o3-mini availability stable)
