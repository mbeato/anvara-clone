"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface MakeOfferDialogProps {
  propertyId: string
  propertyName: string
}

export function MakeOfferDialog({ propertyId: _propertyId, propertyName }: MakeOfferDialogProps) {
  const [open, setOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // Phase 3: visual-only — actual Server Action wired in Phase 5
    setSubmitted(true)
    setTimeout(() => {
      setOpen(false)
      setSubmitted(false)
    }, 1500)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
          Make an Offer
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Make an Offer for {propertyName}</DialogTitle>
        </DialogHeader>

        {submitted ? (
          <div className="py-6 text-center">
            <p className="text-sm font-medium text-green-600">
              Offer submitted successfully!
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              The property owner will be in touch shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 mt-2">
            <div>
              <label
                htmlFor="offer-amount"
                className="text-sm font-medium mb-1.5 block"
              >
                Offer Amount (USD)
              </label>
              <Input
                id="offer-amount"
                name="amount"
                type="number"
                placeholder="Offer amount (USD)"
                min={1}
                required
              />
            </div>

            <div>
              <label
                htmlFor="offer-terms"
                className="text-sm font-medium mb-1.5 block"
              >
                Terms &amp; Notes
              </label>
              <textarea
                id="offer-terms"
                name="terms"
                placeholder="Terms, conditions, or notes..."
                rows={4}
                className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] resize-none"
              />
            </div>

            <Button type="submit" className="w-full">
              Submit Offer
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
