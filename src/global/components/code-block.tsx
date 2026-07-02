import { PropsWithChildren } from 'react';

import { cn } from '$/lib/utils';

type Props = PropsWithChildren<{ className?: string }>;

export const CodeBlock = (props: Props) => {
  return (
    <div
      className={cn(
        `bg-muted/50 text-muted-foreground border-glass-border flex-1 rounded-md
        border p-3 font-mono text-xs break-all backdrop-blur-sm`,
        props.className
      )}
    >
      {props.children}
    </div>
  );
};
