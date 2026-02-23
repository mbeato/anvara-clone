import type { Metadata } from "next"
import { SettingsClient } from "./_components/settings-client"

export const metadata: Metadata = { title: "Settings | Anvara" }

export default function SettingsPage() {
  return <SettingsClient />
}
