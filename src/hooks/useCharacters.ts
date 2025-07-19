import { Person } from '@/schema/swapi';
import { convertSwapiTechToPerson, fetchCharacters } from '@/utils/swapi-api';
import { useCallback, useEffect, useState } from 'react';

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

  // Search functionality
  const handleSearch = useCallback(async (query: string, page: number = 1) => {
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
  }, []);

  // Load more functionality
  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      handleSearch(searchQuery, currentPage + 1);
    }
  }, [loading, hasMore, searchQuery, currentPage, handleSearch]);

  // Search input handler with debouncing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setCurrentPage(1);
      handleSearch(searchQuery, 1);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, handleSearch]);

  // Clear search
  const clearSearch = useCallback(() => {
    setSearchQuery('');
  }, []);

  return {
    characters,
    searchQuery,
    setSearchQuery,
    loading,
    hasMore,
    totalCount,
    isSearching,
    loadMore,
    clearSearch,
  };
}
