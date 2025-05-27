import { render, screen } from '@testing-library/react';
import MyListingCard from './my-listing-card';

const mockListing = {
  id: "1",
  title: "Test Bike",
  price: 1000,
  status: "Active" as "Active" | "Sold" | "Draft" | "Expired",
  dateListed: "2024-01-01",
  views: 10,
  imageUrl: "/test-image.png",
  category: "Sport"
};

describe('MyListingCard', () => {
  it('renders listing details correctly', () => {
    render(<MyListingCard listing={mockListing} />);
    expect(screen.getByText(mockListing.title)).toBeInTheDocument();
    expect(screen.getByText(`$${mockListing.price.toLocaleString()}`)).toBeInTheDocument();
    // Status badge might render text differently or within a specific structure
    expect(screen.getByText(mockListing.status, { exact: false })).toBeInTheDocument(); 
    expect(screen.getByText(mockListing.category)).toBeInTheDocument();
    expect(screen.getByText(/10 views/i)).toBeInTheDocument();
  });

  it('renders action buttons', () => {
    render(<MyListingCard listing={mockListing} />);
    expect(screen.getByRole('button', { name: /View Public/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Edit/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Delete/i })).toBeInTheDocument();
  });

  it('renders "Mark as Sold" button for Active listings', () => {
    render(<MyListingCard listing={{ ...mockListing, status: 'Active' }} />);
    expect(screen.getByRole('button', { name: /Mark as Sold/i })).toBeInTheDocument();
  });

  it('renders "Publish" button for Draft listings', () => {
    render(<MyListingCard listing={{ ...mockListing, status: 'Draft' }} />);
    expect(screen.getByRole('button', { name: /Publish/i })).toBeInTheDocument();
  });
});
