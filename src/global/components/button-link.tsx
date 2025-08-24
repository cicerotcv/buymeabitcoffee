import Link from 'next/link';

import { VariantProps } from 'class-variance-authority';

import { buttonVariants } from '$/components/ui/button';
import { cn } from '$/lib/utils';

type Props = React.ComponentProps<typeof Link> &
  VariantProps<typeof buttonVariants>;

export const ButtonLink = ({ variant, className, size, ...props }: Props) => {
  return (
    <Link
      className={cn(buttonVariants({ variant, className, size }))}
      {...props}
    />
  );
};
