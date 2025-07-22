import { Button } from '@/components/ui';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface CharacterSearchStatesProps {
  loading: boolean;
  hasMore: boolean;
  charactersLength: number;
  isSearching: boolean;
  searchQuery: string;
  onLoadMore: () => void;
  onClearSearch: () => void;
}

export default function CharacterSearchStates({
  loading,
  hasMore,
  charactersLength,
  isSearching,
  searchQuery,
  onClearSearch,
}: CharacterSearchStatesProps) {
  return (
    <>
      {/* Loading State */}
      {loading && charactersLength > 0 && (
        <div className="flex flex-col items-center gap-2 mx-auto mt-[100px] py-8">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      )}

      {/* No More Results */}
      {!loading && !hasMore && charactersLength > 0 && (
        <div className="py-8 text-center">
          <div className="text-muted">
            {isSearching
              ? 'No more search results'
              : "You've seen all characters in the galaxy!"}
          </div>
        </div>
      )}

      {/* No Results */}
      {!loading && charactersLength === 0 && isSearching && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="py-16 text-center">
            <div className="mb-4 text-6xl">🔍</div>
            <div className="mb-2 text-foreground">No Characters Found</div>
            <div className="mb-6">
              No characters match your search for &ldquo;{searchQuery}
              &rdquo;
            </div>
            <Button
              onClick={onClearSearch}
              variant="default"
              size="lg"
              className="bg-primary hover:bg-primary/90"
            >
              Clear Search
            </Button>
          </div>
        </motion.div>
      )}
    </>
  );
}
