import { CharacterCard } from '@/components/card/character-card';
import { CharacterCardSkeleton } from '@/components/characters/character-card-skeleton';
import { Person } from '@/schema/swapi';
import { motion } from 'framer-motion';

interface CharacterGridProps {
  characters: Person[];
  loading: boolean;
}

export function CharacterGrid({ characters, loading }: CharacterGridProps) {
  if (loading) {
    return (
      <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-8">
        {Array.from({ length: 8 }).map((_, index) => (
          <CharacterCardSkeleton key={index} />
        ))}
      </div>
    );
  }

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
              characterUrl={character.url}
              characterName={character.name}
              index={index % 12} // Reset animation delay every 12 items
            />
          ))}
        </div>
      </motion.div>
    );
  }

  return (
    <div className="py-12 text-center">
      <p className="text-muted-foreground text-lg">
        No characters available at the moment.
      </p>
    </div>
  );
}
