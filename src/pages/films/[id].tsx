'use client';

import { TextReveal } from '@/components/animated/text-reveal';
import { CharacterCard } from '@/components/card/character-card';
import { PlanetCard } from '@/components/card/planet-card';
import { StarshipCard } from '@/components/card/starship-card';
import { PageLayout } from '@/components/common';
import { Badge, Box, Container, Heading } from '@/components/ui';
import client from '@/lib/apollo-client';
import { GET_ALL_FILMS, GET_FILM_BY_ID } from '@/lib/queries';
import { Film as GraphQLFilm } from '@/schema/graphql';
import {
  Film,
  Person,
  Planet,
  Species,
  Starship,
  Vehicle,
} from '@/schema/swapi';
import { motion } from 'framer-motion';
import { Calendar, ClapperboardIcon } from 'lucide-react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';

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
  film: Film;
  characters: Person[];
  planets: Planet[];
  starships: Starship[];
  vehicles: Vehicle[];
  species: Species[];
}

// Convert GraphQL Film to SWAPI Film format
function convertGraphQLFilmToSWAPI(film: GraphQLFilm, index: number): Film {
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
    homeworld: '', // Not available in this context
    films: [], // Would need to fetch separately
    species: [], // Not available in GraphQL
    vehicles: [], // Not available in GraphQL
    starships: [], // Not available in GraphQL
    created: '', // Not available in GraphQL
    edited: '', // Not available in GraphQL
    url: `/characters/${index + 1}`,
  };
}

// Convert GraphQL Planet to SWAPI Planet format
function convertGraphQLPlanetToSWAPI(
  planet: PlanetEdge['node'],
  index: number
): Planet {
  return {
    name: planet.name,
    rotation_period: 'unknown',
    orbital_period: 'unknown',
    diameter: 'unknown',
    climate: planet.climates ? planet.climates.join(', ') : 'unknown',
    gravity: 'unknown',
    terrain: planet.terrains ? planet.terrains.join(', ') : 'unknown',
    surface_water: 'unknown',
    population: planet.population?.toString() || 'unknown',
    residents: [],
    films: [],
    created: '',
    edited: '',
    url: `/planets/${index + 1}`,
  };
}

// Convert GraphQL Starship to SWAPI Starship format
function convertGraphQLStarshipToSWAPI(
  starship: StarshipEdge['node'],
  index: number
): Starship {
  return {
    name: starship.name,
    model: starship.model || 'unknown',
    manufacturer: starship.manufacturers
      ? starship.manufacturers.join(', ')
      : 'unknown',
    cost_in_credits: 'unknown',
    length: 'unknown',
    max_atmosphering_speed: 'unknown',
    crew: 'unknown',
    passengers: 'unknown',
    cargo_capacity: 'unknown',
    consumables: 'unknown',
    hyperdrive_rating: 'unknown',
    MGLT: 'unknown',
    starship_class: starship.starshipClass || 'unknown',
    pilots: [],
    films: [],
    created: '',
    edited: '',
    url: `/starships/${index + 1}`,
  };
}

export default function FilmDetailPage({
  film,
  characters,
  planets,
  starships,
  vehicles,
  species,
}: FilmDetailPageProps) {
  console.log(starships);
  return (
    <>
      <Head>
        <title>{film.title} - Star Wars Explorer</title>
        <meta
          name="description"
          content={`Explore ${film.title} (Episode ${film.episode_id}) from the Star Wars saga. Directed by ${film.director} and released in ${new Date(film.release_date).getFullYear()}.`}
        />
        <meta
          property="og:title"
          content={`${film.title} - Star Wars Explorer`}
        />
        <meta
          property="og:description"
          content={film.opening_crawl.substring(0, 200) + '...'}
        />
      </Head>

      <PageLayout>
        {/* Main Content */}
        <Container size="7xl" className="py-12">
          {/* Film Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <h1 className="mx-auto mb-5 font-bold text-[3rem] md:text-[5rem] lg:text-[6rem] xl:text-[8rem] text-center">
                {film.title}
              </h1>
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
                style={{ width: '100%' }}
              >
                <Box>
                  <Heading
                    size="xl"
                    className="mb-8 text-foreground text-center"
                  >
                    Characters ({characters.length})
                  </Heading>
                  <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-2 h-full">
                    {characters.map((character, index) => (
                      <CharacterCard
                        key={character.url}
                        character={character}
                      />
                    ))}
                  </div>
                </Box>
              </motion.div>
            )}

            {/* Planets */}
            {planets.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                style={{ width: '100%' }}
              >
                <Box>
                  <Heading
                    size="xl"
                    className="mb-8 text-foreground text-center"
                  >
                    Planets ({planets.length})
                  </Heading>
                  <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-2 h-full">
                    {planets.map((planet, index) => (
                      <motion.div
                        key={planet.url}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <PlanetCard planetName={planet.name} />
                      </motion.div>
                    ))}
                  </div>
                </Box>
              </motion.div>
            )}

            {/* Starships */}
            {starships.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                style={{ width: '100%' }}
              >
                <Box>
                  <Heading
                    size="xl"
                    className="mb-8 text-foreground text-center"
                  >
                    Starships ({starships.length})
                  </Heading>
                  <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-2 h-full">
                    {starships.map((starship, index) => (
                      <motion.div
                        key={starship.url}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <StarshipCard starshipName={starship.name} />
                      </motion.div>
                    ))}
                  </div>
                </Box>
              </motion.div>
            )}
          </div>
        </Container>
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

    const planets: Planet[] = (graphqlFilm.planetConnection?.edges || []).map(
      (edge: PlanetEdge, index: number) =>
        convertGraphQLPlanetToSWAPI(edge.node, index)
    );

    const starships: Starship[] = (
      graphqlFilm.starshipConnection?.edges || []
    ).map((edge: StarshipEdge, index: number) =>
      convertGraphQLStarshipToSWAPI(edge.node, index)
    );

    const vehicles: Vehicle[] = [];
    const species: Species[] = [];

    return {
      props: {
        film,
        characters,
        planets,
        starships,
        vehicles,
        species,
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
