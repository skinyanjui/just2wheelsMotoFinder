import { Suspense } from "react"
import SearchClient from "./search-client"
import Loading from "./loading"

export default function SearchPage() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Search</h1>
      <Suspense fallback={<Loading />}>
        <SearchClient />
      </Suspense>
    </div>
  )
}
