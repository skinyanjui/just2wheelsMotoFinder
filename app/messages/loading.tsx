// app/messages/loading.tsx
import { Skeleton } from "@/components/ui/skeleton"

export default function MessagesLoading() {
  return (
    <div className="flex h-[calc(100vh-var(--header-height,80px))] border-t">
      {/* Conversation list skeleton (left sidebar) */}
      <div className="w-1/3 min-w-[300px] max-w-[400px] border-r h-full">
        <div className="p-4 border-b">
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
        <div className="overflow-y-auto h-[calc(100%-60px)]">
          {/* Conversation list items */}
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="flex items-center gap-3 p-4 border-b hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-3 w-40" />
                </div>
                <div className="flex flex-col items-end">
                  <Skeleton className="h-3 w-16 mb-2" />
                  <Skeleton className="h-5 w-5 rounded-full" />
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Message view skeleton (right content area) */}
      <div className="flex-1 h-full flex flex-col">
        {/* Empty state or conversation header */}
        <div className="border-b p-4 flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div>
            <Skeleton className="h-5 w-32 mb-1" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>

        {/* Message area */}
        <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <div key={i} className={`flex ${i % 2 === 0 ? "justify-start" : "justify-end"}`}>
                <div
                  className={`max-w-[70%] ${i % 2 === 0 ? "bg-gray-100 dark:bg-gray-800" : "bg-primary/10"} rounded-lg p-3`}
                >
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-3/4 mb-1" />
                  <Skeleton className="h-4 w-1/2" />
                  <div className="flex justify-end mt-1">
                    <Skeleton className="h-3 w-16" />
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Message input area */}
        <div className="border-t p-4">
          <div className="flex gap-2">
            <Skeleton className="flex-1 h-12 rounded-md" />
            <Skeleton className="h-12 w-12 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  )
}
