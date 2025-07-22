import { CardCarousel } from '@/components/ui/card-carousel';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

// Mock the CharacterGridCard component
jest.mock('@/components/characters', () => ({
  CharacterGridCard: ({
    characterName,
    characterUrl,
    imageHeight,
    imageWidth,
  }: any) => (
    <div data-testid="character-card">
      <span data-testid="character-name">{characterName}</span>
      <span data-testid="character-url">{characterUrl}</span>
      <span data-testid="image-height">{imageHeight}</span>
      <span data-testid="image-width">{imageWidth}</span>
    </div>
  ),
}));

describe('CardCarousel', () => {
  const mockCharacters = [
    { url: '/characters/1', name: 'Luke Skywalker' },
    { url: '/characters/4', name: 'Darth Vader' },
    { url: '/characters/5', name: 'Leia Organa' },
  ];

  it('renders without crashing', () => {
    render(<CardCarousel characters={mockCharacters} />);

    expect(screen.getByTestId('swiper')).toBeInTheDocument();
  });

  it('renders all characters', () => {
    render(<CardCarousel characters={mockCharacters} />);

    // Each character appears twice in the carousel (duplicated for infinite scroll)
    expect(screen.getAllByText('Luke Skywalker')).toHaveLength(2);
    expect(screen.getAllByText('Darth Vader')).toHaveLength(2);
    expect(screen.getAllByText('Leia Organa')).toHaveLength(2);
  });

  it('passes correct props to CharacterGridCard', () => {
    render(<CardCarousel characters={mockCharacters} />);

    const characterCards = screen.getAllByTestId('character-card');
    expect(characterCards).toHaveLength(6); // 3 characters × 2 duplicates

    // Check first character card props
    expect(screen.getAllByTestId('character-name')[0]).toHaveTextContent(
      'Luke Skywalker'
    );
    expect(screen.getAllByTestId('character-url')[0]).toHaveTextContent(
      '/characters/1'
    );
    expect(screen.getAllByTestId('image-height')[0]).toHaveTextContent(
      'h-[500px]'
    );
    expect(screen.getAllByTestId('image-width')[0]).toHaveTextContent(
      'w-[300px]'
    );
  });

  it('renders swiper slides for each character', () => {
    render(<CardCarousel characters={mockCharacters} />);

    const swiperSlides = screen.getAllByTestId('swiper-slide');
    expect(swiperSlides).toHaveLength(6); // 3 characters × 2 duplicates
  });

  it('applies custom autoplay delay', () => {
    render(<CardCarousel characters={mockCharacters} autoplayDelay={3000} />);

    // Since we're mocking Swiper, we just ensure it renders without error
    expect(screen.getByTestId('swiper')).toBeInTheDocument();
  });

  it('handles showPagination prop', () => {
    render(<CardCarousel characters={mockCharacters} showPagination={false} />);

    expect(screen.getByTestId('swiper')).toBeInTheDocument();
  });

  it('handles showNavigation prop', () => {
    render(<CardCarousel characters={mockCharacters} showNavigation={false} />);

    expect(screen.getByTestId('swiper')).toBeInTheDocument();
  });

  it('renders with default props', () => {
    render(<CardCarousel characters={mockCharacters} />);

    expect(screen.getByTestId('swiper')).toBeInTheDocument();
    expect(screen.getAllByTestId('character-card')).toHaveLength(6);
  });

  it('handles empty characters array', () => {
    render(<CardCarousel characters={[]} />);

    expect(screen.getByTestId('swiper')).toBeInTheDocument();
    expect(screen.queryAllByTestId('character-card')).toHaveLength(0);
  });

  it('renders with single character', () => {
    const singleCharacter = [{ url: '/characters/1', name: 'Luke Skywalker' }];
    render(<CardCarousel characters={singleCharacter} />);

    expect(screen.getByTestId('swiper')).toBeInTheDocument();
    expect(screen.getAllByText('Luke Skywalker')).toHaveLength(2); // Duplicated
  });

  it('includes custom CSS styles', () => {
    const { container } = render(<CardCarousel characters={mockCharacters} />);

    // Check if style tag is present
    const styleTag = container.querySelector('style');
    expect(styleTag).toBeInTheDocument();
    expect(styleTag?.textContent).toContain('.swiper');
    expect(styleTag?.textContent).toContain('width: 100%');
  });

  it('has proper section structure', () => {
    render(<CardCarousel characters={mockCharacters} />);

    const section = document.querySelector('section');
    expect(section).toBeInTheDocument();
    expect(section).toHaveClass('w-ace-y-4');
  });

  it('renders with proper container classes', () => {
    const { container } = render(<CardCarousel characters={mockCharacters} />);

    const maxWidthContainer = container.querySelector('.max-w-7xl');
    expect(maxWidthContainer).toBeInTheDocument();
    expect(maxWidthContainer).toHaveClass('mx-auto', 'p-2', 'w-full');
  });

  describe('character data handling', () => {
    it('handles characters with special characters in names', () => {
      const specialCharacters = [
        { url: '/characters/1', name: 'C-3PO' },
        { url: '/characters/2', name: 'R2-D2' },
      ];

      render(<CardCarousel characters={specialCharacters} />);

      expect(screen.getAllByText('C-3PO')).toHaveLength(2);
      expect(screen.getAllByText('R2-D2')).toHaveLength(2);
    });

    it('handles characters with long names', () => {
      const longNameCharacters = [
        {
          url: '/characters/1',
          name: 'A Very Long Character Name That Might Cause Issues',
        },
      ];

      render(<CardCarousel characters={longNameCharacters} />);

      expect(
        screen.getAllByText(
          'A Very Long Character Name That Might Cause Issues'
        )
      ).toHaveLength(2);
    });
  });
});
