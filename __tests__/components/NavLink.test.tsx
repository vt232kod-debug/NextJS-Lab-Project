import { render, screen } from '@testing-library/react';
import NavLink from '@/components/NavLink';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

import { usePathname } from 'next/navigation';

const mockedUsePathname = usePathname as jest.MockedFunction<typeof usePathname>;

describe('NavLink', () => {
  it('renders a link with children', () => {
    mockedUsePathname.mockReturnValue('/');
    render(<NavLink href="/articles">Articles</NavLink>);
    expect(screen.getByText('Articles')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', '/articles');
  });

  it('applies active class when pathname matches (non-exact)', () => {
    mockedUsePathname.mockReturnValue('/articles/123');
    render(
      <NavLink href="/articles" className="nav" activeClassName="highlighted">
        Articles
      </NavLink>
    );
    const link = screen.getByRole('link');
    expect(link).toHaveClass('active');
    expect(link).toHaveClass('highlighted');
    expect(link).toHaveAttribute('aria-current', 'page');
  });

  it('does not apply active class when pathname does not match', () => {
    mockedUsePathname.mockReturnValue('/profile');
    render(
      <NavLink href="/articles" className="nav" activeClassName="highlighted">
        Articles
      </NavLink>
    );
    const link = screen.getByRole('link');
    expect(link).not.toHaveClass('active');
    expect(link).not.toHaveAttribute('aria-current');
  });

  it('uses exact matching when exact prop is true', () => {
    mockedUsePathname.mockReturnValue('/articles/123');
    render(
      <NavLink href="/articles" exact>
        Articles
      </NavLink>
    );
    const link = screen.getByRole('link');
    expect(link).not.toHaveClass('active');
  });

  it('matches exactly when exact=true and path is identical', () => {
    mockedUsePathname.mockReturnValue('/articles');
    render(
      <NavLink href="/articles" exact>
        Articles
      </NavLink>
    );
    const link = screen.getByRole('link');
    expect(link).toHaveClass('active');
  });
});
