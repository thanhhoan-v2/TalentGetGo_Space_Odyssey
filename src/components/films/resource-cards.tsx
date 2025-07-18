import { Person, Planet, Species, Starship, Vehicle } from '@/types/swapi';
import { extractIdFromUrl } from '@/utils/swapi';
import { Card, Flex, Heading, Text, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';
import Link from 'next/link';

// Character Card Component
interface CharacterCardProps {
  character: Person;
}

export function CharacterCard({ character }: CharacterCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={`/characters/${extractIdFromUrl(character.url)}`}>
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
            <Flex align="center" mb={3}>
              <User size={20} color="rgb(251, 191, 36)" />
              <Heading size="md" color="white" ml={2}>
                {character.name}
              </Heading>
            </Flex>
            <VStack align="start" gap={2}>
              <Text color="gray.300" fontSize="sm">
                <Text as="span" color="blue.400" fontWeight="semibold">
                  Height:
                </Text>{' '}
                {character.height} cm
              </Text>
              <Text color="gray.300" fontSize="sm">
                <Text as="span" color="blue.400" fontWeight="semibold">
                  Gender:
                </Text>{' '}
                {character.gender}
              </Text>
              <Text color="gray.300" fontSize="sm">
                <Text as="span" color="blue.400" fontWeight="semibold">
                  Birth Year:
                </Text>{' '}
                {character.birth_year}
              </Text>
              {character.mass !== 'unknown' && (
                <Text color="gray.300" fontSize="sm">
                  <Text as="span" color="blue.400" fontWeight="semibold">
                    Mass:
                  </Text>{' '}
                  {character.mass} kg
                </Text>
              )}
            </VStack>
          </Card.Body>
        </Card.Root>
      </Link>
    </motion.div>
  );
}

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
          <VStack align="start" gap={2}>
            <Text color="gray.300" fontSize="sm">
              <Text as="span" color="blue.400" fontWeight="semibold">
                Climate:
              </Text>{' '}
              {planet.climate}
            </Text>
            <Text color="gray.300" fontSize="sm">
              <Text as="span" color="blue.400" fontWeight="semibold">
                Terrain:
              </Text>{' '}
              {planet.terrain}
            </Text>
            <Text color="gray.300" fontSize="sm">
              <Text as="span" color="blue.400" fontWeight="semibold">
                Population:
              </Text>{' '}
              {planet.population}
            </Text>
            {planet.diameter !== 'unknown' && (
              <Text color="gray.300" fontSize="sm">
                <Text as="span" color="blue.400" fontWeight="semibold">
                  Diameter:
                </Text>{' '}
                {planet.diameter} km
              </Text>
            )}
          </VStack>
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
            {starship.length !== 'unknown' && (
              <Text color="gray.300" fontSize="sm">
                <Text as="span" color="blue.400" fontWeight="semibold">
                  Length:
                </Text>{' '}
                {starship.length} m
              </Text>
            )}
            <Text color="gray.300" fontSize="sm">
              <Text as="span" color="blue.400" fontWeight="semibold">
                Crew:
              </Text>{' '}
              {starship.crew}
            </Text>
          </VStack>
        </Card.Body>
      </Card.Root>
    </motion.div>
  );
}

// Vehicle Card Component
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
            {vehicle.length !== 'unknown' && (
              <Text color="gray.300" fontSize="sm">
                <Text as="span" color="blue.400" fontWeight="semibold">
                  Length:
                </Text>{' '}
                {vehicle.length} m
              </Text>
            )}
            <Text color="gray.300" fontSize="sm">
              <Text as="span" color="blue.400" fontWeight="semibold">
                Crew:
              </Text>{' '}
              {vehicle.crew}
            </Text>
          </VStack>
        </Card.Body>
      </Card.Root>
    </motion.div>
  );
}

// Species Card Component
interface SpeciesCardProps {
  species: Species;
}

export function SpeciesCard({ species }: SpeciesCardProps) {
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
          borderColor: 'cyan.400',
          shadow: 'lg',
          transform: 'translateY(-2px)',
        }}
        transition="all 0.3s ease"
      >
        <Card.Body p={6}>
          <Heading size="md" color="white" mb={3}>
            {species.name}
          </Heading>
          <VStack align="start" gap={2}>
            <Text color="gray.300" fontSize="sm">
              <Text as="span" color="blue.400" fontWeight="semibold">
                Classification:
              </Text>{' '}
              {species.classification}
            </Text>
            <Text color="gray.300" fontSize="sm">
              <Text as="span" color="blue.400" fontWeight="semibold">
                Designation:
              </Text>{' '}
              {species.designation}
            </Text>
            {species.average_height !== 'unknown' && (
              <Text color="gray.300" fontSize="sm">
                <Text as="span" color="blue.400" fontWeight="semibold">
                  Avg Height:
                </Text>{' '}
                {species.average_height} cm
              </Text>
            )}
            <Text color="gray.300" fontSize="sm">
              <Text as="span" color="blue.400" fontWeight="semibold">
                Language:
              </Text>{' '}
              {species.language}
            </Text>
          </VStack>
        </Card.Body>
      </Card.Root>
    </motion.div>
  );
}
