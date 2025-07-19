import { Card, CardContent, Heading } from '@/components/ui';
import { Planet, Starship } from '@/schema/swapi';
import { motion } from 'framer-motion';

// Planet Card Component
interface PlanetCardProps {
  planet: Planet;
}

export function PlanetCard({ planet }: PlanetCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-card hover:shadow-lg hover:border-accent border-border transition-all hover:-translate-y-0.5 duration-300">
        <CardContent className="p-6">
          <Heading size="md" className="mb-3 text-foreground">
            {planet.name}
          </Heading>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Starship Card Component
interface StarshipCardProps {
  starship: Starship;
}

export function StarshipCard({ starship }: StarshipCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-card hover:shadow-lg hover:border-destructive border-border transition-all hover:-translate-y-0.5 duration-300">
        <CardContent className="p-6">
          <Heading size="md" className="mb-2 text-foreground">
            {starship.name}
          </Heading>
        </CardContent>
      </Card>
    </motion.div>
  );
}
