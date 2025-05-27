import { render, screen } from '@testing-library/react';
import GeneralContactForm from './general-contact-form';

// Mock useToast as it's an external dependency not relevant to rendering logic
jest.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: jest.fn(),
  }),
}));

describe('GeneralContactForm', () => {
  it('renders form elements', () => {
    render(<GeneralContactForm />);
    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Send Message/i })).toBeInTheDocument();
  });
});
