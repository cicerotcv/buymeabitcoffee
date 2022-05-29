export type BadgeConfig = {
  color: string;
  logo?: Logo;
  label: string;
};

export type PaymentType = 'btc' | 'eth';
export type Logo = 'bitcoin' | 'ethereum';
export type Style =
  | 'flat'
  | 'flat-square'
  | 'social'
  | 'for-the-badge'
  | undefined;

export type BadgeParameters = {
  label: string;
  message: string;
  color: string;
  logo?: Logo;
  style: Style;
};

export type RequestParams = {
  type: PaymentType;
  style?: Style;
};
