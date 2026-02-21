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
