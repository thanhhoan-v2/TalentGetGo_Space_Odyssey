import { GraphQLFieldConfig, GraphQLString } from 'graphql';

// These two fields appear on all types, so let's only write them once.
export function createdField(): GraphQLFieldConfig<unknown, unknown> {
  return {
    type: GraphQLString,
    description:
      'The ISO 8601 date format of the time that this resource was created.',
  };
}

export function editedField(): GraphQLFieldConfig<unknown, unknown> {
  return {
    type: GraphQLString,
    description:
      'The ISO 8601 date format of the time that this resource was edited.',
  };
}
