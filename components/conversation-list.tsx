"use client";

import { useState, useEffect } from "react";
import ConversationListItem from "./conversation-list-item"; // Adjust path if needed
import { mockConversations, Conversation, mockUsers } from "@/lib/mock-data/messages"; // Adjust path
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface ConversationListProps {
  currentUserId: string;
  onSelectConversation: (conversationId: string) => void;
  selectedConversationId?: string;
}

export default function ConversationList({
  currentUserId,
  onSelectConversation,
  selectedConversationId,
}: ConversationListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [conversations, setConversations] = useState<Conversation[]>([]);

  useEffect(() => {
    // Filter conversations to only include those where the current user is a participant
    // And sort by last message timestamp
    const userConversations = mockConversations
      .filter(conv => conv.participants.some(p => p.id === currentUserId))
      .sort((a, b) => new Date(b.lastMessageTimestamp).getTime() - new Date(a.lastMessageTimestamp).getTime());
    setConversations(userConversations);
  }, [currentUserId]);

  const filteredConversations = conversations.filter(conv => {
    const otherParticipant = conv.participants.find(p => p.id !== currentUserId);
    const listingTitle = conv.listingTitle || "";
    return (
      (otherParticipant?.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (listingTitle.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (conv.lastMessageSnippet.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  return (
    <div className="flex h-full flex-col border-r">
      <div className="p-4">
        <h2 className="text-xl font-semibold">Chats</h2>
        <div className="relative mt-4">
          <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search chats..."
            className="w-full rounded-lg bg-background pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="flex-grow overflow-y-auto">
        {filteredConversations.length > 0 ? (
          filteredConversations.map((conv) => (
            <ConversationListItem
              key={conv.id}
              conversation={conv}
              currentUserId={currentUserId}
              isSelected={conv.id === selectedConversationId}
              onSelectConversation={onSelectConversation}
            />
          ))
        ) : (
          <p className="p-4 text-center text-sm text-muted-foreground">
            {searchTerm ? "No matching chats found." : "No chats yet. Start a conversation!"}
          </p>
        )}
      </div>
    </div>
  );
}
