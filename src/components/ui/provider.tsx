'use client';

import { ThemeProvider } from 'next-themes';
import { type ReactNode } from 'react';

interface ProviderProps {
  children: ReactNode;
}

export function Provider({ children }: ProviderProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="empire"
      themes={['empire', 'rebel-base']}
      enableSystem={false}
      disableTransitionOnChange={false}
      storageKey="star-wars-theme"
    >
      {children}
    </ThemeProvider>
  );
}
