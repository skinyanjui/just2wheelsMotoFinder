// app/safety-tips/page.test.tsx
import { render, screen } from '@testing-library/react';
import SafetyTipsPage from './page';

describe('SafetyTipsPage', () => {
  it('renders the main heading', () => {
    render(<SafetyTipsPage />);
    expect(screen.getByRole('heading', { name: /Safety Tips for Buyers & Sellers/i })).toBeInTheDocument();
  });

  it('renders at least one safety section title', () => {
    render(<SafetyTipsPage />);
    // Example: Check for one of the section titles
    expect(screen.getByRole('heading', { name: /Meeting in Person/i })).toBeInTheDocument();
  });
});
