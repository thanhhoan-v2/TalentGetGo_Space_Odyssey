import client from '@/lib/apollo-client';
import '@/styles/globals.css';
import { ROUTES } from '@/utils/routes';
import { ApolloProvider } from '@apollo/client';
import { DefaultSeo } from 'next-seo';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo
        titleTemplate="%s | Space Odyssey"
        defaultTitle="Space Odyssey"
        description="Space Odyssey is a website that provides information about the Star Wars universe."
        canonical={ROUTES.EXTERNAL.VERCEL_DOMAIN}
        openGraph={{
          type: 'website',
          locale: 'en_US',
          url: ROUTES.EXTERNAL.VERCEL_DOMAIN,
          siteName: 'Space Odyssey',
          images: [
            {
              url: `${ROUTES.EXTERNAL.VERCEL_DOMAIN}/og-image.png`,
              width: 1200,
              height: 630,
              alt: 'Space Odyssey',
            },
          ],
        }}
        twitter={{
          handle: '@spaceodyssey',
          site: '@spaceodyssey',
          cardType: 'summary_large_image',
        }}
        additionalMetaTags={[
          {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1',
          },
          {
            name: 'author',
            content: 'Space Odyssey',
          },
          {
            httpEquiv: 'x-ua-compatible',
            content: 'IE=edge',
          },
        ]}
      />
      <ApolloProvider client={client}>
        <NextThemesProvider
          attribute="data-mode"
          defaultTheme="light"
          themes={['light', 'dark']}
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <Component {...pageProps} />
        </NextThemesProvider>
      </ApolloProvider>
    </>
  );
}
