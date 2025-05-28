"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ModeToggle } from "@/components/mode-toggle"
import { useAuth } from "@/hooks/use-auth"
import { useMediaQuery } from "@/hooks/use-media-query"
import {
  Bell,
  Menu,
  Search,
  User,
  MessageSquare,
  Heart,
  BookmarkCheck,
  Settings,
  LogOut,
  Home,
  Tag,
  Plus,
  PenSquare,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

function Header() {
  const pathname = usePathname()
  const { user, signOut } = useAuth()
  const router = useRouter()
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const isMobile = useMediaQuery("(max-width: 768px)")
  const isTablet = useMediaQuery("(max-width: 1024px)")

  // Handle scroll effect for glassmorphic header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/listings?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-200",
        isScrolled ? "border-b bg-background/80 backdrop-blur-md" : "bg-background",
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        {/* Logo and mobile menu */}
        <div className="flex items-center gap-4">
          {isMobile && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-full max-w-xs p-0">
                <div className="flex h-full flex-col overflow-y-auto">
                  <div className="border-b p-4">
                    <Link href="/" className="flex items-center gap-2">
                      <Image
                        src="/placeholder.svg?height=32&width=32&query=J2W"
                        alt="Just2Wheels"
                        width={32}
                        height={32}
                      />
                      <span className="text-xl font-bold">Just2Wheels</span>
                    </Link>
                  </div>
                  <div className="flex-1">
                    <nav className="grid gap-1 p-4">
                      <Link
                        href="/"
                        className={cn(
                          "flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-muted",
                          pathname === "/" && "bg-muted font-medium",
                        )}
                      >
                        <Home className="h-4 w-4" />
                        Home
                      </Link>
                      <Link
                        href="/listings"
                        className={cn(
                          "flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-muted",
                          pathname === "/listings" && "bg-muted font-medium",
                        )}
                      >
                        <Tag className="h-4 w-4" />
                        Listings
                      </Link>

                      {/* Always show Create Listing link for authenticated users */}
                      {user && (
                        <Link
                          href="/listings/create"
                          className={cn(
                            "flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-muted",
                            pathname === "/listings/create" && "bg-muted font-medium",
                          )}
                        >
                          <PenSquare className="h-4 w-4" />
                          Create Listing
                        </Link>
                      )}
                    </nav>

                    {user && (
                      <>
                        <div className="px-4 py-2">
                          <h3 className="mb-1 text-xs font-medium text-muted-foreground">My Account</h3>
                        </div>
                        <nav className="grid gap-1 px-4">
                          <Link
                            href="/listings/my-listings"
                            className={cn(
                              "flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-muted",
                              pathname === "/listings/my-listings" && "bg-muted font-medium",
                            )}
                          >
                            <Tag className="h-4 w-4" />
                            My Listings
                          </Link>
                          <Link
                            href="/messages"
                            className={cn(
                              "flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-muted",
                              pathname === "/messages" && "bg-muted font-medium",
                            )}
                          >
                            <MessageSquare className="h-4 w-4" />
                            Messages
                          </Link>
                          <Link
                            href="/favorites"
                            className={cn(
                              "flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-muted",
                              pathname === "/favorites" && "bg-muted font-medium",
                            )}
                          >
                            <Heart className="h-4 w-4" />
                            Favorites
                          </Link>
                          <Link
                            href="/saved-searches"
                            className={cn(
                              "flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-muted",
                              pathname === "/saved-searches" && "bg-muted font-medium",
                            )}
                          >
                            <BookmarkCheck className="h-4 w-4" />
                            Saved Searches
                          </Link>
                          <Link
                            href="/profile"
                            className={cn(
                              "flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-muted",
                              pathname === "/profile" && "bg-muted font-medium",
                            )}
                          >
                            <Settings className="h-4 w-4" />
                            Profile Settings
                          </Link>
                        </nav>
                      </>
                    )}
                  </div>
                  <div className="border-t p-4">
                    {user ? (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarImage src={user.image || ""} alt={user.name || "User"} />
                            <AvatarFallback>{user.name?.[0] || "U"}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{user.name}</p>
                            <p className="text-xs text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" onClick={signOut}>
                          <LogOut className="h-5 w-5" />
                          <span className="sr-only">Log out</span>
                        </Button>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-2">
                        <Button asChild className="w-full">
                          <Link href="/auth/login">Log In</Link>
                        </Button>
                        <Button asChild variant="outline" className="w-full">
                          <Link href="/auth/register">Register</Link>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          )}

          <Link href="/" className="flex items-center gap-2">
            <Image src="/placeholder.svg?height=32&width=32&query=J2W" alt="Just2Wheels" width={32} height={32} />
            <span className={cn("text-xl font-bold", isMobile && "sr-only")}>Just2Wheels</span>
          </Link>
        </div>

        {/* Desktop navigation */}
        {!isMobile && (
          <nav className="mx-6 hidden items-center space-x-4 md:flex lg:space-x-6">
            <Link
              href="/"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === "/" ? "text-primary" : "text-muted-foreground",
              )}
            >
              Home
            </Link>
            <Link
              href="/listings"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === "/listings" || pathname.startsWith("/listings/")
                  ? "text-primary"
                  : "text-muted-foreground",
              )}
            >
              Listings
            </Link>

            {/* Always show Create Listing link for authenticated users */}
            {user && (
              <Link
                href="/listings/create"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === "/listings/create" ? "text-primary" : "text-muted-foreground",
                )}
              >
                Create Listing
              </Link>
            )}
          </nav>
        )}

        {/* Search bar (tablet and desktop) */}
        {!isMobile && (
          <div className="hidden flex-1 md:block md:max-w-sm lg:max-w-md">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search listings..."
                className="w-full rounded-full bg-muted pl-9 pr-4"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>
        )}

        {/* Right side actions */}
        <div className="flex items-center gap-2">
          {/* Search button (mobile only) */}
          {isMobile && (
            <Button variant="ghost" size="icon" asChild>
              <Link href="/search">
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Link>
            </Button>
          )}

          {/* Post a listing button - always visible for authenticated users */}
          {user && (
            <Button asChild className={isTablet ? "px-3" : ""}>
              <Link href="/listings/create">
                {isTablet ? (
                  <PenSquare className="h-5 w-5" />
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" />
                    Post a Listing
                  </>
                )}
              </Link>
            </Button>
          )}

          {/* Notifications */}
          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs">3</Badge>
                  <span className="sr-only">Notifications</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel className="flex items-center justify-between">
                  <span>Notifications</span>
                  <Link href="/notifications" className="text-xs text-primary hover:underline">
                    View All
                  </Link>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="max-h-80 overflow-y-auto">
                  <DropdownMenuItem className="flex cursor-pointer flex-col items-start p-3">
                    <div className="flex w-full items-center justify-between">
                      <span className="font-medium">New Message</span>
                      <span className="text-xs text-muted-foreground">2h ago</span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      You received a new message from Michael Thompson about the Kawasaki Ninja.
                    </p>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex cursor-pointer flex-col items-start p-3">
                    <div className="flex w-full items-center justify-between">
                      <span className="font-medium">Listing Approved</span>
                      <span className="text-xs text-muted-foreground">1d ago</span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Your listing "2022 Kawasaki Ninja ZX-6R" has been approved and is now live.
                    </p>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex cursor-pointer flex-col items-start p-3">
                    <div className="flex w-full items-center justify-between">
                      <span className="font-medium">New Favorite</span>
                      <span className="text-xs text-muted-foreground">3d ago</span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">Someone added your listing to their favorites.</p>
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* Messages */}
          {user && (
            <Button variant="ghost" size="icon" asChild>
              <Link href="/messages" className="relative">
                <MessageSquare className="h-5 w-5" />
                <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs">2</Badge>
                <span className="sr-only">Messages</span>
              </Link>
            </Button>
          )}

          {/* Theme toggle */}
          <ModeToggle />

          {/* User menu */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.image || ""} alt={user.name || "User"} />
                    <AvatarFallback>{user.name?.[0] || "U"}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild>
                    <Link href="/profile">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/listings/my-listings">
                      <Tag className="mr-2 h-4 w-4" />
                      <span>My Listings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/listings/create">
                      <PenSquare className="mr-2 h-4 w-4" />
                      <span>Create Listing</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/messages">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      <span>Messages</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/favorites">
                      <Heart className="mr-2 h-4 w-4" />
                      <span>Favorites</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/saved-searches">
                      <BookmarkCheck className="mr-2 h-4 w-4" />
                      <span>Saved Searches</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              {!isTablet && (
                <Button variant="ghost" asChild>
                  <Link href="/auth/login">Log In</Link>
                </Button>
              )}
              <Button variant={isTablet ? "ghost" : "outline"} size={isTablet ? "icon" : "default"} asChild>
                <Link href="/auth/register">
                  {isTablet ? (
                    <>
                      <User className="h-5 w-5" />
                      <span className="sr-only">Register</span>
                    </>
                  ) : (
                    "Register"
                  )}
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
