'use client';

import dynamic from 'next/dynamic';

import { Button } from '$/components/ui/button';

import { useThemeToggle } from '../contexts/theme-provider';

const MoonIcon = dynamic(() => import('lucide-react').then((mod) => mod.Moon), {
  ssr: false,
});

const SunIcon = dynamic(() => import('lucide-react').then((mod) => mod.Sun), {
  ssr: false,
});

type Props = React.ComponentProps<typeof Button>;

export const ToggleTheme = (props: Props) => {
  const { toggleTheme, current } = useThemeToggle();

  return (
    <Button onClick={toggleTheme} variant="outline" size="icon" {...props}>
      {current === 'light' ? <MoonIcon /> : <SunIcon />}
    </Button>
  );
};
