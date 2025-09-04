import { bech32 } from 'bech32';

import {
  lnAddressParser,
  lnPaymentUrlParser,
} from '../parsers/lightning-address';

export const Lnurl = {
  decode: (lnurl: string): string => {
    // Decode the bech32 string
    const decoded = bech32.decode(lnurl, 1024);
    const bytes = bech32.fromWords(decoded.words);
    const url = Buffer.from(bytes).toString('utf8');
    return lnPaymentUrlParser.parse(url);
  },
  encode: (url: string): string => {
    url = lnPaymentUrlParser.parse(url);
    const bytes = Buffer.from(url, 'utf8');
    const words = bech32.toWords(bytes);
    return bech32.encode('lnurl', words, 1024);
  },
};

const WELL_KNOWN_PATH = '/.well-known/lnurlp/';

export const PaymentUrl = {
  /**
   * Convert a Lightning Address into an LNURLp URL
   * @example
   * PaymentUrl.addressToUrl('user@domain.com');
   * // 'https://domain.com/.well-known/lnurlp/user'
   */
  addressToUrl(address: string): string {
    const parsed = lnAddressParser.parse(address); // throws if invalid
    const [username, domain] = parsed.split('@');
    return `https://${domain}${WELL_KNOWN_PATH}${username}`;
  },

  /**
   * Convert an LNURL (bech32) into a Lightning Address
   * @example
   * PaymentUrl.lnurlToAddress('lnurl1dp68gurn8ghj...');
   * // 'user@domain.com'
   */
  lnurlToAddress(lnurl: string): string {
    const decoded = Lnurl.decode(lnurl);
    const parsedUrl = new URL(decoded);

    if (!parsedUrl.pathname.startsWith(WELL_KNOWN_PATH)) {
      throw new Error(`Unexpected LNURL path: ${parsedUrl.pathname}`);
    }

    const username = parsedUrl.pathname.slice(WELL_KNOWN_PATH.length);
    const domain = parsedUrl.hostname.replace(/^www\./, '');

    return `${username}@${domain}`;
  },
};

export const LightningUtils = {
  fmtAddressUri: (params: { address: string }) => {
    const { address } = params;

    const url = new URL(`lightning:${address}`);

    return {
      format: url.protocol,
      query: url.search,
      address: url.pathname,
      full: url.href,
    };
  },
};
