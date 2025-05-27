"use client";

import { useState, useEffect, useRef } from "react";
import MessageBubble from "./message-bubble"; // Adjust path
import MessageInput from "./message-input"; // Adjust path
import { getMessagesForConversation, addMockMessage, Message, UserDetails, Conversation, mockUsers } from "@/lib/mock-data/messages"; // Adjust path
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MessageViewProps {
  conversation: Conversation | null; // Allow null for when no conversation is selected
  currentUserId: string;
  onBackToList?: () => void; // For mobile view to go back to conversation list
}

export default function MessageView({ conversation, currentUserId, onBackToList }: MessageViewProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null); // For auto-scrolling

  const currentUserDetails = mockUsers.find(u => u.id === currentUserId);

  useEffect(() => {
    if (conversation) {
      setMessages(getMessagesForConversation(conversation.id));
    } else {
      setMessages([]); // Clear messages if no conversation selected
    }
  }, [conversation]);

  useEffect(() => {
    // Auto-scroll to the bottom when new messages are added or conversation changes
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (content: string) => {
    if (!conversation || !currentUserDetails) return;

    // Simulate sending message and updating mock data
    const newMessage = addMockMessage(conversation.id, currentUserDetails.id, content);
    setMessages(prevMessages => [...prevMessages, newMessage]);

    // Potentially update the conversation list's last message snippet & time elsewhere
    // For now, the mock data `addMockMessage` handles this for the global mockConversations array
  };
  
  if (!conversation) {
    return (
      <div className="flex h-full flex-col items-center justify-center bg-muted/20">
        <p className="text-lg text-muted-foreground">Select a chat to view messages.</p>
      </div>
    );
  }

  // Determine the other participant for header display
  const otherParticipant = conversation.participants.find(p => p.id !== currentUserId) || { name: "Unknown User", avatarUrl: "" };

  return (
    <div className="flex h-full flex-col">
      {/* Message View Header */}
      <header className="flex items-center gap-3 border-b p-3">
        {onBackToList && (
          <Button variant="ghost" size="icon" className="sm:hidden" onClick={onBackToList}>
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back to chats</span>
          </Button>
        )}
        <Avatar className="h-9 w-9 border">
          <AvatarImage src={otherParticipant.avatarUrl} alt={otherParticipant.name} />
          <AvatarFallback>{otherParticipant.name.substring(0,2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="font-semibold">{otherParticipant.name}</h2>
          {conversation.listingTitle && (
            <p className="text-xs text-muted-foreground truncate">
              Re: {conversation.listingTitle}
            </p>
          )}
        </div>
      </header>

      {/* Messages Area */}
      <div className="flex-grow overflow-y-auto p-4 space-y-2 bg-muted/10">
        {messages.map((msg) => {
          const sender = conversation.participants.find(p => p.id === msg.senderId) || mockUsers.find(u => u.id === msg.senderId);
          return (
            <MessageBubble
              key={msg.id}
              message={msg}
              senderDetails={sender}
              isCurrentUserSender={msg.senderId === currentUserId}
            />
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input Area */}
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
}
