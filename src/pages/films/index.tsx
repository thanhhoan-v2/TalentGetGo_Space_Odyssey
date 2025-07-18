'use client';

import { Film } from '@/types/swapi';
import { extractIdFromUrl, getAllFilms } from '@/utils/swapi';
import {
  Badge,
  Box,
  Button,
  Card,
  Container,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Skeleton,
  SkeletonText,
  Spacer,
  Stack,
  Text,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface FilmsPageProps {
  films: Film[];
}

// Loading skeleton component for film cards
const FilmCardSkeleton = () => (
  <Card.Root size="lg" variant="elevated" bg="gray.900">
    <Card.Body p={8}>
      <HStack justify="space-between" mb={4}>
        <Skeleton height="24px" width="100px" />
        <Skeleton height="20px" width="60px" />
      </HStack>
      <Skeleton height="32px" width="100%" mb={4} />
      <Stack gap={2} mb={6}>
        <SkeletonText noOfLines={3} />
      </Stack>
      <Box mb={6}>
        <Skeleton height="20px" width="120px" mb={3} />
        <SkeletonText noOfLines={3} />
      </Box>
      <Skeleton height="48px" width="100%" />
    </Card.Body>
  </Card.Root>
);

// Film Card Component with enhanced animations
const FilmCard = ({ film }: { film: Film }) => {
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
};

export default function FilmsPage({ films }: FilmsPageProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading state for better UX
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box minH="100vh" bg="black" color="white">
      {/* Header */}
      <Box as="header" bg="gray.900" borderBottom="1px" borderColor="gray.700">
        <Container maxW="7xl" py={6}>
          <Flex align="center">
            <Link href="/" passHref>
              <Heading
                as="a"
                size="lg"
                color="yellow.400"
                _hover={{ color: 'yellow.300' }}
                transition="colors 0.2s"
              >
                Star Wars Explorer
              </Heading>
            </Link>
            <Spacer />
            <Stack direction="row" gap={6}>
              <Link href="/films" passHref>
                <Text as="a" color="yellow.400" fontWeight="semibold">
                  Films
                </Text>
              </Link>
              <Link href="/characters" passHref>
                <Text
                  as="a"
                  color="gray.300"
                  _hover={{ color: 'white' }}
                  transition="colors 0.2s"
                >
                  Characters
                </Text>
              </Link>
            </Stack>
          </Flex>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxW="7xl" py={12}>
        {/* Page Header */}
        <Box textAlign="center" mb={12}>
          <Heading
            size="3xl"
            bgGradient="linear(to-r, yellow.400, orange.500)"
            bgClip="text"
            mb={4}
          >
            Star Wars Films
          </Heading>
          <Text fontSize="xl" color="gray.300" maxW="3xl" mx="auto">
            Explore the complete Star Wars saga. From the original trilogy to
            the prequels and beyond.
          </Text>
        </Box>

        {/* Films Grid */}
        {isLoading ? (
          <SimpleGrid columns={{ base: 1, lg: 2 }} gap={8} mb={16}>
            {Array.from({ length: 4 }).map((_, index) => (
              <FilmCardSkeleton key={index} />
            ))}
          </SimpleGrid>
        ) : films && films.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <SimpleGrid columns={{ base: 1, lg: 2 }} gap={8} mb={16}>
              {films
                .sort((a, b) => a.episode_id - b.episode_id)
                .map((film, index) => (
                  <motion.div
                    key={film.url}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <FilmCard film={film} />
                  </motion.div>
                ))}
            </SimpleGrid>
          </motion.div>
        ) : (
          <Box textAlign="center" py={12}>
            <Text color="gray.400" fontSize="lg">
              No films available at the moment.
            </Text>
          </Box>
        )}

        {/* Stats Section */}
        {films && films.length > 0 && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card.Root
              size="lg"
              variant="elevated"
              bg="gray.900"
              borderColor="gray.700"
            >
              <Card.Body p={8} textAlign="center">
                <Heading size="xl" color="white" mb={4}>
                  Film Collection Stats
                </Heading>
                <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
                  <Box>
                    <Text fontSize="3xl" color="yellow.400" fontWeight="bold">
                      {films.length}
                    </Text>
                    <Text color="gray.300">Total Films</Text>
                  </Box>
                  <Box>
                    <Text fontSize="3xl" color="blue.400" fontWeight="bold">
                      {new Set(films.map((f) => f.director)).size}
                    </Text>
                    <Text color="gray.300">Directors</Text>
                  </Box>
                  <Box>
                    <Text fontSize="3xl" color="green.400" fontWeight="bold">
                      {Math.max(...films.map((f) => f.episode_id)) -
                        Math.min(...films.map((f) => f.episode_id)) +
                        1}
                    </Text>
                    <Text color="gray.300">Episode Range</Text>
                  </Box>
                </SimpleGrid>
              </Card.Body>
            </Card.Root>
          </motion.div>
        )}
      </Container>
    </Box>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const films = await getAllFilms();

    return {
      props: {
        films: films || [], // Ensure we always return an array
      },
      revalidate: 86400, // Revalidate once per day
    };
  } catch (error) {
    console.error('Error fetching films:', error);
    return {
      props: {
        films: [],
      },
      revalidate: 3600, // Try again in 1 hour if there was an error
    };
  }
};
