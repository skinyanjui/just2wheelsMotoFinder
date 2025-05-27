import { Suspense } from "react"
import SearchClient from "./search-client"

export default function SearchPage() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Search</h1>
      <Suspense
        fallback={
          <div className="max-w-md mx-auto">
            <div className="w-full h-10 bg-gray-200 rounded-md animate-pulse" />
            <div className="mt-4 h-6 w-64 bg-gray-200 rounded-md animate-pulse mx-auto" />
          </div>
        }
      >
        <SearchClient />
      </Suspense>
    </div>
  )
}
