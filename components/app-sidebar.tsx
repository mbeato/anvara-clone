"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Store, Megaphone, MessageSquare, Settings } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarRail,
  SidebarFooter,
} from "@/components/ui/sidebar"

const navItems = [
  { title: "Marketplace", href: "/browse", icon: Store },
  { title: "Campaigns", href: "/campaigns", icon: Megaphone },
  { title: "Messages", href: "/messages", icon: MessageSquare },
  { title: "Settings", href: "/settings", icon: Settings },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild size="lg" tooltip="Anvara Home">
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-4"
                  >
                    <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5" />
                    <line x1="12" y1="22" x2="12" y2="15.5" />
                    <polyline points="22 8.5 12 15.5 2 8.5" />
                  </svg>
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Anvara</span>
                  <span className="text-xs text-muted-foreground">Sponsorships</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/")
            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  tooltip={item.title}
                  className="relative data-[active=true]:before:absolute data-[active=true]:before:left-0 data-[active=true]:before:inset-y-1 data-[active=true]:before:w-[2px] data-[active=true]:before:rounded-full data-[active=true]:before:bg-primary"
                >
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter />
      <SidebarRail />
    </Sidebar>
  )
}
