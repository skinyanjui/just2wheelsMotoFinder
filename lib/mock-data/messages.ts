// lib/mock-data/messages.ts

export interface UserDetails {
  id: string;
  name: string;
  avatarUrl?: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  receiverId?: string; // Not strictly needed if we have conversation participants
  content: string;
  timestamp: string; // ISO string
  isRead?: boolean;
}

export interface Conversation {
  id: string;
  participants: UserDetails[]; // Simplified: directly include user details
  listingId?: string;
  listingTitle?: string; // Useful for display
  lastMessageSnippet: string;
  lastMessageTimestamp: string; // ISO string
  unreadCount: number;
}

export const mockUsers: UserDetails[] = [
  { id: "user1", name: "Alex Ryder", avatarUrl: "/placeholder-user.jpg" }, // Current User (assumption)
  { id: "user2", name: "Sarah Connor", avatarUrl: "/placeholder.svg?text=SC" },
  { id: "user3", name: "John Doe", avatarUrl: "/placeholder.svg?text=JD" },
];

export const mockConversations: Conversation[] = [
  {
    id: "conv1",
    participants: [mockUsers[0], mockUsers[1]], // Alex and Sarah
    listingId: "listing123",
    listingTitle: "Classic Harley Davidson - Like New",
    lastMessageSnippet: "Okay, sounds good. See you then!",
    lastMessageTimestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 mins ago
    unreadCount: 0,
  },
  {
    id: "conv2",
    participants: [mockUsers[0], mockUsers[2]], // Alex and John
    listingId: "listing456",
    listingTitle: "Yamaha R6 Sportbike - Low Mileage",
    lastMessageSnippet: "Is the price negotiable?",
    lastMessageTimestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    unreadCount: 2,
  },
  {
    id: "conv3",
    participants: [mockUsers[1], mockUsers[2]], // Sarah and John (current user not in this one)
    lastMessageSnippet: "Let's discuss the details later.",
    lastMessageTimestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    unreadCount: 0, // From user1's perspective, this would be irrelevant or not shown
  },
];

export const mockMessages: Message[] = [
  // Conversation 1: Alex and Sarah
  { id: "msg1", conversationId: "conv1", senderId: "user1", content: "Hi Sarah, is the Harley still available?", timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString() },
  { id: "msg2", conversationId: "conv1", senderId: "user2", content: "Hi Alex! Yes, it is. Are you free to see it this weekend?", timestamp: new Date(Date.now() - 1000 * 60 * 8).toISOString() },
  { id: "msg3", conversationId: "conv1", senderId: "user1", content: "Great! Saturday afternoon works for me.", timestamp: new Date(Date.now() - 1000 * 60 * 6).toISOString() },
  { id: "msg4", conversationId: "conv1", senderId: "user2", content: "Okay, sounds good. See you then!", timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString() },
  
  // Conversation 2: Alex and John
  { id: "msg5", conversationId: "conv2", senderId: "user1", content: "Hello John, I'm interested in the Yamaha R6.", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2 - 1000*60*5).toISOString() },
  { id: "msg6", conversationId: "conv2", senderId: "user2", content: "It's a great bike, very well maintained.", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2 - 1000*60*3).toISOString(), isRead: true },
  { id: "msg7", conversationId: "conv2", senderId: "user1", content: "Is the price negotiable?", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), isRead: false },
];

// Helper function to get messages for a conversation
export const getMessagesForConversation = (conversationId: string): Message[] => {
  return mockMessages.filter(msg => msg.conversationId === conversationId).sort((a,b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
};

export const findOrCreateConversation = (
  currentUserId: string,
  sellerId: string,
  listingId: string,
  listingTitle: string,
  initialMessageContent?: string
): Conversation => {
  // Try to find existing conversation for this listing between these two users
  let conversation = mockConversations.find(conv =>
    conv.listingId === listingId &&
    conv.participants.some(p => p.id === currentUserId) &&
    conv.participants.some(p => p.id === sellerId)
  );

  if (conversation) {
    // If a message is provided and the conversation exists, add it.
    if (initialMessageContent) {
        addMockMessage(conversation.id, currentUserId, initialMessageContent);
    }
    return conversation;
  }

  // Create new conversation if not found
  const currentUserDetails = mockUsers.find(u => u.id === currentUserId);
  const sellerUserDetails = mockUsers.find(u => u.id === sellerId);

  if (!currentUserDetails || !sellerUserDetails) {
    throw new Error("User details not found for conversation creation.");
  }

  const newConversationId = `conv${mockConversations.length + 1}`;
  conversation = {
    id: newConversationId,
    participants: [currentUserDetails, sellerUserDetails],
    listingId: listingId,
    listingTitle: listingTitle,
    lastMessageSnippet: initialMessageContent ? (initialMessageContent.substring(0,30) + (initialMessageContent.length > 30 ? "..." : "")) : "Conversation started",
    lastMessageTimestamp: new Date().toISOString(),
    unreadCount: initialMessageContent ? 1 : 0, // 1 unread for the seller
  };
  mockConversations.push(conversation);

  if (initialMessageContent) {
    addMockMessage(newConversationId, currentUserId, initialMessageContent);
  }

  return conversation;
};

// --- NOTIFICATIONS ---
export interface Notification {
  id: string;
  type: 'new_message' | 'listing_reply' | 'system_alert' | 'new_listing_match'; // Example types
  title: string;
  message: string;
  link?: string; // e.g., /messages?conversationId=conv1
  timestamp: string; // ISO string
  isRead: boolean;
  actor?: UserDetails; // User who triggered the notification, if applicable
}

export const mockNotifications: Notification[] = [
  {
    id: "notif1",
    type: "new_message",
    title: "New message from Sarah Connor",
    message: "Okay, sounds good. See you then!",
    link: "/messages?conversationId=conv1", // Link to the conversation
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    isRead: false,
    actor: mockUsers.find(u => u.id === "user2"), // Sarah Connor
  },
  {
    id: "notif2",
    type: "new_message",
    title: "New message from John Doe",
    message: "Is the price negotiable?",
    link: "/messages?conversationId=conv2", // Link to the conversation
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    isRead: false,
    actor: mockUsers.find(u => u.id === "user3"), // John Doe
  },
  {
    id: "notif3",
    type: "new_listing_match",
    title: "New Listing Matches Your Search!",
    message: "'Vintage Cafe Racer' search has 2 new bikes.",
    link: "/listings?searchId=search123", // Placeholder link
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    isRead: true,
  },
  {
    id: "notif4",
    type: "system_alert",
    title: "Platform Maintenance Scheduled",
    message: "Brief maintenance on Sunday at 2 AM.",
    link: "/announcements/maintenance-q1",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
    isRead: true,
  }
];

// Helper to get unread notifications count
export const getUnreadNotificationsCount = (): number => {
  return mockNotifications.filter(n => !n.isRead).length;
};

// Helper to mark a notification as read
export const markNotificationAsRead = (notificationId: string): void => {
  const notif = mockNotifications.find(n => n.id === notificationId);
  if (notif) {
    notif.isRead = true;
  }
};

// Helper to add a new notification (e.g., for a new message)
export const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'isRead'>): Notification => {
    const newNotif: Notification = {
        ...notification,
        id: `notif${mockNotifications.length + 1}`,
        timestamp: new Date().toISOString(),
        isRead: false,
    };
    mockNotifications.unshift(newNotif); // Add to the beginning of the array
    return newNotif;
};

// Update addMockMessage to also create a notification for the receiver
export const addMockMessage = (conversationId: string, senderId: string, content: string): Message => {
    const newMessage: Message = {
        id: `msg${mockMessages.length + 1}`,
        conversationId,
        senderId,
        content,
        timestamp: new Date().toISOString(),
        isRead: false,
    };
    mockMessages.push(newMessage);

    const convIndex = mockConversations.findIndex(c => c.id === conversationId);
    if (convIndex !== -1) {
        const conversation = mockConversations[convIndex];
        conversation.lastMessageSnippet = content.substring(0, 30) + (content.length > 30 ? "..." : "");
        conversation.lastMessageTimestamp = newMessage.timestamp;
        
        const senderDetails = mockUsers.find(u => u.id === senderId);
        const receiver = conversation.participants.find(p => p.id !== senderId);

        if (receiver && receiver.id === mockUsers[0].id) { // If current user (Alex) is the receiver
             conversation.unreadCount = (conversation.unreadCount || 0) + 1;
             // Add a notification for the receiver (current user)
             if (senderDetails) {
                 addNotification({
                     type: 'new_message',
                     title: `New message from ${senderDetails.name}`,
                     message: content.substring(0, 50) + (content.length > 50 ? "..." : ""),
                     link: `/messages?conversationId=${conversationId}`,
                     actor: senderDetails,
                 });
             }
        } else if (receiver) {
            // If current user is sender, their action of sending implies they've "read" up to this point.
            if (senderId === mockUsers[0].id) {
                conversation.unreadCount = 0;
            }
        }
    }
    return newMessage;
};
