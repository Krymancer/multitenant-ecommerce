"use client";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { useProductsFilters } from "../../hooks/use-products-filters";

export function ProductSort() {
  const [filters, setFilters] = useProductsFilters();

  return (
    <div className="flex items-center gap-2">
      <Button
        size="sm"
        className={cn(
          "rounded-full bg-white hover:bg-white",
          filters.sort !== "curated" &&
          "bg-transparent border-transparent hover:border-boder hover:bg-transparent",
        )}
        variant="secondary"
        onClick={() => setFilters({ sort: "curated" })}
      >
        Curated
      </Button>
      <Button
        size="sm"
        className={cn(
          "rounded-full bg-white hover:bg-white",
          filters.sort !== "trending" &&
          "bg-transparent border-transparent hover:border-boder hover:bg-transparent",
        )}
        variant="secondary"
        onClick={() => setFilters({ sort: "trending" })}
      >
        Trending
      </Button>
      <Button
        size="sm"
        className={cn(
          "rounded-full bg-white hover:bg-white",
          filters.sort !== "hot_and_new" &&
          "bg-transparent border-transparent hover:border-boder hover:bg-transparent",
        )}
        variant="secondary"
        onClick={() => setFilters({ sort: "hot_and_new" })}
      >
        Hot & New
      </Button>
    </div>
  );
}