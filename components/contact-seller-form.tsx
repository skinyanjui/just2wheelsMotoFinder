// components/contact-seller-form.tsx
"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input"; // Keep if phone is still part of it, or remove
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
// Assuming mockUsers[0] is the current logged-in user for mock purposes
import { findOrCreateConversation, mockUsers } from "@/lib/mock-data/messages"; // Adjust path

interface ContactSellerFormProps {
  listingId: string;
  listingTitle: string;
  sellerId: string; // This is the ID of the user who created the listing
  sellerName: string; // For display purposes, if needed before redirect
  onSuccess?: () => void; // May become obsolete or change purpose
}

export function ContactSellerForm({
  listingId,
  listingTitle,
  sellerId,
  // sellerName, // Might not be needed if we redirect immediately
  onSuccess, // This callback might be called by the modal/dialog that contains this form upon closing
}: ContactSellerFormProps) {
  const { toast } = useToast();
  const { user } = useAuth(); // Real auth user
  const router = useRouter();
  const [message, setMessage] = useState("");
  // const [phone, setPhone] = useState(""); // Phone field can be removed if not part of direct messaging
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Use hardcoded current user for mock if `user` from `useAuth` is not fully set up for ID
    const currentUserId = user?.id || mockUsers[0].id; // Fallback to Alex for demo

    if (!currentUserId) { // Check if we have a current user ID
      toast({
        title: "Authentication required",
        description: "Please log in to contact sellers.",
        variant: "destructive",
      });
      return;
    }
    
    if (currentUserId === sellerId) {
      toast({
        title: "Cannot message yourself",
        description: "You cannot send a message to yourself regarding your own listing.",
        variant: "default",
      });
      return;
    }

    if (!message.trim()) {
      toast({
        title: "Message required",
        description: "Please enter a message.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Find or create conversation and add the initial message
      const conversation = findOrCreateConversation(
        currentUserId,
        sellerId,
        listingId,
        listingTitle,
        message.trim()
      );
      
      // Redirect to the messages page, with the conversation ID
      // The messages page will handle selecting this conversation.
      router.push(`/messages?conversationId=${conversation.id}`);
      
      // Call onSuccess if it's used to close a modal containing this form
      if (onSuccess) onSuccess(); 

    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Failed to initiate conversation. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="message">Your Message</Label>
        <Textarea
          id="message"
          placeholder={`Send a message about "${listingTitle}"...`}
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </div>
      {/* Phone field can be removed if not desired for this flow */}
      {/* <div className="space-y-2"> ... </div> */}
      <div className="flex justify-end gap-2 pt-2">
        {onSuccess && ( /* Conditionally render Cancel if onSuccess is for closing modal */
            <Button type="button" variant="outline" onClick={onSuccess}>
             Cancel
            </Button>
        )}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send Message & View Chat"}
        </Button>
      </div>
    </form>
  );
}
