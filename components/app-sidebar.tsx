"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Sparkles, ChartArea, Store, Link2, Briefcase, SlidersHorizontal, CircleHelp, LogOut } from "lucide-react"
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
  { title: "Anvara AI", href: "/ai", icon: Sparkles },
  { title: "Dashboard", href: "/dashboard", icon: ChartArea },
  { title: "Marketplace", href: "/listings", icon: Store },
  { title: "Campaigns", href: "/campaigns", icon: Link2 },
  { title: "Deals", href: "/deals", icon: Briefcase },
]

const footerItems = [
  { title: "Personalize", href: "/personalize", icon: SlidersHorizontal },
  { title: "Show Me Around", href: "/tour", icon: CircleHelp },
  { title: "Logout", href: "/logout", icon: LogOut },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Link href="/" className="flex items-center gap-2 px-2 pt-3 pb-1 overflow-hidden">
          <Image
            src="/anvara-favicon.png"
            alt="Anvara"
            width={534}
            height={355}
            className="min-w-10 w-10 h-auto"
          />
          <Image
            src="/anvara-logotext-blue.png"
            alt="Anvara"
            width={1323}
            height={355}
            className="h-[1.125rem] w-auto dark:brightness-0 dark:invert group-data-[collapsible=icon]:hidden"
          />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className="gap-6 mt-6">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/")
            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  tooltip={item.title}
                  className="relative [&>svg]:mx-4 data-[active=true]:before:absolute data-[active=true]:before:left-0 data-[active=true]:before:inset-y-1 data-[active=true]:before:w-[2px] data-[active=true]:before:rounded-full data-[active=true]:before:bg-primary"
                >
                  <Link href={item.href}>
                    <item.icon />
                    <span className="group-data-[collapsible=icon]:hidden">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu className="gap-6">
          {footerItems.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/")
            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  tooltip={item.title}
                  className="relative [&>svg]:mx-4 data-[active=true]:before:absolute data-[active=true]:before:left-0 data-[active=true]:before:inset-y-1 data-[active=true]:before:w-[2px] data-[active=true]:before:rounded-full data-[active=true]:before:bg-primary"
                >
                  <Link href={item.href}>
                    <item.icon />
                    <span className="group-data-[collapsible=icon]:hidden">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Account" className="[&>svg]:mx-4">
              <Link href="/account" className="flex items-center gap-2">
                <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-sm font-semibold text-primary flex-shrink-0">V</span>
                <span className="group-data-[collapsible=icon]:hidden">VertikalX</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
