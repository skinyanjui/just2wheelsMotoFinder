"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Conversation, UserDetails } from "@/lib/mock-data/messages"; // Adjust path

interface ConversationListItemProps {
  conversation: Conversation;
  currentUserId: string; // To determine the other participant
  isSelected: boolean;
  onSelectConversation: (conversationId: string) => void;
}

export default function ConversationListItem({
  conversation,
  currentUserId,
  isSelected,
  onSelectConversation,
}: ConversationListItemProps) {
  // Determine the other participant(s)
  const otherParticipants = conversation.participants.filter(p => p.id !== currentUserId);
  const displayParticipant = otherParticipants[0] || { name: "Unknown", avatarUrl: "" }; // Fallback for safety

  const participantName = displayParticipant.name;
  const participantAvatar = displayParticipant.avatarUrl;
  const participantInitials = participantName.substring(0, 2).toUpperCase();

  return (
    <button
      onClick={() => onSelectConversation(conversation.id)}
      className={cn(
        "flex w-full items-center gap-3 p-3 text-left transition-colors hover:bg-muted/50",
        isSelected ? "bg-muted" : ""
      )}
    >
      <Avatar className="h-10 w-10 border">
        <AvatarImage src={participantAvatar} alt={participantName} />
        <AvatarFallback>{participantInitials}</AvatarFallback>
      </Avatar>
      <div className="flex-grow truncate">
        <div className="flex items-center justify-between">
            <h3 className="font-semibold text-sm truncate">{participantName}</h3>
            <p className="text-xs text-muted-foreground">
                {new Date(conversation.lastMessageTimestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
            </p>
        </div>
        {conversation.listingTitle && (
            <p className="text-xs text-primary truncate mt-0.5">Re: {conversation.listingTitle}</p>
        )}
        <div className="flex items-center justify-between mt-0.5">
            <p className="text-xs text-muted-foreground truncate flex-grow pr-2">
                {conversation.lastMessageSnippet}
            </p>
            {conversation.unreadCount > 0 && (
            <Badge variant="default" className="h-5 shrink-0 px-2 py-0.5 text-xs">
                {conversation.unreadCount}
            </Badge>
            )}
        </div>
      </div>
    </button>
  );
}
