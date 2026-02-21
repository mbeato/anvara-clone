/**
 * Demographic parsing utilities for property detail page.
 * Pure functions — no side effects, no imports.
 */

/**
 * Parse a gender string like "62% male, 38% female" into numeric values.
 * Defaults to 50/50 if parsing fails.
 */
export function parseGender(raw: string): { male: number; female: number } {
  const maleMatch = raw.match(/(\d+)%\s*male/i)
  const femaleMatch = raw.match(/(\d+)%\s*female/i)

  const male = maleMatch ? parseInt(maleMatch[1], 10) : null
  const female = femaleMatch ? parseInt(femaleMatch[1], 10) : null

  if (male !== null && female !== null) {
    return { male, female }
  }

  if (male !== null) {
    return { male, female: 100 - male }
  }

  if (female !== null) {
    return { male: 100 - female, female }
  }

  return { male: 50, female: 50 }
}

/**
 * Parse an age range string like "18–34" or "18-34" into min/max numbers.
 * Returns { min: 18, max: 34 } format.
 */
export function parseAgeRange(raw: string): { min: number; max: number } {
  // Split on en-dash (–), em-dash (—), or hyphen (-)
  const parts = raw.split(/[–—-]/).map((s) => s.trim())

  if (parts.length === 2) {
    const min = parseInt(parts[0], 10)
    const max = parseInt(parts[1], 10)
    if (!isNaN(min) && !isNaN(max)) {
      return { min, max }
    }
  }

  // Default fallback
  return { min: 18, max: 65 }
}

/**
 * Income level scale mapping for the HHI indicator.
 */
export const INCOME_SCALE: Record<string, { level: number; label: string }> = {
  "mass-market": { level: 1, label: "Mass Market" },
  "mass market": { level: 1, label: "Mass Market" },
  premium: { level: 2, label: "Premium" },
  affluent: { level: 3, label: "Affluent" },
  "ultra-high-net-worth": { level: 4, label: "Ultra HNW" },
  "ultra high net worth": { level: 4, label: "Ultra HNW" },
}

/**
 * Get income display info from a raw income string.
 * Falls back to level 2 (Premium) if not found.
 */
export function getIncomeLevel(raw: string): { level: number; label: string } {
  const normalized = raw.toLowerCase().trim()
  return INCOME_SCALE[normalized] ?? { level: 2, label: raw }
}

/**
 * Format a large audience reach number to a human-readable string.
 * 1200000 → "1.2M", 500000 → "500K", 1500 → "1.5K"
 */
export function formatReach(n: number): string {
  if (n >= 1_000_000) {
    const val = n / 1_000_000
    return `${val % 1 === 0 ? val.toFixed(0) : val.toFixed(1)}M`
  }
  if (n >= 1_000) {
    const val = n / 1_000
    return `${val % 1 === 0 ? val.toFixed(0) : val.toFixed(1)}K`
  }
  return n.toString()
}
