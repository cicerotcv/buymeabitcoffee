import type { NextApiRequest, NextApiResponse } from 'next';
import { URLSearchParams } from 'url';
import {
  BadgeConfig,
  BadgeParameters,
  RequestParams,
  Style
} from '../../types';

import { supportedCoins as supportedBadges } from '../../coins';

const errorBadge = {
  color: 'ff2000',
  label: 'error'
};

class URLMaker {
  static baseURL = 'https://img.shields.io/static/v1';

  public static makeParams(data: BadgeParameters) {
    const params = new URLSearchParams();
    Object.entries(data).forEach(([name, value]) => {
      if (value) params.append(name, value);
    });
    params.sort();
    return params.toString();
  }

  public static makeURL(message: string, style: Style, data: BadgeConfig) {
    const query = URLMaker.makeParams({ ...data, style, message });
    return `${URLMaker.baseURL}?${query}`;
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  const { style, type } = req.query as RequestParams;

  if (!Object.keys(supportedBadges).includes(type)) {
    const url = URLMaker.makeURL(
      `Invalid parameter '${type}'`,
      style,
      errorBadge
    );
    return res.redirect(url);
  }

  const badgeConfig = supportedBadges[type];
  const url = URLMaker.makeURL('Buy me a bit coffee', style, badgeConfig);
  return res.redirect(url);
}
