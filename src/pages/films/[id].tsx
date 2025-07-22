'use client';

import { BoxReveal, TextReveal } from '@/components/animated';
import { CharacterGridCard } from '@/components/characters';
import { PageLayout } from '@/components/common';
import { PlanetCard, StarshipCard } from '@/components/resource-cards';
import { Badge } from '@/components/ui';
import client from '@/lib/apollo-client';
import { GET_ALL_FILMS, GET_FILM_BY_ID } from '@/lib/queries';
import { cn } from '@/lib/utils';
import { GraphQLFilm } from '@/utils/graphql-schema';
import { Person } from '@/utils/swapi';
import { motion } from 'framer-motion';
import { Calendar, ClapperboardIcon } from 'lucide-react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import Head from 'next/head';
import { useMediaQuery } from 'react-responsive';
import { getCharacterIdByName } from '../api/people/search';

// Define the types for GraphQL edges
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
  };
}

interface PlanetEdge {
  node: {
    name: string;
    climates?: string[];
    terrains?: string[];
    population?: number;
  };
}

interface StarshipEdge {
  node: {
    name: string;
    model?: string;
    manufacturers?: string[];
    starshipClass?: string;
  };
}

interface FilmDetailPageProps {
  film: {
    title: string;
    episode_id: number;
    opening_crawl: string;
    director: string;
    release_date: string;
    characters: Person[];
    planets: PlanetEdge[];
    starships: StarshipEdge[];
  };
  characters: Person[];
  planets: PlanetEdge[];
  starships: StarshipEdge[];
}

// Convert GraphQL Film to SWAPI Film format
function convertGraphQLFilmToSWAPI(film: GraphQLFilm, index: number) {
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
    created: '', // Not available index + 1,
    edited: '', // Not available in GraphQL
    url: `/films/${film.id}`,
  };
}

// Convert GraphQL Character to SWAPI Person format
function convertGraphQLCharacterToSWAPI(
  char: CharacterEdge['node'],
  index: number
) {
  return {
    name: char.name,
    height: char.height?.toString() || 'unknown',
    mass: char.mass?.toString() || 'unknown',
    hair_color: char.hairColor || 'unknown',
    skin_color: char.skinColor || 'unknown',
    eye_color: char.eyeColor || 'unknown',
    birth_year: char.birthYear || 'unknown',
    gender: char.gender || 'unknown',
    homeworld: '', // Not available in this context
    url: `/characters/${index + 1}`,
  };
}

export default function FilmDetailPage({
  film,
  characters,
  planets,
  starships,
}: FilmDetailPageProps) {
  const isMobileS = useMediaQuery({ query: '(max-width: 320px)' });

  return (
    <>
      <NextSeo
        title={film.title}
        description={`Explore ${film.title} (Episode ${film.episode_id}) from the Star Wars saga. Directed by ${film.director} and released in ${new Date(film.release_date).getFullYear()}.`}
        canonical={`https://space-odyssey.vercel.app/films/${film.episode_id}`}
        openGraph={{
          type: 'film',
          url: `https://space-odyssey.vercel.app/films/${film.episode_id}`,
          title: film.title,
          description: `Explore ${film.title} (Episode ${film.episode_id}) from the Star Wars saga. Directed by ${film.director} and released in ${new Date(film.release_date).getFullYear()}.`,
          images: [
            {
              url: 'https://space-odyssey.vercel.app/films-og-image.png',
              width: 1200,
              height: 630,
              alt: film.title,
            },
          ],
          profile: {
            firstName: film.title,
          },
        }}
        twitter={{
          cardType: 'summary_large_image',
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: film.title,
          },
        ]}
      />

      <Head>
        <title>Space Odyssey - {film.title}</title>
        <meta
          name="description"
          content={`Explore ${film.title} (Episode ${film.episode_id}) from the Star Wars saga. Directed by ${film.director} and released in ${new Date(film.release_date).getFullYear()}.`}
        />
        <meta property="og:title" content={`Space Odyssey - ${film.title}`} />
        <meta
          property="og:description"
          content={`Explore ${film.title} (Episode ${film.episode_id}) from the Star Wars saga. Directed by ${film.director} and released in ${new Date(film.release_date).getFullYear()}.`}
        />
      </Head>

      <PageLayout>
        {/* Main Content */}
        <div className="py-12">
          {/* Film Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <BoxReveal className="mx-auto mb-5 w-full font-bold text-[3rem] md:text-[5rem] lg:text-[6rem] xl:text-[8rem] text-center">
                {film.title}
              </BoxReveal>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-2">
              <Badge variant="episode">Episode {film.episode_id}</Badge>
              <Badge variant="director">
                <ClapperboardIcon /> {film.director}
              </Badge>
              <Badge variant="releaseDate">
                <Calendar />
                {new Date(film.release_date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </Badge>
            </div>
            {/* Opening Crawl */}
            <TextReveal>{film.opening_crawl}</TextReveal>
          </motion.div>

          <div className="flex flex-col items-center gap-12">
            {/* Characters */}
            {characters.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div>
                  <div className="mb-8 font-bold text-foreground text-4xl text-center">
                    Characters ({characters.length})
                  </div>
                  <div
                    className={cn(
                      'gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full',
                      isMobileS && 'w-screen'
                    )}
                  >
                    {characters.map((character, index) => (
                      <CharacterGridCard
                        key={index}
                        characterName={character.name}
                        characterUrl={`/characters/${getCharacterIdByName(character.name)}`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Planets */}
            {planets.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                style={{ width: 'fit-content' }}
              >
                <div>
                  <div className="mb-8 font-bold text-foreground text-4xl text-center">
                    Planets ({planets.length})
                  </div>
                  <div
                    className={cn(
                      'gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full',
                      isMobileS && 'w-screen'
                    )}
                  >
                    {planets.map((planet, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <PlanetCard planetName={planet.node.name} />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Starships */}
            {starships.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <div>
                  <div className="mb-8 font-bold text-foreground text-4xl text-center">
                    Starships ({starships.length})
                  </div>
                  <div
                    className={cn(
                      'gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full',
                      isMobileS && 'w-screen'
                    )}
                  >
                    {starships.map((starship, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <StarshipCard starshipName={starship.node.name} />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </PageLayout>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
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
    const paths = filmsFromEdges.map((edge: FilmEdge, index: number) => ({
      params: { id: (index + 1).toString() }, // Generate ID based on index
    }));

    return {
      paths,
      fallback: false,
    };
  } catch (error) {
    console.error('Error getting film paths:', error);
    return {
      paths: [],
      fallback: false,
    };
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const id = params?.id as string;

    // Use Apollo Client to fetch film details using the GraphQL schema
    const { data } = await client.query({
      query: GET_FILM_BY_ID,
      variables: { filmID: id }, // Use filmID parameter as expected by the GraphQL schema
    });

    if (!data?.film) {
      return {
        notFound: true,
      };
    }

    const graphqlFilm = data.film;

    // Convert GraphQL film to SWAPI format
    const film = convertGraphQLFilmToSWAPI(
      {
        id,
        title: graphqlFilm.title,
        director: graphqlFilm.director,
        releaseDate: graphqlFilm.releaseDate,
        openingCrawl: graphqlFilm.openingCrawl,
      },
      parseInt(id) - 1
    );

    // Convert related data
    const characters: Person[] = (
      graphqlFilm.characterConnection?.edges || []
    ).map((edge: CharacterEdge, index: number) =>
      convertGraphQLCharacterToSWAPI(edge.node, index)
    );

    return {
      props: {
        film,
        characters,
        planets: graphqlFilm.planetConnection?.edges || [],
        starships: graphqlFilm.starshipConnection?.edges || [],
      },
      revalidate: 86400, // Revalidate once per day
    };
  } catch (error) {
    console.error('Error fetching film details:', error);
    return {
      notFound: true,
    };
  }
};
