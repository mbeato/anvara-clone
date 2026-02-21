"use server"

import { revalidatePath } from "next/cache"
import prisma from "@/lib/prisma"

/**
 * Creates a Thread and an Offer linked to a property.
 * The Thread FK constraint requires Thread to exist before Offer is created.
 */
export async function createOffer(
  propertyId: string,
  amount: number,
  terms: string
): Promise<{ success: true; offerId: string } | { success: false; error: string }> {
  try {
    const thread = await prisma.thread.create({
      data: {
        subject: `Offer — ${new Date().toLocaleDateString()}`,
        propertyId,
        messages: {
          create: {
            sender: "advertiser",
            isAI: false,
            content: `Initial offer: $${amount.toLocaleString()}. Terms: ${terms}`,
          },
        },
      },
    })

    const offer = await prisma.offer.create({
      data: {
        threadId: thread.id,
        amount,
        terms,
        status: "pending",
      },
    })

    return { success: true, offerId: offer.id }
  } catch (err) {
    console.error("[createOffer] Failed to create offer:", err)
    return { success: false, error: "Failed to create offer" }
  }
}

/**
 * Creates a Message and an Offer within an existing Thread.
 * Used when the advertiser submits a structured offer inside a conversation.
 */
export async function createOfferInThread(
  threadId: string,
  amount: number,
  packageName: string,
  optionalNote?: string
): Promise<{ success: true; offerId: string; messageId: string } | { success: false; error: string }> {
  try {
    const content = `[OFFER] $${amount.toLocaleString()} — ${packageName}${
      optionalNote ? `. Note: ${optionalNote}` : ""
    }`

    const message = await prisma.message.create({
      data: {
        threadId,
        sender: "advertiser",
        isAI: false,
        content,
      },
    })

    const offer = await prisma.offer.create({
      data: {
        threadId,
        amount,
        terms: `${packageName}${optionalNote ? " — " + optionalNote : ""}`,
        status: "pending",
      },
    })

    revalidatePath("/messages")

    return { success: true, offerId: offer.id, messageId: message.id }
  } catch (err) {
    console.error("[createOfferInThread] Failed to create offer in thread:", err)
    return { success: false, error: "Failed to create offer" }
  }
}
