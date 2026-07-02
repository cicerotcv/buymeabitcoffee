'use server';

import { GlassHeaderShell } from '@/global/components/glass-header-shell';
import { ToggleTheme } from '@/global/components/toggle-theme';
import { SvgLogo } from '@/global/svg/project-logo';

import { HeaderNav } from './header-nav';

export const Header = async () => {
  return (
    <GlassHeaderShell>
      <div
        className="relative container mx-auto flex items-center justify-between
          gap-4 px-2 py-4 sm:px-4"
      >
        <SvgLogo className="text-btc h-8 w-fit" />

        <div className="flex items-center gap-2 md:gap-4">
          <ToggleTheme size="icon-sm" />
          <HeaderNav />
        </div>
      </div>
    </GlassHeaderShell>
  );
};
