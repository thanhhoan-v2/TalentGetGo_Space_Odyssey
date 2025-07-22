'use client';

import {
  CharacterGrid,
  CharacterGridHeader,
  CharacterSearchBar,
  CharacterSearchInfo,
  CharacterSearchStates,
} from '@/components/characters';
import { PageLayout } from '@/components/common';
import { useCharacters } from '@/hooks/use-characters';
import { useInfiniteScroll } from '@/hooks/use-infinite-scroll';
import {
  convertSwapiTechToPerson,
  fetchCharacters,
  IPerson,
} from '@/utils/swapi-tech';
import { motion } from 'framer-motion';
import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import Head from 'next/head';

interface CharactersPageProps {
  initialCharacters: IPerson[];
  initialCount: number;
}

export default function CharactersPage({
  initialCharacters,
  initialCount,
}: CharactersPageProps) {
  const {
    characters,
    searchQuery,
    setSearchQuery,
    loading,
    hasMore,
    totalCount,
    isSearching,
    loadMore,
    clearSearch,
  } = useCharacters({ initialCharacters, initialCount });

  // Enable infinite scroll
  useInfiniteScroll({ loadMore, hasMore, loading });

  return (
    <>
      <NextSeo
        title="Space Odyssey - Characters"
        description="Explore the complete collection of Star Wars characters"
        canonical="https://space-odyssey.vercel.app/characters"
        openGraph={{
          url: 'https://space-odyssey.vercel.app/characters',
          title: 'Space Odyssey - Characters',
          description:
            'Explore the complete collection of Star Wars characters',
          images: [
            {
              url: 'https://space-odyssey.vercel.app/characters-og-image.png',
              width: 1200,
              height: 630,
              alt: 'Characters Image',
            },
          ],
        }}
        twitter={{
          cardType: 'summary_large_image',
        }}
      />

      <Head>
        <title>Space Odyssey - Characters</title>
        <meta
          name="description"
          content="Explore the complete collection of Star Wars characters"
        />
        <meta property="og:title" content="Space Odyssey - Characters" />
        <meta
          property="og:description"
          content="Explore the complete collection of Star Wars characters"
        />
        <meta name="keywords" content="star wars, space odyssey, swapi" />
        <meta name="robots" content="index, follow" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Space Odyssey" />
        <meta httpEquiv="x-ua-compatible" content="IE=edge" />
      </Head>

      <PageLayout>
        <CharacterGridHeader />

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <CharacterSearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            isLoading={loading && isSearching}
          />
        </motion.div>

        <CharacterSearchInfo
          isSearching={isSearching}
          searchQuery={searchQuery}
          totalCount={totalCount}
          charactersLength={characters.length}
        />

        <CharacterGrid characters={characters} loading={loading} />

        {/* Loading States and Actions */}
        <CharacterSearchStates
          loading={loading}
          hasMore={hasMore}
          charactersLength={characters.length}
          isSearching={isSearching}
          searchQuery={searchQuery}
          onLoadMore={loadMore}
          onClearSearch={clearSearch}
        />
      </PageLayout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    // Fetch characters from SWAPI.tech API
    const result = await fetchCharacters(1);
    const initialCharacters = result.characters.map(convertSwapiTechToPerson);

    return {
      props: {
        initialCharacters,
        initialCount: result.totalRecords,
      },
      revalidate: 86400, // Revalidate once per day
    };
  } catch (error) {
    console.error('Error fetching initial characters:', error);
    // Return fallback data if API fails during build
    return {
      props: {
        initialCharacters: [],
        initialCount: 82, // Known total character count from SWAPI.tech
      },
      revalidate: 3600, // Try again in 1 hour if there was an error
    };
  }
};
