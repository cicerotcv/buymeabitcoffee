import { DonationUrlParams, getDonationUrl } from '@/modules/crypto/utils/urls';

import { getShieldsUrl, ShieldsParams } from './shields';

type ImageSourceParams = DonationUrlParams & ShieldsParams;

export const getMarkdown = (params: ImageSourceParams) => {
  const shieldsUrl = getShieldsUrl({
    content: params.content || 'Buy Me a BitCoffee',
    label: params.label,
    style: params.style,
  });

  const donationUrl = getDonationUrl({
    onChain: params.onChain,
    lightning: params.lightning,
    identifier: params.identifier,
  });

  return `[![buy-me-a-bitcoffee](${shieldsUrl})](${donationUrl})`;
};

export const getHtmlCode = (params: ImageSourceParams) => {
  const shieldsUrl = getShieldsUrl({
    content: params.content || 'Buy Me a BitCoffee',
    label: params.label,
    style: params.style,
  });

  const donationUrl = getDonationUrl({
    onChain: params.onChain,
    identifier: params.identifier,
    lightning: params.lightning,
  });

  return `<a href="${donationUrl}"><img src="${shieldsUrl}" alt="Buy Me a BitCoffee badge"/></a>`;
};
