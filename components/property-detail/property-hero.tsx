"use client"

import * as React from "react"
import Image from "next/image"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel"
import { cn } from "@/lib/utils"

interface PropertyHeroProps {
  images: string[]
}

export function PropertyHero({ images }: PropertyHeroProps) {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!api) return

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap())

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  return (
    <div className="relative">
      <Carousel setApi={setApi} opts={{ loop: true }}>
        <CarouselContent>
          {images.map((src, i) => (
            <CarouselItem key={i}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-muted">
                <Image
                  src={src}
                  alt=""
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 60vw"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-3" />
        <CarouselNext className="right-3" />
      </Carousel>

      {count > 1 && (
        <div className="flex justify-center gap-1.5 mt-3">
          {Array.from({ length: count }).map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === current
                  ? "w-4 bg-primary"
                  : "w-1.5 bg-muted-foreground/40"
              )}
              onClick={() => api?.scrollTo(i)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
