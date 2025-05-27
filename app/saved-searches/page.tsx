"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Tag, Calendar, SearchCheck, Edit3, Trash2, ListFilter, Eye } from "lucide-react"; // Icons
import { Badge } from "@/components/ui/badge"; // Added Badge import

interface SavedSearchFilter {
  type: string; // e.g., 'category', 'priceMin', 'priceMax', 'condition'
  value: string | number;
  label?: string; // e.g., 'Category', 'Min Price'
}

interface SavedSearchItem {
  id: string;
  name?: string; // User-defined name for the search
  searchTerm?: string; // e.g., "Honda CBR"
  filters: SavedSearchFilter[];
  dateSaved: string;
  resultCount?: number; // Optional: show how many results this search currently yields
}

const initialMockSavedSearches: SavedSearchItem[] = [
  {
    id: "ss1",
    name: "My Commuter Bike Search",
    searchTerm: "Yamaha MT-07",
    filters: [
      { type: "category", value: "Naked Bikes", label: "Category" },
      { type: "condition", value: "Used", label: "Condition" },
      { type: "priceMax", value: 7000, label: "Max Price" },
    ],
    dateSaved: "2024-03-12",
    resultCount: 5,
  },
  {
    id: "ss2",
    searchTerm: "Adventure Touring",
    filters: [
      { type: "category", value: "Adventure", label: "Category" },
      { type: "extras", value: "Panniers", label: "Extras" },
    ],
    dateSaved: "2024-03-10",
    resultCount: 12,
  },
  {
    id: "ss3",
    name: "Vintage Projects",
    filters: [
      { type: "category", value: "Vintage", label: "Category" },
      { type: "condition", value: "Project", label: "Condition" },
    ],
    dateSaved: "2024-02-28",
    resultCount: 8,
  },
];

export default function SavedSearchesPage() {
  const { toast } = useToast();
  const [savedSearches, setSavedSearches] = useState<SavedSearchItem[]>(initialMockSavedSearches);

  const handleViewResults = (search: SavedSearchItem) => {
    // In a real app, this would redirect to the listings page with search terms and filters applied
    toast({
      title: "Viewing Results (Placeholder)",
      description: `Searching for: ${search.name || search.searchTerm || 'custom search'}`,
    });
    // Example: router.push(`/listings?term=${search.searchTerm}&filters=${JSON.stringify(search.filters)}`);
  };

  const handleEditSearch = (id: string) => {
    toast({
      title: "Edit Search (Placeholder)",
      description: `Editing saved search ID: ${id}. This would open a modal or page.`,
    });
  };

  const handleDeleteSearch = (id: string) => {
    setSavedSearches((prevSearches) => prevSearches.filter(search => search.id !== id));
    toast({
      title: "Search Deleted",
      description: `Saved search ID: ${id} has been deleted.`,
      variant: "destructive",
    });
  };

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="mb-10 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">My Saved Searches</h1>
        <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
          Manage your saved search criteria. Quickly find what you're looking for or refine your searches.
        </p>
      </div>

      {savedSearches.length > 0 ? (
        <div className="space-y-6">
          {savedSearches.map((search) => (
            <div key={search.id} className="p-6 bg-card border rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4">
                <div className="flex-grow">
                  <h2 className="text-xl font-semibold text-primary mb-1">
                    {search.name || `Search: ${search.searchTerm || "Custom Filters"}`}
                  </h2>
                  {search.name && search.searchTerm && (
                     <p className="text-sm text-muted-foreground mb-1">Search Term: "{search.searchTerm}"</p>
                  )}
                  <div className="text-sm text-muted-foreground mb-3">
                    <Calendar className="inline-block mr-1.5 h-4 w-4 align-middle" />
                    Saved on: {new Date(search.dateSaved).toLocaleDateString()}
                    {search.resultCount !== undefined && (
                        <span className="ml-3 inline-flex items-center">
                            <ListFilter className="inline-block mr-1.5 h-4 w-4 align-middle" />
                            {search.resultCount} results
                        </span>
                    )}
                  </div>
                  {search.filters.length > 0 && (
                    <div className="mb-3">
                      <h4 className="text-sm font-medium mb-1.5">Applied Filters:</h4>
                      <div className="flex flex-wrap gap-2">
                        {search.filters.map((filter, index) => (
                          <Badge key={index} variant="secondary" className="text-xs py-1 px-2">
                            {filter.label ? `${filter.label}: ` : ''}{filter.value}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex flex-col sm:flex-row sm:items-start sm:space-x-2 space-y-2 sm:space-y-0 w-full sm:w-auto">
                  <Button onClick={() => handleViewResults(search)} className="w-full sm:w-auto justify-center">
                    <Eye className="mr-2 h-4 w-4" /> View Results
                  </Button>
                  <Button variant="outline" onClick={() => handleEditSearch(search.id)} className="w-full sm:w-auto justify-center">
                    <Edit3 className="mr-2 h-4 w-4" /> Edit
                  </Button>
                  <Button variant="outline" onClick={() => handleDeleteSearch(search.id)} className="w-full sm:w-auto justify-center hover:border-destructive hover:text-destructive-foreground hover:bg-destructive/10">
                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-muted-foreground py-16">
          <SearchCheck className="mx-auto h-16 w-16 mb-4 text-gray-400" />
          <h2 className="text-2xl font-semibold mb-2">No Saved Searches Yet</h2>
          <p className="text-lg">
            You haven't saved any searches. Try searching for items and save the criteria for later!
          </p>
           {/* Optional: Add a button to browse listings/initiate a search */}
        </div>
      )}
    </div>
  );
}
