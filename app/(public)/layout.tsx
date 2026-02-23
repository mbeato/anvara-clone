import { LandingNavbar } from "@/app/_components/landing/landing-navbar"
import { LandingFooter } from "@/app/_components/landing/landing-footer"

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="force-light min-h-screen bg-background overflow-x-hidden">
      <LandingNavbar defaultLight />
      <main className="pt-20">{children}</main>
      <LandingFooter />
    </div>
  )
}
