'use client';

import { PageHeader } from '@/components/common';
import { FilmCard } from '@/components/films/film-card';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Heading,
  Text,
  VStack,
} from '@/components/ui';
import client from '@/lib/apollo-client';
import { GET_ALL_FILMS } from '@/lib/queries';
import { cn } from '@/lib/utils';
import { Film } from '@/schema/swapi';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Film as FilmIcon,
  Globe,
  Play,
  Sparkles,
  Users,
} from 'lucide-react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { convertGraphQLFilmToSWAPI } from './films';

interface HomeProps {
  featuredFilms: Film[];
}

export default function Home({ featuredFilms }: HomeProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading state for better UX
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

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

      <Box className="bg-background overflow-hidden text-foreground theme-transition">
        {/* Hero Section with Full-Screen Video Background */}
        <Box className="relative flex min-h-screen overflow-hidden">
          {/* Transparent Navbar Overlay */}
          <Box className="top-0 right-0 left-0 z-50 absolute">
            <PageHeader transparent />
          </Box>

          {/* Full-Screen Video Background */}
          <video
            className="top-0 left-0 z-10 absolute w-screen h-screen object-cover"
            src="/landing-video.mp4"
            autoPlay
            muted
            loop
            playsInline
          />

          {/* Dark Overlay for better readability */}
          <Box className="z-20 absolute inset-0 bg-black/40" />

          {/* Content Overlay */}
          <Container
            size="7xl"
            className="z-30 relative flex flex-1 items-center py-20"
          >
            <VStack gap="xl" className="w-full text-center">
              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.4 }}
              >
                <Heading size="4xl" className="drop-shadow-lg text-white">
                  The Force Lives in All of Us
                </Heading>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.8 }}
              >
                <div className="flex flex-wrap justify-center gap-4">
                  <Button
                    asChild
                    className={cn(
                      'bg-white text-black hover:bg-white/90',
                      'px-10 py-8 text-lg font-semibold',
                      'hover:-translate-y-1 transition-all duration-300',
                      'shadow-xl'
                    )}
                  >
                    <Link href="/films">
                      <div className="flex items-center gap-2">
                        <Play size={24} />
                        <span>Explore Films</span>
                      </div>
                    </Link>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    className="px-10 py-8 border-2 border-primary font-semibold text-primary text-lg"
                  >
                    <Link href="/characters">
                      <div className="flex items-center gap-2">
                        <Users size={24} />
                        <span>Meet Characters</span>
                      </div>
                    </Link>
                  </Button>
                </div>
              </motion.div>
            </VStack>
          </Container>
        </Box>

        {/* Featured Films Section */}
        <Container size="7xl" className="py-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <VStack gap="xl">
              <VStack gap="md" className="text-center">
                <Heading
                  size="3xl"
                  variant="gradient"
                  className="flex items-center gap-3"
                >
                  <Sparkles size={32} />
                  Featured Films
                  <Sparkles size={32} />
                </Heading>
                <Text variant="muted" size="lg" className="max-w-2xl">
                  Discover the epic saga that changed cinema forever
                </Text>
              </VStack>

              <div
                className={cn(
                  'grid gap-8 w-full',
                  'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                )}
              >
                {isLoading ? (
                  <div className="col-span-full py-12 text-center">
                    <Text variant="muted" size="lg">
                      Loading...
                    </Text>
                  </div>
                ) : featuredFilms ? (
                  featuredFilms.map((film, index) => (
                    <FilmCard key={index} film={film} />
                  ))
                ) : (
                  <div className="col-span-full py-12 text-center">
                    <Text variant="muted" size="lg">
                      No featured films available at the moment.
                    </Text>
                  </div>
                )}
              </div>
            </VStack>
          </motion.div>
        </Container>

        {/* Features Section */}
        <Container size="7xl" className="py-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <VStack gap="xl">
              <VStack gap="md" className="text-center">
                <Heading size="3xl" variant="gradient">
                  Explore the Galaxy
                </Heading>
                <Text variant="muted" size="lg" className="max-w-3xl">
                  Journey through the vast Star Wars universe with our
                  comprehensive database
                </Text>
              </VStack>

              <div
                className={cn(
                  'grid gap-8 w-full',
                  'grid-cols-1 md:grid-cols-3'
                )}
              >
                {[
                  {
                    icon: FilmIcon,
                    title: 'Epic Films',
                    description:
                      'Explore the complete Star Wars saga from the original trilogy to the latest releases',
                    href: '/films',
                  },
                  {
                    icon: Users,
                    title: 'Legendary Characters',
                    description:
                      'Meet heroes, villains, and everyone in between from across the galaxy',
                    href: '/characters',
                  },
                  {
                    icon: Globe,
                    title: 'Diverse Worlds',
                    description:
                      'Discover planets, starships, and the rich lore of the Star Wars universe',
                    href: '/films',
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                  >
                    <Link href={feature.href}>
                      <Card
                        className={cn(
                          'h-full bg-card/30 backdrop-blur-sm border-border transition-all duration-300 cursor-pointer',
                          'hover:border-primary hover:bg-card/50 theme-transition card-glow group'
                        )}
                      >
                        <CardContent className="p-8 text-center">
                          <VStack gap="lg">
                            <div
                              className={cn(
                                'mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center',
                                'group-hover:bg-primary/20 transition-colors'
                              )}
                            >
                              <feature.icon className="w-8 h-8 text-primary" />
                            </div>
                            <VStack gap="sm">
                              <Heading
                                size="lg"
                                className="group-hover:text-primary transition-colors"
                              >
                                {feature.title}
                              </Heading>
                              <Text variant="muted" className="leading-relaxed">
                                {feature.description}
                              </Text>
                            </VStack>
                            <Button
                              variant="ghost"
                              className="group-hover:bg-primary/10 group-hover:text-primary"
                            >
                              <div className="flex items-center gap-2">
                                <span>Learn More</span>
                                <ArrowRight
                                  size={16}
                                  className="transition-transform group-hover:translate-x-1"
                                />
                              </div>
                            </Button>
                          </VStack>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </VStack>
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
    const graphqlFilms = filmsFromEdges.map(
      (edge: FilmEdge, index: number) => ({
        id: (index + 1).toString(), // Generate ID based on index
        title: edge.node.title,
        director: edge.node.director,
        releaseDate: edge.node.releaseDate,
        openingCrawl: edge.node.openingCrawl,
      })
    );
    // Convert GraphQL films to SWAPI format
    const allFilms = graphqlFilms.map(convertGraphQLFilmToSWAPI);

    // Shuffle array and select 3 random films
    const shuffledFilms = [...allFilms].sort(() => 0.5 - Math.random());
    const randomFilms = shuffledFilms.slice(0, 3);
    console.log(randomFilms);

    return {
      props: {
        featuredFilms: randomFilms || [], // Return 3 random films
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
