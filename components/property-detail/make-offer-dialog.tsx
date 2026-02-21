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
import { createOffer } from "@/app/actions/offer"

interface MakeOfferDialogProps {
  propertyId: string
  propertyName: string
}

export function MakeOfferDialog({ propertyId, propertyName }: MakeOfferDialogProps) {
  const [open, setOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const amount = parseInt(formData.get("amount") as string, 10)
    const terms = (formData.get("terms") as string) || ""

    const result = await createOffer(propertyId, amount, terms)

    setSubmitting(false)

    if (result.success) {
      setSubmitted(true)
      setTimeout(() => {
        setOpen(false)
        setSubmitted(false)
      }, 1500)
    } else {
      setError(result.error)
    }
  }

  function handleOpenChange(next: boolean) {
    if (!submitting) {
      setOpen(next)
      if (!next) {
        setSubmitted(false)
        setError(null)
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
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
                disabled={submitting}
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
                disabled={submitting}
                className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] resize-none disabled:opacity-60 disabled:cursor-not-allowed"
              />
            </div>

            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}

            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? "Submitting..." : "Submit Offer"}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
