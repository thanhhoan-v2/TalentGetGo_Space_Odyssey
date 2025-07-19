import { getObjectFromTypeAndId } from './api-helper';

import { GraphQLObjectType } from 'graphql';

import { fromGlobalId, nodeDefinitions } from 'graphql-relay';

// Import types
import { FilmType } from '@/schema/types/film';
import { PersonType } from '@/schema/types/person';
import { PlanetType } from '@/schema/types/planet';
import { SpeciesType } from '@/schema/types/species';
import { StarshipType } from '@/schema/types/starship';
import { VehicleType } from '@/schema/types/vehicle';

/**
 * Given a "type" in SWAPI, returns the corresponding GraphQL type.
 */
export function swapiTypeToGraphQLType(swapiType: string): GraphQLObjectType {
  switch (swapiType) {
    case 'films':
      return FilmType;
    case 'people':
      return PersonType;
    case 'planets':
      return PlanetType;
    case 'starships':
      return StarshipType;
    case 'vehicles':
      return VehicleType;
    case 'species':
      return SpeciesType;
    default:
      throw new Error('Unrecognized type `' + swapiType + '`.');
  }
}

const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId: string) => {
    const { type, id } = fromGlobalId(globalId);
    return getObjectFromTypeAndId(type, id);
  },
  (obj: Record<string, unknown>): string => {
    const parts = (obj.url as string).split('/');
    return parts[parts.length - 3];
  }
);

export { nodeField, nodeInterface };
