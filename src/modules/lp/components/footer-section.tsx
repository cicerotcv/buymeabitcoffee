'use server';

import Link from 'next/link';

import { Github } from 'lucide-react';

import { getDonationPath } from '@/modules/crypto/utils/urls';

import { Env } from '@/env';
import { SvgLogo } from '@/global/svg/project-logo';

export const FooterSection = async () => {
  return (
    <footer className="border-border border-t px-2 py-12 sm:px-4">
      <div className="container mx-auto">
        <div
          className="flex flex-col items-center justify-between gap-2
            md:flex-row"
        >
          <SvgLogo className="text-btc h-10 w-auto" />

          <div className="flex items-center gap-4">
            <Link
              href={Env.GithubUrl}
              className="text-muted-foreground hover:text-accent-foreground
                transition-colors"
            >
              <Github className="h-5 w-5" />
            </Link>

            <Link
              href={Env.GithubUrl}
              className="text-muted-foreground hover:text-accent-foreground
                transition-colors"
            >
              Documentation
            </Link>
            <Link
              href={getDonationPath({
                onChain: Env.ExampleBtcAddress,
                identifier: 'Buy Me a BitCoffee',
              })}
              className="text-muted-foreground hover:text-accent-foreground
                transition-colors"
            >
              Donate
            </Link>
          </div>
        </div>

        <div
          className="border-border text-muted-foreground mt-8 border-t pt-8
            text-center text-sm"
        >
          <p>
            Open source and built with ❤️ for the{' '}
            <span className="text-btc font-semibold">Bitcoin</span> community
          </p>
        </div>
      </div>
    </footer>
  );
};
