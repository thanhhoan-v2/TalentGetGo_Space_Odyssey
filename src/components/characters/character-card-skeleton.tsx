import { Box, Card, Skeleton, SkeletonText, VStack } from '@chakra-ui/react';

export function CharacterCardSkeleton() {
  return (
    <Card.Root variant="elevated" bg="gray.900">
      <Card.Body p={6}>
        <Skeleton height="24px" width="70%" mb={4} />
        <VStack align="start" gap={3}>
          <Skeleton height="16px" width="100%" />
          <Skeleton height="16px" width="80%" />
          <Skeleton height="16px" width="90%" />
          <Skeleton height="16px" width="60%" />
        </VStack>
        <Box mt={4} pt={4} borderTop="1px solid" borderColor="gray.700">
          <SkeletonText noOfLines={3} />
        </Box>
      </Card.Body>
    </Card.Root>
  );
}
