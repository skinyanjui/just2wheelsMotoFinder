// app/privacy-policy/page.test.tsx
import { render, screen } from '@testing-library/react';
import PrivacyPolicyPage from './page';

describe('PrivacyPolicyPage', () => {
  it('renders the main heading', () => {
    render(<PrivacyPolicyPage />);
    expect(screen.getByRole('heading', { name: /Privacy Policy/i })).toBeInTheDocument();
  });

  it('renders the introductory paragraph', () => {
    render(<PrivacyPolicyPage />);
    expect(screen.getByText(/Your privacy is important to us/i)).toBeInTheDocument();
  });
});
