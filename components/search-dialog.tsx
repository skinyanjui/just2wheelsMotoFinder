"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Bike, Shield, Wrench, Clock, X } from "lucide-react"

interface SearchDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("all")

  // Clear search when dialog opens
  useEffect(() => {
    if (open) {
      setQuery("")
    }
  }, [open])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const searchParams = new URLSearchParams()
    if (query) searchParams.set("q", query)
    if (category && category !== "all") searchParams.set("category", category)

    router.push(`/listings?${searchParams.toString()}`)
    onOpenChange(false)
  }

  const recentSearches = ["Kawasaki Ninja", "Harley Davidson", "Motorcycle helmet", "Vintage bikes"]

  const popularCategories = [
    { name: "Sport Bikes", icon: <Bike className="h-4 w-4" />, slug: "sport-bikes" },
    { name: "Riding Gear", icon: <Shield className="h-4 w-4" />, slug: "riding-gear" },
    { name: "Parts", icon: <Wrench className="h-4 w-4" />, slug: "parts" },
    { name: "Vintage", icon: <Clock className="h-4 w-4" />, slug: "vintage" },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0">
        <div className="p-4 border-b">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search motorcycles, parts, gear..."
                className="pl-9 pr-10"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Clear search</span>
                </button>
              )}
            </div>
            <Button type="submit">Search</Button>
          </form>
        </div>

        <Tabs defaultValue="recent" className="p-4">
          <TabsList className="mb-4">
            <TabsTrigger value="recent">Recent Searches</TabsTrigger>
            <TabsTrigger value="categories">Popular Categories</TabsTrigger>
          </TabsList>
          <TabsContent value="recent">
            <div className="space-y-2">
              {recentSearches.map((search) => (
                <Button
                  key={search}
                  variant="ghost"
                  className="w-full justify-start text-muted-foreground hover:text-foreground"
                  onClick={() => {
                    setQuery(search)
                    router.push(`/listings?q=${encodeURIComponent(search)}`)
                    onOpenChange(false)
                  }}
                >
                  <Clock className="mr-2 h-4 w-4" />
                  {search}
                </Button>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="categories">
            <div className="grid grid-cols-2 gap-2">
              {popularCategories.map((category) => (
                <Button
                  key={category.name}
                  variant="outline"
                  className="justify-start"
                  onClick={() => {
                    router.push(`/categories/${category.slug}`)
                    onOpenChange(false)
                  }}
                >
                  {category.icon}
                  <span className="ml-2">{category.name}</span>
                </Button>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="border-t p-4">
          <Button
            variant="ghost"
            className="w-full justify-center text-primary"
            onClick={() => {
              router.push("/listings")
              onOpenChange(false)
            }}
          >
            Browse all listings
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
