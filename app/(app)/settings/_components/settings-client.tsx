"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

const INITIAL_NOTIFICATIONS = [
  { label: "Email Notifications", description: "Campaign updates and reports", on: true },
  { label: "Deal Alerts", description: "New offers and negotiations", on: true },
  { label: "Weekly Digest", description: "Performance summary every Monday", on: false },
  { label: "Marketing", description: "Product news and features", on: false },
]

const DISPLAY_OPTIONS: Record<string, string[]> = {
  "Default View": ["Grid", "List"],
  "Results Per Page": ["8", "12", "24"],
  "Currency": ["USD", "EUR", "GBP"],
}

const INITIAL_DISPLAY: Record<string, string> = {
  "Default View": "Grid",
  "Results Per Page": "12",
  "Currency": "USD",
}

const INITIAL_INTERESTS = [
  { label: "Music Festivals", selected: true },
  { label: "Food & Beverage", selected: true },
  { label: "Sports", selected: true },
  { label: "Tech Conferences", selected: false },
  { label: "Arts & Culture", selected: true },
  { label: "Comedy Shows", selected: false },
  { label: "Film Festivals", selected: false },
  { label: "Outdoor & Adventure", selected: true },
  { label: "Gaming & Esports", selected: false },
  { label: "Fashion Events", selected: false },
]

export function SettingsClient() {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS)
  const [display, setDisplay] = useState(INITIAL_DISPLAY)
  const [interests, setInterests] = useState(INITIAL_INTERESTS)

  function toggleNotification(index: number) {
    setNotifications((prev) =>
      prev.map((item, i) => (i === index ? { ...item, on: !item.on } : item))
    )
  }

  function cycleDisplay(label: string) {
    const options = DISPLAY_OPTIONS[label]
    if (!options) return
    setDisplay((prev) => {
      const current = prev[label]
      const nextIndex = (options.indexOf(current) + 1) % options.length
      return { ...prev, [label]: options[nextIndex] }
    })
  }

  function toggleInterest(index: number) {
    setInterests((prev) =>
      prev.map((item, i) => (i === index ? { ...item, selected: !item.selected } : item))
    )
  }

  return (
    <div className="space-y-6 p-6 max-w-2xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Customize your Anvara experience</p>
      </div>

      {/* Section 1: Notification Preferences */}
      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>Choose which updates you want to receive</CardDescription>
        </CardHeader>
        <CardContent className="space-y-0">
          {notifications.map((item, i, arr) => (
            <div key={item.label}>
              <button
                type="button"
                onClick={() => toggleNotification(i)}
                className="flex w-full items-center justify-between py-4 text-left hover:bg-muted/50 -mx-2 px-2 rounded-md transition-colors"
              >
                <div>
                  <p className="text-sm font-medium">{item.label}</p>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                <Badge variant={item.on ? "default" : "outline"}>
                  {item.on ? "On" : "Off"}
                </Badge>
              </button>
              {i < arr.length - 1 && <Separator />}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Section 2: Display Preferences */}
      <Card>
        <CardHeader>
          <CardTitle>Display Preferences</CardTitle>
          <CardDescription>Control how content is shown in your workspace</CardDescription>
        </CardHeader>
        <CardContent className="space-y-0">
          {[
            { label: "Default View", description: "How listings are displayed" },
            { label: "Results Per Page", description: "Number of items per page" },
            { label: "Currency", description: "Display currency for pricing" },
          ].map((item, i, arr) => (
            <div key={item.label}>
              <button
                type="button"
                onClick={() => cycleDisplay(item.label)}
                className="flex w-full items-center justify-between py-4 text-left hover:bg-muted/50 -mx-2 px-2 rounded-md transition-colors"
              >
                <div>
                  <p className="text-sm font-medium">{item.label}</p>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                <Badge variant="secondary">{display[item.label]}</Badge>
              </button>
              {i < arr.length - 1 && <Separator />}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Section 3: Marketplace Interests */}
      <Card>
        <CardHeader>
          <CardTitle>Marketplace Interests</CardTitle>
          <CardDescription>Categories we use to surface relevant opportunities for you</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {interests.map((cat, i) => (
              <button key={cat.label} type="button" onClick={() => toggleInterest(i)}>
                <Badge
                  variant={cat.selected ? "default" : "outline"}
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                >
                  {cat.label}
                </Badge>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Section 4: Account */}
      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
          <CardDescription>Your account details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { label: "Company", value: "Demo" },
            { label: "Email", value: "team@demo.com" },
            { label: "Timezone", value: "America/New_York (EST)" },
          ].map((field) => (
            <div key={field.label}>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                {field.label}
              </p>
              <div className="rounded-md bg-muted/50 px-3 py-2 text-sm">
                {field.value}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
