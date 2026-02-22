import { TrendingUp, TrendingDown } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface KpiCardProps {
  label: string;
  value: string;
  trend: number;
  icon: LucideIcon;
}

export function KpiCard({ label, value, trend, icon: Icon }: KpiCardProps) {
  const isPositive = trend >= 0;

  return (
    <Card className="py-4">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {label}
          </CardTitle>
          <Icon className="h-4 w-4 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold tabular-nums">{value}</p>
        <p
          className={`mt-1 flex items-center gap-1 text-xs ${
            isPositive ? "text-emerald-600" : "text-red-500"
          }`}
        >
          {isPositive ? (
            <TrendingUp className="h-3 w-3" />
          ) : (
            <TrendingDown className="h-3 w-3" />
          )}
          {isPositive ? "+" : ""}
          {trend.toFixed(1)}% vs last month
        </p>
      </CardContent>
    </Card>
  );
}
