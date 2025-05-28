"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export default function SearchClient() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const category = searchParams.get("category")
  const [selectedCategory, setSelectedCategory] = useState(category || "")

  useEffect(() => {
    setSelectedCategory(category || "")
  }, [category])

  const handleCategoryChange = (value: string) => {
    const params = new URLSearchParams(searchParams)

    if (value) {
      params.set("category", value)
    } else {
      params.delete("category")
    }

    router.push("/search?" + params.toString())
  }

  return (
    <Select value={selectedCategory} onValueChange={handleCategoryChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="">All</SelectItem>
        <SelectItem value="tools">Tools & Equipment</SelectItem>
        <SelectItem value="electric">Electric</SelectItem>
        <SelectItem value="furniture">Furniture</SelectItem>
        <SelectItem value="clothing">Clothing</SelectItem>
      </SelectContent>
    </Select>
  )
}
