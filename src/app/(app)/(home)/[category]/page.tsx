import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { getQueryClient, trpc } from "@/trpc/server";

import { ProductList, ProductListSkeleton } from "@/modules/products/ui/components/product-list";
import { Suspense } from "react";

export default async function CategoryPage(
  { params }:
    { params: Promise<{ category: string }> }
) {
  const { category } = await params;

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.products.getMany.queryOptions({
    category,
  }));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<ProductListSkeleton />}>
        <ProductList category={category} />
      </Suspense>
    </HydrationBoundary>
  );
}