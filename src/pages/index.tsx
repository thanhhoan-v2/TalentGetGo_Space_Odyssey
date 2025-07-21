'use client';

import { BoxReveal } from '@/components/animated/box-reveal';
import { InteractiveHoverButton } from '@/components/animated/interactive-hover-button';
import { PageHeader } from '@/components/common';
import PageFooter from '@/components/common/page-footer';
import { FilmCard } from '@/components/films/film-card';
import { CardCarousel } from '@/components/ui/card-carousel';
import client from '@/lib/apollo-client';
import { GET_ALL_FILMS } from '@/lib/queries';
import { cn } from '@/lib/utils';
import { Film, Person } from '@/schema/swapi';
import { ROUTES } from '@/utils/routes';
import { convertSwapiTechToPerson, fetchCharacters } from '@/utils/swapi-api';
import { motion } from 'framer-motion';
import { XIcon } from 'lucide-react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { convertGraphQLFilmToSWAPI } from './films';

interface HomeProps {
  featuredFilms: Film[];
  characters: Person[];
}

export default function Home({ featuredFilms, characters }: HomeProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [
    isReachedFeaturedCharactersSection,
    setIsReachedFeaturedCharactersSection,
  ] = useState(false);
  const featuredCharactersRef = useRef(null);

  const featuredCharacters = [
    { url: '/characters/1', name: 'Luke Skywalker' },
    { url: '/characters/3', name: 'R2-D2' },
    { url: '/characters/4', name: 'Darth Vader' },
    { url: '/characters/5', name: 'Leia Organa' },
    { url: '/characters/9', name: 'Biggs Darklighter' },
    { url: '/characters/19', name: 'Yoda' },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update state when element enters/exits viewport
        setIsReachedFeaturedCharactersSection(entry.isIntersecting);
      },
      {
        threshold: 0, // Trigger when percentage of element is visible
        rootMargin: '0px 0px 0px 0px', // Adjust trigger point
      }
    );

    if (featuredCharactersRef.current)
      observer.observe(featuredCharactersRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
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

      <div className="bg-background overflow-hidden text-foreground theme-transition">
        <div className="relative flex min-h-screen overflow-hidden">
          <div
            className={cn(
              'top-0 right-0 left-0 z-50 fixed transition-all duration-900 ease-in-out',
              isReachedFeaturedCharactersSection ? 'bg-black' : 'bg-transparent'
            )}
          >
            <PageHeader />
          </div>

          <video
            className="top-0 left-0 z-10 absolute w-screen h-screen object-cover"
            src="/landing-video.mp4"
            autoPlay
            muted
            loop
            playsInline
          />

          <div className="z-30 relative flex flex-1 items-center py-20">
            <div className="flex flex-col justify-center items-center gap-10 w-full text-center">
              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.4 }}
                className="flex justify-center items-center"
              >
                <div className="max-w-[350px] font-bold text-white text-7xl leading-snug">
                  The <span className="bg-black px-2 text-white">Force</span>{' '}
                  Lives in{' '}
                  <span className="bg-black px-2 text-white">All of Us</span>
                </div>
              </motion.div>

              <BoxReveal
                width="fit-content"
                className="flex justify-center items-center gap-4"
              >
                <Image
                  src="/talentgetgo.png"
                  alt="TalentGetGo"
                  width={70}
                  height={70}
                  className="rounded-md"
                />
                <XIcon size={20} color="white" />
                <Image
                  src="/starwars-logo.png"
                  alt="TalentGetGo"
                  width={60}
                  height={60}
                  className="rounded-md"
                />
              </BoxReveal>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.8 }}
              >
                <div className="flex flex-wrap justify-center gap-4 mx-2">
                  <InteractiveHoverButton href={ROUTES.FILMS}>
                    Films
                  </InteractiveHoverButton>
                  <InteractiveHoverButton href={ROUTES.CHARACTERS}>
                    Characters
                  </InteractiveHoverButton>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Featured Characters Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex justify-center items-center w-screen min-h-screen"
        >
          <div
            className="flex flex-col items-center gap-10"
            ref={featuredCharactersRef}
          >
            <div className="flex flex-col items-center gap-2 px-10 w-screen text-center">
              <div className="flex items-center gap-3 font-bold text-4xl md:text-7xl">
                Legends of the Galaxy
              </div>
              <div className="max-w-2xl text-muted-foreground text-lg md:text-xl leading-relaxed">
                Meet the{' '}
                <span className="decoration-green-400 decoration-wavy underline underline-offset-4">
                  iconic figures
                </span>{' '}
                who shaped the destiny of the galaxy.
              </div>
            </div>

            <CardCarousel characters={featuredCharacters} />
          </div>
        </motion.div>

        {/* Featured Films Section */}
        <div className="mb-10 px-5 md:px-[8rem] min-h-screen">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div
              className="flex flex-col items-center gap-10"
              ref={featuredCharactersRef}
            >
              <div className="flex flex-col items-center gap-2 text-center">
                <BoxReveal width="fit-content">
                  <div className="flex items-center gap-3 font-bold text-5xl md:text-7xl">
                    Chronicles of the Force
                  </div>
                </BoxReveal>
                <div className="max-w-2xl text-muted-foreground text-xl leading-relaxed">
                  Discover the{' '}
                  <span className="decoration-green-400 decoration-wavy underline underline-offset-4">
                    epic saga
                  </span>{' '}
                  that changed cinema forever.
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-9">
                {isLoading ? (
                  <div className="col-span-full py-12 text-center">
                    <p className="text-muted-foreground text-lg">Loading...</p>
                  </div>
                ) : featuredFilms ? (
                  featuredFilms.map((film, index) => (
                    <FilmCard key={index} film={film} />
                  ))
                ) : (
                  <div className="col-span-full py-12 text-center">
                    <p className="text-muted-foreground text-lg">
                      No featured films available at the moment.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        <PageFooter />
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    // Use Apollo Client to fetch films using the GraphQL schema
    const { data } = await client.query({
      query: GET_ALL_FILMS,
    });

    // Fetch characters from SWAPI.tech API
    const charactersResult = await fetchCharacters(1);
    const characters = charactersResult.characters.map(
      convertSwapiTechToPerson
    );

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
        characters: characters || [],
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
