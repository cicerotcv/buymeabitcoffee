import { Env } from '@/env';
import { BadgeStyle } from '@/types/badge';

type ShieldsIoParams = {
  content: string;
  style?: string;
  label?: string;
};

export const getShieldsIoUrl = (params: ShieldsIoParams) => {
  const searchParams = new URLSearchParams();

  searchParams.set('logo', 'bitcoin');
  searchParams.set(
    'logoColor',
    params.style === BadgeStyle.Social ? 'black' : 'white'
  );
  searchParams.set('color', 'f7931a');

  const baseUrl = `https://img.shields.io/badge`;

  if (!!params.style) searchParams.set('style', params.style);
  if (!!params.label) searchParams.set('label', params.label);

  return `${baseUrl}/${encodeURIComponent(params.content)}-f7931a?${searchParams.toString()}`;
};

type DonationUrlParams = {
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

export const getDonationAbsoluteUrl = (params: DonationUrlParams) => {
  const path = getDonationPath(params);

  return `${Env.VercelUrl}${path}`;
};

export const getMarkdown = (params: DonationUrlParams & ShieldsIoParams) => {
  const url = getShieldsIoUrl({
    content: params.content || 'Buy Me a BitCoffee',
    label: params.label,
    style: params.style,
  });

  const donationUrl = getDonationAbsoluteUrl({
    address: params.address,
    identifier: params.identifier,
  });

  return `[![buy-me-a-bitcoffee](${url})](${donationUrl})`;
};
