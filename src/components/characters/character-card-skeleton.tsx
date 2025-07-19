import { Box, Card, CardContent, Skeleton, VStack } from '@/components/ui';

export function CharacterCardSkeleton() {
  return (
    <Card className="bg-card">
      <CardContent className="p-6">
        <Skeleton className="mb-4 w-[70%] h-6" />
        <VStack align="start" gap="sm">
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-[80%] h-4" />
          <Skeleton className="w-[90%] h-4" />
          <Skeleton className="w-[60%] h-4" />
        </VStack>
        <Box className="mt-4 pt-4 border-t border-border">
          <div className="space-y-2">
            <Skeleton className="w-full h-3" />
            <Skeleton className="w-[95%] h-3" />
            <Skeleton className="w-[85%] h-3" />
          </div>
        </Box>
      </CardContent>
    </Card>
  );
}
