"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"

export function SearchBar() {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("all")
  const [location, setLocation] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const searchParams = new URLSearchParams()
    if (query) searchParams.set("q", query)
    if (category && category !== "all") searchParams.set("category", category)
    if (location) searchParams.set("location", location)

    router.push(`/listings?${searchParams.toString()}`)
  }

  return (
    <form onSubmit={handleSearch} className="glassmorphic w-full rounded-lg p-2 md:p-3">
      <div className="flex flex-col gap-2 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search motorcycles, parts, gear..."
            className="pl-9"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="md:w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="motorcycles">Motorcycles</SelectItem>
            <SelectItem value="parts">Parts & Accessories</SelectItem>
            <SelectItem value="gear">Riding Gear</SelectItem>
            <SelectItem value="tools">Tools & Equipment</SelectItem>
          </SelectContent>
        </Select>

        <Input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="md:w-[180px]"
        />

        <Button type="submit" className="md:w-auto">
          Search
        </Button>
      </div>
    </form>
  )
}
