'use client';

import {
  CharacterCard,
  CharacterCardSkeleton,
  CharacterSearch,
  CharacterStats,
} from '@/components/characters';
import { PageLayout } from '@/components/common';
import client from '@/lib/apollo-client';
import { GET_ALL_PEOPLE } from '@/lib/queries';
import { Person } from '@/schema/swapi';
import { Box, Button, Grid, Heading, Text, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { useCallback, useEffect, useState } from 'react';

// Define the type for GraphQL edge
interface CharacterEdge {
  node: {
    name: string;
    height?: number;
    mass?: number;
    hairColor?: string;
    skinColor?: string;
    eyeColor?: string;
    birthYear?: string;
    gender?: string;
    homeworld?: {
      name: string;
    };
  };
}

// Convert GraphQL Character to SWAPI Person format
function convertGraphQLCharacterToSWAPI(
  char: CharacterEdge['node'],
  index: number
): Person {
  return {
    name: char.name,
    height: char.height?.toString() || 'unknown',
    mass: char.mass?.toString() || 'unknown',
    hair_color: char.hairColor || 'unknown',
    skin_color: char.skinColor || 'unknown',
    eye_color: char.eyeColor || 'unknown',
    birth_year: char.birthYear || 'unknown',
    gender: char.gender || 'unknown',
    homeworld: char.homeworld?.name || 'unknown',
    films: [], // Would need to fetch separately
    species: [], // Not available in GraphQL
    vehicles: [], // Not available in GraphQL
    starships: [], // Not available in GraphQL
    created: '', // Not available in GraphQL
    edited: '', // Not available in GraphQL
    url: `/characters/${index + 1}`,
  };
}

interface CharactersPageProps {
  initialCharacters: Person[];
  initialCount: number;
}

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
  const [cursor, setCursor] = useState<string | null>(null);

  // Initialize hasMore based on initial data and load data if needed
  useEffect(() => {
    if (initialCharacters && initialCharacters.length > 0) {
      setHasMore(initialCharacters.length < (initialCount || 83));
    } else {
      // If no initial characters, try to load them
      const loadInitialData = async () => {
        try {
          const { data } = await client.query({
            query: GET_ALL_PEOPLE,
            variables: { first: 10 },
          });

          const charactersFromEdges: CharacterEdge[] =
            data?.allPeople?.edges || [];
          const swapiCharacters = charactersFromEdges.map(
            (edge, index: number) =>
              convertGraphQLCharacterToSWAPI(edge.node, index)
          );

          setCharacters(swapiCharacters);
          setTotalCount(83); // Hardcoded for now since GraphQL doesn't provide total count
          setHasMore(data?.allPeople?.pageInfo?.hasNextPage || false);
          setCursor(data?.allPeople?.pageInfo?.endCursor || null);
        } catch (error) {
          console.error('Failed to load initial data:', error);
        }
      };
      loadInitialData();
    }
  }, [initialCharacters, initialCount]);

  // Search functionality
  const handleSearch = useCallback(
    async (query: string, page: number = 1) => {
      setLoading(true);
      setIsSearching(!!query);

      try {
        if (query.trim()) {
          // For now, search is not implemented in GraphQL - show empty results
          setCharacters([]);
          setTotalCount(0);
          setHasMore(false);
          setCursor(null);
        } else {
          const { data } = await client.query({
            query: GET_ALL_PEOPLE,
            variables: {
              first: 10,
              after: page === 1 ? null : cursor,
            },
          });

          const charactersFromEdges: CharacterEdge[] =
            data?.allPeople?.edges || [];
          const swapiCharacters = charactersFromEdges.map(
            (edge, index: number) =>
              convertGraphQLCharacterToSWAPI(edge.node, (page - 1) * 10 + index)
          );

          if (page === 1) {
            setCharacters(swapiCharacters);
          } else {
            setCharacters((prev) => [...prev, ...swapiCharacters]);
          }

          setTotalCount(83); // Hardcoded for now
          setHasMore(data?.allPeople?.pageInfo?.hasNextPage || false);
          setCursor(data?.allPeople?.pageInfo?.endCursor || null);
          setCurrentPage(page);
        }
      } catch (error) {
        console.error('Error fetching characters:', error);
        // On error, don't crash the app, just show empty state
        if (page === 1) {
          setCharacters([]);
          setTotalCount(0);
          setHasMore(false);
          setCursor(null);
        }
      } finally {
        setLoading(false);
      }
    },
    [cursor]
  );

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
      setCurrentPage(1);
      setCursor(null);
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

      <PageLayout currentPage="characters">
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
              Discover heroes, villains, and everyone in between from across the
              galaxy.
            </Text>
          </VStack>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <CharacterSearch
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
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
        <CharacterStats
          characters={characters}
          totalCount={totalCount}
          isSearching={isSearching}
        />
      </PageLayout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    // Use Apollo Client to fetch characters using the GraphQL schema
    const { data } = await client.query({
      query: GET_ALL_PEOPLE,
      variables: { first: 10 },
    });

    // Extract characters from the GraphQL response
    const charactersFromEdges: CharacterEdge[] = data?.allPeople?.edges || [];
    const initialCharacters = charactersFromEdges.map((edge, index: number) =>
      convertGraphQLCharacterToSWAPI(edge.node, index)
    );

    return {
      props: {
        initialCharacters,
        initialCount: 83, // Hardcoded for now since GraphQL doesn't provide total count
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
