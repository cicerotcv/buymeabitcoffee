import { BadgeStyle } from '@/types/badge';

export type ShieldsParams = {
  content: string;
  style?: string;
  label?: string;
};

export const getShieldsUrl = (params: ShieldsParams) => {
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
