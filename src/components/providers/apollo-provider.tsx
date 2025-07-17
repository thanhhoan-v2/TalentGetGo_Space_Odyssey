'use client';

import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  from,
  InMemoryCache,
  split,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { useAuth } from '@clerk/nextjs';
import { createClient } from 'graphql-ws';
import { ReactNode, useMemo } from 'react';

interface GraphQLProviderProps {
  children: ReactNode;
}

export function GraphQLProvider({ children }: GraphQLProviderProps) {
  const { getToken } = useAuth();

  const apolloClient = useMemo(() => {
    // HTTP Link for queries and mutations
    const httpLink = createHttpLink({
      uri: process.env.NEXT_PUBLIC_HASURA_GRAPHQL_URL,
    });

    // Auth middleware to add JWT token from Clerk
    const authMiddleware = setContext(async (_, { headers }) => {
      let token = null;

      try {
        // Get Clerk token with Hasura template
        token = await getToken({ template: 'hasura' });
      } catch (error) {
        console.warn('Failed to get Clerk token:', error);
      }

      return {
        headers: {
          ...headers,
          'content-type': 'application/json',
          // Use Clerk JWT token if available, otherwise fallback to admin secret for development
          ...(token && { authorization: `Bearer ${token}` }),
          ...(!token &&
            process.env.HASURA_GRAPHQL_ADMIN_SECRET && {
              'x-hasura-admin-secret': process.env.HASURA_GRAPHQL_ADMIN_SECRET,
            }),
        },
      };
    });

    // WebSocket Link for subscriptions with Clerk JWT
    const wsLink =
      typeof window !== 'undefined'
        ? new GraphQLWsLink(
            createClient({
              url: process.env.NEXT_PUBLIC_HASURA_GRAPHQL_WS_URL || '',
              connectionParams: async () => {
                let token = null;

                try {
                  // Get Clerk token with Hasura template
                  token = await getToken({ template: 'hasura' });
                } catch (error) {
                  console.warn(
                    'Failed to get Clerk token for WebSocket:',
                    error
                  );
                }

                return {
                  headers: {
                    ...(token && { authorization: `Bearer ${token}` }),
                    // Fallback to admin secret for development
                    ...(!token &&
                      process.env.HASURA_GRAPHQL_ADMIN_SECRET && {
                        'x-hasura-admin-secret':
                          process.env.HASURA_GRAPHQL_ADMIN_SECRET,
                      }),
                  },
                };
              },
            })
          )
        : null;

    // Split link for HTTP and WebSocket
    const splitLink =
      typeof window !== 'undefined' && wsLink
        ? split(
            ({ query }) => {
              const definition = getMainDefinition(query);
              return (
                definition.kind === 'OperationDefinition' &&
                definition.operation === 'subscription'
              );
            },
            wsLink,
            from([authMiddleware, httpLink])
          )
        : from([authMiddleware, httpLink]);

    return new ApolloClient({
      link: splitLink,
      cache: new InMemoryCache({
        typePolicies: {
          // Add type policies here if needed for caching
        },
      }),
      defaultOptions: {
        watchQuery: {
          errorPolicy: 'all',
        },
        query: {
          errorPolicy: 'all',
        },
      },
    });
  }, [getToken]);

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}
