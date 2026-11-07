'use server';

import { HashRule } from '@/global/components/receipt';

import { sectionFrame, SectionHeading } from './section-heading';

const steps = [
  {
    step: '01',
    title: 'Enter your address',
    description:
      'Add your Bitcoin address and an optional Lightning address or URL.',
  },
  {
    step: '02',
    title: 'Copy your link or badge',
    description:
      'Get a shareable donation page URL and an embeddable badge snippet.',
  },
  {
    step: '03',
    title: 'Share anywhere',
    description:
      'Post on GitHub, your site, or social. Donors pay you directly.',
  },
] as const;

export const HowItWorksSection = async () => {
  return (
    <section id="how-it-works" className="scroll-mt-20 py-20 md:py-28">
      <div className={sectionFrame}>
        <SectionHeading
          eyebrow="How it works"
          title={
            <>
              Three lines, <em>one</em> page.
            </>
          }
          lead="Three steps from wallet address to live donation page."
        />

        <ol className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {steps.map(({ step, title, description }) => (
            <li key={step} className="relative">
              <HashRule className="mb-6" />
              <span className="text-btc-ink font-mono text-sm">{step}</span>
              <h3 className="mt-3 text-lg font-semibold tracking-tight">
                {title}
              </h3>
              <p className="text-muted-foreground mt-2 max-w-[34ch]">
                {description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};
