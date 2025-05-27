"use client"; 

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, ListFilter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import MyListingCard from "@/components/my-listing-card"; // Import the new component
import { useToast } from "@/hooks/use-toast"; // For placeholder actions

// Mock data for user's listings (assuming statuses are of the specific string literal type)
const mockListings: Array<{
  id: string;
  title: string;
  imageUrl?: string;
  price: number;
  status: "Active" | "Sold" | "Draft" | "Expired"; // Ensure this matches MyListingCard's expected type
  dateListed: string;
  views: number;
  category?: string;
}> = [
  {
    id: "1",
    title: "Classic Harley Davidson - Like New",
    imageUrl: "/classic-harley.png",
    price: 15000,
    status: "Active",
    dateListed: "2024-03-10",
    views: 120,
    category: "Cruiser",
  },
  {
    id: "2",
    title: "Yamaha R6 Sportbike - Low Mileage",
    imageUrl: "/yamaha-r6.png",
    price: 9500,
    status: "Active",
    dateListed: "2024-03-15",
    views: 250,
    category: "Sport Bikes",
  },
  {
    id: "3",
    title: "Ducati Panigale V4 - Pristine Condition",
    imageUrl: "/ducati-panigale.png",
    price: 22000,
    status: "Sold",
    dateListed: "2024-02-20",
    views: 300,
    category: "Sport Bikes",
  },
  {
    id: "4",
    title: "Kawasaki Ninja ZX-10R - Track Ready",
    imageUrl: "/kawasaki-ninja-motorcycle.png",
    price: 18000,
    status: "Draft",
    dateListed: "2024-03-18",
    views: 0,
    category: "Sport Bikes",
  },
  {
    id: "5",
    title: "BMW R1250GS Adventure - Expired Listing Example",
    imageUrl: "/placeholder-loifu.png",
    price: 19500,
    status: "Expired", // Added an expired example
    dateListed: "2024-01-01",
    views: 95,
    category: "Adventure",
  },
];


export default function MyListingsPage() {
  const { toast } = useToast();

  // Placeholder action handlers
  const handleEdit = (id: string) => toast({ title: "Action: Edit", description: `Listing ID: ${id}` });
  const handleView = (id: string) => toast({ title: "Action: View", description: `Listing ID: ${id}. Would go to public page.` });
  const handleMarkAsSold = (id: string) => toast({ title: "Action: Mark as Sold", description: `Listing ID: ${id}` });
  const handlePublish = (id: string) => toast({ title: "Action: Publish", description: `Listing ID: ${id}` });
  const handleDelete = (id: string) => toast({ title: "Action: Delete", description: `Listing ID: ${id}`, variant: "destructive" });


  const activeListings = mockListings.filter(l => l.status === "Active");
  const soldListings = mockListings.filter(l => l.status === "Sold");
  const draftListings = mockListings.filter(l => l.status === "Draft");
  // Optional: Add expired listings tab or filter
  const expiredListings = mockListings.filter(l => l.status === "Expired");


  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold">My Listings</h1>
        <Button asChild size="lg">
          <a href="/listings/create"> 
            <PlusCircle className="mr-2 h-5 w-5" /> Create New Listing
          </a>
        </Button>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            type="search" 
            placeholder="Search your listings by title, category..." 
            className="pl-12 py-3 text-base w-full" // Increased padding and text size
          />
        </div>
        <Button variant="outline" size="lg">
          <ListFilter className="mr-2 h-5 w-5" /> Filters
        </Button>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 mb-6">
          <TabsTrigger value="active" className="py-2.5 text-sm sm:text-base">Active ({activeListings.length})</TabsTrigger>
          <TabsTrigger value="sold" className="py-2.5 text-sm sm:text-base">Sold ({soldListings.length})</TabsTrigger>
          <TabsTrigger value="drafts" className="py-2.5 text-sm sm:text-base">Drafts ({draftListings.length})</TabsTrigger>
          <TabsTrigger value="expired" className="py-2.5 text-sm sm:text-base">Expired ({expiredListings.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active">
          {activeListings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {activeListings.map((listing) => (
                <MyListingCard 
                  key={listing.id} 
                  listing={listing}
                  onEdit={handleEdit}
                  onView={handleView}
                  onMarkAsSold={handleMarkAsSold}
                  onPublish={handlePublish}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-16 text-lg">You have no active listings.</p>
          )}
        </TabsContent>
        
        <TabsContent value="sold">
          {soldListings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {soldListings.map((listing) => (
                <MyListingCard 
                  key={listing.id} 
                  listing={listing} 
                  onEdit={handleEdit} // Edit might be disabled for sold items in real scenario
                  onView={handleView}
                  onDelete={handleDelete} // Delete might be archive instead
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-16 text-lg">You have no sold listings.</p>
          )}
        </TabsContent>
        
        <TabsContent value="drafts">
          {draftListings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {draftListings.map((listing) => (
                <MyListingCard 
                  key={listing.id} 
                  listing={listing} 
                  onEdit={handleEdit}
                  onView={handleView} // View might be a preview for drafts
                  onPublish={handlePublish}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-16 text-lg">You have no draft listings.</p>
          )}
        </TabsContent>

        <TabsContent value="expired">
          {expiredListings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {expiredListings.map((listing) => (
                <MyListingCard 
                  key={listing.id} 
                  listing={listing} 
                  onEdit={handleEdit} // Or "Relist"
                  onView={handleView}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-16 text-lg">You have no expired listings.</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
