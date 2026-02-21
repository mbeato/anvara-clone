"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Bell, Search } from "lucide-react"
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
  browse: "Marketplace",
  campaigns: "Campaigns",
  messages: "Messages",
  settings: "Settings",
  properties: "Properties",
}

function toLabel(segment: string): string {
  return SEGMENT_LABELS[segment] ?? segment.charAt(0).toUpperCase() + segment.slice(1)
}

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

      {/* Center: Search bar */}
      <div className="flex max-w-xs flex-1 items-center gap-2">
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
        {/* Bell with notification badge */}
        <Button variant="ghost" size="icon" className="relative size-9" aria-label="Notifications">
          <Bell className="size-4" />
          <span className="absolute right-1.5 top-1.5 flex size-4 items-center justify-center rounded-full bg-destructive text-[10px] font-medium leading-none text-destructive-foreground">
            3
          </span>
        </Button>

        {/* Mode toggle */}
        <ModeToggle />

        <Separator orientation="vertical" className="h-6" />

        {/* Demo user */}
        <div className="flex items-center gap-2">
          <Avatar className="size-8">
            <AvatarImage
              src="https://picsum.photos/seed/demo-user/40/40"
              alt="Demo Advertiser"
            />
            <AvatarFallback>DA</AvatarFallback>
          </Avatar>
          <span className="hidden text-sm font-medium md:block">Demo Advertiser</span>
        </div>
      </div>
    </header>
  )
}
