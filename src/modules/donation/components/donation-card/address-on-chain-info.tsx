import { cn } from '$/lib/utils';

import { getAddressInfoSafe } from '../../utils/address-info';
import { VerificationBadge } from '../verification-badge';

type Props = {
  address?: string;
};

export const AddressInfo = (props: Props) => {
  const info = getAddressInfoSafe(props.address);

  return (
    <div
      className={cn(
        'flex flex-row flex-wrap items-center gap-x-3 gap-y-1 select-none'
      )}
    >
      <VerificationBadge
        valid={info.isValid}
        label="Valid"
        validMessage="Valid BTC address"
        invalidMessage="The address is not recognized as a valid BTC address"
      />

      <VerificationBadge
        valid={info.isBech32}
        label="Bech32"
        validMessage="Valid Bech32 address"
        invalidMessage="It's not a Bech32 address but it could be a legacy address."
      />

      <VerificationBadge
        valid={info.isMainnet}
        label="Mainnet"
        validMessage="Valid Mainnet address"
        invalidMessage="This address is not for the Bitcoin Mainnet"
      />
    </div>
  );
};
