'use server';

import Link from 'next/link';

import { HeaderShell } from '@/global/components/header-shell';
import { ToggleTheme } from '@/global/components/toggle-theme';
import { SvgLogo } from '@/global/svg/project-logo';

import { HeaderNav } from './header-nav';
import { sectionFrame } from './section-heading';

export const Header = async () => {
  return (
    <HeaderShell>
      <div
        className={`${sectionFrame} relative flex items-center justify-between
          gap-4 py-3`}
      >
        <Link href="/" aria-label="BitCoffee home">
          <SvgLogo className="text-btc h-8 w-fit" />
        </Link>

        <div className="flex items-center gap-2 md:gap-4">
          <ToggleTheme size="icon-sm" />
          <HeaderNav />
        </div>
      </div>
    </HeaderShell>
  );
};
