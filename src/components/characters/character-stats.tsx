import { Person } from '@/schema/swapi';
import { Box, Card, Grid, Heading, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';

interface CharacterStatsProps {
  characters: Person[];
  totalCount: number;
  isSearching: boolean;
}

export function CharacterStats({
  characters,
  totalCount,
  isSearching,
}: CharacterStatsProps) {
  if (characters.length === 0 || isSearching) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
    >
      <Card.Root
        variant="elevated"
        bg="gray.900"
        borderColor="gray.700"
        mt={16}
      >
        <Card.Body p={8} textAlign="center">
          <Heading size="xl" color="white" mb={6}>
            Galaxy Statistics
          </Heading>
          <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={6}>
            <Box>
              <Text fontSize="3xl" color="yellow.400" fontWeight="bold">
                {totalCount}
              </Text>
              <Text color="gray.300">Total Characters</Text>
            </Box>
            <Box>
              <Text fontSize="3xl" color="blue.400" fontWeight="bold">
                {characters.filter((c) => c.starships.length > 0).length}
              </Text>
              <Text color="gray.300">Starship Pilots</Text>
            </Box>
            <Box>
              <Text fontSize="3xl" color="purple.400" fontWeight="bold">
                {characters.filter((c) => c.vehicles.length > 0).length}
              </Text>
              <Text color="gray.300">Vehicle Operators</Text>
            </Box>
          </Grid>
        </Card.Body>
      </Card.Root>
    </motion.div>
  );
}
