export const getUsdToBtc = async (value?: number) => {
  const response = await fetch(
    `https://blockchain.info/tobtc?currency=USD&value=${value || 1}`
  );

  if (!response.ok) throw new Error('Failed to fetch BTC price');

  const data = await response.json();

  return data as number;
};
