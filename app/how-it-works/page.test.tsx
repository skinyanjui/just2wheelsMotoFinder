import { render, screen } from '@testing-library/react';
import HowItWorksPage from './page';

// Mock child components
jest.mock('@/components/how-it-works', () => () => <div data-testid="how-it-works-mock">Mocked How It Works</div>);

describe('HowItWorksPage', () => {
  it('renders the main heading and the HowItWorks component mock', () => {
    render(<HowItWorksPage />);
    expect(screen.getByRole('heading', { name: /How Just2Wheels Works/i })).toBeInTheDocument();
    expect(screen.getByTestId('how-it-works-mock')).toBeInTheDocument();
  });
});
