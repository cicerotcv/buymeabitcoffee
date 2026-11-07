'use server';

import { Plus } from 'lucide-react';

import { faqItems } from '@/global/config/seo.config';

import { sectionFrame, SectionHeading } from './section-heading';

export const FaqSection = async () => {
  return (
    <section id="faq" className="scroll-mt-20 py-20 md:py-28">
      <div className={`${sectionFrame} grid gap-12 md:grid-cols-12`}>
        <SectionHeading
          className="md:col-span-4"
          eyebrow="FAQ"
          title={
            <>
              Still <em>wondering?</em>
            </>
          }
          lead="Quick answers about how BitCoffee works."
        />

        <div className="divide-y border-y md:col-span-8">
          {faqItems.map(({ question, answer }) => (
            <details key={question} className="group">
              <summary
                className="hover:text-btc-ink flex cursor-pointer list-none
                  items-center justify-between gap-4 py-5 text-base font-medium
                  transition-colors [&::-webkit-details-marker]:hidden"
              >
                {question}
                <Plus
                  className="text-muted-foreground size-4 shrink-0
                    transition-transform group-open:rotate-45"
                />
              </summary>
              <p
                className="text-muted-foreground max-w-[60ch] pb-6
                  leading-relaxed"
              >
                {answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};
