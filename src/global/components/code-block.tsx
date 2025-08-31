import { PropsWithChildren } from 'react';

import { cn } from '$/lib/utils';

type Props = PropsWithChildren<{ className?: string }>;

export const CodeBlock = (props: Props) => {
  return (
    <div
      className={cn(
        `bg-muted text-muted-foreground flex-1 rounded-md p-3 font-mono text-xs
        break-all`,
        props.className
      )}
    >
      {props.children}
    </div>
  );
};
