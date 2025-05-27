"use client"; // For client-side interactions like button clicks

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"; // For status
import { Eye, Edit3, CheckCircle, UploadCloud, Trash2, ExternalLink } from "lucide-react";

// Define the expected shape of a listing prop
interface Listing {
  id: string;
  title: string;
  imageUrl?: string; // Optional, as some might not have images or use placeholders
  price: number;
  status: "Active" | "Sold" | "Draft" | "Expired"; // More specific statuses
  dateListed: string;
  views: number;
  category?: string; // Optional category display
}

interface MyListingCardProps {
  listing: Listing;
  onEdit?: (id: string) => void;
  onView?: (id: string) => void;
  onMarkAsSold?: (id: string) => void;
  onPublish?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export default function MyListingCard({ 
  listing, 
  onEdit, 
  onView,
  onMarkAsSold,
  onPublish,
  onDelete 
}: MyListingCardProps) {
  const { id, title, imageUrl, price, status, dateListed, views, category } = listing;

  const handleAction = (action?: (id: string) => void) => {
    if (action) {
      action(id);
    } else {
      // Placeholder for if no action is passed, e.g., for generic "View" if no specific handler
      console.log("Action triggered for listing:", id);
    }
  };
  
  let statusBadgeVariant: "default" | "destructive" | "secondary" | "outline" = "secondary";
  // Note: Tailwind JIT might not pick up dynamically constructed class names like `text-${color}-600`.
  // It's safer to use full class names if issues arise.
  let statusTextClass = "text-gray-500"; // Default for Expired or other
  if (status === "Active") {
    statusBadgeVariant = "default"; 
    statusTextClass = "text-green-600";
  } else if (status === "Sold") {
    statusBadgeVariant = "destructive";
    statusTextClass = "text-red-600";
  } else if (status === "Draft") {
    statusBadgeVariant = "outline"; // Or "secondary" if "outline" is too subtle
    statusTextClass = "text-blue-600";
  }


  return (
    <div className="flex flex-col rounded-lg border bg-card shadow-sm transition-all hover:shadow-md">
      <div className="relative aspect-video w-full overflow-hidden rounded-t-lg">
        <Image
          src={imageUrl || "/placeholder.svg"} // Use a default placeholder if no image
          alt={title}
          fill
          className="object-cover"
        />
        {/* Apply text color directly if badge variant doesn't fully control it */}
        <Badge variant={statusBadgeVariant} className={`absolute top-2 right-2 ${statusBadgeVariant === 'default' ? 'bg-green-500 text-white' : ''}`}>
          {status}
        </Badge>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="mb-1 text-lg font-semibold leading-tight truncate" title={title}>
          {title}
        </h3>
        {category && <p className="text-xs text-muted-foreground mb-1">{category}</p>}
        <p className="mb-2 text-xl font-bold text-primary">
          ${price.toLocaleString()}
        </p>
        
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
          <span>Listed: {new Date(dateListed).toLocaleDateString()}</span>
          <span className="flex items-center">
            <Eye className="mr-1 h-3 w-3" /> {views} views
          </span>
        </div>

        <div className="mt-auto space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm" onClick={() => handleAction(onView)}>
              <ExternalLink className="mr-1.5 h-4 w-4" /> View Public
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleAction(onEdit)}>
              <Edit3 className="mr-1.5 h-4 w-4" /> Edit
            </Button>
          </div>
          {status === "Active" && (
            <Button variant="outline" size="sm" className="w-full border-green-500 text-green-600 hover:bg-green-50 hover:text-green-700" onClick={() => handleAction(onMarkAsSold)}>
              <CheckCircle className="mr-1.5 h-4 w-4" /> Mark as Sold
            </Button>
          )}
          {status === "Draft" && (
            <Button variant="outline" size="sm" className="w-full border-blue-500 text-blue-600 hover:bg-blue-50 hover:text-blue-700" onClick={() => handleAction(onPublish)}>
              <UploadCloud className="mr-1.5 h-4 w-4" /> Publish
            </Button>
          )}
           <Button variant="destructive" size="sm" className="w-full" onClick={() => handleAction(onDelete)}>
              <Trash2 className="mr-1.5 h-4 w-4" /> Delete
            </Button>
        </div>
      </div>
    </div>
  );
}
