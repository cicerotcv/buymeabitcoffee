import { cn } from '$/lib/utils';

import { getLightningAddressInfoSafe } from '../../utils/address-info';
import { VerificationBadge } from '../verification-badge';

type Props = {
  address?: string;
};

export const LightningAddressInfo = (props: Props) => {
  const info = getLightningAddressInfoSafe(props.address);

  return (
    <div
      className={cn(
        'flex flex-row flex-wrap items-center gap-x-3 gap-y-1 select-none'
      )}
    >
      <VerificationBadge
        valid={info.isValid}
        label="Valid"
        validMessage="Valid Lightning Address / URL"
        invalidMessage="It's not a Lightning Address / URL."
      />
    </div>
  );
};
