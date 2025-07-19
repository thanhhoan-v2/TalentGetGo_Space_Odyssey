'use client';

import { PageHeader } from '@/components/common';
import client from '@/lib/apollo-client';
import { GET_ALL_FILMS } from '@/lib/queries';
import { Film } from '@/schema/graphql';
import {
  Badge,
  Box,
  Button,
  Card,
  Center,
  Container,
  Grid,
  Heading,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Film as FilmIcon,
  Globe,
  Play,
  Rocket,
  Sparkles,
  Users,
} from 'lucide-react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';

interface HomeProps {
  featuredFilms: Film[];
}

export default function Home({ featuredFilms }: HomeProps) {
  return (
    <>
      <Head>
        <title>Star Wars Explorer - Journey Through the Galaxy</title>
        <meta
          name="description"
          content="Explore the vast Star Wars universe. Discover films, characters, planets, and starships from a galaxy far, far away."
        />
        <meta property="og:title" content="Star Wars Explorer" />
        <meta
          property="og:description"
          content="Journey through the Star Wars galaxy"
        />
      </Head>

      <Box bg="black" color="white" overflow="hidden">
        {/* Hero Section with Full-Screen Video Background */}
        <Box position="relative" minH="100vh" display="flex" overflow="hidden">
          {/* Transparent Navbar Overlay */}
          <Box position="absolute" top={0} left={0} right={0} zIndex={1000}>
            <PageHeader transparent />
          </Box>

          {/* Full-Screen Video Background */}
          <video
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100vh',
              objectFit: 'cover',
              zIndex: 1,
            }}
            src="/landing-video.mp4"
            autoPlay
            muted
            loop
            playsInline
          />

          {/* Dark Overlay for better readability */}
          <Box position="absolute" inset="0" bg="blackAlpha.400" zIndex={2} />

          {/* Content Overlay */}
          <Container
            maxW="7xl"
            flex="1"
            display="flex"
            alignItems="center"
            py={20}
            position="relative"
            zIndex={3}
          >
            <VStack gap={12} textAlign="center" w="full">
              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.4 }}
              >
                <Text
                  fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }}
                  color="white"
                  maxW="4xl"
                  lineHeight="tall"
                  textAlign="center"
                  textShadow="0 0 15px rgba(0, 0, 0, 1)"
                  bg="blackAlpha.400"
                  p={8}
                  borderRadius="xl"
                  backdropFilter="blur(20px)"
                  border="1px solid"
                  borderColor="whiteAlpha.200"
                >
                  Journey through the vast Star Wars universe. Explore epic
                  films, legendary characters, mysterious planets, and
                  incredible starships from a galaxy far, far away.
                </Text>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.8 }}
              >
                <HStack gap={6} wrap="wrap" justify="center">
                  <Link href="/films">
                    <Button
                      size={{ base: 'lg', md: 'xl' }}
                      colorScheme="blue"
                      bg="blue.600"
                      _hover={{
                        bg: 'blue.500',
                        transform: 'translateY(-3px)',
                        boxShadow: '0 25px 50px rgba(59, 130, 246, 0.8)',
                      }}
                      transition="all 0.3s"
                      px={10}
                      py={8}
                      boxShadow="0 15px 35px rgba(0, 0, 0, 0.7)"
                      filter="drop-shadow(0 0 10px rgba(59, 130, 246, 0.5))"
                    >
                      <HStack gap={3}>
                        <Play size={24} />
                        <span>Explore Films</span>
                      </HStack>
                    </Button>
                  </Link>

                  <Link href="/characters">
                    <Button
                      size={{ base: 'lg', md: 'xl' }}
                      variant="outline"
                      borderColor="yellow.400"
                      borderWidth="2px"
                      color="yellow.400"
                      bg="blackAlpha.400"
                      backdropFilter="blur(20px)"
                      _hover={{
                        bg: 'yellow.400',
                        color: 'black',
                        transform: 'translateY(-3px)',
                        boxShadow: '0 25px 50px rgba(251, 191, 36, 0.8)',
                      }}
                      transition="all 0.3s"
                      px={10}
                      py={8}
                      boxShadow="0 15px 35px rgba(0, 0, 0, 0.7)"
                      filter="drop-shadow(0 0 10px rgba(251, 191, 36, 0.5))"
                    >
                      <HStack gap={3}>
                        <Users size={24} />
                        <span>Meet Characters</span>
                      </HStack>
                    </Button>
                  </Link>
                </HStack>
              </motion.div>
            </VStack>
          </Container>
        </Box>

        {/* Featured Films Section */}
        <Container maxW="7xl" py={20}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <VStack gap={16}>
              <VStack gap={4} textAlign="center">
                <Heading
                  size={{ base: 'xl', md: '2xl', lg: '3xl' }}
                  bgGradient="linear(to-r, yellow.400, orange.400)"
                  bgClip="text"
                  display="flex"
                  alignItems="center"
                  gap={3}
                >
                  <Sparkles size={32} />
                  Featured Films
                  <Sparkles size={32} />
                </Heading>
                <Text color="gray.400" fontSize="lg" maxW="2xl">
                  Discover the epic saga that changed cinema forever
                </Text>
              </VStack>

              <Grid
                templateColumns={{
                  base: '1fr',
                  md: 'repeat(2, 1fr)',
                  lg: 'repeat(3, 1fr)',
                }}
                gap={8}
                w="full"
              >
                {featuredFilms && featuredFilms.length > 0 ? (
                  featuredFilms.map((film, index) => (
                    <motion.div
                      key={film.id}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.2 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -10 }}
                    >
                      <Card.Root
                        variant="elevated"
                        bg="gray.900"
                        borderColor="gray.700"
                        _hover={{
                          borderColor: 'blue.500',
                          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
                        }}
                        transition="all 0.3s"
                        h="full"
                      >
                        <Card.Body p={6}>
                          <VStack align="start" gap={4} h="full">
                            <HStack justify="space-between" w="full">
                              <Badge
                                colorScheme="blue"
                                fontSize="sm"
                                px={3}
                                py={1}
                              >
                                Episode {film.id}
                              </Badge>
                              <FilmIcon size={20} color="#60a5fa" />
                            </HStack>

                            <Heading size="lg" color="white" lineHeight="short">
                              {film.title}
                            </Heading>

                            <Text color="gray.400" fontSize="sm">
                              Directed by {film.director} •{' '}
                              {new Date(film.releaseDate).getFullYear()}
                            </Text>

                            <Text
                              color="gray.300"
                              fontSize="sm"
                              lineHeight="relaxed"
                              flex="1"
                            >
                              {film.openingCrawl.substring(0, 150)}...
                            </Text>

                            <Link href={`/films/${film.id}`}>
                              <Button
                                colorScheme="yellow"
                                bg="yellow.400"
                                color="black"
                                _hover={{
                                  bg: 'yellow.300',
                                  transform: 'translateX(5px)',
                                }}
                                transition="all 0.2s"
                                w="full"
                              >
                                <HStack gap={2}>
                                  <span>Learn More</span>
                                  <ArrowRight size={16} />
                                </HStack>
                              </Button>
                            </Link>
                          </VStack>
                        </Card.Body>
                      </Card.Root>
                    </motion.div>
                  ))
                ) : (
                  <Box gridColumn="1 / -1" textAlign="center" py={12}>
                    <Text color="gray.400" fontSize="lg">
                      No featured films available at the moment.
                    </Text>
                  </Box>
                )}
              </Grid>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <Link href="/films">
                  <Button
                    variant="outline"
                    borderColor="blue.400"
                    color="blue.400"
                    _hover={{
                      bg: 'blue.400',
                      color: 'white',
                      transform: 'scale(1.05)',
                    }}
                    size="lg"
                    px={8}
                  >
                    <HStack gap={2}>
                      <span>View All Films</span>
                      <ArrowRight size={20} />
                    </HStack>
                  </Button>
                </Link>
              </motion.div>
            </VStack>
          </motion.div>
        </Container>

        {/* Features Section */}
        <Box bg="gray.900" py={20}>
          <Container maxW="7xl">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <VStack gap={16}>
                <VStack gap={4} textAlign="center">
                  <Heading
                    size={{ base: 'xl', md: '2xl', lg: '3xl' }}
                    color="white"
                  >
                    Explore the Galaxy
                  </Heading>
                  <Text color="gray.400" fontSize="lg" maxW="2xl">
                    Dive deep into every corner of the Star Wars universe
                  </Text>
                </VStack>

                <Grid
                  templateColumns={{
                    base: '1fr',
                    md: 'repeat(2, 1fr)',
                    lg: 'repeat(4, 1fr)',
                  }}
                  gap={8}
                  w="full"
                >
                  {[
                    {
                      icon: FilmIcon,
                      title: 'Films',
                      description: 'Epic stories that changed cinema forever',
                      color: 'blue.500',
                      href: '/films',
                    },
                    {
                      icon: Users,
                      title: 'Characters',
                      description:
                        'Heroes, villains, and legends of the galaxy',
                      color: 'yellow.500',
                      href: '/characters',
                    },
                    {
                      icon: Globe,
                      title: 'Planets',
                      description: 'Explore worlds across the galaxy',
                      color: 'green.500',
                      href: '#',
                    },
                    {
                      icon: Rocket,
                      title: 'Starships',
                      description: 'Vessels that travel among the stars',
                      color: 'red.500',
                      href: '#',
                    },
                  ].map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -5 }}
                    >
                      <Link href={feature.href}>
                        <Card.Root
                          variant="elevated"
                          bg="gray.800"
                          borderColor="gray.600"
                          _hover={{
                            borderColor: feature.color,
                            bg: 'gray.700',
                          }}
                          transition="all 0.3s"
                          cursor="pointer"
                          h="full"
                        >
                          <Card.Body p={6} textAlign="center">
                            <VStack gap={4}>
                              <Center
                                w={16}
                                h={16}
                                bg={feature.color}
                                borderRadius="full"
                                boxShadow={`0 0 20px ${feature.color}30`}
                              >
                                <feature.icon size={32} color="white" />
                              </Center>
                              <Heading size="lg" color="white">
                                {feature.title}
                              </Heading>
                              <Text color="gray.400" textAlign="center">
                                {feature.description}
                              </Text>
                            </VStack>
                          </Card.Body>
                        </Card.Root>
                      </Link>
                    </motion.div>
                  ))}
                </Grid>
              </VStack>
            </motion.div>
          </Container>
        </Box>

        {/* Footer CTA */}
        <Container maxW="7xl" py={20}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card.Root
              variant="elevated"
              bg="gray.900"
              borderColor="yellow.400"
              borderWidth="2px"
            >
              <Card.Body p={12} textAlign="center">
                <VStack gap={6}>
                  <Heading
                    size={{ base: 'lg', md: 'xl', lg: '2xl' }}
                    bgGradient="linear(to-r, yellow.400, orange.400)"
                    bgClip="text"
                  >
                    May the Force Be With You
                  </Heading>
                  <Text color="gray.300" fontSize="lg" maxW="2xl">
                    Begin your journey through the Star Wars galaxy today.
                    Discover the stories, characters, and worlds that have
                    inspired generations.
                  </Text>
                  <HStack gap={4}>
                    <Link href="/films">
                      <Button
                        colorScheme="yellow"
                        bg="yellow.400"
                        color="black"
                        size="lg"
                        _hover={{ bg: 'yellow.300' }}
                      >
                        Start Exploring
                      </Button>
                    </Link>
                  </HStack>
                </VStack>
              </Card.Body>
            </Card.Root>
          </motion.div>
        </Container>
      </Box>
    </>
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
    const allFilms = filmsFromEdges.map((edge: FilmEdge, index: number) => ({
      id: (index + 1).toString(), // Generate ID based on index
      title: edge.node.title,
      director: edge.node.director,
      releaseDate: edge.node.releaseDate,
      openingCrawl: edge.node.openingCrawl,
    }));

    // Sort by ID and take first 3 for featured section
    const featuredFilms = allFilms
      .sort((a: Film, b: Film) => parseInt(a.id) - parseInt(b.id))
      .slice(0, 3);

    return {
      props: {
        featuredFilms,
      },
      revalidate: 86400, // Revalidate once per day
    };
  } catch (error) {
    console.error('Error fetching films with GraphQL:', error);
    return {
      props: {
        featuredFilms: [],
      },
      revalidate: 3600, // Try again in 1 hour if there was an error
    };
  }
};
