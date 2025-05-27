export default function Loading() {
  return (
    <div className="container mx-auto py-12" role="status" aria-busy="true">
      <div className="h-10 w-48 bg-gray-200 rounded-md animate-pulse mx-auto mb-8" data-testid="search-loading-title" />
      <div className="max-w-md mx-auto">
        <div className="w-full h-10 bg-gray-200 rounded-md animate-pulse" data-testid="search-loading-input" />
        <div
          className="mt-4 h-6 w-64 bg-gray-200 rounded-md animate-pulse mx-auto"
          data-testid="search-loading-message"
        />
      </div>
    </div>
  )
}
