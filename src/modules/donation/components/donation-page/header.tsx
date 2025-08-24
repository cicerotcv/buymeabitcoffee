'use server';

import Link from 'next/link';

import { Coffee } from 'lucide-react';

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
          <Coffee className="size-8" />
          <span className="text-lg font-bold">Buy me a BitCoffee</span>
        </Link>

        <div className="flex items-center gap-4">
          <Badge variant="secondary" className="text-sm">
            {props.displayName}
          </Badge>
          <ToggleTheme />
        </div>
      </div>
    </header>
  );
};
