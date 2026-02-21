"use client"

import { useState } from "react"
import { Loader2, Send } from "lucide-react"
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

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const parsedAmount = parseFloat(amount)
    if (!parsedAmount || parsedAmount <= 0 || !selectedPackage) return
    onSubmit(Math.round(parsedAmount), selectedPackage, note.trim())
  }

  const isValid = parseFloat(amount) > 0 && selectedPackage

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl rounded-br-sm bg-blue-600 text-white p-3 space-y-2"
    >
      <p className="text-xs font-medium text-blue-100">Make an Offer</p>

      <div className="flex items-center gap-2">
        <span className="text-sm font-medium shrink-0">$</span>
        <Input
          type="number"
          min={1}
          step={1}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          className="flex-1 h-8 text-sm bg-blue-700/50 border-blue-500/30 text-white placeholder:text-blue-300 focus-visible:ring-blue-400"
          disabled={isSubmitting}
          required
        />
      </div>

      <Select
        value={selectedPackage}
        onValueChange={setSelectedPackage}
        disabled={isSubmitting}
      >
        <SelectTrigger className="h-8 text-sm bg-blue-700/50 border-blue-500/30 text-white">
          <SelectValue placeholder="Select tier..." />
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

      <Input
        type="text"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Add a note (optional)"
        className="h-8 text-sm bg-blue-700/50 border-blue-500/30 text-white placeholder:text-blue-300 focus-visible:ring-blue-400"
        disabled={isSubmitting}
      />

      <div className="flex items-center gap-2 justify-end">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="text-xs text-blue-200 hover:text-white"
        >
          Cancel
        </button>
        <Button
          type="submit"
          size="sm"
          disabled={isSubmitting || !isValid}
          className="h-7 text-xs bg-white text-blue-600 hover:bg-blue-50"
        >
          {isSubmitting ? (
            <Loader2 className="h-3 w-3 animate-spin" />
          ) : (
            <>
              <Send className="h-3 w-3 mr-1" />
              Send Offer
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
