import CategoryGrid from "@/components/category-grid";

export default function CategoriesPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Browse Categories</h1>
      <CategoryGrid />
    </div>
  );
}
