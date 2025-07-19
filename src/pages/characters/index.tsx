'use client';

import {
  CharacterGrid,
  CharacterListHeader,
  CharacterListInfo,
  CharacterListStates,
  CharacterSearch,
  CharacterStats,
} from '@/components/characters';
import { PageLayout } from '@/components/common';
import { useCharacters } from '@/hooks/useCharacters';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { Person } from '@/schema/swapi';
import { fetchCharacters, convertSwapiTechToPerson } from '@/utils/swapi-api';
import { motion } from 'framer-motion';
import { GetStaticProps } from 'next';
import Head from 'next/head';

interface CharactersPageProps {
  initialCharacters: Person[];
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
        <CharacterListHeader />

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
        <CharacterListInfo
          isSearching={isSearching}
          searchQuery={searchQuery}
          totalCount={totalCount}
          charactersLength={characters.length}
        />

        {/* Characters Grid */}
        <CharacterGrid characters={characters} loading={loading} />

        {/* Loading States and Actions */}
        <CharacterListStates
          loading={loading}
          hasMore={hasMore}
          charactersLength={characters.length}
          isSearching={isSearching}
          searchQuery={searchQuery}
          onLoadMore={loadMore}
          onClearSearch={clearSearch}
        />

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
