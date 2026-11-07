import Link from 'next/link';

import { ArrowRight, Github } from 'lucide-react';

import { Env } from '@/env';
import { ButtonLink } from '@/global/components/button-link';

import { HeroReceipt } from './hero-receipt';
import { sectionFrame } from './section-heading';

export const HeroSection = async () => {
  return (
    <section className="pt-14 pb-20 md:pt-24 md:pb-28">
      <div
        className={`${sectionFrame} grid items-center gap-14 md:grid-cols-12
          md:gap-10`}
      >
        <div className="md:col-span-7">
          <p className="eyebrow mb-6">Open source · On-chain + Lightning</p>

          <h1
            className="font-heading [&_em]:text-btc-ink
              text-[clamp(3rem,7vw,5.5rem)] leading-[1.02] tracking-[-0.01em]
              [&_em]:italic"
          >
            Tips in bitcoin, <em>straight</em> to your wallet.
          </h1>

          <p
            className="text-muted-foreground mt-6 max-w-[52ch] text-lg
              leading-relaxed"
          >
            Open-source donation pages and README badges, inspired by{' '}
            <Link
              href="https://www.buymeacoffee.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground underline underline-offset-3"
            >
              Buy Me a Coffee
            </Link>
            . On-chain and Lightning. No signup. No platform fees.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink size="lg" href="#get-started">
              Create your donation page
              <ArrowRight />
            </ButtonLink>

            <ButtonLink
              href={Env.GithubUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
              size="lg"
            >
              <Github />
              Star on GitHub
            </ButtonLink>
          </div>
        </div>

        <div className="md:col-span-5">
          <HeroReceipt />
        </div>
      </div>
    </section>
  );
};
