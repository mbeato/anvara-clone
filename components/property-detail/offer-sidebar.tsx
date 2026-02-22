"use client"

import { useState } from "react"
import { Check, Lock, MessageSquare, Phone, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { MakeOfferDialog } from "./make-offer-dialog"
import { cn } from "@/lib/utils"

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
})

function formatPrice(priceUsd: number): string {
  if (priceUsd === 0) return "Contact for pricing"
  return formatter.format(priceUsd)
}

const DELIVERABLE_OPTIONS = [
  "Logo placement",
  "Social media posts",
  "VIP access",
  "On-site activation",
  "Digital content",
]

interface Package {
  id: string
  name: string
  priceUsd: number
  inclusions: string[]
  maxSponsors: number
}

interface OfferSidebarProps {
  propertyId: string
  propertyName: string
  priceFrom: number
  packages: Package[]
}

export function OfferSidebar({
  propertyId,
  propertyName,
  priceFrom,
  packages,
}: OfferSidebarProps) {
  const sorted = [...packages].sort((a, b) => a.priceUsd - b.priceUsd)
  const [selectedTierId, setSelectedTierId] = useState<string | null>(sorted.length > 0 ? sorted[0].id : null)
  const [showCustom, setShowCustom] = useState(false)
  const [checked, setChecked] = useState<Record<string, boolean>>({})

  function handleMessage() {
    alert("Messaging is coming soon!")
  }

  function handleSchedule() {
    alert("Schedule a call by messaging directly.")
  }

  function toggleDeliverable(label: string) {
    setChecked((prev) => ({ ...prev, [label]: !prev[label] }))
  }

  return (
    <div className="rounded-xl border bg-card p-6 space-y-4">
      {/* Starting price */}
      <div>
        <p className="text-2xl font-bold">
          From {formatter.format(priceFrom)}
        </p>
        <p className="text-sm text-muted-foreground mt-0.5">
          {sorted.length} sponsorship tier{sorted.length !== 1 ? "s" : ""} available
        </p>
      </div>

      <Separator />

      {/* Sponsorship Tiers */}
      {sorted.length > 0 && (
        <div>
          <p className="text-sm font-semibold mb-2">Sponsorship Tiers</p>
          <div className="space-y-2">
            {sorted.map((pkg) => {
              const isSelected = selectedTierId === pkg.id
              return (
                <button
                  key={pkg.id}
                  type="button"
                  onClick={() => {
                    setSelectedTierId(isSelected ? null : pkg.id)
                    setShowCustom(false)
                  }}
                  className={cn(
                    "w-full text-left rounded-lg border px-3 py-2 transition-all duration-150 text-sm",
                    isSelected
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-muted-foreground/40"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{pkg.name}</span>
                    <span className="font-semibold tabular-nums text-xs">
                      {formatPrice(pkg.priceUsd)}
                    </span>
                  </div>
                  {isSelected && (
                    <div className="mt-2">
                      <ul className="space-y-1">
                        {pkg.inclusions.map((item, i) => (
                          <li key={i} className="flex items-start gap-1.5 text-xs">
                            <Check className="mt-0.5 size-3 shrink-0 text-primary" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="mt-1.5 text-xs text-muted-foreground">
                        {pkg.maxSponsors} slot{pkg.maxSponsors !== 1 ? "s" : ""} available
                      </p>
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Build Your Own toggle */}
      <button
        type="button"
        onClick={() => {
          setShowCustom(!showCustom)
          setSelectedTierId(null)
        }}
        className={cn(
          "w-full text-left rounded-lg border px-3 py-2 text-sm transition-all duration-150",
          showCustom
            ? "border-primary bg-primary/5"
            : "border-border hover:border-muted-foreground/40"
        )}
      >
        <span className="font-medium">Build Your Own</span>
      </button>

      {showCustom && (
        <div className="space-y-3">
          <div>
            <label className="text-xs font-medium mb-1 block" htmlFor="custom-budget">
              Budget
            </label>
            <Input
              id="custom-budget"
              type="number"
              placeholder="Your budget (USD)"
              min={0}
              className="text-sm"
            />
          </div>
          <div>
            <p className="text-xs font-medium mb-1.5">Deliverables</p>
            <ul className="space-y-1.5">
              {DELIVERABLE_OPTIONS.map((label) => (
                <li key={label} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={`sidebar-${label}`}
                    checked={!!checked[label]}
                    onChange={() => toggleDeliverable(label)}
                    className="size-3.5 rounded border-border accent-primary cursor-pointer"
                  />
                  <label htmlFor={`sidebar-${label}`} className="text-xs cursor-pointer">
                    {label}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <label className="text-xs font-medium mb-1 block" htmlFor="custom-notes">
              Notes
            </label>
            <textarea
              id="custom-notes"
              placeholder="Describe what you're looking for..."
              rows={3}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-xs shadow-xs outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] resize-none"
            />
          </div>
        </div>
      )}

      <Separator />

      {/* Primary CTA — contextual */}
      {showCustom ? (
        <MakeOfferDialog propertyId={propertyId} propertyName={propertyName} />
      ) : (
        <Button className="w-full" onClick={() => alert("Tier selection coming soon!")}>
          {selectedTierId ? "Select Tier" : "Choose a Tier"}
        </Button>
      )}

      {/* Secondary CTA — Message */}
      <Button variant="outline" className="w-full" onClick={handleMessage}>
        <MessageSquare className="size-4" />
        Message
      </Button>

      {/* Tertiary CTA — Schedule Call */}
      <Button variant="ghost" className="w-full" onClick={handleSchedule}>
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
    </div>
  )
}
