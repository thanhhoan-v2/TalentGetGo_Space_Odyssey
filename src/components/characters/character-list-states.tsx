import { Box, Button, Heading, Text, VStack } from '@/components/ui';
import { motion } from 'framer-motion';

interface CharacterListStatesProps {
  loading: boolean;
  hasMore: boolean;
  charactersLength: number;
  isSearching: boolean;
  searchQuery: string;
  onLoadMore: () => void;
  onClearSearch: () => void;
}

export function CharacterListStates({
  loading,
  hasMore,
  charactersLength,
  isSearching,
  searchQuery,
  onLoadMore,
  onClearSearch,
}: CharacterListStatesProps) {
  return (
    <>
      {/* Loading State */}
      {loading && charactersLength > 0 && (
        <VStack gap="md" className="py-8">
          <Box className="border-2 border-muted border-t-secondary rounded-full w-8 h-8 animate-spin" />
          <Text variant="muted">Loading more characters...</Text>
        </VStack>
      )}

      {/* Load More Button */}
      {!loading && hasMore && charactersLength > 0 && (
        <Box className="text-center">
          <Button
            onClick={onLoadMore}
            size="lg"
            className="bg-gradient-to-r from-secondary hover:from-secondary/80 to-secondary/80 hover:to-secondary/60 text-white transition-all hover:-translate-y-0.5 duration-200"
          >
            Load More Characters
          </Button>
        </Box>
      )}

      {/* No More Results */}
      {!loading && !hasMore && charactersLength > 0 && (
        <Box className="py-8 text-center">
          <Text variant="muted">
            {isSearching
              ? 'No more search results'
              : "You've seen all characters in the galaxy!"}
          </Text>
        </Box>
      )}

      {/* No Results */}
      {!loading && charactersLength === 0 && isSearching && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <VStack gap="md" className="py-16 text-center">
            <Text className="mb-4 text-6xl">🔍</Text>
            <Heading size="xl" className="mb-2 text-foreground">
              No Characters Found
            </Heading>
            <Text variant="muted" className="mb-6">
              No characters match your search for &ldquo;{searchQuery}
              &rdquo;
            </Text>
            <Button
              onClick={onClearSearch}
              variant="default"
              size="lg"
              className="bg-primary hover:bg-primary/90"
            >
              Clear Search
            </Button>
          </VStack>
        </motion.div>
      )}
    </>
  );
}
