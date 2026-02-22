"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import type { ChartConfig } from "@/components/ui/chart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const categoryConfig = {
  properties: {
    label: "Properties",
    color: "var(--color-chart-2)",
  },
} satisfies ChartConfig

interface CategoryBarChartProps {
  data: Array<{
    category: string
    properties: number
    totalReach: number
    avgPrice: number
  }>
}

export function CategoryBarChart({ data }: CategoryBarChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Properties by Category</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={categoryConfig} className="h-64 w-full">
          <BarChart
            data={data}
            margin={{ top: 4, right: 4, bottom: 0, left: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="category"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11 }}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar
              dataKey="properties"
              fill="var(--color-properties)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
