"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Bike, Wrench, HardHat, Hammer, Zap, Grid3x3 } from "lucide-react"

const categories = [
  {
    name: "Motorcycles",
    slug: "motorcycles",
    icon: Bike,
    description: "Sport bikes, cruisers, and more",
    color: "text-blue-600 dark:text-blue-400",
  },
  {
    name: "Parts & Accessories",
    slug: "parts",
    icon: Wrench,
    description: "OEM and aftermarket parts",
    color: "text-green-600 dark:text-green-400",
  },
  {
    name: "Riding Gear",
    slug: "gear",
    icon: HardHat,
    description: "Helmets, jackets, and safety gear",
    color: "text-purple-600 dark:text-purple-400",
  },
  {
    name: "Tools & Equipment",
    slug: "tools",
    icon: Hammer,
    description: "Maintenance and repair tools",
    color: "text-orange-600 dark:text-orange-400",
  },
  {
    name: "Electric",
    slug: "electric",
    icon: Zap,
    description: "Electric motorcycles and scooters",
    color: "text-yellow-600 dark:text-yellow-400",
  },
  {
    name: "All Categories",
    slug: "",
    icon: Grid3x3,
    description: "Browse all listings",
    color: "text-gray-600 dark:text-gray-400",
  },
]

export default function CategoryGrid() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {categories.map((category) => (
        <Link
          key={category.slug}
          href={`/listings${category.slug ? `?category=${category.slug}` : ""}`}
          className="group"
        >
          <Card className="glassmorphic-card h-full transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <CardContent className="flex flex-col items-center justify-center p-3 text-center sm:p-4 lg:p-5">
              <div
                className={`mb-3 rounded-full bg-background/80 p-3 transition-colors group-hover:bg-primary/10 ${category.color}`}
              >
                <category.icon className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7" />
              </div>
              <h3 className="mb-1 text-sm font-semibold sm:text-base">{category.name}</h3>
              <p className="hidden text-xs text-muted-foreground sm:block">{category.description}</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
