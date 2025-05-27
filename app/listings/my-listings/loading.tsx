import { LoadingSkeleton } from "@/components/ui/loading-skeleton"

export default function MyListingsLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <LoadingSkeleton height="h-10" width="w-48" />
        <LoadingSkeleton height="h-10" width="w-48" />
      </div>

      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <LoadingSkeleton height="h-10" className="flex-grow" />
        <LoadingSkeleton height="h-10" width="w-32" />
      </div>

      <div className="mb-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <LoadingSkeleton key={i} height="h-12" />
            ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array(8)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="flex flex-col rounded-lg border bg-card shadow-sm">
              <LoadingSkeleton height="h-48" className="rounded-t-lg" />
              <div className="p-4">
                <LoadingSkeleton height="h-6" className="mb-2" />
                <LoadingSkeleton height="h-4" width="w-1/2" className="mb-4" />
                <LoadingSkeleton height="h-6" className="mb-4" />
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <LoadingSkeleton height="h-9" />
                  <LoadingSkeleton height="h-9" />
                </div>
                <LoadingSkeleton height="h-9" className="mb-2" />
                <LoadingSkeleton height="h-9" />
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
