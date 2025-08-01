import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://swapi-graphql.netlify.app/graphql',
  cache: new InMemoryCache(),
});

export default client;
