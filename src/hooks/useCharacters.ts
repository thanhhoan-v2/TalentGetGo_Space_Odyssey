import { Person } from '@/schema/swapi';
import {
  convertSwapiTechToPerson,
  fetchAllCharacters,
  fetchCharacters,
} from '@/utils/swapi-api';
import { useCallback, useEffect, useRef, useState } from 'react';

interface UseCharactersProps {
  initialCharacters: Person[];
  initialCount: number;
}

export function useCharacters({
  initialCharacters,
  initialCount,
}: UseCharactersProps) {
  const [characters, setCharacters] = useState<Person[]>(
    initialCharacters || []
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [totalCount, setTotalCount] = useState(initialCount || 82);
  const [isSearching, setIsSearching] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [isPreloading, setIsPreloading] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Pre-fetch all characters on mount for faster search
  useEffect(() => {
    const preloadCharacters = async () => {
      setIsPreloading(true);
      try {
        // This will cache all characters for 5 minutes
        await fetchAllCharacters();
      } catch (error) {
        console.error('Failed to preload characters:', error);
      } finally {
        setIsPreloading(false);
      }
    };

    // Start preloading after a short delay to not block initial render
    const timer = setTimeout(preloadCharacters, 500);
    return () => clearTimeout(timer);
  }, []);

  // Initialize hasMore based on initial data
  useEffect(() => {
    if (initialCharacters && initialCharacters.length > 0) {
      setHasMore(currentPage < Math.ceil((initialCount || 82) / 10));
    } else {
      // Load initial data if not provided
      const loadInitialData = async () => {
        try {
          const result = await fetchCharacters(1);
          const swapiCharacters = result.characters.map(
            convertSwapiTechToPerson
          );

          setCharacters(swapiCharacters);
          setTotalCount(result.totalRecords);
          setTotalPages(result.totalPages);
          setHasMore(result.hasNext);
        } catch (error) {
          console.error('Failed to load initial data:', error);
        }
      };
      loadInitialData();
    }
  }, [initialCharacters, initialCount, currentPage]);

  // Search functionality with better loading states
  const handleSearch = useCallback(
    async (query: string, page: number = 1) => {
      // Don't show loading state for empty searches when we have initial data
      if (!query && page === 1 && initialCharacters.length > 0) {
        setCharacters(initialCharacters);
        setTotalCount(initialCount);
        setHasMore(true);
        setCurrentPage(1);
        setIsSearching(false);
        return;
      }

      setLoading(true);
      setIsSearching(!!query);

      try {
        const result = await fetchCharacters(page, query);
        const swapiCharacters = result.characters.map(convertSwapiTechToPerson);

        if (page === 1) {
          setCharacters(swapiCharacters);
        } else {
          setCharacters((prev) => [...prev, ...swapiCharacters]);
        }

        setTotalCount(result.totalRecords);
        setTotalPages(result.totalPages);
        setHasMore(result.hasNext);
        setCurrentPage(page);
      } catch (error) {
        console.error('Error fetching characters:', error);
        if (page === 1) {
          setCharacters([]);
          setTotalCount(0);
          setHasMore(false);
        }
      } finally {
        setLoading(false);
      }
    },
    [initialCharacters, initialCount]
  );

  // Load more functionality
  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      handleSearch(searchQuery, currentPage + 1);
    }
  }, [loading, hasMore, searchQuery, currentPage, handleSearch]);

  // Search input handler with improved debouncing
  useEffect(() => {
    // Clear any existing timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Don't search if query is empty and we have initial data
    if (!searchQuery && initialCharacters.length > 0) {
      setCharacters(initialCharacters);
      setTotalCount(initialCount);
      setHasMore(true);
      setCurrentPage(1);
      setIsSearching(false);
      return;
    }

    // Set up new timeout with longer delay for better performance
    searchTimeoutRef.current = setTimeout(() => {
      setCurrentPage(1);
      handleSearch(searchQuery, 1);
    }, 300); // Increased from 100ms to 300ms

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchQuery, handleSearch, initialCharacters, initialCount]);

  // Clear search
  const clearSearch = useCallback(() => {
    setSearchQuery('');
  }, []);

  return {
    characters,
    searchQuery,
    setSearchQuery,
    loading: loading || (isSearching && isPreloading),
    hasMore,
    totalCount,
    isSearching,
    loadMore,
    clearSearch,
  };
}
