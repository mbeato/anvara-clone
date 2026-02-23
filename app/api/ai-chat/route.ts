import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { getAllProperties } from "@/lib/data"

export const maxDuration = 60

type ChatMessage = { role: "user" | "assistant"; content: string }

function buildSystemPrompt(
  properties: Awaited<ReturnType<typeof getAllProperties>>
): string {
  const catalog = properties.map((p) => ({
    slug: p.slug,
    name: p.name,
    category: p.category,
    subcategory: p.subcategory,
    location: p.location,
    tags: p.tags.join(", "),
    priceFrom: p.priceFrom,
    audienceAgeRange: p.audienceAgeRange,
    description: p.description.slice(0, 200),
  }))

  return `You are Anvara AI, a sponsorship marketplace assistant. Help advertisers find relevant sponsorship opportunities.

Available listings (JSON):
${JSON.stringify(catalog, null, 2)}

When responding:
1. Engage conversationally with the user's stated goals
2. Recommend UP TO 3 relevant listings by including their slugs in your response
3. Return your response as JSON: { "text": "your conversational response", "recommendedSlugs": ["slug1", "slug2"] }
4. If no listings are relevant, return an empty recommendedSlugs array
5. Keep responses concise and actionable (2-3 sentences)
6. Reference specific property names and categories in your response`
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { messages } = body as { messages: ChatMessage[] }

    const properties = await getAllProperties()
    const systemPrompt = buildSystemPrompt(properties)

    const { text } = await generateText({
      model: openai("o3-mini"),
      system: systemPrompt,
      messages,
    })

    // Parse AI response — AI is instructed to return JSON
    let parsed: { text: string; recommendedSlugs: string[] }
    try {
      parsed = JSON.parse(text)
    } catch {
      // Fallback if AI doesn't return valid JSON
      parsed = { text, recommendedSlugs: [] }
    }

    // Validate that slugs exist in our catalog
    const validSlugs = new Set(properties.map((p) => p.slug))
    const recommendedSlugs = (parsed.recommendedSlugs ?? [])
      .filter((s) => validSlugs.has(s))
      .slice(0, 3)

    return Response.json({ text: parsed.text, recommendedSlugs })
  } catch (err) {
    console.error("[POST /api/ai-chat]", err)
    return Response.json({ error: "Failed to generate response" }, { status: 500 })
  }
}
