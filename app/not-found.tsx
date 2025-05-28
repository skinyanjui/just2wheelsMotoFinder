import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, Search } from "lucide-react"

export default function NotFound() {
  return (
    <div className="container flex min-h-[70vh] flex-col items-center justify-center text-center">
      <div className="glassmorphic-card max-w-md p-8">
        <h2 className="mb-2 text-4xl font-bold">404</h2>
        <p className="mb-2 text-xl font-semibold">Page Not Found</p>
        <p className="mb-6 text-muted-foreground">The page you are looking for doesn't exist or has been moved.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="w-full">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" /> Return Home
            </Link>
          </Button>
          <Button variant="outline" asChild className="w-full">
            <Link href="/listings">
              <Search className="mr-2 h-4 w-4" /> Browse Listings
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
