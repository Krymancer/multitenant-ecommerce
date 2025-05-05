import { Category } from "@/payload-types";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { sub } from "date-fns";
import { Where } from "payload";
import { z } from "zod";

export const productsRouter = createTRPCRouter({
  getMany: baseProcedure
    .input(
      z.object({
        category: z.string().nullable().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const where: Where = {};

      if (input.category) {
        const categoriesData = await ctx.payload.find({
          collection: "categories",
          limit: 1,
          depth: 1,
          pagination: false,
          where: {
            slug: {
              equals: input.category,
            },
          }
        });

        const formatedData = categoriesData?.docs.map((category) => ({
          ...category,
          subcategories: (category.subcategories?.docs ?? []).map((subcategory) => ({
            ...subcategory as Category,
            subcategories: undefined,
          }))
        }));

        const subcategoriesSlugs = [];
        const [parentCategory] = formatedData;

        if (parentCategory) {
          subcategoriesSlugs.push(...parentCategory.subcategories?.map(subcategory => subcategory.slug))
        }

        where["category.slug"] = {
          in: [parentCategory.slug, ...subcategoriesSlugs]
        };
      }

      const data = await ctx.payload.find({
        collection: "products",
        depth: 1,
        where,
      });

      return data;
    })
});