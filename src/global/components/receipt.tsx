import { PropsWithChildren } from 'react';

import { Card } from '$/components/ui/card';
import { cn } from '$/lib/utils';

type Props = PropsWithChildren<{
  className?: string;
  /** Classes for the paper itself (padding, gap). */
  paperClassName?: string;
  /** Plays the one-time "printing" reveal on mount. */
  print?: boolean;
}>;

/**
 * The site's only perforated surface. The wrapper carries the shadow so the
 * teeth cut by the mask cast it as well.
 */
export const Receipt = (props: Props) => {
  return (
    <div
      className={cn(
        'receipt-lift',
        props.print && 'motion-safe:animate-print',
        props.className
      )}
    >
      <Card variant="receipt" className={props.paperClassName}>
        {props.children}
      </Card>
    </div>
  );
};

/** Dashed rule used inside receipts and between sections. */
export const HashRule = ({ className }: { className?: string }) => (
  <hr className={cn('rule-hash', className)} />
);

type LineItemProps = {
  label: React.ReactNode;
  value: React.ReactNode;
  className?: string;
};

/** "label ······ value" row, the itemization ornament. */
export const LineItem = (props: LineItemProps) => (
  <div className={cn('flex items-baseline gap-2', props.className)}>
    <dt>{props.label}</dt>
    <span aria-hidden className="leader" />
    <dd className="font-mono tabular-nums">{props.value}</dd>
  </div>
);
