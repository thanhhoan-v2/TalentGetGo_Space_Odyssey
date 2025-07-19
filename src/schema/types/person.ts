import {
  GraphQLFloat,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import { globalIdField } from 'graphql-relay';

import { convertToNumber, getObjectFromUrl } from '@/schema/api-helper';
import { createdField, editedField } from '@/schema/common-fields';
import { connectionFromUrls } from '@/schema/connections';
import { nodeInterface } from '@/schema/relay-node';

import { FilmType } from '@/schema/types/film';
import { PlanetType } from '@/schema/types/planet';
import { SpeciesType } from '@/schema/types/species';
import { StarshipType } from '@/schema/types/starship';
import { VehicleType } from '@/schema/types/vehicle';

/**
 * The GraphQL type equivalent of the People resource
 */
export const PersonType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Person',
  description:
    'An individual person or character within the Star Wars universe.',
  fields: () => ({
    name: {
      type: GraphQLString,
      description: 'The name of this person.',
    },
    birthYear: {
      type: GraphQLString,
      resolve: (person: any) => person.birth_year,
      description: `The birth year of the person, using the in-universe standard of BBY or ABY -
Before the Battle of Yavin or After the Battle of Yavin. The Battle of Yavin is
a battle that occurs at the end of Star Wars episode IV: A New Hope.`,
    },
    eyeColor: {
      type: GraphQLString,
      resolve: (person: any) => person.eye_color,
      description: `The eye color of this person. Will be "unknown" if not known or "n/a" if the
person does not have an eye.`,
    },
    gender: {
      type: GraphQLString,
      description: `The gender of this person. Either "Male", "Female" or "unknown",
"n/a" if the person does not have a gender.`,
    },
    hairColor: {
      type: GraphQLString,
      resolve: (person: any) => person.hair_color,
      description: `The hair color of this person. Will be "unknown" if not known or "n/a" if the
person does not have hair.`,
    },
    height: {
      type: GraphQLInt,
      resolve: (person: any) => convertToNumber(person.height),
      description: 'The height of the person in centimeters.',
    },
    mass: {
      type: GraphQLFloat,
      resolve: (person: any) => convertToNumber(person.mass),
      description: 'The mass of the person in kilograms.',
    },
    skinColor: {
      type: GraphQLString,
      resolve: (person: any) => person.skin_color,
      description: 'The skin color of this person.',
    },
    homeworld: {
      type: PlanetType,
      resolve: (person: any) =>
        person.homeworld ? getObjectFromUrl(person.homeworld) : null,
      description: 'A planet that this person was born on or inhabits.',
    },
    filmConnection: connectionFromUrls('PersonFilms', 'films', FilmType),
    species: {
      type: SpeciesType,
      resolve: (person: any) => {
        if (!person.species || person.species.length === 0) {
          return null;
        }
        return getObjectFromUrl(person.species[0]);
      },
      description:
        'The species that this person belongs to, or null if unknown.',
    },
    starshipConnection: connectionFromUrls(
      'PersonStarships',
      'starships',
      StarshipType
    ),
    vehicleConnection: connectionFromUrls(
      'PersonVehicles',
      'vehicles',
      VehicleType
    ),
    created: createdField(),
    edited: editedField(),
    id: globalIdField('people'),
  }),
  interfaces: () => [nodeInterface],
});
