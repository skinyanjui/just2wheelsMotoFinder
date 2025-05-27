// components/notification-dropdown.tsx
"use client";

import { Notification } from "@/lib/mock-data/messages"; // Adjust path
import NotificationItem from "./notification-item"; // Adjust path
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area"; // Assuming this exists

interface NotificationDropdownProps {
  notifications: Notification[];
  onMarkAsRead: (notificationId: string) => void;
  onMarkAllAsRead?: () => void; // Optional: if we add a "mark all as read" button
  onClose: () => void; // To close the dropdown
}

export default function NotificationDropdown({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onClose,
}: NotificationDropdownProps) {
  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="w-80 rounded-md border bg-popover text-popover-foreground shadow-lg md:w-96">
      <div className="flex items-center justify-between border-b p-3">
        <h3 className="font-semibold">Notifications {unreadCount > 0 && `(${unreadCount})`}</h3>
        {onMarkAllAsRead && unreadCount > 0 && (
          <Button variant="link" size="sm" onClick={onMarkAllAsRead} className="text-xs">
            Mark all as read
          </Button>
        )}
      </div>
      {notifications.length === 0 ? (
        <p className="p-6 text-center text-sm text-muted-foreground">You have no new notifications.</p>
      ) : (
        <ScrollArea className="max-h-80"> {/* Adjust max height as needed */}
          <div className="divide-y">
            {notifications.map((notif) => (
              <NotificationItem
                key={notif.id}
                notification={notif}
                onMarkAsRead={(id) => {
                    onMarkAsRead(id);
                    // Optionally close dropdown if notification has a link and is clicked
                    // if (notif.link) onClose();
                }}
              />
            ))}
          </div>
        </ScrollArea>
      )}
      {/* Footer with "View all notifications" link removed */}
    </div>
  );
}
