"use client"

import { Skeleton } from "@/components/ui/skeleton"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import ListingCard from "@/components/ui/listing-card"
import { mockListings } from "@/lib/mock-data/listings"
import { Filter, X, ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"

interface ListingsClientProps {
  initialQuery?: string
  initialCategory?: string
  initialSort?: string
  initialMinPrice?: number
  initialMaxPrice?: number
  initialCondition?: string
  initialLocation?: string
}

export default function ListingsClient({
  initialQuery = "",
  initialCategory = "",
  initialSort = "newest",
  initialMinPrice,
  initialMaxPrice,
  initialCondition = "",
  initialLocation = "",
}: ListingsClientProps) {
  const router = useRouter()
  const pathname = usePathname()
  const isMobile = useMediaQuery("(max-width: 768px)")

  // Filter states
  const [query, setQuery] = useState(initialQuery)
  const [category, setCategory] = useState(initialCategory)
  const [sort, setSort] = useState(initialSort)
  const [priceRange, setPriceRange] = useState<[number, number]>([initialMinPrice || 0, initialMaxPrice || 50000])
  const [minPrice, setMinPrice] = useState<string>(initialMinPrice?.toString() || "0")
  const [maxPrice, setMaxPrice] = useState<string>(initialMaxPrice?.toString() || "50000")
  const [condition, setCondition] = useState(initialCondition)
  const [location, setLocation] = useState(initialLocation)
  const [yearRange, setYearRange] = useState<[number, number]>([2000, 2023])
  const [minYear, setMinYear] = useState<string>("2000")
  const [maxYear, setMaxYear] = useState<string>("2023")
  const [mileageRange, setMileageRange] = useState<[number, number]>([0, 50000])
  const [minMileage, setMinMileage] = useState<string>("0")
  const [maxMileage, setMaxMileage] = useState<string>("50000")
  const [engineSizeRange, setEngineSizeRange] = useState<[number, number]>([0, 2000])
  const [minEngineSize, setMinEngineSize] = useState<string>("0")
  const [maxEngineSize, setMaxEngineSize] = useState<string>("2000")

  // UI states
  const [showFilters, setShowFilters] = useState(!isMobile)
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [filteredListings, setFilteredListings] = useState(mockListings)
  const [isLoading, setIsLoading] = useState(true)

  // Apply filters
  useEffect(() => {
    setIsLoading(true)

    // Simulate API call with delay
    const timer = setTimeout(() => {
      let filtered = [...mockListings]

      // Apply search query
      if (query) {
        filtered = filtered.filter((listing) => listing.title.toLowerCase().includes(query.toLowerCase()))
      }

      // Apply category filter
      if (category) {
        filtered = filtered.filter((listing) => listing.category === category)
      }

      // Apply price range filter
      filtered = filtered.filter((listing) => listing.price >= priceRange[0] && listing.price <= priceRange[1])

      // Apply condition filter
      if (condition) {
        filtered = filtered.filter((listing) => listing.condition === condition)
      }

      // Apply location filter
      if (location) {
        filtered = filtered.filter((listing) => listing.location.toLowerCase().includes(location.toLowerCase()))
      }

      // Apply sorting
      switch (sort) {
        case "newest":
          filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          break
        case "oldest":
          filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
          break
        case "price-low-high":
          filtered.sort((a, b) => a.price - b.price)
          break
        case "price-high-low":
          filtered.sort((a, b) => b.price - a.price)
          break
      }

      // Update active filters
      const newActiveFilters = []
      if (category) newActiveFilters.push(`Category: ${category}`)
      if (priceRange[0] > 0 || priceRange[1] < 50000)
        newActiveFilters.push(`Price: $${priceRange[0]} - $${priceRange[1]}`)
      if (condition) newActiveFilters.push(`Condition: ${condition}`)
      if (location) newActiveFilters.push(`Location: ${location}`)

      setActiveFilters(newActiveFilters)
      setFilteredListings(filtered)
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [query, category, sort, priceRange, condition, location])

  // Update URL with filters
  useEffect(() => {
    const params = new URLSearchParams()

    if (query) params.set("q", query)
    if (category) params.set("category", category)
    if (sort) params.set("sort", sort)
    if (priceRange[0] > 0) params.set("minPrice", priceRange[0].toString())
    if (priceRange[1] < 50000) params.set("maxPrice", priceRange[1].toString())
    if (condition) params.set("condition", condition)
    if (location) params.set("location", location)

    const url = `${pathname}?${params.toString()}`
    router.push(url, { scroll: false })
  }, [query, category, sort, priceRange, condition, location, pathname, router])

  // Handle price input changes
  const handleMinPriceChange = (value: string) => {
    setMinPrice(value)
    const numValue = Number.parseInt(value) || 0
    setPriceRange([numValue, priceRange[1]])
  }

  const handleMaxPriceChange = (value: string) => {
    setMaxPrice(value)
    const numValue = Number.parseInt(value) || 50000
    setPriceRange([priceRange[0], numValue])
  }

  // Handle year input changes
  const handleMinYearChange = (value: string) => {
    setMinYear(value)
    const numValue = Number.parseInt(value) || 2000
    setYearRange([numValue, yearRange[1]])
  }

  const handleMaxYearChange = (value: string) => {
    setMaxYear(value)
    const numValue = Number.parseInt(value) || 2023
    setYearRange([yearRange[0], numValue])
  }

  // Handle mileage input changes
  const handleMinMileageChange = (value: string) => {
    setMinMileage(value)
    const numValue = Number.parseInt(value) || 0
    setMileageRange([numValue, mileageRange[1]])
  }

  const handleMaxMileageChange = (value: string) => {
    setMaxMileage(value)
    const numValue = Number.parseInt(value) || 50000
    setMileageRange([mileageRange[0], numValue])
  }

  // Handle engine size input changes
  const handleMinEngineSizeChange = (value: string) => {
    setMinEngineSize(value)
    const numValue = Number.parseInt(value) || 0
    setEngineSizeRange([numValue, engineSizeRange[1]])
  }

  const handleMaxEngineSizeChange = (value: string) => {
    setMaxEngineSize(value)
    const numValue = Number.parseInt(value) || 2000
    setEngineSizeRange([engineSizeRange[0], numValue])
  }

  // Reset all filters
  const resetFilters = () => {
    setQuery("")
    setCategory("")
    setSort("newest")
    setPriceRange([0, 50000])
    setMinPrice("0")
    setMaxPrice("50000")
    setCondition("")
    setLocation("")
    setYearRange([2000, 2023])
    setMinYear("2000")
    setMaxYear("2023")
    setMileageRange([0, 50000])
    setMinMileage("0")
    setMaxMileage("50000")
    setEngineSizeRange([0, 2000])
    setMinEngineSize("0")
    setMaxEngineSize("2000")
  }

  // Toggle filters visibility on mobile
  const toggleFilters = () => {
    setShowFilters(!showFilters)
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
      {/* Mobile filter toggle */}
      <div className="flex items-center justify-between md:hidden">
        <Button variant="outline" size="sm" onClick={toggleFilters} className="mb-4 flex items-center gap-2">
          <Filter className="h-4 w-4" />
          {showFilters ? "Hide Filters" : "Show Filters"}
          {showFilters ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>

        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
            <SelectItem value="price-low-high">Price: Low to High</SelectItem>
            <SelectItem value="price-high-low">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Filters sidebar */}
      {showFilters && (
        <div className="md:col-span-1">
          <Card className="glassmorphic-card sticky top-24 p-4">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Filters</h2>
              <Button variant="ghost" size="sm" onClick={resetFilters} className="h-8 text-xs">
                Reset All
              </Button>
            </div>

            <div className="space-y-4">
              {/* Search */}
              <div>
                <Label htmlFor="search" className="text-sm">
                  Search
                </Label>
                <div className="relative mt-1">
                  <Input
                    id="search"
                    placeholder="Search listings..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full"
                  />
                  {query && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full w-8"
                      onClick={() => setQuery("")}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Clear search</span>
                    </Button>
                  )}
                </div>
              </div>

              <Separator />

              {/* Category */}
              <Accordion type="single" collapsible defaultValue="category">
                <AccordionItem value="category" className="border-none">
                  <AccordionTrigger className="py-2 text-sm font-medium">Category</AccordionTrigger>
                  <AccordionContent>
                    <RadioGroup value={category} onValueChange={setCategory} className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="" id="category-all" />
                        <Label htmlFor="category-all" className="text-sm">
                          All Categories
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="motorcycles" id="category-motorcycles" />
                        <Label htmlFor="category-motorcycles" className="text-sm">
                          Motorcycles
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="parts" id="category-parts" />
                        <Label htmlFor="category-parts" className="text-sm">
                          Parts & Accessories
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="gear" id="category-gear" />
                        <Label htmlFor="category-gear" className="text-sm">
                          Riding Gear
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="tools" id="category-tools" />
                        <Label htmlFor="category-tools" className="text-sm">
                          Tools & Equipment
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="electric" id="category-electric" />
                        <Label htmlFor="category-electric" className="text-sm">
                          Electric
                        </Label>
                      </div>
                    </RadioGroup>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <Separator />

              {/* Price Range */}
              <Accordion type="single" collapsible defaultValue="price">
                <AccordionItem value="price" className="border-none">
                  <AccordionTrigger className="py-2 text-sm font-medium">Price Range</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <Slider
                        value={priceRange}
                        min={0}
                        max={50000}
                        step={100}
                        onValueChange={setPriceRange}
                        className="py-4"
                      />
                      <div className="flex items-center gap-2">
                        <div>
                          <Label htmlFor="min-price" className="sr-only">
                            Minimum Price
                          </Label>
                          <div className="relative">
                            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                            <Input
                              id="min-price"
                              type="number"
                              min={0}
                              max={priceRange[1]}
                              value={minPrice}
                              onChange={(e) => handleMinPriceChange(e.target.value)}
                              className="pl-6"
                            />
                          </div>
                        </div>
                        <span className="text-center text-muted-foreground">to</span>
                        <div>
                          <Label htmlFor="max-price" className="sr-only">
                            Maximum Price
                          </Label>
                          <div className="relative">
                            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                            <Input
                              id="max-price"
                              type="number"
                              min={priceRange[0]}
                              max={50000}
                              value={maxPrice}
                              onChange={(e) => handleMaxPriceChange(e.target.value)}
                              className="pl-6"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <Separator />

              {/* Condition */}
              <Accordion type="single" collapsible defaultValue="condition">
                <AccordionItem value="condition" className="border-none">
                  <AccordionTrigger className="py-2 text-sm font-medium">Condition</AccordionTrigger>
                  <AccordionContent>
                    <RadioGroup value={condition} onValueChange={setCondition} className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="" id="condition-all" />
                        <Label htmlFor="condition-all" className="text-sm">
                          All Conditions
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="New" id="condition-new" />
                        <Label htmlFor="condition-new" className="text-sm">
                          New
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Like New" id="condition-like-new" />
                        <Label htmlFor="condition-like-new" className="text-sm">
                          Like New
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Excellent" id="condition-excellent" />
                        <Label htmlFor="condition-excellent" className="text-sm">
                          Excellent
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Good" id="condition-good" />
                        <Label htmlFor="condition-good" className="text-sm">
                          Good
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Fair" id="condition-fair" />
                        <Label htmlFor="condition-fair" className="text-sm">
                          Fair
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Poor" id="condition-poor" />
                        <Label htmlFor="condition-poor" className="text-sm">
                          Poor
                        </Label>
                      </div>
                    </RadioGroup>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <Separator />

              {/* Location */}
              <Accordion type="single" collapsible>
                <AccordionItem value="location" className="border-none">
                  <AccordionTrigger className="py-2 text-sm font-medium">Location</AccordionTrigger>
                  <AccordionContent>
                    <div>
                      <Label htmlFor="location" className="sr-only">
                        Location
                      </Label>
                      <Input
                        id="location"
                        placeholder="City, State"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full"
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <Separator />

              {/* Year Range (for motorcycles) */}
              <Accordion type="single" collapsible>
                <AccordionItem value="year" className="border-none">
                  <AccordionTrigger className="py-2 text-sm font-medium">Year Range</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <Slider
                        value={yearRange}
                        min={1970}
                        max={2023}
                        step={1}
                        onValueChange={setYearRange}
                        className="py-4"
                      />
                      <div className="flex items-center gap-2">
                        <div>
                          <Label htmlFor="min-year" className="sr-only">
                            Minimum Year
                          </Label>
                          <Input
                            id="min-year"
                            type="number"
                            min={1970}
                            max={yearRange[1]}
                            value={minYear}
                            onChange={(e) => handleMinYearChange(e.target.value)}
                          />
                        </div>
                        <span className="text-center text-muted-foreground">to</span>
                        <div>
                          <Label htmlFor="max-year" className="sr-only">
                            Maximum Year
                          </Label>
                          <Input
                            id="max-year"
                            type="number"
                            min={yearRange[0]}
                            max={2023}
                            value={maxYear}
                            onChange={(e) => handleMaxYearChange(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <Separator />

              {/* Mileage Range (for motorcycles) */}
              <Accordion type="single" collapsible>
                <AccordionItem value="mileage" className="border-none">
                  <AccordionTrigger className="py-2 text-sm font-medium">Mileage Range</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <Slider
                        value={mileageRange}
                        min={0}
                        max={50000}
                        step={500}
                        onValueChange={setMileageRange}
                        className="py-4"
                      />
                      <div className="flex items-center gap-2">
                        <div>
                          <Label htmlFor="min-mileage" className="sr-only">
                            Minimum Mileage
                          </Label>
                          <Input
                            id="min-mileage"
                            type="number"
                            min={0}
                            max={mileageRange[1]}
                            value={minMileage}
                            onChange={(e) => handleMinMileageChange(e.target.value)}
                          />
                        </div>
                        <span className="text-center text-muted-foreground">to</span>
                        <div>
                          <Label htmlFor="max-mileage" className="sr-only">
                            Maximum Mileage
                          </Label>
                          <Input
                            id="max-mileage"
                            type="number"
                            min={mileageRange[0]}
                            max={50000}
                            value={maxMileage}
                            onChange={(e) => handleMaxMileageChange(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <Separator />

              {/* Engine Size Range (for motorcycles) */}
              <Accordion type="single" collapsible>
                <AccordionItem value="engine-size" className="border-none">
                  <AccordionTrigger className="py-2 text-sm font-medium">Engine Size (cc)</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <Slider
                        value={engineSizeRange}
                        min={0}
                        max={2000}
                        step={50}
                        onValueChange={setEngineSizeRange}
                        className="py-4"
                      />
                      <div className="flex items-center gap-2">
                        <div>
                          <Label htmlFor="min-engine-size" className="sr-only">
                            Minimum Engine Size
                          </Label>
                          <Input
                            id="min-engine-size"
                            type="number"
                            min={0}
                            max={engineSizeRange[1]}
                            value={minEngineSize}
                            onChange={(e) => handleMinEngineSizeChange(e.target.value)}
                          />
                        </div>
                        <span className="text-center text-muted-foreground">to</span>
                        <div>
                          <Label htmlFor="max-engine-size" className="sr-only">
                            Maximum Engine Size
                          </Label>
                          <Input
                            id="max-engine-size"
                            type="number"
                            min={engineSizeRange[0]}
                            max={2000}
                            value={maxEngineSize}
                            onChange={(e) => handleMaxEngineSizeChange(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </Card>
        </div>
      )}

      {/* Listings grid */}
      <div className={cn("md:col-span-3", !showFilters && "md:col-span-4")}>
        {/* Desktop sort and filter count */}
        <div className="mb-6 hidden items-center justify-between md:flex">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold">
              {filteredListings.length} {filteredListings.length === 1 ? "Listing" : "Listings"}
            </h2>

            {activeFilters.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-muted-foreground">with filters:</span>
                {activeFilters.map((filter, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {filter}
                  </Badge>
                ))}
                <Button variant="ghost" size="sm" onClick={resetFilters} className="h-7 text-xs">
                  Clear All
                </Button>
              </div>
            )}
          </div>

          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="price-low-high">Price: Low to High</SelectItem>
              <SelectItem value="price-high-low">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Mobile active filters */}
        {activeFilters.length > 0 && (
          <div className="mb-4 flex flex-wrap items-center gap-2 md:hidden">
            <span className="text-sm text-muted-foreground">Filters:</span>
            {activeFilters.map((filter, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {filter}
              </Badge>
            ))}
            <Button variant="ghost" size="sm" onClick={resetFilters} className="h-7 text-xs">
              Clear
            </Button>
          </div>
        )}

        {/* Results count for mobile */}
        <div className="mb-4 md:hidden">
          <h2 className="text-sm font-medium">
            {filteredListings.length} {filteredListings.length === 1 ? "Listing" : "Listings"}
          </h2>
        </div>

        {/* Listings grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex flex-col space-y-3">
                <Skeleton className="aspect-[4/3] w-full rounded-lg" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-1/4" />
              </div>
            ))}
          </div>
        ) : filteredListings.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-12">
            <h3 className="mb-2 text-lg font-medium">No listings found</h3>
            <p className="mb-6 text-center text-muted-foreground">
              Try adjusting your filters or search terms to find what you're looking for.
            </p>
            <Button onClick={resetFilters}>Reset Filters</Button>
          </div>
        )}
      </div>
    </div>
  )
}
