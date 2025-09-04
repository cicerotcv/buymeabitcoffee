import validate, { getAddressInfo, Network } from 'bitcoin-address-validation';

import {
  lnAddressParser,
  lnurlParser,
} from '@/modules/crypto/parsers/lightning-address';

export const getAddressInfoSafe = (address: unknown) => {
  try {
    if (!address) throw new Error('Invalid address');
    if (typeof address !== 'string') throw new Error('Invalid address');

    const info = getAddressInfo(address);

    const isValid = validate(address);
    const isBech32 = info.bech32;
    const isMainnet = info.network === Network.mainnet;

    return {
      isValid,
      isBech32,
      isMainnet,
    };
  } catch {
    return {
      isValid: false,
      isBech32: false,
      isMainnet: false,
    };
  }
};

export const getLightningAddressInfoSafe = (addressOrUrl: unknown) => {
  const isLnurl = lnurlParser.safeParse(addressOrUrl);
  const isLnAddress = lnAddressParser.safeParse(addressOrUrl);

  return {
    isLnurl: isLnurl.success,
    isLnAddress: isLnAddress.success,
    isValid: isLnurl.success || isLnAddress.success,
  };
};
