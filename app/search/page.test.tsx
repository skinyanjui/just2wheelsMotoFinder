import { render, screen } from '@testing-library/react';
import SearchPage from './page';

describe('SearchPage', () => {
  it('renders the main heading and search input', () => {
    render(<SearchPage />);
    expect(screen.getByRole('heading', { name: /Search/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Search listings.../i)).toBeInTheDocument();
  });
});
