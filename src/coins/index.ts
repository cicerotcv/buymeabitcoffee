import { BadgeConfig } from '../types';

export const supportedCoins: Record<string, BadgeConfig> = {
  btc: {
    color: 'f7931a',
    logo: 'bitcoin',
    label: 'Bitcoin'
  },
  eth: {
    color: '37367b',
    logo: 'ethereum',
    label: 'Ethereum'
  }
};
