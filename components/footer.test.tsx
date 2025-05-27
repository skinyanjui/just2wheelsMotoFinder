// components/footer.test.tsx
import { render, screen } from '@testing-library/react';
import Footer from './footer'; // Adjust path if needed

// Mock next/navigation if any Footer links use <Link> from next/navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/'), // Example pathname
}));

describe('Footer', () => {
  beforeEach(() => {
    render(<Footer />);
  });

  it('renders key informational links with correct paths', () => {
    expect(screen.getByRole('link', { name: /How It Works/i })).toHaveAttribute('href', '/how-it-works');
    expect(screen.getByRole('link', { name: /Safety Tips/i })).toHaveAttribute('href', '/safety-tips');
    expect(screen.getByRole('link', { name: /Terms of Service/i })).toHaveAttribute('href', '/terms-of-service');
    expect(screen.getByRole('link', { name: /Privacy Policy/i })).toHaveAttribute('href', '/privacy-policy');
    expect(screen.getByRole('link', { name: /FAQ/i })).toHaveAttribute('href', '/faq');
    expect(screen.getByRole('link', { name: /About Us/i })).toHaveAttribute('href', '/about');
  });

  it('renders category section and links correctly', () => {
    expect(screen.getByRole('heading', { name: /Categories/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Sport Bikes/i })).toHaveAttribute('href', '/listings?category=Sport%20Bikes');
  });

  it('does not render removed social media links', () => {
    expect(screen.queryByRole('link', { name: /Facebook/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /Twitter/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /Instagram/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /YouTube/i })).not.toBeInTheDocument();
  });

  it('renders the newsletter email input as disabled', () => {
    const emailInput = screen.getByPlaceholderText(/Your email address/i);
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toBeDisabled();
  });

  it('renders the newsletter subscribe button as disabled', () => {
    const subscribeButton = screen.getByRole('button', { name: /Subscribe/i });
    expect(subscribeButton).toBeInTheDocument();
    expect(subscribeButton).toBeDisabled();
  });
});
