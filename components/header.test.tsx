// components/header.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import Header from './header';
import { useAuth } from '@/hooks/use-auth';
import { useMediaQuery } from '@/hooks/use-media-query';

// Mocks

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
  }),
  usePathname: () => '/',
}));

// Mock useAuth hook
jest.mock('@/hooks/use-auth');

// Mock useMediaQuery hook
jest.mock('@/hooks/use-media-query');

// Mock child components
jest.mock('@/components/mode-toggle', () => () => <button aria-label="Toggle dark mode">ModeToggle</button>);
jest.mock('@/components/notification-dropdown', () => (props: any) => (
  <div data-testid="notification-dropdown-mock">
    NotificationDropdown ({props.notifications.length} items)
  </div>
));

// Mock data
jest.mock('@/lib/mock-data/messages', () => ({
  ...jest.requireActual('@/lib/mock-data/messages'),
  getUnreadNotificationsCount: jest.fn(() => 0),
  markNotificationAsRead: jest.fn(),
  addNotification: jest.fn(),
  initialMockNotifications: [],
  mockUsers: [{ id: 'user1', name: 'Alex Ryder', avatarUrl: '/placeholder-user.jpg' }],
}));

describe('Header - Authenticated User (Desktop)', () => {
  const mockSignOut = jest.fn();
  let mockUseAuth: jest.Mock;

  beforeEach(() => {
    mockUseAuth = useAuth as jest.Mock;
    mockUseAuth.mockReturnValue({
      user: { id: 'user1', name: 'Test User', image: '/avatar.jpg' },
      signOut: mockSignOut,
    });

    (useMediaQuery as jest.Mock).mockImplementation((query: string) => {
      if (query === '(max-width: 768px)') return false;
      return false;
    });

    (require('@/lib/mock-data/messages').getUnreadNotificationsCount as jest.Mock).mockReturnValue(3);

    render(<Header />);
  });

  const expectedNavItems = ['Home', 'Listings', 'Categories', 'About', 'Contact'];
  const removedNavItems = ['How It Works'];

  it('renders main navigation links correctly', () => {
    expectedNavItems.forEach((item) => {
      expect(screen.getAllByRole('link', { name: new RegExp(`^${item}$`, 'i') })[0]).toBeInTheDocument();
    });

    removedNavItems.forEach((item) => {
      expect(screen.queryByRole('link', { name: new RegExp(`^${item}$`, 'i') })).not.toBeInTheDocument();
    });
  });

  it('renders the brand name "Just2Wheels"', () => {
    expect(screen.getByText(/Just2Wheels/i)).toBeInTheDocument();
  });

  it('renders the search input field', () => {
    expect(screen.getByPlaceholderText(/Search listings.../i)).toBeInTheDocument();
  });

  it('renders the "Post a Listing" button', () => {
    expect(screen.getByRole('link', { name: /Post a Listing/i })).toBeInTheDocument();
  });

  it('renders correct links in user dropdown', () => {
    const avatarTrigger = screen.getByText('T'); // First initial of "Test User"
    fireEvent.click(avatarTrigger.closest('button')!);

    expect(screen.getByRole('link', { name: /Profile/i })).toHaveAttribute('href', '/profile');
    expect(screen.getByRole('link', { name: /My Listings/i })).toHaveAttribute('href', '/listings/my-listings');
    expect(screen.getByRole('link', { name: /Messages/i })).toHaveAttribute('href', '/messages');
    expect(screen.getByRole('link', { name: /Favorites/i })).toHaveAttribute('href', '/favorites');
    expect(screen.getByRole('link', { name: /Saved Searches/i })).toHaveAttribute('href', '/saved-searches');
  });

  it('shows notification count and dropdown', () => {
    const bellButton = screen.getByRole('button', { name: /Notifications/i });
    expect(bellButton).toHaveTextContent('3');
    fireEvent.click(bellButton);
    expect(screen.getByTestId('notification-dropdown-mock')).toBeInTheDocument();
  });

  it('shows messages count on message icon', () => {
    const messagesButton = screen.getByRole('button', { name: /Messages/i });
    expect(messagesButton).toHaveTextContent('2'); // Header component default
  });
});

describe('Header - Unauthenticated User (Desktop)', () => {
  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      signOut: jest.fn(),
    });

    (useMediaQuery as jest.Mock).mockImplementation((query: string) => {
      if (query === '(max-width: 768px)') return false;
      return false;
    });

    render(<Header />);
  });

  it('renders login and register buttons', () => {
    expect(screen.getByRole('link', { name: /Log In/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Register/i })).toBeInTheDocument();
  });
});

describe('Header - Mobile View', () => {
  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      signOut: jest.fn(),
    });

    (useMediaQuery as jest.Mock).mockImplementation((query: string) => {
      if (query === '(max-width: 768px)') return true;
      return false;
    });

    render(<Header />);
  });

  it('renders the mobile menu toggle button', () => {
    expect(screen.getByRole('button', { name: /Toggle menu/i })).toBeInTheDocument();
  });

  it('does not render desktop "Post a Listing" button', () => {
    expect(screen.queryByRole('link', { name: /Post a Listing/i })).not.toBeInTheDocument();
  });

  it('renders the mobile search button', () => {
    expect(screen.getByRole('link', { name: /Search/i })).toBeInTheDocument();
  });

  it('renders mobile navigation items when menu is toggled', () => {
    const menuButton = screen.getByRole('button', { name: /Toggle menu/i });
    fireEvent.click(menuButton);

    ['Home', 'Listings', 'Categories', 'About', 'Contact'].forEach((item) => {
      expect(screen.getByRole('link', { name: new RegExp(`^${item}$`, 'i') })).toBeInTheDocument();
    });

    expect(screen.queryByRole('link', { name: /How It Works/i })).not.toBeInTheDocument();
  });
});
