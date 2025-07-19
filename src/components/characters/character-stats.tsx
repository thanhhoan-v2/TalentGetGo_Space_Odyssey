import { Box, Card, CardContent, Heading, Text } from '@/components/ui';
import { Person } from '@/schema/swapi';
import { motion } from 'framer-motion';

interface CharacterStatsProps {
  characters: Person[];
  totalCount: number;
  isSearching: boolean;
}

export function CharacterStats({
  characters,
  totalCount,
  isSearching,
}: CharacterStatsProps) {
  if (characters.length === 0 || isSearching) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
    >
      <Card className="bg-card mt-16 border-border">
        <CardContent className="p-8 text-center">
          <Heading size="xl" className="mb-6 text-foreground">
            Galaxy Statistics
          </Heading>
          <div className="gap-6 grid grid-cols-1 md:grid-cols-3">
            <Box>
              <Text className="font-bold text-primary text-3xl">
                {totalCount}
              </Text>
              <Text variant="muted">Total Characters</Text>
            </Box>
            <Box>
              <Text className="font-bold text-secondary text-3xl">
                {characters.filter((c) => c.starships.length > 0).length}
              </Text>
              <Text variant="muted">Starship Pilots</Text>
            </Box>
            <Box>
              <Text className="font-bold text-accent text-3xl">
                {characters.filter((c) => c.vehicles.length > 0).length}
              </Text>
              <Text variant="muted">Vehicle Operators</Text>
            </Box>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
