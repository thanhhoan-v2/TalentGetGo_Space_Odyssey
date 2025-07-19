import {
  Box,
  Card,
  CardContent,
  HStack,
  Skeleton,
  VStack,
} from '@/components/ui';
import { cn } from '@/lib/utils';

export function FilmCardSkeleton() {
  return (
    <div className="w-full max-w-[500px] h-[500px]">
      <Card
        className={cn(
          'h-full border-border bg-card/50 backdrop-blur-sm theme-transition',
          'card-glow' // Apply theme-specific effects
        )}
      >
        <CardContent className="flex flex-col p-8 h-full">
          <HStack justify="between" className="mb-4">
            <Skeleton className="rounded-full w-24 h-6" />
            <Skeleton className="w-16 h-5" />
          </HStack>

          <Skeleton className="mb-4 w-full h-8" />

          <VStack gap="sm" className="flex-1 mb-6">
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-3/4 h-4" />
          </VStack>

          <Box className="mb-6">
            <Skeleton className="mb-3 w-32 h-5" />
            <Box
              className={cn(
                'bg-muted/20 p-4 rounded-lg border border-border/50',
                'backdrop-blur-sm'
              )}
            >
              <div className="space-y-2">
                <Skeleton className="w-full h-3" />
                <Skeleton className="w-5/6 h-3" />
                <Skeleton className="w-4/5 h-3" />
              </div>
            </Box>
          </Box>

          <Skeleton className="mt-auto w-full h-12" />
        </CardContent>
      </Card>
    </div>
  );
}
