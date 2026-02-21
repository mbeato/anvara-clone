# Phase 5: Messaging - Context

**Gathered:** 2026-02-21
**Status:** Ready for planning

<domain>
## Phase Boundary

Advertiser inbox with pre-seeded conversation threads, real-time message sending with AI-simulated property responses, and inline offer submission. The inbox is the communication hub — advertiser reads threads, sends messages, gets AI replies, and submits structured offers. Browse/detail pages and landing page are separate phases.

</domain>

<decisions>
## Implementation Decisions

### Inbox layout
- Two-panel split — thread list on left, active conversation on right (Gmail/Slack style)
- Thread previews show: property image thumbnail, property name, last message snippet, timestamp, and offer status badge if active
- Unread threads indicated by bold text + colored dot badge
- Threads sorted by most recent message first

### Conversation view
- Chat bubbles — advertiser messages on right (blue), property messages on left (gray), iMessage/WhatsApp style
- Small timestamp below each bubble (e.g., "2:34 PM")
- Conversation header shows property name + category + clickable link to property detail page
- Message input pinned to bottom of conversation panel — always visible, conversation scrolls above

### AI response behavior
- Typing indicator animation + 2-4 second delay before AI response appears
- One-time banner at top of conversation: "Responses are AI-simulated for demo purposes" — no per-message badges
- Professional and knowledgeable tone — sounds like a real sponsorship sales rep who knows the property details
- On API failure: show error message inline in thread ("Couldn't generate response. Try again.")

### Offer form design
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

</decisions>

<specifics>
## Specific Ideas

- Two-panel split like Gmail — thread list always visible while reading a conversation
- Offer cards should feel distinct from regular messages — structured card treatment with status badge
- AI should reference actual property data (tier names, pricing) in responses for realism
- Inline offer form instead of modal — keeps the user in the conversation flow

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 05-messaging*
*Context gathered: 2026-02-21*
