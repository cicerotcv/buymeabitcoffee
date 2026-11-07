import { BtcUtils } from '@/modules/crypto/utils/bitcoin';
import { DonationQrCode } from '@/modules/donation/components/donation-card/qr-code';

import { Env } from '@/env';
import { PrintedAddress } from '@/global/components/printed-address';
import { HashRule, LineItem, Receipt } from '@/global/components/receipt';
import { BitcoinIcon } from '@/global/svg/icons/bitcoin';

const exampleName = 'Buy Me a BitCoffee';

/** The product as the hero image: the project's own donation receipt. */
export const HeroReceipt = () => {
  const address = Env.ExampleBtcAddress;
  const uri = BtcUtils.fmtAddressUri({ address, label: exampleName });

  return (
    <Receipt
      print
      className="mx-auto w-full max-w-sm md:rotate-[-1.5deg]"
      paperClassName="gap-5 px-6 sm:px-8"
    >
      <div className="flex items-baseline justify-between">
        <span className="eyebrow">Receipt</span>
        <span className="eyebrow">On-chain</span>
      </div>

      <p className="font-heading text-3xl leading-none">{exampleName}</p>

      <HashRule />

      <DonationQrCode content={uri.full}>
        <div
          className="bg-btc absolute top-1/2 left-1/2 flex -translate-1/2
            items-center justify-center rounded-md border-3 border-white p-1.5"
        >
          <BitcoinIcon className="size-8 text-white" />
        </div>
      </DonationQrCode>

      <PrintedAddress value={address} className="text-muted-foreground" />

      <HashRule />

      <dl className="space-y-2 text-sm">
        <LineItem label="Custody" value="none" />
        <LineItem label="Platform fee" value="0" />
        <LineItem label="Signup" value="none" />
      </dl>

      <HashRule />

      <p className="font-heading text-center text-2xl">Thank you.</p>
    </Receipt>
  );
};
