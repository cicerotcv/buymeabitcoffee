type BtcAddressParams = {
  address: string;
  label?: string;
  message?: string;
  value?: number;
};

const fmtAddressUri = (params: BtcAddressParams) => {
  const { address, label, message, value } = params;

  const url = new URL(`bitcoin:${address}`);

  if (label) url.searchParams.set('label', label);
  if (message) url.searchParams.set('message', message);
  if (value) url.searchParams.set('amount', value.toString());

  return {
    format: url.protocol,
    query: url.search,
    address: url.pathname,
    full: url.href,
  };
};

export const BtcUtils = {
  fmtAddressUri,
};
