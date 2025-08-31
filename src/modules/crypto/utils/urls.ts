import { Env } from '@/env';

export type DonationUrlParams = {
  address: string;
  identifier?: string;
};

export const getDonationPath = (params: DonationUrlParams) => {
  const { address, identifier } = params;

  const basePath = `/btc/${address}`;

  const query = new URLSearchParams();

  if (identifier) query.set('identifier', identifier);

  if (query.toString()) return `${basePath}?${query.toString()}`;

  return basePath;
};

export const getDonationUrl = (params: DonationUrlParams) => {
  const path = getDonationPath(params);

  return `${Env.VercelUrl}${path}`;
};
