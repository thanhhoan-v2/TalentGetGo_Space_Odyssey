// Base interfaces
export interface PageInfo {
  hasNextPage: boolean;
  endCursor?: string;
}

export interface Planet {
  id: string;
  name: string;
}

export interface Starship {
  id: string;
  name: string;
}

export interface Character {
  id: string;
  name: string;
  birthYear: string;
  eyeColor: string;
  gender: string;
  hairColor: string;
  height: number;
  mass: number;
  skinColor: string;
  homeworld?: Planet;
}

export interface Film {
  id: string;
  title: string;
  releaseDate: string;
  director: string;
  openingCrawl: string;
}

export interface FilmWithDetails extends Film {
  characterConnection: {
    characters: Character[];
  };
  planetConnection: {
    planets: Planet[];
  };
  starshipConnection: {
    starships: Starship[];
  };
}

// Query response interfaces
export interface GetAllFilmsResponse {
  allFilms: {
    films: Film[];
  };
}

export interface GetFilmByIdResponse {
  film: FilmWithDetails;
}

export interface GetAllPeopleResponse {
  allPeople: {
    people: Character[];
    pageInfo: PageInfo;
  };
}

export interface GetPersonByIdResponse {
  person: Character & {
    filmConnection: {
      films: Film[];
    };
    starshipConnection: {
      starships: Starship[];
    };
  };
}

// Query variables interfaces
export interface GetFilmByIdVariables {
  id: string;
}

export interface GetPersonByIdVariables {
  id: string;
}

export interface GetAllPeopleVariables {
  first?: number;
  after?: string;
}
