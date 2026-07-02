'use client';

import { PropsWithChildren, useEffect, useState } from 'react';

import { cn } from '$/lib/utils';

type Props = PropsWithChildren<{
  className?: string;
}>;

export const GlassHeaderShell = (props: Props) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'glass-header sticky top-0 z-50 transition-shadow',
        scrolled && 'shadow-sm',
        props.className
      )}
    >
      {props.children}
    </header>
  );
};
