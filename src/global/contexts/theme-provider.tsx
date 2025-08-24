'use client';

import { PropsWithChildren, useCallback } from 'react';

import {
  ThemeProvider as NextThemeProvider,
  useTheme as useNextTheme,
} from 'next-themes';

export const ThemeProvider = (props: PropsWithChildren) => {
  return (
    <NextThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      storageKey="@buy-me-a-bit-coffee:theme"
    >
      {props.children}
    </NextThemeProvider>
  );
};

export const useThemeToggle = () => {
  const themeContext = useNextTheme();

  const toggleTheme = useCallback(() => {
    themeContext.setTheme((current) => {
      if (current === 'light') return 'dark';
      return 'light';
    });
  }, [themeContext]);

  return {
    toggleTheme,
    current: themeContext.theme,
  };
};
