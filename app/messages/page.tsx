// app/messages/page.tsx
"use client";

import { useState, useEffect, Suspense } from "react"; // Added Suspense
import { useSearchParams } from "next/navigation"; // Ensure this is imported
import ConversationList from "@/components/conversation-list";
import MessageView from "@/components/message-view";
import { mockUsers, mockConversations, Conversation } from "@/lib/mock-data/messages";
// import { useAuth } from "@/hooks/use-auth";

// Inner component that uses useSearchParams
function MessagesContent() {
  const searchParams = useSearchParams();
  // const { user } = useAuth();
  const currentUserId = mockUsers[0].id; // Alex Ryder (fallback for now)

  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const checkMobileView = () => setIsMobileView(window.innerWidth < 768);
    checkMobileView();
    window.addEventListener("resize", checkMobileView);
    return () => window.removeEventListener("resize", checkMobileView);
  }, []);

  useEffect(() => {
    const conversationIdFromQuery = searchParams.get("conversationId");
    if (conversationIdFromQuery) {
      const conversation = mockConversations.find(c => 
        c.id === conversationIdFromQuery && 
        c.participants.some(p => p.id === currentUserId)
      );
      setSelectedConversation(conversation || null);
    } else if (!isMobileView) { // Auto-select first/most recent on desktop if no query param
        const userConversations = mockConversations
            .filter(conv => conv.participants.some(p => p.id === currentUserId))
            .sort((a,b) => new Date(b.lastMessageTimestamp).getTime() - new Date(a.lastMessageTimestamp).getTime());
        if (userConversations.length > 0) {
            // setSelectedConversation(userConversations[0]); // Temporarily disable auto-selection to avoid potential loops if not careful
        }
    } else {
        setSelectedConversation(null); // Clear selection on mobile if no query param
    }
  }, [searchParams, currentUserId, isMobileView]);

  const handleSelectConversation = (conversationId: string) => {
    const conversation = mockConversations.find(c => c.id === conversationId);
    setSelectedConversation(conversation || null);
    // For a cleaner URL on desktop, you might want to update it, but not critical for functionality
    // if (!isMobileView) {
    //   window.history.pushState({}, '', `/messages?conversationId=${conversationId}`);
    // }
  };
  
  const handleBackToList = () => {
      setSelectedConversation(null);
      // For a cleaner URL on mobile when going back
      // window.history.pushState({}, '', `/messages`);
  };

  if (!currentUserId) {
    return <p className="p-4 text-center">Please log in to view your messages.</p>;
  }
  
  if (isMobileView) {
      if (selectedConversation) {
          return (
              <div className="h-[calc(100vh-var(--header-height,80px))]">
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
    <div className="flex h-[calc(100vh-var(--header-height,80px))] border-t">
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

// Default export Page component wraps MessagesContent in Suspense
export default function MessagesPage() {
    return (
        <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading messages...</div>}>
            <MessagesContent />
        </Suspense>
    );
}
