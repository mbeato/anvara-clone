import { getAllProperties } from "@/lib/data"
import { AIChatClient } from "@/components/ai-chat/ai-chat-client"

export const metadata = { title: "Anvara AI | Anvara" }

export default async function AIPage() {
  const properties = await getAllProperties()
  return <AIChatClient properties={properties} />
}
