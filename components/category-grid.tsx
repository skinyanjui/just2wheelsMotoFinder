import Link from "next/link"
import Image from "next/image"

interface Category {
  id: string
  name: string
  slug: string
  count: number
  imageUrl: string
}

export default function CategoryGrid() {
  const categories: Category[] = [
    {
      id: "1",
      name: "Sport Bikes",
      slug: "sport-bikes",
      count: 245,
      imageUrl: "/sport-motorcycle.png",
    },
    {
      id: "2",
      name: "Cruisers",
      slug: "cruisers",
      count: 189,
      imageUrl: "/classic-cruiser-highway.png",
    },
    {
      id: "3",
      name: "Adventure",
      slug: "adventure",
      count: 156,
      imageUrl: "/placeholder-loifu.png",
    },
    {
      id: "4",
      name: "Touring",
      slug: "touring",
      count: 112,
      imageUrl: "/touring-motorcycle.png",
    },
    {
      id: "5",
      name: "Off-Road",
      slug: "off-road",
      count: 203,
      imageUrl: "/placeholder.svg?height=400&width=600&query=dirt motorcycle",
    },
    {
      id: "6",
      name: "Scooters",
      slug: "scooters",
      count: 87,
      imageUrl: "/placeholder.svg?height=400&width=600&query=scooter motorcycle",
    },
    {
      id: "7",
      name: "Vintage",
      slug: "vintage",
      count: 76,
      imageUrl: "/placeholder.svg?height=400&width=600&query=vintage motorcycle",
    },
    {
      id: "8",
      name: "Parts & Accessories",
      slug: "parts-accessories",
      count: 532,
      imageUrl: "/placeholder.svg?height=400&width=600&query=motorcycle parts",
    },
  ]

  return (
    <div className="grid grid-cols-2 gap-3 xs:gap-4 sm:grid-cols-3 md:grid-cols-4 lg:gap-5 xl:grid-cols-5 2xl:grid-cols-6">
      {categories.map((category) => (
        <Link key={category.id} href={`/categories/${category.slug}`} className="group overflow-hidden rounded-lg">
          <div className="relative aspect-square overflow-hidden">
            <Image
              src={category.imageUrl || "/placeholder.svg"}
              alt={category.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1280px) 25vw, 20vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-3 sm:p-4">
              <h3 className="text-base font-semibold text-white sm:text-lg">{category.name}</h3>
              <p className="text-xs text-white/80 sm:text-sm">{category.count} listings</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
