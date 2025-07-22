'use client';

import { PageLayout } from '@/components/common';
import {
  FilmGridCard,
  FilmGridCardSkeleton,
  FilmGridStats,
} from '@/components/films';
import { useMounted } from '@/hooks/use-mounted';
import client from '@/lib/apollo-client';
import { GET_ALL_FILMS } from '@/lib/queries';
import { cn } from '@/lib/utils';
import { ROUTES } from '@/utils/routes';
import { FilmEdge } from '@/utils/swapi-graphql';
import { motion } from 'framer-motion';
import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import { useTheme } from 'next-themes';
import Head from 'next/head';
import { useEffect, useState } from 'react';

interface FilmsPageProps {
  films: {
    id: string;
    director: string;
    openingCrawl: string;
    releaseDate: string;
    title: string;
  }[];
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
    <>
      <NextSeo
        title="Space Odyssey - Films"
        description="Explore the complete Star Wars saga. From the original trilogy to the prequels and beyond."
        canonical={`${ROUTES.EXTERNAL.VERCEL_DOMAIN}/films`}
        openGraph={{
          url: `${ROUTES.EXTERNAL.VERCEL_DOMAIN}/films`,
          title: 'Space Odyssey - Films',
          description:
            'Explore the complete Star Wars saga. From the original trilogy to the prequels and beyond.',
          images: [
            {
              url: `${ROUTES.EXTERNAL.VERCEL_DOMAIN}/films-og-image.png`,
              width: 1200,
              height: 630,
              alt: 'Films Image',
            },
          ],
        }}
        twitter={{
          cardType: 'summary_large_image',
        }}
      />

      <Head>
        <title>Space Odyssey - Films</title>
        <meta
          name="description"
          content="Explore the complete Star Wars saga. From the original trilogy to the prequels and beyond."
        />
        <meta property="og:title" content="Space Odyssey - Films" />
        <meta
          property="og:description"
          content="Explore the complete Star Wars saga. From the original trilogy to the prequels and beyond."
        />
        <meta name="keywords" content="star wars, space odyssey, swapi" />
        <meta name="robots" content="index, follow" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Space Odyssey" />
        <meta httpEquiv="x-ua-compatible" content="IE=edge" />
      </Head>

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
          <FilmGridStats films={films} />
        </div>

        {isLoading ? (
          <div className={cn('grid gap-8 mb-16', 'grid-cols-1 lg:grid-cols-2')}>
            {Array.from({ length: 6 }).map((_, index) => (
              <FilmGridCardSkeleton key={index} />
            ))}
          </div>
        ) : films && films.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="mb-10 font-bold text-6xl text-center">All Films</h1>
            <div
              className={cn('grid gap-8 mb-16', 'grid-cols-1 lg:grid-cols-2')}
            >
              {films
                .sort((a, b) => Number(a.id) - Number(b.id))
                .map((film, index) => (
                  <motion.div
                    key={film.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <FilmGridCard film={film} />
                  </motion.div>
                ))}
            </div>
          </motion.div>
        ) : (
          <div className="py-12 text-center">
            <p className="text-muted-foreground text-lg">
              No films available at the moment.
            </p>
          </div>
        )}
      </PageLayout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const { data } = await client.query({
      query: GET_ALL_FILMS,
    });

    const filmsFromEdges: FilmEdge[] = data?.allFilms?.edges || [];

    const graphqlFilms = filmsFromEdges.map(
      (edge: FilmEdge, index: number) => ({
        id: (index + 1).toString(),
        title: edge.node.title,
        director: edge.node.director,
        releaseDate: edge.node.releaseDate,
        openingCrawl: edge.node.openingCrawl,
      })
    );

    return {
      props: {
        films: graphqlFilms || [],
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
