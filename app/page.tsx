import { Button } from "@/components/ui/button"
import { SearchBar } from "@/components/search-bar"
import FeaturedListings from "@/components/featured-listings"
import CategoryGrid from "@/components/category-grid"
import HowItWorks from "@/components/how-it-works"
import Link from "next/link"
import Image from "next/image"

export default function Home() {
  return (
    <div className="flex flex-col gap-12 pb-12">
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[600px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 z-10"></div>
        <Image
          src="/motorcycle-mountain-road.png"
          alt="Motorcycle on a mountain road"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
          quality={90}
        />
        <div className="container relative z-20 flex h-full flex-col items-center justify-center text-center text-white">
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">Find Your Perfect Ride</h1>
          <p className="mb-8 max-w-2xl text-lg sm:text-xl">
            The premier marketplace for motorcycles and related items. Buy, sell, and connect with fellow enthusiasts.
          </p>
          <div className="w-full max-w-3xl">
            <SearchBar />
          </div>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/listings/create">Post a Listing</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-white/10 hover:bg-white/20">
              <Link href="/listings">Browse Listings</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="container">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Featured Listings</h2>
          <Button asChild variant="outline">
            <Link href="/listings">View All</Link>
          </Button>
        </div>
        <FeaturedListings />
      </section>

      {/* Categories */}
      <section className="container">
        <h2 className="mb-8 text-3xl font-bold tracking-tight">Browse by Category</h2>
        <CategoryGrid />
      </section>

      {/* How It Works */}
      <section className="container">
        <h2 className="mb-8 text-3xl font-bold tracking-tight">How It Works</h2>
        <HowItWorks />
      </section>

      {/* CTA */}
      <section className="container">
        <div className="glassmorphic-card p-8 md:p-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight">Ready to Find Your Next Ride?</h2>
          <p className="mb-8 text-lg text-muted-foreground">
            Join thousands of motorcycle enthusiasts buying and selling on Just2Wheels.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/auth/register">Create an Account</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/listings/create">Post a Listing</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
