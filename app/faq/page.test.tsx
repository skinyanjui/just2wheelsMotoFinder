// app/faq/page.test.tsx
import { render, screen } from '@testing-library/react';
import FAQPage from './page';

// Mock the Accordion components as they are complex UI elements and not the focus of this page's content test
jest.mock('@/components/ui/accordion', () => ({
  Accordion: ({ children, ...props }: any) => <div data-testid="accordion-mock" {...props}>{children}</div>,
  AccordionItem: ({ children, ...props }: any) => <div data-testid="accordion-item-mock" {...props}>{children}</div>,
  AccordionTrigger: ({ children, ...props }: any) => <button data-testid="accordion-trigger-mock" {...props}>{children}</button>,
  AccordionContent: ({ children, ...props }: any) => <div data-testid="accordion-content-mock" {...props}>{children}</div>,
}));

describe('FAQPage', () => {
  it('renders the main heading', () => {
    render(<FAQPage />);
    expect(screen.getByRole('heading', { name: /Frequently Asked Questions/i })).toBeInTheDocument();
  });

  it('renders the accordion mock', () => {
    render(<FAQPage />);
    expect(screen.getByTestId('accordion-mock')).toBeInTheDocument();
  });
});
