import {
  GET_ALL_FILMS,
  GET_ALL_PEOPLE,
  GET_FILM_BY_ID,
  GET_PERSON_BY_ID,
} from '@/lib/queries';
import type {
  Character,
  Film,
  FilmWithDetails,
  GetAllFilmsResponse,
  GetAllPeopleResponse,
  GetAllPeopleVariables,
  GetFilmByIdResponse,
  GetFilmByIdVariables,
  GetPersonByIdResponse,
  GetPersonByIdVariables,
} from '@/schema';
import { useLazyQuery, useQuery } from '@apollo/client';

// Direct fetch function for server-side data fetching (getStaticProps, getServerSideProps)
async function fetchGraphQL<T = Record<string, unknown>>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  try {
    console.log(
      'Making GraphQL request to:',
      'https://swapi-graphql.netlify.app/.netlify/functions/index'
    );
    console.log('Query:', query);

    const response = await fetch(
      'https://swapi-graphql.netlify.app/.netlify/functions/index',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          variables,
        }),
      }
    );

    console.log('Response status:', response.status);
    console.log(
      'Response headers:',
      Object.fromEntries(response.headers.entries())
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('GraphQL response error:', errorText);
      throw new Error(
        `GraphQL request failed: ${response.statusText} - ${errorText}`
      );
    }

    const result = await response.json();
    console.log('GraphQL result:', JSON.stringify(result, null, 2));

    if (result.errors) {
      console.error('GraphQL errors:', result.errors);
      throw new Error(`GraphQL errors: ${JSON.stringify(result.errors)}`);
    }

    return result.data;
  } catch (error) {
    console.error('GraphQL fetch error:', error);
    throw error;
  }
}

// Server-side GraphQL client for SSR/SSG
let serverClient:
  | import('@apollo/client').ApolloClient<
      import('@apollo/client').NormalizedCacheObject
    >
  | null = null;

async function getServerClient(): Promise<
  import('@apollo/client').ApolloClient<
    import('@apollo/client').NormalizedCacheObject
  >
> {
  if (!serverClient) {
    const { ApolloClient, InMemoryCache, createHttpLink } = await import(
      '@apollo/client'
    );
    serverClient = new ApolloClient({
      link: createHttpLink({
        uri: 'https://swapi-graphql.netlify.app/.netlify/functions/index',
      }),
      cache: new InMemoryCache(),
      ssrMode: true,
    });
  }
  return serverClient;
}

// Films API functions
export async function getAllFilms(): Promise<Film[]> {
  try {
    // Use direct fetch for better reliability in getStaticProps
    const data = await fetchGraphQL<GetAllFilmsResponse>(`
      query {
        allFilms {
          films {
            id
            title
            releaseDate
            director
            openingCrawl
          }
        }
      }
    `);
    return data?.allFilms.films || [];
  } catch (error) {
    console.error('Error fetching all films:', error);
    return [];
  }
}

export async function getFilmById(id: string): Promise<FilmWithDetails | null> {
  try {
    const client = await getServerClient();
    const { data } = await client.query<
      GetFilmByIdResponse,
      GetFilmByIdVariables
    >({
      query: GET_FILM_BY_ID,
      variables: { id },
    });
    return data?.film || null;
  } catch (error) {
    console.error(`Error fetching film with ID ${id}:`, error);
    return null;
  }
}

// People/Characters API functions
export async function getAllPeople(
  pageSize = 10
): Promise<{ people: Character[]; hasNextPage: boolean; endCursor?: string }> {
  try {
    const client = await getServerClient();
    const { data } = await client.query<
      GetAllPeopleResponse,
      GetAllPeopleVariables
    >({
      query: GET_ALL_PEOPLE,
      variables: { first: pageSize },
    });
    return {
      people: data?.allPeople.people || [],
      hasNextPage: data?.allPeople.pageInfo.hasNextPage || false,
      endCursor: data?.allPeople.pageInfo.endCursor,
    };
  } catch (error) {
    console.error('Error fetching all people:', error);
    return {
      people: [],
      hasNextPage: false,
    };
  }
}

export async function getPersonById(id: string): Promise<Character | null> {
  try {
    const client = await getServerClient();
    const { data } = await client.query<
      GetPersonByIdResponse,
      GetPersonByIdVariables
    >({
      query: GET_PERSON_BY_ID,
      variables: { id },
    });
    return data?.person || null;
  } catch (error) {
    console.error(`Error fetching person with ID ${id}:`, error);
    return null;
  }
}

// React hooks for client-side usage
export function useGetAllFilms() {
  return useQuery<GetAllFilmsResponse>(GET_ALL_FILMS);
}

export function useGetFilmById(id: string) {
  return useQuery<GetFilmByIdResponse, GetFilmByIdVariables>(GET_FILM_BY_ID, {
    variables: { id },
    skip: !id,
  });
}

export function useGetAllPeople(pageSize = 10) {
  return useQuery<GetAllPeopleResponse, GetAllPeopleVariables>(GET_ALL_PEOPLE, {
    variables: { first: pageSize },
  });
}

export function useGetPersonById(id: string) {
  return useQuery<GetPersonByIdResponse, GetPersonByIdVariables>(
    GET_PERSON_BY_ID,
    {
      variables: { id },
      skip: !id,
    }
  );
}

// Lazy query hooks for manual triggering
export function useLazyGetAllFilms() {
  return useLazyQuery<GetAllFilmsResponse>(GET_ALL_FILMS);
}

export function useLazyGetFilmById() {
  return useLazyQuery<GetFilmByIdResponse, GetFilmByIdVariables>(
    GET_FILM_BY_ID
  );
}

export function useLazyGetAllPeople() {
  return useLazyQuery<GetAllPeopleResponse, GetAllPeopleVariables>(
    GET_ALL_PEOPLE
  );
}

export function useLazyGetPersonById() {
  return useLazyQuery<GetPersonByIdResponse, GetPersonByIdVariables>(
    GET_PERSON_BY_ID
  );
}

// Helper function to extract ID from GraphQL ID
export function extractIdFromURL(graphqlId: string): string {
  // GraphQL IDs are typically base64 encoded, but for SWAPI they're usually just the numeric ID
  return graphqlId;
}

export function extractNumber(url: string): number | null {
  const match = url.match(/\/characters\/(\d+)/);
  return match ? parseInt(match[1], 10) : null;
}

// Helper function to convert GraphQL data to legacy SWAPI format for compatibility
export function convertFilmToLegacyFormat(
  film: FilmWithDetails
): Record<string, unknown> {
  return {
    title: film.title,
    episode_id: parseInt(film.id) || 0,
    opening_crawl: film.openingCrawl,
    director: film.director,
    producer: '', // Not available in GraphQL
    release_date: film.releaseDate,
    characters: film.characterConnection.characters.map((char) => char.id),
    planets: film.planetConnection.planets.map((planet) => planet.id),
    starships: film.starshipConnection.starships.map((starship) => starship.id),
    vehicles: [], // Not available in GraphQL
    species: [], // Not available in GraphQL
    created: '', // Not available in GraphQL
    edited: '', // Not available in GraphQL
    url: `/films/${film.id}`,
  };
}

export function convertCharacterToLegacyFormat(
  character: Character
): Record<string, unknown> {
  return {
    name: character.name,
    height: character.height.toString(),
    mass: character.mass.toString(),
    hair_color: character.hairColor,
    skin_color: character.skinColor,
    eye_color: character.eyeColor,
    birth_year: character.birthYear,
    gender: character.gender,
    homeworld: character.homeworld?.id || '',
    films: [], // Would need to fetch separately
    species: [], // Not available in GraphQL
    vehicles: [], // Not available in GraphQL
    starships: [], // Not available in GraphQL
    created: '', // Not available in GraphQL
    edited: '', // Not available in GraphQL
    url: `/people/${character.id}`,
  };
}

// Search functionality using GraphQL
export function useSearchPeople(_query: string, _pageSize = 10) {
  // Note: SWAPI GraphQL doesn't have built-in search, so we'll need to implement this differently
  // For now, we'll return an empty result
  return {
    loading: false,
    error: null,
    data: {
      allPeople: {
        people: [],
        pageInfo: {
          hasNextPage: false,
          endCursor: null,
        },
      },
    },
  };
}

// Batch fetch multiple resources (GraphQL doesn't need this as much, but keeping for compatibility)
export async function batchFetchResources<T>(_ids: string[]): Promise<T[]> {
  // For GraphQL, we can use multiple queries or a single query with multiple IDs
  // This is a simplified implementation
  throw new Error('Batch fetching not implemented for GraphQL yet');
}
