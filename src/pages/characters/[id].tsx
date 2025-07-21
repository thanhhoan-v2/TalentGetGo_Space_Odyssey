'use client';

import { InteractiveHoverButton } from '@/components/animated/interactive-hover-button';
import { PlanetCard } from '@/components/card/planet-card';
import { StarshipCard } from '@/components/card/starship-card';
import { CharacterAppearanceCard } from '@/components/characters/character-appearance-card';
import { CharacterBioCard } from '@/components/characters/character-bio-card';
import { PageLayout } from '@/components/common';
import { Box, Card, CardContent, Heading } from '@/components/ui';
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

      <PageLayout>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex flex-col justify-center items-center mb-2 text-center">
            <div className="inline-block relative mb-6">
              <div className="absolute inset-0 bg-gray-500/20 blur-xl rounded-full scale-110"></div>
              <Image
                src={characterImage || ''}
                alt={character.name}
                width={300}
                height={300}
                className="relative shadow-2xl mx-auto border-4 border-gray-400/50 rounded-full w-64 h-64 object-cover profile-image"
              />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 0.5 }}
              viewport={{ once: true }}
              className="mb-10 font-bold text-[3rem] md:text-[5rem]"
            >
              {character.name}
            </motion.div>
            <InteractiveHoverButton
              characterName={character.name}
              characterUrl={character.url}
              variant="add-to-favorites"
            />
          </div>

          <Card className="shadow-none mx-auto border-none">
            <CardContent className="p-8">
              <div className="gap-8 grid grid-cols-1 lg:grid-cols-2 mx-auto max-w-6xl">
                <CharacterBioCard
                  title="BIO"
                  gender={character.gender}
                  birthYear={character.birth_year}
                  homeworld={homeworld?.name || 'unknown'}
                />

                <CharacterAppearanceCard
                  title="APPEARANCE"
                  height={character.height}
                  mass={character.mass}
                  hairColor={character.hair_color}
                  skinColor={character.skin_color}
                  eyeColor={character.eye_color}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Homeworld */}
        {homeworld && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            style={{ width: '100%' }}
          >
            <Box>
              <Heading size="xl" className="mb-8 text-foreground text-center">
                Homeworld
              </Heading>
              <Box className="mx-auto max-w-md">
                <PlanetCard planetName={homeworld.name} />
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
              <Heading size="xl" className="mb-8 text-foreground text-center">
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
                    <StarshipCard starshipName={starship.name} />
                  </motion.div>
                ))}
              </div>
            </Box>
          </motion.div>
        )}
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
