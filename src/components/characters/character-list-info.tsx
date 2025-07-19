import { Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';

interface CharacterListInfoProps {
  isSearching: boolean;
  searchQuery: string;
  totalCount: number;
  charactersLength: number;
}

export function CharacterListInfo({
  isSearching,
  searchQuery,
  totalCount,
  charactersLength,
}: CharacterListInfoProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <Text textAlign="center" color="gray.400" mb={8}>
        {isSearching ? (
          <>
            Showing results for &ldquo;{searchQuery}&rdquo; ({totalCount}{' '}
            characters found)
          </>
        ) : (
          <>
            Showing {charactersLength} of {totalCount} characters
          </>
        )}
      </Text>
    </motion.div>
  );
}
