"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import ListingCard from "@/components/ui/listing-card"
import { useEffect, useState } from "react"

const mockListings = [
  {
    id: "1",
    title: "Vintage Record Player",
    price: 75,
    location: "New York, NY",
    category: "antiques",
    condition: "Used",
    imageUrl: "/placeholder.svg?height=600&width=800&query=record player",
    isFeatured: true,
    createdAt: "2023-05-01T12:00:00Z",
  },
  {
    id: "2",
    title: "Antique Writing Desk",
    price: 450,
    location: "Boston, MA",
    category: "antiques",
    condition: "Refurbished",
    imageUrl: "/placeholder.svg?height=600&width=800&query=writing desk",
    isFeatured: false,
    createdAt: "2023-05-02T14:30:00Z",
  },
  {
    id: "3",
    title: "Power Drill Set",
    price: 120,
    location: "Chicago, IL",
    category: "tools",
    condition: "New",
    imageUrl: "/placeholder.svg?height=600&width=800&query=power drill",
    isFeatured: false,
    createdAt: "2023-05-03T09:15:00Z",
  },
  {
    id: "4",
    title: "2023 Zero SR/F Electric Motorcycle",
    price: 19999,
    location: "Los Angeles, CA",
    category: "electric",
    condition: "New",
    imageUrl: "/placeholder.svg?height=600&width=800&query=electric motorcycle",
    isFeatured: true,
    createdAt: "2023-05-05T16:20:00Z",
  },
  {
    id: "5",
    title: "Handmade Wooden Chair",
    price: 90,
    location: "Seattle, WA",
    category: "furniture",
    condition: "New",
    imageUrl: "/placeholder.svg?height=600&width=800&query=wooden chair",
    isFeatured: false,
    createdAt: "2023-05-04T18:45:00Z",
  },
  {
    id: "6",
    title: "Set of Vintage Books",
    price: 60,
    location: "San Francisco, CA",
    category: "books",
    condition: "Used",
    imageUrl: "/placeholder.svg?height=600&width=800&query=vintage books",
    isFeatured: false,
    createdAt: "2023-05-06T11:00:00Z",
  },
]

export default function ListingsPage() {
  const [listings, setListings] = useState(mockListings)
  const [category, setCategory] = useState<string | undefined>(undefined)

  useEffect(() => {
    if (category) {
      setListings(mockListings.filter((listing) => listing.category === category))
    } else {
      setListings(mockListings)
    }
  }, [category])

  return (
    <div className="container py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Listings</h1>
        <Select onValueChange={setCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="antiques">Antiques</SelectItem>
            <SelectItem value="furniture">Furniture</SelectItem>
            <SelectItem value="books">Books</SelectItem>
            <SelectItem value="tools">Tools & Equipment</SelectItem>
            <SelectItem value="electric">Electric</SelectItem>
            <SelectItem value="all">All</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {listings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    </div>
  )
}
