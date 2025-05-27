// app/listings/page.test.tsx
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import ListingsPage from './page'; // Adjust path
import { useSearchParams, useRouter } from 'next/navigation'; // Keep both
import { useAuth } from '@/hooks/use-auth';
import { mockListings as initialMockListings } from '@/lib/mock-data/listings'; // Import for assertions

// Mock next/navigation
jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useSearchParams: jest.fn(),
  useRouter: jest.fn(() => ({ 
    push: jest.fn(),
    replace: jest.fn() // Add replace mock
  })),
}));

// Mock useAuth
jest.mock('@/hooks/use-auth');

// Mock specific UI components
jest.mock('@/components/ui/slider', () => ({
  Slider: (props: any) => <input type="range" data-testid="price-slider-mock" {...props} />
}));
// Mock ListingCard to simplify test output and focus on filtering logic
jest.mock('@/components/listing-card', () => (props: { listing: any }) => (
    <article data-testid={`listing-${props.listing.id}`}>
        <h2>{props.listing.title}</h2>
        <p>Make: {props.listing.make}</p>
        <p>Model: {props.listing.model}</p>
    </article>
));


describe('ListingsPage Filter Functionality', () => {
  const mockSignOut = jest.fn();
  let mockRouterReplace: jest.Mock;

  beforeEach(() => {
    // Provide a default mock implementation for useSearchParams
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());
    // Mock useAuth
    (useAuth as jest.Mock).mockReturnValue({
      user: { id: 'user1', name: 'Test User', image: '/avatar.jpg' },
      signOut: mockSignOut,
    });
    // Mock router.replace
    mockRouterReplace = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
        push: jest.fn(),
        replace: mockRouterReplace,
    });
  });

  // Helper to open filters if not already visible (for mobile view primarily)
  const ensureFiltersVisible = () => {
    // The test environment might not have accurate window.innerWidth for the mobile toggle.
    // We assume filters are visible on desktop or we click the toggle if present.
    const filterToggleButton = screen.queryByRole('button', { name: /Show Filters/i });
    if (filterToggleButton) {
        fireEvent.click(filterToggleButton);
    }
  };

  it('filters by Make correctly', async () => {
    render(<ListingsPage />);
    ensureFiltersVisible();
    
    // Example: Filter by "Kawasaki"
    const makeToSelect = "Kawasaki";
    const expectedKawasakiListings = initialMockListings.filter(l => l.make === makeToSelect);
    const otherMakeListingTitle = initialMockListings.find(l => l.make !== makeToSelect)?.title;

    // Find the "Make" select dropdown trigger
    // Using a more robust way to find the SelectTrigger associated with the "Make" label
    const makeLabel = screen.getByText(/^Make$/i); // Find the label element
    const makeSelectTrigger = makeLabel.closest('div')?.querySelector('button[role="combobox"]'); // Find combobox within label's parent div
    expect(makeSelectTrigger).toBeInTheDocument();
    
    fireEvent.mouseDown(makeSelectTrigger!);

    const kawasakiOption = await screen.findByText(makeToSelect);
    fireEvent.click(kawasakiOption);

    // Verify that only Kawasaki listings are shown
    await waitFor(() => { // Wait for DOM updates after filter application
        const listingsOnScreen = screen.getAllByRole('article');
        expect(listingsOnScreen.length).toBe(expectedKawasakiListings.length);
    });

    expectedKawasakiListings.forEach(listing => {
        expect(screen.getByText(listing.title)).toBeInTheDocument();
    });
    if (otherMakeListingTitle) {
        expect(screen.queryByText(otherMakeListingTitle)).not.toBeInTheDocument();
    }
  });

  it('filters by Make and Model correctly', async () => {
    render(<ListingsPage />);
    ensureFiltersVisible();

    const makeToSelect = "Harley-Davidson";
    const modelToSelect = "Street Glide"; // Assuming this model exists for Harley-Davidson in mock data
    
    const expectedListing = initialMockListings.find(l => l.make === makeToSelect && l.model === modelToSelect);
    expect(expectedListing).toBeDefined(); // Test setup check

    // Select Make
    const makeLabel = screen.getByText(/^Make$/i);
    const makeSelectTrigger = makeLabel.closest('div')?.querySelector('button[role="combobox"]');
    expect(makeSelectTrigger).toBeInTheDocument();
    fireEvent.mouseDown(makeSelectTrigger!);
    fireEvent.click(await screen.findByText(makeToSelect));

    // Select Model
    const modelLabel = screen.getByText(/^Model$/i);
    const modelSelectTrigger = modelLabel.closest('div')?.querySelector('button[role="combobox"]');
    expect(modelSelectTrigger).toBeInTheDocument();
    expect(modelSelectTrigger).not.toBeDisabled();
    
    fireEvent.mouseDown(modelSelectTrigger!);
    fireEvent.click(await screen.findByText(modelToSelect));
    
    await waitFor(() => {
        const listingsOnScreen = screen.getAllByRole('article');
        expect(listingsOnScreen.length).toBe(1);
    });
    expect(screen.getByText(expectedListing!.title)).toBeInTheDocument();

    // Check that another bike is not present
    const anotherBikeTitle = initialMockListings.find(l => l.id !== expectedListing!.id)?.title;
    if(anotherBikeTitle) {
        expect(screen.queryByText(anotherBikeTitle)).not.toBeInTheDocument();
    }
  });

  it('resets Model when Make changes', async () => {
    render(<ListingsPage />);
    ensureFiltersVisible();

    // Initial state: Select Harley-Davidson & Street Glide
    const makeLabel = screen.getByText(/^Make$/i);
    const makeSelectTrigger = makeLabel.closest('div')?.querySelector('button[role="combobox"]');
    fireEvent.mouseDown(makeSelectTrigger!);
    fireEvent.click(await screen.findByText("Harley-Davidson"));

    const modelLabel = screen.getByText(/^Model$/i);
    const modelSelectTrigger = modelLabel.closest('div')?.querySelector('button[role="combobox"]');
    fireEvent.mouseDown(modelSelectTrigger!);
    fireEvent.click(await screen.findByText("Street Glide"));

    await waitFor(() => {
      expect(screen.getByText("Harley-Davidson Street Glide")).toBeInTheDocument();
    });
    // Check that only the Street Glide is shown initially
     let listingsOnScreen = screen.getAllByRole('article');
     expect(listingsOnScreen.length).toBe(1);


    // Change Make to "Kawasaki"
    fireEvent.mouseDown(makeSelectTrigger!); // Re-open make dropdown
    fireEvent.click(await screen.findByText("Kawasaki"));

    // After changing make, model should be reset (showing all Kawasakis)
    const kawasakiListingsInMock = initialMockListings.filter(l => l.make === "Kawasaki");
    
    await waitFor(() => {
        listingsOnScreen = screen.getAllByRole('article');
        expect(listingsOnScreen.length).toBe(kawasakiListingsInMock.length);
    });
    
    kawasakiListingsInMock.forEach(listing => {
        expect(screen.getByText(listing.title)).toBeInTheDocument();
    });
    expect(screen.queryByText("Harley-Davidson Street Glide")).not.toBeInTheDocument();

    // Also check if the model select trigger text has reset (e.g., to "All Models")
    // The Shadcn Select component updates the text within the trigger button.
    // The trigger button initially has "Select make first" or "All Models".
    // After selecting a make, then changing it, it should revert to "All Models"
    // if the model was reset.
    const modelTriggerButton = modelLabel.closest('div')?.querySelector('button[role="combobox"]');
    // Check if the text content of the trigger is "All Models"
    // This is a bit brittle as it depends on the placeholder text.
    expect(modelTriggerButton).toHaveTextContent("All Models");
  });
});
