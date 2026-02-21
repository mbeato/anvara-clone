"use client"

import { Bar, BarChart, XAxis, YAxis } from "recharts"
import { ChartContainer } from "@/components/ui/chart"
import type { ChartConfig } from "@/components/ui/chart"
import { Badge } from "@/components/ui/badge"
import {
  parseGender,
  parseAgeRange,
  getIncomeLevel,
  formatReach,
} from "@/lib/demographic-parsers"

interface PropertyDemographicsProps {
  audienceGender: string
  audienceAgeRange: string
  audienceIncome: string
  audienceTotalReach: number
  tags: string[]
}

const genderChartConfig = {
  male: {
    label: "Male",
    color: "var(--color-chart-1)",
  },
  female: {
    label: "Female",
    color: "var(--color-chart-2)",
  },
} satisfies ChartConfig

const INCOME_LEVELS = [
  { level: 1, label: "Mass Market" },
  { level: 2, label: "Premium" },
  { level: 3, label: "Affluent" },
  { level: 4, label: "Ultra HNW" },
]

const AGE_MIN = 13
const AGE_MAX = 75

export function PropertyDemographics({
  audienceGender,
  audienceAgeRange,
  audienceIncome,
  audienceTotalReach,
  tags,
}: PropertyDemographicsProps) {
  const { male, female } = parseGender(audienceGender)
  const { min: ageMin, max: ageMax } = parseAgeRange(audienceAgeRange)
  const income = getIncomeLevel(audienceIncome)

  const genderData = [{ name: "gender", male, female }]

  // Position of age range bar as percentages of the full scale
  const ageTrackLeft = ((ageMin - AGE_MIN) / (AGE_MAX - AGE_MIN)) * 100
  const ageTrackWidth = ((ageMax - ageMin) / (AGE_MAX - AGE_MIN)) * 100

  return (
    <section className="space-y-6">
      <h2 className="text-lg font-semibold">Audience Demographics</h2>

      <div className="grid grid-cols-2 gap-6">
        {/* Total Reach */}
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
            Total Reach
          </p>
          <p className="text-3xl font-bold tabular-nums">
            {formatReach(audienceTotalReach)}
          </p>
          <p className="text-xs text-muted-foreground">audience members</p>
        </div>

        {/* Gender Split */}
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
            Gender Split
          </p>
          {/* Explicit h-10 overrides the default aspect-video on ChartContainer */}
          <ChartContainer
            config={genderChartConfig}
            className="h-10 w-full [&_.recharts-wrapper]:!aspect-auto"
          >
            <BarChart
              layout="vertical"
              data={genderData}
              barSize={28}
              margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
            >
              <XAxis type="number" domain={[0, 100]} hide />
              <YAxis type="category" dataKey="name" hide />
              <Bar
                dataKey="male"
                stackId="a"
                fill="var(--color-male)"
                radius={[4, 0, 0, 4]}
              />
              <Bar
                dataKey="female"
                stackId="a"
                fill="var(--color-female)"
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ChartContainer>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>
              <span
                className="inline-block w-2 h-2 rounded-sm mr-1"
                style={{ backgroundColor: "var(--color-chart-1)" }}
              />
              Male {male}%
            </span>
            <span>
              Female {female}%{" "}
              <span
                className="inline-block w-2 h-2 rounded-sm ml-1"
                style={{ backgroundColor: "var(--color-chart-2)" }}
              />
            </span>
          </div>
        </div>

        {/* Age Range */}
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
            Primary Age
          </p>
          <div className="relative h-3 bg-muted rounded-full overflow-hidden">
            <div
              className="absolute top-0 h-full bg-primary rounded-full"
              style={{
                left: `${ageTrackLeft}%`,
                width: `${ageTrackWidth}%`,
              }}
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span className="font-medium text-foreground">{ageMin}</span>
            <span className="text-muted-foreground">
              {AGE_MIN}–{AGE_MAX}
            </span>
            <span className="font-medium text-foreground">{ageMax}</span>
          </div>
        </div>

        {/* Household Income */}
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
            Household Income
          </p>
          <div className="flex gap-1.5 items-end">
            {INCOME_LEVELS.map((lvl) => (
              <div key={lvl.level} className="flex flex-col items-center gap-1">
                <div
                  className={`rounded-sm transition-colors ${
                    lvl.level <= income.level
                      ? "bg-primary"
                      : "bg-muted"
                  }`}
                  style={{
                    width: 16 + lvl.level * 4,
                    height: 8 + lvl.level * 4,
                  }}
                />
              </div>
            ))}
          </div>
          <p className="text-xs font-medium text-foreground">{income.label}</p>
        </div>
      </div>

      {/* Lifestyle Tags */}
      {tags.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
            Lifestyle &amp; Interests
          </p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
