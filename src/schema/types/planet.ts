import {
  GraphQLFloat,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import { globalIdField } from 'graphql-relay';

import { convertToNumber } from '@/schema/api-helper';
import { createdField, editedField } from '@/schema/common-fields';
import { connectionFromUrls } from '@/schema/connections';
import { nodeInterface } from '@/schema/relay-node';

import { FilmType } from '@/schema/types/film';
import { PersonType } from '@/schema/types/person';

/**
 * The GraphQL type equivalent of the Planet resource
 */
export const PlanetType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Planet',
  description: `A large mass, planet or planetoid in the Star Wars Universe, at the time of
0 ABY.`,
  fields: () => ({
    name: {
      type: GraphQLString,
      description: 'The name of this planet.',
    },
    diameter: {
      type: GraphQLInt,
      resolve: (planet: any) => convertToNumber(planet.diameter),
      description: 'The diameter of this planet in kilometers.',
    },
    rotationPeriod: {
      type: GraphQLInt,
      resolve: (planet: any) => convertToNumber(planet.rotation_period),
      description: `The number of standard hours it takes for this planet to complete a single
rotation on its axis.`,
    },
    orbitalPeriod: {
      type: GraphQLInt,
      resolve: (planet: any) => convertToNumber(planet.orbital_period),
      description: `The number of standard days it takes for this planet to complete a single orbit
of its local star.`,
    },
    gravity: {
      type: GraphQLString,
      description: `A number denoting the gravity of this planet, where "1" is normal or 1 standard
G. "2" is twice or 2 standard Gs. "0.5" is half or 0.5 standard Gs.`,
    },
    population: {
      type: GraphQLFloat,
      resolve: (planet: any) => convertToNumber(planet.population),
      description:
        'The average population of sentient beings inhabiting this planet.',
    },
    climates: {
      type: new GraphQLList(GraphQLString),
      resolve: (planet: any) => {
        return planet.climate
          ? planet.climate.split(',').map((s: string) => s.trim())
          : null;
      },
      nullable: true,
      description: 'The climates of this planet.',
    },
    terrains: {
      type: new GraphQLList(GraphQLString),
      resolve: (planet: any) => {
        return planet.terrain
          ? planet.terrain.split(',').map((s: string) => s.trim())
          : null;
      },
      description: 'The terrains of this planet.',
    },
    surfaceWater: {
      type: GraphQLFloat,
      resolve: (planet: any) => convertToNumber(planet.surface_water),
      description: `The percentage of the planet surface that is naturally occurring water or bodies
of water.`,
    },
    residentConnection: connectionFromUrls(
      'PlanetResidents',
      'residents',
      PersonType
    ),
    filmConnection: connectionFromUrls('PlanetFilms', 'films', FilmType),
    created: createdField(),
    edited: editedField(),
    id: globalIdField('planets'),
  }),
  interfaces: () => [nodeInterface],
});
