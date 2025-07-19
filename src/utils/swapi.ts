import type { Character, Film, Planet, Starship } from '@/schema';

// Re-export GraphQL-based functions for backward compatibility
export {
  batchFetchResources,
  convertCharacterToLegacyFormat,
  convertFilmToLegacyFormat,
  getAllFilms,
  getAllPeople,
  getFilmById,
  getPersonById,
  useGetAllFilms,
  useGetAllPeople,
  useGetFilmById,
  useGetPersonById,
  useLazyGetAllFilms,
  useLazyGetAllPeople,
  useLazyGetFilmById,
  useLazyGetPersonById,
  useSearchPeople,
} from '@/utils/swapi-graphql';
export { extractIdFromGraphQLId as extractIdFromUrl } from '@/utils/swapi-graphql';

// Legacy type exports for backward compatibility
export type {
  Film,
  GetAllFilmsResponse,
  GetAllPeopleResponse,
  GetAllPeopleVariables,
  GetFilmByIdResponse,
  GetFilmByIdVariables,
  GetPersonByIdResponse,
  GetPersonByIdVariables,
  PageInfo,
  Character as Person,
  Planet,
  Starship,
} from '@/schema';

// Legacy types for backward compatibility
export type Vehicle = Record<string, unknown>;
export type Species = Record<string, unknown>;

// Legacy SWAPI response type for backward compatibility
export interface SWAPIResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

// Helper type for extracting ID from URL
export type ResourceId = string;

// Generic SWAPI resource type
export type SWAPIResource =
  | Film
  | Character
  | Planet
  | Starship
  | Vehicle
  | Species;

// Legacy functions that maintain the old API but use GraphQL under the hood
export async function searchPeople(
  _query: string,
  _page = 1
): Promise<SWAPIResponse<Character>> {
  // For now, return empty results since GraphQL doesn't have built-in search
  // This could be enhanced with client-side filtering or a different search implementation
  return {
    count: 0,
    next: null,
    previous: null,
    results: [],
  };
}
// Legacy planets functions (not implemented in GraphQL yet)
export async function getAllPlanets(_page = 1): Promise<SWAPIResponse<Planet>> {
  // Placeholder for future implementation
  return {
    count: 0,
    next: null,
    previous: null,
    results: [],
  };
}

export async function getPlanetById(_id: string): Promise<Planet | null> {
  // Placeholder for future implementation
  return null;
}

// Legacy starships functions (not implemented in GraphQL yet)
export async function getAllStarships(
  _page = 1
): Promise<SWAPIResponse<Starship>> {
  // Placeholder for future implementation
  return {
    count: 0,
    next: null,
    previous: null,
    results: [],
  };
}

export async function getStarshipById(_id: string): Promise<Starship | null> {
  // Placeholder for future implementation
  return null;
}

// Legacy vehicles functions (not implemented in GraphQL yet)
export async function getAllVehicles(
  _page = 1
): Promise<SWAPIResponse<Vehicle>> {
  // Placeholder for future implementation
  return {
    count: 0,
    next: null,
    previous: null,
    results: [],
  };
}

export async function getVehicleById(_id: string): Promise<Vehicle | null> {
  // Placeholder for future implementation
  return null;
}

// Legacy species functions (not implemented in GraphQL yet)
export async function getAllSpecies(
  _page = 1
): Promise<SWAPIResponse<Species>> {
  // Placeholder for future implementation
  return {
    count: 0,
    next: null,
    previous: null,
    results: [],
  };
}

export async function getSpeciesById(_id: string): Promise<Species | null> {
  // Placeholder for future implementation
  return null;
}

// Legacy helper function to fetch resource by URL
export async function fetchResourceByUrl<T>(url: string): Promise<T | null> {
  // Extract ID from URL and try to determine resource type
  const id = url.split('/').pop() || '';
  if (!id) return null;

  // This is a simplified implementation - in practice, you'd need to determine the resource type
  // For now, we'll just return null
  return null;
}
