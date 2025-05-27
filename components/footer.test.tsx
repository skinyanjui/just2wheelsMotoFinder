// components/footer.test.tsx
import { render, screen } from '@testing-library/react';
import Footer from './footer'; // Adjust path

// Mock next/navigation if any Footer links use the <Link> component from next/link
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/'), // Example pathname
}));

describe('Footer', () => {
  it('renders "How It Works" and "Safety Tips" links with correct paths', () => {
    render(<Footer />);
    // Check for "How It Works" - this link IS present in the footer
    expect(screen.getByRole('link', { name: /How It Works/i })).toHaveAttribute('href', '/how-it-works');
    
    // Check for "Safety Tips"
    expect(screen.getByRole('link', { name: /Safety Tips/i })).toHaveAttribute('href', '/safety-tips');
    
    // Check for other important legal links
    expect(screen.getByRole('link', { name: /Terms of Service/i })).toHaveAttribute('href', '/terms-of-service');
    expect(screen.getByRole('link', { name: /Privacy Policy/i })).toHaveAttribute('href', '/privacy-policy');
    expect(screen.getByRole('link', { name: /FAQ/i })).toHaveAttribute('href', '/faq');
  });

  it('renders other footer sections and links correctly', () => {
    render(<Footer />);
    // Example: Check for a heading in one of the other sections
    expect(screen.getByRole('heading', { name: /Categories/i })).toBeInTheDocument();
    // Example: Check for a link in another section
    expect(screen.getByRole('link', { name: /Sport Bikes/i })).toHaveAttribute('href', '/listings?category=Sport%20Bikes'); // Encoded space
    expect(screen.getByRole('link', { name: /About Us/i })).toHaveAttribute('href', '/about');

    // Check for social media icons if they are implemented as links with aria-labels
    expect(screen.getByRole('link', { name: /facebook/i})).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /twitter/i})).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /instagram/i})).toBeInTheDocument();
  });
});
