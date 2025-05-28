"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, SlidersHorizontal, X, ChevronDown, ChevronUp } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/hooks/use-auth"

interface Listing {
  id: string
  title: string
  price: number
  location: string
  category: string
  condition: string
  imageUrl: string
  isFeatured: boolean
  createdAt: string
  year?: number
  mileage?: number
  engineSize?: number
}

export default function ListingsPage() {
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const { user } = useAuth()

  const [listings, setListings] = useState<Listing[]>([])
  const [filteredListings, setFilteredListings] = useState<Listing[]>([])
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [showFilters, setShowFilters] = useState(true)

  // Filter states
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "")
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "")
  const [selectedLocation, setSelectedLocation] = useState(searchParams.get("location") || "")
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000])
  const [yearRange, setYearRange] = useState<[number, number]>([2000, 2023])
  const [mileageRange, setMileageRange] = useState<[number, number]>([0, 50000])
  const [engineSizeRange, setEngineSizeRange] = useState<[number, number]>([0, 2000])
  const [conditions, setConditions] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("newest")

  // Collapsible filter sections
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    category: true,
    condition: true,
    year: false,
    mileage: false,
    engineSize: false,
    location: true,
  })

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  useEffect(() => {
    // In a real app, this would be an API call with the search params
    const mockListings: Listing[] = [
      {
        id: "1",
        title: "2022 Kawasaki Ninja ZX-6R",
        price: 11999,
        location: "Seattle, WA",
        category: "motorcycles",
        condition: "New",
        imageUrl: "/kawasaki-ninja-motorcycle.png",
        isFeatured: true,
        createdAt: "2023-05-15T14:30:00Z",
        year: 2022,
        mileage: 0,
        engineSize: 636,
      },
      {
        id: "2",
        title: "2020 Harley-Davidson Street Glide",
        price: 18500,
        location: "Portland, OR",
        category: "motorcycles",
        condition: "Used",
        imageUrl: "/classic-harley.png",
        isFeatured: true,
        createdAt: "2023-05-10T09:15:00Z",
        year: 2020,
        mileage: 12500,
        engineSize: 1868,
      },
      {
        id: "3",
        title: "Shoei RF-1400 Helmet - Size M",
        price: 499,
        location: "San Francisco, CA",
        category: "gear",
        condition: "New",
        imageUrl: "/motorcycle-helmet.png",
        isFeatured: false,
        createdAt: "2023-05-18T11:45:00Z",
      },
      {
        id: "4",
        title: "2021 Ducati Panigale V4",
        price: 23999,
        location: "Los Angeles, CA",
        category: "motorcycles",
        condition: "Used",
        imageUrl: "/ducati-panigale.png",
        isFeatured: true,
        createdAt: "2023-05-05T16:20:00Z",
        year: 2021,
        mileage: 3200,
        engineSize: 1103,
      },
      {
        id: "5",
        title: "Alpinestars GP Pro R3 Gloves",
        price: 229,
        location: "Denver, CO",
        category: "gear",
        condition: "New",
        imageUrl: "/placeholder.svg?height=600&width=800&query=motorcycle gloves",
        isFeatured: false,
        createdAt: "2023-05-20T10:30:00Z",
      },
      {
        id: "6",
        title: "2019 BMW R1250GS Adventure",
        price: 16500,
        location: "Phoenix, AZ",
        category: "motorcycles",
        condition: "Used",
        imageUrl: "/placeholder.svg?height=600&width=800&query=bmw adventure motorcycle",
        isFeatured: false,
        createdAt: "2023-05-12T13:10:00Z",
        year: 2019,
        mileage: 18700,
        engineSize: 1254,
      },
      {
        id: "7",
        title: "Yoshimura Exhaust System for GSX-R1000",
        price: 899,
        location: "Miami, FL",
        category: "parts",
        condition: "New",
        imageUrl: "/placeholder.svg?height=600&width=800&query=motorcycle exhaust",
        isFeatured: false,
        createdAt: "2023-05-17T15:45:00Z",
      },
      {
        id: "8",
        title: "2018 Honda Africa Twin",
        price: 10999,
        location: "Chicago, IL",
        category: "motorcycles",
        condition: "Used",
        imageUrl: "/placeholder.svg?height=600&width=800&query=honda africa twin motorcycle",
        isFeatured: false,
        createdAt: "2023-05-08T09:00:00Z",
        year: 2018,
        mileage: 24500,
        engineSize: 1084,
      },
      {
        id: "9",
        title: "2023 Zero SR/F Electric Motorcycle",
        price: 22995,
        location: "Austin, TX",
        category: "electric",
        condition: "New",
        imageUrl: "/placeholder.svg?height=600&width=800&query=zero electric motorcycle",
        isFeatured: true,
        createdAt: "2023-05-21T08:30:00Z",
        year: 2023,
        mileage: 0,
        engineSize: 0,
      },
      {
        id: "10",
        title: "2022 LiveWire One Electric Motorcycle",
        price: 24999,
        location: "San Diego, CA",
        category: "electric",
        condition: "Used",
        imageUrl: "/placeholder.svg?height=600&width=800&query=livewire electric motorcycle",
        isFeatured: false,
        createdAt: "2023-05-19T14:15:00Z",
        year: 2022,
        mileage: 1800,
        engineSize: 0,
      },
    ]

    setListings(mockListings)
  }, [])

  useEffect(() => {
    applyFilters()
  }, [
    listings,
    searchQuery,
    selectedCategory,
    selectedLocation,
    priceRange,
    yearRange,
    mileageRange,
    engineSizeRange,
    conditions,
    sortBy,
  ])

  const applyFilters = () => {
    let filtered = [...listings]

    // Apply search query
    if (searchQuery) {
      filtered = filtered.filter((listing) => listing.title.toLowerCase().includes(searchQuery.toLowerCase()))
    }

    // Apply category filter
    if (selectedCategory && selectedCategory !== "all") {
      filtered = filtered.filter((listing) => listing.category === selectedCategory)
    }

    // Apply location filter
    if (selectedLocation) {
      filtered = filtered.filter((listing) => listing.location.toLowerCase().includes(selectedLocation.toLowerCase()))
    }

    // Apply price range filter
    filtered = filtered.filter((listing) => listing.price >= priceRange[0] && listing.price <= priceRange[1])

    // Apply year range filter
    if (yearRange[0] > 2000 || yearRange[1] < 2023) {
      filtered = filtered.filter(
        (listing) => !listing.year || (listing.year >= yearRange[0] && listing.year <= yearRange[1]),
      )
    }

    // Apply mileage range filter
    if (mileageRange[0] > 0 || mileageRange[1] < 50000) {
      filtered = filtered.filter(
        (listing) => !listing.mileage || (listing.mileage >= mileageRange[0] && listing.mileage <= mileageRange[1]),
      )
    }

    // Apply engine size range filter
    if (engineSizeRange[0] > 0 || engineSizeRange[1] < 2000) {
      filtered = filtered.filter(
        (listing) =>
          !listing.engineSize || (listing.engineSize >= engineSizeRange[0] && listing.engineSize <= engineSizeRange[1]),
      )
    }

    // Apply condition filter
    if (conditions.length > 0) {
      filtered = filtered.filter((listing) => conditions.includes(listing.condition))
    }

    // Apply sorting
    switch (sortBy) {
      case "newest":
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      case "oldest":
        filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
        break
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
    }

    setFilteredListings(filtered)
  }

  const toggleFavorite = (id: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to save favorites",
        variant: "destructive",
      })
      return
    }

    setFavorites((prev) => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(id)) {
        newFavorites.delete(id)
        toast({
          title: "Removed from favorites",
          description: "Listing has been removed from your favorites",
        })
      } else {
        newFavorites.add(id)
        toast({
          title: "Added to favorites",
          description: "Listing has been added to your favorites",
        })
      }
      return newFavorites
    })
  }

  const toggleCondition = (condition: string) => {
    setConditions((prev) => {
      if (prev.includes(condition)) {
        return prev.filter((c) => c !== condition)
      } else {
        return [...prev, condition]
      }
    })
  }

  const resetFilters = () => {
    setSearchQuery("")
    setSelectedCategory("")
    setSelectedLocation("")
    setPriceRange([0, 50000])
    setYearRange([2000, 2023])
    setMileageRange([0, 50000])
    setEngineSizeRange([0, 2000])
    setConditions([])
    setSortBy("newest")
  }

  return (
    <div className="container py-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Motorcycle Listings</h1>
          <p className="text-muted-foreground">
            {filteredListings.length} {filteredListings.length === 1 ? "listing" : "listings"} found
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2" onClick={() => setShowFilters(!showFilters)}>
            <SlidersHorizontal className="h-4 w-4" />
            {showFilters ? "Hide Filters" : "Show Filters"}
          </Button>
          <Button asChild>
            <Link href="/listings/create">Post a Listing</Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {/* Filters sidebar */}
        <div className={`glassmorphic-card p-4 lg:block ${showFilters ? "block" : "hidden"}`}>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Filters</h2>
            <Button variant="ghost" size="sm" onClick={resetFilters} className="h-8 text-xs">
              Reset
            </Button>
          </div>

          <div className="space-y-6">
            <div>
              <Label htmlFor="search" className="mb-2 block">
                Search
              </Label>
              <Input
                id="search"
                placeholder="Search listings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="border-t pt-4">
              <button
                className="flex w-full items-center justify-between mb-2"
                onClick={() => toggleSection("category")}
              >
                <Label className="font-medium">Category</Label>
                {expandedSections.category ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>

              {expandedSections.category && (
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="motorcycles">Motorcycles</SelectItem>
                    <SelectItem value="electric">Electric Motorcycles</SelectItem>
                    <SelectItem value="parts">Parts & Accessories</SelectItem>
                    <SelectItem value="gear">Riding Gear</SelectItem>
                    <SelectItem value="tools">Tools & Equipment</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>

            <div className="border-t pt-4">
              <button className="flex w-full items-center justify-between mb-2" onClick={() => toggleSection("price")}>
                <Label className="font-medium">Price Range</Label>
                {expandedSections.price ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>

              {expandedSections.price && (
                <>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm">
                      ${priceRange[0]} - ${priceRange[1]}
                    </span>
                  </div>
                  <Slider
                    defaultValue={[0, 50000]}
                    max={50000}
                    step={100}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="py-4"
                  />
                  <div className="mt-2 flex gap-2">
                    <Input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                      className="h-8"
                    />
                    <Input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                      className="h-8"
                    />
                  </div>
                </>
              )}
            </div>

            <div className="border-t pt-4">
              <button
                className="flex w-full items-center justify-between mb-2"
                onClick={() => toggleSection("condition")}
              >
                <Label className="font-medium">Condition</Label>
                {expandedSections.condition ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>

              {expandedSections.condition && (
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="condition-new"
                      checked={conditions.includes("New")}
                      onCheckedChange={() => toggleCondition("New")}
                    />
                    <Label htmlFor="condition-new" className="font-normal">
                      New
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="condition-used"
                      checked={conditions.includes("Used")}
                      onCheckedChange={() => toggleCondition("Used")}
                    />
                    <Label htmlFor="condition-used" className="font-normal">
                      Used
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="condition-refurbished"
                      checked={conditions.includes("Refurbished")}
                      onCheckedChange={() => toggleCondition("Refurbished")}
                    />
                    <Label htmlFor="condition-refurbished" className="font-normal">
                      Refurbished
                    </Label>
                  </div>
                </div>
              )}
            </div>

            <div className="border-t pt-4">
              <button className="flex w-full items-center justify-between mb-2" onClick={() => toggleSection("year")}>
                <Label className="font-medium">Year</Label>
                {expandedSections.year ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>

              {expandedSections.year && (
                <>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm">
                      {yearRange[0]} - {yearRange[1]}
                    </span>
                  </div>
                  <Slider
                    defaultValue={[2000, 2023]}
                    min={2000}
                    max={2023}
                    step={1}
                    value={yearRange}
                    onValueChange={setYearRange}
                    className="py-4"
                  />
                  <div className="mt-2 flex gap-2">
                    <Input
                      type="number"
                      value={yearRange[0]}
                      onChange={(e) => setYearRange([Number(e.target.value), yearRange[1]])}
                      className="h-8"
                    />
                    <Input
                      type="number"
                      value={yearRange[1]}
                      onChange={(e) => setYearRange([yearRange[0], Number(e.target.value)])}
                      className="h-8"
                    />
                  </div>
                </>
              )}
            </div>

            <div className="border-t pt-4">
              <button
                className="flex w-full items-center justify-between mb-2"
                onClick={() => toggleSection("mileage")}
              >
                <Label className="font-medium">Mileage</Label>
                {expandedSections.mileage ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>

              {expandedSections.mileage && (
                <>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm">
                      {mileageRange[0]} - {mileageRange[1]} miles
                    </span>
                  </div>
                  <Slider
                    defaultValue={[0, 50000]}
                    max={50000}
                    step={500}
                    value={mileageRange}
                    onValueChange={setMileageRange}
                    className="py-4"
                  />
                </>
              )}
            </div>

            <div className="border-t pt-4">
              <button
                className="flex w-full items-center justify-between mb-2"
                onClick={() => toggleSection("engineSize")}
              >
                <Label className="font-medium">Engine Size (cc)</Label>
                {expandedSections.engineSize ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>

              {expandedSections.engineSize && (
                <>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm">
                      {engineSizeRange[0]} - {engineSizeRange[1]} cc
                    </span>
                  </div>
                  <Slider
                    defaultValue={[0, 2000]}
                    max={2000}
                    step={50}
                    value={engineSizeRange}
                    onValueChange={setEngineSizeRange}
                    className="py-4"
                  />
                </>
              )}
            </div>

            <div className="border-t pt-4">
              <button
                className="flex w-full items-center justify-between mb-2"
                onClick={() => toggleSection("location")}
              >
                <Label className="font-medium">Location</Label>
                {expandedSections.location ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>

              {expandedSections.location && (
                <Input
                  id="location"
                  placeholder="City, State"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                />
              )}
            </div>

            <div className="border-t pt-4">
              <Label htmlFor="sort" className="mb-2 block font-medium">
                Sort By
              </Label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger id="sort">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Listings grid */}
        <div className="lg:col-span-3">
          {filteredListings.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredListings.map((listing) => (
                <Card key={listing.id} className="glassmorphic-card overflow-hidden">
                  <div className="relative">
                    <Link href={`/listings/${listing.id}`}>
                      <div className="aspect-[4/3] overflow-hidden">
                        <Image
                          src={listing.imageUrl || "/placeholder.svg"}
                          alt={listing.title}
                          width={400}
                          height={300}
                          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-2 rounded-full bg-background/80 backdrop-blur-sm"
                      onClick={() => toggleFavorite(listing.id)}
                    >
                      <Heart className={`h-5 w-5 ${favorites.has(listing.id) ? "fill-red-500 text-red-500" : ""}`} />
                      <span className="sr-only">Add to favorites</span>
                    </Button>
                    {listing.isFeatured && (
                      <Badge className="absolute left-2 top-2" variant="secondary">
                        Featured
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <Badge variant="outline">{listing.condition}</Badge>
                      <span className="text-sm text-muted-foreground">{listing.location}</span>
                    </div>
                    <Link href={`/listings/${listing.id}`} className="group">
                      <h3 className="line-clamp-1 text-lg font-semibold group-hover:text-primary">{listing.title}</h3>
                    </Link>
                    <p className="mt-1 text-xl font-bold">${listing.price.toLocaleString()}</p>

                    {/* Additional details for motorcycles */}
                    {listing.category === "motorcycles" || listing.category === "electric" ? (
                      <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                        {listing.year && (
                          <div>
                            <span className="font-medium">Year:</span> {listing.year}
                          </div>
                        )}
                        {listing.mileage !== undefined && (
                          <div>
                            <span className="font-medium">Mileage:</span> {listing.mileage.toLocaleString()} mi
                          </div>
                        )}
                        {listing.engineSize !== undefined && listing.engineSize > 0 && (
                          <div>
                            <span className="font-medium">Engine:</span> {listing.engineSize} cc
                          </div>
                        )}
                        {listing.category === "electric" && (
                          <div>
                            <span className="font-medium">Type:</span> Electric
                          </div>
                        )}
                      </div>
                    ) : null}
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button asChild className="w-full">
                      <Link href={`/listings/${listing.id}`}>View Details</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="glassmorphic-card flex flex-col items-center justify-center p-12 text-center">
              <X className="mb-4 h-12 w-12 text-muted-foreground" />
              <h3 className="text-xl font-semibold">No listings found</h3>
              <p className="mb-6 text-muted-foreground">Try adjusting your filters or search criteria</p>
              <Button onClick={resetFilters}>Reset Filters</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
