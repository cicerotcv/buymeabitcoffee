import { Env } from '@/env';
import { BadgeStyle } from '@/types/badge';

import { theme } from '../theme';

type BadgeParams = {
  message: string;
  style: BadgeStyle;
};

const shieldsIoUrl = new URL('https://img.shields.io/static/v1');

export const getBadgeSrc = (params: BadgeParams) => {
  shieldsIoUrl.searchParams.set('message', params.message);
  shieldsIoUrl.searchParams.set('color', theme.btc.color);
  shieldsIoUrl.searchParams.set('logo', theme.btc.logo);
  shieldsIoUrl.searchParams.set('label', theme.btc.label);
  shieldsIoUrl.searchParams.set('style', params.style);

  return shieldsIoUrl.toString();
};

type ShieldsIoParams = {
  address: string;
  content: string;
  style: string;
  label?: string;
};

export const getShieldsIoUrl = (params: ShieldsIoParams) => {
  const searchParams = new URLSearchParams();

  searchParams.set('logo', 'bitcoin');
  searchParams.set('style', params.style);
  searchParams.set(
    'logoColor',
    params.style === BadgeStyle.Social ? 'black' : 'white'
  );
  searchParams.set('color', 'f7931a');

  const baseUrl = `https://img.shields.io/badge`;

  if (!!params.label) {
    searchParams.set('label', params.label);
  }

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
    address: params.address,
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
