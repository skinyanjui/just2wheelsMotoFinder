import { render, screen } from '@testing-library/react';
import Header from './header';
import { useMediaQuery } from '@/hooks/use-media-query';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  usePathname: () => '/',
}));

// Mock useAuth hook
jest.mock('@/hooks/use-auth', () => ({
  useAuth: () => ({
    user: null, // Simulate logged-out state, or provide a mock user object
    signOut: jest.fn(),
  }),
}));

// Mock useMediaQuery hook
jest.mock('@/hooks/use-media-query');

describe('Header', () => {
  beforeEach(() => {
    // Default to desktop view for most tests
    (useMediaQuery as jest.Mock).mockImplementation((query) => {
      if (query === '(max-width: 768px)') return false; // isMobile
      if (query === '(max-width: 1024px)') return false; // isTablet
      return false;
    });
    render(<Header />);
  });

  it('renders the main logo/brand name "Just2Wheels"', () => {
    expect(screen.getByText(/Just2Wheels/i)).toBeInTheDocument();
  });

  it('renders the search input field', () => {
    expect(screen.getByPlaceholderText(/Search listings.../i)).toBeInTheDocument();
  });

  it('renders the "Post a Listing" button on desktop', () => {
    expect(screen.getByRole('link', { name: /Post a Listing/i })).toBeInTheDocument();
  });
  
  it('renders login and register buttons when user is not authenticated on desktop', () => {
    expect(screen.getByRole('link', { name: /Log In/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Register/i })).toBeInTheDocument();
  });
});

describe('Header - Mobile', () => {
  beforeEach(() => {
    (useMediaQuery as jest.Mock).mockImplementation((query) => {
      if (query === '(max-width: 768px)') return true; // isMobile
      return false;
    });
    render(<Header />);
  });

  it('renders the mobile menu toggle button', () => {
    expect(screen.getByRole('button', { name: /Toggle menu/i })).toBeInTheDocument();
  });

  it('does not render the desktop "Post a Listing" button', () => {
    expect(screen.queryByRole('link', { name: /Post a Listing/i })).not.toBeInTheDocument();
  });

  it('renders the mobile search button', () => {
    expect(screen.getByRole('link', { name: /Search/i })).toBeInTheDocument();
  });
});
