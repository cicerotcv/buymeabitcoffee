'use server';

import Link from 'next/link';

import { ToggleTheme } from '@/global/components/toggle-theme';
import { SvgLogo } from '@/global/svg/project-logo';

export const DonationPageHeader = async () => {
  return (
    <header className="border-b">
      <div
        className="mx-auto flex w-full max-w-6xl items-center justify-between
          gap-4 px-4 py-3 sm:px-6"
      >
        <Link
          href="/"
          aria-label="BitCoffee home"
          className="transition-opacity select-none hover:opacity-80"
        >
          <SvgLogo className="text-btc h-8 w-fit" />
        </Link>

        <ToggleTheme size="icon-sm" />
      </div>
    </header>
  );
};
