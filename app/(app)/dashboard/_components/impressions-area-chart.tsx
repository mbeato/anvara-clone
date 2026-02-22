"use client"

import { AreaChart, Area, XAxis, YAxis, CartesianGrid } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import type { ChartConfig } from "@/components/ui/chart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const impressionsConfig = {
  impressions: {
    label: "Impressions",
    color: "var(--color-chart-1)",
  },
} satisfies ChartConfig

interface ImpressionsAreaChartProps {
  data: Array<{ date: string; impressions: number }>
}

export function ImpressionsAreaChart({ data }: ImpressionsAreaChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Impressions Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={impressionsConfig} className="h-64 w-full">
          <AreaChart
            data={data}
            margin={{ top: 4, right: 4, bottom: 0, left: 0 }}
          >
            <defs>
              <linearGradient id="impressionsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-impressions)" stopOpacity={0.3} />
                <stop offset="100%" stopColor="var(--color-impressions)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11 }}
              tickFormatter={(value: number) =>
                value >= 1000 ? `${Math.round(value / 1000)}K` : String(value)
              }
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area
              type="monotone"
              dataKey="impressions"
              stroke="var(--color-impressions)"
              fill="url(#impressionsGradient)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
