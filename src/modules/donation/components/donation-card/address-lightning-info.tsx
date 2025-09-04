import { cn } from '$/lib/utils';

import { getLightningAddressInfoSafe } from '../../utils/address-info';
import { VerificationBadge } from '../verification-badge';

type Props = {
  address?: string;
};

export const LightningAddressInfo = (props: Props) => {
  const info = getLightningAddressInfoSafe(props.address);

  return (
    <div className={cn('flex flex-row flex-wrap gap-1 select-none sm:gap-2')}>
      <VerificationBadge
        valid={info.isValid}
        label="Lightning Address / URL"
        validMessage="Valid Lightning Address / URL"
        invalidMessage="It's not a Lightning Address / URL."
      />
    </div>
  );
};
