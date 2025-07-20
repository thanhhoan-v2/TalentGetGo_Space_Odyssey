'use client';

import { PageLayout } from '@/components/common';
import { FilmCard, FilmCardSkeleton, FilmsStats } from '@/components/films';
import { Box, Heading, Text } from '@/components/ui';
import client from '@/lib/apollo-client';
import { GET_ALL_FILMS } from '@/lib/queries';
import { cn } from '@/lib/utils';
import { Film as GraphQLFilm } from '@/schema/graphql';
import { Film as SWAPIFilm } from '@/schema/swapi';
import { motion } from 'framer-motion';
import { GetStaticProps } from 'next';
import { useEffect, useState } from 'react';

interface FilmsPageProps {
  films: SWAPIFilm[];
}

// Convert GraphQL Film to SWAPI Film format
export function convertGraphQLFilmToSWAPI(
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
    <PageLayout>
      {/* Page Header */}
      <Box className="mb-12 text-center">
        <Heading size="3xl" variant="gradient" className="mb-4">
          Star Wars Films
        </Heading>
        <Text size="xl" variant="muted" className="mx-auto max-w-3xl">
          Explore the complete Star Wars saga. From the original trilogy to the
          prequels and beyond.
        </Text>
      </Box>

      {/* Films Grid */}
      {isLoading ? (
        <div className={cn('grid gap-8 mb-16', 'grid-cols-1 lg:grid-cols-2')}>
          {Array.from({ length: 4 }).map((_, index) => (
            <FilmCardSkeleton key={index} />
          ))}
        </div>
      ) : films && films.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* <div className="pt-40">
            <CardCarousel
              images={images}
              films={films}
              autoplayDelay={2000}
              showPagination={true}
              showNavigation={true}
            />
          </div> */}
          <div className={cn('grid gap-8 mb-16', 'grid-cols-1 lg:grid-cols-2')}>
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
          </div>
        </motion.div>
      ) : (
        <Box className="py-12 text-center">
          <Text variant="muted" size="lg">
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
