import { Check, X } from 'lucide-react';

import { Badge } from '$/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '$/components/ui/tooltip';
import { cn } from '$/lib/utils';

import { getAddressInfoSafe } from '../../utils/address-info';

type Props = {
  address: string;
};

export const AddressInfo = (props: Props) => {
  const info = getAddressInfoSafe(props.address);

  return (
    <div className={cn('flex flex-row flex-wrap gap-1 select-none sm:gap-2')}>
      <Tooltip>
        <TooltipTrigger>
          <Badge
            variant={info.isValid ? 'outline' : 'destructive'}
            className={cn({
              'bg-green-400/10 text-green-500 dark:text-green-400':
                info.isValid,
            })}
          >
            {info.isValid ? <Check /> : <X />}
            BTC address
          </Badge>
        </TooltipTrigger>

        <TooltipContent>
          {info.isValid
            ? 'Valid BTC address'
            : 'The address is not recognized as a valid BTC address'}
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger>
          <Badge
            variant={info.isBech32 ? 'outline' : 'destructive'}
            className={cn({
              'bg-green-400/10 text-green-500 dark:text-green-400':
                info.isBech32,
            })}
          >
            {info.isBech32 ? <Check /> : <X />}
            Bech32
          </Badge>
        </TooltipTrigger>

        <TooltipContent>
          {info.isBech32 ? (
            'Valid Bech32 address'
          ) : (
            <>
              It&apos;s not a Bech32 address but it could be a legacy address.
            </>
          )}
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger>
          <Badge
            variant={info.isMainnet ? 'outline' : 'destructive'}
            className={cn({
              'bg-green-400/10 text-green-500 dark:text-green-400':
                info.isMainnet,
            })}
          >
            {info.isMainnet ? <Check /> : <X />}
            Mainnet
          </Badge>
        </TooltipTrigger>

        <TooltipContent>
          {info.isMainnet
            ? 'Valid Mainnet address'
            : 'This address is not for the Bitcoin Mainnet'}
        </TooltipContent>
      </Tooltip>
    </div>
  );
};
