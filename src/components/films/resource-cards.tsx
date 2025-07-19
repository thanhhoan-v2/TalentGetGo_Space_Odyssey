import { Planet, Starship } from '@/schema/swapi';
import { Card, Heading } from '@chakra-ui/react';
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
      <Card.Root
        variant="elevated"
        bg="gray.900"
        borderColor="gray.700"
        _hover={{
          borderColor: 'green.400',
          shadow: 'lg',
          transform: 'translateY(-2px)',
        }}
        transition="all 0.3s ease"
      >
        <Card.Body p={6}>
          <Heading size="md" color="white" mb={3}>
            {planet.name}
          </Heading>
        </Card.Body>
      </Card.Root>
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
      <Card.Root
        variant="elevated"
        bg="gray.900"
        borderColor="gray.700"
        _hover={{
          borderColor: 'red.400',
          shadow: 'lg',
          transform: 'translateY(-2px)',
        }}
        transition="all 0.3s ease"
      >
        <Card.Body p={6}>
          <Heading size="md" color="white" mb={2}>
            {starship.name}
          </Heading>
        </Card.Body>
      </Card.Root>
    </motion.div>
  );
}
