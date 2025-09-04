import { Env } from '@/env';

export type DonationUrlParams = {
  onChain: string;
  lightning?: string;
  identifier?: string;
};

export const getDonationPath = (params: DonationUrlParams) => {
  const { onChain, lightning, identifier } = params;

  const basePath = `/btc/${onChain}`;

  const query = new URLSearchParams();

  if (identifier) query.set('identifier', identifier);
  if (lightning) query.set('lightning', lightning);

  if (query.toString()) return `${basePath}?${query.toString()}`;

  return basePath;
};

export const getDonationUrl = (params: DonationUrlParams) => {
  const path = getDonationPath(params);

  return `${Env.VercelUrl}${path}`;
};
