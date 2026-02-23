"use client"

import { useState } from "react"
import { Sparkles, Store, ChartArea, Briefcase } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface TourStep {
  title: string
  description: string
  icon: LucideIcon
}

const TOUR_STEPS: TourStep[] = [
  {
    title: "Welcome to Anvara",
    description:
      "The platform where brands connect with event audiences at scale. Discover, negotiate, and manage sponsorships — all in one place.",
    icon: Sparkles,
  },
  {
    title: "Browse the Marketplace",
    description:
      "Explore 500+ sponsorship opportunities across festivals, food events, sports, and more. Filter by category, region, and budget to find the perfect fit.",
    icon: Store,
  },
  {
    title: "Track Your Performance",
    description:
      "Monitor spend, impressions, and conversion rates across all active sponsorships from a single analytics dashboard. Every metric in one view.",
    icon: ChartArea,
  },
  {
    title: "Close Deals Faster",
    description:
      "Use Anvara AI to find perfect-fit properties with natural language search, then manage your pipeline and negotiate directly with event organizers.",
    icon: Briefcase,
  },
]

interface TourModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TourModal({ open, onOpenChange }: TourModalProps) {
  const [step, setStep] = useState(0)

  const currentStep = TOUR_STEPS[step]
  const isFirst = step === 0
  const isLast = step === TOUR_STEPS.length - 1

  function handleClose() {
    onOpenChange(false)
    setStep(0)
  }

  const StepIcon = currentStep.icon

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10">
              <StepIcon className="size-8 text-primary" />
            </div>
          </div>
          <DialogTitle className="text-center text-xl">
            {currentStep.title}
          </DialogTitle>
          <DialogDescription className="text-center text-sm leading-relaxed">
            {currentStep.description}
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-center gap-2 py-2">
          {TOUR_STEPS.map((_, i) => (
            <span
              key={i}
              className={`size-2 rounded-full transition-colors ${
                i === step ? "bg-primary" : "bg-muted"
              }`}
            />
          ))}
        </div>

        <DialogFooter className="gap-2 sm:justify-between">
          {!isFirst ? (
            <Button variant="outline" onClick={() => setStep((s) => s - 1)}>
              Back
            </Button>
          ) : (
            <span />
          )}
          {isLast ? (
            <Button onClick={handleClose}>Get Started</Button>
          ) : (
            <Button onClick={() => setStep((s) => s + 1)}>Next</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
