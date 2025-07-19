import { gql } from '@apollo/client';

// Query to get all films
export const GET_ALL_FILMS = gql`
  query GetAllFilms {
    allFilms {
      edges {
        node {
          title
          director
          releaseDate
          openingCrawl
        }
      }
    }
  }
`;

// Query to get a single film by ID (using filmID parameter)
export const GET_FILM_BY_ID = gql`
  query GetFilmById($filmID: ID!) {
    film(filmID: $filmID) {
      title
      director
      releaseDate
      openingCrawl
      characterConnection {
        edges {
          node {
            name
            birthYear
            gender
            height
            mass
            hairColor
            skinColor
            eyeColor
          }
        }
      }
      planetConnection {
        edges {
          node {
            name
            climates
            terrains
            population
          }
        }
      }
      starshipConnection {
        edges {
          node {
            name
            model
            manufacturers
            starshipClass
          }
        }
      }
    }
  }
`;

// Query to get all people (characters)
export const GET_ALL_PEOPLE = gql`
  query GetAllPeople($first: Int, $after: String) {
    allPeople(first: $first, after: $after) {
      edges {
        node {
          name
          birthYear
          eyeColor
          gender
          hairColor
          height
          mass
          skinColor
          homeworld {
            name
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

// Query to get a single person by ID (using personID parameter)
export const GET_PERSON_BY_ID = gql`
  query GetPersonById($personID: ID!) {
    person(personID: $personID) {
      name
      birthYear
      eyeColor
      gender
      hairColor
      height
      mass
      skinColor
      homeworld {
        name
        climates
        terrains
        population
      }
      filmConnection {
        edges {
          node {
            title
            director
            releaseDate
            openingCrawl
          }
        }
      }
      starshipConnection {
        edges {
          node {
            name
            model
            manufacturers
            starshipClass
          }
        }
      }
    }
  }
`;
