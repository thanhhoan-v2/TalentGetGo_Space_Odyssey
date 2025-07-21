'use client';

import { PageLayout } from '@/components/common';
import { FilmCard, FilmCardSkeleton, FilmsStats } from '@/components/films';
import { Box, Text } from '@/components/ui';
import { useMounted } from '@/hooks/use-mounted';
import client from '@/lib/apollo-client';
import { GET_ALL_FILMS } from '@/lib/queries';
import { cn } from '@/lib/utils';
import { Film as GraphQLFilm } from '@/schema/graphql';
import { Film as SWAPIFilm } from '@/schema/swapi';
import { motion } from 'framer-motion';
import { GetStaticProps } from 'next';
import { useTheme } from 'next-themes';
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

  const { theme } = useTheme();
  const mounted = useMounted();
  if (!mounted) return null;

  const headerClassName =
    'font-bold ' +
    (theme === 'light' ? 'bg-black text-white' : 'bg-white text-black');

  return (
    <PageLayout>
      <div className="mb-12 text-center">
        <div className="mx-auto max-w-3xl text-[2rem] md:text-[3rem]">
          Explore the complete{' '}
          <span className={headerClassName}>Star Wars</span> saga. From the{' '}
          <span className={headerClassName}>original trilogy</span> to the{' '}
          <span className={headerClassName}>prequels</span> and beyond.
        </div>
      </div>

      <div className="mb-10">
        {/* <h1 className="mb-10 font-bold text-6xl text-center">Stats</h1> */}
        <FilmsStats films={films} />
      </div>

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
          <h1 className="mb-10 font-bold text-6xl text-center">Episodes</h1>
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
