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
 * The GraphQL type equivalent of the Starship resource
 */
export const StarshipType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Starship',
  description: 'A single transport craft that has hyperdrive capability.',
  fields: () => ({
    name: {
      type: GraphQLString,
      description:
        'The name of this starship. The common name, such as "Death Star".',
    },
    model: {
      type: GraphQLString,
      description: `The model or official name of this starship. Such as "T-65 X-wing" or "DS-1
Orbital Battle Station".`,
    },
    starshipClass: {
      type: GraphQLString,
      resolve: (ship: any) => ship.starship_class,
      description: `The class of this starship, such as "Starfighter" or "Deep Space Mobile
Battlestation"`,
    },
    manufacturers: {
      type: new GraphQLList(GraphQLString),
      resolve: (ship: any) => {
        return ship.manufacturer
          ? ship.manufacturer.split(',').map((s: string) => s.trim())
          : null;
      },
      description: 'The manufacturers of this starship.',
    },
    costInCredits: {
      type: GraphQLFloat,
      resolve: (ship: any) => convertToNumber(ship.cost_in_credits),
      description: 'The cost of this starship new, in galactic credits.',
    },
    length: {
      type: GraphQLFloat,
      resolve: (ship: any) => convertToNumber(ship.length),
      description: 'The length of this starship in meters.',
    },
    crew: {
      type: GraphQLString,
      description:
        'The number of personnel needed to run or pilot this starship.',
    },
    passengers: {
      type: GraphQLString,
      description:
        'The number of non-essential people this starship can transport.',
    },
    maxAtmospheringSpeed: {
      type: GraphQLInt,
      resolve: (ship: any) => convertToNumber(ship.max_atmosphering_speed),
      description: `The maximum speed of this starship in atmosphere. null if this starship is
incapable of atmosphering flight.`,
    },
    hyperdriveRating: {
      type: GraphQLFloat,
      resolve: (ship: any) => convertToNumber(ship.hyperdrive_rating),
      description: 'The class of this starships hyperdrive.',
    },
    MGLT: {
      type: GraphQLInt,
      resolve: (ship: any) => convertToNumber(ship.MGLT),
      description: `The Maximum number of Megalights this starship can travel in a standard hour.
A "Megalight" is a standard unit of distance and has never been defined before
within the Star Wars universe. This figure is only really useful for measuring
the difference in speed of starships. We can assume it is similar to AU, the
distance between our Sun (Sol) and Earth.`,
    },
    cargoCapacity: {
      type: GraphQLFloat,
      resolve: (ship: any) => convertToNumber(ship.cargo_capacity),
      description:
        'The maximum number of kilograms that this starship can transport.',
    },
    consumables: {
      type: GraphQLString,
      description: `The maximum length of time that this starship can provide consumables for its
entire crew without having to resupply.`,
    },
    pilotConnection: connectionFromUrls('StarshipPilots', 'pilots', PersonType),
    filmConnection: connectionFromUrls('StarshipFilms', 'films', FilmType),
    created: createdField(),
    edited: editedField(),
    id: globalIdField('starships'),
  }),
  interfaces: () => [nodeInterface],
});
