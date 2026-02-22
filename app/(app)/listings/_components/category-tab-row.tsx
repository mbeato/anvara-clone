"use client";

interface TabCategory {
  slug: string | undefined;
  label: string;
}

const TAB_CATEGORIES: TabCategory[] = [
  { slug: undefined, label: "All" },
  { slug: "sports", label: "Sports" },
  { slug: "music", label: "Music" },
  { slug: "arts", label: "Arts" },
  { slug: "food", label: "Food" },
  { slug: "lifestyle", label: "Lifestyle" },
];

interface CategoryTabRowProps {
  activeCategory: string | undefined;
  onCategoryChange: (slug: string | undefined) => void;
}

export function CategoryTabRow({
  activeCategory,
  onCategoryChange,
}: CategoryTabRowProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {TAB_CATEGORIES.map((tab) => {
        const isActive = tab.slug === activeCategory;
        return (
          <button
            key={tab.slug ?? "all"}
            onClick={() => onCategoryChange(tab.slug)}
            className={[
              "px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
              isActive
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-accent",
            ].join(" ")}
            aria-pressed={isActive}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
