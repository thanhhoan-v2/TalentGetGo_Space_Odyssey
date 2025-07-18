'use client';

import { Person, SWAPIResponse } from '@/types/swapi';
import { extractIdFromUrl, getAllPeople, searchPeople } from '@/utils/swapi';
import {
  Badge,
  Box,
  Button,
  Card,
  Container,
  Flex,
  Grid,
  Heading,
  HStack,
  Input,
  Skeleton,
  SkeletonText,
  Spacer,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import {
  Car,
  Eye,
  Rocket,
  Ruler,
  Search,
  User,
  Users,
  Weight,
} from 'lucide-react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

interface CharactersPageProps {
  initialCharacters: Person[];
  initialCount: number;
}

// Loading skeleton component for character cards
const CharacterCardSkeleton = () => (
  <Card.Root variant="elevated" bg="gray.900">
    <Card.Body p={6}>
      <Skeleton height="24px" width="70%" mb={4} />
      <VStack align="start" gap={3}>
        <Skeleton height="16px" width="100%" />
        <Skeleton height="16px" width="80%" />
        <Skeleton height="16px" width="90%" />
        <Skeleton height="16px" width="60%" />
      </VStack>
      <Box mt={4} pt={4} borderTop="1px solid" borderColor="gray.700">
        <SkeletonText noOfLines={3} />
      </Box>
    </Card.Body>
  </Card.Root>
);

// Character card component
const CharacterCard = ({
  character,
  index,
}: {
  character: Person;
  index: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: index * 0.1 }}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    <Link href={`/characters/${extractIdFromUrl(character.url)}`}>
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

export default function CharactersPage({
  initialCharacters,
  initialCount,
}: CharactersPageProps) {
  const [characters, setCharacters] = useState<Person[]>(
    initialCharacters || []
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [totalCount, setTotalCount] = useState(initialCount || 83);
  const [isSearching, setIsSearching] = useState(false);

  // Initialize hasMore based on initial data and load data if needed
  useEffect(() => {
    if (initialCharacters && initialCharacters.length > 0) {
      setHasMore(initialCharacters.length < (initialCount || 83));
    } else {
      // If no initial characters, try to load them
      const loadInitialData = async () => {
        try {
          const response = await getAllPeople(1);
          setCharacters(response.results || []);
          setTotalCount(response.count || 83);
          setHasMore(!!response.next);
        } catch (error) {
          console.error('Failed to load initial data:', error);
        }
      };
      loadInitialData();
    }
  }, [initialCharacters, initialCount]);

  // Search functionality
  const handleSearch = useCallback(async (query: string, page: number = 1) => {
    setLoading(true);
    setIsSearching(!!query);

    try {
      let response: SWAPIResponse<Person>;

      if (query.trim()) {
        response = await searchPeople(query, page);
      } else {
        response = await getAllPeople(page);
      }

      if (page === 1) {
        setCharacters(response.results || []);
      } else {
        setCharacters((prev) => [...prev, ...(response.results || [])]);
      }

      setTotalCount(response.count || 0);
      setHasMore(!!response.next);
      setCurrentPage(page);
    } catch (error) {
      console.error('Error fetching characters:', error);
      // On error, don't crash the app, just show empty state
      if (page === 1) {
        setCharacters([]);
        setTotalCount(0);
        setHasMore(false);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // Load more functionality
  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      handleSearch(searchQuery, currentPage + 1);
    }
  }, [loading, hasMore, searchQuery, currentPage, handleSearch]);

  // Search input handler
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      // Reset to page 1 when search query changes
      handleSearch(searchQuery, 1);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, handleSearch]);

  // Infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 1000
      ) {
        loadMore();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMore]);

  return (
    <>
      <Head>
        <title>Star Wars Characters - Star Wars Explorer</title>
        <meta
          name="description"
          content="Discover heroes, villains, and everyone in between from across the Star Wars galaxy. Browse and search through all Star Wars characters."
        />
        <meta
          property="og:title"
          content="Star Wars Characters - Star Wars Explorer"
        />
        <meta
          property="og:description"
          content="Explore the complete collection of Star Wars characters"
        />
      </Head>

      <Box minH="100vh" bg="black" color="white">
        {/* Header */}
        <Box
          as="header"
          bg="gray.900"
          borderBottom="1px"
          borderColor="gray.700"
        >
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
              <Stack direction={{ base: 'column', md: 'row' }} gap={6}>
                <Link href="/films" passHref>
                  <Text
                    as="a"
                    color="gray.300"
                    _hover={{ color: 'white' }}
                    transition="colors 0.2s"
                  >
                    Films
                  </Text>
                </Link>
                <Link href="/characters" passHref>
                  <Text as="a" color="yellow.400" fontWeight="semibold">
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <VStack gap={6} mb={12} textAlign="center">
              <Heading
                size={{ base: '2xl', md: '4xl' }}
                bgGradient="linear(to-r, yellow.400, orange.500)"
                bgClip="text"
                lineHeight="shorter"
              >
                Star Wars Characters
              </Heading>
              <Text
                fontSize={{ base: 'lg', md: 'xl' }}
                color="gray.300"
                maxW="3xl"
                mx="auto"
              >
                Discover heroes, villains, and everyone in between from across
                the galaxy.
              </Text>
            </VStack>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Box maxW="2xl" mx="auto" mb={8} position="relative">
              <Box
                position="absolute"
                left="12px"
                top="50%"
                transform="translateY(-50%)"
                zIndex={2}
                pointerEvents="none"
              >
                <Search size={20} color="rgb(156, 163, 175)" />
              </Box>
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search characters (e.g., Luke, Vader, Leia)..."
                bg="gray.900"
                borderColor="gray.700"
                _hover={{ borderColor: 'gray.600' }}
                _focus={{
                  borderColor: 'blue.500',
                  boxShadow: '0 0 0 1px rgb(59, 130, 246)',
                }}
                color="white"
                _placeholder={{ color: 'gray.400' }}
                pl="44px"
                size="lg"
              />
            </Box>
          </motion.div>

          {/* Results Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Text textAlign="center" color="gray.400" mb={8}>
              {isSearching ? (
                <>
                  Showing results for &ldquo;{searchQuery}&rdquo; ({totalCount}{' '}
                  characters found)
                </>
              ) : (
                <>
                  Showing {characters.length} of {totalCount} characters
                </>
              )}
            </Text>
          </motion.div>

          {/* Characters Grid */}
          {loading && characters.length === 0 ? (
            <Grid
              templateColumns={{
                base: '1fr',
                md: 'repeat(2, 1fr)',
                lg: 'repeat(3, 1fr)',
                xl: 'repeat(4, 1fr)',
              }}
              gap={6}
              mb={8}
            >
              {Array.from({ length: 8 }).map((_, index) => (
                <CharacterCardSkeleton key={index} />
              ))}
            </Grid>
          ) : characters && characters.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Grid
                templateColumns={{
                  base: '1fr',
                  md: 'repeat(2, 1fr)',
                  lg: 'repeat(3, 1fr)',
                  xl: 'repeat(4, 1fr)',
                }}
                gap={6}
                mb={8}
              >
                {characters.map((character, index) => (
                  <CharacterCard
                    key={character.url}
                    character={character}
                    index={index % 12} // Reset animation delay every 12 items
                  />
                ))}
              </Grid>
            </motion.div>
          ) : (
            <Box textAlign="center" py={12}>
              <Text color="gray.400" fontSize="lg">
                No characters available at the moment.
              </Text>
            </Box>
          )}

          {/* Loading State */}
          {loading && characters.length > 0 && (
            <VStack py={8}>
              <Box
                w={8}
                h={8}
                border="2px solid"
                borderColor="gray.600"
                borderTopColor="yellow.400"
                borderRadius="full"
                animation="spin 1s linear infinite"
              />
              <Text color="gray.400">Loading more characters...</Text>
            </VStack>
          )}

          {/* Load More Button */}
          {!loading && hasMore && characters.length > 0 && (
            <Box textAlign="center">
              <Button
                onClick={loadMore}
                size="lg"
                bgGradient="linear(to-r, blue.600, blue.700)"
                color="white"
                _hover={{
                  bgGradient: 'linear(to-r, blue.700, blue.800)',
                  transform: 'translateY(-2px)',
                }}
                transition="all 0.2s ease"
              >
                Load More Characters
              </Button>
            </Box>
          )}

          {/* No More Results */}
          {!loading && !hasMore && characters.length > 0 && (
            <Box textAlign="center" py={8}>
              <Text color="gray.400">
                {isSearching
                  ? 'No more search results'
                  : "You've seen all characters in the galaxy!"}
              </Text>
            </Box>
          )}

          {/* No Results */}
          {!loading && characters.length === 0 && isSearching && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <VStack py={16} textAlign="center">
                <Text fontSize="6xl" mb={4}>
                  🔍
                </Text>
                <Heading size="xl" color="white" mb={2}>
                  No Characters Found
                </Heading>
                <Text color="gray.400" mb={6}>
                  No characters match your search for &ldquo;{searchQuery}
                  &rdquo;
                </Text>
                <Button
                  onClick={() => setSearchQuery('')}
                  colorScheme="yellow"
                  variant="solid"
                  size="lg"
                >
                  Clear Search
                </Button>
              </VStack>
            </motion.div>
          )}

          {/* Stats Section */}
          {characters.length > 0 && !isSearching && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Card.Root
                variant="elevated"
                bg="gray.900"
                borderColor="gray.700"
                mt={16}
              >
                <Card.Body p={8} textAlign="center">
                  <Heading size="xl" color="white" mb={6}>
                    Galaxy Statistics
                  </Heading>
                  <Grid
                    templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }}
                    gap={6}
                  >
                    <Box>
                      <Text fontSize="3xl" color="yellow.400" fontWeight="bold">
                        {totalCount}
                      </Text>
                      <Text color="gray.300">Total Characters</Text>
                    </Box>
                    <Box>
                      <Text fontSize="3xl" color="blue.400" fontWeight="bold">
                        {
                          characters.filter((c) => c.starships.length > 0)
                            .length
                        }
                      </Text>
                      <Text color="gray.300">Starship Pilots</Text>
                    </Box>
                    <Box>
                      <Text fontSize="3xl" color="purple.400" fontWeight="bold">
                        {characters.filter((c) => c.vehicles.length > 0).length}
                      </Text>
                      <Text color="gray.300">Vehicle Operators</Text>
                    </Box>
                  </Grid>
                </Card.Body>
              </Card.Root>
            </motion.div>
          )}
        </Container>
      </Box>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    // Load initial page of characters
    const response = await getAllPeople(1);

    return {
      props: {
        initialCharacters: response?.results || [],
        initialCount: response?.count || 83, // Fallback to known total
      },
      revalidate: 86400, // Revalidate once per day
    };
  } catch (error) {
    console.error('Error fetching initial characters:', error);
    // Return fallback data if API fails during build
    return {
      props: {
        initialCharacters: [],
        initialCount: 83, // Known total character count
      },
      revalidate: 3600, // Try again in 1 hour if there was an error
    };
  }
};
