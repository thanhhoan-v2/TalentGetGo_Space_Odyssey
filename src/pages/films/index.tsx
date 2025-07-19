'use client';

import { PageLayout } from '@/components/common';
import { FilmCard, FilmCardSkeleton, FilmsStats } from '@/components/films';
import client from '@/lib/apollo-client';
import { GET_ALL_FILMS } from '@/lib/queries';
import { Film as GraphQLFilm } from '@/schema/graphql';
import { Film as SWAPIFilm } from '@/schema/swapi';
import { Box, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { GetStaticProps } from 'next';
import { useEffect, useState } from 'react';

interface FilmsPageProps {
  films: SWAPIFilm[];
}

// Convert GraphQL Film to SWAPI Film format
function convertGraphQLFilmToSWAPI(
  film: GraphQLFilm,
  index: number
): SWAPIFilm {
  return {
    title: film.title,
    episode_id: parseInt(film.id) || index + 1,
    opening_crawl: film.openingCrawl,
    director: film.director,
    producer: '', // Not available in GraphQL
    release_date: film.releaseDate,
    characters: [], // Would need to fetch separately
    planets: [], // Would need to fetch separately
    starships: [], // Would need to fetch separately
    vehicles: [], // Not available in GraphQL
    species: [], // Not available in GraphQL
    created: '', // Not available in GraphQL
    edited: '', // Not available in GraphQL
    url: `/films/${film.id}`,
  };
}

export default function FilmsPage({ films }: FilmsPageProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading state for better UX
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <PageLayout currentPage="films">
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
          Explore the complete Star Wars saga. From the original trilogy to the
          prequels and beyond.
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
      <FilmsStats films={films} />
    </PageLayout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    // Use Apollo Client to fetch films using the GraphQL schema
    const { data } = await client.query({
      query: GET_ALL_FILMS,
    });

    // Define the type for GraphQL edge
    interface FilmEdge {
      node: {
        title: string;
        director: string;
        releaseDate: string;
        openingCrawl: string;
      };
    }

    // Extract films from the GraphQL response and add generated IDs
    const filmsFromEdges: FilmEdge[] = data?.allFilms?.edges || [];
    const graphqlFilms = filmsFromEdges.map(
      (edge: FilmEdge, index: number) => ({
        id: (index + 1).toString(), // Generate ID based on index
        title: edge.node.title,
        director: edge.node.director,
        releaseDate: edge.node.releaseDate,
        openingCrawl: edge.node.openingCrawl,
      })
    );

    console.log('Fetched GraphQL films:', graphqlFilms); // Debug log

    // Convert GraphQL films to SWAPI format
    const films = graphqlFilms.map(convertGraphQLFilmToSWAPI);

    return {
      props: {
        films: films || [], // Ensure we always return an array
      },
      revalidate: 86400, // Revalidate once per day
    };
  } catch (error) {
    console.error('Error fetching films with GraphQL:', error);
    return {
      props: {
        films: [],
      },
      revalidate: 3600, // Try again in 1 hour if there was an error
    };
  }
};
