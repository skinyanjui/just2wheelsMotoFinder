import { render, screen } from '@testing-library/react';
import ContactPage from './page';

// Mock child components
jest.mock('@/components/general-contact-form', () => () => <div data-testid="general-contact-form-mock">Mocked General Contact Form</div>);

describe('ContactPage', () => {
  it('renders the main heading and the contact form mock', () => {
    render(<ContactPage />);
    expect(screen.getByRole('heading', { name: /Contact Us/i })).toBeInTheDocument();
    expect(screen.getByTestId('general-contact-form-mock')).toBeInTheDocument();
  });
});
