'use client';

import { Moon, Sun } from 'lucide-react';

import { Button } from '$/components/ui/button';
import { cn } from '$/lib/utils';

import { useThemeToggle } from '../contexts/theme-provider';

export const ToggleTheme = (props: { className?: string }) => {
  const { toggleTheme, current } = useThemeToggle();

  return (
    <Button
      onClick={toggleTheme}
      className={cn(props.className)}
      variant="outline"
      size="icon"
    >
      {current === 'light' ? <Moon key="moon" /> : <Sun key="sun" />}
    </Button>
  );
};
