import {
  Box,
  Card,
  HStack,
  Skeleton,
  SkeletonText,
  Stack,
} from '@chakra-ui/react';

export function FilmCardSkeleton() {
  return (
    <Card.Root size="lg" variant="elevated" bg="gray.900">
      <Card.Body p={8}>
        <HStack justify="space-between" mb={4}>
          <Skeleton height="24px" width="100px" />
          <Skeleton height="20px" width="60px" />
        </HStack>
        <Skeleton height="32px" width="100%" mb={4} />
        <Stack gap={2} mb={6}>
          <SkeletonText noOfLines={3} />
        </Stack>
        <Box mb={6}>
          <Skeleton height="20px" width="120px" mb={3} />
          <SkeletonText noOfLines={3} />
        </Box>
        <Skeleton height="48px" width="100%" />
      </Card.Body>
    </Card.Root>
  );
}
