"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"

const DELIVERABLE_OPTIONS = [
  "Logo placement",
  "Social media posts",
  "VIP access",
  "On-site activation",
  "Digital content",
]

export function BuildOfferForm() {
  const [checked, setChecked] = useState<Record<string, boolean>>({})

  function toggle(label: string) {
    setChecked((prev) => ({ ...prev, [label]: !prev[label] }))
  }

  return (
    <section>
      <h2 className="text-lg font-semibold mb-1">Build Your Own Offer</h2>
      <p className="text-sm text-muted-foreground mb-4">
        Customize a package that fits your goals and budget.
      </p>

      <div className="space-y-5">
        {/* Budget */}
        <div>
          <label className="text-sm font-medium mb-1.5 block" htmlFor="custom-budget">
            Budget
          </label>
          <Input
            id="custom-budget"
            type="number"
            placeholder="Your budget (USD)"
            min={0}
          />
        </div>

        {/* Deliverables */}
        <div>
          <p className="text-sm font-medium mb-2">Deliverables</p>
          <ul className="space-y-2">
            {DELIVERABLE_OPTIONS.map((label) => (
              <li key={label} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={`deliverable-${label}`}
                  checked={!!checked[label]}
                  onChange={() => toggle(label)}
                  className="size-4 rounded border-border accent-primary cursor-pointer"
                />
                <label
                  htmlFor={`deliverable-${label}`}
                  className="text-sm cursor-pointer"
                >
                  {label}
                </label>
              </li>
            ))}
          </ul>
        </div>

        {/* Notes */}
        <div>
          <label className="text-sm font-medium mb-1.5 block" htmlFor="custom-notes">
            Notes
          </label>
          <textarea
            id="custom-notes"
            placeholder="Describe what you're looking for..."
            rows={4}
            className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] resize-none"
          />
        </div>

        <p className="text-xs text-muted-foreground">
          Submit via <span className="font-medium">Make an Offer</span> above.
        </p>
      </div>
    </section>
  )
}
