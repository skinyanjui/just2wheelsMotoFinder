"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"

export default function SearchClient() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [searchValue, setSearchValue] = useState(query)

  // Update the input value when the URL query changes
  useEffect(() => {
    setSearchValue(query)
  }, [query])

  return (
    <div className="max-w-md mx-auto">
      <input
        type="search"
        placeholder="Search listings..."
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <p className="mt-4 text-center text-muted-foreground">
        {query ? `Showing results for: ${query}` : "Enter your search query above."}
      </p>
    </div>
  )
}
