// components/notification-item.tsx
"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Notification, UserDetails } from "@/lib/mock-data/messages"; // Adjust path
import { cn } from "@/lib/utils";
import { MessageSquareText, AlertTriangle, Search, CheckCircle } from "lucide-react"; // Example icons

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (notificationId: string) => void;
}

const TypeIcon = ({ type }: { type: Notification['type'] }) => {
    switch (type) {
        case 'new_message': return <MessageSquareText className="h-5 w-5 text-blue-500" />;
        case 'listing_reply': return <MessageSquareText className="h-5 w-5 text-green-500" />; // Example
        case 'new_listing_match': return <Search className="h-5 w-5 text-purple-500" />;
        case 'system_alert': return <AlertTriangle className="h-5 w-5 text-orange-500" />;
        default: return <AlertTriangle className="h-5 w-5 text-gray-500" />;
    }
};

export default function NotificationItem({ notification, onMarkAsRead }: NotificationItemProps) {
  const handleNotificationClick = () => {
    if (!notification.isRead) {
      onMarkAsRead(notification.id);
    }
    // Navigation will be handled by the Link component
  };

  const content = (
    <div className={cn(
        "flex items-start gap-3 p-3 hover:bg-muted/50 transition-colors w-full text-left",
        notification.isRead ? "opacity-70" : ""
    )}>
      {notification.actor ? (
        <Avatar className="h-8 w-8 mt-1">
          <AvatarImage src={notification.actor.avatarUrl} alt={notification.actor.name} />
          <AvatarFallback>{notification.actor.name.substring(0,2).toUpperCase()}</AvatarFallback>
        </Avatar>
      ) : (
        <div className="w-8 h-8 mt-1 flex items-center justify-center">
            <TypeIcon type={notification.type} />
        </div>
      )}
      <div className="flex-grow overflow-hidden">
        <p className="text-sm font-medium truncate">{notification.title}</p>
        <p className="text-xs text-muted-foreground truncate">{notification.message}</p>
        <p className="text-xs text-muted-foreground/80 mt-0.5">
          {new Date(notification.timestamp).toLocaleDateString()} {new Date(notification.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
      {!notification.isRead && (
        <div className="h-2 w-2 rounded-full bg-primary self-center shrink-0" title="Unread"></div>
      )}
    </div>
  );

  if (notification.link) {
    return (
      <Link href={notification.link} passHref legacyBehavior>
        <a onClick={handleNotificationClick} className="block w-full">
          {content}
        </a>
      </Link>
    );
  }

  return (
    <button onClick={handleNotificationClick} className="block w-full">
        {content}
    </button>
  );
}
