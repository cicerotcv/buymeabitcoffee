'use server';

import { ConfigurationForm } from './configuration-form';

export const GetStartedSection = async () => {
  return (
    <section id="get-started" className="px-0 py-20 min-[400px]:px-2 sm:px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-16 text-center">
          <h2 className="text-foreground mb-4 text-4xl font-bold">
            Try It Now
          </h2>
          <p className="text-muted-foreground text-xl">
            Create your donation page in seconds. No signup required.{' '}
            <span className="text-btc">No data stored</span>.
          </p>
        </div>

        <ConfigurationForm />
      </div>
    </section>
  );
};
