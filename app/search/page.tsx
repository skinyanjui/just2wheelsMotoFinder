export default function SearchPage() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Search</h1>
      <div className="max-w-md mx-auto">
        <input
          type="search"
          placeholder="Search listings..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <p className="mt-4 text-center text-muted-foreground">
          Enter your search query above.
        </p>
      </div>
    </div>
  );
}
