import {
  Badge,
  Box,
  Button,
  Card,
  CardContent,
  Heading,
  HStack,
  Text,
  VStack,
} from '@/components/ui';
import { cn } from '@/lib/utils';
import { Film } from '@/schema/swapi';
import { extractIdFromUrl } from '@/utils/swapi';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface FilmCardProps {
  film: Film;
}

export function FilmCard({ film }: FilmCardProps) {
  return (
    <motion.div
      className="w-full max-w-[500px] h-[500px]"
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
          'h-full border-border bg-card/50 backdrop-blur-sm transition-all duration-300 cursor-pointer theme-transition',
          'hover:border-secondary hover:shadow-lg hover:-translate-y-1',
          'card-glow' // Apply theme-specific glow/shadow effects
        )}
      >
        <CardContent className="flex flex-col p-8 h-full">
          {/* Episode Badge and Year */}
          <HStack justify="between" className="mb-4">
            <Badge
              variant="secondary"
              className="bg-secondary px-3 py-1 font-bold text-secondary-foreground text-sm"
            >
              Episode {film.episode_id}
            </Badge>
            <Text variant="muted" size="sm">
              {new Date(film.release_date).getFullYear()}
            </Text>
          </HStack>

          {/* Film Title */}
          <Heading
            as="h2"
            size="xl"
            className="mb-4 text-foreground leading-tight"
          >
            {film.title}
          </Heading>

          {/* Film Details */}
          <VStack gap="sm" className="flex-1 mb-6">
            <Text variant="default" className="w-full text-left">
              <Text as="span" variant="secondary" weight="semibold">
                Director:
              </Text>{' '}
              {film.director}
            </Text>
            <Text variant="default" className="w-full text-left">
              <Text as="span" variant="secondary" weight="semibold">
                Release Date:
              </Text>{' '}
              {new Date(film.release_date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </Text>
          </VStack>

          {/* Opening Crawl Preview */}
          <Box className="mb-6">
            <Heading as="h3" size="md" variant="primary" className="mb-3">
              Opening Crawl
            </Heading>
            <Box
              className={cn(
                'bg-muted/20 p-4 rounded-lg border border-border/50',
                'backdrop-blur-sm'
              )}
            >
              <Text variant="muted" size="sm" className="leading-relaxed">
                {film.opening_crawl.length > 400
                  ? `${film.opening_crawl.substring(0, 400)}...`
                  : film.opening_crawl}
              </Text>
            </Box>
          </Box>

          {/* Action Button */}
          <Link
            href={`/films/${extractIdFromUrl(film.url)}`}
            className="mt-auto"
          >
            <Button
              size="lg"
              className={cn(
                'w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold',
                'transition-all duration-200 hover:-translate-y-1'
              )}
            >
              View Full Details
            </Button>
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  );
}
