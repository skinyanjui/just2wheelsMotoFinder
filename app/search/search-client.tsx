"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export default function SearchClient() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const query = searchParams.get("q") || ""
  const [searchInput, setSearchInput] = useState(query)

  // Update input when URL changes
  useEffect(() => {
    setSearchInput(query)
  }, [query])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchInput.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchInput.trim())}`)
    } else {
      router.push("/search")
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <Input
          type="search"
          placeholder="Search listings..."
          className="w-full pl-10 pr-4 py-2 rounded-md"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          aria-label="Search listings"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Button type="submit" className="sr-only">
          Search
        </Button>
      </form>
      <p className="mt-4 text-center text-muted-foreground">
        {query ? `Showing results for "${query}"` : "Enter your search query above."}
      </p>
    </div>
  )
}
