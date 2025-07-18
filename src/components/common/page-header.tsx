import {
  Box,
  Container,
  Flex,
  Heading,
  Spacer,
  Stack,
  Text,
} from '@chakra-ui/react';
import Link from 'next/link';

interface PageHeaderProps {
  currentPage: 'films' | 'characters' | 'home';
}

export function PageHeader({ currentPage }: PageHeaderProps) {
  return (
    <Box as="header" bg="gray.900" borderBottom="1px" borderColor="gray.700">
      <Container maxW="7xl" py={6}>
        <Flex align="center">
          <Link href="/" passHref>
            <Heading
              size="lg"
              color="yellow.400"
              _hover={{ color: 'yellow.300' }}
              transition="colors 0.2s"
            >
              Star Wars Explorer
            </Heading>
          </Link>
          <Spacer />
          <Stack direction="row" gap={6}>
            <Link href="/films" passHref>
              <Text
                color={currentPage === 'films' ? 'yellow.400' : 'gray.300'}
                fontWeight={currentPage === 'films' ? 'semibold' : 'normal'}
                _hover={{ color: 'white' }}
                transition="colors 0.2s"
              >
                Films
              </Text>
            </Link>
            <Link href="/characters" passHref>
              <Text
                color={currentPage === 'characters' ? 'yellow.400' : 'gray.300'}
                fontWeight={
                  currentPage === 'characters' ? 'semibold' : 'normal'
                }
                _hover={{ color: 'white' }}
                transition="colors 0.2s"
              >
                Characters
              </Text>
            </Link>
          </Stack>
        </Flex>
      </Container>
    </Box>
  );
}
