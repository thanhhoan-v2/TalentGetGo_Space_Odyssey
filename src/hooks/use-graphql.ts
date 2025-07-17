import {
  MutationHookOptions,
  OperationVariables,
  QueryHookOptions,
  SubscriptionHookOptions,
  useMutation,
  useQuery,
  useSubscription,
} from '@apollo/client';
import { DocumentNode } from 'graphql';

// Generic query hook with better error handling
export function useGraphQLQuery<
  T = unknown,
  V extends OperationVariables = OperationVariables,
>(query: DocumentNode, options?: QueryHookOptions<T, V>) {
  const result = useQuery<T, V>(query, {
    errorPolicy: 'all',
    notifyOnNetworkStatusChange: true,
    ...options,
  });

  return {
    ...result,
    isLoading: result.loading,
    hasError: !!result.error,
    errorMessage: result.error?.message,
  };
}

// Generic mutation hook with better error handling
export function useGraphQLMutation<
  T = unknown,
  V extends OperationVariables = OperationVariables,
>(mutation: DocumentNode, options?: MutationHookOptions<T, V>) {
  const [mutate, result] = useMutation<T, V>(mutation, {
    errorPolicy: 'all',
    ...options,
  });

  return [
    mutate,
    {
      ...result,
      isLoading: result.loading,
      hasError: !!result.error,
      errorMessage: result.error?.message,
    },
  ] as const;
}

// Generic subscription hook with better error handling
export function useGraphQLSubscription<
  T = unknown,
  V extends OperationVariables = OperationVariables,
>(subscription: DocumentNode, options?: SubscriptionHookOptions<T, V>) {
  const result = useSubscription<T, V>(subscription, {
    errorPolicy: 'all',
    ...options,
  });

  return {
    ...result,
    isLoading: result.loading,
    hasError: !!result.error,
    errorMessage: result.error?.message,
  };
}
