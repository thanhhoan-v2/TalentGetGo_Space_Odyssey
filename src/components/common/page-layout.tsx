import { Box, Container } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { PageHeader } from './page-header';

interface PageLayoutProps {
  children: ReactNode;
  currentPage: 'films' | 'characters' | 'home';
}

export function PageLayout({ children, currentPage }: PageLayoutProps) {
  return (
    <Box minH="100vh" bg="black" color="white">
      <PageHeader currentPage={currentPage} />
      <Container maxW="7xl" py={12}>
        {children}
      </Container>
    </Box>
  );
}
