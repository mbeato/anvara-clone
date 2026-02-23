import { getThreads, getProperty } from "@/lib/data"
import { MessagingClient } from "@/components/messaging/messaging-client"

type SearchParams = Promise<{ thread?: string; property?: string }>

export default async function MessagesPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const params = await searchParams
  const threads = await getThreads()

  // If ?property=ID, find the thread for that property
  let initialThreadId = params.thread
  let newConversation: { propertyId: string; propertyName: string } | undefined

  if (!initialThreadId && params.property) {
    const match = threads.find((t) => t.propertyId === params.property)
    if (match) {
      initialThreadId = match.id
    } else {
      // No thread yet — fetch property name for the compose view
      const property = await getProperty(params.property)
      if (property) {
        newConversation = { propertyId: property.id, propertyName: property.name }
      }
    }
  }

  return (
    <MessagingClient
      threads={threads}
      initialThreadId={initialThreadId}
      newConversation={newConversation}
    />
  )
}
