import { Card, CardContent } from '@/components/ui/card';
import { Person } from '@/utils/swapi';
import { motion } from 'framer-motion';

interface CharacterGridStatsProps {
  characters: Person[];
  totalCount: number;
  isSearching: boolean;
}

export default function CharacterGridStats({
  characters,
  totalCount,
  isSearching,
}: CharacterGridStatsProps) {
  if (characters.length === 0 || isSearching) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
    >
      <Card className="bg-card mt-16 border-border">
        <CardContent className="p-8 text-center">
          <h1 className="mb-6 text-foreground">Galaxy Statistics</h1>
          <div className="gap-6 grid grid-cols-1 md:grid-cols-3">
            <div>
              <p className="font-bold text-primary text-3xl">{totalCount}</p>
              <p className="text-muted-foreground">Total Characters</p>
            </div>
            <div>
              <p className="font-bold text-secondary text-3xl">
                {characters.filter((c) => c.starships.length > 0).length}
              </p>
              <p className="text-muted-foreground">Starship Pilots</p>
            </div>
            <div>
              <p className="font-bold text-accent text-3xl">
                {characters.filter((c) => c.vehicles.length > 0).length}
              </p>
              <p className="text-muted-foreground">Vehicle Operators</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
