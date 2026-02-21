import { Suspense } from "react"
import { getThreads } from "@/lib/data"
import { MessagingClient } from "@/components/messaging/messaging-client"

type SearchParams = Promise<{ thread?: string }>

export default async function MessagesPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const params = await searchParams
  const threads = await getThreads()

  return (
    <Suspense>
      <MessagingClient threads={threads} initialThreadId={params.thread} />
    </Suspense>
  )
}
