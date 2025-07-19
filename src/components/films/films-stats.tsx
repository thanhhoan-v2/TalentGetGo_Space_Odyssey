import { Film } from '@/schema/swapi';
import { Box, Card, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';

interface FilmsStatsProps {
  films: Film[];
}

export function FilmsStats({ films }: FilmsStatsProps) {
  if (!films || films.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card.Root
        size="lg"
        variant="elevated"
        bg="gray.900"
        borderColor="gray.700"
      >
        <Card.Body p={8} textAlign="center">
          <Heading size="xl" color="white" mb={4}>
            Film Collection Stats
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
            <Box>
              <Text fontSize="3xl" color="yellow.400" fontWeight="bold">
                {films.length}
              </Text>
              <Text color="gray.300">Total Films</Text>
            </Box>
            <Box>
              <Text fontSize="3xl" color="blue.400" fontWeight="bold">
                {new Set(films.map((f) => f.director)).size}
              </Text>
              <Text color="gray.300">Directors</Text>
            </Box>
            <Box>
              <Text fontSize="3xl" color="green.400" fontWeight="bold">
                {Math.max(...films.map((f) => f.episode_id)) -
                  Math.min(...films.map((f) => f.episode_id)) +
                  1}
              </Text>
              <Text color="gray.300">Episode Range</Text>
            </Box>
          </SimpleGrid>
        </Card.Body>
      </Card.Root>
    </motion.div>
  );
}
