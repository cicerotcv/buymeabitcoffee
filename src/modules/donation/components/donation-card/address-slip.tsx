import { Wallet } from 'lucide-react';

import { CopyButton } from '@/global/components/copy-button';
import { PrintedAddress } from '@/global/components/printed-address';

import { Button } from '$/components/ui/button';
import { cn } from '$/lib/utils';

type Props = {
  address: string;
  /** Bitcoin addresses print in groups; Lightning addresses stay whole. */
  grouped?: boolean;
  /** Verification stamps (AddressInfo / LightningAddressInfo). */
  checks: React.ReactNode;
  copyContent: () => string;
  /** bitcoin: or lightning: URI that opens the donor's wallet app. */
  walletHref?: string;
};

/** The "pay to" stub inside the receipt: checks, printed address, actions. */
export const AddressSlip = (props: Props) => {
  return (
    <div className="bg-muted overflow-hidden rounded-md border">
      <div
        className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2
          border-b border-dashed px-4 py-2.5"
      >
        <span className="eyebrow">Pay to</span>
        {props.checks}
      </div>

      <div className="px-4 py-4">
        {props.grouped ? (
          <PrintedAddress value={props.address} layout="grid" />
        ) : (
          <p className="font-mono text-[0.95rem] break-all">{props.address}</p>
        )}
      </div>

      <div className="grid grid-cols-2 border-t">
        <CopyButton
          variant="ghost"
          className={cn('h-11 rounded-none', !props.walletHref && 'col-span-2')}
          contentSource={props.copyContent}
        >
          Copy
        </CopyButton>

        {props.walletHref ? (
          <Button
            asChild
            variant="ghost"
            className="h-11 rounded-none border-l"
          >
            <a href={props.walletHref}>
              <Wallet />
              Open in wallet
            </a>
          </Button>
        ) : null}
      </div>
    </div>
  );
};
