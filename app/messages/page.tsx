// app/messages/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation"; // For handling mobile navigation if needed
import ConversationList from "@/components/conversation-list"; // Adjust path
import MessageView from "@/components/message-view"; // Adjust path
import { mockUsers, mockConversations, Conversation } from "@/lib/mock-data/messages"; // Adjust path
// import { useAuth } from "@/hooks/use-auth"; // To get current user

export default function MessagesPage() {
  // const { user } = useAuth(); // Assuming useAuth() provides the current user's ID and details
  // For now, using a hardcoded current user ID from mock data
  const currentUserId = mockUsers[0].id; // Alex Ryder

  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [isMobileView, setIsMobileView] = useState(false); // For responsive layout

  // Determine initial selected conversation (e.g., from query param or first in list)
  useEffect(() => {
    // This is a placeholder. In a real app, you might get conversation ID from URL
    // or select the most recent one by default.
    const userConversations = mockConversations.filter(conv => 
        conv.participants.some(p => p.id === currentUserId)
    ).sort((a,b) => new Date(b.lastMessageTimestamp).getTime() - new Date(a.lastMessageTimestamp).getTime());

    if (userConversations.length > 0 && !selectedConversation) {
        // setSelectedConversation(userConversations[0]); // Select most recent by default on desktop
    }
  }, [currentUserId, selectedConversation]);
  
  // Handle window resize for responsive layout
  useEffect(() => {
    const checkMobileView = () => setIsMobileView(window.innerWidth < 768); // md breakpoint
    checkMobileView();
    window.addEventListener("resize", checkMobileView);
    return () => window.removeEventListener("resize", checkMobileView);
  }, []);


  const handleSelectConversation = (conversationId: string) => {
    const conversation = mockConversations.find(c => c.id === conversationId);
    setSelectedConversation(conversation || null);
  };
  
  const handleBackToList = () => {
      setSelectedConversation(null); // Clear selection to show list on mobile
  };

  if (!currentUserId) {
    // Handle case where user is not authenticated or ID is not available
    // This could be a redirect to login or an error message.
    // For now, assuming currentUserId is always available if this page is accessed.
    return <p className="p-4 text-center">Please log in to view your messages.</p>;
  }
  
  // Responsive Layout Logic
  if (isMobileView) {
      if (selectedConversation) {
          return (
              <div className="h-[calc(100vh-var(--header-height,80px))]"> {/* Adjust header height variable if needed */}
                  <MessageView
                      conversation={selectedConversation}
                      currentUserId={currentUserId}
                      onBackToList={handleBackToList}
                  />
              </div>
          );
      }
      return (
          <div className="h-[calc(100vh-var(--header-height,80px))]">
              <ConversationList
                  currentUserId={currentUserId}
                  onSelectConversation={handleSelectConversation}
                  selectedConversationId={selectedConversation?.id}
              />
          </div>
      );
  }

  // Desktop Layout (two-pane)
  return (
    <div className="flex h-[calc(100vh-var(--header-height,80px))] border-t"> {/* Adjust header height variable */}
      <div className="w-1/3 min-w-[300px] max-w-[400px] border-r h-full">
        <ConversationList
          currentUserId={currentUserId}
          onSelectConversation={handleSelectConversation}
          selectedConversationId={selectedConversation?.id}
        />
      </div>
      <div className="flex-1 h-full">
        <MessageView
          conversation={selectedConversation}
          currentUserId={currentUserId}
        />
      </div>
    </div>
  );
}
