'use client';

import { FilmCard } from '@/components/characters';
import { PageLayout } from '@/components/common';
import { PlanetCard, StarshipCard } from '@/components/films/resource-cards';
import {
  Box,
  Card,
  CardContent,
  Container,
  Flex,
  Heading,
  HStack,
  Text,
  VStack,
} from '@/components/ui';
import {
  Film,
  Person,
  Planet,
  Species,
  Starship,
  Vehicle,
} from '@/schema/swapi';
import { getCharacterImage } from '@/utils/assets';
import { extractIdFromUrl } from '@/utils/swapi';
import { motion } from 'framer-motion';
import { Calendar, Eye, Globe, Ruler, User, Weight } from 'lucide-react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';

// SWAPI.tech API Response Interfaces
interface SwapiCharacterResponse {
  message: string;
  result: {
    properties: {
      name: string;
      gender: string;
      skin_color: string;
      hair_color: string;
      height: string;
      eye_color: string;
      mass: string;
      homeworld: string;
      birth_year: string;
      url: string;
      created: string;
      edited: string;
    };
    description: string;
    _id: string;
    uid: string;
    __v: number;
  };
}

interface SwapiPlanetResponse {
  message: string;
  result: {
    properties: {
      name: string;
      diameter: string;
      rotation_period: string;
      orbital_period: string;
      gravity: string;
      population: string;
      climate: string;
      terrain: string;
      surface_water: string;
      url: string;
    };
  };
}

interface SwapiFilmResponse {
  message: string;
  result: {
    properties: {
      title: string;
      episode_id: number;
      opening_crawl: string;
      director: string;
      producer: string;
      release_date: string;
      url: string;
    };
  };
}

interface CharacterDetailPageProps {
  paramsId: string;
  character: Person;
  homeworld: Planet | null;
  films: Film[];
  species: Species[];
  starships: Starship[];
  vehicles: Vehicle[];
}

// Convert SWAPI.tech Character to SWAPI Person format
function convertSwapiCharacterToSWAPI(
  char: SwapiCharacterResponse['result']['properties'],
  id: string
): Person {
  return {
    name: char.name,
    height: char.height || 'unknown',
    mass: char.mass || 'unknown',
    hair_color: char.hair_color || 'unknown',
    skin_color: char.skin_color || 'unknown',
    eye_color: char.eye_color || 'unknown',
    birth_year: char.birth_year || 'unknown',
    gender: char.gender || 'unknown',
    homeworld: char.homeworld || 'unknown',
    films: [], // Would need to fetch separately
    species: [], // Not available in this context
    vehicles: [], // Not available in this context
    starships: [], // Not available in this context
    created: char.created || '',
    edited: char.edited || '',
    url: `/characters/${id}`,
  };
}

// Convert SWAPI.tech Planet to SWAPI Planet format
function convertSwapiPlanetToSWAPI(
  planet: SwapiPlanetResponse['result']['properties']
): Planet {
  return {
    name: planet.name,
    rotation_period: planet.rotation_period || 'unknown',
    orbital_period: planet.orbital_period || 'unknown',
    diameter: planet.diameter || 'unknown',
    climate: planet.climate || 'unknown',
    gravity: planet.gravity || 'unknown',
    terrain: planet.terrain || 'unknown',
    surface_water: planet.surface_water || 'unknown',
    population: planet.population || 'unknown',
    residents: [],
    films: [],
    created: '',
    edited: '',
    url: planet.url || '',
  };
}

export default function CharacterDetailPage({
  paramsId,
  character,
  homeworld,
  films,
  species,
  starships,
  vehicles,
}: CharacterDetailPageProps) {
  const [characterImage, setCharacterImage] = useState<string | null>(null);
  const characterId = extractIdFromUrl(character.url);

  useEffect(() => {
    const loadImage = async () => {
      try {
        const image = await getCharacterImage(characterId);
        if (image) setCharacterImage(image.src);
      } catch (error) {
        console.warn(
          `Failed to load character image for ${characterId}:`,
          error
        );
      }
    };
    loadImage();
  }, [characterId]);

  return (
    <>
      <Head>
        <title>{character.name} - Star Wars Explorer</title>
        <meta
          name="description"
          content={`Learn about ${character.name}, a character from the Star Wars universe. Height: ${character.height}cm, Gender: ${character.gender}, Birth Year: ${character.birth_year}.`}
        />
        <meta
          property="og:title"
          content={`${character.name} - Star Wars Explorer`}
        />
        <meta
          property="og:description"
          content={`Star Wars character: ${character.name}`}
        />
      </Head>

      <PageLayout currentPage="characters">
        {/* Main Content */}
        <Container size="7xl" className="py-12">
          {/* Character Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <VStack gap="lg" className="mb-12 text-center">
              {characterImage && (
                <div className="relative rounded-full w-24 h-24 overflow-hidden">
                  <Image
                    src={characterImage}
                    alt={character.name}
                    width={100}
                    height={100}
                    className="object-cover"
                  />
                </div>
              )}

              <Heading size="4xl" variant="gradient" className="leading-tight">
                {character.name}
              </Heading>

              <Flex
                className="md:flex-row flex-col"
                gap="lg"
                wrap="wrap"
                justify="center"
                align="center"
              >
                <HStack>
                  <User size={16} className="text-secondary" />
                  <Text variant="muted">
                    <Text as="span" variant="secondary" weight="semibold">
                      Gender:
                    </Text>{' '}
                    {character.gender}
                  </Text>
                </HStack>
                <HStack>
                  <Calendar size={16} className="text-secondary" />
                  <Text variant="muted">
                    <Text as="span" variant="secondary" weight="semibold">
                      Birth Year:
                    </Text>{' '}
                    {character.birth_year}
                  </Text>
                </HStack>
                <HStack>
                  <Globe size={16} className="text-secondary" />
                  <Text variant="muted">
                    <Text as="span" variant="secondary" weight="semibold">
                      Homeworld:
                    </Text>{' '}
                    {homeworld?.name || 'Unknown'}
                  </Text>
                </HStack>
              </Flex>
            </VStack>
          </motion.div>

          {/* Character Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Box className="mb-16">
              <Card className="bg-card mx-auto border-border max-w-4xl">
                <CardContent className="p-8">
                  <Heading
                    size="xl"
                    variant="primary"
                    className="mb-6 text-center"
                  >
                    Character Details
                  </Heading>

                  <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {/* Physical Attributes */}
                    <Box className="bg-background/60 p-6 border border-border rounded-lg">
                      <HStack className="mb-4">
                        <User size={20} className="text-secondary" />
                        <Heading size="md" className="text-foreground">
                          Physical
                        </Heading>
                      </HStack>
                      <VStack align="start" gap="sm">
                        <HStack>
                          <Ruler size={16} className="text-secondary" />
                          <Text variant="muted" size="sm">
                            <Text
                              as="span"
                              variant="secondary"
                              weight="semibold"
                            >
                              Height:
                            </Text>{' '}
                            {character.height}cm
                          </Text>
                        </HStack>
                        {character.mass !== 'unknown' && (
                          <HStack>
                            <Weight size={16} className="text-secondary" />
                            <Text variant="muted" size="sm">
                              <Text
                                as="span"
                                variant="secondary"
                                weight="semibold"
                              >
                                Mass:
                              </Text>{' '}
                              {character.mass}kg
                            </Text>
                          </HStack>
                        )}
                      </VStack>
                    </Box>

                    {/* Appearance */}
                    <Box className="bg-background/60 p-6 border border-border rounded-lg">
                      <HStack className="mb-4">
                        <Eye size={20} className="text-secondary" />
                        <Heading size="md" className="text-foreground">
                          Appearance
                        </Heading>
                      </HStack>
                      <VStack align="start" gap="sm">
                        <Text variant="muted" size="sm">
                          <Text as="span" variant="secondary" weight="semibold">
                            Hair Color:
                          </Text>{' '}
                          {character.hair_color}
                        </Text>
                        <Text variant="muted" size="sm">
                          <Text as="span" variant="secondary" weight="semibold">
                            Eye Color:
                          </Text>{' '}
                          {character.eye_color}
                        </Text>
                        <Text variant="muted" size="sm">
                          <Text as="span" variant="secondary" weight="semibold">
                            Skin Color:
                          </Text>{' '}
                          {character.skin_color}
                        </Text>
                      </VStack>
                    </Box>

                    {/* Origin */}
                    <Box className="bg-background/60 p-6 border border-border rounded-lg">
                      <HStack className="mb-4">
                        <Globe size={20} className="text-secondary" />
                        <Heading size="md" className="text-foreground">
                          Origin
                        </Heading>
                      </HStack>
                      <VStack align="start" gap="sm">
                        <Text variant="muted" size="sm">
                          <Text as="span" variant="secondary" weight="semibold">
                            Birth Year:
                          </Text>{' '}
                          {character.birth_year}
                        </Text>
                        <Text variant="muted" size="sm">
                          <Text as="span" variant="secondary" weight="semibold">
                            Homeworld:
                          </Text>{' '}
                          {homeworld?.name || 'Unknown'}
                        </Text>
                        {species.length > 0 && (
                          <Text variant="muted" size="sm">
                            <Text
                              as="span"
                              variant="secondary"
                              weight="semibold"
                            >
                              Species:
                            </Text>{' '}
                            {species[0].name}
                          </Text>
                        )}
                      </VStack>
                    </Box>
                  </div>
                </CardContent>
              </Card>
            </Box>
          </motion.div>

          {/* Content Sections */}
          <VStack gap="xl">
            {/* Films */}
            {films.length > 0 && (
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
                    Films ({films.length})
                  </Heading>
                  <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {films.map((film, index) => (
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
                </Box>
              </motion.div>
            )}

            {/* Homeworld */}
            {homeworld && (
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
                    Homeworld
                  </Heading>
                  <Box className="mx-auto max-w-md">
                    <PlanetCard planet={homeworld} />
                  </Box>
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
                  <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {starships.map((starship, index) => (
                      <motion.div
                        key={starship.url}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <StarshipCard starship={starship} />
                      </motion.div>
                    ))}
                  </div>
                </Box>
              </motion.div>
            )}
          </VStack>
        </Container>
      </PageLayout>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    // Fetch the first 10 characters from SWAPI.tech
    const responses = await Promise.all(
      Array.from({ length: 10 }, (_, i) =>
        fetch(`https://www.swapi.tech/api/people/${i + 1}`)
          .then((res) => (res.ok ? res.json() : null))
          .catch(() => null)
      )
    );

    const paths = responses
      .map((response, index) => {
        if (response?.message === 'ok') {
          return { params: { id: (index + 1).toString() } };
        }
        return null;
      })
      .filter((path): path is { params: { id: string } } => path !== null);

    return {
      paths,
      fallback: 'blocking', // Generate pages on-demand for other characters
    };
  } catch (error) {
    console.error('Error getting character paths:', error);
    return {
      paths: [],
      fallback: 'blocking',
    };
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const id = params?.id as string;

    // Fetch character details from SWAPI.tech
    const characterResponse = await fetch(
      `https://www.swapi.tech/api/people/${id}`
    );
    if (!characterResponse.ok) {
      return { notFound: true };
    }

    const characterData: SwapiCharacterResponse =
      await characterResponse.json();

    if (characterData.message !== 'ok') {
      return { notFound: true };
    }

    // Convert SWAPI.tech character to SWAPI format
    const character = convertSwapiCharacterToSWAPI(
      characterData.result.properties,
      id
    );

    // Fetch homeworld if available
    let homeworld: Planet | null = null;
    if (characterData.result.properties.homeworld) {
      try {
        const homeworldResponse = await fetch(
          characterData.result.properties.homeworld
        );
        if (homeworldResponse.ok) {
          const homeworldData: SwapiPlanetResponse =
            await homeworldResponse.json();
          if (homeworldData.message === 'ok') {
            homeworld = convertSwapiPlanetToSWAPI(
              homeworldData.result.properties
            );
          }
        }
      } catch (error) {
        console.error('Error fetching homeworld:', error);
      }
    }

    // For now, return empty arrays for films, species, starships, and vehicles
    // These could be fetched from additional API calls if needed
    const films: Film[] = [];
    const species: Species[] = [];
    const starships: Starship[] = [];
    const vehicles: Vehicle[] = [];

    return {
      props: {
        paramsId: id,
        character,
        homeworld,
        films,
        species,
        starships,
        vehicles,
      },
      revalidate: 86400, // Revalidate once per day
    };
  } catch (error) {
    console.error('Error fetching character details:', error);
    return {
      notFound: true,
    };
  }
};
