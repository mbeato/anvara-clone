"use server"

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

/**
 * Saves an advertiser message to an existing thread.
 * Returns the created message ID on success.
 */
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
    console.error("[sendMessage] Failed to save message:", err)
    return { success: false, error: "Failed to send message" }
  }
}

/**
 * Creates a new thread for a property with an initial message.
 * Returns the thread ID so the client can navigate to it.
 */
export async function startThread(
  propertyId: string,
  content: string
): Promise<{ success: true; threadId: string; messageId: string } | { success: false; error: string }> {
  try {
    const property = await prisma.property.findUnique({
      where: { id: propertyId },
      select: { name: true },
    })

    const thread = await prisma.thread.create({
      data: {
        subject: `Inquiry — ${property?.name ?? "Property"}`,
        propertyId,
        messages: {
          create: {
            sender: "advertiser",
            isAI: false,
            content,
          },
        },
      },
      include: { messages: true },
    })

    revalidatePath("/messages")

    return { success: true, threadId: thread.id, messageId: thread.messages[0].id }
  } catch (err) {
    console.error("[startThread] Failed to create thread:", err)
    return { success: false, error: "Failed to start conversation" }
  }
}
