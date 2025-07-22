export interface GraphQLPageInfo {
  hasNextPage: boolean;
  endCursor?: string;
}

export interface GraphQLFilm {
  id: string;
  title: string;
  releaseDate: string;
  director: string;
  openingCrawl: string;
}

export interface GraphQLCharacter {
  id: string;
  name: string;
  birthYear: string;
  eyeColor: string;
  gender: string;
  hairColor: string;
  height: number;
  mass: number;
  skinColor: string;
  homeworld?: GraphQLPlanet;
}

export interface GraphQLPlanet {
  id: string;
  name: string;
}

export interface GraphQLStarship {
  id: string;
  name: string;
}

// Films

// Get all films Response
export interface GetAllGraphQLFilmsResponse {
  allFilms: {
    films: GraphQLFilm[];
  };
}

// Get film by id Variables
export interface GetGraphQLFilmByIdVariables {
  id: string;
}

// Get film by id Response
export interface GetGraphQLFilmByIdResponse {
  film: GraphQLFilmWithDetails;
}

// Film with details
export interface GraphQLFilmWithDetails extends GraphQLFilm {
  characterConnection: {
    characters: GraphQLCharacter[];
  };
  planetConnection: {
    planets: GraphQLPlanet[];
  };
  starshipConnection: {
    starships: GraphQLStarship[];
  };
}

export interface GetAllGraphQLPeopleResponse {
  allPeople: {
    people: GraphQLCharacter[];
    pageInfo: GraphQLPageInfo;
  };
}
