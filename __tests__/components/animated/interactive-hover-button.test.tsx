import InteractiveHoverButton from '@/components/animated/interactive-hover-button';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

// Mock localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

describe('InteractiveHoverButton', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockLocalStorage.getItem.mockReturnValue(null);
  });

  describe('when used as a navigation button', () => {
    it('renders as a link when href is provided', () => {
      render(
        <InteractiveHoverButton href="/films">Films</InteractiveHoverButton>
      );

      const link = screen.getByRole('link');
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/films');
    });

    it('displays "Explore" text for films route', () => {
      render(
        <InteractiveHoverButton href="/films">Films</InteractiveHoverButton>
      );

      expect(screen.getByText(/Explore/)).toBeInTheDocument();
      expect(screen.getAllByText(/Films/)).toHaveLength(2); // Text appears twice due to hover effect
    });

    it('displays "Meet" text for characters route', () => {
      render(
        <InteractiveHoverButton href="/characters">
          Characters
        </InteractiveHoverButton>
      );

      expect(screen.getByText(/Meet/)).toBeInTheDocument();
      expect(screen.getAllByText(/Characters/)).toHaveLength(2); // Text appears twice due to hover effect
    });

    it('applies custom className', () => {
      render(
        <InteractiveHoverButton href="/films" className="custom-class">
          Films
        </InteractiveHoverButton>
      );

      const link = screen.getByRole('link');
      expect(link).toHaveClass('custom-class');
    });
  });

  describe('when used as a favorite button', () => {
    it('renders as a clickable div when no href is provided', () => {
      render(
        <InteractiveHoverButton
          characterName="Luke Skywalker"
          characterUrl="/characters/1"
        >
          Add to Favorites
        </InteractiveHoverButton>
      );

      const clickableDiv = screen
        .getByText('Add to favorites')
        .closest('div[class*="cursor-pointer"]');
      expect(clickableDiv).toBeInTheDocument();
      expect(clickableDiv).toHaveClass('cursor-pointer');
    });

    it('displays "Add to favorites" text when character is not favorited', () => {
      mockLocalStorage.getItem.mockReturnValue('[]');

      render(
        <InteractiveHoverButton
          characterName="Luke Skywalker"
          characterUrl="/characters/1"
        >
          Add to Favorites
        </InteractiveHoverButton>
      );

      expect(screen.getByText('Add to favorites')).toBeInTheDocument();
    });

    it('displays "Remove from favorites" text when character is already favorited', () => {
      const existingFavorites = JSON.stringify([
        { characterName: 'Luke Skywalker', characterUrl: '/characters/1' },
      ]);
      mockLocalStorage.getItem.mockReturnValue(existingFavorites);

      render(
        <InteractiveHoverButton
          characterName="Luke Skywalker"
          characterUrl="/characters/1"
        >
          Add to Favorites
        </InteractiveHoverButton>
      );

      expect(screen.getByText('Remove from favorites')).toBeInTheDocument();
    });

    it('adds character to favorites when clicked and not already favorited', () => {
      mockLocalStorage.getItem.mockReturnValue('[]');

      render(
        <InteractiveHoverButton
          characterName="Luke Skywalker"
          characterUrl="/characters/1"
        >
          Add to Favorites
        </InteractiveHoverButton>
      );

      const clickableDiv = screen
        .getByText('Add to favorites')
        .closest('div[class*="cursor-pointer"]');
      fireEvent.click(clickableDiv!);

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        'favoriteCharacters',
        JSON.stringify([
          { characterName: 'Luke Skywalker', characterUrl: '/characters/1' },
        ])
      );
    });

    it('removes character from favorites when clicked and already favorited', () => {
      const existingFavorites = JSON.stringify([
        { characterName: 'Luke Skywalker', characterUrl: '/characters/1' },
        { characterName: 'Darth Vader', characterUrl: '/characters/4' },
      ]);
      mockLocalStorage.getItem.mockReturnValue(existingFavorites);

      render(
        <InteractiveHoverButton
          characterName="Luke Skywalker"
          characterUrl="/characters/1"
        >
          Add to Favorites
        </InteractiveHoverButton>
      );

      const clickableDiv = screen
        .getByText('Remove from favorites')
        .closest('div[class*="cursor-pointer"]');
      fireEvent.click(clickableDiv!);

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        'favoriteCharacters',
        JSON.stringify([
          { characterName: 'Darth Vader', characterUrl: '/characters/4' },
        ])
      );
    });

    it('handles localStorage errors gracefully', () => {
      mockLocalStorage.getItem.mockImplementation(() => {
        throw new Error('localStorage error');
      });

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      render(
        <InteractiveHoverButton
          characterName="Luke Skywalker"
          characterUrl="/characters/1"
        >
          Add to Favorites
        </InteractiveHoverButton>
      );

      expect(consoleSpy).toHaveBeenCalledWith(
        'Error loading from localStorage:',
        expect.any(Error)
      );
      consoleSpy.mockRestore();
    });

    it('handles invalid JSON in localStorage gracefully', () => {
      mockLocalStorage.getItem.mockReturnValue('invalid json');

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      render(
        <InteractiveHoverButton
          characterName="Luke Skywalker"
          characterUrl="/characters/1"
        >
          Add to Favorites
        </InteractiveHoverButton>
      );

      expect(consoleSpy).toHaveBeenCalledWith(
        'Error loading from localStorage:',
        expect.any(Error)
      );
      consoleSpy.mockRestore();
    });
  });

  describe('accessibility', () => {
    it('has proper clickable div when used as favorite button', () => {
      render(
        <InteractiveHoverButton
          characterName="Luke Skywalker"
          characterUrl="/characters/1"
        >
          Add to Favorites
        </InteractiveHoverButton>
      );

      const clickableDiv = screen
        .getByText('Add to favorites')
        .closest('div[class*="cursor-pointer"]');
      expect(clickableDiv).toBeInTheDocument();
      expect(clickableDiv).toHaveClass('cursor-pointer');
    });

    it('has proper link role when used as navigation', () => {
      render(
        <InteractiveHoverButton href="/films">Films</InteractiveHoverButton>
      );

      expect(screen.getByRole('link')).toBeInTheDocument();
    });
  });
});
