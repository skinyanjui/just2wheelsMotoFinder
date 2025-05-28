export interface Listing {
  id: string
  title: string
  price: number
  location: string
  category: string
  condition: "New" | "Like New" | "Good" | "Fair" | "Poor"
  year: number
  make: string
  model: string
  mileage?: number
  engineSize?: string
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
  createdAt: string
  updatedAt: string
  isFeatured?: boolean
  isSold?: boolean
  views: number
  saves: number
}

export const mockListings: Listing[] = [
  {
    id: "listing-1",
    title: "2022 Kawasaki Ninja ZX-6R",
    price: 11999,
    location: "Seattle, WA",
    category: "Sport",
    condition: "Like New",
    year: 2022,
    make: "Kawasaki",
    model: "Ninja ZX-6R",
    mileage: 1200,
    engineSize: "636cc",
    description:
      "Excellent condition 2022 Kawasaki Ninja ZX-6R with only 1,200 miles. This bike is perfect for both track days and street riding. Includes frame sliders, tail tidy, and aftermarket exhaust. Never been dropped or raced.",
    features: [
      "ABS Brakes",
      "Traction Control",
      "Quick Shifter",
      "LED Lighting",
      "Aftermarket Exhaust",
      "Frame Sliders",
    ],
    images: [
      "/kawasaki-ninja-motorcycle.png",
      "/kawasaki-ninja-side.png",
      "/kawasaki-ninja-front.png",
      "/kawasaki-ninja-rear.png",
      "/kawasaki-ninja-dashboard.png",
    ],
    seller: {
      id: "user-1",
      name: "Michael Thompson",
      rating: 4.9,
      memberSince: "2020-03-15",
      avatar: "/placeholder.svg?height=40&width=40&query=MT",
    },
    createdAt: "2023-06-15T08:30:00Z",
    updatedAt: "2023-06-15T08:30:00Z",
    isFeatured: true,
    views: 342,
    saves: 28,
  },
  {
    id: "listing-2",
    title: "2019 Harley-Davidson Street Glide",
    price: 18500,
    location: "Portland, OR",
    category: "Cruiser",
    condition: "Good",
    year: 2019,
    make: "Harley-Davidson",
    model: "Street Glide",
    mileage: 12500,
    engineSize: "107ci",
    description:
      "2019 Harley-Davidson Street Glide in excellent condition. Upgraded with Vance & Hines exhaust, custom seat, and touring package. Well maintained with all service records available.",
    features: [
      "Touchscreen Infotainment",
      "Bluetooth Connectivity",
      "Cruise Control",
      "Heated Grips",
      "Custom Seat",
      "Upgraded Exhaust",
    ],
    images: ["/classic-harley.png"],
    seller: {
      id: "user-2",
      name: "Robert Johnson",
      rating: 4.7,
      memberSince: "2018-11-22",
      avatar: "/placeholder.svg?height=40&width=40&query=RJ",
    },
    createdAt: "2023-05-28T14:45:00Z",
    updatedAt: "2023-06-10T09:15:00Z",
    views: 189,
    saves: 15,
  },
  {
    id: "listing-3",
    title: "2021 Ducati Panigale V4",
    price: 24999,
    location: "San Francisco, CA",
    category: "Sport",
    condition: "New",
    year: 2021,
    make: "Ducati",
    model: "Panigale V4",
    mileage: 500,
    engineSize: "1103cc",
    description:
      "Practically new 2021 Ducati Panigale V4 with only 500 miles. This superbike is in immaculate condition and comes with Akrapovič exhaust, carbon fiber accessories, and Ducati Performance parts. Full service history and still under warranty.",
    features: [
      "Öhlins Suspension",
      "Brembo Brakes",
      "Riding Modes",
      "Quick Shifter",
      "Carbon Fiber Accessories",
      "Akrapovič Exhaust",
    ],
    images: ["/ducati-panigale.png"],
    seller: {
      id: "user-3",
      name: "Alessandro Rossi",
      rating: 5.0,
      memberSince: "2019-07-08",
      avatar: "/placeholder.svg?height=40&width=40&query=AR",
    },
    createdAt: "2023-06-05T11:20:00Z",
    updatedAt: "2023-06-12T16:30:00Z",
    isFeatured: true,
    views: 421,
    saves: 47,
  },
  {
    id: "listing-4",
    title: "2018 Honda Gold Wing Tour",
    price: 21500,
    location: "Denver, CO",
    category: "Touring",
    condition: "Good",
    year: 2018,
    make: "Honda",
    model: "Gold Wing Tour",
    mileage: 18000,
    engineSize: "1833cc",
    description:
      "2018 Honda Gold Wing Tour in excellent condition. This luxury touring motorcycle comes with all the bells and whistles, including heated seats, Apple CarPlay, and electronically adjustable suspension. Perfect for long-distance rides.",
    features: [
      "Heated Seats",
      "Apple CarPlay",
      "Electronically Adjustable Suspension",
      "Cruise Control",
      "Reverse Gear",
      "Integrated Navigation",
    ],
    images: ["/touring-motorcycle.png"],
    seller: {
      id: "user-4",
      name: "David Miller",
      rating: 4.8,
      memberSince: "2017-05-19",
      avatar: "/placeholder.svg?height=40&width=40&query=DM",
    },
    createdAt: "2023-05-20T09:10:00Z",
    updatedAt: "2023-06-08T13:45:00Z",
    views: 156,
    saves: 12,
  },
  {
    id: "listing-5",
    title: "2020 Yamaha YZF-R6",
    price: 13500,
    location: "Austin, TX",
    category: "Sport",
    condition: "Good",
    year: 2020,
    make: "Yamaha",
    model: "YZF-R6",
    mileage: 3500,
    engineSize: "599cc",
    description:
      "2020 Yamaha YZF-R6 in great condition with low mileage. This supersport motorcycle is perfect for both street riding and track days. Comes with M4 exhaust, frame sliders, and tail tidy. All stock parts included.",
    features: [
      "Traction Control",
      "Multiple Riding Modes",
      "Quick Shifter",
      "M4 Exhaust",
      "Frame Sliders",
      "Tail Tidy",
    ],
    images: ["/yamaha-r6.png"],
    seller: {
      id: "user-5",
      name: "Sarah Williams",
      rating: 4.6,
      memberSince: "2019-02-11",
      avatar: "/placeholder.svg?height=40&width=40&query=SW",
    },
    createdAt: "2023-06-02T15:30:00Z",
    updatedAt: "2023-06-11T10:20:00Z",
    isFeatured: true,
    views: 278,
    saves: 23,
  },
  {
    id: "listing-6",
    title: "1969 Triumph Bonneville T120",
    price: 9500,
    location: "Chicago, IL",
    category: "Classic",
    condition: "Fair",
    year: 1969,
    make: "Triumph",
    model: "Bonneville T120",
    mileage: 24000,
    engineSize: "650cc",
    description:
      "Classic 1969 Triumph Bonneville T120 in good running condition. This vintage motorcycle has been restored with period-correct parts and paint. A true collector's item that still rides beautifully.",
    features: [
      "Original Engine",
      "Period-Correct Paint",
      "Restored Carburetors",
      "New Wiring Harness",
      "Rebuilt Brakes",
      "Classic Chrome Finish",
    ],
    images: ["/classic-cruiser-highway.png"],
    seller: {
      id: "user-6",
      name: "James Wilson",
      rating: 4.9,
      memberSince: "2016-09-30",
      avatar: "/placeholder.svg?height=40&width=40&query=JW",
    },
    createdAt: "2023-05-15T12:40:00Z",
    updatedAt: "2023-06-07T17:15:00Z",
    views: 203,
    saves: 31,
  },
]
