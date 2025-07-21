import { Card, CardContent } from '@/components/ui';
import { useMounted } from '@/hooks/use-mounted';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useMediaQuery } from 'react-responsive';

interface FilmCardSkeletonProps {
  className?: string;
}

export function FilmCardSkeleton({ className }: FilmCardSkeletonProps) {
  const { theme } = useTheme();
  const mounted = useMounted();

  const isMobileS = useMediaQuery({ query: '(max-width: 320px)' });
  const bgClassName = theme == 'light' ? 'bg-black' : 'bg-white';

  const skeletonClassName = (
    w: string,
    h: string,
    rounded?: boolean,
    mb?: string
  ) =>
    `rounded-${rounded ? 'full' : 'none'} ${w} ${h} animate-pulse ${bgClassName} ${mb}`;

  if (!mounted) return null;

  return (
    <motion.div
      className={cn(
        'border-8 border-black',
        theme == 'light' ? 'shadow-brutal' : 'shadow-brutal-inverse',
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="shadow-none border-none rounded-none h-full theme-transition transition-all duration-300">
        <CardContent className="flex flex-col p-8 h-full">
          {/* Episode Badge and Year Skeleton */}
          <div
            className={cn(
              'flex justify-between items-center mb-4',
              isMobileS && 'flex-col items-start gap-4'
            )}
          >
            <div className={skeletonClassName('w-20', 'h-6')} />
            <div className={skeletonClassName('w-32', 'h-6')} />
          </div>

          {/* Film Title and Arrow Skeleton */}
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1 mr-4">
              <div className={skeletonClassName('w-3/4', 'h-8')} />
            </div>
            <div className={skeletonClassName('w-10', 'h-10', true)} />
          </div>

          {/* Director Badge Skeleton */}
          <div className="flex flex-1 gap-2 mb-6">
            <div className={skeletonClassName('w-28', 'h-6')} />
          </div>

          {/* Opening Crawl Skeleton */}
          <div className="pl-6 border-black border-l-2">
            {isMobileS ? (
              <>
                <div
                  className={skeletonClassName('w-full', 'h-4', false, 'mb-2')}
                />
                <div
                  className={skeletonClassName('w-full', 'h-4', false, 'mb-2')}
                />
                <div className={skeletonClassName('w-3/4', 'h-4', false)} />
              </>
            ) : (
              <>
                <div
                  className={skeletonClassName('w-full', 'h-4', false, 'mb-2')}
                />
                <div
                  className={skeletonClassName('w-full', 'h-4', false, 'mb-2')}
                />
                <div
                  className={skeletonClassName('w-full', 'h-4', false, 'mb-2')}
                />
                <div
                  className={skeletonClassName('w-full', 'h-4', false, 'mb-2')}
                />
                <div className={skeletonClassName('w-4/5', 'h-4', false)} />
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
