import { render, screen } from '@testing-library/react';
import MyListingsPage from './page';

jest.mock('@/hooks/use-toast', () => ({
  useToast: () => ({ toast: jest.fn() }),
}));

jest.mock('@/components/my-listing-card', () => (props: any) => (
  <div data-testid="my-listing-card-mock">
    {props.listing.title}
  </div>
));

// Mocking UI components
jest.mock('@/components/ui/tabs', () => ({
  Tabs: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  TabsList: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  TabsTrigger: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  TabsContent: ({ children, ...props }: any) => <div {...props}>{children}</div>,
}));

describe('MyListingsPage', () => {
  it('renders the main heading, tabs, and mock listings', () => {
    render(<MyListingsPage />);
    expect(screen.getByRole('heading', { name: /My Listings/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Active/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sold/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Drafts/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Expired/i })).toBeInTheDocument();

    // Check for a couple of mock listings (titles are used in the mock component)
    expect(screen.getByText(/Classic Harley Davidson - Like New/i)).toBeInTheDocument();
    expect(screen.getByText(/Yamaha R6 Sportbike - Low Mileage/i)).toBeInTheDocument();
  });
});
