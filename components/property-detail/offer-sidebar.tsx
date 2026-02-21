"use client"

import { Lock, MessageSquare, Phone, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { MakeOfferDialog } from "./make-offer-dialog"

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
})

interface OfferSidebarProps {
  propertyId: string
  propertyName: string
  priceFrom: number
  packageCount: number
}

export function OfferSidebar({
  propertyId,
  propertyName,
  priceFrom,
  packageCount,
}: OfferSidebarProps) {
  function handleMessage() {
    alert("Messaging is coming soon!")
  }

  function handleSchedule() {
    alert("Schedule a call by messaging directly.")
  }

  return (
    <div className="rounded-xl border bg-card p-6 space-y-4">
      {/* Starting price */}
      <div>
        <p className="text-2xl font-bold">
          From {formatter.format(priceFrom)}
        </p>
        <p className="text-sm text-muted-foreground mt-0.5">
          {packageCount} sponsorship tier{packageCount !== 1 ? "s" : ""} available
        </p>
      </div>

      {/* Primary CTA — Make an Offer */}
      <MakeOfferDialog propertyId={propertyId} propertyName={propertyName} />

      {/* Secondary CTA — Message */}
      <Button
        variant="outline"
        className="w-full"
        onClick={handleMessage}
      >
        <MessageSquare className="size-4" />
        Message
      </Button>

      {/* Tertiary CTA — Schedule Call */}
      <Button
        variant="ghost"
        className="w-full"
        onClick={handleSchedule}
      >
        <Phone className="size-4" />
        Schedule Call
      </Button>

      <Separator />

      {/* Trust badges */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <ShieldCheck className="size-4 shrink-0" />
          <span>Verified Seller</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Lock className="size-4 shrink-0" />
          <span>Money Secured</span>
        </div>
      </div>

      <Separator />

      {/* Build your own offer teaser */}
      <p className="text-sm text-muted-foreground">
        Looking for something custom?{" "}
        <a
          href="#build-offer"
          className="text-foreground underline underline-offset-4 hover:text-primary transition-colors"
        >
          Build your own offer below.
        </a>
      </p>
    </div>
  )
}
