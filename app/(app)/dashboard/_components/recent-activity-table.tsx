import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface RecentActivityTableProps {
  data: Array<{
    propertyName: string
    type: "offer" | "message"
    detail: string
    date: string
  }>
}

export function RecentActivityTable({ data }: RecentActivityTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <p className="text-sm text-muted-foreground">No recent activity</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  Property
                </th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  Type
                </th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  Detail
                </th>
                <th className="px-4 py-3 text-right font-medium text-muted-foreground">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {data.map((row, i) => (
                <tr key={i}>
                  <td className="px-4 py-3 font-medium">{row.propertyName}</td>
                  <td className="px-4 py-3">
                    <Badge variant={row.type === "offer" ? "default" : "outline"}>
                      {row.type}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground max-w-xs truncate">
                    {row.detail}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground text-right">
                    {row.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </CardContent>
    </Card>
  )
}
