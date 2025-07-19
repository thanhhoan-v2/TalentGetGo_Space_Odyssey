import { Box, Card, CardContent, Heading, Text } from '@/components/ui';
import { cn } from '@/lib/utils';
import { Film } from '@/schema/swapi';
import { motion } from 'framer-motion';

interface FilmsStatsProps {
  films: Film[];
}

export function FilmsStats({ films }: FilmsStatsProps) {
  if (!films || films.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card
        className={cn(
          'border-border bg-card/50 backdrop-blur-sm theme-transition',
          'card-glow' // Apply theme-specific effects
        )}
      >
        <CardContent className="p-8 text-center">
          <Heading size="xl" className="mb-4 text-foreground">
            Film Collection Stats
          </Heading>
          <div className="gap-6 grid grid-cols-1 md:grid-cols-3">
            <Box>
              <Text
                size="xl"
                variant="primary"
                weight="bold"
                className="text-3xl"
              >
                {films.length}
              </Text>
              <Text variant="muted">Total Films</Text>
            </Box>
            <Box>
              <Text
                size="xl"
                variant="secondary"
                weight="bold"
                className="text-3xl"
              >
                {new Set(films.map((f) => f.director)).size}
              </Text>
              <Text variant="muted">Directors</Text>
            </Box>
            <Box>
              <Text
                size="xl"
                variant="accent"
                weight="bold"
                className="text-3xl"
              >
                {Math.max(...films.map((f) => f.episode_id)) -
                  Math.min(...films.map((f) => f.episode_id)) +
                  1}
              </Text>
              <Text variant="muted">Episode Range</Text>
            </Box>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
