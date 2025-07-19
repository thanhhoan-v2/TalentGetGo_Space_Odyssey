import { Heading, Text, VStack } from '@/components/ui';
import { motion } from 'framer-motion';

export function CharacterListHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <VStack gap="lg" className="mb-12 text-center">
        <Heading size="4xl" variant="gradient" className="leading-tight">
          Star Wars Characters
        </Heading>
        <Text size="xl" variant="muted" className="mx-auto max-w-3xl">
          Discover heroes, villains, and everyone in between from across the
          galaxy.
        </Text>
      </VStack>
    </motion.div>
  );
}
