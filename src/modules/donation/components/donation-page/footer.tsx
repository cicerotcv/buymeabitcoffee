import Link from 'next/link';

import { ArrowRight } from 'lucide-react';

/** Receipt stub that closes the donation page. */
export const DonationPageFooter = () => {
  return (
    <footer className="space-y-4 pt-2 pb-10 text-center">
      <p className="font-heading text-4xl">Thank you.</p>

      <p className="text-muted-foreground text-sm">
        Powered by{' '}
        <Link
          href="/"
          className="text-foreground hover:text-btc-ink underline
            underline-offset-3"
        >
          Buy Me a BitCoffee
        </Link>
      </p>

      <Link
        href="/#get-started"
        className="text-muted-foreground hover:text-foreground inline-flex
          items-center gap-1.5 text-sm transition-colors"
      >
        Create your own donation page
        <ArrowRight className="size-4" />
      </Link>
    </footer>
  );
};
