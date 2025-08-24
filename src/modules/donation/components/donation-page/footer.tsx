import Link from 'next/link';

import { Github } from 'lucide-react';

export const DonationPageFooter = () => {
  return (
    <div className="border-border mt-8 border-t pt-8 text-center">
      <p className="text-muted-foreground mb-4 text-sm">
        Powered by{' '}
        <Link href="/" className="text-primary hover:underline">
          Buy me a BitCoffee
        </Link>
      </p>
      <Link
        href="/#get-started"
        className="text-muted-foreground hover:text-foreground inline-flex
          items-center gap-2 text-sm transition-colors"
      >
        <Github className="h-4 w-4" />
        Create your own donation page
      </Link>
    </div>
  );
};
