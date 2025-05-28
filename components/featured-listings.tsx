"use client"

import ListingCard from "@/components/ui/listing-card"

// Mock featured listings data
const mockFeaturedListings = [
  {
    id: "1",
    title: "2023 Kawasaki Ninja ZX-10R",
    price: 16999,
    location: "Los Angeles, CA",
    category: "motorcycles",
    condition: "New",
    imageUrl: "/kawasaki-ninja-motorcycle.png",
    isFeatured: true,
    createdAt: "2023-05-01T12:00:00Z",
  },
  {
    id: "2",
    title: "2022 Harley-Davidson Street Glide",
    price: 24999,
    location: "Phoenix, AZ",
    category: "motorcycles",
    condition: "Used",
    imageUrl: "/classic-harley.png",
    isFeatured: true,
    createdAt: "2023-05-02T14:30:00Z",
  },
  {
    id: "3",
    title: "2023 Zero SR/F Premium",
    price: 23495,
    location: "San Francisco, CA",
    category: "electric",
    condition: "New",
    imageUrl: "/placeholder.svg?height=600&width=800&query=zero electric motorcycle",
    isFeatured: true,
    createdAt: "2023-05-03T09:15:00Z",
  },
  {
    id: "4",
    title: "AGV Pista GP RR Helmet",
    price: 1399,
    location: "Miami, FL",
    category: "gear",
    condition: "New",
    imageUrl: "/motorcycle-helmet.png",
    isFeatured: true,
    createdAt: "2023-05-04T16:20:00Z",
  },
]

export default function FeaturedListings() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {mockFeaturedListings.map((listing) => (
        <ListingCard key={listing.id} listing={listing} />
      ))}
    </div>
  )
}
