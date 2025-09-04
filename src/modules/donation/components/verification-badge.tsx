import { Check, X } from 'lucide-react';

import { Badge } from '$/components/ui/badge';
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
export const VerificationBadge = (props: Props) => {
  return (
    <Tooltip>
      <TooltipTrigger>
        <Badge
          variant={props.valid ? 'outline' : 'destructive'}
          className={cn({
            'bg-green-400/10 text-green-500 dark:text-green-400': props.valid,
          })}
        >
          {props.valid ? <Check /> : <X />}
          {props.label}
        </Badge>
      </TooltipTrigger>

      <TooltipContent>
        {props.valid ? props.validMessage : props.invalidMessage}
      </TooltipContent>
    </Tooltip>
  );
};
