export default async function SubcategoryPage(
  { params }:
    { params: Promise<{ category: string, subcategory: string }> }
) {
  const { category, subcategory } = await params;

  return (
    <div>
      <h1>{category} {subcategory}</h1>
    </div>
  );
}