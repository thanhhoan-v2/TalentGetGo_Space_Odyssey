import {
  GraphQLFloat,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import { globalIdField } from 'graphql-relay';

import { convertToNumber, getObjectFromUrl } from '@/schema/api-helper';
import { createdField, editedField } from '@/schema/common-fields';
import { connectionFromUrls } from '@/schema/connections';
import { nodeInterface } from '@/schema/relay-node';

import { FilmType } from '@/schema/types/film';
import { PersonType } from '@/schema/types/person';
import { PlanetType } from '@/schema/types/planet';

/**
 * The GraphQL type equivalent of the Species resource
 */
export const SpeciesType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Species',
  description: 'A type of person or character within the Star Wars Universe.',
  fields: () => ({
    name: {
      type: GraphQLString,
      description: 'The name of this species.',
    },
    classification: {
      type: GraphQLString,
      description:
        'The classification of this species, such as "mammal" or "reptile".',
    },
    designation: {
      type: GraphQLString,
      description: 'The designation of this species, such as "sentient".',
    },
    averageHeight: {
      type: GraphQLFloat,
      resolve: (species: any) => convertToNumber(species.average_height),
      description: 'The average height of this species in centimeters.',
    },
    averageLifespan: {
      type: GraphQLInt,
      resolve: (species: any) => convertToNumber(species.average_lifespan),
      description:
        'The average lifespan of this species in years, null if unknown.',
    },
    eyeColors: {
      type: new GraphQLList(GraphQLString),
      resolve: (species: any) => {
        return species.eye_colors
          ? species.eye_colors.split(',').map((s: string) => s.trim())
          : null;
      },
      description: `Common eye colors for this species, null if this species does not typically
have eyes.`,
    },
    hairColors: {
      type: new GraphQLList(GraphQLString),
      resolve: (species: any) => {
        if (species.hair_colors === 'none') {
          return [];
        }
        return species.hair_colors
          ? species.hair_colors.split(',').map((s: string) => s.trim())
          : null;
      },
      description: `Common hair colors for this species, null if this species does not typically
have hair.`,
    },
    skinColors: {
      type: new GraphQLList(GraphQLString),
      resolve: (species: any) => {
        return species.skin_colors
          ? species.skin_colors.split(',').map((s: string) => s.trim())
          : null;
      },
      description: `Common skin colors for this species, null if this species does not typically
have skin.`,
    },
    language: {
      type: GraphQLString,
      description: 'The language commonly spoken by this species.',
    },
    homeworld: {
      type: PlanetType,
      resolve: (species: any) =>
        species.homeworld ? getObjectFromUrl(species.homeworld) : null,
      description: 'A planet that this species originates from.',
    },
    personConnection: connectionFromUrls('SpeciesPeople', 'people', PersonType),
    filmConnection: connectionFromUrls('SpeciesFilms', 'films', FilmType),
    created: createdField(),
    edited: editedField(),
    id: globalIdField('species'),
  }),
  interfaces: () => [nodeInterface],
});
