import { useMounted } from '@/hooks/use-mounted';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';

interface CharacterGridCardSkeletonProps {
  index?: number;
  imageWidth?: string;
  imageHeight?: string;
  className?: string;
}

export default function CharacterGridCardSkeleton({
  index = 0,
  imageWidth,
  imageHeight,
  className,
}: CharacterGridCardSkeletonProps) {
  const mounted = useMounted();
  const { theme } = useTheme();

  const bgClassName = (bg: string) =>
    theme == 'light' ? `bg-${bg}` : `bg-${bg}-dark`;

  const skeletonClassName = (
    w: string,
    h: string,
    rounded?: boolean,
    mb?: string,
    bg?: string
  ) =>
    `rounded-${rounded ? 'full' : 'none'} ${w} ${h} animate-pulse ${bg} ${mb}`;

  if (!mounted) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className={cn(className)}
    >
      <div className={cn('group block mx-auto w-[280px]', imageWidth)}>
        <div className="relative overflow-hidden">
          <div
            className={cn(
              'relative h-[320px] overflow-hidden bg-muted animate-pulse',
              imageHeight
            )}
          >
            {/* Image placeholder with subtle animation */}
            <div
              className={cn(
                'absolute inset-0 bg-gradient-to-br from-muted via-muted/80 to-muted animate-pulse',
                theme == 'light' ? 'bg-gray-400' : 'bg-white'
              )}
            />
          </div>

          {/* Gradient overlay (same as original) */}
          <div
            className={cn(
              'absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent',
              bgClassName
            )}
          />

          {/* Bottom content area */}
          <div className="right-0 bottom-0 left-0 absolute p-5">
            <div className="flex justify-between items-center gap-3">
              <div className="flex-1 space-y-1.5">
                {/* Character name skeleton */}
                <div
                  className={skeletonClassName(
                    'w-3/4',
                    'h-6',
                    false,
                    'bg-white/20'
                  )}
                />
              </div>
              {/* Arrow icon skeleton */}
              <div
                className={cn(
                  skeletonClassName('w-6', 'h-6', false, 'bg-white/20')
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
