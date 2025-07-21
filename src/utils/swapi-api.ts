import { Person } from '@/schema/swapi';

// SWAPI.tech API types
export interface SwapiTechCharacter {
  uid: string;
  name: string;
  url: string;
  description: string;
}

export interface SwapiTechResponse {
  message: string;
  total_records: number;
  total_pages: number;
  previous: string | null;
  next: string | null;
  results: SwapiTechCharacter[];
}

export interface CharacterFetchResult {
  characters: SwapiTechCharacter[];
  totalRecords: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

// Cache for all characters to enable client-side search
let allCharactersCache: SwapiTechCharacter[] = [];
let cacheTimestamp = 0;
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes (increased from 5)
let isFetchingAllCharacters = false; // Prevent duplicate fetches
let fetchPromise: Promise<SwapiTechCharacter[]> | null = null;

// Fetch all characters for search functionality
export async function fetchAllCharacters(): Promise<SwapiTechCharacter[]> {
  try {
    // Check cache first
    const now = Date.now();
    if (
      allCharactersCache.length > 0 &&
      now - cacheTimestamp < CACHE_DURATION
    ) {
      return allCharactersCache;
    }

    // If already fetching, return the existing promise
    if (isFetchingAllCharacters && fetchPromise) {
      return fetchPromise;
    }

    // Create new fetch promise
    isFetchingAllCharacters = true;
    fetchPromise = (async () => {
      const allCharacters: SwapiTechCharacter[] = [];
      const page = 1;
      const hasNext = true;

      // Fetch all pages in parallel for faster loading
      const firstPageResponse = await fetch(
        'https://www.swapi.tech/api/people?page=1&limit=10'
      );
      const firstPageData: SwapiTechResponse = await firstPageResponse.json();
      const totalPages = firstPageData.total_pages || 9;

      // Add first page results
      allCharacters.push(...(firstPageData.results || []));

      // Fetch remaining pages in parallel
      if (totalPages > 1) {
        const pagePromises = [];
        for (let p = 2; p <= totalPages; p++) {
          pagePromises.push(
            fetch(`https://www.swapi.tech/api/people?page=${p}&limit=10`)
              .then((res) => res.json())
              .then((data: SwapiTechResponse) => data.results || [])
          );
        }

        const remainingPages = await Promise.all(pagePromises);
        remainingPages.forEach((pageResults) => {
          allCharacters.push(...pageResults);
        });
      }

      // Update cache
      allCharactersCache = allCharacters;
      cacheTimestamp = now;
      isFetchingAllCharacters = false;
      fetchPromise = null;

      return allCharacters;
    })();

    return fetchPromise;
  } catch (error) {
    console.error('Error fetching all characters:', error);
    isFetchingAllCharacters = false;
    fetchPromise = null;
    return [];
  }
}

// Fetch characters from SWAPI.tech API
export async function fetchCharacters(
  page: number = 1,
  search?: string
): Promise<CharacterFetchResult> {
  try {
    if (search && search.trim()) {
      // Implement client-side search
      const allCharacters = await fetchAllCharacters();
      const searchTerm = search.trim().toLowerCase();

      const filteredCharacters = allCharacters.filter((character) =>
        character.name.toLowerCase().includes(searchTerm)
      );

      // Implement pagination on filtered results
      const limit = 10;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedCharacters = filteredCharacters.slice(
        startIndex,
        endIndex
      );

      const totalPages = Math.ceil(filteredCharacters.length / limit);

      return {
        characters: paginatedCharacters,
        totalRecords: filteredCharacters.length,
        totalPages,
        hasNext: page < totalPages,
        hasPrevious: page > 1,
      };
    }

    // Regular pagination without search
    const url = new URL('https://www.swapi.tech/api/people');
    url.searchParams.set('page', page.toString());
    url.searchParams.set('limit', '10');

    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: SwapiTechResponse = await response.json();

    return {
      characters: data.results || [],
      totalRecords: data.total_records || 0,
      totalPages: data.total_pages || 0,
      hasNext: !!data.next,
      hasPrevious: !!data.previous,
    };
  } catch (error) {
    console.error('Error fetching characters:', error);
    return {
      characters: [],
      totalRecords: 0,
      totalPages: 0,
      hasNext: false,
      hasPrevious: false,
    };
  }
}

// Convert SWAPI.tech character to our Person format
export function convertSwapiTechToPerson(char: SwapiTechCharacter): Person {
  return {
    name: char.name,
    height: 'unknown',
    mass: 'unknown',
    hair_color: 'unknown',
    skin_color: 'unknown',
    eye_color: 'unknown',
    birth_year: 'unknown',
    gender: 'unknown',
    homeworld: 'unknown',
    films: [],
    species: [],
    vehicles: [],
    starships: [],
    created: '',
    edited: '',
    url: `/characters/${char.uid}`,
  };
}
