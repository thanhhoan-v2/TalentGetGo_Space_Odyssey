import { Film, Starship, Vehicle } from '@/types/swapi';
import { extractIdFromUrl } from '@/utils/swapi';
import { Badge, Card, Heading, HStack, Text, VStack } from '@chakra-ui/react';
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
        <Card.Root
          variant="elevated"
          bg="gray.900"
          borderColor="gray.700"
          _hover={{
            borderColor: 'yellow.400',
            shadow: 'lg',
            transform: 'translateY(-2px)',
          }}
          transition="all 0.3s ease"
          cursor="pointer"
        >
          <Card.Body p={6}>
            <HStack justify="space-between" mb={3}>
              <Badge
                colorScheme="blue"
                variant="solid"
                px={2}
                py={1}
                borderRadius="md"
              >
                Episode {film.episode_id}
              </Badge>
              <Text color="gray.400" fontSize="sm">
                {new Date(film.release_date).getFullYear()}
              </Text>
            </HStack>
            <Heading size="md" color="white" mb={2}>
              {film.title}
            </Heading>
            <Text color="gray.300" fontSize="sm">
              <Text as="span" color="blue.400" fontWeight="semibold">
                Director:
              </Text>{' '}
              {film.director}
            </Text>
          </Card.Body>
        </Card.Root>
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
          <Text color="gray.400" fontSize="sm" mb={3}>
            {starship.model}
          </Text>
          <VStack align="start" gap={2}>
            <Text color="gray.300" fontSize="sm">
              <Text as="span" color="blue.400" fontWeight="semibold">
                Class:
              </Text>{' '}
              {starship.starship_class}
            </Text>
            <Text color="gray.300" fontSize="sm">
              <Text as="span" color="blue.400" fontWeight="semibold">
                Manufacturer:
              </Text>{' '}
              {starship.manufacturer}
            </Text>
          </VStack>
        </Card.Body>
      </Card.Root>
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
      <Card.Root
        variant="elevated"
        bg="gray.900"
        borderColor="gray.700"
        _hover={{
          borderColor: 'purple.400',
          shadow: 'lg',
          transform: 'translateY(-2px)',
        }}
        transition="all 0.3s ease"
      >
        <Card.Body p={6}>
          <Heading size="md" color="white" mb={2}>
            {vehicle.name}
          </Heading>
          <Text color="gray.400" fontSize="sm" mb={3}>
            {vehicle.model}
          </Text>
          <VStack align="start" gap={2}>
            <Text color="gray.300" fontSize="sm">
              <Text as="span" color="blue.400" fontWeight="semibold">
                Class:
              </Text>{' '}
              {vehicle.vehicle_class}
            </Text>
            <Text color="gray.300" fontSize="sm">
              <Text as="span" color="blue.400" fontWeight="semibold">
                Manufacturer:
              </Text>{' '}
              {vehicle.manufacturer}
            </Text>
          </VStack>
        </Card.Body>
      </Card.Root>
    </motion.div>
  );
}
