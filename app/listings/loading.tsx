import { ListingSkeleton } from "@/components/ui/loading-skeleton"

export default function ListingsLoading() {
  return (
    <div className="container py-8" data-testid="listings-loading-container">
      <div className="mb-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <ListingSkeleton height="h-10" width="w-64" className="mb-2" />
            <ListingSkeleton height="h-5" width="w-40" />
          </div>
          <div className="flex gap-2">
            <ListingSkeleton height="h-10" width="w-32" />
            <ListingSkeleton height="h-10" width="w-32" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        <div className="glassmorphic-card p-4 lg:block">
          <div className="mb-4 flex items-center justify-between">
            <ListingSkeleton height="h-6" width="w-20" className="mb-2" data-testid="filter-skeleton" />
            <ListingSkeleton height="h-6" width="w-16" data-testid="filter-skeleton" />
          </div>
          <div className="space-y-6">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <div key={i} data-testid="filter-skeleton">
                  <ListingSkeleton height="h-5" width="w-32" className="mb-2" />
                  <ListingSkeleton height="h-10" />
                </div>
              ))}
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <ListingSkeleton key={i} data-testid="listing-skeleton" />
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
