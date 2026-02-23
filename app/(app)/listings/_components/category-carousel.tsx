"use client";

import { useRef } from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface CategoryItem {
  slug: string;
  label: string;
  imageUrl: string;
}

const CATEGORIES: CategoryItem[] = [
  {
    slug: "sports",
    label: "Action Sports",
    imageUrl: "https://picsum.photos/seed/sports-arena/600/300",
  },
  {
    slug: "music",
    label: "Music Festivals",
    imageUrl: "https://picsum.photos/seed/music-festival/600/300",
  },
  {
    slug: "arts",
    label: "Art & Culture",
    imageUrl: "https://picsum.photos/seed/art-gallery/600/300",
  },
  {
    slug: "food",
    label: "Food & Culinary",
    imageUrl: "https://picsum.photos/seed/food-festival/600/300",
  },
  {
    slug: "lifestyle",
    label: "Lifestyle Events",
    imageUrl: "https://picsum.photos/seed/lifestyle-outdoor/600/300",
  },
  {
    slug: "tech",
    label: "Tech Conferences",
    imageUrl: "https://picsum.photos/seed/tech-conference/600/300",
  },
  {
    slug: "charity",
    label: "Charity Galas",
    imageUrl: "https://picsum.photos/seed/charity-gala/600/300",
  },
  {
    slug: "fashion",
    label: "Fashion Week",
    imageUrl: "https://picsum.photos/seed/fashion-runway/600/300",
  },
];

interface CategoryCarouselProps {
  onCategoryClick: (slug: string) => void;
}

export function CategoryCarousel({ onCategoryClick }: CategoryCarouselProps) {
  const plugin = useRef(
    Autoplay({ delay: 3000, stopOnMouseEnter: true, stopOnInteraction: false })
  );

  return (
    <>
      {/* Mobile: horizontal scroll row of compact image chips */}
      <div className="flex gap-2 overflow-x-auto px-0.5 pb-1 scrollbar-hide sm:hidden">
        {CATEGORIES.map((category) => (
          <button
            key={category.slug}
            onClick={() => onCategoryClick(category.slug)}
            className="relative flex-shrink-0 w-28 aspect-[16/9] overflow-hidden rounded-lg"
            aria-label={`Browse ${category.label}`}
          >
            <Image
              src={category.imageUrl}
              alt={category.label}
              fill
              className="object-cover"
              sizes="112px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <span className="absolute bottom-1.5 left-1.5 text-white font-medium text-[10px] leading-tight">
              {category.label}
            </span>
          </button>
        ))}
      </div>

      {/* Desktop: Embla auto-scrolling carousel */}
      <div className="hidden sm:block">
        <Carousel
          plugins={[plugin.current]}
          opts={{ loop: true, align: "start" }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {CATEGORIES.map((category) => (
              <CarouselItem
                key={category.slug}
                className="basis-1/2 md:basis-1/3 lg:basis-1/5 pl-4"
              >
                <button
                  onClick={() => onCategoryClick(category.slug)}
                  className="relative aspect-[2/1] w-full overflow-hidden rounded-xl cursor-pointer group block"
                  aria-label={`Browse ${category.label}`}
                >
                  <Image
                    src={category.imageUrl}
                    alt={category.label}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute bottom-3 left-3 text-white font-semibold text-sm">
                    {category.label}
                  </span>
                </button>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </>
  );
}
