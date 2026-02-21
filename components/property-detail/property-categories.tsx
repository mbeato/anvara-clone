import { Badge } from "@/components/ui/badge"

interface PropertyCategoriesProps {
  tags: string[]
}

export function PropertyCategories({ tags }: PropertyCategoriesProps) {
  if (tags.length === 0) return null

  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold">Ideal Brand Categories</h2>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Badge key={tag} variant="secondary">
            {tag}
          </Badge>
        ))}
      </div>
    </section>
  )
}
