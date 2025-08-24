type BtcAddressParams = {
  address: string;
  label?: string;
  message?: string;
  value?: number;
};

export const fmtBtcAddress = (params: BtcAddressParams) => {
  const { address, label, message, value } = params;

  const url = new URL(`bitcoin:${address}`);

  if (label) url.searchParams.set('label', `donation to ${label}`);
  if (message) url.searchParams.set('message', message);
  if (value) url.searchParams.set('amount', value.toString());

  return url;
};
