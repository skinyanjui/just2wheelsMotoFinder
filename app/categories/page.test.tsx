import { render, screen } from '@testing-library/react';
import CategoriesPage from './page';

// Mock child components if they make external calls or are complex
jest.mock('@/components/category-grid', () => () => <div data-testid="category-grid-mock">Mocked Category Grid</div>);

describe('CategoriesPage', () => {
  it('renders the main heading and the category grid mock', () => {
    render(<CategoriesPage />);
    expect(screen.getByRole('heading', { name: /Browse Categories/i })).toBeInTheDocument();
    expect(screen.getByTestId('category-grid-mock')).toBeInTheDocument();
  });
});
