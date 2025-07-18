import {
  Film,
  Person,
  Planet,
  Species,
  Starship,
  SWAPIResponse,
  Vehicle,
} from '@/types/swapi';

const SWAPI_BASE_URL = 'https://swapi.info/api';

// Check if we're in a server-side context during build
const isServerSide = typeof window === 'undefined';
const isBuildTime =
  isServerSide &&
  !process.env.NEXT_PUBLIC_VERCEL_URL &&
  !process.env.NEXT_PUBLIC_SITE_URL;

// Generic fetch function with error handling
async function fetchFromSWAPI<T>(endpoint: string): Promise<T> {
  try {
    const response = await fetch(`${SWAPI_BASE_URL}${endpoint}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching from SWAPI: ${endpoint}`, error);
    throw error;
  }
}

// Generic function to fetch from local API or external API based on context
async function fetchFromAPI<T>(
  endpoint: string,
  localPath: string
): Promise<T> {
  try {
    let url: string;

    if (isBuildTime) {
      // During build time, use external API directly
      url = `${SWAPI_BASE_URL}${endpoint}`;
    } else if (isServerSide) {
      // During server-side rendering, use full URL to local API
      const baseUrl =
        process.env.NEXT_PUBLIC_SITE_URL ||
        process.env.NEXT_PUBLIC_VERCEL_URL ||
        'http://localhost:3000';
      url = `${baseUrl}${localPath}`;
    } else {
      // During client-side, use relative URL to local API
      url = localPath;
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching from API: ${localPath}`, error);
    throw error;
  }
}

// Extract ID from SWAPI URL
export function extractIdFromUrl(url: string): string {
  const matches = url.match(/\/(\d+)\/?$/);
  return matches ? matches[1] : '';
}

// Clean undefined values for Next.js serialization
function cleanData<T>(data: T): T {
  if (Array.isArray(data)) {
    return data.map((item) => cleanData(item)) as T;
  }

  if (data && typeof data === 'object') {
    const cleaned: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(data)) {
      if (value === undefined) {
        cleaned[key] = null;
      } else if (Array.isArray(value)) {
        cleaned[key] = value.map((item) => cleanData(item));
      } else if (value && typeof value === 'object') {
        cleaned[key] = cleanData(value);
      } else {
        cleaned[key] = value;
      }
    }
    return cleaned as T;
  }

  return data === undefined ? (null as T) : data;
}

// Films API functions
export async function getAllFilms(): Promise<Film[]> {
  const response = await fetchFromSWAPI<Film[]>('/films/');
  return cleanData(response);
}

export async function getFilmById(id: string): Promise<Film> {
  const film = await fetchFromSWAPI<Film>(`/films/${id}/`);
  return cleanData(film);
}

// People/Characters API functions - using context-aware fetching
export async function getAllPeople(page = 1): Promise<SWAPIResponse<Person>> {
  const data = await fetchFromAPI<SWAPIResponse<Person>>(
    `/people/?page=${page}`,
    `/api/people?page=${page}`
  );
  return cleanData(data);
}

export async function getPersonById(id: string): Promise<Person> {
  const person = await fetchFromAPI<Person>(
    `/people/${id}/`,
    `/api/people/${id}`
  );
  return cleanData(person);
}

export async function searchPeople(
  query: string,
  page = 1
): Promise<SWAPIResponse<Person>> {
  // For build time, return empty results since search is a runtime feature
  if (isBuildTime) {
    return {
      count: 0,
      next: null,
      previous: null,
      results: [],
    };
  }

  const data = await fetchFromAPI<SWAPIResponse<Person>>(
    `/people/?search=${encodeURIComponent(query)}&page=${page}`,
    `/api/people/search?q=${encodeURIComponent(query)}&page=${page}`
  );
  return cleanData(data);
}

// Planets API functions
export async function getAllPlanets(page = 1): Promise<SWAPIResponse<Planet>> {
  const response = await fetchFromSWAPI<SWAPIResponse<Planet>>(
    `/planets/?page=${page}`
  );
  return cleanData(response);
}

export async function getPlanetById(id: string): Promise<Planet> {
  const planet = await fetchFromSWAPI<Planet>(`/planets/${id}/`);
  return cleanData(planet);
}

// Starships API functions
export async function getAllStarships(
  page = 1
): Promise<SWAPIResponse<Starship>> {
  const response = await fetchFromSWAPI<SWAPIResponse<Starship>>(
    `/starships/?page=${page}`
  );
  return cleanData(response);
}

export async function getStarshipById(id: string): Promise<Starship> {
  const starship = await fetchFromSWAPI<Starship>(`/starships/${id}/`);
  return cleanData(starship);
}

// Vehicles API functions
export async function getAllVehicles(
  page = 1
): Promise<SWAPIResponse<Vehicle>> {
  const response = await fetchFromSWAPI<SWAPIResponse<Vehicle>>(
    `/vehicles/?page=${page}`
  );
  return cleanData(response);
}

export async function getVehicleById(id: string): Promise<Vehicle> {
  const vehicle = await fetchFromSWAPI<Vehicle>(`/vehicles/${id}/`);
  return cleanData(vehicle);
}

// Species API functions
export async function getAllSpecies(page = 1): Promise<SWAPIResponse<Species>> {
  const response = await fetchFromSWAPI<SWAPIResponse<Species>>(
    `/species/?page=${page}`
  );
  return cleanData(response);
}

export async function getSpeciesById(id: string): Promise<Species> {
  const species = await fetchFromSWAPI<Species>(`/species/${id}/`);
  return cleanData(species);
}

// Helper function to fetch resource by URL
export async function fetchResourceByUrl<T>(url: string): Promise<T> {
  const endpoint = url.replace(SWAPI_BASE_URL, '');
  const resource = await fetchFromSWAPI<T>(endpoint);
  return cleanData(resource);
}

// Batch fetch multiple resources
export async function batchFetchResources<T>(urls: string[]): Promise<T[]> {
  const promises = urls.map((url) => fetchResourceByUrl<T>(url));
  return Promise.all(promises);
}
