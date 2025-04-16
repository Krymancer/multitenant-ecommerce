"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["700"],
});

const navbarItems = [
    { href: "/", children: "Home" },
    { href: "/about", children: "About" },
    { href: "/features", children: "Features" },
    { href: "/pricing", children: "Pricing" },
    { href: "/contact", children: "Contact" },
]


export default function Navbar() {
    const pathname = usePathname();

    return (
        <nav className="h-20 flex border-b justify-between font-medium bg-white">
            <Link href="/" className="pl-6 flex items-center">
                <span className={cn("text-5xl font-semibold", poppins.className)}>funroad</span>
            </Link>

            <div className="flex items-center gap-4 hidden lg:flex">
                {navbarItems.map((item) => (
                    <NavbarItem key={item.href} href={item.href} isActive={pathname === item.href}>
                        {item.children}
                    </NavbarItem>
                ))}
            </div>

            <div className="hidden lg:flex">
                <Button
                    asChild
                    variant="noShadow"
                    className="border-l border-t-0 border-b-0 border-r-0 px-12 h-full rounded-none bg-white hover:bg-pink-400 transition-colors text-lg"
                >
                    <Link href="/sign-in">
                        Log in
                    </Link>
                </Button>
                <Button
                    asChild
                    variant="noShadow"
                    className="border-l border-t-0 border-b-0 border-r-0 px-12 h-full rounded-none bg-black text-white hover:bg-pink-400 hover:text-black transition-colors text-lg"
                >
                    <Link href="/sign-up">
                        Start selling
                    </Link>
                </Button>
            </div>
        </nav>
    );
}

function NavbarItem({ href, children, isActive }: { href: string, children: React.ReactNode, isActive?: boolean }) {
    return (
        <Button
            variant="noShadow"
            asChild
            className={cn(
                "bg-transparent border border-transparent hover:border hover:border-black rounded-full px-3.5 text-lg",
                isActive && "bg-black text-white",
            )}
        >
            <Link href={href}>
                {children}
            </Link>
        </Button>
    );
}