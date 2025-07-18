'use client';

import {
  Film,
  Person,
  Planet,
  Species,
  Starship,
  Vehicle,
} from '@/types/swapi';
import {
  batchFetchResources,
  extractIdFromUrl,
  getAllFilms,
  getFilmById,
} from '@/utils/swapi';
import {
  Badge,
  Box,
  Button,
  Card,
  Container,
  Flex,
  Grid,
  Heading,
  HStack,
  Spacer,
  Stack,
  Text,
  useBreakpointValue,
  VStack,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User, Users } from 'lucide-react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';

interface FilmDetailPageProps {
  film: Film;
  characters: Person[];
  planets: Planet[];
  starships: Starship[];
  vehicles: Vehicle[];
  species: Species[];
}

// Loading skeleton components

// SectionSkeleton component (unused but kept for future use)
// const SectionSkeleton = ({ title }: { title: string }) => (
//   <Box>
//     <Heading size="xl" color="white" mb={8} textAlign="center">
//       {title}
//     </Heading>
//     <Grid
//       templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
//       gap={6}
//     >
//       {Array.from({ length: 6 }).map((_, index) => (
//         <ResourceCardSkeleton key={index} />
//       ))}
//     </Grid>
//   </Box>
// );

// Resource card components
const CharacterCard = ({ character }: { character: Person }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <Link href={`/characters/${extractIdFromUrl(character.url)}`}>
      <Card.Root
        variant="elevated"
        bg="gray.900"
        borderColor="gray.700"
        _hover={{
          borderColor: 'yellow.400',
          shadow: 'lg',
          transform: 'translateY(-2px)',
        }}
        transition="all 0.3s ease"
        cursor="pointer"
      >
        <Card.Body p={6}>
          <Flex align="center" mb={3}>
            <User size={20} color="rgb(251, 191, 36)" />
            <Heading size="md" color="white" ml={2}>
              {character.name}
            </Heading>
          </Flex>
          <VStack align="start" gap={2}>
            <Text color="gray.300" fontSize="sm">
              <Text as="span" color="blue.400" fontWeight="semibold">
                Height:
              </Text>{' '}
              {character.height} cm
            </Text>
            <Text color="gray.300" fontSize="sm">
              <Text as="span" color="blue.400" fontWeight="semibold">
                Gender:
              </Text>{' '}
              {character.gender}
            </Text>
            <Text color="gray.300" fontSize="sm">
              <Text as="span" color="blue.400" fontWeight="semibold">
                Birth Year:
              </Text>{' '}
              {character.birth_year}
            </Text>
            {character.mass !== 'unknown' && (
              <Text color="gray.300" fontSize="sm">
                <Text as="span" color="blue.400" fontWeight="semibold">
                  Mass:
                </Text>{' '}
                {character.mass} kg
              </Text>
            )}
          </VStack>
        </Card.Body>
      </Card.Root>
    </Link>
  </motion.div>
);

const PlanetCard = ({ planet }: { planet: Planet }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <Card.Root
      variant="elevated"
      bg="gray.900"
      borderColor="gray.700"
      _hover={{
        borderColor: 'green.400',
        shadow: 'lg',
        transform: 'translateY(-2px)',
      }}
      transition="all 0.3s ease"
    >
      <Card.Body p={6}>
        <Heading size="md" color="white" mb={3}>
          {planet.name}
        </Heading>
        <VStack align="start" gap={2}>
          <Text color="gray.300" fontSize="sm">
            <Text as="span" color="blue.400" fontWeight="semibold">
              Climate:
            </Text>{' '}
            {planet.climate}
          </Text>
          <Text color="gray.300" fontSize="sm">
            <Text as="span" color="blue.400" fontWeight="semibold">
              Terrain:
            </Text>{' '}
            {planet.terrain}
          </Text>
          <Text color="gray.300" fontSize="sm">
            <Text as="span" color="blue.400" fontWeight="semibold">
              Population:
            </Text>{' '}
            {planet.population}
          </Text>
          {planet.diameter !== 'unknown' && (
            <Text color="gray.300" fontSize="sm">
              <Text as="span" color="blue.400" fontWeight="semibold">
                Diameter:
              </Text>{' '}
              {planet.diameter} km
            </Text>
          )}
        </VStack>
      </Card.Body>
    </Card.Root>
  </motion.div>
);

const StarshipCard = ({ starship }: { starship: Starship }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <Card.Root
      variant="elevated"
      bg="gray.900"
      borderColor="gray.700"
      _hover={{
        borderColor: 'red.400',
        shadow: 'lg',
        transform: 'translateY(-2px)',
      }}
      transition="all 0.3s ease"
    >
      <Card.Body p={6}>
        <Heading size="md" color="white" mb={2}>
          {starship.name}
        </Heading>
        <Text color="gray.400" fontSize="sm" mb={3}>
          {starship.model}
        </Text>
        <VStack align="start" gap={2}>
          <Text color="gray.300" fontSize="sm">
            <Text as="span" color="blue.400" fontWeight="semibold">
              Class:
            </Text>{' '}
            {starship.starship_class}
          </Text>
          <Text color="gray.300" fontSize="sm">
            <Text as="span" color="blue.400" fontWeight="semibold">
              Manufacturer:
            </Text>{' '}
            {starship.manufacturer}
          </Text>
          {starship.length !== 'unknown' && (
            <Text color="gray.300" fontSize="sm">
              <Text as="span" color="blue.400" fontWeight="semibold">
                Length:
              </Text>{' '}
              {starship.length} m
            </Text>
          )}
          <Text color="gray.300" fontSize="sm">
            <Text as="span" color="blue.400" fontWeight="semibold">
              Crew:
            </Text>{' '}
            {starship.crew}
          </Text>
        </VStack>
      </Card.Body>
    </Card.Root>
  </motion.div>
);

const VehicleCard = ({ vehicle }: { vehicle: Vehicle }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <Card.Root
      variant="elevated"
      bg="gray.900"
      borderColor="gray.700"
      _hover={{
        borderColor: 'purple.400',
        shadow: 'lg',
        transform: 'translateY(-2px)',
      }}
      transition="all 0.3s ease"
    >
      <Card.Body p={6}>
        <Heading size="md" color="white" mb={2}>
          {vehicle.name}
        </Heading>
        <Text color="gray.400" fontSize="sm" mb={3}>
          {vehicle.model}
        </Text>
        <VStack align="start" gap={2}>
          <Text color="gray.300" fontSize="sm">
            <Text as="span" color="blue.400" fontWeight="semibold">
              Class:
            </Text>{' '}
            {vehicle.vehicle_class}
          </Text>
          <Text color="gray.300" fontSize="sm">
            <Text as="span" color="blue.400" fontWeight="semibold">
              Manufacturer:
            </Text>{' '}
            {vehicle.manufacturer}
          </Text>
          {vehicle.length !== 'unknown' && (
            <Text color="gray.300" fontSize="sm">
              <Text as="span" color="blue.400" fontWeight="semibold">
                Length:
              </Text>{' '}
              {vehicle.length} m
            </Text>
          )}
          <Text color="gray.300" fontSize="sm">
            <Text as="span" color="blue.400" fontWeight="semibold">
              Crew:
            </Text>{' '}
            {vehicle.crew}
          </Text>
        </VStack>
      </Card.Body>
    </Card.Root>
  </motion.div>
);

const SpeciesCard = ({ species }: { species: Species }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <Card.Root
      variant="elevated"
      bg="gray.900"
      borderColor="gray.700"
      _hover={{
        borderColor: 'cyan.400',
        shadow: 'lg',
        transform: 'translateY(-2px)',
      }}
      transition="all 0.3s ease"
    >
      <Card.Body p={6}>
        <Heading size="md" color="white" mb={3}>
          {species.name}
        </Heading>
        <VStack align="start" gap={2}>
          <Text color="gray.300" fontSize="sm">
            <Text as="span" color="blue.400" fontWeight="semibold">
              Classification:
            </Text>{' '}
            {species.classification}
          </Text>
          <Text color="gray.300" fontSize="sm">
            <Text as="span" color="blue.400" fontWeight="semibold">
              Designation:
            </Text>{' '}
            {species.designation}
          </Text>
          {species.average_height !== 'unknown' && (
            <Text color="gray.300" fontSize="sm">
              <Text as="span" color="blue.400" fontWeight="semibold">
                Avg Height:
              </Text>{' '}
              {species.average_height} cm
            </Text>
          )}
          <Text color="gray.300" fontSize="sm">
            <Text as="span" color="blue.400" fontWeight="semibold">
              Language:
            </Text>{' '}
            {species.language}
          </Text>
        </VStack>
      </Card.Body>
    </Card.Root>
  </motion.div>
);

export default function FilmDetailPage({
  film,
  characters,
  planets,
  starships,
  vehicles,
  species,
}: FilmDetailPageProps) {
  const isMobile = useBreakpointValue({ base: true, md: false });

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

      <Box minH="100vh" bg="black" color="white">
        {/* Header */}
        <Box
          as="header"
          bg="gray.900"
          borderBottom="1px"
          borderColor="gray.700"
        >
          <Container maxW="7xl" py={6}>
            <Flex align="center">
              <Link href="/" passHref>
                <Heading
                  as="a"
                  size="lg"
                  color="yellow.400"
                  _hover={{ color: 'yellow.300' }}
                  transition="colors 0.2s"
                >
                  Star Wars Explorer
                </Heading>
              </Link>
              <Spacer />
              <Stack direction={{ base: 'column', md: 'row' }} gap={6}>
                <Link href="/films" passHref>
                  <Button
                    as="a"
                    variant="ghost"
                    color="gray.300"
                    _hover={{ color: 'white', bg: 'gray.800' }}
                    size={isMobile ? 'sm' : 'md'}
                  >
                    <ArrowLeft size={16} />
                    Back to Films
                  </Button>
                </Link>
                <Link href="/characters" passHref>
                  <Button
                    as="a"
                    variant="ghost"
                    color="gray.300"
                    _hover={{ color: 'white', bg: 'gray.800' }}
                    size={isMobile ? 'sm' : 'md'}
                  >
                    Characters
                  </Button>
                </Link>
              </Stack>
            </Flex>
          </Container>
        </Box>

        {/* Main Content */}
        <Container maxW="7xl" py={12}>
          {/* Film Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <VStack gap={6} mb={12} textAlign="center">
              <Badge
                colorScheme="blue"
                variant="solid"
                px={4}
                py={2}
                borderRadius="full"
                fontSize="lg"
                fontWeight="bold"
              >
                Episode {film.episode_id}
              </Badge>

              <Heading
                size={{ base: '2xl', md: '4xl' }}
                bgGradient="linear(to-r, yellow.400, orange.500)"
                bgClip="text"
                lineHeight="shorter"
              >
                {film.title}
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
                      Director:
                    </Text>{' '}
                    {film.director}
                  </Text>
                </HStack>
                <HStack>
                  <Users size={16} color="rgb(96, 165, 250)" />
                  <Text color="gray.300">
                    <Text as="span" color="blue.400" fontWeight="semibold">
                      Producer:
                    </Text>{' '}
                    {film.producer}
                  </Text>
                </HStack>
                <HStack>
                  <Calendar size={16} color="rgb(96, 165, 250)" />
                  <Text color="gray.300">
                    <Text as="span" color="blue.400" fontWeight="semibold">
                      Released:
                    </Text>{' '}
                    {new Date(film.release_date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </Text>
                </HStack>
              </Flex>
            </VStack>
          </motion.div>

          {/* Opening Crawl */}
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
                    Opening Crawl
                  </Heading>
                  <Box
                    bg="blackAlpha.600"
                    p={6}
                    borderRadius="lg"
                    border="1px solid"
                    borderColor="gray.600"
                  >
                    <Text
                      color="gray.300"
                      lineHeight="relaxed"
                      whiteSpace="pre-wrap"
                      textAlign="center"
                      fontSize={{ base: 'sm', md: 'md' }}
                    >
                      {film.opening_crawl}
                    </Text>
                  </Box>
                </Card.Body>
              </Card.Root>
            </Box>
          </motion.div>

          {/* Content Sections */}
          <VStack gap={16}>
            {/* Characters */}
            {characters.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                style={{ width: '100%' }}
              >
                <Box>
                  <Heading size="xl" color="white" mb={8} textAlign="center">
                    Characters ({characters.length})
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
                    {characters.map((character, index) => (
                      <motion.div
                        key={character.url}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <CharacterCard character={character} />
                      </motion.div>
                    ))}
                  </Grid>
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
                  <Heading size="xl" color="white" mb={8} textAlign="center">
                    Planets ({planets.length})
                  </Heading>
                  <Grid
                    templateColumns={{
                      base: '1fr',
                      md: 'repeat(2, 1fr)',
                      lg: 'repeat(3, 1fr)',
                    }}
                    gap={6}
                  >
                    {planets.map((planet, index) => (
                      <motion.div
                        key={planet.url}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <PlanetCard planet={planet} />
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
      </Box>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const films = await getAllFilms();
    const paths = films.map((film) => ({
      params: { id: extractIdFromUrl(film.url) },
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
    const film = await getFilmById(id);

    // Fetch all related resources in parallel
    const [characters, planets, starships, vehicles, species] =
      await Promise.all([
        batchFetchResources<Person>(film.characters),
        batchFetchResources<Planet>(film.planets),
        batchFetchResources<Starship>(film.starships),
        batchFetchResources<Vehicle>(film.vehicles),
        batchFetchResources<Species>(film.species),
      ]);

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
