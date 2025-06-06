"use client";

import { generateTenantUrl } from "@/modules/auth/utils";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

export function Navbar(
  {
    slug
  }
    :
    {
      slug: string;
    }
) {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.tenants.getOne.queryOptions({
    slug
  }));

  return (
    <nav className="h-20 border-b font-medium bg-white">
      <div className="max-w-(--breakpoint-xl) mx-auto flex justify-between items-center h-full px-4 lg:px-12">
        <Link href={generateTenantUrl(slug)} className="flex items-center gap-2">
          {data.image?.url && (
            <Image
              src={data.image?.url}
              width={32}
              height={32}
              className="rounded-full border shrink-0 size-[32px]"
              alt={slug}
            />
          )}
        </Link>
        <p className="text-xl">{data.name}</p>
      </div>
    </nav>
  )
}