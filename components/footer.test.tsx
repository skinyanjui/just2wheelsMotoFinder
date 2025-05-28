import { render, screen } from '@testing-library/react';
import Footer from './footer';

describe('Footer', () => {
  beforeEach(() => {
    render(<Footer />);
  });

  it('does not render social media links', () => {
    // Check for specific links by sr-only text if they existed
    // Since they are removed, we ensure they are not found.
    // Lucide icons add a <title> tag which can be used as accessible name
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
