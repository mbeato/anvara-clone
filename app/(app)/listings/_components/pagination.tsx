"use client";

import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

function buildPageHref(
  pathname: string,
  searchParams: URLSearchParams,
  page: number
) {
  const params = new URLSearchParams(searchParams);
  if (page > 1) {
    params.set("page", String(page));
  } else {
    params.delete("page");
  }
  const qs = params.toString();
  return pathname + (qs ? "?" + qs : "");
}

export function Pagination({ currentPage, totalPages }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  // key={currentPage} on the input resets local state when page changes via Link navigation
  const [inputValue, setInputValue] = useState(String(currentPage));

  const prevHref = buildPageHref(pathname, searchParams, currentPage - 1);
  const nextHref = buildPageHref(pathname, searchParams, currentPage + 1);

  function handleInputSubmit(e: React.FormEvent) {
    e.preventDefault();
    const page = parseInt(inputValue);
    if (!isNaN(page) && page >= 1 && page <= totalPages) {
      router.push(buildPageHref(pathname, searchParams, page), { scroll: false });
    } else {
      setInputValue(String(currentPage));
    }
  }

  return (
    <div className="flex items-center gap-3">
      {currentPage > 1 ? (
        <Link
          href={prevHref}
          className="p-2 rounded-lg border hover:bg-accent transition-colors"
          aria-label="Previous page"
          scroll={false}
        >
          <ChevronLeft className="size-4" />
        </Link>
      ) : (
        <span className="p-2 rounded-lg border opacity-40 cursor-not-allowed">
          <ChevronLeft className="size-4" />
        </span>
      )}

      <form onSubmit={handleInputSubmit} className="flex items-center gap-2">
        <input
          key={currentPage}
          type="text"
          inputMode="numeric"
          defaultValue={currentPage}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-12 h-9 text-center text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
          aria-label="Page number"
        />
        <span className="text-sm text-muted-foreground">of {totalPages}</span>
      </form>

      {currentPage < totalPages ? (
        <Link
          href={nextHref}
          className="p-2 rounded-lg border hover:bg-accent transition-colors"
          aria-label="Next page"
          scroll={false}
        >
          <ChevronRight className="size-4" />
        </Link>
      ) : (
        <span className="p-2 rounded-lg border opacity-40 cursor-not-allowed">
          <ChevronRight className="size-4" />
        </span>
      )}
    </div>
  );
}
