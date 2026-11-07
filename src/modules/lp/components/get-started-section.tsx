'use server';

import { Suspense } from 'react';

import { Skeleton } from '$/components/ui/skeleton';

import { PreviewForm } from './preview';
import { sectionFrame, SectionHeading } from './section-heading';

export const GetStartedSection = async () => {
  return (
    <section
      id="get-started"
      className="bg-muted scroll-mt-16 border-y py-20 md:py-28"
    >
      <div className={sectionFrame}>
        <SectionHeading
          className="mb-14"
          eyebrow="Create your page"
          title={
            <>
              Print your <em>own</em> receipt.
            </>
          }
          lead={
            <>
              Create your donation page in seconds. Works entirely in your
              browser. No signup required.{' '}
              <span className="text-btc-ink font-medium">No data stored.</span>
            </>
          }
        />

        <Suspense fallback={<Skeleton className="h-[32rem] w-full" />}>
          <PreviewForm />
        </Suspense>
      </div>
    </section>
  );
};
