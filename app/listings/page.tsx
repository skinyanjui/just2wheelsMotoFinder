// app/listings/page.tsx
"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import ListingCard from "@/components/listing-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, ListFilter } from "lucide-react"
import { mockListings as initialMockListings } from "@/lib/mock-data/listings" // Ensure this path is correct

interface Listing {
  id: string
  title: string
  price: number
  location: string
  category: string // "motorcycles", "parts", "gear", "services"
  condition: string // "New", "Used", "Used - Like New", "Used - Good", "Used - Fair", "For Parts"
  make?: string // Added
  model?: string // Added
  imageUrl: string
  isFeatured: boolean
  createdAt: string // ISO date string
  description?: string
  seller?: { name: string; avatarUrl?: string; isVerified?: boolean }
}

function ListingsPageContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  // Initial state from search params or defaults
  const [listings, setListings] = useState<Listing[]>(initialMockListings)
  const [filteredListings, setFilteredListings] = useState<Listing[]>(initialMockListings)

  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "")
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "")
  const [selectedLocation, setSelectedLocation] = useState(searchParams.get("location") || "")
  const [selectedMake, setSelectedMake] = useState(searchParams.get("make") || "") // Added
  const [selectedModel, setSelectedModel] = useState(searchParams.get("model") || "") // Added

  const initialMinPrice = searchParams.get("minPrice") ? Number.parseInt(searchParams.get("minPrice")!, 10) : 0
  const initialMaxPrice = searchParams.get("maxPrice") ? Number.parseInt(searchParams.get("maxPrice")!, 10) : 50000
  const [priceRange, setPriceRange] = useState<[number, number]>([initialMinPrice, initialMaxPrice])

  const initialConditions = searchParams.get("conditions") ? searchParams.get("conditions")!.split(",") : []
  const [conditions, setConditions] = useState<string[]>(initialConditions)

  const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "newest")
  const [showFilters, setShowFilters] = useState(false)

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams()
    if (searchQuery) params.set("q", searchQuery)
    if (selectedCategory) params.set("category", selectedCategory)
    if (selectedLocation) params.set("location", selectedLocation)
    if (selectedMake) params.set("make", selectedMake)
    if (selectedModel) params.set("model", selectedModel)
    if (priceRange[0] !== 0) params.set("minPrice", priceRange[0].toString())
    if (priceRange[1] !== 50000) params.set("maxPrice", priceRange[1].toString())
    if (conditions.length > 0) params.set("conditions", conditions.join(","))
    if (sortBy !== "newest") params.set("sortBy", sortBy)

    // Update router without page reload
    router.replace(`/listings?${params.toString()}`, { scroll: false })
  }, [
    searchQuery,
    selectedCategory,
    selectedLocation,
    selectedMake,
    selectedModel,
    priceRange,
    conditions,
    sortBy,
    router,
  ])

  // Apply filters whenever listings or filter criteria change
  useEffect(() => {
    applyFilters()
  }, [
    listings,
    searchQuery,
    selectedCategory,
    selectedLocation,
    selectedMake,
    selectedModel,
    priceRange,
    conditions,
    sortBy,
  ])

  const applyFilters = () => {
    let filtered = [...listings]

    // Apply search query filter
    if (searchQuery) {
      filtered = filtered.filter(
        (listing) =>
          listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          listing.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          listing.make?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          listing.model?.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter((listing) => listing.category === selectedCategory)
    }

    // Apply location filter
    if (selectedLocation) {
      filtered = filtered.filter((listing) => listing.location.toLowerCase().includes(selectedLocation.toLowerCase()))
    }

    // Apply make filter
    if (selectedMake) {
      filtered = filtered.filter((listing) => listing.make === selectedMake)
    }

    // Apply model filter (only if a make is also selected)
    if (selectedMake && selectedModel) {
      filtered = filtered.filter((listing) => listing.model === selectedModel)
    }

    // Apply price range filter
    filtered = filtered.filter((listing) => listing.price >= priceRange[0] && listing.price <= priceRange[1])

    // Apply condition filter
    if (conditions.length > 0) {
      filtered = filtered.filter((listing) => conditions.includes(listing.condition))
    }

    // Apply sorting
    switch (sortBy) {
      case "priceLowToHigh":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "priceHighToLow":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "newest":
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      case "oldest":
        filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
        break
    }
    setFilteredListings(filtered)
  }

  const handleConditionChange = (condition: string) => {
    setConditions((prev) => (prev.includes(condition) ? prev.filter((c) => c !== condition) : [...prev, condition]))
  }

  const resetFilters = () => {
    setSearchQuery("")
    setSelectedCategory("")
    setSelectedLocation("")
    setPriceRange([0, 50000])
    setSelectedMake("")
    setSelectedModel("")
    setConditions([])
    setSortBy("newest")
  }

  // Dynamically get unique values for dropdowns
  const availableCategories = Array.from(new Set(listings.map((l) => l.category).filter(Boolean))).sort()
  const availableLocations = Array.from(new Set(listings.map((l) => l.location).filter(Boolean))).sort()
  const availableConditions = Array.from(new Set(listings.map((l) => l.condition).filter(Boolean))).sort()
  const availableMakes = Array.from(new Set(listings.map((l) => l.make).filter(Boolean))).sort()

  const availableModels = selectedMake
    ? Array.from(
        new Set(
          listings
            .filter((l) => l.make === selectedMake)
            .map((l) => l.model)
            .filter(Boolean),
        ),
      ).sort()
    : []

  // Function to handle make change and reset model
  const handleMakeChange = (make: string) => {
    setSelectedMake(make)
    setSelectedModel("") // Reset model when make changes
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold">Motorcycle Listings</h1>
        <Button onClick={() => setShowFilters(!showFilters)} variant="outline" className="sm:hidden">
          <ListFilter className="mr-2 h-4 w-4" /> {showFilters ? "Hide" : "Show"} Filters
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        {/* Filters Sidebar */}
        <aside className={`md:col-span-1 ${showFilters ? "block" : "hidden"} md:block`}>
          <div className="sticky top-20 space-y-6 rounded-lg border bg-card p-6 shadow">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Filters</h2>
              <Button variant="ghost" size="sm" onClick={resetFilters} className="text-primary hover:text-primary/80">
                Reset All
              </Button>
            </div>

            {/* Search Input */}
            <div>
              <Label htmlFor="search" className="mb-2 block">
                Search
              </Label>
              <div className="relative">
                <Input
                  id="search"
                  type="text"
                  placeholder="Keywords, make, model..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <Label htmlFor="category" className="mb-2 block">
                Category
              </Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {availableCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Make Filter */}
            <div>
              <Label htmlFor="make" className="mb-2 block">
                Make
              </Label>
              <Select value={selectedMake} onValueChange={handleMakeChange}>
                <SelectTrigger id="make">
                  <SelectValue placeholder="All Makes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Makes</SelectItem>
                  {availableMakes.map((make) => (
                    <SelectItem key={make} value={make}>
                      {make}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Model Filter - Enabled only if a make is selected */}
            <div>
              <Label htmlFor="model" className="mb-2 block">
                Model
              </Label>
              <Select
                value={selectedModel}
                onValueChange={setSelectedModel}
                disabled={!selectedMake || availableModels.length === 0}
              >
                <SelectTrigger id="model">
                  <SelectValue placeholder={!selectedMake ? "Select make first" : "All Models"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Models</SelectItem>
                  {availableModels.map((model) => (
                    <SelectItem key={model} value={model}>
                      {model}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Location Filter */}
            <div>
              <Label htmlFor="location" className="mb-2 block">
                Location
              </Label>
              <Input
                id="location"
                type="text"
                placeholder="City or Zip Code"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              />
            </div>

            {/* Price Range Filter */}
            <div>
              <Label className="mb-2 block">Price Range</Label>
              <Slider
                min={0}
                max={50000}
                step={500}
                value={priceRange}
                onValueChange={(value: [number, number]) => setPriceRange(value)}
                className="my-4"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>${priceRange[0]}</span>
                <span>
                  ${priceRange[1]}
                  {priceRange[1] === 50000 ? "+" : ""}
                </span>
              </div>
            </div>

            {/* Condition Filter */}
            <div>
              <Label className="mb-2 block">Condition</Label>
              <div className="space-y-2">
                {availableConditions.map((condition) => (
                  <div key={condition} className="flex items-center space-x-2">
                    <Checkbox
                      id={`condition-${condition}`}
                      checked={conditions.includes(condition)}
                      onCheckedChange={() => handleConditionChange(condition)}
                    />
                    <Label htmlFor={`condition-${condition}`} className="font-normal">
                      {condition}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Listings Grid */}
        <main className="md:col-span-3">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {filteredListings.length} of {listings.length} listings
            </p>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="priceLowToHigh">Price: Low to High</SelectItem>
                <SelectItem value="priceHighToLow">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {filteredListings.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredListings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <Search className="mx-auto mb-4 h-16 w-16 text-muted-foreground/50" />
              <h3 className="text-xl font-semibold">No Listings Found</h3>
              <p className="mt-2 text-muted-foreground">Try adjusting your filters or search query.</p>
              <Button variant="outline" onClick={resetFilters} className="mt-6">
                Clear All Filters
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

// Default export Page component wraps ListingsPageContent in Suspense
export default function ListingsPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading listings...</div>}>
      <ListingsPageContent />
    </Suspense>
  )
}
