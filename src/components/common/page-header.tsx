'use client';

import StarWarsLogo from '@/assets/starwars-logo.png';
import TalentGetGoLogo from '@/assets/talentgetgo.png';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  IconButton,
  useBreakpointValue,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { Film, Home, Menu, Users, X, XIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface PageHeaderProps {
  currentPage?: 'films' | 'characters' | 'home';
  transparent?: boolean;
}

export function PageHeader({
  currentPage,
  transparent = false,
}: PageHeaderProps) {
  const { open, onToggle, onClose } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, lg: false });
  const router = useRouter();

  const isActive = (path: string) => router.pathname === path;
  const isHomePage = router.pathname === '/';

  return (
    <Box
      as="nav"
      position="sticky"
      top={0}
      zIndex={50}
      bg={transparent || isHomePage ? 'transparent' : 'rgba(0, 0, 0, 0.95)'}
      backdropFilter={transparent || isHomePage ? 'blur(20px)' : 'blur(10px)'}
      borderBottom={transparent || isHomePage ? 'none' : '1px'}
      borderColor="gray.800"
      boxShadow={
        transparent || isHomePage ? 'none' : '0 4px 32px rgba(0, 0, 0, 0.5)'
      }
      transition="all 0.3s ease"
    >
      <Container maxW="7xl" py={4}>
        <Flex align="center" justify="space-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/">
              <Flex align="center" gap={3} cursor="pointer">
                <Image
                  src={TalentGetGoLogo}
                  style={{ borderRadius: '1rem' }}
                  alt="Star Wars Explorer"
                  width={80}
                  height={80}
                />
                <XIcon size={24} color="white" fill="white" />
                <Image
                  src={StarWarsLogo}
                  alt="Star Wars Explorer"
                  width={60}
                  height={60}
                />
                <Heading
                  size={{ base: 'md', md: 'lg' }}
                  bgGradient="linear(to-r, yellow.400, orange.500)"
                  bgClip="text"
                  fontWeight="bold"
                  _hover={{
                    bgGradient: 'linear(to-r, yellow.300, orange.400)',
                    transform: 'scale(1.05)',
                  }}
                  transition="all 0.2s"
                  textShadow={
                    isHomePage ? '0 0 10px rgba(0, 0, 0, 0.8)' : 'none'
                  }
                  filter={
                    isHomePage
                      ? 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.8))'
                      : 'none'
                  }
                >
                  Star Wars Explorer
                </Heading>
              </Flex>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          {!isMobile && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <HStack gap={2}>
                <Link href="/">
                  <Button
                    variant="ghost"
                    color={
                      isActive('/')
                        ? 'yellow.400'
                        : isHomePage
                          ? 'white'
                          : 'gray.300'
                    }
                    _hover={{
                      color: 'yellow.400',
                      bg: 'rgba(255, 255, 255, 0.1)',
                      transform: 'translateY(-2px)',
                    }}
                    transition="all 0.2s"
                    size={{ base: 'sm', md: 'md' }}
                    fontWeight={isActive('/') ? 'bold' : 'medium'}
                    textShadow={
                      isHomePage ? '0 0 10px rgba(0, 0, 0, 0.8)' : 'none'
                    }
                    filter={
                      isHomePage
                        ? 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.8))'
                        : 'none'
                    }
                  >
                    <HStack gap={2}>
                      <Home size={18} />
                      <span>Home</span>
                    </HStack>
                  </Button>
                </Link>
                <Link href="/films">
                  <Button
                    variant="ghost"
                    color={
                      isActive('/films')
                        ? 'yellow.400'
                        : isHomePage
                          ? 'white'
                          : 'gray.300'
                    }
                    _hover={{
                      color: 'yellow.400',
                      bg: 'rgba(255, 255, 255, 0.1)',
                      transform: 'translateY(-2px)',
                    }}
                    transition="all 0.2s"
                    size={{ base: 'sm', md: 'md' }}
                    fontWeight={isActive('/films') ? 'bold' : 'medium'}
                    textShadow={
                      isHomePage ? '0 0 10px rgba(0, 0, 0, 0.8)' : 'none'
                    }
                    filter={
                      isHomePage
                        ? 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.8))'
                        : 'none'
                    }
                  >
                    <HStack gap={2}>
                      <Film size={18} />
                      <span>Films</span>
                    </HStack>
                  </Button>
                </Link>
                <Link href="/characters">
                  <Button
                    variant="ghost"
                    color={
                      isActive('/characters')
                        ? 'yellow.400'
                        : isHomePage
                          ? 'white'
                          : 'gray.300'
                    }
                    _hover={{
                      color: 'yellow.400',
                      bg: 'rgba(255, 255, 255, 0.1)',
                      transform: 'translateY(-2px)',
                    }}
                    transition="all 0.2s"
                    size={{ base: 'sm', md: 'md' }}
                    fontWeight={isActive('/characters') ? 'bold' : 'medium'}
                    textShadow={
                      isHomePage ? '0 0 10px rgba(0, 0, 0, 0.8)' : 'none'
                    }
                    filter={
                      isHomePage
                        ? 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.8))'
                        : 'none'
                    }
                  >
                    <HStack gap={2}>
                      <Users size={18} />
                      <span>Characters</span>
                    </HStack>
                  </Button>
                </Link>
              </HStack>
            </motion.div>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <IconButton
                variant="ghost"
                color={isHomePage ? 'white' : 'gray.300'}
                _hover={{ color: 'yellow.400', bg: 'rgba(255, 255, 255, 0.1)' }}
                onClick={onToggle}
                aria-label="Toggle navigation"
                size="lg"
                textShadow={isHomePage ? '0 0 10px rgba(0, 0, 0, 0.8)' : 'none'}
                filter={
                  isHomePage
                    ? 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.8))'
                    : 'none'
                }
              >
                <motion.div
                  animate={{ rotate: open ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {open ? <X size={24} /> : <Menu size={24} />}
                </motion.div>
              </IconButton>
            </motion.div>
          )}
        </Flex>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMobile && open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              style={{ overflow: 'hidden' }}
            >
              <Box
                mt={6}
                p={4}
                bg="rgba(0, 0, 0, 0.8)"
                borderRadius="xl"
                border="1px"
                borderColor="gray.800"
                backdropFilter="blur(20px)"
              >
                <VStack gap={3}>
                  <Link href="/" onClick={onClose}>
                    <Button
                      variant="ghost"
                      color={isActive('/') ? 'yellow.400' : 'white'}
                      _hover={{ color: 'yellow.400' }}
                      w="full"
                    >
                      <HStack gap={2}>
                        <Home size={18} />
                        <span>Home</span>
                      </HStack>
                    </Button>
                  </Link>
                  <Link href="/films" onClick={onClose}>
                    <Button
                      variant="ghost"
                      color={isActive('/films') ? 'yellow.400' : 'white'}
                      _hover={{ color: 'yellow.400' }}
                      w="full"
                    >
                      <HStack gap={2}>
                        <Film size={18} />
                        <span>Films</span>
                      </HStack>
                    </Button>
                  </Link>
                  <Link href="/characters" onClick={onClose}>
                    <Button
                      variant="ghost"
                      color={isActive('/characters') ? 'yellow.400' : 'white'}
                      _hover={{ color: 'yellow.400' }}
                      w="full"
                    >
                      <HStack gap={2}>
                        <Users size={18} />
                        <span>Characters</span>
                      </HStack>
                    </Button>
                  </Link>
                </VStack>
              </Box>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </Box>
  );
}
