// app/terms-of-service/page.test.tsx
import { render, screen } from '@testing-library/react';
import TermsOfServicePage from './page';

describe('TermsOfServicePage', () => {
  it('renders the main heading', () => {
    render(<TermsOfServicePage />);
    expect(screen.getByRole('heading', { name: /Terms of Service/i })).toBeInTheDocument();
  });

  it('renders the introductory paragraph', () => {
    render(<TermsOfServicePage />);
    expect(screen.getByText(/Please read these Terms of Service carefully/i)).toBeInTheDocument();
  });
});
