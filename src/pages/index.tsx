import { Film } from '@/types/swapi';
import { getAllFilms } from '@/utils/swapi';
import { GetStaticProps } from 'next';
import Link from 'next/link';

interface HomeProps {
  featuredFilms: Film[];
}

export default function Home({ featuredFilms }: HomeProps) {
  return (
    <div className="antialiased min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-black"></div>
        <div className="relative mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 max-w-7xl">
          <div className="text-center">
            <h1 className="bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-6 font-bold text-transparent text-4xl md:text-6xl lg:text-7xl">
              STAR WARS
            </h1>
            <h2 className="mb-8 font-bold text-blue-300 text-2xl md:text-4xl lg:text-5xl">
              Galaxy Explorer
            </h2>
            <p className="mx-auto mb-12 max-w-3xl text-gray-300 text-lg md:text-xl leading-relaxed">
              Journey through the vast Star Wars universe. Explore films,
              characters, planets, starships, and more from a galaxy far, far
              away. Discover the stories, heroes, and worlds that have
              captivated millions.
            </p>
            <div className="flex sm:flex-row flex-col justify-center gap-4">
              <Link
                href="/films"
                className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg font-semibold text-white text-lg transition-colors duration-200"
              >
                Explore Films
              </Link>
              <Link
                href="/characters"
                className="hover:bg-yellow-400 px-8 py-3 border-2 border-yellow-400 rounded-lg font-semibold text-yellow-400 hover:text-black text-lg transition-colors duration-200"
              >
                Meet Characters
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Films Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="mx-auto max-w-7xl">
          <h3 className="mb-12 font-bold text-yellow-400 text-3xl md:text-4xl text-center">
            Featured Films
          </h3>
          <div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {featuredFilms && featuredFilms.length > 0 ? (
              featuredFilms.map((film) => (
                <div
                  key={film.url}
                  className="bg-gray-900 hover:bg-gray-800 p-6 border border-gray-700 rounded-lg transition-colors duration-200"
                >
                  <div className="mb-4">
                    <span className="inline-block bg-blue-600 px-3 py-1 rounded-full font-semibold text-white text-sm">
                      Episode {film.episode_id}
                    </span>
                  </div>
                  <h4 className="mb-3 font-bold text-white text-xl">
                    {film.title}
                  </h4>
                  <p className="mb-3 text-gray-400 text-sm">
                    Directed by {film.director} • Released{' '}
                    {new Date(film.release_date).getFullYear()}
                  </p>
                  <p className="mb-4 text-gray-300 text-sm line-clamp-3">
                    {film.opening_crawl.substring(0, 150)}...
                  </p>
                  <Link
                    href={`/films/${film.url.match(/\/(\d+)\/$/)?.[1]}`}
                    className="inline-block bg-yellow-400 hover:bg-yellow-500 px-4 py-2 rounded font-semibold text-black transition-colors duration-200"
                  >
                    Learn More
                  </Link>
                </div>
              ))
            ) : (
              <div className="col-span-full py-12 text-center">
                <p className="text-gray-400 text-lg">
                  No featured films available at the moment.
                </p>
              </div>
            )}
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/films"
              className="inline-block bg-transparent hover:bg-blue-400 px-8 py-3 border-2 border-blue-400 rounded-lg font-semibold text-blue-400 hover:text-white transition-colors duration-200"
            >
              View All Films
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-900 px-4 sm:px-6 lg:px-8 py-16">
        <div className="mx-auto max-w-7xl">
          <h3 className="mb-12 font-bold text-white text-3xl md:text-4xl text-center">
            Explore the Galaxy
          </h3>
          <div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="flex justify-center items-center bg-blue-600 mx-auto mb-4 rounded-full w-16 h-16">
                <span className="text-2xl">🎬</span>
              </div>
              <h4 className="mb-2 font-semibold text-white text-xl">Films</h4>
              <p className="text-gray-400">
                Discover all Star Wars movies and their epic stories
              </p>
            </div>
            <div className="text-center">
              <div className="flex justify-center items-center bg-yellow-600 mx-auto mb-4 rounded-full w-16 h-16">
                <span className="text-2xl">👥</span>
              </div>
              <h4 className="mb-2 font-semibold text-white text-xl">
                Characters
              </h4>
              <p className="text-gray-400">
                Meet heroes, villains, and everyone in between
              </p>
            </div>
            <div className="text-center">
              <div className="flex justify-center items-center bg-green-600 mx-auto mb-4 rounded-full w-16 h-16">
                <span className="text-2xl">🌍</span>
              </div>
              <h4 className="mb-2 font-semibold text-white text-xl">Planets</h4>
              <p className="text-gray-400">Explore worlds across the galaxy</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center items-center bg-red-600 mx-auto mb-4 rounded-full w-16 h-16">
                <span className="text-2xl">🚀</span>
              </div>
              <h4 className="mb-2 font-semibold text-white text-xl">
                Starships
              </h4>
              <p className="text-gray-400">
                Discover the vessels that travel the stars
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const allFilms = await getAllFilms();
    // Sort by episode_id and take first 3 for featured section
    const featuredFilms = (allFilms || [])
      .sort((a, b) => a.episode_id - b.episode_id)
      .slice(0, 3);

    return {
      props: {
        featuredFilms,
      },
      revalidate: 86400, // Revalidate once per day
    };
  } catch (error) {
    console.error('Error fetching films:', error);
    return {
      props: {
        featuredFilms: [],
      },
      revalidate: 3600, // Try again in 1 hour if there was an error
    };
  }
};
