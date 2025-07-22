import client from '@/lib/apollo-client';
import { GET_ALL_FILMS } from '@/lib/queries';
import { extractNumber, FilmEdge } from '@/utils/swapi-graphql';
import { convertSwapiTechToPerson, fetchCharacters } from '@/utils/swapi-tech';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader('Content-Type', 'text/xml');
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate'); // Cache for 24 hours

  // Fetch your dynamic pages
  const { data } = await client.query({
    query: GET_ALL_FILMS,
  });
  // Extract films from the GraphQL response and add generated IDs
  const filmsFromEdges: FilmEdge[] = data?.allFilms?.edges || [];
  const graphqlFilms = filmsFromEdges.map((edge: FilmEdge, index: number) => ({
    id: (index + 1).toString(), // Generate ID based on index
    title: edge.node.title,
    director: edge.node.director,
    releaseDate: edge.node.releaseDate,
    openingCrawl: edge.node.openingCrawl,
  }));

  const result = await fetchCharacters(1);
  const initialCharacters = result.characters.map(convertSwapiTechToPerson);

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>https://space-odyssey.vercel.app</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>
      ${graphqlFilms
        .map(
          (film) => `
        <url>
          <loc>https://space-odyssey.vercel.app/films/${film.id}</loc>
          <lastmod>${film.releaseDate}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.8</priority>
        </url>
      `
        )
        .join('')}
      ${initialCharacters
        .map(
          (character) => `
        <url>
          <loc>https://space-odyssey.vercel.app/characters/${extractNumber(character.url)}</loc>
          <changefreq>weekly</changefreq>
          <priority>0.7</priority>
        </url>
      `
        )
        .join('')}
    </urlset>`;

  res.write(sitemap);
  res.end();
}
