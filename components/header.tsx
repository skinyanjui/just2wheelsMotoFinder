// components/header.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { useAuth } from "@/hooks/use-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Bell, MessageSquare, User, LogOut, Heart, Bookmark, Package } from "lucide-react";
import { Badge } from "@/components/ui/badge"; // Import Badge

// Notification specific imports
import NotificationDropdown from "@/components/notification-dropdown"; // Adjust path
import { mockNotifications as initialMockNotifications, getUnreadNotificationsCount, markNotificationAsRead, Notification, mockUsers, addMockMessage, addNotification } from "@/lib/mock-data/messages"; // Adjust path

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { user } = useAuth(); // Real auth user
  const currentUserId = user?.id || mockUsers[0].id; // Fallback to Alex for demo

  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] = useState(false);
  
  const [notifications, setNotifications] = useState<Notification[]>(initialMockNotifications.filter(n => !n.isRead || new Date(n.timestamp) > new Date(Date.now() - 1000 * 60 * 60 * 24 * 7))); // Show unread or recent (7 days)
  const [unreadNotificationCount, setUnreadNotificationCount] = useState(0);
  
  // Mock unread messages count for MessageSquare icon (can be different from notification count)
  const [unreadMessagesCount, setUnreadMessagesCount] = useState(2); 


  const updateNotificationData = useCallback(() => {
    // In real app, fetch from API. Here, use mock data.
    // Filter notifications if needed (e.g. only for current user, if mockNotifications were global)
    const sortedNotifications = [...initialMockNotifications].sort((a,b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    setNotifications(sortedNotifications);
    setUnreadNotificationCount(getUnreadNotificationsCount());
  }, []);

  useEffect(() => {
    updateNotificationData();
  }, [updateNotificationData]);
  
  // Simulate receiving a new message notification after a delay (for testing)
  useEffect(() => {
    if (currentUserId === mockUsers[0].id) { // Only run for "Alex" to avoid loop if multiple users were active
        const timer = setTimeout(() => {
            // Simulate user3 sending a message to user1 (Alex)
            // This should trigger addNotification via the updated addMockMessage
            // addMockMessage("conv1", "user3", "Hey Alex, another test message!");
            // Or directly add a system notification for testing
            // addNotification({ type: 'system_alert', title: 'System Test', message: 'A new system alert for you!'});
            // updateNotificationData(); // Re-fetch/re-filter after adding
        }, 15000); // 15 seconds after component mounts
        return () => clearTimeout(timer);
    }
  }, [currentUserId, updateNotificationData]);


  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Listings", href: "/listings" },
    { name: "Categories", href: "/categories" },
    { name: "How It Works", href: "/how-it-works" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const handleMarkNotificationRead = (notificationId: string) => {
    markNotificationAsRead(notificationId);
    updateNotificationData(); // Re-filter and update count
  };
  
  const handleMarkAllNotificationsRead = () => {
    notifications.forEach(n => {
        if (!n.isRead) markNotificationAsRead(n.id);
    });
    updateNotificationData();
    setIsNotificationDropdownOpen(false); // Close dropdown after action
  };


  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isScrolled ? "glassmorphic py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container flex items-center justify-between">
        {/* Left Section: Mobile Menu, Logo, Nav Links */}
        <div className="flex items-center">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild className="mr-2 md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" /> <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <SheetHeader className="mb-4"><SheetTitle>Menu</SheetTitle></SheetHeader>
              <nav className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link key={item.name} href={item.href}
                    className={`text-lg ${pathname === item.href ? "font-medium text-primary" : "text-muted-foreground hover:text-foreground"}`}
                    onClick={() => setIsSheetOpen(false)}
                  >{item.name}</Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">Just2Wheels</span>
          </Link>
          <nav className="ml-10 hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link key={item.name} href={item.href}
                className={`text-sm ${pathname === item.href ? "font-medium text-primary" : "text-muted-foreground hover:text-foreground"}`}
              >{item.name}</Link>
            ))}
          </nav>
        </div>

        {/* Right Section: Mode Toggle, Icons, User Menu */}
        <div className="flex items-center space-x-2">
          <ModeToggle />
          {user ? (
            <>
              {/* Notification Bell Icon & Dropdown */}
              <DropdownMenu open={isNotificationDropdownOpen} onOpenChange={setIsNotificationDropdownOpen}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
                    <Bell className="h-5 w-5" />
                    {unreadNotificationCount > 0 && (
                      <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                        {unreadNotificationCount}
                      </span>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="p-0 w-80 md:w-96">
                  {/* NotificationDropdown component is rendered here directly, not as DropdownMenuItem */}
                  <NotificationDropdown
                    notifications={notifications}
                    onMarkAsRead={handleMarkNotificationRead}
                    onMarkAllAsRead={handleMarkAllNotificationsRead}
                    onClose={() => setIsNotificationDropdownOpen(false)}
                  />
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Messages Icon */}
              <Link href="/messages" passHref>
                <Button variant="ghost" size="icon" className="relative" aria-label="Messages">
                  <MessageSquare className="h-5 w-5" />
                  {unreadMessagesCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                      {unreadMessagesCount}
                    </span>
                  )}
                </Button>
              </Link>

              {/* User Avatar & Profile Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8"><AvatarImage src={user.image || mockUsers.find(u=>u.id === currentUserId)?.avatarUrl || "/placeholder.svg"} alt={user.name} /><AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback></Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild><Link href="/profile" className="flex items-center"><User className="mr-2 h-4 w-4" /><span>Profile</span></Link></DropdownMenuItem>
                  <DropdownMenuItem asChild><Link href="/listings/my-listings" className="flex items-center"><Package className="mr-2 h-4 w-4" /><span>My Listings</span></Link></DropdownMenuItem>
                  <DropdownMenuItem asChild><Link href="/messages" className="flex items-center"><MessageSquare className="mr-2 h-4 w-4" /><span>Messages</span>{unreadMessagesCount > 0 && <Badge variant="secondary" className="ml-auto">{unreadMessagesCount}</Badge>}</Link></DropdownMenuItem>
                  <DropdownMenuItem asChild><Link href="/favorites" className="flex items-center"><Heart className="mr-2 h-4 w-4" /><span>Favorites</span></Link></DropdownMenuItem>
                  <DropdownMenuItem asChild><Link href="/saved-searches" className="flex items-center"><Bookmark className="mr-2 h-4 w-4" /><span>Saved Searches</span></Link></DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut} className="flex items-center text-destructive"><LogOut className="mr-2 h-4 w-4" /><span>Log out</span></DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <> {/* Fallback for non-authenticated users */}
              <Button asChild variant="ghost"><Link href="/auth/login">Log in</Link></Button>
              <Button asChild><Link href="/auth/register">Sign up</Link></Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
