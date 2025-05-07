import { cookies as getCookies } from "next/headers";

export async function generateAuthCookie({ prefix, value }: { prefix: string; value: string }) {
  const cookies = await getCookies();
  cookies.set({
    name: `${prefix}-token`,
    value: value,
    httpOnly: true,
    path: "/",
  });
}

export function generateTenantUrl(slug: string) {
  return `/tenants/${slug}`;
}