import { render, screen } from '@testing-library/react';
import AboutPage from './page';

describe('AboutPage', () => {
  it('renders the main heading and some introductory text', () => {
    render(<AboutPage />);
    expect(screen.getByRole('heading', { name: /About Just2Wheels/i })).toBeInTheDocument();
    expect(screen.getByText(/your premier online destination for motorcycle enthusiasts/i)).toBeInTheDocument();
  });
});
