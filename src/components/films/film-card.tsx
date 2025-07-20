import { Badge, Card, CardContent } from '@/components/ui';
import { cn } from '@/lib/utils';
import { Film } from '@/schema/swapi';
import { extractIdFromUrl } from '@/utils/swapi';
import { motion } from 'framer-motion';
import { ArrowUpRight, ClapperboardIcon, Clock10Icon } from 'lucide-react';
import { useTheme } from 'next-themes';
import Link from 'next/link';

interface FilmCardProps {
  film: Film;
}

export function FilmCard({ film }: FilmCardProps) {
  const { theme } = useTheme();
  return (
    <motion.div
      className="w-full max-w-[400px] h-[550px]"
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        className={cn(
          'bg-black py-0 mb-0 backdrop-blur-sm border-border h-full theme-transition transition-all duration-300 cursor-pointer',
          theme == 'light' ? 'bg-black text-white' : 'bg-white text-black'
        )}
      >
        <Link href={`/films/${extractIdFromUrl(film.url)}`}>
          <CardContent className="group flex flex-col p-8 h-full">
            {/* Episode Badge and Year */}
            <div className="flex justify-between items-center mb-4">
              <Badge variant="episode">Episode {film.episode_id}</Badge>
              <Badge variant="releaseDate">
                <Clock10Icon />
                {new Date(film.release_date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </Badge>
            </div>
            {/* Film Title */}
            <div className="flex justify-between items-start mb-4 text-foreground leading-tight">
              <h2 className="font-semibold text-2xl leading-snug">
                {film.title}
              </h2>
              <div className="group flex items-center gap-2 bg-[#FDFFB8] backdrop-blur-md p-2 border-1 border-black rounded-full text-black group-hover:scale-120 transition-all duration-500">
                <ArrowUpRight className="w-4 h-4 group-hover:-rotate-22 group-hover:scale-150 transition-transform duration-300" />
              </div>
            </div>
            {/* Film Details */}
            <div className="flex flex-1 gap-2">
              <Badge variant="director">
                <ClapperboardIcon />
                {film.director}
              </Badge>
            </div>
            {/* Opening Crawl Preview */}
            <blockquote className="mt-6 pl-6 border-l-2 italic">
              &quot;{film.opening_crawl}&quot;
            </blockquote>
          </CardContent>
        </Link>
      </Card>
    </motion.div>
  );
}
