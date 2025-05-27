"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils"; // Assuming you have this utility from shadcn/ui
import { Message, UserDetails } from "@/lib/mock-data/messages"; // Adjust path if needed

interface MessageBubbleProps {
  message: Message;
  senderDetails?: UserDetails; // Details of the person who sent this message
  isCurrentUserSender: boolean;
}

export default function MessageBubble({ message, senderDetails, isCurrentUserSender }: MessageBubbleProps) {
  const senderName = senderDetails?.name || "Unknown User";
  const senderAvatar = senderDetails?.avatarUrl;
  const senderInitials = senderName.substring(0, 2).toUpperCase();

  return (
    <div className={cn("flex items-end gap-2 mb-4", isCurrentUserSender ? "justify-end" : "justify-start")}>
      {!isCurrentUserSender && (
        <Avatar className="h-8 w-8">
          <AvatarImage src={senderAvatar} alt={senderName} />
          <AvatarFallback>{senderInitials}</AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          "max-w-[70%] rounded-lg p-3 shadow-sm",
          isCurrentUserSender
            ? "bg-primary text-primary-foreground rounded-br-none"
            : "bg-muted rounded-bl-none"
        )}
      >
        <p className="text-sm">{message.content}</p>
        <p className={cn(
            "mt-1 text-xs", 
            isCurrentUserSender ? "text-primary-foreground/80 text-right" : "text-muted-foreground/80 text-left"
          )}
        >
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
      {isCurrentUserSender && (
        <Avatar className="h-8 w-8">
          <AvatarImage src={senderAvatar} alt={senderName} />
          <AvatarFallback>{senderInitials}</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
