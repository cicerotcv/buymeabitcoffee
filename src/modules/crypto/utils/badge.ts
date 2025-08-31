import { getShieldsUrl, ShieldsParams } from './shields';
import { DonationUrlParams, getDonationUrl } from './urls';

type ImageSourceParams = DonationUrlParams & ShieldsParams;

export const getMarkdown = (params: ImageSourceParams) => {
  const shieldsUrl = getShieldsUrl({
    content: params.content || 'Buy Me a BitCoffee',
    label: params.label,
    style: params.style,
  });

  const donationUrl = getDonationUrl({
    address: params.address,
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
    address: params.address,
    identifier: params.identifier,
  });

  return `<a href="${donationUrl}"><img src="${shieldsUrl}" alt="Buy Me a BitCoffee badge"/></a>`;
};
