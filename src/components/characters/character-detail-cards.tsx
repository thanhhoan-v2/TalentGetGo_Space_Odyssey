import {
  Badge,
  Card,
  CardContent,
  Heading,
  HStack,
  Text,
  VStack,
} from '@/components/ui';
import { Film, Starship, Vehicle } from '@/schema/swapi';
import { extractIdFromUrl } from '@/utils/swapi';
import { motion } from 'framer-motion';
import Link from 'next/link';

// Film Card Component for Character Detail
interface FilmCardProps {
  film: Film;
}

export function FilmCard({ film }: FilmCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={`/films/${extractIdFromUrl(film.url)}`}>
        <Card className="bg-card hover:shadow-lg hover:border-primary border-border transition-all hover:-translate-y-0.5 duration-300 cursor-pointer">
          <CardContent className="p-6">
            <HStack justify="between" className="mb-3">
              <Badge variant="secondary" className="px-2 py-1">
                Episode {film.episode_id}
              </Badge>
              <Text variant="muted" size="sm">
                {new Date(film.release_date).getFullYear()}
              </Text>
            </HStack>
            <Heading size="md" className="mb-2 text-foreground">
              {film.title}
            </Heading>
            <Text variant="default" size="sm">
              <Text as="span" variant="secondary" weight="semibold">
                Director:
              </Text>{' '}
              {film.director}
            </Text>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}

// Starship Card Component for Character Detail
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
          <Text variant="muted" size="sm" className="mb-3">
            {starship.model}
          </Text>
          <VStack align="start" gap="sm">
            <Text variant="default" size="sm">
              <Text as="span" variant="secondary" weight="semibold">
                Class:
              </Text>{' '}
              {starship.starship_class}
            </Text>
            <Text variant="default" size="sm">
              <Text as="span" variant="secondary" weight="semibold">
                Manufacturer:
              </Text>{' '}
              {starship.manufacturer}
            </Text>
          </VStack>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Vehicle Card Component for Character Detail
interface VehicleCardProps {
  vehicle: Vehicle;
}

export function VehicleCard({ vehicle }: VehicleCardProps) {
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
          <Heading size="md" className="mb-2 text-foreground">
            {vehicle.name}
          </Heading>
          <Text variant="muted" size="sm" className="mb-3">
            {vehicle.model}
          </Text>
          <VStack align="start" gap="sm">
            <Text variant="default" size="sm">
              <Text as="span" variant="secondary" weight="semibold">
                Class:
              </Text>{' '}
              {vehicle.vehicle_class}
            </Text>
            <Text variant="default" size="sm">
              <Text as="span" variant="secondary" weight="semibold">
                Manufacturer:
              </Text>{' '}
              {vehicle.manufacturer}
            </Text>
          </VStack>
        </CardContent>
      </Card>
    </motion.div>
  );
}
