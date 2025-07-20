import { CharacterCard } from '@/components/card/character-card';
import { CharacterCardSkeleton } from '@/components/characters/character-card-skeleton';
import { Box, Text } from '@/components/ui';
import { Person } from '@/schema/swapi';
import { motion } from 'framer-motion';

interface CharacterGridProps {
  characters: Person[];
  loading: boolean;
}

export function CharacterGrid({ characters, loading }: CharacterGridProps) {
  // Loading state with skeletons
  if (loading && characters.length === 0) {
    return (
      <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-8">
        {Array.from({ length: 8 }).map((_, index) => (
          <CharacterCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  // Characters grid
  if (characters && characters.length > 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-8">
          {characters.map((character, index) => (
            <CharacterCard
              key={character.url}
              character={character}
              index={index % 12} // Reset animation delay every 12 items
            />
          ))}
        </div>
      </motion.div>
    );
  }

  // Empty state
  return (
    <Box className="py-12 text-center">
      <Text variant="muted" size="lg">
        No characters available at the moment.
      </Text>
    </Box>
  );
}
