import {
  CharacterGridCard,
  CharacterGridCardSkeleton,
} from '@/components/characters';
import { cn } from '@/lib/utils';
import { Person } from '@/utils/swapi';
import { motion } from 'framer-motion';

interface CharacterGridProps {
  characters: Person[];
  loading: boolean;
}

export default function CharacterGrid({
  characters,
  loading,
}: CharacterGridProps) {
  function getGridClasses(count: number) {
    if (count === 1) {
      return 'grid-cols-1';
    } else if (count === 2) {
      return 'grid-cols-1 md:grid-cols-2';
    } else if (count === 3) {
      return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
    } else if (count >= 4) {
      return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
    }
    return 'grid-cols-1'; // fallback
  }

  if (loading && characters.length === 0) {
    return (
      <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-8">
        {Array.from({ length: 8 }).map((_, index) => (
          <CharacterGridCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (characters && characters.length > 0) {
    const gridClasses = getGridClasses(characters.length);

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <div className={cn('gap-6 grid mb-8', gridClasses)}>
          {characters.map((character, index) => (
            <CharacterGridCard
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
