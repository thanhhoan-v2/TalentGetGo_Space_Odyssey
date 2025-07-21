import client from '@/lib/apollo-client';
import '@/styles/globals.css';
import { ApolloProvider } from '@apollo/client';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <NextThemesProvider
        attribute="data-mode"
        defaultTheme="dark"
        themes={['light', 'dark']}
        enableSystem={false}
        disableTransitionOnChange={false}
      >
        <Component {...pageProps} />
      </NextThemesProvider>
    </ApolloProvider>
  );
}
