"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export function SearchBar() {
  const [query, setQuery] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/listings?q=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
        <Input
          type="search"
          placeholder="Search by make, model, or keyword..."
          className="h-12 w-full rounded-full bg-white/90 pl-10 pr-20 text-base shadow-md backdrop-blur-sm dark:bg-black/70"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search listings"
        />
        <Button
          type="submit"
          className="absolute right-1.5 top-1/2 h-9 -translate-y-1/2 rounded-full px-4"
          aria-label="Search"
        >
          Search
        </Button>
      </div>
    </form>
  )
}
