import { render, screen, fireEvent } from '@testing-library/react';
import FavoriteListingCard from './favorite-listing-card';

const mockFavoriteListing = {
  id: "fav1",
  title: "Favorite Test Bike",
  price: 2500,
  location: "Test City, TS",
  category: "Cruiser",
  condition: "Used",
  imageUrl: "/favorite-test-image.png",
  dateFavorited: "2024-03-20",
};

const mockOnRemoveFavorite = jest.fn();

describe('FavoriteListingCard', () => {
  beforeEach(() => {
    // Reset mock before each test
    mockOnRemoveFavorite.mockClear();
  });

  it('renders favorite listing details correctly', () => {
    render(<FavoriteListingCard listing={mockFavoriteListing} onRemoveFavorite={mockOnRemoveFavorite} />);
    
    expect(screen.getByText(mockFavoriteListing.title)).toBeInTheDocument();
    expect(screen.getByText(`$${mockFavoriteListing.price.toLocaleString()}`)).toBeInTheDocument();
    expect(screen.getByText(mockFavoriteListing.location!)).toBeInTheDocument();
    expect(screen.getByText(mockFavoriteListing.category!)).toBeInTheDocument(); // Badge text
    expect(screen.getByText(mockFavoriteListing.condition!)).toBeInTheDocument(); // Badge text
    expect(screen.getByText(/Favorited on: 3\/20\/2024/i)).toBeInTheDocument(); // Date format may vary based on locale
    
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('alt', mockFavoriteListing.title);
    // Next/Image uses complex src, so we check for presence rather than exact match if it's complex
    expect(image).toBeInTheDocument();
  });

  it('renders action buttons', () => {
    render(<FavoriteListingCard listing={mockFavoriteListing} onRemoveFavorite={mockOnRemoveFavorite} />);
    expect(screen.getByRole('button', { name: /Remove from favorites/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /View Details/i })).toBeInTheDocument();
  });

  it('calls onRemoveFavorite when the remove button is clicked', () => {
    render(<FavoriteListingCard listing={mockFavoriteListing} onRemoveFavorite={mockOnRemoveFavorite} />);
    const removeButton = screen.getByRole('button', { name: /Remove from favorites/i });
    fireEvent.click(removeButton);
    expect(mockOnRemoveFavorite).toHaveBeenCalledWith(mockFavoriteListing.id);
    expect(mockOnRemoveFavorite).toHaveBeenCalledTimes(1);
  });

  it('links to the correct listing page', () => {
    render(<FavoriteListingCard listing={mockFavoriteListing} onRemoveFavorite={mockOnRemoveFavorite} />);
    const viewDetailsLink = screen.getByRole('link', { name: /View Details/i });
    expect(viewDetailsLink).toHaveAttribute('href', `/listings/${mockFavoriteListing.id}`);
  });
});
