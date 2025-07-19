import { CharacterCard } from '@/components/characters/character-card';
import { CharacterCardSkeleton } from '@/components/characters/character-card-skeleton';
import { Person } from '@/schema/swapi';
import { Box, Grid, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';

interface CharacterGridProps {
  characters: Person[];
  loading: boolean;
}

export function CharacterGrid({ characters, loading }: CharacterGridProps) {
  // Loading state with skeletons
  if (loading && characters.length === 0) {
    return (
      <Grid
        templateColumns={{
          base: '1fr',
          md: 'repeat(2, 1fr)',
          lg: 'repeat(3, 1fr)',
          xl: 'repeat(4, 1fr)',
        }}
        gap={6}
        mb={8}
      >
        {Array.from({ length: 8 }).map((_, index) => (
          <CharacterCardSkeleton key={index} />
        ))}
      </Grid>
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
        <Grid
          templateColumns={{
            base: '1fr',
            md: 'repeat(2, 1fr)',
            lg: 'repeat(3, 1fr)',
            xl: 'repeat(4, 1fr)',
          }}
          gap={6}
          mb={8}
        >
          {characters.map((character, index) => (
            <CharacterCard
              key={character.url}
              character={character}
              index={index % 12} // Reset animation delay every 12 items
            />
          ))}
        </Grid>
      </motion.div>
    );
  }

  // Empty state
  return (
    <Box textAlign="center" py={12}>
      <Text color="gray.400" fontSize="lg">
        No characters available at the moment.
      </Text>
    </Box>
  );
}
