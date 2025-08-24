import validate, { getAddressInfo, Network } from 'bitcoin-address-validation';
import { CheckCircle2, XCircle } from 'lucide-react';

import { Badge } from '$/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '$/components/ui/tooltip';
import { cn } from '$/lib/utils';

type Props = {
  address: string;
};
export const AddressVerification = (props: Props) => {
  const info = getAddressInfo(props.address);

  const isBech32 = info.bech32;
  const isValid = validate(props.address);
  const isMainnet = info.network === Network.mainnet;

  return (
    <div className={cn('flex gap-2 select-none')}>
      <Tooltip>
        <TooltipTrigger>
          <Badge
            variant={isValid ? 'outline' : 'destructive'}
            className={cn({
              'bg-green-400/10 text-green-500 dark:text-green-400': isValid,
            })}
          >
            {isValid ? <CheckCircle2 /> : <XCircle />}
            BTC address
          </Badge>
        </TooltipTrigger>

        <TooltipContent>
          {isValid
            ? 'Valid BTC address'
            : 'There may be a problem with the BTC address'}
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger>
          <Badge
            variant={isBech32 ? 'outline' : 'destructive'}
            className={cn({
              'bg-green-400/10 text-green-500 dark:text-green-400': isBech32,
            })}
          >
            {isBech32 ? <CheckCircle2 /> : <XCircle />}
            Bech32
          </Badge>
        </TooltipTrigger>

        <TooltipContent>
          {isBech32 ? (
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
            variant={isMainnet ? 'outline' : 'destructive'}
            className={cn({
              'bg-green-400/10 text-green-500 dark:text-green-400': isMainnet,
            })}
          >
            {isMainnet ? <CheckCircle2 /> : <XCircle />}
            Mainnet
          </Badge>
        </TooltipTrigger>

        <TooltipContent>
          {isMainnet
            ? 'Valid Mainnet address'
            : 'This address is not for the Bitcoin Mainnet'}
        </TooltipContent>
      </Tooltip>
    </div>
  );
};
