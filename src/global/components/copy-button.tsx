import { Button } from '$/components/ui/button';

import { useClipboard } from '../hooks/copy';
import { CopyIcon } from './copy-icon';

type Props = React.ComponentProps<typeof Button> & {
  contentSource: string | (() => string);
};

export const CopyButton = ({ children, contentSource, ...props }: Props) => {
  const clipboard = useClipboard(contentSource);

  return (
    <Button {...props} onClick={clipboard.copy}>
      {children} <CopyIcon copied={clipboard.copied} />
    </Button>
  );
};
