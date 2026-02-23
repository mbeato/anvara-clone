"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Bell, MessageSquare, Search, TrendingUp, DollarSign, Users } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"

const SEGMENT_LABELS: Record<string, string> = {
  listings: "Marketplace",
  campaigns: "Campaigns",
  messages: "Messages",
  settings: "Settings",
  properties: "Properties",
}

function toLabel(segment: string): string {
  return SEGMENT_LABELS[segment] ?? segment.charAt(0).toUpperCase() + segment.slice(1)
}

const NOTIFICATIONS = [
  { icon: DollarSign, text: "New offer received on Coachella Music Festival", time: "2m ago" },
  { icon: TrendingUp, text: "Your Jazz in the Park campaign hit 50K impressions", time: "1h ago" },
  { icon: Users, text: "Austin Food Fest accepted your sponsorship proposal", time: "3h ago" },
]

export function HeaderBar() {
  const pathname = usePathname()

  // Split pathname into non-empty segments
  const segments = pathname.split("/").filter(Boolean)

  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
      {/* Mobile sidebar trigger */}
      <SidebarTrigger className="-ml-1" />

      {/* Left: Breadcrumb */}
      <Breadcrumb className="flex-1">
        <BreadcrumbList>
          {segments.length === 0 ? (
            <BreadcrumbItem>
              <BreadcrumbPage>Home</BreadcrumbPage>
            </BreadcrumbItem>
          ) : (
            <>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Anvara</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              {segments.map((segment, index) => {
                const isLast = index === segments.length - 1
                const href = "/" + segments.slice(0, index + 1).join("/")
                return (
                  <span key={href} className="contents">
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      {isLast ? (
                        <BreadcrumbPage>{toLabel(segment)}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink asChild>
                          <Link href={href}>{toLabel(segment)}</Link>
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                  </span>
                )
              })}
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>

      {/* Center: Search bar — hidden on mobile */}
      <div className="hidden sm:flex max-w-xs flex-1 items-center gap-2">
        <div className="relative w-full">
          <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search properties..."
            className="w-full rounded-full bg-muted pl-9 focus-visible:ring-1"
          />
        </div>
      </div>

      {/* Right: Notifications, mode toggle, user */}
      <div className="flex items-center gap-2">
        {/* Messages with unread badge */}
        <Button variant="ghost" size="icon" className="relative size-9" asChild aria-label="Messages">
          <Link href="/messages">
            <MessageSquare className="size-4" />
            <span className="absolute right-1 top-1 size-2.5 rounded-full bg-destructive" />
          </Link>
        </Button>

        {/* Notifications popover */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="relative size-9" aria-label="Notifications">
              <Bell className="size-4" />
              <span className="absolute right-1 top-1 size-2.5 rounded-full bg-destructive" />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-80 p-0">
            <div className="flex items-center justify-between border-b px-4 py-3">
              <p className="text-sm font-semibold">Notifications</p>
              <span className="text-xs text-muted-foreground">{NOTIFICATIONS.length} new</span>
            </div>
            <div className="divide-y">
              {NOTIFICATIONS.map((notif) => (
                <div key={notif.text} className="flex items-start gap-3 px-4 py-3 hover:bg-muted/50 transition-colors">
                  <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <notif.icon className="size-4 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm leading-snug">{notif.text}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{notif.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        {/* Mode toggle — hidden on mobile to avoid crowding */}
        <span className="hidden sm:flex">
          <ModeToggle />
        </span>

        <Separator orientation="vertical" className="h-6" />

        {/* Demo user */}
        <Link href="/settings" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Avatar className="size-8">
            <AvatarImage
              src="https://picsum.photos/seed/demo-user/40/40"
              alt="Demo Advertiser"
            />
            <AvatarFallback>DA</AvatarFallback>
          </Avatar>
          <span className="hidden text-sm font-medium md:block">Demo Advertiser</span>
        </Link>
      </div>
    </header>
  )
}
