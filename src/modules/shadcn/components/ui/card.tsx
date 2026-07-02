import * as React from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '$/lib/utils';

const cardVariants = cva(
  'text-card-foreground flex flex-col gap-4 rounded-xl py-6',
  {
    variants: {
      variant: {
        default: 'bg-card border shadow-sm',
        glass: 'glass-card',
        inset:
          'bg-muted/40 backdrop-blur-sm border border-glass-border shadow-none',
        flat: 'bg-card/50 backdrop-blur-sm border-0 shadow-none',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

function Card({
  className,
  variant,
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof cardVariants>) {
  return (
    <div
      data-slot="card"
      data-variant={variant ?? 'default'}
      className={cn(cardVariants({ variant }), className)}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        `@container/card-header grid auto-rows-min grid-rows-[auto_auto]
        items-start gap-1 px-4 has-data-[slot=card-action]:grid-cols-[1fr_auto]
        [.border-b]:pb-4`,
        className
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-title"
      className={cn('leading-none font-semibold', className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-description"
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        'col-start-2 row-span-2 row-start-1 self-start justify-self-end',
        className
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-content"
      className={cn('px-4', className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-footer"
      className={cn('flex items-center px-4 [.border-t]:pt-4', className)}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
  cardVariants,
};
