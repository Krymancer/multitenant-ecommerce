import { Category } from "@/payload-types";
import Link from "next/link";

export default function SubCategoryMenu({
    category,
    isOpen,
    position,
}: {
    category: Category;
    isOpen: boolean;
    position: { top: number; left: number };
}) {
    if (!isOpen || !category.subcategories || category.subcategories.length === 0) return null;

    const backgroundColor = category.color || "#F5F5F5";

    return (
        <div
            className="fixed z-100"
            style={{
                top: position.top,
                left: position.left,
            }}
        >
            <div className="h-3 w-60" />
            <div
                style={{ backgroundColor }}
                className="w-60 text-black rounded-md overflow-hidden border shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-x-[2px] -translate-y-[2px]"
            >
                <div>
                    {category.subcategories?.map((subcategory: Category) => (
                        <Link
                            key={subcategory.slug}
                            href={''}
                            className="w-full text-left p-4 hover:bg-black hover:text-white flex justify-between items-center underline font-medium"
                        >
                            {subcategory.name}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}