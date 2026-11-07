'use server';

import { HashRule, LineItem } from '@/global/components/receipt';

import { sectionFrame, SectionHeading } from './section-heading';

// Facts only: each line restates something the product already guarantees.
const items = [
  {
    label: 'Custody',
    value: 'none',
    note: 'Donations go straight to your wallet.',
  },
  { label: 'Accounts', value: 'none', note: 'No signup, ever.' },
  { label: 'Platform fees', value: '0', note: 'Only standard network fees.' },
  {
    label: 'Data stored on our servers',
    value: 'none',
    note: 'Pages are generated in your browser.',
  },
  {
    label: 'Payment rails',
    value: 'on-chain + LN',
    note: 'One page for both. Donors scan or copy.',
  },
  {
    label: 'README badges',
    value: 'MD + HTML',
    note: 'shields.io styles, paste once.',
  },
  { label: 'Source code', value: 'open', note: 'Fork it, audit it.' },
] as const;

export const FeaturesSection = async () => {
  return (
    <section id="features" className="py-20 md:py-28">
      <div className={`${sectionFrame} grid gap-12 md:grid-cols-12`}>
        <SectionHeading
          className="md:col-span-5"
          eyebrow="What it costs you"
          title={
            <>
              Itemized, <em>nothing</em> hidden.
            </>
          }
          lead="Free, open-source, and ready in under a minute. Built for creators, maintainers, and builders."
        />

        <div className="md:col-span-7">
          <dl className="space-y-5">
            {items.map(({ label, value, note }) => (
              <div key={label}>
                <LineItem
                  label={<span className="font-medium">{label}</span>}
                  value={value}
                />
                <p className="text-muted-foreground mt-1 text-sm">{note}</p>
              </div>
            ))}
          </dl>

          <HashRule className="my-6" />

          <dl>
            <LineItem
              label={<span className="eyebrow text-foreground">Total</span>}
              value={
                <span className="font-heading text-2xl">
                  Your keys, your sats.
                </span>
              }
            />
          </dl>
        </div>
      </div>
    </section>
  );
};
