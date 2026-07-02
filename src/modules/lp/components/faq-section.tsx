'use server';

import { ChevronDown } from 'lucide-react';

import { faqItems } from '@/global/config/seo.config';

export const FaqSection = async () => {
  return (
    <section id="faq" className="px-2 py-20 sm:px-4">
      <div className="container mx-auto max-w-3xl">
        <div className="mb-16 text-center">
          <h2 className="text-foreground mb-4 text-4xl font-bold">
            Frequently asked questions
          </h2>
          <p className="text-muted-foreground text-xl">
            Quick answers about how BitCoffee works.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {faqItems.map(({ question, answer }) => (
            <details
              key={question}
              className="glass-card group rounded-xl transition-shadow
                open:shadow-md"
            >
              <summary
                className="flex cursor-pointer list-none items-center
                  justify-between gap-4 px-6 py-4 text-base font-medium
                  [&::-webkit-details-marker]:hidden"
              >
                {question}
                <ChevronDown
                  className="text-muted-foreground size-4 shrink-0
                    transition-transform group-open:rotate-180"
                />
              </summary>
              <div className="border-glass-border border-t px-6 pt-4 pb-5">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {answer}
                </p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};
