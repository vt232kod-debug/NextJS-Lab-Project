import { render, screen } from '@testing-library/react';
import ArticleLoader from '@/components/ArticleLoader';

describe('ArticleLoader', () => {
  it('renders skeleton placeholder divs', () => {
    const { container } = render(<ArticleLoader />);
    const pulseDiv = container.querySelector('.animate-pulse');
    expect(pulseDiv).toBeInTheDocument();
  });

  it('renders multiple skeleton lines', () => {
    const { container } = render(<ArticleLoader />);
    const skeletonLines = container.querySelectorAll('.bg-gray-200');
    expect(skeletonLines.length).toBeGreaterThanOrEqual(5);
  });
});
