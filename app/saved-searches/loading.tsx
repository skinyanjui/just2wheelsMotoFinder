import { LoadingSkeleton } from "@/components/ui/loading-skeleton"

export default function SavedSearchesLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-10 text-center">
        <LoadingSkeleton height="h-10" width="w-64" className="mx-auto mb-2" />
        <LoadingSkeleton height="h-5" width="w-full" className="max-w-2xl mx-auto" />
      </div>

      <div className="space-y-6">
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="p-6 bg-card border rounded-lg shadow-sm">
              <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4 mb-4">
                <div className="flex-grow">
                  <LoadingSkeleton height="h-7" width="w-3/4" className="mb-2" />
                  <LoadingSkeleton height="h-4" width="w-1/2" className="mb-3" />
                  <div className="mb-3">
                    <div className="flex flex-wrap gap-2">
                      {Array(3)
                        .fill(0)
                        .map((_, j) => (
                          <LoadingSkeleton key={j} height="h-6" width="w-20" rounded="lg" />
                        ))}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-start sm:space-x-2 space-y-2 sm:space-y-0 w-full sm:w-auto">
                  <LoadingSkeleton height="h-10" width="w-full" className="sm:w-28" />
                  <LoadingSkeleton height="h-10" width="w-full" className="sm:w-28" />
                  <LoadingSkeleton height="h-10" width="w-full" className="sm:w-28" />
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
