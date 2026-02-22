"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
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
  { title: "Marketplace", href: "/listings", icon: Store },
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
                <Image
                  src="/anvara-favicon.png"
                  alt="Anvara"
                  width={32}
                  height={32}
                  className="size-8 flex-shrink-0"
                />
                <Image
                  src="/anvara-logo-blue.png"
                  alt="Anvara"
                  width={100}
                  height={18}
                  className="h-5 w-auto dark:brightness-0 dark:invert"
                />
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
