import { CardSkeleton } from "@/components/ui/loading-skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto py-12" role="region" aria-label="Loading search results">
      <div
        className="h-10 w-48 bg-gray-200 rounded-md animate-pulse mx-auto mb-8"
        data-testid="search-loading-skeleton"
      />
      <div className="max-w-md mx-auto">
        <div className="w-full h-10 bg-gray-200 rounded-md animate-pulse mb-4" data-testid="search-loading-skeleton" />
        <div
          className="h-6 w-64 bg-gray-200 rounded-md animate-pulse mx-auto mt-4"
          data-testid="search-loading-skeleton"
        />
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <CardSkeleton key={i} className="h-[300px]" data-testid="search-loading-skeleton" />
        ))}
      </div>
    </div>
  )
}
