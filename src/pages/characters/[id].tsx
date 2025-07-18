'use client';

import { FilmCard, StarshipCard, VehicleCard } from '@/components/characters';
import {
  Film,
  Person,
  Planet,
  Species,
  Starship,
  Vehicle,
} from '@/types/swapi';
import { getCharacterImage } from '@/utils/assets';
import {
  batchFetchResources,
  extractIdFromUrl,
  getAllPeople,
  getPersonById,
} from '@/utils/swapi';
import {
  Box,
  Card,
  Image as ChakraImage,
  Container,
  Grid,
  Heading,
  HStack,
  Text,
  useBreakpointValue,
  VStack,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Eye, Globe, Ruler, User, Weight } from 'lucide-react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Image, { StaticImageData } from 'next/image';
import { useEffect, useState } from 'react';

interface CharacterDetailPageProps {
  paramsId: string;
  character: Person;
  homeworld: Planet | null;
  films: Film[];
  species: Species[];
  starships: Starship[];
  vehicles: Vehicle[];
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
  const isMobile = useBreakpointValue({ base: true, md: false });
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

      <Box minH="100vh" bg="black" color="white">
        {/* Main Content */}
        <Container maxW="7xl" py={12}>
          {/* Character Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <VStack gap={8} mb={12}>
              <Box textAlign="center">
                <Heading
                  size={{ base: '2xl', md: '4xl' }}
                  bgGradient="linear(to-r, yellow.400, orange.500)"
                  bgClip="text"
                  lineHeight="shorter"
                  mb={6}
                >
                  {character.name}
                </Heading>
              </Box>

              {/* Character Stats Cards */}
              <Grid
                templateColumns={{
                  base: '1fr',
                  md: 'repeat(2, 1fr)',
                  lg: 'repeat(3, 1fr)',
                }}
                gap={6}
                w="full"
                maxW="4xl"
              >
                {/* Physical Attributes */}
                <Card.Root
                  variant="elevated"
                  bg="gray.900"
                  borderColor="gray.700"
                >
                  <Card.Body p={6}>
                    {characterImage && (
                      <ChakraImage asChild>
                        <Image
                          src={characterImage}
                          alt={character.name}
                          width={100}
                          height={100}
                          style={{
                            borderRadius: '8px',
                            objectFit: 'cover',
                          }}
                        />
                      </ChakraImage>
                    )}
                    <HStack mb={4}>
                      <User size={20} color="rgb(96, 165, 250)" />
                      <Heading size="md" color="white">
                        Physical
                      </Heading>
                    </HStack>
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
                      <Text color="gray.300" fontSize="sm">
                        <Text as="span" color="blue.400" fontWeight="semibold">
                          Gender:
                        </Text>{' '}
                        {character.gender}
                      </Text>
                    </VStack>
                  </Card.Body>
                </Card.Root>

                {/* Appearance */}
                <Card.Root
                  variant="elevated"
                  bg="gray.900"
                  borderColor="gray.700"
                >
                  <Card.Body p={6}>
                    <HStack mb={4}>
                      <Eye size={20} color="rgb(96, 165, 250)" />
                      <Heading size="md" color="white">
                        Appearance
                      </Heading>
                    </HStack>
                    <VStack align="start" gap={3}>
                      <Text color="gray.300" fontSize="sm">
                        <Text as="span" color="blue.400" fontWeight="semibold">
                          Hair Color:
                        </Text>{' '}
                        {character.hair_color}
                      </Text>
                      <Text color="gray.300" fontSize="sm">
                        <Text as="span" color="blue.400" fontWeight="semibold">
                          Eye Color:
                        </Text>{' '}
                        {character.eye_color}
                      </Text>
                      <Text color="gray.300" fontSize="sm">
                        <Text as="span" color="blue.400" fontWeight="semibold">
                          Skin Color:
                        </Text>{' '}
                        {character.skin_color}
                      </Text>
                    </VStack>
                  </Card.Body>
                </Card.Root>

                {/* Origin */}
                <Card.Root
                  variant="elevated"
                  bg="gray.900"
                  borderColor="gray.700"
                >
                  <Card.Body p={6}>
                    <HStack mb={4}>
                      <Globe size={20} color="rgb(96, 165, 250)" />
                      <Heading size="md" color="white">
                        Origin
                      </Heading>
                    </HStack>
                    <VStack align="start" gap={3}>
                      <Text color="gray.300" fontSize="sm">
                        <Text as="span" color="blue.400" fontWeight="semibold">
                          Birth Year:
                        </Text>{' '}
                        {character.birth_year}
                      </Text>
                      {homeworld && (
                        <Text color="gray.300" fontSize="sm">
                          <Text
                            as="span"
                            color="blue.400"
                            fontWeight="semibold"
                          >
                            Homeworld:
                          </Text>{' '}
                          {homeworld.name}
                        </Text>
                      )}
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
                  </Card.Body>
                </Card.Root>
              </Grid>
            </VStack>
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

            {/* Starships */}
            {starships.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
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
                transition={{ duration: 0.6, delay: 0.8 }}
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
          </VStack>
        </Container>
      </Box>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    // Get first page of people to generate some paths
    const response = await getAllPeople(1);
    const paths = response.results.map((person) => ({
      params: { id: extractIdFromUrl(person.url) },
    }));

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
    const character = await getPersonById(id);

    // Fetch homeworld if available
    let homeworld = null;
    if (character.homeworld) {
      try {
        homeworld = await batchFetchResources<Planet>([character.homeworld]);
        homeworld = homeworld[0] || null;
      } catch (error) {
        console.warn('Could not fetch homeworld:', error);
      }
    }

    // Fetch all related resources in parallel
    const [films, species, starships, vehicles] = await Promise.all([
      batchFetchResources<Film>(character.films),
      batchFetchResources<Species>(character.species),
      batchFetchResources<Starship>(character.starships),
      batchFetchResources<Vehicle>(character.vehicles),
    ]);

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
