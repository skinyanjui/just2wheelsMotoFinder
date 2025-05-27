// components/notification-dropdown.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import NotificationDropdown from './notification-dropdown';
import { mockNotifications as initialMockNotifications, Notification } from '@/lib/mock-data/messages'; // Adjust path

// Mock NotificationItem to simplify testing the dropdown itself
jest.mock('./notification-item', () => (props: { notification: Notification, onMarkAsRead: (id: string) => void }) => (
  <div data-testid="notification-item-mock" onClick={() => props.onMarkAsRead(props.notification.id)}>
    <p>{props.notification.title}</p>
    <p>{props.notification.message}</p>
    {!props.notification.isRead && <span data-testid="unread-indicator">Unread</span>}
  </div>
));

// Mock ScrollArea as it's a UI primitive
jest.mock('@/components/ui/scroll-area', () => ({
  ScrollArea: ({ children, ...props }: any) => <div {...props}>{children}</div>,
}));


describe('NotificationDropdown', () => {
  const mockOnMarkAsRead = jest.fn();
  const mockOnMarkAllAsRead = jest.fn();
  const mockOnClose = jest.fn();

  const notificationsSample: Notification[] = [
    { ...initialMockNotifications[0], id: "notif1", isRead: false, title: "Unread Notification 1" },
    { ...initialMockNotifications[1], id: "notif2", isRead: true, title: "Read Notification 2" },
    { ...initialMockNotifications[2], id: "notif3", isRead: false, title: "Unread Notification 3" },
  ];
  
  beforeEach(() => {
    mockOnMarkAsRead.mockClear();
    mockOnMarkAllAsRead.mockClear();
    mockOnClose.mockClear();
  });

  it('does not render "View all notifications" link', () => {
    render(
      <NotificationDropdown
        notifications={notificationsSample}
        onMarkAsRead={mockOnMarkAsRead}
        onMarkAllAsRead={mockOnMarkAllAsRead}
        onClose={mockOnClose}
      />
    );
    expect(screen.queryByRole('link', { name: /View all notifications/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /View all notifications/i })).not.toBeInTheDocument();
  });

  it('renders notification items if notifications exist', () => {
    render(
      <NotificationDropdown
        notifications={notificationsSample.slice(0, 1)} // Only one notification
        onMarkAsRead={mockOnMarkAsRead}
        onMarkAllAsRead={mockOnMarkAllAsRead}
        onClose={mockOnClose}
      />
    );
    expect(screen.getByText(notificationsSample[0].title)).toBeInTheDocument();
    expect(screen.getAllByTestId('notification-item-mock')).toHaveLength(1);
  });
  
  it('renders multiple notification items', () => {
    render(
      <NotificationDropdown
        notifications={notificationsSample}
        onMarkAsRead={mockOnMarkAsRead}
        onMarkAllAsRead={mockOnMarkAllAsRead}
        onClose={mockOnClose}
      />
    );
    expect(screen.getAllByTestId('notification-item-mock')).toHaveLength(notificationsSample.length);
    expect(screen.getByText(notificationsSample[0].title)).toBeInTheDocument();
    expect(screen.getByText(notificationsSample[1].title)).toBeInTheDocument();
    expect(screen.getByText(notificationsSample[2].title)).toBeInTheDocument();
  });


  it('renders empty state if no notifications', () => {
    render(
      <NotificationDropdown
        notifications={[]}
        onMarkAsRead={mockOnMarkAsRead}
        onMarkAllAsRead={mockOnMarkAllAsRead}
        onClose={mockOnClose}
      />
    );
    expect(screen.getByText(/You have no new notifications/i)).toBeInTheDocument();
    expect(screen.queryAllByTestId('notification-item-mock')).toHaveLength(0);
  });

  it('displays unread count in the header', () => {
    render(
      <NotificationDropdown
        notifications={notificationsSample} // 2 unread
        onMarkAsRead={mockOnMarkAsRead}
        onMarkAllAsRead={mockOnMarkAllAsRead}
        onClose={mockOnClose}
      />
    );
    expect(screen.getByRole('heading', { name: /Notifications \(2\)/i })).toBeInTheDocument();
  });

  it('displays "Mark all as read" button if there are unread notifications and handler is provided', () => {
     render(
      <NotificationDropdown
        notifications={notificationsSample} // 2 unread
        onMarkAsRead={mockOnMarkAsRead}
        onMarkAllAsRead={mockOnMarkAllAsRead} // Handler provided
        onClose={mockOnClose}
      />
    );
    expect(screen.getByRole('button', { name: /Mark all as read/i })).toBeInTheDocument();
  });

  it('does not display "Mark all as read" button if no unread notifications, even if handler is provided', () => {
    const allReadNotifications = notificationsSample.map(n => ({ ...n, isRead: true }));
    render(
      <NotificationDropdown
        notifications={allReadNotifications}
        onMarkAsRead={mockOnMarkAsRead}
        onMarkAllAsRead={mockOnMarkAllAsRead} // Handler provided
        onClose={mockOnClose}
      />
    );
    expect(screen.queryByRole('button', { name: /Mark all as read/i })).not.toBeInTheDocument();
  });
  
  it('does not display "Mark all as read" button if handler is not provided, even if there are unread notifications', () => {
    render(
      <NotificationDropdown
        notifications={notificationsSample} // 2 unread
        onMarkAsRead={mockOnMarkAsRead}
        // onMarkAllAsRead handler NOT provided
        onClose={mockOnClose}
      />
    );
    expect(screen.queryByRole('button', { name: /Mark all as read/i })).not.toBeInTheDocument();
  });

  it('calls onMarkAllAsRead when "Mark all as read" button is clicked', () => {
    render(
      <NotificationDropdown
        notifications={notificationsSample}
        onMarkAsRead={mockOnMarkAsRead}
        onMarkAllAsRead={mockOnMarkAllAsRead}
        onClose={mockOnClose}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: /Mark all as read/i }));
    expect(mockOnMarkAllAsRead).toHaveBeenCalledTimes(1);
  });
});
