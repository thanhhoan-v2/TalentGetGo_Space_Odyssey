import { Box, Button, Heading, Text, VStack } from '@chakra-ui/react';
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
        <VStack py={8}>
          <Box
            w={8}
            h={8}
            border="2px solid"
            borderColor="gray.600"
            borderTopColor="yellow.400"
            borderRadius="full"
            animation="spin 1s linear infinite"
          />
          <Text color="gray.400">Loading more characters...</Text>
        </VStack>
      )}

      {/* Load More Button */}
      {!loading && hasMore && charactersLength > 0 && (
        <Box textAlign="center">
          <Button
            onClick={onLoadMore}
            size="lg"
            bgGradient="linear(to-r, blue.600, blue.700)"
            color="black"
            _hover={{
              bgGradient: 'linear(to-r, blue.700, blue.800)',
              transform: 'translateY(-2px)',
            }}
            transition="all 0.2s ease"
          >
            Load More Characters
          </Button>
        </Box>
      )}

      {/* No More Results */}
      {!loading && !hasMore && charactersLength > 0 && (
        <Box textAlign="center" py={8}>
          <Text color="gray.400">
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
          <VStack py={16} textAlign="center">
            <Text fontSize="6xl" mb={4}>
              🔍
            </Text>
            <Heading size="xl" color="white" mb={2}>
              No Characters Found
            </Heading>
            <Text color="gray.400" mb={6}>
              No characters match your search for &ldquo;{searchQuery}
              &rdquo;
            </Text>
            <Button
              onClick={onClearSearch}
              colorScheme="yellow"
              variant="solid"
              size="lg"
            >
              Clear Search
            </Button>
          </VStack>
        </motion.div>
      )}
    </>
  );
}
