'use client';

import StarWarsLogo from '@/assets/starwars-logo.png';
import TalentGetGoLogo from '@/assets/talentgetgo.png';
import { Button, ThemeToggle } from '@/components/ui';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { Film, Home, Menu, Users, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface PageHeaderProps {
  currentPage?: 'films' | 'characters' | 'home';
  transparent?: boolean;
}

export function PageHeader({
  currentPage,
  transparent = false,
}: PageHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  // Handle responsive breakpoint
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const isActive = (path: string) => router.pathname === path;
  const isHomePage = router.pathname === '/';

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <nav
      className={cn(
        'sticky top-0 z-50 transition-all duration-300 border-b theme-transition',
        transparent || isHomePage
          ? 'bg-transparent border-transparent backdrop-blur-lg'
          : 'bg-background/95 border-border backdrop-blur-md shadow-lg'
      )}
    >
      <div className="mx-auto px-4 py-4 max-w-7xl">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="flex items-center gap-3 cursor-pointer">
              <Image
                src={TalentGetGoLogo}
                style={{ borderRadius: '1rem' }}
                alt="TalentGetGo"
                width={60}
                height={60}
                className="hover:scale-105 transition-transform"
              />
              <X size={20} className="text-foreground" />
              <Image
                src={StarWarsLogo}
                alt="Star Wars"
                width={50}
                height={50}
                className="hover:scale-105 transition-transform"
              />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          {!isMobile && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center gap-2"
            >
              <Link href="/">
                <Button
                  variant="ghost"
                  className={cn(
                    'transition-all duration-200 theme-transition',
                    isActive('/')
                      ? 'text-primary hover:text-primary/80'
                      : isHomePage
                        ? 'text-white hover:text-primary shadow-lg'
                        : 'text-muted-foreground hover:text-primary',
                    'hover:bg-accent/20 hover:-translate-y-1',
                    isActive('/') && 'font-bold',
                    isHomePage && 'drop-shadow-lg'
                  )}
                  size="sm"
                >
                  <Home size={18} className="mr-2" />
                  Home
                </Button>
              </Link>

              <Link href="/films">
                <Button
                  variant="ghost"
                  className={cn(
                    'transition-all duration-200 theme-transition',
                    isActive('/films')
                      ? 'text-primary hover:text-primary/80'
                      : isHomePage
                        ? 'text-white hover:text-primary shadow-lg'
                        : 'text-muted-foreground hover:text-primary',
                    'hover:bg-accent/20 hover:-translate-y-1',
                    isActive('/films') && 'font-bold',
                    isHomePage && 'drop-shadow-lg'
                  )}
                  size="sm"
                >
                  <Film size={18} className="mr-2" />
                  Films
                </Button>
              </Link>

              <Link href="/characters">
                <Button
                  variant="ghost"
                  className={cn(
                    'transition-all duration-200 theme-transition',
                    isActive('/characters')
                      ? 'text-primary hover:text-primary/80'
                      : isHomePage
                        ? 'text-white hover:text-primary shadow-lg'
                        : 'text-muted-foreground hover:text-primary',
                    'hover:bg-accent/20 hover:-translate-y-1',
                    isActive('/characters') && 'font-bold',
                    isHomePage && 'drop-shadow-lg'
                  )}
                  size="sm"
                >
                  <Users size={18} className="mr-2" />
                  Characters
                </Button>
              </Link>

              {/* Theme Toggle */}
              <div className="ml-4">
                <ThemeToggle
                  className={cn(
                    'transition-all duration-200',
                    isHomePage && 'drop-shadow-lg'
                  )}
                />
              </div>
            </motion.div>
          )}

          {/* Mobile Menu Button & Theme Toggle */}
          {isMobile && (
            <div className="flex items-center gap-2">
              <ThemeToggle
                className={cn(
                  'transition-all duration-200',
                  isHomePage && 'drop-shadow-lg'
                )}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleMobileMenu}
                  className={cn(
                    'transition-all duration-200',
                    isHomePage
                      ? 'text-white hover:text-primary shadow-lg drop-shadow-lg'
                      : 'text-muted-foreground hover:text-primary',
                    'hover:bg-accent/20'
                  )}
                  aria-label="Toggle navigation"
                >
                  <motion.div
                    animate={{ rotate: mobileMenuOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                  </motion.div>
                </Button>
              </motion.div>
            </div>
          )}
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMobile && mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="bg-background/80 backdrop-blur-lg mt-6 p-4 border border-border rounded-xl theme-transition">
                <div className="flex flex-col gap-3">
                  <Link href="/" onClick={closeMobileMenu}>
                    <Button
                      variant="ghost"
                      className={cn(
                        'w-full justify-start transition-all duration-200',
                        isActive('/')
                          ? 'text-primary bg-accent/20'
                          : 'text-foreground hover:text-primary hover:bg-accent/20'
                      )}
                    >
                      <Home size={18} className="mr-2" />
                      Home
                    </Button>
                  </Link>

                  <Link href="/films" onClick={closeMobileMenu}>
                    <Button
                      variant="ghost"
                      className={cn(
                        'w-full justify-start transition-all duration-200',
                        isActive('/films')
                          ? 'text-primary bg-accent/20'
                          : 'text-foreground hover:text-primary hover:bg-accent/20'
                      )}
                    >
                      <Film size={18} className="mr-2" />
                      Films
                    </Button>
                  </Link>

                  <Link href="/characters" onClick={closeMobileMenu}>
                    <Button
                      variant="ghost"
                      className={cn(
                        'w-full justify-start transition-all duration-200',
                        isActive('/characters')
                          ? 'text-primary bg-accent/20'
                          : 'text-foreground hover:text-primary hover:bg-accent/20'
                      )}
                    >
                      <Users size={18} className="mr-2" />
                      Characters
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
