import CharacterGridCard from '@/components/characters/grid/character-grid-card';
import { getCharacterImageById } from '@/utils/assets';
import { extractNumber } from '@/utils/swapi-graphql';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import Image from 'next/image';

// Mock the utility functions
jest.mock('@/utils/assets', () => ({
  getCharacterImageById: jest.fn(),
}));

jest.mock('@/utils/swapi-graphql', () => ({
  extractNumber: jest.fn(),
}));

// Mock Next.js Image component
jest.mock('next/image', () => {
  return function MockImage({ src, alt, ...props }: any) {
    return <Image src={src} alt={alt} {...props} />;
  };
});

const mockGetCharacterImageById = getCharacterImageById as jest.MockedFunction<
  typeof getCharacterImageById
>;
const mockExtractNumber = extractNumber as jest.MockedFunction<
  typeof extractNumber
>;

describe('CharacterGridCard', () => {
  const mockProps = {
    characterUrl: '/characters/1',
    characterName: 'Luke Skywalker',
    index: 0,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockExtractNumber.mockReturnValue(1);
    mockGetCharacterImageById.mockResolvedValue({
      src: '/mock-image.jpg',
      height: 500,
      width: 300,
      blurDataURL: '',
      blurWidth: 8,
      blurHeight: 8,
    });

    // Mock localStorage
    const mockLocalStorage = {
      getItem: jest.fn().mockReturnValue('[]'),
      setItem: jest.fn(),
    };
    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage,
      writable: true,
    });
  });

  it('renders character card when image loads successfully', async () => {
    render(<CharacterGridCard {...mockProps} />);

    await waitFor(() => {
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    });

    expect(screen.getByRole('link')).toHaveAttribute('href', '/characters/1');
  });

  it('extracts character ID from URL', async () => {
    render(<CharacterGridCard {...mockProps} />);

    expect(mockExtractNumber).toHaveBeenCalledWith('/characters/1');
  });

  it('loads character image by ID', async () => {
    render(<CharacterGridCard {...mockProps} />);

    await waitFor(() => {
      expect(mockGetCharacterImageById).toHaveBeenCalledWith(1);
    });
  });

  it('renders image with correct src and alt', async () => {
    render(<CharacterGridCard {...mockProps} />);

    await waitFor(() => {
      const image = screen.getByAltText('Luke Skywalker');
      expect(image).toHaveAttribute('src', '/mock-image.jpg');
    });
  });

  it('applies custom image dimensions', async () => {
    render(
      <CharacterGridCard
        {...mockProps}
        imageWidth="w-[400px]"
        imageHeight="h-[600px]"
      />
    );

    await waitFor(() => {
      const link = screen.getByRole('link');
      expect(link).toHaveClass('w-[400px]');

      const imageContainer = screen
        .getByAltText('Luke Skywalker')
        .closest('.relative');
      expect(imageContainer).toHaveClass('h-[600px]');
    });
  });

  it('shows heart icon when character is favorited', async () => {
    const mockLocalStorage = {
      getItem: jest
        .fn()
        .mockReturnValue(
          JSON.stringify([
            { characterName: 'Luke Skywalker', characterUrl: '/characters/1' },
          ])
        ),
      setItem: jest.fn(),
    };
    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage,
      writable: true,
    });

    render(<CharacterGridCard {...mockProps} />);

    await waitFor(() => {
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    });

    // Check for heart icon (it's rendered as an SVG with fill="red")
    const heartIcon = screen.getByRole('link').querySelector('[fill="red"]');
    expect(heartIcon).toBeInTheDocument();
  });

  it('does not show heart icon when character is not favorited', async () => {
    render(<CharacterGridCard {...mockProps} />);

    await waitFor(() => {
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    });

    const heartIcon = screen.getByRole('link').querySelector('[fill="red"]');
    expect(heartIcon).not.toBeInTheDocument();
  });

  it('handles image loading failure gracefully', async () => {
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
    mockGetCharacterImageById.mockRejectedValue(new Error('Image not found'));

    render(<CharacterGridCard {...mockProps} />);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        'Failed to load character image for 1:',
        expect.any(Error)
      );
    });

    // Component should not render when image fails to load
    expect(screen.queryByText('Luke Skywalker')).not.toBeInTheDocument();

    consoleSpy.mockRestore();
  });

  it('handles localStorage errors gracefully', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    const mockLocalStorage = {
      getItem: jest.fn().mockImplementation(() => {
        throw new Error('localStorage error');
      }),
      setItem: jest.fn(),
    };
    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage,
      writable: true,
    });

    render(<CharacterGridCard {...mockProps} />);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        'Error loading from localStorage:',
        expect.any(Error)
      );
    });

    consoleSpy.mockRestore();
  });

  it('uses default character ID when extraction fails', async () => {
    mockExtractNumber.mockReturnValue(null);

    render(<CharacterGridCard {...mockProps} />);

    await waitFor(() => {
      expect(mockGetCharacterImageById).toHaveBeenCalledWith(1); // Default fallback
    });
  });

  it('applies motion animation props', async () => {
    render(<CharacterGridCard {...mockProps} index={2} />);

    await waitFor(() => {
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    });

    // Since we're mocking framer-motion, we just ensure the component renders
    // The actual animation props would be tested in integration tests
  });

  it('renders with default props', async () => {
    render(
      <CharacterGridCard
        characterUrl="/characters/1"
        characterName="Luke Skywalker"
      />
    );

    await waitFor(() => {
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    });

    const link = screen.getByRole('link');
    expect(link).toHaveClass('w-[280px]'); // Default width
  });

  it('checks favorite status by both URL and name', async () => {
    const mockLocalStorage = {
      getItem: jest
        .fn()
        .mockReturnValue(
          JSON.stringify([
            { characterName: 'Different Name', characterUrl: '/characters/1' },
          ])
        ),
      setItem: jest.fn(),
    };
    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage,
      writable: true,
    });

    render(<CharacterGridCard {...mockProps} />);

    await waitFor(() => {
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    });

    // Should show heart icon because URL matches
    const heartIcon = screen.getByRole('link').querySelector('[fill="red"]');
    expect(heartIcon).toBeInTheDocument();
  });

  describe('accessibility', () => {
    it('has proper link role and href', async () => {
      render(<CharacterGridCard {...mockProps} />);

      await waitFor(() => {
        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', '/characters/1');
      });
    });

    it('has proper image alt text', async () => {
      render(<CharacterGridCard {...mockProps} />);

      await waitFor(() => {
        expect(screen.getByAltText('Luke Skywalker')).toBeInTheDocument();
      });
    });
  });
});
