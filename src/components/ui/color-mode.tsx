'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

interface ThemeToggleProps {
  className?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export function ThemeToggle({
  className,
  variant = 'ghost',
  size = 'icon',
}: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant={variant} size={size} className={className}>
        <div className="w-4 h-4" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }

  const isEmpire = theme === 'empire';

  const toggleTheme = () => {
    setTheme(isEmpire ? 'rebel-base' : 'empire');
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={toggleTheme}
      className={cn(
        'relative overflow-hidden transition-all duration-300',
        isEmpire
          ? 'hover:bg-red-950/20 hover:text-red-400'
          : 'hover:bg-blue-50 hover:text-blue-600',
        className
      )}
      title={
        isEmpire
          ? 'Switch to Rebel Base (Light Mode)'
          : 'Switch to Empire (Dark Mode)'
      }
    >
      <motion.div
        key={theme}
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        exit={{ scale: 0, rotate: 180 }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 10,
        }}
        className="flex justify-center items-center"
      >
        {isEmpire ? (
          <Moon className="w-4 h-4 text-red-400" />
        ) : (
          <Sun className="w-4 h-4 text-blue-600" />
        )}
      </motion.div>
      <span className="sr-only">
        {isEmpire ? 'Switch to Rebel Base' : 'Switch to Empire'}
      </span>
    </Button>
  );
}

// Death Star / Rebel Alliance themed toggle (more elaborate version)
export function StarWarsThemeToggle({
  className,
  showLabel = false,
}: {
  className?: string;
  showLabel?: boolean;
}) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={cn('flex items-center gap-2', className)}>
        <div className="bg-muted rounded-full w-16 h-8 animate-pulse" />
        {showLabel && (
          <div className="bg-muted rounded w-20 h-4 animate-pulse" />
        )}
      </div>
    );
  }

  const isEmpire = theme === 'empire';

  const toggleTheme = () => {
    setTheme(isEmpire ? 'rebel-base' : 'empire');
  };

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <motion.button
        onClick={toggleTheme}
        className={cn(
          'relative h-8 w-16 rounded-full p-1 transition-colors duration-300',
          isEmpire
            ? 'bg-gradient-to-r from-red-900 to-red-700'
            : 'bg-gradient-to-r from-blue-400 to-blue-600'
        )}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          layout
          className={cn(
            'h-6 w-6 rounded-full shadow-lg transition-colors duration-300 flex items-center justify-center text-xs font-bold',
            isEmpire ? 'bg-gray-900 text-red-400' : 'bg-white text-blue-600'
          )}
          animate={{
            x: isEmpire ? 0 : 32,
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 20,
          }}
        >
          {isEmpire ? '⚫' : '☀️'}
        </motion.div>
      </motion.button>

      {showLabel && (
        <motion.span
          key={theme}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className={cn(
            'text-sm font-medium transition-colors duration-300',
            isEmpire ? 'text-red-400' : 'text-blue-600'
          )}
        >
          {isEmpire ? 'Empire' : 'Rebel Base'}
        </motion.span>
      )}
    </div>
  );
}
