import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { HeaderBar } from "@/components/header-bar"
import { SiteFooter } from "@/components/site-footer"

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <SidebarInset>
        <HeaderBar />
        <main className="flex flex-1 flex-col gap-4 p-4">
          {children}
        </main>
        <SiteFooter />
      </SidebarInset>
    </SidebarProvider>
  )
}
