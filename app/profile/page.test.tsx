import { render, screen } from '@testing-library/react';
import ProfilePage from './page'; 

jest.mock('@/hooks/use-toast', () => ({
  useToast: () => ({ toast: jest.fn() }),
}));
// Mocking UI components that might be complex or have their own tests
jest.mock('@/components/ui/tabs', () => ({
  Tabs: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  TabsList: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  TabsTrigger: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  TabsContent: ({ children, ...props }: any) => <div {...props}>{children}</div>,
}));
jest.mock('@/components/ui/switch', () => ({
  Switch: (props: any) => <input type="checkbox" {...props} />,
}));


describe('ProfilePage', () => {
  it('renders the main heading and tabs', () => {
    render(<ProfilePage />);
    expect(screen.getByRole('heading', { name: /Account Settings/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Profile Details/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Security/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Notifications/i })).toBeInTheDocument();
  });
});
