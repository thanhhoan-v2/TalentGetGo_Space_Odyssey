import { Heading, Text, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';

export function CharacterListHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <VStack gap={6} mb={12} textAlign="center">
        <Heading
          size={{ base: '2xl', md: '4xl' }}
          bgGradient="linear(to-r, yellow.400, orange.500)"
          bgClip="text"
          lineHeight="shorter"
        >
          Star Wars Characters
        </Heading>
        <Text
          fontSize={{ base: 'lg', md: 'xl' }}
          color="gray.300"
          maxW="3xl"
          mx="auto"
        >
          Discover heroes, villains, and everyone in between from across the
          galaxy.
        </Text>
      </VStack>
    </motion.div>
  );
}
