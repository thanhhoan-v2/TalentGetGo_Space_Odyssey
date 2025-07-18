import { Film } from '@/types/swapi';
import { extractIdFromUrl } from '@/utils/swapi';
import {
  Badge,
  Box,
  Button,
  Card,
  Heading,
  HStack,
  Stack,
  Text,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface FilmCardProps {
  film: Film;
}

export function FilmCard({ film }: FilmCardProps) {
  return (
    <motion.div
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card.Root
        size="lg"
        variant="elevated"
        bg="gray.900"
        borderColor="gray.700"
        borderWidth="1px"
        _hover={{
          borderColor: 'blue.400',
          shadow: 'xl',
          transform: 'translateY(-2px)',
        }}
        transition="all 0.3s ease"
        cursor="pointer"
      >
        <Card.Body p={8}>
          {/* Episode Badge and Year */}
          <HStack justify="space-between" mb={4}>
            <Badge
              colorScheme="blue"
              variant="solid"
              px={3}
              py={1}
              borderRadius="full"
              fontSize="sm"
              fontWeight="bold"
            >
              Episode {film.episode_id}
            </Badge>
            <Text color="gray.400" fontSize="sm">
              {new Date(film.release_date).getFullYear()}
            </Text>
          </HStack>

          {/* Film Title */}
          <Heading as="h2" size="xl" color="white" mb={4} lineHeight="tight">
            {film.title}
          </Heading>

          {/* Film Details */}
          <Stack gap={2} mb={6}>
            <Text color="gray.300">
              <Text as="span" color="blue.400" fontWeight="semibold">
                Director:
              </Text>{' '}
              {film.director}
            </Text>
            <Text color="gray.300">
              <Text as="span" color="blue.400" fontWeight="semibold">
                Producer:
              </Text>{' '}
              {film.producer}
            </Text>
            <Text color="gray.300">
              <Text as="span" color="blue.400" fontWeight="semibold">
                Release Date:
              </Text>{' '}
              {new Date(film.release_date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </Text>
          </Stack>

          {/* Opening Crawl Preview */}
          <Box mb={6}>
            <Heading as="h3" size="md" color="yellow.400" mb={3}>
              Opening Crawl
            </Heading>
            <Box
              bg="blackAlpha.600"
              p={4}
              borderRadius="lg"
              border="1px solid"
              borderColor="gray.600"
            >
              <Text color="gray.300" fontSize="sm" lineHeight="relaxed">
                {film.opening_crawl.length > 200
                  ? `${film.opening_crawl.substring(0, 200)}...`
                  : film.opening_crawl}
              </Text>
            </Box>
          </Box>

          {/* Action Button */}
          <Link href={`/films/${extractIdFromUrl(film.url)}`}>
            <Button
              size="lg"
              width="full"
              bgGradient="linear(to-r, blue.600, blue.700)"
              color="white"
              fontWeight="semibold"
              _hover={{
                bgGradient: 'linear(to-r, blue.700, blue.800)',
                transform: 'translateY(-1px)',
              }}
              transition="all 0.2s ease"
            >
              View Full Details
            </Button>
          </Link>
        </Card.Body>
      </Card.Root>
    </motion.div>
  );
}
