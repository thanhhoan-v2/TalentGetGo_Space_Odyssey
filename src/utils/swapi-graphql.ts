import { GET_FILM_BY_ID } from '@/lib/queries';
import {
  GetAllGraphQLFilmsResponse,
  GetGraphQLFilmByIdResponse,
  GetGraphQLFilmByIdVariables,
  GraphQLFilm,
  GraphQLFilmWithDetails,
} from '@/utils/graphql-schema';

export interface FilmEdge {
  node: {
    title: string;
    director: string;
    releaseDate: string;
    openingCrawl: string;
  };
}

// Direct fetch function for server-side data fetching (getStaticProps, getServerSideProps)
async function fetchGraphQL<T = Record<string, unknown>>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  try {
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

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `GraphQL request failed: ${response.statusText} - ${errorText}`
      );
    }

    const result = await response.json();
    if (result.errors) {
      throw new Error(`GraphQL errors: ${JSON.stringify(result.errors)}`);
    }

    return result.data;
  } catch (error) {
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
export async function getAllFilms(): Promise<GraphQLFilm[]> {
  try {
    // Use direct fetch for better reliability in getStaticProps
    const data = await fetchGraphQL<GetAllGraphQLFilmsResponse>(`
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

export async function getFilmById(
  id: string
): Promise<GraphQLFilmWithDetails | null> {
  try {
    const client = await getServerClient();
    const { data } = await client.query<
      GetGraphQLFilmByIdResponse,
      GetGraphQLFilmByIdVariables
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

export function extractNumber(url: string): number | null {
  const match = url.match(/\/(characters|films)\/(\d+)/);
  return match ? parseInt(match[2], 10) : null;
}
