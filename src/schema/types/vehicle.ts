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
 * The GraphQL type equivalent of the Vehicle resource
 */
export const VehicleType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Vehicle',
  description:
    'A single transport craft that does not have hyperdrive capability',
  fields: () => ({
    name: {
      type: GraphQLString,
      description: `The name of this vehicle. The common name, such as "Sand Crawler" or "Speeder
bike".`,
    },
    model: {
      type: GraphQLString,
      description: `The model or official name of this vehicle. Such as "All-Terrain Attack
Transport".`,
    },
    vehicleClass: {
      type: GraphQLString,
      resolve: (vehicle: any) => vehicle.vehicle_class,
      description:
        'The class of this vehicle, such as "Wheeled" or "Repulsorcraft".',
    },
    manufacturers: {
      type: new GraphQLList(GraphQLString),
      resolve: (vehicle: any) => {
        return vehicle.manufacturer
          ? vehicle.manufacturer.split(',').map((s: string) => s.trim())
          : null;
      },
      description: 'The manufacturers of this vehicle.',
    },
    costInCredits: {
      type: GraphQLFloat,
      resolve: (vehicle: any) => convertToNumber(vehicle.cost_in_credits),
      description: 'The cost of this vehicle new, in Galactic Credits.',
    },
    length: {
      type: GraphQLFloat,
      resolve: (vehicle: any) => convertToNumber(vehicle.length),
      description: 'The length of this vehicle in meters.',
    },
    crew: {
      type: GraphQLString,
      description:
        'The number of personnel needed to run or pilot this vehicle.',
    },
    passengers: {
      type: GraphQLString,
      description:
        'The number of non-essential people this vehicle can transport.',
    },
    maxAtmospheringSpeed: {
      type: GraphQLInt,
      resolve: (vehicle: any) =>
        convertToNumber(vehicle.max_atmosphering_speed),
      description: 'The maximum speed of this vehicle in atmosphere.',
    },
    cargoCapacity: {
      type: GraphQLFloat,
      resolve: (ship: any) => convertToNumber(ship.cargo_capacity),
      description:
        'The maximum number of kilograms that this vehicle can transport.',
    },
    consumables: {
      type: GraphQLString,
      description: `The maximum length of time that this vehicle can provide consumables for its
entire crew without having to resupply.`,
    },
    pilotConnection: connectionFromUrls('VehiclePilots', 'pilots', PersonType),
    filmConnection: connectionFromUrls('VehicleFilms', 'films', FilmType),
    created: createdField(),
    edited: editedField(),
    id: globalIdField('vehicles'),
  }),
  interfaces: () => [nodeInterface],
});
