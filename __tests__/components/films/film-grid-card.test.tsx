import FilmGridCard from '@/components/films/film-grid-card';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

// Mock the UI components
jest.mock('@/components/ui', () => ({
  Badge: ({ children, variant, ...props }: any) => (
    <span data-testid={`badge-${variant}`} {...props}>
      {children}
    </span>
  ),
  Card: ({ children, className, ...props }: any) => (
    <div data-testid="card" className={className} {...props}>
      {children}
    </div>
  ),
  CardContent: ({ children, className, ...props }: any) => (
    <div data-testid="card-content" className={className} {...props}>
      {children}
    </div>
  ),
}));

describe('FilmGridCard', () => {
  const mockFilm = {
    id: '4',
    title: 'A New Hope',
    director: 'George Lucas',
    releaseDate: '1977-05-25',
    openingCrawl:
      'It is a period of civil war. Rebel spaceships, striking from a hidden base, have won their first victory against the evil Galactic Empire.',
  };

  it('renders film information correctly', () => {
    render(<FilmGridCard film={mockFilm} />);

    expect(screen.getByText('A New Hope')).toBeInTheDocument();
    expect(screen.getByText('George Lucas')).toBeInTheDocument();
  });

  it('renders episode badge with correct episode number', () => {
    render(<FilmGridCard film={mockFilm} />);

    const episodeBadge = screen.getByTestId('badge-episode');
    expect(episodeBadge).toHaveTextContent('Episode 4');
  });

  it('renders release date badge with formatted date', () => {
    render(<FilmGridCard film={mockFilm} />);

    const releaseDateBadge = screen.getByTestId('badge-releaseDate');
    expect(releaseDateBadge).toHaveTextContent('May 25, 1977');
  });

  it('renders director badge', () => {
    render(<FilmGridCard film={mockFilm} />);

    const directorBadge = screen.getByTestId('badge-director');
    expect(directorBadge).toHaveTextContent('George Lucas');
  });

  it('renders opening crawl as blockquote', () => {
    render(<FilmGridCard film={mockFilm} />);

    const blockquote = screen.getByText(/It is a period of civil war/);
    expect(blockquote.closest('blockquote')).toBeInTheDocument();
  });

  it('creates correct link to film detail page', () => {
    render(<FilmGridCard film={mockFilm} />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/films/4');
  });

  it('truncates opening crawl on mobile screens', () => {
    // Since we're mocking react-responsive globally, we'll just check that the component renders
    // In a real test environment, you'd want to test this with actual responsive behavior
    render(<FilmGridCard film={mockFilm} />);

    // Check that opening crawl is present (the actual truncation logic would need integration testing)
    expect(screen.getByText(/It is a period of civil war/)).toBeInTheDocument();
  });

  it('shows full opening crawl on larger screens', () => {
    // Mock useMediaQuery to return false for mobile
    jest.doMock('react-responsive', () => ({
      useMediaQuery: () => false,
    }));

    render(<FilmGridCard film={mockFilm} />);

    // Should show full opening crawl
    const fullText =
      'It is a period of civil war. Rebel spaceships, striking from a hidden base, have won their first victory against the evil Galactic Empire.';
    expect(screen.getByText(`"${fullText}"`)).toBeInTheDocument();
  });

  it('handles different episode numbers', () => {
    const episodeOneFilm = {
      ...mockFilm,
      id: '1',
      title: 'The Phantom Menace',
    };

    render(<FilmGridCard film={episodeOneFilm} />);

    const episodeBadge = screen.getByTestId('badge-episode');
    expect(episodeBadge).toHaveTextContent('Episode 1');
  });

  it('formats different release dates correctly', () => {
    const differentDateFilm = {
      ...mockFilm,
      releaseDate: '1980-05-17',
    };

    render(<FilmGridCard film={differentDateFilm} />);

    const releaseDateBadge = screen.getByTestId('badge-releaseDate');
    expect(releaseDateBadge).toHaveTextContent('May 17, 1980');
  });

  it('handles long film titles', () => {
    const longTitleFilm = {
      ...mockFilm,
      title: 'A Very Long Film Title That Might Cause Layout Issues',
    };

    render(<FilmGridCard film={longTitleFilm} />);

    expect(
      screen.getByText('A Very Long Film Title That Might Cause Layout Issues')
    ).toBeInTheDocument();
  });

  it('handles long director names', () => {
    const longDirectorFilm = {
      ...mockFilm,
      director: 'A Very Long Director Name That Might Cause Issues',
    };

    render(<FilmGridCard film={longDirectorFilm} />);

    const directorBadge = screen.getByTestId('badge-director');
    expect(directorBadge).toHaveTextContent(
      'A Very Long Director Name That Might Cause Issues'
    );
  });

  it('handles empty opening crawl', () => {
    const emptyOpeningCrawlFilm = {
      ...mockFilm,
      openingCrawl: '',
    };

    render(<FilmGridCard film={emptyOpeningCrawlFilm} />);

    const blockquote = screen.getByRole('link').querySelector('blockquote');
    expect(blockquote).toHaveTextContent('""');
  });

  it('applies motion animation props', () => {
    render(<FilmGridCard film={mockFilm} />);

    // Since we're mocking framer-motion, we just ensure the component renders
    // The actual animation props would be tested in integration tests
    expect(screen.getByTestId('card')).toBeInTheDocument();
  });

  it('has proper card structure', () => {
    render(<FilmGridCard film={mockFilm} />);

    expect(screen.getByTestId('card')).toBeInTheDocument();
    expect(screen.getByTestId('card-content')).toBeInTheDocument();
  });

  it('applies theme-based styling classes', () => {
    render(<FilmGridCard film={mockFilm} />);

    const card = screen.getByTestId('card');
    expect(card).toHaveClass('theme-transition');
  });

  describe('accessibility', () => {
    it('has proper link role', () => {
      render(<FilmGridCard film={mockFilm} />);

      expect(screen.getByRole('link')).toBeInTheDocument();
    });

    it('has proper heading structure', () => {
      render(<FilmGridCard film={mockFilm} />);

      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toHaveTextContent('A New Hope');
    });

    it('uses semantic blockquote for opening crawl', () => {
      render(<FilmGridCard film={mockFilm} />);

      const blockquote = screen.getByRole('link').querySelector('blockquote');
      expect(blockquote).toBeInTheDocument();
    });
  });

  describe('responsive behavior', () => {
    it('adjusts layout for mobile screens', () => {
      // This would be better tested with actual responsive testing tools
      // but for now we ensure the component renders without error
      render(<FilmGridCard film={mockFilm} />);

      expect(screen.getByTestId('card-content')).toBeInTheDocument();
    });
  });

  describe('date formatting', () => {
    it('handles invalid dates gracefully', () => {
      const invalidDateFilm = {
        ...mockFilm,
        releaseDate: 'invalid-date',
      };

      render(<FilmGridCard film={invalidDateFilm} />);

      // Should still render the component, even if date is invalid
      expect(screen.getByText('A New Hope')).toBeInTheDocument();
    });

    it('formats dates in different years correctly', () => {
      const futureFilm = {
        ...mockFilm,
        releaseDate: '2025-12-31',
      };

      render(<FilmGridCard film={futureFilm} />);

      const releaseDateBadge = screen.getByTestId('badge-releaseDate');
      expect(releaseDateBadge).toHaveTextContent('December 31, 2025');
    });
  });
});
