import { Check, X } from 'lucide-react';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '$/components/ui/tooltip';
import { cn } from '$/lib/utils';

type Props = {
  valid?: boolean;
  label: string;
  validMessage?: string;
  invalidMessage?: string;
};

/** A receipt "stamp": mono label with a round check, explained on hover. */
export const VerificationBadge = (props: Props) => {
  return (
    <Tooltip>
      <TooltipTrigger
        className={cn(
          `focus-visible:ring-ring/50 inline-flex cursor-help items-center
          gap-1.5 rounded-sm font-mono text-[0.7rem] tracking-[0.08em] uppercase
          outline-none focus-visible:ring-[3px]`,
          props.valid ? 'text-success' : 'text-destructive'
        )}
      >
        <span
          aria-hidden
          className={cn(
            'flex size-4 items-center justify-center rounded-full',
            props.valid
              ? 'bg-success/15 text-success'
              : 'bg-destructive/15 text-destructive'
          )}
        >
          {props.valid ? (
            <Check className="size-2.5" strokeWidth={3} />
          ) : (
            <X className="size-2.5" strokeWidth={3} />
          )}
        </span>
        <span className="sr-only">{props.valid ? 'Passed: ' : 'Failed: '}</span>
        {props.label}
      </TooltipTrigger>

      <TooltipContent>
        {props.valid ? props.validMessage : props.invalidMessage}
      </TooltipContent>
    </Tooltip>
  );
};
