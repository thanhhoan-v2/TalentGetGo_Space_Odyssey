import { useEffect } from 'react';

interface UseInfiniteScrollProps {
  loadMore: () => void;
  hasMore: boolean;
  loading: boolean;
}

export function useInfiniteScroll({
  loadMore,
  hasMore,
  loading,
}: UseInfiniteScrollProps) {
  useEffect(() => {
    const handleScroll = () => {
      if (loading || !hasMore) return;

      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 1000
      ) {
        loadMore();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMore, hasMore, loading]);
}
