"use client"

import { useState } from "react"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Package {
  id: string
  name: string
  priceUsd: number
}

interface InlineOfferFormProps {
  packages: Package[]
  onSubmit: (amount: number, packageName: string, note: string) => void
  onCancel: () => void
  isSubmitting: boolean
}

export function InlineOfferForm({
  packages,
  onSubmit,
  onCancel,
  isSubmitting,
}: InlineOfferFormProps) {
  const [amount, setAmount] = useState("")
  const [selectedPackage, setSelectedPackage] = useState("")
  const [note, setNote] = useState("")
  const [errors, setErrors] = useState<{ amount?: string; package?: string }>({})

  function validate() {
    const newErrors: { amount?: string; package?: string } = {}
    const parsedAmount = parseFloat(amount)

    if (!amount || isNaN(parsedAmount) || parsedAmount <= 0) {
      newErrors.amount = "Enter a valid amount greater than 0"
    }

    if (!selectedPackage) {
      newErrors.package = "Select a tier"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return

    const parsedAmount = Math.round(parseFloat(amount))
    onSubmit(parsedAmount, selectedPackage, note.trim())
  }

  return (
    <div className="rounded-lg border bg-muted/30 p-4 transition-all">
      <p className="text-sm font-medium mb-3">Submit an Offer</p>
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Dollar amount */}
        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground shrink-0">$</span>
            <Input
              type="number"
              min={1}
              step={1}
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value)
                if (errors.amount) setErrors((prev) => ({ ...prev, amount: undefined }))
              }}
              placeholder="Enter amount"
              className="flex-1"
              disabled={isSubmitting}
              required
            />
          </div>
          {errors.amount && (
            <p className="text-xs text-red-500 mt-1">{errors.amount}</p>
          )}
        </div>

        {/* Tier selection */}
        <div>
          <Select
            value={selectedPackage}
            onValueChange={(val) => {
              setSelectedPackage(val)
              if (errors.package) setErrors((prev) => ({ ...prev, package: undefined }))
            }}
            disabled={isSubmitting}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a tier..." />
            </SelectTrigger>
            <SelectContent>
              {packages.map((pkg) => (
                <SelectItem key={pkg.id} value={pkg.name}>
                  {pkg.name}
                  {pkg.priceUsd > 0 && (
                    <span className="ml-1 text-muted-foreground">
                      — ${pkg.priceUsd.toLocaleString()}
                    </span>
                  )}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.package && (
            <p className="text-xs text-red-500 mt-1">{errors.package}</p>
          )}
        </div>

        {/* Optional note */}
        <Input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Add a note (optional)"
          disabled={isSubmitting}
        />

        {/* Actions */}
        <div className="flex items-center gap-2 pt-1">
          <Button type="submit" size="sm" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin mr-1.5" />
                Sending...
              </>
            ) : (
              "Send Offer"
            )}
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}
