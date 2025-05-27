import { Skeleton } from "@/components/ui/skeleton"

export default function SavedSearchesLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Skeleton className="h-10 w-3/4 max-w-md mb-2" />
        <Skeleton className="h-5 w-full max-w-2xl" />
      </div>

      <div className="mb-6">
        <Skeleton className="h-12 w-full max-w-md mb-4" />
      </div>

      <div className="grid gap-6">
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className="p-6 rounded-xl backdrop-blur-md bg-white/30 dark:bg-gray-800/30 border border-gray-200 dark:border-gray-700 shadow-sm"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div className="flex-1">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <div className="flex flex-wrap gap-2 mb-2">
                    {Array(3)
                      .fill(0)
                      .map((_, j) => (
                        <Skeleton key={j} className="h-8 w-24" />
                      ))}
                  </div>
                  <Skeleton className="h-4 w-1/2" />
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Skeleton className="h-10 w-28" />
                  <Skeleton className="h-10 w-28" />
                </div>
              </div>
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-5 w-32" />
                  </div>
                  <Skeleton className="h-8 w-24" />
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
