'use client';

import { GraphQLProvider } from '@/components/providers/apollo-provider';
import {
  ColorModeProvider,
  type ColorModeProviderProps,
} from '@/components/ui/color-mode';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { ClerkProvider } from '@clerk/nextjs';

export function Provider(props: ColorModeProviderProps) {
  return (
    <ClerkProvider>
      <GraphQLProvider>
        <ChakraProvider value={defaultSystem}>
          <ColorModeProvider {...props} />
        </ChakraProvider>
      </GraphQLProvider>
    </ClerkProvider>
  );
}
