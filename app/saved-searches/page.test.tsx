import { render, screen } from '@testing-library/react';
import SavedSearchesPage from './page'; // Adjust if needed
import { act } from 'react-dom/test-utils'; // For state updates if testing empty state

jest.mock('@/hooks/use-toast', () => ({
  useToast: () => ({ toast: jest.fn() }),
}));

// Mock initial state for saved searches to test both with and without data
// This is a simplified approach. For more complex state, consider mocking useState or context.
let mockSavedSearches: any[] = [];
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: (initialState: any) => {
    if (Array.isArray(initialState) && initialState.length > 0 && initialState[0]?.searchTerm?.includes("Yamaha MT-07")) {
        // This condition identifies the savedSearches state based on initial mock data
        return [mockSavedSearches, jest.fn()];
    }
    return jest.requireActual('react').useState(initialState);
  }
}));


describe('SavedSearchesPage', () => {
  const defaultMockSearches = [
    {
      id: "ss1",
      name: "My Commuter Bike Search",
      searchTerm: "Yamaha MT-07",
      filters: [{ type: "category", value: "Naked Bikes", label: "Category" }],
      dateSaved: "2024-03-12",
      resultCount: 5,
    },
    {
      id: "ss2",
      searchTerm: "Adventure Touring",
      filters: [],
      dateSaved: "2024-03-10",
    }
  ];

  beforeEach(() => {
    // Reset to default mock data before each test
    mockSavedSearches = [...defaultMockSearches];
  });

  it('renders the main heading and saved search items when data is present', () => {
    render(<SavedSearchesPage />);
    expect(screen.getByRole('heading', { name: /My Saved Searches/i })).toBeInTheDocument();
    
    // Check for elements from the mock data
    expect(screen.getByText(/My Commuter Bike Search/i)).toBeInTheDocument();
    expect(screen.getByText(/Adventure Touring/i)).toBeInTheDocument();
    expect(screen.getByText(/Category: Naked Bikes/i)).toBeInTheDocument(); // Check for filter display
    expect(screen.getByRole('button', { name: /View Results/i })).toBeInTheDocument(); // Should be multiple
  });

  it('renders the empty state message when no saved searches are present', () => {
    act(() => {
      mockSavedSearches = []; // Set mock data to empty for this test
    });
    render(<SavedSearchesPage />);
    
    expect(screen.getByRole('heading', { name: /My Saved Searches/i })).toBeInTheDocument();
    expect(screen.getByText(/No Saved Searches Yet/i)).toBeInTheDocument();
    expect(screen.getByText(/You haven't saved any searches./i)).toBeInTheDocument();

    // Ensure no search items are rendered
    expect(screen.queryByText(/My Commuter Bike Search/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Adventure Touring/i)).not.toBeInTheDocument();
  });
});
