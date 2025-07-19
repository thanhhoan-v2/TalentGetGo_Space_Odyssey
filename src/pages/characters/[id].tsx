'use client';

import { FilmCard } from '@/components/characters';
import { PageLayout } from '@/components/common';
import {
  PlanetCard,
  SpeciesCard,
  StarshipCard,
  VehicleCard,
} from '@/components/films';
import {
  Film,
  Person,
  Planet,
  Species,
  Starship,
  Vehicle,
} from '@/schema/swapi';
import { getCharacterImage } from '@/utils/assets';
import {
  Badge,
  Box,
  Card,
  Image as ChakraImage,
  Container,
  Flex,
  Grid,
  Heading,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Calendar, Eye, Globe, Ruler, User, Weight } from 'lucide-react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Image, { StaticImageData } from 'next/image';
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
  const [characterImage, setCharacterImage] = useState<StaticImageData | null>(
    null
  );

  // Load character image on component mount
  useEffect(() => {
    const loadImage = async () => {
      const image = await getCharacterImage(paramsId);
      setCharacterImage(image);
    };
    loadImage();
  }, [paramsId]);

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
        <Container maxW="7xl" py={12}>
          {/* Character Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <VStack gap={6} mb={12} textAlign="center">
              <Badge
                colorScheme="yellow"
                variant="solid"
                px={4}
                py={2}
                borderRadius="full"
                fontSize="lg"
                fontWeight="bold"
              >
                Character Profile
              </Badge>

              <Heading
                size={{ base: '2xl', md: '4xl' }}
                bgGradient="linear(to-r, yellow.400, orange.500)"
                bgClip="text"
                lineHeight="shorter"
              >
                {character.name}
              </Heading>

              <Flex
                direction={{ base: 'column', md: 'row' }}
                gap={6}
                wrap="wrap"
                justify="center"
                align="center"
              >
                <HStack>
                  <User size={16} color="rgb(96, 165, 250)" />
                  <Text color="gray.300">
                    <Text as="span" color="blue.400" fontWeight="semibold">
                      Gender:
                    </Text>{' '}
                    {character.gender}
                  </Text>
                </HStack>
                <HStack>
                  <Calendar size={16} color="rgb(96, 165, 250)" />
                  <Text color="gray.300">
                    <Text as="span" color="blue.400" fontWeight="semibold">
                      Birth Year:
                    </Text>{' '}
                    {character.birth_year}
                  </Text>
                </HStack>
                <HStack>
                  <Globe size={16} color="rgb(96, 165, 250)" />
                  <Text color="gray.300">
                    <Text as="span" color="blue.400" fontWeight="semibold">
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
            <Box mb={16}>
              <Card.Root
                variant="elevated"
                bg="gray.900"
                borderColor="gray.700"
                maxW="4xl"
                mx="auto"
              >
                <Card.Body p={8}>
                  <Heading
                    size="xl"
                    color="yellow.400"
                    mb={6}
                    textAlign="center"
                  >
                    Character Details
                  </Heading>

                  <Grid
                    templateColumns={{
                      base: '1fr',
                      md: 'repeat(2, 1fr)',
                      lg: 'repeat(3, 1fr)',
                    }}
                    gap={6}
                  >
                    {/* Physical Attributes */}
                    <Box
                      bg="blackAlpha.600"
                      p={6}
                      borderRadius="lg"
                      border="1px solid"
                      borderColor="gray.600"
                    >
                      <HStack mb={4}>
                        <User size={20} color="rgb(96, 165, 250)" />
                        <Heading size="md" color="white">
                          Physical
                        </Heading>
                      </HStack>
                      {characterImage && (
                        <Box mb={4} textAlign="center">
                          <ChakraImage asChild>
                            <Image
                              src={characterImage}
                              alt={character.name}
                              width={100}
                              height={100}
                              style={{
                                borderRadius: '8px',
                                objectFit: 'cover',
                                margin: '0 auto',
                              }}
                            />
                          </ChakraImage>
                        </Box>
                      )}
                      <VStack align="start" gap={3}>
                        <HStack>
                          <Ruler size={16} color="rgb(96, 165, 250)" />
                          <Text color="gray.300" fontSize="sm">
                            <Text
                              as="span"
                              color="blue.400"
                              fontWeight="semibold"
                            >
                              Height:
                            </Text>{' '}
                            {character.height}cm
                          </Text>
                        </HStack>
                        {character.mass !== 'unknown' && (
                          <HStack>
                            <Weight size={16} color="rgb(96, 165, 250)" />
                            <Text color="gray.300" fontSize="sm">
                              <Text
                                as="span"
                                color="blue.400"
                                fontWeight="semibold"
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
                    <Box
                      bg="blackAlpha.600"
                      p={6}
                      borderRadius="lg"
                      border="1px solid"
                      borderColor="gray.600"
                    >
                      <HStack mb={4}>
                        <Eye size={20} color="rgb(96, 165, 250)" />
                        <Heading size="md" color="white">
                          Appearance
                        </Heading>
                      </HStack>
                      <VStack align="start" gap={3}>
                        <Text color="gray.300" fontSize="sm">
                          <Text
                            as="span"
                            color="blue.400"
                            fontWeight="semibold"
                          >
                            Hair Color:
                          </Text>{' '}
                          {character.hair_color}
                        </Text>
                        <Text color="gray.300" fontSize="sm">
                          <Text
                            as="span"
                            color="blue.400"
                            fontWeight="semibold"
                          >
                            Eye Color:
                          </Text>{' '}
                          {character.eye_color}
                        </Text>
                        <Text color="gray.300" fontSize="sm">
                          <Text
                            as="span"
                            color="blue.400"
                            fontWeight="semibold"
                          >
                            Skin Color:
                          </Text>{' '}
                          {character.skin_color}
                        </Text>
                      </VStack>
                    </Box>

                    {/* Origin */}
                    <Box
                      bg="blackAlpha.600"
                      p={6}
                      borderRadius="lg"
                      border="1px solid"
                      borderColor="gray.600"
                    >
                      <HStack mb={4}>
                        <Globe size={20} color="rgb(96, 165, 250)" />
                        <Heading size="md" color="white">
                          Origin
                        </Heading>
                      </HStack>
                      <VStack align="start" gap={3}>
                        <Text color="gray.300" fontSize="sm">
                          <Text
                            as="span"
                            color="blue.400"
                            fontWeight="semibold"
                          >
                            Birth Year:
                          </Text>{' '}
                          {character.birth_year}
                        </Text>
                        <Text color="gray.300" fontSize="sm">
                          <Text
                            as="span"
                            color="blue.400"
                            fontWeight="semibold"
                          >
                            Homeworld:
                          </Text>{' '}
                          {homeworld?.name || 'Unknown'}
                        </Text>
                        {species.length > 0 && (
                          <Text color="gray.300" fontSize="sm">
                            <Text
                              as="span"
                              color="blue.400"
                              fontWeight="semibold"
                            >
                              Species:
                            </Text>{' '}
                            {species[0].name}
                          </Text>
                        )}
                      </VStack>
                    </Box>
                  </Grid>
                </Card.Body>
              </Card.Root>
            </Box>
          </motion.div>

          {/* Content Sections */}
          <VStack gap={16}>
            {/* Films */}
            {films.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                style={{ width: '100%' }}
              >
                <Box>
                  <Heading size="xl" color="white" mb={8} textAlign="center">
                    Films ({films.length})
                  </Heading>
                  <Grid
                    templateColumns={{
                      base: '1fr',
                      md: 'repeat(2, 1fr)',
                      lg: 'repeat(3, 1fr)',
                      xl: 'repeat(4, 1fr)',
                    }}
                    gap={6}
                  >
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
                  </Grid>
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
                  <Heading size="xl" color="white" mb={8} textAlign="center">
                    Homeworld
                  </Heading>
                  <Box maxW="md" mx="auto">
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
                  <Heading size="xl" color="white" mb={8} textAlign="center">
                    Starships ({starships.length})
                  </Heading>
                  <Grid
                    templateColumns={{
                      base: '1fr',
                      md: 'repeat(2, 1fr)',
                      lg: 'repeat(3, 1fr)',
                    }}
                    gap={6}
                  >
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
                  </Grid>
                </Box>
              </motion.div>
            )}

            {/* Vehicles */}
            {vehicles.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                style={{ width: '100%' }}
              >
                <Box>
                  <Heading size="xl" color="white" mb={8} textAlign="center">
                    Vehicles ({vehicles.length})
                  </Heading>
                  <Grid
                    templateColumns={{
                      base: '1fr',
                      md: 'repeat(2, 1fr)',
                      lg: 'repeat(3, 1fr)',
                    }}
                    gap={6}
                  >
                    {vehicles.map((vehicle, index) => (
                      <motion.div
                        key={vehicle.url}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <VehicleCard vehicle={vehicle} />
                      </motion.div>
                    ))}
                  </Grid>
                </Box>
              </motion.div>
            )}

            {/* Species */}
            {species.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                style={{ width: '100%' }}
              >
                <Box>
                  <Heading size="xl" color="white" mb={8} textAlign="center">
                    Species ({species.length})
                  </Heading>
                  <Grid
                    templateColumns={{
                      base: '1fr',
                      md: 'repeat(2, 1fr)',
                      lg: 'repeat(3, 1fr)',
                    }}
                    gap={6}
                  >
                    {species.map((specie, index) => (
                      <motion.div
                        key={specie.url}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <SpeciesCard species={specie} />
                      </motion.div>
                    ))}
                  </Grid>
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
