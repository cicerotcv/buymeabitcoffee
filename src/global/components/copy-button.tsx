import { useCallback, useRef, useState } from 'react';

import { toast } from 'sonner';

import { Button } from '$/components/ui/button';

import { CopyIcon } from './copy-icon';

type Props = React.ComponentProps<typeof Button> & {
  contentSource: string | (() => string);
};

export const CopyButton = ({ children, contentSource, ...props }: Props) => {
  const [copied, setCopied] = useState(false);
  const copyTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleCopy = useCallback(() => {
    const content =
      typeof contentSource === 'function' ? contentSource() : contentSource;

    navigator?.clipboard?.writeText(content).then(
      () => {
        setCopied(true);
        toast.success('Copied to clipboard');
        if (copyTimeout.current) clearTimeout(copyTimeout.current);
        copyTimeout.current = setTimeout(() => setCopied(false), 2000);
      },
      () => {
        toast.error('Failed to copy');
      }
    );
  }, [contentSource]);

  return (
    <Button {...props} onClick={handleCopy}>
      {children} <CopyIcon copied={copied} />
    </Button>
  );
};
