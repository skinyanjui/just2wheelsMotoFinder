import { LoadingSkeleton, MessageSkeleton } from "@/components/ui/loading-skeleton"

export default function MessagesLoading() {
  return (
    <div className="flex h-[calc(100vh-var(--header-height,80px))] border-t">
      {/* Conversation list skeleton (left sidebar) */}
      <div className="w-1/3 min-w-[300px] max-w-[400px] border-r h-full">
        <div className="p-4 border-b">
          <LoadingSkeleton height="h-8" className="mb-2" />
          <LoadingSkeleton height="h-10" />
        </div>
        <div className="overflow-y-auto h-[calc(100%-60px)]">
          {/* Conversation list items */}
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="flex items-center gap-3 p-4 border-b hover:bg-muted/50">
                <LoadingSkeleton height="h-10" width="w-10" rounded="full" />
                <div className="flex-1">
                  <LoadingSkeleton height="h-4" width="w-24" className="mb-2" />
                  <LoadingSkeleton height="h-3" width="w-40" />
                </div>
                <div className="flex flex-col items-end">
                  <LoadingSkeleton height="h-3" width="w-16" className="mb-2" />
                  <LoadingSkeleton height="h-5" width="w-5" rounded="full" />
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Message view skeleton (right content area) */}
      <div className="flex-1 h-full flex flex-col">
        {/* Empty state or conversation header */}
        <div className="border-b p-4 flex items-center gap-3">
          <LoadingSkeleton height="h-10" width="w-10" rounded="full" />
          <div>
            <LoadingSkeleton height="h-5" width="w-32" className="mb-1" />
            <LoadingSkeleton height="h-3" width="w-20" />
          </div>
        </div>

        {/* Message area */}
        <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <MessageSkeleton key={i} className={i % 2 === 0 ? "justify-start" : "justify-end"} />
            ))}
        </div>

        {/* Message input area */}
        <div className="border-t p-4">
          <div className="flex gap-2">
            <LoadingSkeleton height="h-12" className="flex-1" />
            <LoadingSkeleton height="h-12" width="w-12" />
          </div>
        </div>
      </div>
    </div>
  )
}
