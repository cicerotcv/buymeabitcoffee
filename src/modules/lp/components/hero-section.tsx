import Link from 'next/link';

import { Github } from 'lucide-react';

import { Env } from '@/env';
import { ButtonLink } from '@/global/components/button-link';

export const HeroSection = async () => {
  return (
    <section className="px-2 py-20 sm:px-4">
      <div className="container mx-auto max-w-prose text-center">
        <h1 className="text-foreground mb-6 text-5xl font-bold">
          Accept Bitcoin Donations
          <span className="text-btc block">Like Never Before</span>
        </h1>
        <p
          className="text-muted-foreground mx-auto mb-8 max-w-2xl text-xl
            leading-relaxed"
        >
          Open-source Bitcoin donation platform inspired by{' '}
          <Link
            href="https://www.buymeacoffee.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-3"
          >
            Buy me a coffee
          </Link>
          . Generate shareable badges, integrate with GitHub, and start
          receiving Bitcoin donations today.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <ButtonLink size="lg" className="px-8 text-lg" href="#get-started">
            Start Receiving Donations
          </ButtonLink>

          <ButtonLink
            href={Env.GithubUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="outline"
            size="lg"
            className="bg-transparent px-8 text-lg"
          >
            <Github className="mr-2 h-5 w-5" />
            View on GitHub
          </ButtonLink>
        </div>
      </div>
    </section>
  );
};
