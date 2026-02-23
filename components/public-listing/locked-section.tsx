import { Lock } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface LockedSectionProps {
  title: string
}

export function LockedSection({ title }: LockedSectionProps) {
  return (
    <section className="relative space-y-3">
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="relative rounded-xl overflow-hidden border border-border">
        {/* Blurred placeholder content */}
        <div className="blur-sm pointer-events-none select-none p-4 space-y-3 bg-muted/30">
          <div className="h-4 bg-muted rounded w-full" />
          <div className="h-4 bg-muted rounded w-4/5" />
          <div className="h-4 bg-muted rounded w-3/5" />
          <div className="flex gap-2">
            <div className="h-6 w-20 bg-muted rounded-full" />
            <div className="h-6 w-24 bg-muted rounded-full" />
            <div className="h-6 w-16 bg-muted rounded-full" />
          </div>
        </div>

        {/* Lock overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-background/60 backdrop-blur-sm">
          <Lock className="size-6 text-muted-foreground" />
          <p className="text-sm font-medium text-muted-foreground">
            Login to see {title.toLowerCase()}
          </p>
          <Button asChild size="sm">
            <Link href="/listings">Login to See More</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
