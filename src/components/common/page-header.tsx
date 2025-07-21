'use client';

import { Badge, Button } from '@/components/ui';
import { cn } from '@/lib/utils';
import { ROUTES } from '@/utils/routes';
import { AnimatePresence, motion } from 'framer-motion';
import { Film, Menu, Users, X } from 'lucide-react';
import { useTheme } from 'next-themes';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

// Dynamic import for theme toggle button to avoid hydration errors
const ThemeSwitch = dynamic(
  () => import('@/components/ui/theme-toggle/theme-toggle-button'),
  { ssr: false }
);

export function PageHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const { theme } = useTheme();

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
  const isActiveClassName = 'border-1 border-primary';

  return (
    <nav
      className={cn(
        'sticky top-0 z-50 transition-all duration-300 theme-transition bg-white text-black',
        theme === 'dark' &&
          'bg-black border-transparent backdrop-blur-lg text-white',
        isHomePage && 'bg-transparent border-transparent backdrop-blur-lg'
      )}
    >
      <div className="mx-auto px-4 py-4 max-w-7xl">
        <div className="flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href={ROUTES.HOME}
              className={cn(
                'flex items-center gap-2 font-bold text-2xl',
                isHomePage && 'text-white'
              )}
            >
              <span>Space</span>
              <Badge
                variant="outline"
                className="hover:bg-white font-bold hover:text-black text-lg"
              >
                Odyssey
              </Badge>
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
              <Button asChild className="focus:ring-0">
                <Link
                  href={ROUTES.FILMS}
                  className={cn(
                    'theme-transition hover:bg-black hover:text-white',
                    theme === 'dark' && 'hover:bg-white hover:text-black',
                    isHomePage && 'text-white hover:bg-white hover:text-black',
                    isActive(ROUTES.FILMS) && isActiveClassName
                  )}
                >
                  <Film size={18} className="mr-1" />
                  Films
                </Link>
              </Button>

              <Button asChild>
                <Link
                  href={ROUTES.CHARACTERS}
                  className={cn(
                    'transition-all duration-200 theme-transition hover:bg-black hover:text-white',
                    theme === 'dark' && 'hover:bg-white hover:text-black',
                    isHomePage && 'text-white hover:bg-white hover:text-black',
                    isActive(ROUTES.CHARACTERS) && isActiveClassName
                  )}
                >
                  <Users size={18} className="mr-1" />
                  Characters
                </Link>
              </Button>

              {/* Theme Toggle */}
              <ThemeSwitch variant="circle" start="center" />
            </motion.div>
          )}

          {/* Mobile Menu Button & Theme Toggle */}
          {isMobile && (
            <div className="flex items-center gap-2">
              <ThemeSwitch variant="circle" start="center" />
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
                    'theme-transition hover:bg-black hover:text-white',
                    theme === 'dark' && 'hover:bg-white hover:text-black',
                    isHomePage && 'text-white hover:bg-white hover:text-black',
                    isActive(ROUTES.FILMS) && isActiveClassName
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
                  <Button asChild variant="ghost">
                    <Link
                      href={ROUTES.FILMS}
                      onClick={closeMobileMenu}
                      className={cn(
                        'w-full justify-start transition-all duration-200 theme-transition hover:bg-black hover:text-white',
                        theme === 'dark' && 'hover:bg-white hover:text-black',
                        isHomePage &&
                          'text-white hover:bg-white hover:text-black',
                        isActive(ROUTES.FILMS) && isActiveClassName
                      )}
                    >
                      <Film size={18} className="mr-2" />
                      Films
                    </Link>
                  </Button>

                  <Button asChild variant="ghost">
                    <Link
                      href={ROUTES.CHARACTERS}
                      onClick={closeMobileMenu}
                      className={cn(
                        'transition-all duration-200 theme-transition hover:bg-black hover:text-white',
                        theme === 'dark' && 'hover:bg-white hover:text-black',
                        isHomePage &&
                          'text-white hover:bg-white hover:text-black',
                        isActive(ROUTES.CHARACTERS) && isActiveClassName
                      )}
                    >
                      <Users size={18} className="mr-2" />
                      Characters
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
