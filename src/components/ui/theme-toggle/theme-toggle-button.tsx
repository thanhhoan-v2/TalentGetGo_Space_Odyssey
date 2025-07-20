import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import React from 'react';

import {
  AnimationStart,
  AnimationVariant,
  createAnimation,
} from '@/components/ui/theme-toggle/theme-animations';
import DarkModeIcon from './dark-mode-icon';
import LightModeIcon from './ligth-mode-icon';

interface ThemeToggleAnimationProps {
  variant?: AnimationVariant;
  start?: AnimationStart;
  showLabel?: boolean;
  url?: string;
}

export default function ThemeToggleButton({
  variant = 'circle-blur',
  start = 'top-left',
  showLabel = false,
  url = '',
}: ThemeToggleAnimationProps) {
  const { theme, setTheme } = useTheme();

  const styleId = 'theme-transition-styles';

  const updateStyles = React.useCallback((css: string, name: string) => {
    if (typeof window === 'undefined') return;

    let styleElement = document.getElementById(styleId) as HTMLStyleElement;

    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = styleId;
      document.head.appendChild(styleElement);
    }

    styleElement.textContent = css;
  }, []);

  const toggleTheme = React.useCallback(() => {
    const animation = createAnimation(variant, start, url);

    updateStyles(animation.css, animation.name);

    if (typeof window === 'undefined') return;

    const switchTheme = () => {
      setTheme(theme === 'light' ? 'dark' : 'light');
    };

    if (!document.startViewTransition) {
      switchTheme();
      return;
    }

    document.startViewTransition(switchTheme);
  }, [theme, setTheme]);

  return (
    <Button
      asChild
      onClick={toggleTheme}
      className="group relative p-0 hover:border-0 focus:border-0 focus:outline-none hover:ring-0 focus:ring-0 focus:ring-offset-0 w-9 h-9"
    >
      {theme === 'light' ? <LightModeIcon /> : <DarkModeIcon />}
    </Button>
  );
}
