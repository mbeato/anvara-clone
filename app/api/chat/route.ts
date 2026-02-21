import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import prisma from "@/lib/prisma"

export const maxDuration = 60

type PropertyWithPackages = {
  name: string
  category: string
  location: string
  audienceTotalReach: number
  audienceAgeRange: string
  audienceGender: string
  description: string
  packages: Array<{
    name: string
    priceUsd: number
    inclusions: string[]
  }>
}

function buildSystemPrompt(property: PropertyWithPackages): string {
  const packageList = property.packages
    .map((pkg) => {
      const inclusions = pkg.inclusions.slice(0, 2).join(", ")
      return `- ${pkg.name}: $${pkg.priceUsd.toLocaleString()} (${inclusions})`
    })
    .join("\n")

  return `You are a sponsorship sales representative for ${property.name}. Respond professionally and knowledgeably. Reference actual property details and tier names. Keep responses concise (2-4 short paragraphs).

Property: ${property.name}
Category: ${property.category}
Location: ${property.location}
Audience Reach: ${property.audienceTotalReach.toLocaleString()}
Age Range: ${property.audienceAgeRange}
Gender: ${property.audienceGender}
Description: ${property.description.slice(0, 500)}

Sponsorship Packages:
${packageList}`
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { threadId } = body as { threadId: string }

    if (!threadId) {
      return Response.json({ error: "threadId is required" }, { status: 400 })
    }

    const thread = await prisma.thread.findUnique({
      where: { id: threadId },
      include: {
        messages: { orderBy: { createdAt: "asc" } },
        property: { include: { packages: true } },
      },
    })

    if (!thread) {
      return Response.json({ error: "Thread not found" }, { status: 404 })
    }

    const aiMessages = thread.messages.map((msg) => ({
      role: msg.sender === "advertiser" ? ("user" as const) : ("assistant" as const),
      content: msg.content,
    }))

    const systemPrompt = buildSystemPrompt(thread.property)

    const { text } = await generateText({
      model: openai("o3-mini"),
      system: systemPrompt,
      messages: aiMessages,
    })

    const aiMessage = await prisma.message.create({
      data: {
        threadId,
        content: text,
        sender: "property",
        isAI: true,
      },
    })

    return Response.json({ message: aiMessage })
  } catch (err) {
    console.error("[POST /api/chat] Failed to generate AI response:", err)
    return Response.json({ error: "Failed to generate response" }, { status: 500 })
  }
}
