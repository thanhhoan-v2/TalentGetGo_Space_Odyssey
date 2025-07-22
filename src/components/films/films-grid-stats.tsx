import { NumberTicker } from '@/components/animated';
import { Card, CardContent } from '@/components/ui';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';

interface FilmGridStatsProps {
  films: {
    id: string;
    director: string;
    openingCrawl: string;
    releaseDate: string;
    title: string;
  }[];
}

export default function FilmGridStats({ films }: FilmGridStatsProps) {
  const { theme } = useTheme();
  if (!films || films.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className={cn(
        'border-8 border-black mb-12',
        theme == 'light' ? 'shadow-brutal' : 'shadow-brutal-inverse'
      )}
    >
      <Card className="shadow-none border-none rounded-none theme-transition">
        <CardContent className="p-2 text-center">
          <div className="gap-6 grid grid-cols-2">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  'px-2 w-fit text-xl md:text-2xl',
                  theme === 'light'
                    ? 'text-white bg-black'
                    : 'text-black bg-white'
                )}
              >
                Episodes
              </div>
              <NumberTicker
                className="text-6xl md:text-8xl"
                value={films.length}
              />
            </div>
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  'px-2 w-fit text-xl md:text-2xl',
                  theme === 'light'
                    ? 'text-white bg-black'
                    : 'text-black bg-white'
                )}
              >
                Directors
              </div>
              <NumberTicker
                className="text-6xl md:text-8xl"
                value={new Set(films.map((f) => f.director)).size}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
