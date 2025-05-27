// components/header.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import Header from './header';
import { useAuth } from '@/hooks/use-auth';

// Mock child components and hooks
jest.mock('@/hooks/use-auth');
jest.mock('@/components/mode-toggle', () => () => <button aria-label="Toggle dark mode">ModeToggle</button>); // Added aria-label for clarity
jest.mock('@/components/notification-dropdown', () => (props: any) => <div data-testid="notification-dropdown-mock">NotificationDropdown ({props.notifications.length} items)</div>);

// Mocking next/navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/'), // Default pathname
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    // other router methods if needed
  })),
}));

// Mocking parts of lib/mock-data/messages
// We need to ensure that the functions called by Header (like getUnreadNotificationsCount) are mocked
// and that mockUsers has the expected structure if Header uses it for fallbacks.
jest.mock('@/lib/mock-data/messages', () => ({
  ...jest.requireActual('@/lib/mock-data/messages'), // Import and retain default behavior
  getUnreadNotificationsCount: jest.fn(() => 0), // Default to 0 unread
  markNotificationAsRead: jest.fn(),
  addNotification: jest.fn(), // if Header calls it directly or indirectly
  initialMockNotifications: [], // Start with no notifications for simplicity in most tests
  mockUsers: [{ id: "user1", name: "Alex Ryder", avatarUrl: "/placeholder-user.jpg" }], // Ensure our fallback user is here
}));


describe('Header', () => {
  const mockSignOut = jest.fn();
  let mockUseAuth: jest.Mock;

  beforeEach(() => {
    // Reset mocks before each test
    mockSignOut.mockClear();
    mockUseAuth = useAuth as jest.Mock; // Type assertion
    mockUseAuth.mockReturnValue({
      user: { id: 'user1', name: 'Test User', image: '/avatar.jpg' },
      signOut: mockSignOut,
    });
    // Reset other relevant mocks from lib/mock-data/messages if needed
    (require('@/lib/mock-data/messages').getUnreadNotificationsCount as jest.Mock).mockReturnValue(0);
  });

  const expectedNavItems = ["Home", "Listings", "Categories", "About", "Contact"];
  const removedNavItems = ["How It Works"];

  it('renders main navigation links correctly', () => {
    render(<Header />);
    expectedNavItems.forEach(item => {
      // Find link within the main navigation context (not user dropdown or mobile sheet)
      const mainNav = screen.getByRole('navigation', { 'aria-label': /main navigation/i }); // Assuming Header <nav> has aria-label="main navigation" or similar
      // This is a conceptual selector. Actual implementation might require more specific selectors if no aria-label.
      // For now, we assume getAllByRole and take the first one is good enough for main nav.
      expect(screen.getAllByRole('link', { name: new RegExp(`^${item}$`, "i") })[0]).toBeInTheDocument();
    });
    removedNavItems.forEach(item => {
      expect(screen.queryByRole('link', { name: new RegExp(`^${item}$`, "i") })).not.toBeInTheDocument();
    });
  });

  it('renders mobile navigation links correctly when menu is opened', () => {
    render(<Header />);
    const menuButton = screen.getByRole('button', { name: /toggle menu/i });
    fireEvent.click(menuButton);

    // Links are now in the SheetContent. Query within it if possible or ensure names are unique enough.
    expectedNavItems.forEach(item => {
      expect(screen.getByRole('link', { name: new RegExp(`^${item}$`, "i") })).toBeInTheDocument();
    });
    removedNavItems.forEach(item => {
      expect(screen.queryByRole('link', { name: new RegExp(`^${item}$`, "i") })).not.toBeInTheDocument();
    });
  });
  
  it('renders correct links in user dropdown', () => {
    render(<Header />);
    // The avatar button itself might not have the name "Test User" directly on it.
    // It might have an aria-label or its content is the Avatar component.
    // Let's assume the Avatar has a fallback with the first initial or an aria-label set.
    // For this test, we'll assume the DropdownMenuTrigger button has an accessible name.
    // If Avatar is complex, it might need its own test or a data-testid on the trigger.
    // The current Header code has user.name in AvatarFallback, let's try that.
    const avatarTrigger = screen.getByText(mockUseAuth().user.name.charAt(0).toUpperCase());
    fireEvent.click(avatarTrigger.closest('button')!); // Click the parent button of the fallback

    expect(screen.getByRole('menuitem', { name: /Profile/i})).toBeInTheDocument();
    // Check href by finding the link within the menuitem
    const profileLink = screen.getByRole('link', { name: /Profile/i });
    expect(profileLink).toHaveAttribute('href', '/profile');
    
    expect(screen.getByRole('link', { name: /My Listings/i})).toHaveAttribute('href', '/listings/my-listings');
    expect(screen.getByRole('link', { name: /Messages/i})).toHaveAttribute('href', '/messages');
    expect(screen.getByRole('link', { name: /Favorites/i})).toHaveAttribute('href', '/favorites');
    expect(screen.getByRole('link', { name: /Saved Searches/i})).toHaveAttribute('href', '/saved-searches');
  });

  it('shows notification count on bell icon and opens dropdown', () => {
    (require('@/lib/mock-data/messages').getUnreadNotificationsCount as jest.Mock).mockReturnValue(3);
    render(<Header />);
    
    const bellButton = screen.getByRole('button', { name: /Notifications/i });
    expect(bellButton).toHaveTextContent('3'); // Badge content

    fireEvent.click(bellButton);
    expect(screen.getByTestId('notification-dropdown-mock')).toBeInTheDocument();
  });

  it('shows messages count on message icon', () => {
    // Header uses a hardcoded `unreadMessagesCount` state, let's assume it's 2 as per current code.
    // To test this properly, this state should be managed via props or a global store.
    // For now, we test the default state value if it's set.
    // The component's internal state `unreadMessagesCount` is initialized to 2.
    render(<Header />);
    const messagesButton = screen.getByRole('button', { name: /Messages/i });
    expect(messagesButton).toHaveTextContent('2'); // Default mock unread messages count from Header state
  });
});
