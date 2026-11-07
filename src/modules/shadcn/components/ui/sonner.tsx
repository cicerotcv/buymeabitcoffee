'use client';

import { AlertTriangle, Check, Info, Loader2, X } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Toaster as Sonner, ToasterProps } from 'sonner';

import { cn } from '$/lib/utils';

type StampProps = {
  tone: 'success' | 'destructive' | 'warning' | 'info';
  children: React.ReactNode;
};

/** Same round stamp as the verification checks, so feedback reads as one system. */
const Stamp = ({ tone, children }: StampProps) => (
  <span
    aria-hidden
    className={cn(
      'flex size-6 items-center justify-center rounded-full [&>svg]:size-3.5',
      tone === 'success' && 'bg-success/15 text-success',
      tone === 'destructive' && 'bg-destructive/15 text-destructive',
      tone === 'warning' && 'bg-secondary text-btc-ink',
      tone === 'info' && 'bg-ring/15 text-ring'
    )}
  >
    {children}
  </span>
);

/** Paper slip toast: hairline, receipt lift, stamp icon, dashed seam. */
const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      gap={10}
      icons={{
        success: (
          <Stamp tone="success">
            <Check strokeWidth={3} />
          </Stamp>
        ),
        error: (
          <Stamp tone="destructive">
            <X strokeWidth={3} />
          </Stamp>
        ),
        warning: (
          <Stamp tone="warning">
            <AlertTriangle strokeWidth={2.5} />
          </Stamp>
        ),
        info: (
          <Stamp tone="info">
            <Info strokeWidth={2.5} />
          </Stamp>
        ),
        loading: (
          <Stamp tone="info">
            <Loader2 className="animate-spin" strokeWidth={2.5} />
          </Stamp>
        ),
      }}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast: `receipt-lift bg-card text-card-foreground group flex w-full
          items-center gap-3 rounded-md border py-3 pr-4 pl-3 font-sans
          sm:w-[22rem]`,
          icon: 'flex shrink-0 items-center self-center',
          content:
            'flex min-w-0 flex-1 flex-col gap-0.5 border-l border-dashed border-rule pl-3',
          title: 'text-sm font-medium leading-snug',
          description: 'text-muted-foreground text-xs leading-relaxed',
          actionButton:
            'bg-primary text-primary-foreground rounded-sm px-2.5 py-1 text-xs font-medium',
          cancelButton:
            'text-muted-foreground hover:text-foreground rounded-sm px-2 py-1 text-xs',
          closeButton:
            'bg-card text-muted-foreground border hover:text-foreground',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
