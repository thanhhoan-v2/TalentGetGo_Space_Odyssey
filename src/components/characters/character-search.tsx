import { Box, Input } from '@chakra-ui/react';
import { Search } from 'lucide-react';

interface CharacterSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function CharacterSearch({
  searchQuery,
  onSearchChange,
}: CharacterSearchProps) {
  return (
    <Box maxW="2xl" mx="auto" mb={8} position="relative">
      <Box
        position="absolute"
        left="12px"
        top="50%"
        transform="translateY(-50%)"
        zIndex={2}
        pointerEvents="none"
      >
        <Search size={20} color="rgb(156, 163, 175)" />
      </Box>
      <Input
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search characters (e.g., Luke, Vader, Leia)..."
        bg="gray.900"
        borderColor="gray.700"
        _hover={{ borderColor: 'gray.600' }}
        _focus={{
          borderColor: 'blue.500',
          boxShadow: '0 0 0 1px rgb(59, 130, 246)',
        }}
        color="white"
        _placeholder={{ color: 'gray.400' }}
        pl="44px"
        size="lg"
      />
    </Box>
  );
}
