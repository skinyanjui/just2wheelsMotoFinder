import { render, screen } from '@testing-library/react';
import NotificationsPage from './page';

describe('NotificationsPage', () => {
  it('renders the main heading', () => {
    render(<NotificationsPage />);
    expect(screen.getByRole('heading', { name: /Notifications/i })).toBeInTheDocument();
  });
});
