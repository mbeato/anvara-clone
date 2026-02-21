"use server"

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
