import { Check, Copy } from 'lucide-react';

import { cn } from '$/lib/utils';

export const CopyIcon = (props: { copied?: boolean; className?: string }) =>
  props.copied ? (
    <Check className={cn('text-green-400', props.className)} />
  ) : (
    <Copy className={cn(props.className)} />
  );
