'use client';

import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { useAuth } from '@clerk/nextjs';
import { ReactNode } from 'react';
import { SignInButton } from './sign-in-button';

interface AuthGuardProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function AuthGuard({ children, fallback }: AuthGuardProps) {
  const { isSignedIn, isLoaded } = useAuth();

  // Show loading state while auth is being determined
  if (!isLoaded) {
    return (
      <Flex justify="center" align="center" minHeight="100vh">
        <Text>Loading...</Text>
      </Flex>
    );
  }

  // Show sign-in prompt if not authenticated
  if (!isSignedIn) {
    return (
      fallback || (
        <Flex
          justify="center"
          align="center"
          minHeight="100vh"
          direction="column"
        >
          <Box textAlign="center" p={8}>
            <Heading size="lg" mb={4}>
              Authentication Required
            </Heading>
            <Text mb={6} color="gray.600">
              Please sign in to access this page.
            </Text>
            <SignInButton />
          </Box>
        </Flex>
      )
    );
  }

  // Render protected content
  return <>{children}</>;
}
