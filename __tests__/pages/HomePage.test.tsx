import { render, screen } from '@testing-library/react';
import HomePage from '@/app/(home)/page';

// Mock next/link
jest.mock('next/link', () => {
  return ({ children, href, ...props }: { children: React.ReactNode; href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  );
});

describe('HomePage', () => {
  it('renders the main heading', () => {
    render(<HomePage />);
    expect(screen.getByText('Articles Hub')).toBeInTheDocument();
  });

  it('renders the description text', () => {
    render(<HomePage />);
    expect(
      screen.getByText(/Browse, create, and manage your favorite articles/)
    ).toBeInTheDocument();
  });

  it('renders Browse Articles link', () => {
    render(<HomePage />);
    const browseLink = screen.getByText('Browse Articles');
    expect(browseLink).toBeInTheDocument();
    expect(browseLink.closest('a')).toHaveAttribute('href', '/articles');
  });

  it('renders Create Article link', () => {
    render(<HomePage />);
    const createLink = screen.getByText('Create Article');
    expect(createLink).toBeInTheDocument();
    expect(createLink.closest('a')).toHaveAttribute('href', '/articles/create');
  });
});
