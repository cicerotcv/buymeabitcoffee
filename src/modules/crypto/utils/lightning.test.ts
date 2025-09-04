import { describe, expect, it } from 'vitest';

import { Lnurl, PaymentUrl } from './lightning';

// Some example providers/domains
const PROVIDERS = [
  'walletofsatoshi.com',
  'getalby.com',
  'phoenixwallet.com',
  'blink.sv',
  'coinos.io',
  'zbd.gg',
];

// Utility to generate a fake username
function randomUsername() {
  return `user${Math.floor(Math.random() * 10000)}`;
}

// Build a random Lightning address + its URL
function makeLightningAddress(domain: string) {
  const username = randomUsername();
  const address = `${username}@${domain}`;
  const url = `https://${domain}/.well-known/lnurlp/${username}`;
  return { username, address, url };
}

describe('Lnurl', () => {
  it('should round-trip encode → decode for arbitrary provider URLs', () => {
    for (const domain of PROVIDERS) {
      const { url } = makeLightningAddress(domain);
      const encoded = Lnurl.encode(url);
      const decoded = Lnurl.decode(encoded);
      expect(decoded).toEqual(url);
    }
  });

  it('should round-trip decode → encode for arbitrary LNURLs', () => {
    for (const domain of PROVIDERS) {
      const { url } = makeLightningAddress(domain);
      const encoded = Lnurl.encode(url);
      const reencoded = Lnurl.encode(Lnurl.decode(encoded));
      expect(reencoded).toEqual(encoded);
    }
  });

  it('should throw for invalid input', () => {
    expect(() => Lnurl.decode('not-lnurl')).toThrow();
    expect(() => Lnurl.encode('notaurl')).toThrow();
  });
});

describe('PaymentUrl', () => {
  it('should convert back and forth between address and URL', () => {
    for (const domain of PROVIDERS) {
      const { address, url } = makeLightningAddress(domain);

      const derivedUrl = PaymentUrl.addressToUrl(address);
      expect(derivedUrl).toEqual(url);

      const encoded = Lnurl.encode(url);
      const derivedAddress = PaymentUrl.lnurlToAddress(encoded);
      expect(derivedAddress).toEqual(address);
    }
  });

  it('should throw for malformed Lightning address', () => {
    expect(() => PaymentUrl.addressToUrl('badaddress')).toThrow();
    expect(() => PaymentUrl.addressToUrl('no-domain@')).toThrow();
  });
});
