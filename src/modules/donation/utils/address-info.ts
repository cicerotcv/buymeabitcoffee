import validate, { getAddressInfo, Network } from 'bitcoin-address-validation';

export const getAddressInfoSafe = (address: string) => {
  try {
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
