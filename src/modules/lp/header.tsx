'use server';

import Link from 'next/link';

import { Github } from 'lucide-react';

import { Env } from '@/env';
import { SvgLogo } from '@/global/components/logo';

import { ButtonLink } from '../../global/components/button-link';
import { ToggleTheme } from '../../global/components/toggle-theme';

export const Header = async () => {
  return (
    <header className="border-border container mx-auto border-b">
      <div
        className="container mx-auto flex items-center justify-between gap-4
          px-2 py-4 sm:px-4"
      >
        <SvgLogo className="text-btc h-8 w-fit" />

        <ToggleTheme className="ml-auto" size="icon-sm" />

        <nav className="hidden items-center gap-4 md:flex">
          <Link
            href="#features"
            className="text-muted-foreground hover:text-foreground
              transition-colors"
          >
            Features
          </Link>

          <Link
            href={Env.GithubUrl}
            className="text-muted-foreground hover:text-foreground flex
              items-center gap-1 transition-colors"
          >
            <Github className="h-4 w-4" />
            GitHub
          </Link>

          <ButtonLink href="#get-started">Get Started</ButtonLink>
        </nav>
      </div>
    </header>
  );
};
