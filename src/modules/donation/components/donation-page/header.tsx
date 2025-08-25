'use server';

import Link from 'next/link';

import { SvgLogo } from '@/global/components/logo';
import { ToggleTheme } from '@/global/components/toggle-theme';

import { Badge } from '$/components/ui/badge';

type Props = {
  displayName: string;
};

export const DonationPageHeader = async (props: Props) => {
  return (
    <header className="border-border border-b">
      <div
        className="container mx-auto flex items-center justify-between px-2 py-4
          sm:px-4"
      >
        <Link
          href="/"
          className="text-btc flex items-center gap-2 transition-opacity
            select-none hover:opacity-80"
        >
          <SvgLogo className="text-btc h-8 w-fit" />
        </Link>

        <div className="flex items-center gap-2 sm:gap-4">
          <Badge variant="secondary" className="text-xs sm:text-sm">
            {props.displayName}
          </Badge>

          <ToggleTheme size="icon-sm" />
        </div>
      </div>
    </header>
  );
};
