'use server';

import Link from 'next/link';

import { Github } from 'lucide-react';

import { Env } from '@/env';
import { HashRule } from '@/global/components/receipt';
import { SvgLogo } from '@/global/svg/project-logo';

import { sectionFrame } from './section-heading';

const linkClass =
  'text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 transition-colors';

/** Bookend: the receipt stub that closes the page. */
export const FooterSection = async () => {
  return (
    <footer className="bg-muted perforated mt-8 pt-16 pb-14">
      <div className={sectionFrame}>
        <div className="text-center">
          <p className="font-heading text-5xl md:text-6xl">Thank you.</p>
          <p className="eyebrow mt-4">Your keys, your sats.</p>
        </div>

        <HashRule className="my-12" />

        <div
          className="flex flex-col items-center justify-between gap-6
            md:flex-row"
        >
          <SvgLogo className="text-btc h-9 w-auto" />

          <nav className="flex items-center gap-6 text-sm">
            <Link
              href={Env.GithubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              <Github className="size-4" />
              GitHub
            </Link>
            <Link
              href={`${Env.GithubUrl}/blob/main/README.md`}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              README
            </Link>
            <Link href="/donate" className={linkClass}>
              Donate
            </Link>
          </nav>
        </div>

        <p className="text-muted-foreground mt-10 text-center text-sm">
          Open source. Built for the Bitcoin community.
        </p>
      </div>
    </footer>
  );
};
