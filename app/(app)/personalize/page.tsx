import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export const metadata = { title: "Personalize | Anvara" }

const interestCategories = [
  { label: "Music Festivals", selected: true },
  { label: "Food & Beverage", selected: true },
  { label: "Sports", selected: true },
  { label: "Tech Conferences", selected: false },
  { label: "Arts & Culture", selected: true },
  { label: "Comedy Shows", selected: false },
  { label: "Film Festivals", selected: false },
  { label: "Outdoor & Adventure", selected: true },
  { label: "Gaming & Esports", selected: false },
  { label: "Fashion Events", selected: false },
]

export default function PersonalizePage() {
  return (
    <div className="space-y-6 p-6 max-w-2xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Personalize</h1>
        <p className="text-muted-foreground">Customize your Anvara experience</p>
      </div>

      {/* Section 1: Notification Preferences */}
      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>Choose which updates you want to receive</CardDescription>
        </CardHeader>
        <CardContent className="space-y-0">
          {[
            { label: "Email Notifications", description: "Campaign updates and reports", on: true },
            { label: "Deal Alerts", description: "New offers and negotiations", on: true },
            { label: "Weekly Digest", description: "Performance summary every Monday", on: false },
            { label: "Marketing", description: "Product news and features", on: false },
          ].map((item, i, arr) => (
            <div key={item.label}>
              <div className="flex items-center justify-between py-4">
                <div>
                  <p className="text-sm font-medium">{item.label}</p>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                <Badge variant={item.on ? "default" : "outline"}>
                  {item.on ? "On" : "Off"}
                </Badge>
              </div>
              {i < arr.length - 1 && <Separator />}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Section 2: Display Preferences */}
      <Card>
        <CardHeader>
          <CardTitle>Display Preferences</CardTitle>
          <CardDescription>Control how content is shown in your workspace</CardDescription>
        </CardHeader>
        <CardContent className="space-y-0">
          {[
            { label: "Default View", description: "How listings are displayed", value: "Grid" },
            { label: "Results Per Page", description: "Number of items per page", value: "12" },
            { label: "Currency", description: "Display currency for pricing", value: "USD" },
          ].map((item, i, arr) => (
            <div key={item.label}>
              <div className="flex items-center justify-between py-4">
                <div>
                  <p className="text-sm font-medium">{item.label}</p>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                <span className="text-sm font-medium text-muted-foreground">{item.value}</span>
              </div>
              {i < arr.length - 1 && <Separator />}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Section 3: Marketplace Interests */}
      <Card>
        <CardHeader>
          <CardTitle>Marketplace Interests</CardTitle>
          <CardDescription>Categories we use to surface relevant opportunities for you</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {interestCategories.map((cat) => (
              <Badge key={cat.label} variant={cat.selected ? "default" : "outline"}>
                {cat.label}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Section 4: Account */}
      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
          <CardDescription>Your account details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { label: "Company", value: "VertikalX" },
            { label: "Email", value: "team@vertikalx.com" },
            { label: "Timezone", value: "America/New_York (EST)" },
          ].map((field) => (
            <div key={field.label}>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                {field.label}
              </p>
              <div className="rounded-md bg-muted/50 px-3 py-2 text-sm">
                {field.value}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
