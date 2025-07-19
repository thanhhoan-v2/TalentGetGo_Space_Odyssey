import { Person } from '@/schema/swapi';
import { extractIdFromUrl } from '@/utils/swapi';
import {
  Badge,
  Box,
  Card,
  Heading,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Car, Eye, Rocket, Ruler, User, Users, Weight } from 'lucide-react';
import Link from 'next/link';

interface CharacterCardProps {
  character: Person;
  index: number;
}

export function CharacterCard({ character, index }: CharacterCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Link href={`${extractIdFromUrl(character.url)}`}>
        <Card.Root
          variant="elevated"
          bg="gray.900"
          borderColor="gray.700"
          _hover={{
            borderColor: 'yellow.400',
            shadow: 'xl',
            transform: 'translateY(-4px)',
          }}
          transition="all 0.3s ease"
          cursor="pointer"
          h="full"
        >
          <Card.Body p={6}>
            {/* Character Name */}
            <HStack mb={4}>
              <User size={20} color="rgb(251, 191, 36)" />
              <Heading size="md" color="white" lineClamp={1}>
                {character.name}
              </Heading>
            </HStack>

            {/* Physical Stats */}
            <VStack align="start" gap={3} mb={4}>
              <HStack justify="space-between" w="full">
                <HStack>
                  <Ruler size={14} color="rgb(96, 165, 250)" />
                  <Text color="blue.400" fontSize="sm" fontWeight="semibold">
                    Height:
                  </Text>
                </HStack>
                <Text color="gray.300" fontSize="sm">
                  {character.height}cm
                </Text>
              </HStack>

              {character.mass !== 'unknown' && (
                <HStack justify="space-between" w="full">
                  <HStack>
                    <Weight size={14} color="rgb(96, 165, 250)" />
                    <Text color="blue.400" fontSize="sm" fontWeight="semibold">
                      Mass:
                    </Text>
                  </HStack>
                  <Text color="gray.300" fontSize="sm">
                    {character.mass}kg
                  </Text>
                </HStack>
              )}

              <HStack justify="space-between" w="full">
                <Text color="blue.400" fontSize="sm" fontWeight="semibold">
                  Gender:
                </Text>
                <Text color="gray.300" fontSize="sm" textTransform="capitalize">
                  {character.gender}
                </Text>
              </HStack>

              <HStack justify="space-between" w="full">
                <Text color="blue.400" fontSize="sm" fontWeight="semibold">
                  Birth Year:
                </Text>
                <Text color="gray.300" fontSize="sm">
                  {character.birth_year}
                </Text>
              </HStack>
            </VStack>

            {/* Appearance Traits */}
            <Box mb={4} pt={4} borderTop="1px solid" borderColor="gray.700">
              <VStack align="start" gap={2}>
                <HStack justify="space-between" w="full">
                  <Text color="blue.400" fontSize="xs" fontWeight="semibold">
                    Hair:
                  </Text>
                  <Text
                    color="gray.300"
                    fontSize="xs"
                    textTransform="capitalize"
                    lineClamp={1}
                  >
                    {character.hair_color}
                  </Text>
                </HStack>
                <HStack justify="space-between" w="full">
                  <HStack>
                    <Eye size={12} color="rgb(96, 165, 250)" />
                    <Text color="blue.400" fontSize="xs" fontWeight="semibold">
                      Eyes:
                    </Text>
                  </HStack>
                  <Text
                    color="gray.300"
                    fontSize="xs"
                    textTransform="capitalize"
                    lineClamp={1}
                  >
                    {character.eye_color}
                  </Text>
                </HStack>
                <HStack justify="space-between" w="full">
                  <Text color="blue.400" fontSize="xs" fontWeight="semibold">
                    Skin:
                  </Text>
                  <Text
                    color="gray.300"
                    fontSize="xs"
                    textTransform="capitalize"
                    lineClamp={1}
                  >
                    {character.skin_color}
                  </Text>
                </HStack>
              </VStack>
            </Box>

            {/* Films and Vehicle Badges */}
            <HStack
              justify="space-between"
              align="center"
              pt={4}
              borderTop="1px solid"
              borderColor="gray.700"
            >
              <HStack>
                <Users size={14} color="rgb(96, 165, 250)" />
                <Text color="gray.400" fontSize="sm">
                  {character.films.length} film
                  {character.films.length !== 1 ? 's' : ''}
                </Text>
              </HStack>

              <HStack gap={2}>
                {character.starships.length > 0 && (
                  <Badge
                    colorScheme="red"
                    variant="solid"
                    px={2}
                    py={1}
                    borderRadius="md"
                    fontSize="xs"
                    display="flex"
                    alignItems="center"
                    gap={1}
                  >
                    <Rocket size={10} />
                    {character.starships.length}
                  </Badge>
                )}
                {character.vehicles.length > 0 && (
                  <Badge
                    colorScheme="purple"
                    variant="solid"
                    px={2}
                    py={1}
                    borderRadius="md"
                    fontSize="xs"
                    display="flex"
                    alignItems="center"
                    gap={1}
                  >
                    <Car size={10} />
                    {character.vehicles.length}
                  </Badge>
                )}
              </HStack>
            </HStack>
          </Card.Body>
        </Card.Root>
      </Link>
    </motion.div>
  );
}
