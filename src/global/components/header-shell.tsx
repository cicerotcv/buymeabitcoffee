'use client';

import { PropsWithChildren, useEffect, useState } from 'react';

import { cn } from '$/lib/utils';

type Props = PropsWithChildren<{
  className?: string;
}>;

/** Solid paper header; the hairline only appears once the page scrolls. */
export const HeaderShell = (props: Props) => {
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
        'bg-background sticky top-0 z-50 border-b transition-colors',
        scrolled ? 'border-border' : 'border-transparent',
        props.className
      )}
    >
      {props.children}
    </header>
  );
};
