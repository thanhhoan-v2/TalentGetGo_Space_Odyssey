import { motion } from 'framer-motion';

interface CharacterSearchInfoProps {
  isSearching: boolean;
  searchQuery: string;
  totalCount: number;
  charactersLength: number;
}

export default function CharacterSearchInfo({
  isSearching,
  searchQuery,
  totalCount,
  charactersLength,
}: CharacterSearchInfoProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <div className="mb-8 text-muted-foreground text-center">
        {isSearching ? (
          <>
            Showing results for &ldquo;{searchQuery}&rdquo; ({totalCount}{' '}
            characters found)
          </>
        ) : (
          <>Showing {charactersLength} characters</>
        )}
      </div>
    </motion.div>
  );
}
