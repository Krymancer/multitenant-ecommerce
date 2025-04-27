import { CustomCategory } from "../types";

import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet';
import { set } from "date-fns";
import { ChevronLeft, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CategoriesSidebar(
  { open, onOpenChange, data }: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    data: CustomCategory[]
  }
) {
  const router = useRouter();

  const [parentCategories, setParentCategories] = useState<CustomCategory[] | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<CustomCategory | null>(null);

  const currentCategories = parentCategories ?? data ?? [];

  function handleOpenChange(open: boolean) {
    setParentCategories(null);
    setSelectedCategory(null);
    onOpenChange(open);
  }

  function handleCategoryClick(category: CustomCategory) {
    if (category.subcategories && category.subcategories.length > 0) {
      setParentCategories(category.subcategories as CustomCategory[]);
      setSelectedCategory(category);
    } else {
      if (parentCategories && selectedCategory) {
        router.push(`${selectedCategory.slug}/${category.slug}`);
      } else {
        if (category.slug === "all") {
          router.push("/");
        } else {
          router.push(`/${category.slug}`);
        }
      }

      handleOpenChange(false);
    }
  }

  function handleBackClick() {
    if (parentCategories) {
      setParentCategories(null);
      setSelectedCategory(null);
    }
  }

  const backgroundColor = selectedCategory?.color || "white";

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent
        side="left"
        className="p-0 transition-none"
        style={{ backgroundColor: backgroundColor }}
      >
        <SheetHeader className="p-4 border-b">
          <SheetTitle>
            Categories
          </SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex flex-col overflow-y-auto h-full pb-2">
          {parentCategories && (
            <button
              onClick={handleBackClick}
              className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium cursor-pointer"
            >
              <ChevronLeftIcon className="size-4 mr-2 mr-2" />
              Back
            </button>
          )}
          {currentCategories.map((category) => (
            <button
              key={category.slug}
              className="w-full text-left p-4 hover:bg-black hover:text-white flex justify-between items-center text-base font-medium"
              onClick={() => handleCategoryClick(category)}
            >
              {category.name}
              {category.subcategories && category.subcategories.length > 0 && (
                <ChevronRightIcon className="size-4" />
              )}
            </button>
          ))}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}