export interface Listing {
  id: string
  title: string
  price: number
  location: string
  category: string
  condition: "New" | "Like New" | "Good" | "Fair" | "Poor"
  year: number
  mileage?: number
  description: string
  features: string[]
  images: string[]
  seller: {
    id: string
    name: string
    rating: number
    memberSince: string
    avatar?: string
  }
  isFeatured: boolean
  isSold: boolean
  createdAt: string
  updatedAt: string
}

export const mockListings: Listing[] = [
  {
    id: "1",
    title: "2022 Kawasaki Ninja ZX-6R",
    price: 11999,
    location: "Portland, OR",
    category: "Sport",
    condition: "Like New",
    year: 2022,
    mileage: 1200,
    description:
      "Excellent condition Kawasaki Ninja with low mileage. One owner, garage kept. Includes frame sliders and tail tidy mod.",
    features: ["ABS", "Traction Control", "Quick Shifter", "LED Lights"],
    images: [
      "/kawasaki-ninja-motorcycle.png",
      "/kawasaki-ninja-side.png",
      "/kawasaki-ninja-front.png",
      "/kawasaki-ninja-rear.png",
      "/kawasaki-ninja-dashboard.png",
    ],
    seller: {
      id: "user1",
      name: "Michael Thompson",
      rating: 4.9,
      memberSince: "2020-03-15",
      avatar: "/placeholder.svg?height=40&width=40&query=MT",
    },
    isFeatured: true,
    isSold: false,
    createdAt: "2023-06-10T14:30:00Z",
    updatedAt: "2023-06-15T09:45:00Z",
  },
  {
    id: "2",
    title: "2019 Harley-Davidson Street Glide",
    price: 18500,
    location: "Austin, TX",
    category: "Cruiser",
    condition: "Good",
    year: 2019,
    mileage: 12500,
    description:
      "Well-maintained Harley Street Glide with custom exhaust and upgraded seat. Perfect for long rides and weekend trips.",
    features: ["Infotainment System", "Custom Exhaust", "Cruise Control", "Heated Grips"],
    images: ["/classic-harley.png", "/classic-cruiser-highway.png"],
    seller: {
      id: "user2",
      name: "Robert Johnson",
      rating: 4.7,
      memberSince: "2018-11-22",
      avatar: "/placeholder.svg?height=40&width=40&query=RJ",
    },
    isFeatured: false,
    isSold: false,
    createdAt: "2023-05-20T10:15:00Z",
    updatedAt: "2023-05-25T16:30:00Z",
  },
  {
    id: "3",
    title: "2021 Yamaha MT-09",
    price: 9200,
    location: "Denver, CO",
    category: "Naked",
    year: 2021,
    condition: "Like New",
    mileage: 3400,
    description:
      "Powerful and nimble Yamaha MT-09 with upgraded exhaust and tail tidy. Perfect balance of performance and everyday usability.",
    features: ["Ride Modes", "Quick Shifter", "Adjustable Suspension", "LED Lighting"],
    images: ["/yamaha-r6.png", "/sport-motorcycle.png"],
    seller: {
      id: "user3",
      name: "Sarah Miller",
      rating: 5.0,
      memberSince: "2019-07-10",
      avatar: "/placeholder.svg?height=40&width=40&query=SM",
    },
    isFeatured: true,
    isSold: false,
    createdAt: "2023-06-05T09:20:00Z",
    updatedAt: "2023-06-12T11:45:00Z",
  },
  {
    id: "4",
    title: "2020 Ducati Panigale V4",
    price: 23500,
    location: "Miami, FL",
    category: "Sport",
    condition: "Excellent",
    year: 2020,
    mileage: 5200,
    description:
      "Stunning Ducati Panigale V4 with Akrapovic exhaust and carbon fiber accessories. Track ready and street legal.",
    features: ["Öhlins Suspension", "Brembo Brakes", "Akrapovic Exhaust", "Carbon Fiber Wheels"],
    images: ["/ducati-panigale.png"],
    seller: {
      id: "user4",
      name: "Alex Rodriguez",
      rating: 4.8,
      memberSince: "2017-09-30",
      avatar: "/placeholder.svg?height=40&width=40&query=AR",
    },
    isFeatured: true,
    isSold: false,
    createdAt: "2023-04-15T13:40:00Z",
    updatedAt: "2023-04-28T10:20:00Z",
  },
  {
    id: "5",
    title: "2018 BMW R1250GS Adventure",
    price: 16700,
    location: "Seattle, WA",
    category: "Adventure",
    condition: "Good",
    year: 2018,
    mileage: 18500,
    description:
      "Versatile BMW GS Adventure with full luggage system and additional accessories. Ready for your next adventure.",
    features: ["Electronic Suspension", "Heated Grips", "Cruise Control", "Aluminum Panniers"],
    images: ["/touring-motorcycle.png"],
    seller: {
      id: "user5",
      name: "David Wilson",
      rating: 4.6,
      memberSince: "2016-05-18",
      avatar: "/placeholder.svg?height=40&width=40&query=DW",
    },
    isFeatured: false,
    isSold: true,
    createdAt: "2023-03-10T11:25:00Z",
    updatedAt: "2023-03-25T14:50:00Z",
  },
]
