import {
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import { globalIdField } from 'graphql-relay';

import { createdField, editedField } from '@/schema/common-fields';
import { connectionFromUrls } from '@/schema/connections';
import { nodeInterface } from '@/schema/relay-node';

import { PersonType } from '@/schema/types/person';
import { PlanetType } from '@/schema/types/planet';
import { SpeciesType } from '@/schema/types/species';
import { StarshipType } from '@/schema/types/starship';
import { VehicleType } from '@/schema/types/vehicle';

/**
 * The GraphQL type equivalent of the Film resource
 */
export const FilmType = new GraphQLObjectType({
  name: 'Film',
  description: 'A single film.',
  fields: () => ({
    title: {
      type: GraphQLString,
      description: 'The title of this film.',
    },
    episodeID: {
      type: GraphQLInt,
      resolve: (film: any) => film.episode_id,
      description: 'The episode number of this film.',
    },
    openingCrawl: {
      type: GraphQLString,
      resolve: (film: any) => film.opening_crawl,
      description: 'The opening paragraphs at the beginning of this film.',
    },
    director: {
      type: GraphQLString,
      description: 'The name of the director of this film.',
    },
    producers: {
      type: new GraphQLList(GraphQLString),
      resolve: (film: any) => {
        return film.producer
          ? film.producer.split(',').map((s: string) => s.trim())
          : null;
      },
      description: 'The name(s) of the producer(s) of this film.',
    },
    releaseDate: {
      type: GraphQLString,
      resolve: (film: any) => film.release_date,
      description:
        'The ISO 8601 date format of film release at original creator country.',
    },
    speciesConnection: connectionFromUrls(
      'FilmSpecies',
      'species',
      SpeciesType
    ),
    starshipConnection: connectionFromUrls(
      'FilmStarships',
      'starships',
      StarshipType
    ),
    vehicleConnection: connectionFromUrls(
      'FilmVehicles',
      'vehicles',
      VehicleType
    ),
    characterConnection: connectionFromUrls(
      'FilmCharacters',
      'characters',
      PersonType
    ),
    planetConnection: connectionFromUrls('FilmPlanets', 'planets', PlanetType),
    created: createdField(),
    edited: editedField(),
    id: globalIdField('films'),
  }),
  interfaces: () => [nodeInterface],
});
